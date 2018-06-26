// this feature was not scoped for V1
// component incomplete
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Upcoming extends Component {
  componentWillMount() {
    // Fetch user data prior to component mounting
  }

  render() {
    return (
      <div>
        <div className='Box Portal-box Upcoming-box col-2-3 '>
          <div className='Portal-box-content Yellow-background'>
            <h3>Upcoming<Link to='calendar' className='Box-icon-sm'><i className='fa fa-calendar' aria-hidden='true'></i></Link></h3>
            <hr className='Box-line-md' />
            <p>9/28/2017 </p>
            <p className='p2'>Small Claims Workshop</p>

            <hr className='Box-line-md' />
            <p>10/14/2017 </p>
            <p className='p2'>Deadline to request a change of court date</p>

            <hr className='Box-line-md' />
            <p>11/24/2017 </p>
            <p className='p2'>Court Date - 8:00am Wakefield Taylor Courthouse</p>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Upcoming

