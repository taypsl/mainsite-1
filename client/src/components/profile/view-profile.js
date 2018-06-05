import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const cookie = new Cookies();
import { Link } from 'react-router-dom';
// import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/index';

import UserInfo from './user-info';
// import PropTypes from 'prop-types';

class ViewProfile extends Component {
	static defaultProps = { classStyle: 'Box Profile-box ' }; 
  // componentWillMount() {
  //   // Fetch user data prior to component mounting
  //   const user = cookie.get('user');
  //   const uid = user._id;
  //   this.props.fetchUser(uid);
  // }

  render() {
    return (
      <div className="Box-container">
        <div className={this.props.classStyle}>
          <div className='Portal-box-content Grey-background'>
            <h3>{this.props.profile.firstName} {this.props.profile.lastName}<Link to="register" className='Box-icon-sm'><i className="fa fa-pencil" aria-hidden="true"></i></Link></h3>

            <div>{this.props.profile.email}</div>
            <div className='Profile-address'>{this.props.profile.address}</div>
            {/*<div className='Profile-address'>Martinez, CA</div>*/}
            <div className='Profile-phone'>{this.props.profile.phone}</div>
          </div>
        </div>
        
      </div>
    );
  }
}
 
function mapStateToProps(state) {
	// console.log(state.user.profile);
  return {
    profile: state.user.profile,
  };
}

export default connect(mapStateToProps, { fetchUser })(ViewProfile);

