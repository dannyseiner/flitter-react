import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer className="footer-distributed">

            <div className="footer-left">

                <h3>Flitter<span> Web</span></h3>

                <p className="footer-links">
                    <Link to='/'>Home</Link>
                    <Link to='/profile'>Profile</Link>
                    <Link to='/friends'>Friends</Link>


                </p>

                <p className="footer-company-name">FlitterEntertaiment© 2021</p>
            </div>

            <div className="footer-center">

                <div>
                    <i className="fa fa-map-marker"></i>
                    <p><span>Výstupní 31</span> Ústí nad Labem, Czech Republic</p>
                </div>

                <div>
                    <i className="fa fa-phone"></i>
                    <p>+420 123 456 789</p>
                </div>

                <div>
                    <i className="fa fa-envelope"></i>
                    <p><a href="mailto:support@company.com">support@flitter.com</a></p>
                </div>

            </div>

            <div className="footer-right">

                <p className="footer-company-about">
                    <span>About the company</span>
                    Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
                </p>

                <div className="footer-icons">

                    <Link to='/'><i className="fab fa-app-store-ios"></i></Link>
                    <Link to='/'><i className="fab fa-linkedin"></i></Link>
                    <Link to='/'><i className="fab fa-github"></i></Link>

                </div>

            </div>

        </footer>
    )
}

export default Footer