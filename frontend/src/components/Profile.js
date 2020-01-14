import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../lib/auth'
import UserContext from './UserContext'


const Profile = () => {

  const [data, setData] = useState({})
  const [info, setInfo] = useState({})
  // const [update, setUpdate] = useState(false)

  const { userInfo, setUserInfo } = useContext(UserContext)
	
  useEffect(() => {
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        setData(res.data)
          .then(console.log('hello'))
        if (userInfo) {
          setInfo(userInfo)
        }
      })
      .catch(error => console.log(error))
  }, [userInfo])
	
  console.log(data)

  // useEffect(() => {
  //   if (update) {
  //     axios.put('/api/profile/edit', info, {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //       .then(res => {
  //         // console.log(res.data)
  //         // console.log(res.data.user)
  //         setUserInfo(res.data.user)
  //         setUpdate(false)
  //       })
  //       .catch(err => console.log(err))
  //   }
  // }, [info])
	
	
	
  return <div className="section">
    <div className="container">
      {/* <div className="columns is-multiline">
          <div className="column is-half-tablet"> */}
      <h1> Welcome to Green Garms, {data.username}!</h1>
      <h2>{data.email}</h2>
      
      {/* <div className="subtitle">
        {data.user && data.user.dietary.map((diet, id) =>
          <p key={id}>{diet}</p>
        )}
      </div> */}
      <div className="section">
        <div className="container">
          <h3>Quicklinks</h3>
          <Link className="tag is-info is-light" to='/items/new'>Add Item</Link>
          <Link className="tag is-info is-light" to='/brands'>Brand Guide</Link>
          <Link className="tag is-info is-light" to='/clothesswap'>Clothes Swap</Link>
        </div>
      </div>
    </div>
    <div className="section">
      <div className="container">
        <div className="titlecontain">
          <h2 className="headers">Your Items</h2>
        </div>
        <div className="columns is-multiline">
          {data.user && data.user.items.map((item, id) => {
            return (
              <div key={id} className="column is-one-quarter-desktop is-one-third-tablet is-three-quartes-mobile">
                <div className="card">
                  {/* <h3 className="fav-title card-header-title is-centered"><Link className='fav-link' to={`/restaurants/${rest._id}`}>{rest.name}</Link></h3> */}
                  <p className="fav-title">{item.title}</p>
                  <div className="fav-sub">{item.swap_requesters}</div>
                  <div className="card-image">
                    <figure className="image is-5by4 is-centered">
                      <img className="image" src={item.image} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="card-footer">

                      <br />
                      {/* <Link data-name={rest.name} onClick={removeFavRest} className="card-footer-item">Remove</Link> */}
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* <div className="section">
        <div className="container">
          <div className="titlecontain">
            <h2 className="headers">Your Swap Requests</h2>
          </div>
          <div className="columns is-multiline">
            {data.user && data.user.favouriteRecipes.map((recipes, id) => {
              return (
                <div key={id} className="column is-one-quarter-desktop is-one-third-tablet is-three-quartes-mobile">
                  <div className="card">
                    <h3 className="fav-title-recipe card-header-title is-centered"><Link className='fav-title-recipe' to={`/recipes/${recipes._id}`}>{recipes.name}</Link></h3>
                    <p className="fav-sub">by {recipes.author}</p>
                    <div className="card-image">
                      <figure className="image is-5by4">
                        <img className="image" src={recipes.image[0]} />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="card-footer">
                        <Link data-name={recipes.name} onClick={removeFavReci} className="card-footer-item">Remove</Link>
                      </div>
                    </div>
                  </div>
                </div>)
            })}
          </div>
        </div>
      </div> */}
      {/* </div>
        </div> */}
    </div>
  </div>

}

export default Profile