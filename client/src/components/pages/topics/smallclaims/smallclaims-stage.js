import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TitleLine from '../../../template/title-line';

import TextIconBox from '../../../template/text-icon-box';
import SquareBoxStatic from '../../../template/square-box-static';

import ChecklistIcon from '../../../../img/icn_checklist.svg';
import InfoBox from '../../../template/info-box';
import AccordionBoxContainer from '../../../template/accordion-box/accordion-box-container';
import { fetchContentByParty, fetchStages } from '../../../../actions/content.js';
import Bot from '../../../chatbot/Bot.jsx'; 
import { DEFAULT_LANG } from '../../../../actions/types';
import { bindActionCreators } from 'redux';

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

// const stageIds = [
//   {
//     name: 'before',
//     id: '1cMyrIaZ680ukwwSi8YscC'
//   },
//   {
//     name: 'during',
//     id: '5iDqJ92Rzqksq88gYWawE4'
//   },
//   {
//     name: 'after',
//     id: '4HkTlYlsFqqIgscmGWOCkk'
//   }
// ]

const stageIds = {
   'overview': '4ai240PycUw00eWUQqMwW4',
   'filing-a-claim': '5iDqJ92Rzqksq88gYWawE4',
   'responding-to-a-claim': '60tEp7giyceYKSuaoIUgUy',
   'day-in-court': '4HkTlYlsFqqIgscmGWOCkk',
   'judges-decision': '1cMyrIaZ680ukwwSi8YscC',
   'paying-a-judgement': '30KxWcbWQEwgMO8CKYmQCG',
   'collecting-a-judgement': '2ucYI8L74Qs6mWag6aygCo'
  };

// const stageTitleIdx = {
//   'before': 0,
//   'during': 1,
//   'after': 2
// }; 

class SmallClaimsStage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // selectedStageId: this.props.stageId.id,
      // selectedStageTitle: this.props.stageId.title,
      // selectedContent: [],
      selectedParty: '',  
    }
    this.renderMenuLinks = this.renderMenuLinks.bind(this)
    // this.filterContent = this.filterContent.bind(this)
    // this.onStageSelect = this.onStageSelect.bind(this);
    //this.toSentenceCase = this.toSentenceCase.bind(this);
  }
  componentWillMount() {
    const smallClaimsId = "5iJkGCIR2gUoMKaeQOqo6W"

    // before component mounts, load content by selected party 
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
      this.props.fetchContentByParty(smallClaimsId, _partyId);
      this.setState({...this.state, selectedParty: this.props.match.params.party});
    }

  }

  renderMenuLinks(lang) {
    return this.props.stages
    .map((stage) => {
      return stage.slug !== this.props.match.params.stage && (
        <div className="Stage-menu-item" key={stage.id}>
          <Link to={stage.slug}>{stage.titles[lang]}</Link>
        </div>
      )
    })
  }

  // toSentenceCase(str) {
  //   return str.split('-').map(function(word) {
  //     return (word.charAt(0).toUpperCase() + word.slice(1));
  //   }).join(' ');
  // }
  
  render() {
    //const currentTitle = this.props.stages.find(stage => stage.url === this.props.match.params.stage).title[this.props.language]
    //const currentSlug = this.props.match.params.stage
    //const slugTitle = this.toSentenceCase(currentSlug);
    //const currentSection = this.props.match.params.party
    console.log('state.content.tabs', this.props.stageContent)
    console.log("current stage: ", this.props.stages);
    console.log("lang: ", this.props.language);
    return this.props.stages.length !== 0 && this.props.stageContent.length !== 0 && (
      <div>
        <Bot />
        {/*Temporarily removing breadcrumbs while we contend with multple stages */}
        {/*<div className="Stage-top-bar">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span className="breadcrumbs-chevron">></span>
            <Link to="/smallclaims">Small Claims</Link>
            <span className="breadcrumbs-chevron">></span> 
            <Link to={`/smallclaims/${this.props.match.params.party}`}>{this.toUpperCase(currentSection)}</Link>
          </div>
          <div className="Stage-menu">
            {this.renderMenuLinks(this.props.language)}
          </div>
        </div>*/}
      {/* place holder, need to work out how to display the title w/out relying on redux store */}
        <TitleLine title={this.props.stages.find(stage => stage.slug === this.props.match.params.stage).title[this.props.language]} />
        <AccordionBoxContainer stageUrl={this.props.match.params.stage} stageContent={ 
          this.props.stageContent.filter(tab => { return tab.stageId === stageIds[this.props.match.params.stage] })
            .sort((a, b) => a.id - b.id )} />
      </div>
    )
  } 
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchStages, fetchContentByParty}, dispatch);
}

function mapStateToProps(state) {
  return { 
    stageContent: state.content.tabs,
    stages: state.content.stages,
    content: state.content, 
    stageId: state.content.stageId,
    language: state.content.language
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SmallClaimsStage);
