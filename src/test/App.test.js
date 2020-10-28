import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import App from '../App'
import BeerList from '../components/BeerList';

const mockStore = configureStore([]);

describe('App', () => {
  test('renders App component rendering/navigating', () => {
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
});
