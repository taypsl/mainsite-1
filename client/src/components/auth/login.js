import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { loginUser, oidcLoginUser } from '../../actions/auth';
import SquareBox from '../template/square-box';
import TitleLine from '../template/title-line';

const form = reduxForm({
  form: 'login',
});

class Login extends Component {
  
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="Login">
        <TitleLine title="Small Claims" />
        <div className="Login-options-wrapper">
          <div className="Login-option">
            {/*<!-- test openID login -->*/}
            <p>Sign in with Microsoft Azure</p>
            <a className="Login-azure" href="/api/auth/azure-login"> Azure Login </a>
          </div>
          <div className="Login-option">
            <p>Or sign in with your email address</p>
            <form className="Login-local" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              {this.renderAlert()}
              <div>
                <label>Email</label>
                <Field name="email" className="form-control" component="input" type="text" />
              </div>
              <div>
                <label>Password</label>
                <Field name="password" className="form-control" component="input" type="password" />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
        <div>
          <h3>Don't have an account? Register <Link to="register">here.</Link></h3>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated,  
  };
}

export default connect(mapStateToProps, { loginUser })(form(Login));
