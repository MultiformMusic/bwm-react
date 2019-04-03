
import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';

class AuthService {

    tokenKey = 'auth_token';

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    invalidate() {
        localStorage.removeItem(this.tokenKey);
    }

    saveToken(token) {
        debugger;
        localStorage.setItem(this.tokenKey, token);
    }

    getExpiration(token) {
        const exp = jwt.decode(token).exp;
        return  moment.unix(exp);
    }

    isValid(token) {
        return moment().isBefore(this.getExpiration(token));
    }

    isAuthenticated() {
        const token = this.getToken();

        return (token && this.isValid(token)) ? true : false;
    }
}

export default new AuthService();