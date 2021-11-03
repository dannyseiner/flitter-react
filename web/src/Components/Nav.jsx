import { Link } from 'react-router-dom'
import React, { Component } from "react";

const Nav = () => {
    return (
        <nav className="navbar navbar-expand-custom navbar-mainbg">
            <button className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars text-white"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <div className="hori-selector"><div className="left"></div><div className="right"></div></div>
                    <li className="nav-item">
                        <Link to='/' className="nav-link" href="javascript:void(0);"><i className="fas fa-tachometer-alt"></i>Dashboard</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to='/profile' className="nav-link" href="javascript:void(0);"><i className="far fa-address-book"></i>Address Book</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:void(0);"><i className="far fa-clone"></i>Components</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:void(0);"><i className="far fa-calendar-alt"></i>Calendar</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:void(0);"><i className="far fa-chart-bar"></i>Charts</a>
                    </li>
                    <li className="nav-item">
                        <Link to='/apiTest' className="nav-link" href="javascript:void(0);"><i className="far fa-copy"></i>Api Test</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )

}

export default Nav
