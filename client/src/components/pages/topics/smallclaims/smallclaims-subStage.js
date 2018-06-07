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
import { fetchSubContentById, fetchContentByParty, fetchStages  } from '../../../../actions/content.js';

const partyIds = [
  {
    name: 'defendant',
    id: 'mI8A9AawXACAmYEmSyU0g' 
  },
  {
    name: 'plaintiff',
    id: '2zYmskK1EUW22uukow4CaU'
   }
] 

const stageIds = {
   'overview': '4ai240PycUw00eWUQqMwW4',
   'filing-a-claim': '5iDqJ92Rzqksq88gYWawE4',
   'responding-to-a-claim': '60tEp7giyceYKSuaoIUgUy',
   'day-in-court': '4HkTlYlsFqqIgscmGWOCkk',
   'judges-decision': '1cMyrIaZ680ukwwSi8YscC',
   'paying-a-judgement': '30KxWcbWQEwgMO8CKYmQCG',
   'collecting-a-judgement': '2ucYI8L74Qs6mWag6aygCo'
  };

 
class SmallClaimsSubStage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    	content: [],
      selectedParty: ''
    }
    this.toSentenceCase = this.toSentenceCase.bind(this);
    this.toSlugCase = this.toSlugCase.bind(this);
  }

  componentWillMount() {

    let _partyId;
    // check if params.party matches the partyId[x].name
    if (this.props.match.params.party === partyIds[0].name) {
        // whichever name matches, return the id to _partyId
          _partyId = partyIds[0].id
      } else {
         _partyId = partyIds[1].id
      }
    
    //fetch stages if not already present in store
    if (this.props.stages.length === 0){
      this.props.fetchStages();
    }
    // fetch and load content on first landing or when changing party
    if (this.props.stageContent.length === 0 || this.state.selectedParty !== this.props.match.params.party ){
      this.props.fetchContentByParty('SmallClaims', _partyId);
      this.props.fetchSubContentById(this.props.tabId);
      this.setState({...this.state, selectedParty: this.props.match.params.party});
    }

    
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

    return this.props.stages.length !== 0 && this.props.stageContent.length !== 0 && (
      <div>

        <TitleLine title={currentTitle} />
        {this.props.subContent ? 
          <AccordionBoxSubContent stageContent={ 
            this.props.subContent
              .sort((a, b) => a.id - b.id )} />
          :
            <div></div>
        }

        <div className="Subcat-back"><Link to={lastPageUrl}>← Back to {lastPageTitle}</Link></div>

      </div>
    )
  } 
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchSubContentById, fetchStages, fetchContentByParty}, dispatch);
}

function mapStateToProps(state) {
  return { 
    stageContent: state.content.tabs,
    tabId: state.content.tabId,
    subContent: state.content.subContent,
    stages: state.content.stages,
    content: state.content, 
    stageId: state.content.stageId,
    language: state.content.language
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SmallClaimsSubStage);
