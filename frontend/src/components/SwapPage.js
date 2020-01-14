import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../lib/auth'

const errorInitialState = {
  errors: ''
}

const SwapPage = (props) => {

  const [yourItems, setYourItems] = useState([])
  const [likedItem, setLikedItem] = useState([])
  const [error, setError] = useState(errorInitialState)

  useEffect(() => {
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => setYourItems(resp.data.items))
    getItem(props)
  }, [])

  function getItem(props) {
    const id = props.match.params.id
    axios.get(`/api/items/${id}`)
      .then(resp => setLikedItem(resp.data))
  }

  function handleClick(e) {
    e.preventDefault()
    console.log(e.target.value)
    console.log(Auth.getToken())
    if (window.confirm(`Request to swap ${e.target.name}?`)) {
      axios.post(`/api/items/swap/${likedItem.id}/${e.target.value}/`, {}, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
        .then(() => props.history.push('/clothesswap'))
        .catch((err) => setError( { errors: err.response.data } ))
    }
  }

  return <section>
    <div>
      <div>{likedItem.title}</div>
      <img src={likedItem.image}></img>
      <p>{likedItem.description}</p>
    </div>
    <div>
      {yourItems.map((elem, i) => {
        return <div key={i}>
          <div>{elem.title}</div>
          <img src={elem.image}></img>
          <button name={elem.title} value={elem.id} onClick={e => handleClick(e)}></button>
        </div>
      })}
    </div>

  </section>

}

export default SwapPage