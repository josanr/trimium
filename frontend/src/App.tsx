import * as React from "react";
import {Switch, Route, Link} from "react-router-dom";
import {Home} from "./components/Home";
import {Profile} from "./components/Profile";


interface IProps {

}

interface IState {

}


export class App extends React.Component<IProps, IState> {


    render() {
        return <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile/1">Profile</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/profile/:id' component={Profile}/>
            </Switch>
        </div>
    }
}
