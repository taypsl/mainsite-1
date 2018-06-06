import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const ReactMarkdown = require('react-markdown')
import { DEFAULT_LANG } from '../../../actions/types';
import { connect } from 'react-redux';
 
const uuid = require('uuid/v4')

class AccordionBoxSubContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeId: null,
			pressed: false
		}
		this.toggleClass = this.toggleClass.bind(this);
	}

	toggleClass(id) {
    if (this.state.activeId === id) {
      console.log(id, 'selected id')
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
  }

	render() {

	  let renderedContent = [];

    const lang = this.props.language;

		renderedContent = this.props.stageContent
      .map((tab) => {
      return (
				<div className="Accordion-box-item " key={tab['en-US'].id}>
					
            <div>
              <h3 onClick={() => this.toggleClass(tab.id)} className={this.state.activeId == tab.id && this.state.pressed == true ? "blue-font Accordion-box-grey": " "} >
              {tab.title[lang]}
                <span className="Accordion-box-icon">
                  {this.state.activeId == tab.id && this.state.pressed == true ? "-" : "+"}
                </span>
              </h3>

              <div className={this.state.activeId == tab.id && this.state.pressed == true ? " ": "hidden"}> 
                <div className="Accordion-box-content">
                  <ReactMarkdown source={tab.blockText[lang]} />
                </div>    
              </div>
            </div>
    
          <hr className="Accordion-box-line" />

        </div> 
			)
		})
    

		return (
			<div className="Box AccordionBoxContainer ">
				<hr className="Accordion-box-line" />
				{renderedContent}
			</div>
		)
	}
} 

function mapStateToProps(state){
  return { language: state.content.language };
}

export default connect(mapStateToProps)(AccordionBoxSubContent);

