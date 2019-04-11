import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { rentalReducer, selectedRentalReducer } from './rental-reducer';
import { reducer as formReducer } from 'redux-form';
import { authReducer } from './auth-reducer';
import { userBookingsReducer } from './booking-reducer';

export const init = () => {

    const reducers = combineReducers({
        rentals: rentalReducer,
        rental: selectedRentalReducer,
        auth: authReducer,
        form: formReducer,
        userBookings: userBookingsReducer
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

    return store;
}