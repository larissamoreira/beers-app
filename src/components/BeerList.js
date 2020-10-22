import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import { fetchBeers } from '../store/actions/beersActions'

const BeerList = ({ dispatch, loading, beers, hasErrors, next = 1 }) => {
  useEffect(() => {
    dispatch(fetchBeers(next))
  }, [dispatch])

  const renderBeers = () => {
    if (loading) return <p>Loading...</p>
    if (hasErrors) return <p>Unable to display beer list.</p>
    return beers.map((beer) => <Link to={`/beer/${beer.id}`} key={beer.id}><p>{beer.name} - {beer.tagline}</p></Link>)
  }

  return (
    <section>
      <h1>Beers</h1>
      {beers && renderBeers()}
      {next && <button onClick={() => dispatch(fetchBeers(next))}>Go to page {next}</button>}
    </section>
  )
}

const mapStateToProps = (state) => ({
  loading: state.beers.loading,
  beers: state.beers.beers,
  hasErrors: state.beers.hasErrors,
  next: state.beers.next
})

export default connect(mapStateToProps)(BeerList)
