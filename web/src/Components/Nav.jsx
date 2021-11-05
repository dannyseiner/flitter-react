import { Link } from 'react-router-dom'
import React, { Component, useState } from "react";
// Custom components 
import PrivateLink from './PrivateLink'

const Nav = () => {

    const [logoutBtn, setlogoutBtn] = useState(sessionStorage.getItem('user') === null ? { display: "none" } : { display: "block" });

    const logout = () => {
        sessionStorage.removeItem('user')
        window.location.reload()
    }

    return (
        <nav className="navbar navbar-expand-custom navbar-mainbg">
            <button className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars text-white"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <div className="hori-selector"><div className="left"></div><div className="right"></div></div>
                    <li className="nav-item active">
                        <Link to='/' className="nav-link"><i className="fas fa-tachometer-alt"></i>Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <PrivateLink to='/apiTest' className="nav-link" ><i className="far fa-copy"></i>Api Test</PrivateLink>
                    </li>
                    <li className="nav-item">
                        <PrivateLink to='/profile' className="nav-link"><i className="far fa-calendar-alt"></i>Profile</PrivateLink>
                    </li>
                    <li className="nav-item" style={logoutBtn}>
                        <a onClick={logout} className="nav-link"><i className="far fa-calendar-alt"></i>Logout</a>
                    </li>

                </ul>

            </div>
        </nav >
    )

}

export default Nav
