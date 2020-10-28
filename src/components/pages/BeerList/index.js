import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import { fetchBeers } from '../../../store/actions/beersActions'
import './style.scss'

const BeerList = ({ dispatch, loading, beers, hasErrors, next = 1 }) => {
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      dispatch(fetchBeers(next))
      firstRender.current = false;
    }
    handleScroll()
  }, [])

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 10 >= document.documentElement.offsetHeight) {
      if (!next || hasErrors) return;

      if (!loading) dispatch(fetchBeers(next))
    }
  };

  window.onscroll = handleScroll;

  const renderBeers = () => {
    if (loading) return <p>Loading...</p>
    if (hasErrors) return <p>Unable to display beer list.</p>
    return (
      <ul className="beersList--list">
        {Object.keys(beers).map((beer) =>
          <li
            className="beersList--item"
            key={beers[beer].id}>
            <Link
              to={`/beer/${beers[beer].id}/`}
              className="beersList--item--link"
              id={beers[beer].id}>
              <p><strong>{beers[beer].name}</strong> - {beers[beer].tagline}</p>
            </Link>
          </li>
        )}
      </ul>
    )
  }

  return (
    <section className="beersList--container">
      <h1 className="beersList--title"><i className="em em-beers"></i> Beers</h1>
      {beers && renderBeers()}
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
