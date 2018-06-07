import React, { Component } from 'react';
const ReactMarkdown = require('react-markdown')

const Footer = props => {
	const lang = props.lang;
	const sections = props.sections.map((section) => {
		return (
			<div className="Footer-div Footer-left" key={section.sys.id}>
				<h3>{section.fields.title[lang]}</h3>
				<ReactMarkdown source={section.fields.blockText[lang]} />
			</div>
		)
	})
	return (
		<div className="Footer">
			{sections}
		</div>
	)
}

export default Footer;
