import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyCases from './my-cases';
import MyCaseData from './my-case-data';
import SquareBoxStatic from '../template/square-box-static';
import TextIconBox from '../template/text-icon-box';
import ChecklistIcon from '../../img/checklist_1.svg';
import TitleLine from '../template/title-line';

export default class MyCasesDashboard extends Component {
  componentDidMount() {
    // Fetch user data prior to component mounting
  }

  render() {
    const myCaseTitle = this.props.location.state.caseData.caseNumber
    return (
      <div>
        <TitleLine title={`My Case - ${myCaseTitle}`} />
      	<div className='dashboard-wrapper grid grid-pad'>
          <div className="Box-container">
        	  <MyCaseData className='dashboard-inner content-wrapper' caseData={this.props.location.state.caseData}/>
          </div>
          <Link to={{
            pathname:'/checklist', 
            state:{
                    caseId:this.props.location.state.caseData._id, 
                    caseType:this.props.location.state.caseData.caseType,
                    party: this.props.location.state.caseData.isPlaintiff 
                  }
          }}>
            <div className="Box-container">
              <SquareBoxStatic 
                boxTitle="My Case Checklist"
                imgSrc={ChecklistIcon}
              />
            </div>
          
          </Link>

      		<div className='sidebar-wrapper'></div>
      	</div>
      </div>
    );
  }
}
