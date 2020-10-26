import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index'

import BeerList from './components/BeerList'
import BeerDetail from './components/BeerDetail'
import './App.scss'

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App
