import React from 'react'
import { Link } from 'react-router-dom'

const isLogin = sessionStorage.getItem('user') !== null
const jsonUser = JSON.parse(sessionStorage.getItem('user'))

const AdminLink = ({ component: Component, ...rest }) => {
    return (
        isLogin && jsonUser.account_role == 2 ? <Link {...rest}></Link> : ""
    );
};

export default AdminLink
