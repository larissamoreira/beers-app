import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import { fetchBeers } from '../../store/actions/beersActions'
import './style.scss'

const BeerList = ({ dispatch, loading, beers, hasErrors, next = 1 }) => {
  useEffect(() => {
    dispatch(fetchBeers(next))
  }, [dispatch])

  const renderBeers = () => {
    if (loading) return <p>Loading...</p>
    if (hasErrors) return <p>Unable to display beer list.</p>
    return (
      <ul className="beersList--list">
        {beers.map((beer) =>
          <li
            className="beersList--item"
            key={beer.id}>
            <Link
              to={`/beer/${beer.id}`}
              className="beersList--item--link">
              <p><strong>{beer.name}</strong> - {beer.tagline}</p>
            </Link>
          </li>
        )}
      </ul>
    )
  }

  return (
    <section className="beersList--container">
      <h1 className="beersList--title">Beers</h1>
      {beers && renderBeers()}
      {next &&
        <button
          onClick={() => dispatch(fetchBeers(next))}
          className="button">Go to page {next}
        </button>
      }
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
