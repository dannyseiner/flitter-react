import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
// SITES
import Home from '../Sites/Home'
import Profile from '../Sites/Profile'
import Apitest from '../Testing/ApiTest'
import Login from '../Sites/Login'
import Chat from '../Sites/Chat'
// CUSTOM Components
import AdminRoute from './AdminRoute'
import PrivateRoute from './PrivateRoute'
import Post from '../Sites/Post'
import NotFound from '../Sites/NotFound'
import PublicProfile from '../Sites/PublicProfile'


const RouterCom = () => {
    return (
        <Router >
            <Nav />
            <Switch>
                {/* PRIVATE ROUTES */}
                <PrivateRoute path='/' exact component={Home} />
                <PrivateRoute path="/profile" exact component={Profile} />
                <PrivateRoute path="/profile/:id" exact component={PublicProfile} />
                <PrivateRoute path="/post/:id" component={Post} />
                <PrivateRoute path='/chat' component={Chat} />
                {/* ADMIN ROUTES */}
                <AdminRoute path='/apiTest' component={Apitest} />
                {/* PUBLIC ROUTES */}
                <Route path='/login' exact component={Login} />
                {/* NOT FOUND*/}
                <Route path='*' component={NotFound} />
            </Switch >
        </Router >
    )
}

export default RouterCom
