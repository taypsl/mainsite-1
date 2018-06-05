import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class Infobox extends Component {
	static defaultProps = { 
		infoboxClass: 'Box Info-box ',
		buttonVisibilityClass: ' ',
	};
	render() {
		return (
			<div className={this.props.infoboxClass}>
				<h3>{this.props.boxTitle}</h3>
				<hr />
				<div>{this.props.boxContent}</div>
				<a className={this.props.buttonVisibilityClass} href={this.props.buttonLink}><button className="Info-box-btn">{this.props.buttonText}</button></a>
			</div>
		) 
	}
} 

Infobox.propTypes = { limit: PropTypes.number };

//			<div className="Box Info-box">
