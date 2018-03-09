import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStages } from '../../../../actions/content.js';
import { storeStageId } from '../../../../actions/content.js';

import TitleLine from '../../../template/title-line';

import TextIconBox from '../../../template/text-icon-box';
import ChecklistIcon from '../../../../img/icn_checklist.svg';
import InfoBox from '../../../template/info-box';
import AccordionBoxContainer from '../../../template/accordion-box/accordion-box-container';
import SquareBox from '../../../template/square-box';
//temporarily porting in bot here and on /smallclaims. eventually bring outside of topics pages
import Bot from '../../../chatbot/Bot.jsx'; 

class SmallClaimsParty extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buttonSelected: false,
			stageTitle: '',
      stageId: null
		}
		this.onStageSelect = this.onStageSelect.bind(this);
	}

  componentWillMount() {
    this.props.fetchStages()
  }

	onStageSelect(title, id, e) {
    e.stopPropagation();
    // when stage selected, store stageId in state
    this.props.storeStageId(title, id);
	}

	render() {
		const resources = this.props.resources.map((item) => {
			return (
				<div>
					<a href={item.fields.url} target="_blank">{item.fields.title}</a>
				</div>
			)
		})

    const renderedStages = [].concat(this.props.content)
    .sort((a, b) => a.fields.id - b.fields.id)
    .map((stage) => {
      return (
      <div  className="Square-box-container" onClick={(e) => this.onStageSelect(stage.fields.title, stage.sys.id, e)} key={stage.sys.id}>
        <Link to={`${this.props.match.url}/${stage.fields.url}`}>
          <SquareBox
            id={stage.sys.id}
            boxTitle={stage.fields.title}
            assetId={stage.fields.image.sys.id}
          />
        </Link>
      </div> 
      )
    })

		return (
  		<div>
        <Bot />
  			<TitleLine title="Small Claims" />
        <div className="grid grid-pad">

          {renderedStages}

          <TextIconBox 
        		boxTitle="Small Claims Checklist"
        		boxContent="Use our interactive checklist to help you manage your small claims case before you file, during your case, and after a judgement has been made."
        		iconLarge={ChecklistIcon}
        		TextIconBoxClass="Box Text-icon-box Blue-border Grey-background medium-box"
        		buttonLink="/checklist"
            caseType='smallClaims'
            party={this.props.match.params.party}
      		/>

        	<InfoBox 
        		boxTitle="Resources"
        		boxContent={resources}
        		buttonVisibilityClass="hidden"
        		infoboxClass="Box Info-box small-box col-2"
        		/>
        </div>
	    </div>
		)
  } 
}

function mapStateToProps(state) {
  return { 
    content: state.content.stages,
    stageId: state.content.stageId,
    resources: state.content.resources
  };
}

function mapDispatchToProps(dispatch) {
  return {
      fetchStages: bindActionCreators(fetchStages, dispatch),
      storeStageId: bindActionCreators(storeStageId, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SmallClaimsParty);
