import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from './search';
import Languages from './languages';
import Bot from '../chatbot/Bot.jsx'; 
import { connect } from 'react-redux';
import { toggleLanguages } from '../../actions/content';
import { withRouter } from 'react-router';


class Topbar extends Component {
	constructor(props){
		super(props);
		// this.state = {lang : 'en-US'};
		this.state = {
			language: ''
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		// this.setState({
		// 	language: e.target.value
		// })
		this.props.toggleLanguages(e.target.getAttribute('value'));
	}

	render() {
		const currentUrl = window.location.href
		const splitUrl = currentUrl.split('/').slice(3,4).pop()
		
		// console.log(splitUrl, '-----concatUrl')
		return (
			<div className="Topbar" >
				<div className="Topbar-desktop">
					<Search />
					<Languages />
				</div>
				<ul className="Topbar-nav">
					<li className="Search-m topbar-nav-item"><i className="material-icons">find_in_page</i>
						<ul className="dropdown">
			        <li className="topbar-nav-item sub-menu"><div><Search /></div></li>
			      </ul>
					</li>
					<li className="Languages-m topbar-nav-item"><i className="material-icons">language</i>
			      <ul className="dropdown">
			        <li className="topbar-nav-item sub-menu" onClick={this.handleClick} key="en-US"><div value="en-US" disabled={this.props.language === 'en-US'}>English</div></li>
			        <li className="topbar-nav-item sub-menu" onClick={this.handleClick} key="es"><div value="es" disabled={this.props.language === 'es'}>Español</div></li>
			        <li className="topbar-nav-item sub-menu" onClick={this.handleClick} key="zh"><div value="zh" disabled={this.props.language === 'zh'}>中文</div></li>
			      </ul>
				  </li>
				  { splitUrl == 'smallclaims' ?
						<li className="Bot-div-m topbar-nav-item"><i className="material-icons">chat</i>
							<ul className="dropdown">
				        <Link to="/mbot"><li className="topbar-nav-item sub-menu"><div>Go to Chat</div></li></Link>
				      </ul>
						</li> 
						: 
						<li></li>
					}
				</ul>
			</div>
		)
	}
}

function mapStateToProps (state) {
	return {language: state.content.language};
}

export default withRouter(connect(mapStateToProps, { toggleLanguages })(Topbar));
//					<div className="Languages-m"><i className="material-icons">language</i></div>
//					<li className="Search-m topbar-nav-item"><Link to="/search"><i className="material-icons">find_in_page</i></Link></li>
