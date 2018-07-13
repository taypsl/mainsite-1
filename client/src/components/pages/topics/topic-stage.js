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

const categories = [
  {
    category: 'guardianship',
    id: '25rk8cpWJeA666YKwumQyu'
  },
  {
    category: 'family-law',
    id: '4O0eqo7xHOaMMA8WyYW80C'
  },
  {
    category: 'eviction',
    id: '6qxRrat4HKc8UUk4yCGuSg'
  },
  {
    category: 'dv',
    id: '2rfORKm0KQe4K0uuEuoQci'
  },
  {
    category: 'traffic/stage',
    id: '2Syl95Uko8IwQqUgi2wSem'
  },
]

const categoryIds = {
  'guardianship': '25rk8cpWJeA666YKwumQyu',
  'family-law': '4O0eqo7xHOaMMA8WyYW80C',
  'eviction': '6qxRrat4HKc8UUk4yCGuSg',
  'dv': '2rfORKm0KQe4K0uuEuoQci',
  'traffic': '2Syl95Uko8IwQqUgi2wSem'
}

const partyIds = {
  'defendant': 'mI8A9AawXACAmYEmSyU0g',
  'plaintiff': '2zYmskK1EUW22uukow4CaU',
  'other-occupant': 'zRzI8ug932cSgAU2KkIsS',
  'parent': '5mVZkVVv7GQCCEgAyAiaay',
  'tenant': '14F7MuQjQCkUiy8gIO48Mc',
  'landlord': '5ZDpEk6mPeECMCe0oGEe2K',
  'child': '2qX3uG3lq0iaekEMsqMQcs', 
  'potential-guardian': '66Lp25CQJaQq2yUUcMacIu',
  'guardianship': '25rk8cpWJeA666YKwumQyu',
  'person-accused-of-abuse': '6hzNHOCpUWO8AuUISAyUo2', 
  'person-seeking-protection': '6yqV1xQ4fuQWs0U2SY6smW',
  'other-protected-person': '6zmut3k6ruyIucIwGaoge4',
  'party': '5PSEN0jq12KU6C0oIyCaq6'
}

const stageIds = {
   'before-your-case': '5KMyDPAZq0ui4oGUUo2cCe',//'4HkTlYlsFqqIgscmGWOCkk',
   'during-your-case': '1OHmeVRZ9Cu8EWmQUUQQyW',
   'after-your-case': '5FKid7O1s4oKKAcoAqaSA4',//'5FKid7O1s4oKKAcoAqaSA4' 
   //'information': '24PsFOM7Buy6eYScEkAm8w'
  };

class TopicStage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedParty: '',  
    }
    this.renderMenuLinks = this.renderMenuLinks.bind(this)
    this.renderTitle = this.renderTitle.bind(this)
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
    // for (let i=0; i < partyIds.length; i++) {
    //   if (this.props.match.params.party === partyIds[i].name) {
    //     // whichever name matches, return the id to _partyId
    //       _partyId = partyIds[i].id
    //     } else {
    //       _partyId = partyIds[1].id
    //     }
    // }

    console.log('~~~~~~~~~~~', categoryIds[currentTopic])
    console.log('partyIds[currentParty', partyIds[currentParty])
    console.log('this.props.stages', this.props.stages)

    //fetch stages if not already present in store
    if (this.props.stages.length === 0){
      this.props.fetchStages();
    }
    // check for content then fetch and load content on first landing or when changing party
    if (this.props.content.stages.length === 0 ){
    	this.props.fetchStages()
    }
    if (this.props.stageContent.length === 0 || this.state.selectedParty !== this.props.match.params.party ){
      this.props.fetchContentByParty(categoryIds[currentTopic], partyIds[currentParty]);
      this.setState({...this.state, selectedParty: this.props.match.params.party});
    }

  }

  renderMenuLinks(lang) {
    return this.props.stages
    .map((stage) => {
      return stage.url !== this.props.match.params.stage && (
        <div className="Stage-menu-item" key={stage.id}>
          <Link to={stage.url}>{stage.title[lang]}</Link>
        </div>
      )
    })
  }
  
  renderTitle() {
    const title = this.props.match.params.stage;
    return title.split('-').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

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
        <TitleLine title={this.renderTitle()} />
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
