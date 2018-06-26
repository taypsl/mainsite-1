import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { postData } from '../../actions/index';

const form = reduxForm({
  form: 'update',
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

  if (!formProps.password) {
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

class Update extends Component {
  constructor(props){
    super(props);
    this.handleInitialize = this.handleInitialize.bind(this);
  }

  componentWillMount(){
    //check for existing profile
    this.handleInitialize();
  }

  handleInitialize() {
    const user = this.props.location.state ? this.props.location.state.user : '';
    console.log(this.props.location.state, "state")
    let initData;
    if (user) {
      //load existing case data
      initData = this.props.user.find( function(e) {return e._id === user}) 
    }
    this.props.initialize(initData);
  }

  handleFormSubmit(formProps) {
    this.props.postData(formProps);
    const uid = cookie.get('user')._id;
    this.props.postData('post_data', this.props.error, true, `/user/${uid}/postData`, this.props.dispatch, formProps);
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

    return (
      <div>
      <h1>Update Account</h1>
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
        <div className="row">
          <div className="col-md-12">
            <label>Password</label>
            <Field name="password" className="form-control" component={renderField} type="password" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    user: state.user,
    message: state.auth.message,
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, { postData })(form(Update));
