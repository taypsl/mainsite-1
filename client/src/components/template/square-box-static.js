import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { routeCodes } from '../../App.js';
import PropTypes from 'prop-types';
// import ResponsiveImage from './responsive-image';
// import Asset from './responsive-image';

export default class SquareBoxStatic extends Component {
	static defaultProps = { 
	  squareBoxClass: 'Box Square-box col-2 ',
	  buttonVisibilityClass: ' ',
	};
	render() {
		return (
			<div className={this.props.squareBoxClass} id={this.props.id}>
				<div className="Square-box-static module">
					<div className="Square-box-static-main">
						<h3>{this.props.boxTitle}</h3>
						<img src={this.props.imgSrc} /> <i className={this.props.iconClass} aria-hidden="true"></i>
					</div>
				</div>
			</div>
		)
	}
} 

SquareBoxStatic.propTypes = { limit: PropTypes.number };

//<img src={this.props.imgSrc} />
 
// how to manage icons? 
// <Icon />{this.props.glyph} 
// div needs to be a link to the /page => "/smallclaims" 
// {`/${this.props.boxLink}`}
// link to= "/:type"

/* 

						<div className="icon">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 139"><defs><style dangerouslySetInnerHTML={{__html: ".cls-1{fill:#333;}.cls-2{fill:none;}" }} /></defs>
							{this.props.svgPath}
							</svg>
						</div>

											<div className="Square-box-static-links">
						<p>{this.props.boxContent}</p>
					</div>

*/