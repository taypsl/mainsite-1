import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from './search';
import Languages from './languages';
import Bot from '../chatbot/Bot.jsx'; 

export default class Topbar extends Component {
	render() {
		return (
			<div className="Topbar" >
				<Search />
				<div className="Search-m"><Link to="/search"><i className="material-icons">find_in_page</i></Link></div>
				<Languages />
				<div className="Languages-m"><i className="material-icons">language</i></div>
				<div className="Bot-div-m"><Link to="/mbot"><i className="material-icons">chat</i></Link></div>
			</div>
		)
	}
}