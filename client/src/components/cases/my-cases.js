import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../../actions/index';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
const cookie = new Cookies();

// this component displays in the profile dashboard as a list of current cases attached to user profile
class MyCases extends Component {
  constructor(props) {
    super(props); 
  }

  render() {

    return (
      <div className="Box-container">
      	<div className={this.props.classStyle}>
      		<div className='Portal-box-content '>
	      		<h3>My Cases<Link to='add-case' className='Box-icon-sm'><i className='fa fa-plus' aria-hidden='true'></i></Link></h3>
	      	  { this.props.cases.map((value) => {
              {/*console.log("case: ", value);*/}
              return (
              <div key={value._id}>
                <hr className='Box-line-md' />
                <Link to={{pathname:'/my-case', state:{caseData: value}}} className="Portal-box-link">
                  <p className="Portal-box-link-caseNumber"> { value.caseNumber ? value.caseNumber : '' } </p>
                  <p className="Portal-box-link-caseType">{ value.caseType } </p>
                </Link>
              </div>
              );
            }) }
          </div>
       	</div>
      	
      </div>
    );
  }
}
 
function mapStateToProps(state) {
  
  return {
    cases: state.user.cases,
  };
}

export default connect(mapStateToProps, { getData })(MyCases);
MyCases.defaultProps = { classStyle: 'Box Grey-background ' };  //Portal-box  
