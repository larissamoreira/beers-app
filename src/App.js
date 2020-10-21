import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import BeerList from './components/BeerList'
import BeerDetail from './components/BeerDetail'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <BeerList />
        </Route>
        <Route path="/beer/:id">
          <BeerDetail />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
