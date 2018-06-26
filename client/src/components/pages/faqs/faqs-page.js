import React, { Component } from 'react';
import TitleLine from '../../template/title-line';
import { Link } from 'react-router-dom';
import { fetchFaqLayout } from '../../../actions/content';
import { connect } from 'react-redux';

//faqs main landing page
class FAQs extends Component {
	constructor() {
		super()
	}

	componentWillMount() {
		// before component mounts, fetch the layout object for the faq page
		// this object contains layout information like title, subheadings, and topics list
		this.props.fetchFaqLayout()
	}

	render() {
		const lang = this.props.language;
		// grab title from faqLayout content object in state
		const renderedTitle = this.props.faqLayout.map((text) => {
			return ( <TitleLine key={text.sys.id} title={text.fields.title[lang]} />)
		})
		// grab list of subheadings from faqLayout content object in state
		const renderedSubHeading = this.props.faqLayout.map((text) => {
			return (
					<h3 key={text.sys.id}>{text.fields.subHeading[lang]}</h3>
			)
		})
		// render list of topics in link form
		const renderedTopics = this.props.faqTopics.map((topic) => {
			return (
				<div className="Filter-list-group" key={topic.sys.id}>
					<hr className="cat-line"/>
					<li className="Filter-topic">
						<Link to={`/faqs/${topic.fields.slug["en-US"]}`}>{topic.fields.title[lang]} <i className="material-icons Filter-topic-icon">keyboard_arrow_right</i></Link>
					</li>
				</div>
			)
		})

		return (
			<div>
				{renderedTitle}
				{renderedSubHeading}
				<ul className="Filter">
					{renderedTopics}
				</ul>

			</div>
		)
	}
}

function mapStateToProps(state) {
  return { 
  	faqTopics: state.content.faqTopics,
  	faqLayout: state.content.faqLayout,
  	language: state.content.language
  }
}

export default connect(mapStateToProps, { fetchFaqLayout })(FAQs)
