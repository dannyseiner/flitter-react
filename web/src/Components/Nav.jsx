import { Link } from 'react-router-dom'
// Custom components 
import PrivateLink from './PrivateLink'
import AdminLink from './AdminLink'

const Nav = () => {

    const user = JSON.parse(sessionStorage.getItem('user'))

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
                    <li><PrivateLink to='/friends'><i className="fas fa-user-friends"></i> Friends</PrivateLink></li>
                    <li><AdminLink to='/apiTest' ><i className="fab fa-dev"></i> Api Test</AdminLink></li>
                    <li><PrivateLink to={user === null ? "" : `/profile/${user.account_id}`}><i className="fas fa-user"></i> Profile</PrivateLink></li>
                    <li><PrivateLink to='' onClick={logout} className="nav-link"><i className="fas fa-sign-out-alt"></i> Logout</PrivateLink></li>
                </ul>
            </nav>
        </div>
    )

}

export default Nav
