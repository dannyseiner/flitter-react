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
        <div>
            <Link to="/" className="logo">
                <h1>Flitter</h1>
            </Link>

            <input className="menu-icon" type="checkbox" id="menu-icon" name="menu-icon" />
            <label htmlFor="menu-icon"></label>
            <nav className="nav">
                <ul className="pt-5">
                    <li><Link to='/'><i className="fas fa-tachometer-alt"></i> Homepage</Link></li>
                    <li><Link to='/friends'><i className="fas fa-user-friends"></i> Friends</Link></li>
                    <li><AdminLink to='/apiTest' ><i class="fab fa-dev"></i> Api Test</AdminLink></li>
                    <li><PrivateLink to='/profile'><i className="far fa-calendar-alt"></i> Profile</PrivateLink></li>
                    <li> <Link to='' onClick={logout} className="nav-link"><i className="fas fa-sign-out-alt"></i> Logout</Link></li>
                </ul>
            </nav>
        </div>
    )

}

export default Nav
