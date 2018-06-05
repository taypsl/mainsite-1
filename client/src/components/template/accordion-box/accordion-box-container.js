import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import marked from 'marked';
import { CSSTransitionGroup } from 'react-transition-group'
const ReactMarkdown = require('react-markdown')
import { DEFAULT_LANG } from '../../../actions/types';
import { connect } from 'react-redux';

const uuid = require('uuid/v4')

class AccordionBoxContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeId: null,
			pressed: false
		}
		this.toggleClass = this.toggleClass.bind(this);
		// this.getParsedMarkdown = this.getParsedMarkdown.bind(this);
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
		//console.log(this.state, 'print this.state for toggleClass')
  }

  // when the active id is pressed, need to have it display open the box that is clicked... 
  // so should I store the class in the state?

  componentWillMount() {
  	// console.log("Next Page: this.props.stageContent", this.props.stageContent)
  }

  // getParsedMarkdown(content) {
  // 	return {
  // 		__html: marked(content, {sanitize: true})
  // 	}
  // }

	render() {
		// return <div>test</div>

	  let renderedContent = [];

    // used to render videolinks
    if (this.props.type === 'links' && this.props.hasOwnProperty('itemField')) {

      renderedContent = Object.keys(this.props.stageContent)
      // .sort((a, b) => a.title > b.title)
      .map((contentKey) => {
        const tab = this.props.stageContent[contentKey];
        const links = tab[this.props.itemField];

        return (
          <div className="Accordion-box-item " key={uuid()}>
            <h3 onClick={() => this.toggleClass(tab.id)} className={this.state.activeId == tab.id && this.state.pressed == true ? "blue-font Accordion-box-grey": " "} >
              {tab.title}

              <span className="Accordion-box-icon">
                {this.state.activeId == tab.id && this.state.pressed == true ? "-" : "+"}
              </span>
            </h3>
            
            <div className={this.state.activeId == tab.id && this.state.pressed == true ? " ": "hidden"}> {/*&& this.state.pressed == true */}
              <div className="Accordion-box-content">
                {
                  Object.keys(links).map((linkKey) => {
                    const videoLink = links[linkKey];

                    if (videoLink.hasOwnProperty('link')) {
                      return (
                        <div key={uuid()}>
                          <a href={videoLink.link} target="_blank">
                            {videoLink.title}
                          </a>
                        </div>
                      )
                    }

                    return (
                      <div key={uuid()}>
                        <Link to={this.props.linkTo + videoLink.linkTo}>
                          {videoLink.title}
                        </Link>
                      </div>
                    )
                  })
                }

                {/*<div dangerouslySetInnerHTML={ { __html: input } }></div>*/}
              </div>
              {/*           <div dangerouslySetInnerHTML={this.getParsedMarkdown(input)}></div>
              */}         


            </div>
            <hr className="Accordion-box-line" />
          </div>
        )
      })
    }
    // used to render non-videoLink stageContent
    else {
      const lang = this.props.language;
    //   renderedContent = renderedContent.concat(this.props.stageContent)
    //   .sort((a, b) => a.fields.id[DEFAULT_LANG] > b.fields.id[DEFAULT_LANG])
    //   .map((tab) => {
  		// // const renderedContent = this.props.stageContent.map((tab) => {
  		// 	const input = tab.fields.blockText[lang] || '';
  		renderedContent = this.props.stageContent
        .map((tab, key) => {
        // console.log("tab: ", tab);	
        return (
  				<div className="Accordion-box-item " key={tab.id}>
  					<h3 onClick={() => this.toggleClass(tab.id)} className={this.state.activeId == tab.id && this.state.pressed == true ? "blue-font Accordion-box-grey": " "} >
              {tab.titles[lang]}

              <span className="Accordion-box-icon">
                {this.state.activeId == tab.id && this.state.pressed == true ? "-" : "+"}
              </span>
            </h3>
            
  					<div className={this.state.activeId == tab.id && this.state.pressed == true ? " ": "hidden"}> 
  						<div className="Accordion-box-content">
  							<ReactMarkdown source={tab.blockTexts[lang]} />

  							{/*<div dangerouslySetInnerHTML={ { __html: input } }></div>*/}
  						</div>
  						{/*						<div dangerouslySetInnerHTML={this.getParsedMarkdown(input)}></div>
  						*/}					

  					</div>
  					<hr className="Accordion-box-line" />
  				</div> 
  			)
  		})
    }
		// const newContent = this.props.stageContent.filter((tab) => {
  // 		tab.fields.stage.map((item) => item.sys.id == stageId)
  // 	})

		return (
			<div className="Box AccordionBoxContainer ">
				<hr className="Accordion-box-line" />

				{renderedContent}
			</div>
		)
	}
} 

// AccordionBoxContainer.propTypes = {
//   tabs: PropTypes.arrayOf(PropTypes.shape({
//     activeId: PropTypes.number.isRequired,
//     // expanded: PropTypes.bool.isRequired,
//     // blockText: PropTypes.string.isRequired, 
    
//   }).isRequired).isRequired,
//   	toggleClass: PropTypes.func.isRequired
//   // onTabClick: PropTypes.func.isRequired,
//   // onAccordionClick: PropTypes.func.isRequired,
// }

/* 
	render() {
		const renderedContent = this.props.stageContent.map((tab) => {
			return (
				<div className="Accordion-box-item " key={tab.sys.id}>
					<h3 onClick={() => this.toggleClass(tab.sys.id)}>{tab.sys.title}<span></span></h3>
					<div className={this.state.activeId == tab.sys.id && this.state.pressed == true ? " ": "hidden"} >{tab.fields.blockText}</div>
					<hr />
				</div>
			)
		})
		return (
			<div className="Box AccordionBoxContainer medium-box">
				<hr />
				{renderedContent}
			</div>
		)
	}
} 
*/
function mapStateToProps(state){
  return { language: state.content.language };
}

export default connect(mapStateToProps)(AccordionBoxContainer);