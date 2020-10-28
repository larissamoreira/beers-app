import { GET_BEERS, GET_BEERS_SUCCESS, GET_BEERS_FAILURE } from "../types/index";
import { getBeerList } from '../../services/api';

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

export function fetchBeers(page = 1) {
  return async (dispatch) => {
    try {
      const data = await getBeerList(page);
      dispatch(getBeersSuccess(data));
    } catch (error) {
      dispatch(getBeersFailure())
    }
  }
}
