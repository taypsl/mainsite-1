import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TitleLine from '../../../template/title-line';

import TextIconBox from '../../../template/text-icon-box';
import SquareBoxStatic from '../../../template/square-box-static';

import ChecklistIcon from '../../../../img/icn_checklist.svg';
import InfoBox from '../../../template/info-box';
import AccordionBoxSubContent from '../../../template/accordion-box/accordion-box-subcontent';
import Bot from '../../../chatbot/Bot.jsx'; 
import { DEFAULT_LANG } from '../../../../actions/types';
import { bindActionCreators } from 'redux';
import { fetchSubContentById } from '../../../../actions/content.js';

 
class SmallClaimsSubStage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    	content: []
    }
    this.toSentenceCase = this.toSentenceCase.bind(this);
    this.toSlugCase = this.toSlugCase.bind(this);
  }

  componentWillMount() {
    this.props.fetchSubContentById(this.props.tabId);
  }

  toSentenceCase(str) {
    // create a readable title from the slug
    return str.split('-').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

  toSlugCase(str) {
    // create a slug from the props.url
    return str.split('/sub')[0]
  }


  render() {
    // these vars get the page titles and back-page urls
    const currentSlug = this.props.match.params.subcat
    const currentTitle = this.toSentenceCase(currentSlug);
    const lastPageSlug = this.props.match.params.stage;
    const lastPageTitle = this.toSentenceCase(lastPageSlug);
    const currentPageUrl = this.props.match.url
    const lastPageUrl = this.toSlugCase(currentPageUrl)

    return  ( 
      <div>

        <TitleLine title={currentTitle} />
        {this.props.subContent ? 
          <AccordionBoxSubContent stageContent={ 
            this.props.subContent
              .sort((a, b) => a.id - b.id )} />
          :
            <div>hi</div>
        }

        <div className="Subcat-back"><Link to={lastPageUrl}>← Back to {lastPageTitle}</Link></div>

      </div>
    )
  } 
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchSubContentById}, dispatch);
}

function mapStateToProps(state) {
  return { 
    stageContent: state.content.tabs,
    tabId: state.content.tabId,
    subContent: state.content.subContent
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SmallClaimsSubStage);
