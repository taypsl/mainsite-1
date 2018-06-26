import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { postData, CLIENT_ROOT_URL, deleteData } from '../../actions/index';
import { UPDATE_CASE } from '../../actions/types';
import Cookies from 'universal-cookie';
import TitleLine from '../template/title-line';
const cookie = new Cookies();
const user = cookie.get('user');

const form = reduxForm({
  form: 'newCase',
  validate,
});

const renderField = ({input, label, type, meta: {touched, error}, placeholder}) => {
  return (
  <div>
    {touched && error && <div>{error}</div>}
    <input {...input} type={type} placeholder={placeholder} />
  </div>
  );
};

const renderSelect = ({input, label, type, meta: {touched, error}, children}) => {
 return (
  <div>

    {touched && error && <span>{error}</span>}
    <select {...input}>
      {children}
    </select>
  </div>
)};

function validate(formProps) {
  const errors = {};
  if (!formProps.party ){
  	errors.party = 'Please select plaintiff or defendant';
  }
  if (!formProps.caseType ){
  	errors.caseType = 'Please select a case type';
  }
  if (!formProps.caseNumber) {
    errors.caseNumber = 'Please enter your case number';
  }
  return errors;
}

const caseTypes = [
  { type: 'Small Claims', value: 'smallClaims' },
  { type: 'Guardianship', value: 'guardianship' },
  { type: 'Family', value: 'family' },
  { type: 'Traffic', value: 'traffic' },
  { type: 'Domestic Violence', value: 'dv' },
  { type: 'Eviction', value: 'eviction' }
]; 

class NewCase extends Component{ 
  constructor(props){
    super(props);
    this.handleInitialize = this.handleInitialize.bind(this);
    this.state = {newCase : true};
  }

  componentWillMount(){
    //check for existing case id
    this.handleInitialize();
  }

  handleInitialize() {
    const caseId = this.props.location.state ? this.props.location.state.id : '';
    let initData;
    if (caseId) {
      this.setState({newCase : false});
      //load existing case data
      initData = this.props.cases.find( function(e) {return e._id === caseId}) 
    }
    this.props.initialize(initData);
  }

	handleFormSubmit(formProps) {
    /*local login*/
    if (user){ 
      const uid = user._id;
  		postData(UPDATE_CASE, this.props.error, true, `/user/${uid}/updateCase`, this.props.dispatch, formProps);
      window.location.href = `${CLIENT_ROOT_URL}/portal`;
    }
    /*azure login*/
    else {
      postData(UPDATE_CASE, this.props.error, false, '/azure-user/updateCase', this.props.dispatch, formProps);
      window.location.href = `${CLIENT_ROOT_URL}/azure-portal`;
    } 
	}

  handleClick(e) {
    const isDelete = confirm("Are you sure you want to delete this case?");
    if (isDelete && user){
      const uid = user._id;
      deleteData(UPDATE_CASE, null, true, `/user/${uid}/${this.props.location.state.id}`, this.props.dispatch);
      window.location.href = `${CLIENT_ROOT_URL}/portal`;
    }
    else if (isDelete) {
      deleteData(UPDATE_CASE, null, false, `/azure-user/${this.props.location.state.id}`, this.props.dispatch);
      window.location.href = `${CLIENT_ROOT_URL}/azure-portal`;
    }
  }

	renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <p className="warning"><strong>Error!</strong> {this.props.errorMessage}</p>
        </div>
      );
     }
  	}

	render() {
    /*handleSubmit a property in reduxForm*/
  	const { handleSubmit, pristine, reset, submitting } = this.props;
  	return (
  		<div className="Add-edit-case">
  		<TitleLine title={`${this.state.newCase ? "Create" : "Update"} Your Case`} />
  		<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

        <div className="case-form-group select select-case-type">
          <label>Select a Case Type</label>
          <Field className="form-control" name="caseType" component={renderSelect} >
            <option> </option>
            <option value="smallClaims">Small Claims</option>
            <option value="guardianship">Guardianship</option>
            <option value="family">Family</option>
            <option value="traffic">Traffic</option>
            <option value="dv">Domestic Violence</option>
            <option value="eviction">Eviction</option>
          </Field>
        </div>

        <div className="case-form-group select select-party">
  				<label>Party (select one)</label>
  				<div className="radio-row">
              <Field className="form-control" name="party" component={renderField} type="radio" value="plaintiff" />
              <p className="form-control-input-p">Plaintiff</p>
          </div>
          <div className="radio-row">
              <Field className="form-control" name="party" component={renderField} type="radio" value="defendant"/>
              <p className="form-control-input-p">Defendant</p>
          </div>
  			</div>

  			<div className="case-form-group case-number">
  				<label>Case Number</label>
  				<div>
          <Field className="form-control caseNumber-form-control" name="caseNumber" component={renderField} placeholder="Case Number"  />    				
  				</div>
  			</div>
  			
  			<div className="case-form-group case-page-buttons">
		        <button className="button button-submit" type="submit" disabled={pristine || submitting}>Submit</button>
		        <div className="danger-buttons">
              <button className="button button-clear" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
              <button type="button" className="button button-delete" onClick={this.handleClick.bind(this)}>Delete Case</button>
            </div>
	      </div>

  		</form>
  		</div>
  	);
	}
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.message,
    cases: state.user.cases,
  };
}

export default connect(mapStateToProps)(form(NewCase));