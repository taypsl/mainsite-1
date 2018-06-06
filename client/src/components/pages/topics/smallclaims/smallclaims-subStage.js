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
    this.renderSubContent = this.renderSubContent.bind(this);
  }

  componentWillMount() {
    this.props.fetchSubContentById(this.props.tabId);
  }

  // toSentenceCase(str) {
  //   return str.split('-').map(function(word) {
  //     return (word.charAt(0).toUpperCase() + word.slice(1));
  //   }).join(' ');
  // }

  //<AccordionBoxSubContent stageContent={ 
   //       this.props.subContent.map(item => { return item.fields })
    //        .sort((a, b) => a.id - b.id )} />


  renderSubContent() {
    {this.props.subContent ? 
        <div>there</div>
      :
        <div>hi</div>
    }
  }

  render() {
    // const currentTitle = this.props.stages.find(stage => stage.url === this.props.match.params.stage).title[this.props.language]
    // const currentSlug = this.props.match.params.stage
    // const slugTitle = this.toSentenceCase(currentSlug);
    // const currentSection = this.props.match.params.party
    // const tabsWithChildren = this.props.tabs.reduce((acc, cur) => {
    //     // create duplicate entries for different stages if existent
    //     for (let i=0; i < this.props.tabs.length; i++){
    //       if (cur.sysId === this.props.tabId) { 
    //         acc = cur.children['en-US'];
    //       } else { return acc }
    //     }
    //     console.log(',,,,,,,,,,,acc', acc) // now I have single array with 4 items nested. what next?
    //     return acc;
        
    //   }, []);

    
    //console.log(this.props.subContent, '~~~~~this.props.subcontent')
    


    //const subCatComponent = this.props.subContent.map(item => item.fields)
   
    //console.log(subCatComponent, "~~~~subCatComponent")
    //this.state.subContent.length !== 0 &&
    console.log('1 this.props.subContent', this.props.subContent)

    return  ( 
      <div>
        {/*<Bot />*/}
        {/*{this.renderSubContent()}*/}
        {this.props.subContent ? 
        <AccordionBoxSubContent stageContent={ 
          this.props.subContent
            .sort((a, b) => a.id - b.id )} />
      :
        <div>hi</div>
    }
        {/*<TitleLine title={currentTitle ? currentTitle : slugTitle} />*/}
        {/*<AccordionBoxSubContent stageContent={ 
          this.props.subContent.map(item => { return item.fields })
            .sort((a, b) => a.id - b.id )} />*/}
        
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
    // stages: state.content.stages,
    // content: state.content, 
    // stageId: state.content.stageId,
    // language: state.content.language
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SmallClaimsSubStage);
// export default SmallClaimsSubStage

  // componentWillUpdate() {

  // }

  // onStageSelect(title, _id, e) {
  //   e.stopPropagation();
  //   this.setState({
  //     selectedStageId: _id, 
  //     selectedStageTitle: title,
  //     selectedContent: [] 
  //   })
  // }

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
