import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../../actions/auth';
import { postData, CLIENT_ROOT_URL } from '../../actions/index';
import { FETCH_USER } from '../../actions/types';


import Cookies from 'universal-cookie';
const cookie = new Cookies();
const user = cookie.get('user');

const form = reduxForm({
  form: 'register',
  validate,
});

const renderField = field => (
  <div>
    <input className="form-control" {...field.input} />
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

function validate(formProps) {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (formProps.password && !formProps.password ) {
    console.log("field error", formProps.password);
    errors.password = 'Please enter a password';
  }

  if (!formProps.address) {
    errors.address = 'Please enter an address';
  }

  if (!formProps.phone) {
    errors.phone = 'Please enter a phone number';
  }
  return errors;
}

class Register extends Component {
  constructor(props){
    super(props);
    this.handleInitialize = this.handleInitialize.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount(){
    this.handleInitialize();
  }

  handleInitialize(){
    this.props.initialize(this.props.profile);
  }

  handleFormSubmit(formProps) {
    if (this.props.authenticated) {
      //existing profile
      console.log("existing profile");
      if (user){
        postData(FETCH_USER, null, true, `/user/${user._id}/updateProfile`, this.props.dispatch, formProps);
        window.location.href = `${CLIENT_ROOT_URL}/portal`; 
      }else {
        postData(FETCH_USER, null, false, '/azure-user/updateProfile', this.props.dispatch, formProps);
        window.location.href = `${CLIENT_ROOT_URL}/azure-portal`;
      }
      
    }else{
      //new profile
      console.log("creating new profile");
      this.props.registerUser(formProps);
    }
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
    /*handleSubmit a property in reduxForm*/
    const { handleSubmit } = this.props;
    // console.log("Values:", this.values);

    return (
      <div>
      <h1>{this.props.authenticated ? "Update Your Profile" : "Register a New Account" }</h1>
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        {this.renderAlert()} 
        <div className="row">
          <div className="col-md-6">
            <label>First Name</label>
            <Field name="firstName" className="form-control" component={renderField} type="text" />
          </div>
          <div className="col-md-6">
            <label>Last Name</label>
            <Field name="lastName" className="form-control" component={renderField} type="text" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label>Email</label>
            <Field name="email" className="form-control" component={renderField} type="text" />
          </div>
          <div className="col-md-12">
            <label>Address</label>
            <Field name="address" className="form-control" component={renderField} type="text" />
          </div>
          <div className="col-md-12">
            <label>Phone</label>
            <Field name="phone" className="form-control" component={renderField} type="text" />
          </div>

        </div>
        {!this.props.authenticated &&
          <div className="row">
            <div className="col-md-12">
              <label>Password</label>
              <Field name="password" className="form-control" component={renderField} type="password" />
            </div>
          </div>
        }
        <button type="submit" className="btn btn-primary">{this.props.authenticated ? "Save" : "Register"}</button>
      </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated,
    profile: state.user.profile,
    // values: state.form.register.values,
  };
}

export default connect(mapStateToProps, { registerUser })(form(Register));
