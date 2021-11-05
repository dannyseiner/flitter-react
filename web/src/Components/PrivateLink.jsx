import React from 'react'
import { Link } from 'react-router-dom'

const isLogin = sessionStorage.getItem('user') !== null
const PrivateLink = ({ component: Component, ...rest }) => {
    return (
        isLogin ? <Link {...rest}></Link> : ""
    );
};

export default PrivateLink
