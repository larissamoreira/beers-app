import React, { useState, useEffect } from 'react'
import { useParams } from "react-router"
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getBeerDetail } from '../../services/api'
import './style.scss'

const BeerDetail = ({ beers }) => {
  const { id } = useParams();
  const [beer, setBeer] = useState({});

  useEffect(() => {
    if (id in beers) {
      setBeer(beers[id])
    } else {
      getBeerDetail(id)
        .then(res => setBeer(res))
        .catch(err => alert('Unable to display beer info.'))
    }
    return () => { };
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

const mapStateToProps = state => {
  return { beers: state.beers.beers };
};

export default connect(mapStateToProps)(BeerDetail);
