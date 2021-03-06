import { FETCH_RENTALS, 
         FETCH_RENTALS_SUCCESS,
         FETCH_RENTALS_INIT,
         FETCH_RENTALS_FAIL,
         FETCH_RENTAL_BY_ID_SUCCESS, 
         FETCH_RENTAL_BY_ID_INIT } from '../actions/types';

const INITIAL_STATE = {

  rentals: {
    data: [],
    errors: []
  },

  rental: {
    data: {}
  }
}

export const rentalReducer = (state = INITIAL_STATE.rentals, action) => {

    switch (action.type) {

        case FETCH_RENTALS:

            return {...state, data: action.payload};

        case FETCH_RENTALS_SUCCESS:
          return {...state, data: action.payload};

        case FETCH_RENTALS_INIT: 
          return {...state, data: [], errors: []};

        case FETCH_RENTALS_FAIL:
          return {...state, errors: action.payload, data: []};

        default: 
            return state;
    }
}

export const selectedRentalReducer = (state = INITIAL_STATE.rental, action) => {

  switch (action.type) {

    case FETCH_RENTAL_BY_ID_INIT:
      return {...state, data: {}};

    case FETCH_RENTAL_BY_ID_SUCCESS:
      return {...state, data: action.payload};

    default:
      return state;
  }
}