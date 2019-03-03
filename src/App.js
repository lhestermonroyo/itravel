import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

// routes
import PrivateRoute from './PrivateRoute';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import PostTravel from './pages/PostTravel';
import TravelPost from './pages/HomePage/TravelPost';

if(localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Header></Header>
          <Switch>
            <Route exact path="/" component={LandingPage}></Route>
            <Route exact path="/login" component={LogInPage}></Route>
            <Route exact path="/signup" component={SignUpPage}></Route>
            <PrivateRoute exact path='/home' component={HomePage}></PrivateRoute>
            <PrivateRoute exact path='/travel/:id' component={TravelPost}></PrivateRoute>
            <PrivateRoute exact path='/post-travel' component={PostTravel}></PrivateRoute>
          </Switch>
        </Provider>
      </div>
    )
  }
}

export default App;