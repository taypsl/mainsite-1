import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TitleLine from '../../template/title-line';
import { fetchFaqSubcategories } from '../../../actions/content';
import { connect } from 'react-redux';

// faq/:category page
class SelectedFaqPage extends Component {
	constructor() {
		super()
		this.renderSubCategories = this.renderSubCategories.bind(this)
		this.renderBreadcrumbs = this.renderBreadcrumbs.bind(this)
		this.toUpperCase = this.toUpperCase.bind(this)
	}

	componentWillMount() {
		const label = this.props.match.params.page;
		this.props.fetchFaqSubcategories(label);
	}

	renderSubCategories() {
		const lang = this.props.language
		return (
			this.props.faqSubcategories.map((subcat) => {
				return (
					<div  key={subcat.sys.id} className="Filter-list-group-subcat">
						<hr className="cat-line"/>
						<li className="Filter-topic">
							<Link to={`/faqs/${this.props.match.params.page}/${subcat.sys.id}`}>
								{subcat.fields.title[lang]}<i className="material-icons Filter-topic-icon">keyboard_arrow_right</i>
							</Link>
						</li>
					</div>
				)
			})
		)
	}

	renderMenuLinks(lang) {
    return this.props.stages
    .map((stage) => {
      return stage.url !== this.props.match.params.stage && (
        <div className="Stage-menu-item" key={stage.id}>
          <Link to={stage.url}>{stage.titles[lang]}</Link>
        </div>
      )
    })
  }

  toUpperCase(string) {
   	return string.charAt(0).toUpperCase() + string.slice(1);
  }

	renderBreadcrumbs(lang) {
		const currentSection = this.props.match.params.page
		return (
			<div className="breadcrumbs">
        <Link to="/faqs">FAQs</Link>
        <span className="breadcrumbs-chevron">></span>
        <Link to={`/faqs/${this.props.match.params.page}`}>{this.toUpperCase(currentSection)}</Link>
      </div>
    )
	}  

	render() {
		const currentPageName = this.props.match.params.page
		return (
			<div>
				<TitleLine title={this.props.language == "en-US" ? "Frequently Asked Questions" : "Preguntas frecuentes" } />
				{this.renderBreadcrumbs(this.props.language)}
				<div className="Filter">{this.renderSubCategories()}</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return { 
  	language: state.content.language,
  	faqSubcategories: state.content.faqSubcategories }
}

export default connect(mapStateToProps, { fetchFaqSubcategories })(SelectedFaqPage)

//return (<div className="Topic" key={