import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFaqs } from '../../../actions/content';
import TitleLine from '../../template/title-line';
import AccordionBox from '../../template/accordion-box/accordion-box-container'
const ReactMarkdown = require('react-markdown')

// faqs/:category/:subcategoryId page 

const categoryIds = {
   'guardianship': '25rk8cpWJeA666YKwumQyu',
   'eviction': '40LEWPHtDOyySwoYGisMkg', //6qxRrat4HKc8UUk4yCGuSg',
   'dv': '6hxHMV13lS2qOMWi2q2wEq', 
   'traffic': '63WBbSieDmCW6aiWWauOko',
   'small-claims': '5iJkGCIR2gUoMKaeQOqo6W',
   'family': '4O0eqo7xHOaMMA8WyYW80C',
   'general': '2ucYI8L74Qs6mWag6aygCo'
 };


class FaqsSelectedSubcategory extends Component {
	constructor() {
		super()
		this.state = {
			activeId: 0,
			pressed: false
		}
		this.toggleClass = this.toggleClass.bind(this);
		this.renderBreadcrumbs = this.renderBreadcrumbs.bind(this);
		this.toUpperCase = this.toUpperCase.bind(this)
	}

	toggleClass(id) {
    if (this.state.activeId === id) {
      this.setState({ 
        activeId: id,
        pressed: !this.state.pressed 
      });
    } else {
      this.setState({ 
        activeId: id,
        pressed: true 
      });
    } 
  }

	componentWillMount() {
		const currentSubcat = this.props.match.params.page
		const label = categoryIds[currentSubcat]
		const subcatId = this.props.match.params.subcat
		this.props.fetchFaqs(label, subcatId)
	}

	toUpperCase(string) {
   	return string.charAt(0).toUpperCase() + string.slice(1);
  }

	renderBreadcrumbs(lang) {
		const currentSection = this.props.match.params.page
		const currentStage = this.props.match.params.subcat
		const faqSubcat = this.props.faqSubcat
		let subcatTitle;
		for (var i=0; i< faqSubcat.length; i++) {
			for (var key in faqSubcat[i]) {
				if (faqSubcat[i].sys.id == currentStage) {
					subcatTitle = faqSubcat[i].fields.title[lang]
				}
			}
		}

		return (
			<div className="breadcrumbs">
        <Link to="/faqs">FAQs</Link>
        <span className="breadcrumbs-chevron">></span>
        <Link to={`/faqs/${this.props.match.params.page}`}>{this.toUpperCase(currentSection)}</Link>
        <span className="breadcrumbs-chevron">></span>
        <Link to={`/faqs/${this.props.match.params.page}/${this.props.match.params.subcat}`}>{subcatTitle}</Link>
      </div>
    )
	}
 
	render() {
		const lang = this.props.language;
		const renderedContent = this.props.faqs.map((faq) => {
			return (
				<div className="Accordion-box-item " key={faq.fields.id["en-US"]} >

					<h3 onClick={() => this.toggleClass(faq.fields.id["en-US"])} className={this.state.activeId == faq.fields.id["en-US"] && this.state.pressed == true ? "blue-font Accordion-box-grey": " "} >
            {faq.fields.title[lang]}
            <span className="Accordion-box-icon">
              {this.state.activeId == faq.fields.id["en-US"] && this.state.pressed == true ? "-" : "+"}
            </span>
          </h3>

          <div className={this.state.activeId == faq.fields.id["en-US"] && this.state.pressed == true ? " ": "hidden"}> 
						<div className="Accordion-box-content">
							<ReactMarkdown source={faq.fields.blockText[lang]} />
						</div>
					</div>
				
					<hr className="Accordion-box-line" />
				</div>
			)    
		})
		
		return (
			<div>
				<TitleLine title={this.props.language == "en-US" ? "Frequently Asked Questions" : "Preguntas frecuentes" }  />
				{this.renderBreadcrumbs(this.props.language)}
				<div className="Box AccordionBoxContainer ">
				<hr className="Accordion-box-line" />
				{renderedContent}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return { 
  	faqs: state.content.faqs,
		language: state.content.language,
		faqSubcat: state.content.faqSubcategories  }
}

export default connect(mapStateToProps, { fetchFaqs })(FaqsSelectedSubcategory)

