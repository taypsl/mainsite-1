import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TitleLine from '../../../template/title-line';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Squarebox from '../../../template/square-box';
import Bannerbox from '../../../template/banner-box';
import Infobox from '../../../template/info-box';
import { fetchParties } from '../../../../actions/content.js';
import { fetchFaqs } from '../../../../actions/content.js';
import { fetchResourceLinks } from '../../../../actions/content.js';

// Bot temporarily lives only in Small Claims until all case types are functional in bot
import Bot from '../../../chatbot/Bot.jsx';
import client from '../../../../services/contentful-client'

import { DEFAULT_LANG } from '../../../../actions/types';

//3WOs1Yx3FKWAOwSYg4WsK2 smallclaims id

const temporaryFaqs = [
  {
    id: 1,
    title: "Do I need a lawyer?",
    url: "faqs"
  },
  {
    id: 2,
    title: "Which Court Should I Use: Small Claims or Limited Civil?",
    url: "faqs"
  },
  {
    id: 3,
    title: "What Kinds of Cases are Heard in Small Claims Court?",
    url: "faqs"
  },
  {
    id: 4,
    title: "How Much Money Can I Sue For?",
    url: "faqs"
  }
]

class SmallClaims extends Component {
  constructor() {
    super();
    this.state = {
      partyId: '',
      viewPopup: null
    };
    this.onPartyClick = this.onPartyClick.bind(this)
  }

  componentWillMount() {
    const unitLabel = "SmallClaims"
    const smallClaimsId = "5iJkGCIR2gUoMKaeQOqo6W"
    // this.props.parties.length === 0 && this.props.fetchParties(smallClaimsId)    
    // this.props.resources.length === 0 && this.props.fetchResourceLinks(smallClaimsId)
    this.props.fetchParties(smallClaimsId)    
    this.props.fetchResourceLinks(smallClaimsId)
    // this.props.fetchFaqs()
  }

  componentDidMount(){
    // this is to display chatbot pop up on first visit of /small-claims page
    //check if they've visited
    let visited = localStorage["alreadyVisited"];
    if(visited) {
     this.setState({ viewPopup: false })
     //do not view Popup
    } else {
     //this is the first time, show popup
     localStorage["alreadyVisited"] = true;
     this.setState({ viewPopup: true});
    }
  }

  onPartyClick(_id, e){
    this.props.storePartyId(_id)
    console.log('onpartyclick, id', _id)
    e.stopPropagation();
    this.setState({partyId: _id})
  }

  render() {
        console.log('~~~~~this.props.content', this.props.content)

    const lang = this.props.language;
    const faqs = temporaryFaqs.map((faq, index) => {
      return (
        <div key={index}>
          <Link to={faq.url}>
            <p>{faq.title}</p>
          </Link>
        </div>
      )
    })

    const resources = this.props.resources.map((item) => {
      return (
        <div key={item.resourceId}>
          {/*resource link titles not translated, now default to 'en-US'*/}
          <a href={item.url } target="_blank">{item.titles[lang] || item.titles['en-US']}</a>
        </div>
      )
    })

  // right now hard coding for smallclaims;
  // in future, should make this dynamic so the whole site can be run
  // on a few topics components
    const currentUnit = this.props.match.url.split('/')[1];
    const renderedParties = this.props.parties.map((party) => {
        return (
          <div className="Square-box-container" key={party.id}>
            <Link to={`/small-claims/${party.url}`}>
              <Squarebox 
                id={party.partyId}
                boxTitle={party.titles[lang]}  
                assetId={party.imageId}
              />
            </Link>
          </div>
        ); 
      });


    return (
      <div>
          {/* Bot temporarily lives only in Small Claims until all case types are functional in bot */}
          <Bot viewPopup={this.state.viewPopup} />
          <div className="Topic">
            <TitleLine title="Small Claims" />
            <div className="grid grid-pad">
              {renderedParties}
              {/*static content, to be linked to faq pages*/}
              <Infobox 
                boxTitle="Frequently Asked Questions"
                boxContent={faqs}
                buttonText="View More"
                infoboxClass="Box Info-box Grey-background medium-box"
              />

              <Infobox 
                boxTitle="Resources"
                boxContent={resources}
                buttonVisibilityClass="hidden"
                infoboxClass="Box Info-box small-box col-2"
              />
            </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    content: state.content,
    parties: state.content.parties,
    resources: state.content.resources,
    language: state.content.language
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( {fetchParties, fetchResourceLinks}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SmallClaims);

/*
          <Link to={`/smallclaims/${party.url}`}>
            <Squarebox
              boxTitle={party.title}
              imgSrc={party.img} 
            />
          </Link>
*/
