import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../lib/auth'
import emailjs from 'emailjs-com'

const errorInitialState = {
  errors: ''
}

const SwapRequests = (props) => {

  const [yourItem, setYourItem] = useState([])
  const [swapRequests, setSwapRequests] = useState([])
  const [error, setError] = useState(errorInitialState)

  const id = props.match.params.id

  useEffect(() => {
    axios.get(`/api/items/${id}/`)
      .then(resp => {
        setYourItem(resp.data)
        getSwapRequests(resp.data)
      })
  }, [])

  function getSwapRequests(elem) {
    const array = elem.swap_requesters.map(swap => {
      return swap.item_to_swap
    })

    const promises = []
    array.forEach(elem => {
      promises.push(axios.get(`/api/items/${elem}/`).then(resp => resp.data))
    })
    Promise.all(promises).then(swaps => setSwapRequests(swaps))
  }

  function handleClick(e) {
    e.preventDefault()
    sendEmailToSwap(e)
    axios.put(`/api/items/${id}/swapapproval/`, {}, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => props.history.push('/profile'))
      .catch((err) => setError({ errors: err.response.data }))
  }

  function sendEmailToSwap(e) {
    const email = e.target.name
    const replyToEmail = yourItem.owner.email
    console.log(email)
    const templateParams = {
      email_to: email,
      reply_to: replyToEmail,
      from_name: replyToEmail,
      message_html: yourItem.title
    }
    emailjs.send('gmail', 'template_7jbu2NNW', templateParams, 'user_EztaAzroFrBYKpE9JXBMJ')
  }


  if (yourItem.length === 0 || swapRequests.length === 0) {
    return <div className="title">Loading</div>
  }
  return <section className="section">
    <div id='swap-requests' className='columns has-text-centered' style={{ margin: 20 }}>
      <div className='column'>
        <div className='title'>Your Item:</div>
        <div>{yourItem.title}</div>
        <img src={yourItem.image} />
      </div>
      <div className='column' id='right-column'>
        <div className='title'>Swap Requests:</div>
        <div className='columns is-mobile is-multiline'>
          {swapRequests.map((elem, i) => {
            return <div className='column is-half' key={i}>
              <div>{elem.title}</div>
              <img src={elem.image} />
              <button className='button is-small' value={elem.id} name={elem.owner.email} onClick={e => handleClick(e)}>Approve Swap?</button>
            </div>
          }
          )}
        </div>
      </div>
    </div>


  </section>

}

export default SwapRequests

