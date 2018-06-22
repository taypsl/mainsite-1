import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TitleLine from '../../template/title-line';

import SquareBoxStatic from '../../template/square-box-static';

import InfoBox from '../../template/info-box';
import AccordionBoxContainer from '../../template/accordion-box/accordion-box-container';
import { fetchContentByParty, fetchStages } from '../../../actions/content.js';
import { DEFAULT_LANG } from '../../../actions/types';
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
   'before': '64dgqWF7dmuqYwCaKqEOUG',
   'during': '1OHmeVRZ9Cu8EWmQUUQQyW',
   'after': '5FKid7O1s4oKKAcoAqaSA4'
  };

class TopicStage extends Component {
  constructor(props) {
    super(props)
    this.renderMenuLinks = this.renderMenuLinks.bind(this)
  }
  componentWillMount() {
    // before component mounts, load content by selected party 
    let _partyId;
    console.log(this.props.match.url, "url")
    const currentTopic = this.props.match.params.topic;
    const currentParty = this.props.match.params.party;
    const currentStage = this.props.match.params.stage;
    // is it sound practice to parse the url and use it to look up IDs?
    // for generic topic, need to get party id from the content first
    // should I save a topic ID in the last page? but need to be able to 
    // get data if they just start on this page... 
    // check if params.party matches the partyId[x].name

    // if (this.props.match.params.party === partyIds[0].name) {
    //     // whichever name matches, return the id to _partyId
    //       _partyId = partyIds[0].id
    //   } else {
    //      _partyId = partyIds[1].id
    //   }
    

    //fetch stages if not already present in store
    if (this.props.stages.length === 0){
      this.props.fetchStages();
    }
    // check for content then fetch and load content on first landing or when changing party
    if (this.props.content.parties.length === 0 ){
    	this.props.fetchParties()
    }
    if (this.props.stageContent.length === 0 || this.state.selectedParty !== this.props.match.params.party ){
      this.props.fetchContentByParty('SmallClaims', _partyId);
      this.setState({...this.state, selectedParty: this.props.match.params.party});
    }

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
        <TitleLine title={this.props.stages.find(stage => stage.url === this.props.match.params.stage).title[this.props.language]} />
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
export default connect(mapStateToProps, mapDispatchToProps)(TopicStage);
