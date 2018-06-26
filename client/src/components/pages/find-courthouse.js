// component not used; previously was a menu linked page
import React, { Component } from 'react';
import TitleLine from '../template/title-line';

export default class FindCourthouse extends Component {
	render() {
		return (
			<div>
				<TitleLine title="Find a Courthouse" />
				<p>To view an index of Superior Court locations in California, visit the 
					<a href="http://www.courts.ca.gov/find-my-court.htm" target="_blank"> <u>Find My Court</u></a> page.
				</p>
			</div>
		)
	}
}