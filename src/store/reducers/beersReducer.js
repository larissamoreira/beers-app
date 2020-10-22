import { GET_BEERS, GET_BEERS_SUCCESS, GET_BEERS_FAILURE } from "../types/index";

export const initialState = {
  beers: [],
  loading: false,
  hasErrors: false,
}

export default function beersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BEERS:
      return { ...state, loading: true }
    case GET_BEERS_SUCCESS:
      return { beers: action.payload, loading: false, hasErrors: false }
    case GET_BEERS_FAILURE:
      return { ...state, loading: false, hasErrors: true }
    default:
      return state
  }
}
