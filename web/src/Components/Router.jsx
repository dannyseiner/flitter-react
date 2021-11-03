import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
// SITES
import Home from '../Sites/Home'
import Profile from '../Sites/Profile'
import ApiTest from '../Sites/ApiTest'
const RouterCom = () => {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path="/profile" exact component={Profile} />
                <Route path='/apiTest' exact component={ApiTest} />
            </Switch>
        </Router>
    )
}

export default RouterCom
