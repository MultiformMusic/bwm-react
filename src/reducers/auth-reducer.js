import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/types';

const INITIAL_STATE = {
    isAuth: false,
    errors: [],
    username: ''
};



export const authReducer = (state = INITIAL_STATE, action) => {

switch (action.type) {

   case LOGIN_SUCCESS:

       return Object.assign({} , state, {isAuth: true, errors: [], username: action.username});

   case LOGIN_FAILURE:
        
        return Object.assign({} , state, {isAuth: false, errors: action.payload});

   case LOGOUT:

        return Object.assign({} , state, {isAuth: false, errors: [], username: ''});


   default: 
       return state;
}
}
