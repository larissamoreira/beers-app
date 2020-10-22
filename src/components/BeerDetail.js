import React, { useEffect, useState } from 'react'
import { useParams } from "react-router"
import api from '../services/api'

const BeerDetail = () => {
  const { id } = useParams();
  const [beer, setBeer] = React.useState({});

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
    <div>
      <p>{beer.name}</p>
      <p>{beer.tagline}</p>
      <p>{beer.description}</p>
      <p>{beer.image_url}</p>
    </div>
  )
}

export default BeerDetail
