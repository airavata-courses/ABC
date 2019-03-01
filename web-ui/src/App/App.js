import React, {Component} from 'react';
import { connect } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Feed } from '../Feed';
import Error from '../components/error'
import { RegisterPage } from '../Register';
import { LoginPage } from '../Login';
import { HomePage } from '../Home';
import { Search } from '../Search';
import { Followers } from '../Search';
import { Following } from '../Search';
import { PrivateRoute } from '../components';
import { history } from '../_helpers'
import { alertActions } from '../_actions';

import { Router, Route, Switch } from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }
    render() {
        const { alert } = this.props;
        return (

            <div className="jumbotron">
                <div className="container">
                    <div>

                        { alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <Switch>
                                    <PrivateRoute exact path="/" component={Feed} />
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/register" component={RegisterPage} />
                                    <PrivateRoute exact path="/search" component={Search} />
                                    <PrivateRoute exact path="/followers" component={Followers} />
                                    <PrivateRoute exact path="/following" component={Following} />
                                    <Route exact component={Error} />
                                </Switch>
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {

    const { alert } = state;
    return {
        alert
    };
}

const ConnectedApp = connect(mapStateToProps)(App);
export { ConnectedApp as App };
