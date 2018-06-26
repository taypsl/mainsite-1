import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SquareBoxStatic from '../template/square-box-static.js';
import ViewProfile from '../profile/view-profile';
import Upcoming from '../calendar/upcoming';
import MyForms from './FormsBoxes/my-forms';
import MyCases from '../cases/my-cases';
import TitleLine from '../template/title-line';
import { API_URL, fetchUser, fetchAzureUser } from '../../actions/index';
import SearchIcon from '../../img/icn_search.svg';
import LoginIcon from '../../img/icn_login.svg';
import Cookies from 'universal-cookie';
const cookie = new Cookies();

class AzurePortalView extends Component {

  renderLinks() {
    if (this.props.authenticated) {

      return [

        <div key={`${1}profile`} className="Portal-box Portal-box-profile">
          <ViewProfile />
        </div>,
        // ============================
        <div key={`${2}cases`} className="Portal-box Portal-box-cases">
          <MyCases />
        </div>,

        // ============================
        // <div key={`${3}forms`}>
        //   <MyForms />
        // </div>,
        // ============================
        
        // <div key={`${5}search`}>
          
        //   <Link to='find-a-case'>
        //     <SquareBoxStatic
        //       boxTitle='Find a Court Case'
        //       imgSrc={SearchIcon} />
        //   </Link>
        // </div>,
        // ============================
        <div key={`${4}logout`} className='Logout'>
          <a href='/api/logout'> Logout </a>
        </div>,
      ];
    } else {
      return [
        // Unauthenticated navigation
        <div className="Square-box-container" key={1}>
          <Link to="login">
            <SquareBoxStatic
              boxTitle='Login / Sign Up'
              imgSrc={LoginIcon} />
          </Link>
        </div>,
        <div className="Square-box-container" key={2}>
          <Link to="find-a-case">
            <SquareBoxStatic 
              boxTitle='Find a Case'
              imgSrc={SearchIcon} />
          </Link>
        </div>,
      ];
    }
  }

  render() {
    return  (
      !this.props.loading &&
      <div>
        <TitleLine title="My Portal" />
        <div className="grid grid-pad portal-grid" >
            {this.renderLinks()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    loading: state.loading
  };
}

export default connect(mapStateToProps, { fetchAzureUser })(AzurePortalView);