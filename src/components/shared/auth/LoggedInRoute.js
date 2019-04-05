import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';

const tokenKey = 'auth_token';

const getToken = () => {
    return localStorage.getItem(tokenKey);
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

export function LoggedInRoute(props) {

    const {component: Component, ...rest} = props;

    return(
        <Route {...rest} render={
         (props) => isAuthenticated() ? 
            <Redirect to={{pathname: '/rentals'}} /> :
            <Component {...props} {...rest} />
            
        } />
    )

}