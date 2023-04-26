import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext, FirebaseContext } from './Context';

// HOC to check if user is logged in
const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const { user } = useContext(AuthContext); // Move useContext inside a functional component

    // Redirect to home page if user is logged in and trying to access /login route
    if (user && props.location.pathname === '/login') {
      return <Redirect to="/" />;
    }

    // Render the wrapped component if user is logged in or not
    return <Component {...props} />;
  }

  return AuthenticatedComponent;
}

export default withAuth;
