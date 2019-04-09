import axios from 'axios';
import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';

import axiosService from '../services/axios-service';

import {  
         FETCH_RENTALS_SUCCESS,
         FETCH_RENTAL_BY_ID_SUCCESS, 
         FETCH_RENTAL_BY_ID_INIT,
         FETCH_RENTALS_FAIL,
         FETCH_RENTALS_INIT,
         LOGIN_SUCCESS,
         LOGIN_FAILURE,
         LOGOUT } from './types';
import authService from '../services/auth-service';

         const tokenKey = 'auth_token';

         const getToken = () => {
             return localStorage.getItem(tokenKey);
         }
     
         const invalidate= () => {
             localStorage.removeItem(tokenKey);
         }
     
         const saveToken= (token) => {
             localStorage.setItem(tokenKey, token);
         }
     
         const getExpiration= (token) => {
             const exp = jwt.decode(token).exp;
             return  moment.unix(exp);
         }
     
         const isValid= (token) => {
             return moment().isBefore(getExpiration(token));
         }
     
         const isAuthenticated= () => {
             const token = getToken();
     
             return (token && isValid(token)) ? true : false;
         }

/** RENTAL ACTIONS */

const axiosInstance = axiosService.getInstance();

const fetchRentalByIdInit = () => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT,
  }
}

const fetchRentalByIdSuccess = (rental) => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    payload: rental
  }
}

const fetchRentalsSuccess = (rentals) => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    payload: rentals
  }
}

const fetchRentalsInit = () => {
  return {
    type: FETCH_RENTALS_INIT,
  }
}


const fetchRentalsFail = (errors) => {
  return {
    type: FETCH_RENTALS_FAIL,
    payload: errors
  }
}

export const fetchRentals = (city) => {

    const url = city ? '/rentals?city=' + city  : '/rentals';
    return dispatch => {

      dispatch(fetchRentalsInit);
      axiosInstance.get(url)
           .then(res => {
             console.log("fetchRentals")
              dispatch(fetchRentalsSuccess(res.data));
           })
           .catch((error) => {
            dispatch(fetchRentalsFail(error.response.data.errors))
            });
    }
}

export const fetchRentalById = (rentalId) => {

  return dispatch => {

    dispatch(fetchRentalByIdInit());
    axios.get('/api/v1/rentals/' + rentalId)
         .then(res => {
            dispatch(fetchRentalByIdSuccess(res.data));
         });

  }

}

export const createRental = rentalData => {

  return axiosInstance.post('/rentals', rentalData)
              .then(
                res => res.data
                ,
                err => Promise.reject(err.response.data.errors)              
              )
}

/** AUTH ACTIONS */

export const register = userData => {

  return axios.post('/api/v1/users/register', {...userData})
              .then(
                res => res.data
                ,
                err => Promise.reject(err.response.data.errors)              
              )
}

const loginSuccess = () => {

  const username = authService.getUsername();

  return {
    type: LOGIN_SUCCESS,
    username
  }
}

const loginFailure = errors => {

  return {
    type: LOGIN_FAILURE,
    payload: errors
  }
}

export const checkAuthState = () => {
 
  return dispatch => {
    if (isAuthenticated()) {
      dispatch(loginSuccess());    }
  }
}

export const login = userData => {

  return dispatch => {
    return axios.post('api/v1/users/auth', userData)
                 .then(res => res.data)
                 .then(token => {
                   saveToken(token);
                   dispatch(loginSuccess());
                 })
                 .catch(error => {
                    dispatch(loginFailure(error.response.data.errors));
                 })
  }
}

export const lougout = () => {

  invalidate();

  return {
    type: LOGOUT
  }
}

export const createBooking = (booking) => {

  return axiosInstance.post('bookings', booking)
                       .then(res => res.data)
                       .catch(error => Promise.reject(error.response.data.errors))
}