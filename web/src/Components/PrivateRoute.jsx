import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const isLogin = sessionStorage.getItem('user') !== null

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isLogin ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute
