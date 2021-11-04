import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Nav from './Nav'
// SITES
import Home from '../Sites/Home'
import Profile from '../Sites/Profile'
import Apitest from '../Testing/ApiTest'
import Login from '../Sites/Login'


const RouterCom = () => {
    return (
        <Router >
            <Nav />
            <div className="main_container">
                <Switch>
                    <Route path='/' exact component={Home} />
                    < Route path="/profile" exact component={Profile} />
                    <Route path='/apiTest' exact component={Apitest} />
                    <Route path='/login' exact component={Login} />
                </Switch >
            </div >
        </Router >
    )
}

export default RouterCom
