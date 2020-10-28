import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index'

import BeerList from './components/pages/BeerList'
import BeerDetail from './components/pages/BeerDetail'
import './App.scss'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <BeerList />
          </Route>
          <Route path="/:id">
            <BeerDetail />
          </Route>
          <Route>
            <h1 style={{color: 'white'}}>Page not found!</h1>
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
