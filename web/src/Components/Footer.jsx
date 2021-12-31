import React from 'react'

const Footer = () => {
    return (
        <footer className="footer-distributed">

            <div className="footer-left">

                <h3>Flitter<span> Web</span></h3>

                <p className="footer-links">
                    <a href="#" className="link-1">Home</a>

                    <a href="#">Profile</a>

                    <a href="#">Friends</a>

                    <a href="#">About</a>

                    <a href="#">Faq</a>

                    <a href="#">Contact</a>
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

                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                    <a href="#"><i className="fab fa-github"></i></a>

                </div>

            </div>

        </footer>
    )
}

export default Footer