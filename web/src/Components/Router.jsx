import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Nav from './Nav'
// SITES
import Home from '../Sites/Home'
import Profile from '../Sites/Profile'
import Apitest from '../Testing/ApiTest'
import Login from '../Sites/Login'
// CUSTOM Components
import PrivateRoute from './PrivateRoute'
import Post from '../Sites/Post'


const RouterCom = () => {
    return (
        <Router >
            <Nav />
            <div className="main_container">
                <Switch>
                    {/* PRIVATE ROUTES */}
                    <PrivateRoute path='/' exact component={Home} />
                    <PrivateRoute path="/profile" exact component={Profile} />
                    <PrivateRoute path='/apiTest' component={Apitest} />
                    <PrivateRoute path="/post/:id" component={Post} />
                    {/* PUBLIC ROUTES */}
                    <Route path='/login' exact component={Login} />
                </Switch >
            </div >
        </Router >
    )
}

export default RouterCom
