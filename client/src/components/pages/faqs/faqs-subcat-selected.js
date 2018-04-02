import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFaqs } from '../../../actions/content';
import TitleLine from '../../template/title-line';
import AccordionBox from '../../template/accordion-box/accordion-box-container'
const ReactMarkdown = require('react-markdown')

class FaqsSelectedSubcategory extends Component {
	constructor() {
		super()
		this.state = {
			activeId: 0,
			pressed: false
		}
		this.toggleClass = this.toggleClass.bind(this);
	}

	toggleClass(id) {
		this.setState({ 
			activeId: id,
			pressed: !this.state.pressed 
		});
  }


	componentWillMount() {
		const label = this.props.match.params.page
		const subcatId = this.props.match.params.subcat
		this.props.fetchFaqs(label, subcatId)
	}

	

	render() {

		const lang = this.props.language;
		const renderedContent = this.props.faqs.map((faq) => {
			return (
				<div className="Accordion-box-item " key={faq.fields.id[lang]} >
				{faq.fields.title[lang]}
				

				
					
					<hr className="Accordion-box-line" />
				</div>


			)    
		})
			

		return (
			<div>
				<TitleLine title="Frequently Asked Questions" />
				<div className="Box AccordionBoxContainer ">
				{renderedContent}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return { faqs: state.content.faqs,
  				 language: state.content.language  }
}

export default connect(mapStateToProps, { fetchFaqs })(FaqsSelectedSubcategory)

/*
<h3 onClick={() => this.toggleClass(faq.fields.id)} className={this.state.activeId == faq.fields.id && this.state.pressed == true ? "blue-font": " "} >
            {faq.titles[lang]}

            <span className="Accordion-box-icon">
              {this.state.activeId == faq.fields.id && this.state.pressed == true ? "-" : "+"}
            </span>
          </h3>
          
					<div className={this.state.activeId == faq.fields.id && this.state.pressed == true ? " ": "hidden"}> 
						<div className="Accordion-box-content">
							<ReactMarkdown source={faq.blockTexts[lang]} />

						</div>
							
					</div>

*/