import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import 'App.css';
import RentalListing from 'components/rental/rental-listing/RentalListing';
import RentalDetail from 'components/rental/rental-detail/RentalDetail';
import { Provider } from 'react-redux';
import { init } from './reducers';
import Login from './components/login/login';
import Register from './components/register/register';
import * as actions from './actions';
import Header from './components/shared/Header';
import { ProtectedRoute } from './components/shared/auth/ProtectedRoute';
import { LoggedInRoute } from './components/shared/auth/LoggedInRoute';

const store = 
init();

class App extends Component {


  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  logout() {
    debugger;
    store.dispatch(actions.lougout());
  }

  render() {

    return (

      <Provider store={store}>
        <BrowserRouter>
          <div className="App">

            <Header logout={this.logout} />
            
            <div className='container'>
              <Route exact path="/"  render={() => { return <Redirect to="/rentals" /> }} />
              <Route exact path="/rentals" component={RentalListing} />
              <ProtectedRoute exact path="/rentals/:id" component={RentalDetail} />
              <Route exact path="/login" component={Login} />
              <LoggedInRoute exact path="/register" component={Register} />

            </div>

          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
