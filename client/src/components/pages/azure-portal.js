import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_URL, fetchUser, fetchAzureUser } from '../../actions/index';

import SearchIcon from '../../img/icn_search.svg';
import LoginIcon from '../../img/icn_login.svg';
import Cookies from 'universal-cookie';
const cookie = new Cookies();
import AzurePortalView from './azure-portal-view';

class AzurePortal extends Component {
  componentWillMount() {
    // Fetch user data prior to component mounting
    this.props.fetchAzureUser();
  }

  render() {
    return (
    <div>
    { (!this.props.loading) ?   <AzurePortalView /> : 'loading...' }
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    loading: state.loading
  };
}

export default connect(mapStateToProps, { fetchAzureUser })(AzurePortal);