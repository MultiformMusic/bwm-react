import axios from 'axios';
import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';

import axiosService from '../services/axios-service';

import {  
         FETCH_RENTALS_SUCCESS,
         FETCH_RENTAL_BY_ID_SUCCESS, 
         FETCH_RENTAL_BY_ID_INIT,
         LOGIN_SUCCESS,
         LOGIN_FAILURE,
         LOGOUT } from './types';

         const tokenKey = 'auth_token';

         const getToken = () => {
             return localStorage.getItem(tokenKey);
         }
     
         const invalidate= () => {
           debugger;
             localStorage.removeItem(tokenKey);
         }
     
         const saveToken= (token) => {
             debugger;
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
           debugger;
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

export const fetchRentals = () => {

    return dispatch => {
      axiosInstance.get('/rentals')
           .then(res => {
              dispatch(fetchRentalsSuccess(res.data));
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

  return {
    type: LOGIN_SUCCESS
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
    debugger;
    if (isAuthenticated()) {
      dispatch(loginSuccess());    }
  }
}

export const login = userData => {

  return dispatch => {
    return axios.post('api/v1/users/auth', {...userData})
                 .then(res => res.data)
                 .then(token => {
                   debugger;
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