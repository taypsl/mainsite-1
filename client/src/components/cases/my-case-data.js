import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { postData } from '../../actions/index';
import { connect } from 'react-redux';
import { CLIENT_ROOT_URL, API_URL } from '../../actions/index';


class MyCaseData extends Component {
  componentDidMount() {
    // Fetch user data prior to component mounting
  }

  render() {

    return (
      <div>
      	<div className='Box Case-data-box col-2-3 '>
      		<div className='Portal-box-content Grey-background'>
	      		<h3 className='Case-data-title'>
	      			{this.props.caseData.caseType ? this.props.caseData.caseType:''} - {this.props.caseData.caseNumber ? this.props.caseData.caseNumber:''}
	      			<Link className='Box-icon-sm' to={{pathname:"/add-case", state:{id : this.props.caseData._id}}}>
	      				<i className='fa fa-pencil' aria-hidden='true'></i>
	      			</Link>
	      		</h3>
	      
	      		<br />
	      		<div className='Box-row'>     		
		      		<p>You have listed yourself as the</p>
		      		<p> <em>{this.props.caseData.isPlaintiff}</em></p>
		      		<p> in this case.</p>
		      	</div>
		      	<div className='Box-row'>     		
		      		<p>Case created on: <em>{this.props.caseData.createdAt.substring(0, 10)}</em></p>
		      	</div>		      		
      		</div>

       	</div>
      	
      </div>
    );
  }
}

export default connect(null, { postData })(MyCaseData);