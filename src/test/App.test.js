import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import App from '../App'
import BeerList from '../components/pages/BeerList';

import thunk from 'redux-thunk'
import { fetchBeers } from '../store/actions/beersActions';
import beersReducer from '../store/reducers/beersReducer';
import { GET_BEERS_SUCCESS } from "../store/types/index";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const initialState = {
  beers: {},
  loading: false,
  hasErrors: false,
  next: 1
}

const beer = {
  name: 'Buzz',
  id: 1,
  tagline: 'A Real Bitter Experience.',
  description: 'A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.',
  image_url: 'https://images.punkapi.com/v2/keg.png'
}

describe('App', () => {
  test('should render App component', () => {
    render(<App />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Beers/i)).toBeInTheDocument();
  });
});

describe('BeersList', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      beers: {},
      loading: false,
      hasErrors: false,
      next: 1
    });

    store.dispatch = jest.fn();

    renderer.act(() => {
      component = renderer.create(
        <Provider store={store}>
          <BeerList />
        </Provider>
      );
    })
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
})

describe('Test thunk action', () => {
  it('should execute fetchPosts thunk successfully', () => {
    const store = mockStore(initialState);

    const expectedType = "GET_BEERS_SUCCESS"

    const expectedPayload = beer

    return store.dispatch(fetchBeers())
      .then(() => {
        const actualAction = store.getActions()
        expect(actualAction[0].payload[1]).toEqual(expectedPayload);
        expect(actualAction[0].type).toEqual(expectedType);
      });
  })
});

describe('Test reducer', () => {
  it('should change state successfully', () => {
    const action = {
      type: GET_BEERS_SUCCESS,
      payload: [beer]
    }
    const nextState = beersReducer(initialState, action);
    expect(nextState).toEqual({
      beers: {
        '0': {
          ...beer
        }
      },
      loading: false,
      hasErrors: false,
      next: 2
    });
  });
});
