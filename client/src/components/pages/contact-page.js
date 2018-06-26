import React, { Component } from 'react';
import TitleLine from '../template/title-line';
import InfoBox from '../template/info-box';
import { Link } from 'react-router-dom';
import { fetchContactPage } from '../../actions/content';
import { connect } from 'react-redux';
const ReactMarkdown = require('react-markdown')

class Contact extends Component {
	constructor() {
		super()
	}

	componentWillMount() {
		// fetch contact content from contentful
		this.props.fetchContactPage()
	}

	render() {
		const lang = this.props.language;

		const renderedSections = this.props.contactSections.map((section) => {
			const markedContent = <ReactMarkdown source={section.fields.blockText[lang]} />
			return (

				<InfoBox
					boxTitle={section.fields.title[lang]}
					boxContent={markedContent}
					key={section.sys.id} />
			)
		})

		const renderedTitle = <TitleLine title={this.props.contactTitle[lang]} />

		return (
			<div>
				{renderedTitle}
				{renderedSections}
			</div>
		)
	}
}

function mapStateToProps(state) {
  return { 
  	contactTitle: state.content.contactTitle,
  	contactSections: state.content.contactSections,
  	language: state.content.language
  }
}

export default connect(mapStateToProps, { fetchContactPage })(Contact)