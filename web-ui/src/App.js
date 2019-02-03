import React, {Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Feed from "./containers/feed";
import Login from "./components/login"
import Error from "./components/error"
import Navigation from "./components/navigation"
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navigation />
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/feed" component={Feed} />
                        <Route exact component={Error} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
