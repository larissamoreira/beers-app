import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import { fetchBeers } from '../store/actions/beersActions'

const BeerList = ({ dispatch, loading, beers, hasErrors }) => {
  useEffect(() => {
    dispatch(fetchBeers())
  }, [dispatch])

  const renderBeers = () => {
    if (loading) return <p>Loading...</p>
    if (hasErrors) return <p>Unable to display beer list.</p>
    return beers.map((beer) => <Link to={`/beer/${beer.id}`} key={beer.id}><p>{beer.name} - {beer.tagline}</p></Link>)
  }

  return (
    <section>
      <h1>Beers</h1>
      {renderBeers()}
    </section>
  )
}

const mapStateToProps = (state) => ({
  loading: state.beers.loading,
  beers: state.beers.beers,
  hasErrors: state.beers.hasErrors,
})

export default connect(mapStateToProps)(BeerList)
