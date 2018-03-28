import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TitleLine from '../../../template/title-line';

import TextIconBox from '../../../template/text-icon-box';
import SquareBoxStatic from '../../../template/square-box-static';

import ChecklistIcon from '../../../../img/icn_checklist.svg';
import InfoBox from '../../../template/info-box';
import AccordionBoxContainer from '../../../template/accordion-box/accordion-box-container';
import { fetchContentByParty } from '../../../../actions/content.js';
import Bot from '../../../chatbot/Bot.jsx'; 
import { DEFAULT_LANG } from '../../../../actions/types';

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
   'before': '1cMyrIaZ680ukwwSi8YscC',
   'during': '5iDqJ92Rzqksq88gYWawE4',
   'after': '4HkTlYlsFqqIgscmGWOCkk'
  };

const stageTitle = {
  'before': 0,
  'during': 1,
  'after': 2
};

class SmallClaimsStage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedStageId: this.props.stageId.id,
      selectedStageTitle: this.props.stageId.title,
      selectedContent: [],
      selectedParty: '',
    }
    this.renderMenuLinks = this.renderMenuLinks.bind(this)
    // this.filterContent = this.filterContent.bind(this)
    this.onStageSelect = this.onStageSelect.bind(this);
    this.toUpperCase = this.toUpperCase.bind(this);
  }
  componentWillMount() {
    // before component mounts, load content by selected party
    let _partyId;
    // check if params.party matches the partyId[x].name
    if (this.props.match.params.party === partyIds[0].name) {
        // whichever name matches, return the id to _partyId
          _partyId = partyIds[0].id
      } else {
         _partyId = partyIds[1].id
      }
    // fetch and load content on first landing or when changing party
    if (this.props.stageContent.length === 0 || this.state.selectedParty !== this.props.match.params.party ){
      this.props.fetchContentByParty('SmallClaims', _partyId);
      this.setState({...this.state, selectedParty: this.props.match.params.party});
    }
  }

  componentWillUpdate() {

  }

  onStageSelect(title, _id, e) {
    e.stopPropagation();
    this.setState({
      selectedStageId: _id, 
      selectedStageTitle: title,
      selectedContent: [] 
    })
  }

  // filterContent(content, findById, lang) {
  //   let filledAry = [];
  //   let emptyAry = [];
  //   // filter content by party 
  //   return content.tabs.reduce(function (acc, tab) {
  //   // first reduce gets each tab 
  //     const thisTab = tab;
  //     console.log("tab", tab);
  //     console.log("tabs-lang: ", tab.fields.stage[lang]);
  //     // second reduce gets each tab's array of stages 
  //     const aryTabs = tab.fields.stage[DEFAULT_LANG].reduce(function (acc, cat) {
  //       // checks if ID is present in stage array
  //       const tabStage = cat.sys.id.includes(findById);
  //       console.log("tabstage: ", tabStage)
  //       // if the ID matches, push the tab content to a new array
  //       return !tabStage ? emptyAry.push(thisTab) : filledAry.push(thisTab)
  //       // return !tabStage ? acc : acc.concat(Object.assign({}, cat, { tabStage }));
  //     }, []); 
  //     // console.log("7. filledAry", filledAry)
  //     // pass content to AccordionBoxContainer as props
  //     console.log("stageContent: ", filledAry);
  //     return !filledAry.length ? <AccordionBoxContainer stageContent={null} /> : <AccordionBoxContainer stageContent={filledAry} />

  //   }, []);
  // }

  renderMenuLinks(lang) {

    // return [].concat(this.props.stage)
    // // .filter(stage => stage.sys.id !== this.state.selectedStageId )
    // .sort((a, b) => a.fields.id[DEFAULT_LANG] - b.fields.id[DEFAULT_LANG])
    // .map((stage) => {
    //   return stage.sys.id !== this.state.selectedStageId && (
    //     <div className="Stage-menu-item" onClick={(e) => this.onStageSelect(stage.fields.title[lang], stage.sys.id, e)} key={stage.sys.id}>
    //       <Link to={stage.fields.url[DEFAULT_LANG]}>{stage.fields.title[lang]}</Link>
    //     </div>
    //   )
    // })
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

  
  render() {
    const currentTitle = this.state.selectedStageTitle
    const currentSection = this.props.match.params.party
    console.log("lang: ", this.props.language);
    return (
      <div>
        <Bot />
        <div className="Stage-top-bar">
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
        </div>
      {/* place holder, need to work out how to display the title w/out relying on redux store */}
        <TitleLine title={this.props.match.params.stage} />
        {/*this.filterContent(this.props.content, this.state.selectedStageId, this.props.language)*/}
        <AccordionBoxContainer stageContent={ 
          this.props.stageContent.filter(tab => {console.log(tab.stageId); console.log(stageIds[this.props.match.params.stage]); return tab.stageId === stageIds[this.props.match.params.stage]})
                      .sort((a, b) => a.id - b.id )} />
      </div>
    )
  } 
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
export default connect(mapStateToProps, { fetchContentByParty })(SmallClaimsStage);