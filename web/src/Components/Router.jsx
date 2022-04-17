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
import Friends from '../Sites/Friends'
import CreatePost from '../Sites/CreatePost'
import FastLogin from '../Sites/FastLogin'
import EditPost from '../Sites/EditPost'
import Footer from './Footer'
import StickyFooter from './StickyFooter'
import Explore from '../Sites/Explore'
import Settings from '../Sites/Settings'
import Covid from '../Sites/Covid'
import PublicPost from "../Sites/PublicPost"
const RouterCom = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))

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
                <PrivateRoute path='/friends' exact component={Friends} />
                <PrivateRoute path='/createPost' excact component={CreatePost} />
                <PrivateRoute path='/explore' excact component={Explore} />
                <PrivateRoute path='/settings' exact component={Settings} />
                {/* PRIVATE ROUTES / EDITS  */}
                <PrivateRoute path='/editpost/:id' exact component={EditPost} />
                {/* ADMIN ROUTES */}
                <AdminRoute path='/apiTest' component={Apitest} />
                {/* PUBLIC ROUTES */}
                <Route path='/login/:id' component={FastLogin} />
                <Route path='/login' exact component={Login} />
                <Route path='/covid' excact component={Covid} />
                <Route path="/publicpost/:id" exact component={PublicPost} />
                <Route path='/googleredirect' exact component={() => {
                    window.location.href = 'https://news.google.com/covid19/map?hl=en-US&mid=%2Fm%2F09c7w0&gl=US&ceid=US%3Aen'
                    return null;
                }} />
                {/* NOT FOUND*/}
                <Route path='*' component={NotFound} />
            </Switch >
            {user === null ? "" :
                <StickyFooter />
            }
            <Footer />
        </Router >
    )
}

export default RouterCom
