import React, { useState, useEffect } from 'react'
import { useParams } from "react-router"
import { Link } from 'react-router-dom'
import api from '../../services/api'
import './style.scss'

const BeerDetail = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState({});

  useEffect(() => {
    let unmounted = false;
    api.get(`beers/${id}`)
      .then(res =>
        setBeer({
          name: res.data[0].name,
          id: res.data[0].id,
          tagline: res.data[0].tagline,
          description: res.data[0].description,
          image_url: res.data[0].image_url
        })
      )
    return () => { unmounted = true };
  }, [])

  return (
    <div className="container">
      <div className="card">
        <div className="card--image">
          <img src={beer.image_url} className="image" />
        </div>
        <div className="card--info">
          <h1 className="card--info--title">{beer.name}</h1>
          <h3 className="card--info--tagline">"{beer.tagline}"</h3>
          <p className="card--info--description">{beer.description}</p>
        </div>
      </div>
      <Link to='/' className="goBack">Go back</Link>
    </div>
  )
}

export default BeerDetail
