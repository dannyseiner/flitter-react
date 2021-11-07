import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const isLogin = sessionStorage.getItem('user') !== null
const userJson = JSON.parse(sessionStorage.getItem('user'))
const AdminLink = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isLogin && userJson.account_role === 2 ?
                <Component {...props} />
                : <Redirect to="/notfound" />
        )} />
    );
};

export default AdminLink
