import { Link } from 'react-router-dom'
import React, { useState } from "react";
// Custom components 
import PrivateLink from './PrivateLink'
import AdminLink from './AdminLink'

const Nav = () => {

    const [logoutBtn] = useState(sessionStorage.getItem('user') === null ? { display: "none" } : { display: "block" });

    const logout = () => {
        sessionStorage.removeItem('user')
        window.location.replace('/login')
    }


    return (
        <nav className="navbar navbar-expand-custom navbar-mainbg">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <div className="hori-selector"><div className="left"></div><div className="right"></div></div>
                    <li className="nav-item active">
                        <Link to='/' className="nav-link" ><i className="fas fa-tachometer-alt"></i>Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <AdminLink to='/apiTest' className="nav-link" ><i className="far fa-copy"></i>Api Test</AdminLink>
                    </li>
                    <li className="nav-item">
                        <PrivateLink to='/profile' className="nav-link"><i className="far fa-calendar-alt"></i>Profile</PrivateLink>
                    </li>
                    <li className="nav-item">
                        <PrivateLink to='/chat' className="nav-link"><i className="fas fa-comment-dots"></i>Chat</PrivateLink>
                    </li>
                    <li className="nav-item">
                        <Link to='/friends' className="nav-link"><i className="fas fa-comment-dots"></i>Friends</Link>
                    </li>

                    <li className="nav-item" style={logoutBtn}>
                        <button onClick={logout} className="nav-link"><i className="far fa-calendar-alt"></i>Logout</button>
                    </li>

                </ul>

            </div>
        </nav >
    )

}

export default Nav
