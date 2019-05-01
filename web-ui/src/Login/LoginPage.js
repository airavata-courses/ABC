import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Deployment from '../components/deployment';
import { GoogleLogin } from 'react-google-login';
import { userActions } from '../_actions';
class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            userName: '',
            password: '',
            submitted: false,
	    redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	this.signup = this.signup.bind(this);
    }
    signup(res, type) {
	console.log(res);
    	let postdata;
        const { dispatch } = this.props;
	if(res.w3.U3){
	   let name = res.w3.ig.split(" ");
	   postdata =  {
                firstName: name[0],
                lastName: name[1],
                email: res.w3.U3,
                userName: res.El,
		userId: res.El,
                password: res.Zi.access_token,
		type: 'google'
            } 
            
	    dispatch(userActions.googlelogin(postdata));
	}
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { userName, password } = this.state;
        const { dispatch } = this.props;
        if (userName && password) {
            dispatch(userActions.login(userName, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { userName, password, submitted } = this.state;
	const responseGoogle = (response) => {
  	    console.log(response);
	    this.signup(response, 'google');
	}
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !userName ? ' has-error' : '')}>
                        <label htmlFor="userName">userName</label>
                        <input type="text" className="form-control" name="userName" value={userName} onChange={this.handleChange} />
                        {submitted && !userName &&
                            <div className="help-block">userName is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        {loggingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="login" />
                        }
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </div>
                    <Deployment />
                </form>
	    <GoogleLogin
    		clientId="492291699458-5n1hrjgkgk2qsdcjvdt4dkn86sh3mukq.apps.googleusercontent.com"
    		render={
			renderProps => (
      				<button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
    			)
		   }
	 	buttonText="Login"
    		onSuccess={responseGoogle}
    		onFailure={responseGoogle}
    		cookiePolicy={'single_host_origin'}></GoogleLogin>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { registering } = state.registration;
    return {
        loggingIn,
        registering
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
