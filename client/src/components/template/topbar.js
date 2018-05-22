import React, { Component } from 'react';
import Search from './search';
import Languages from './languages';

export default class Topbar extends Component {
	render() {
		return (
			<div className="Topbar" >
				<Search />
				<div className="Search-m"><i className="material-icons">find_in_page</i></div>
				<Languages />
				<div className="Languages-m"><i className="material-icons">language</i></div>
			</div>
		)
	}
}