import { GET_BEERS, GET_BEERS_SUCCESS, GET_BEERS_FAILURE } from "../types/index";
import api from '../../services/api';

export const getBeers = () => ({
  type: GET_BEERS,
})

export const getBeersSuccess = (beers) => ({
  type: GET_BEERS_SUCCESS,
  payload: beers,
})

export const getBeersFailure = () => ({
  type: GET_BEERS_FAILURE,
})

export function fetchBeers() {
  return async (dispatch) => {
    dispatch(getBeers())

    try {
      const response = await api.get('./beers')

      dispatch(getBeersSuccess(response.data))
    } catch (error) {
      dispatch(getBeersFailure())
    }
  }
}
