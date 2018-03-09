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
      partyId: ''
    };
    this.onPartyClick = this.onPartyClick.bind(this)
  }

  componentWillMount() {
    const unitLabel = "SmallClaims"
    this.props.fetchParties()
    // this.props.fetchFaqs()
    this.props.fetchResourceLinks(unitLabel)
  }

  onPartyClick(_id, e){
    this.props.storePartyId(_id)
    console.log('onpartyclick, id', _id)
    e.stopPropagation();
    this.setState({partyId: _id})
  }

  render() {
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
        <div>
          <a href={item.fields.url} target="_blank">{item.fields.title}</a>
        </div>
      )
    })

    const renderedParties = [].concat(this.props.content)
    .sort((a, b) => a.fields.id - b.fields.id)
    .map((party) => {
        return (
          <div className="Square-box-container" key={party.sys.id}>
            <Link to={`/smallclaims/${party.fields.url}`}>
              <Squarebox 
                onClick={(e) => this.onPartyClick(party.sys.id, e)}
                id={party.sys.id}
                boxTitle={party.fields.title}  
                assetId={party.fields.image.sys.id}
              />
            </Link>
          </div>
        );
      });


    return (
      <div>
          {/* Bot temporarily lives only in Small Claims until all case types are functional in bot */}
          <Bot />
          <div className="Topic">
            <TitleLine title="Small Claims" />
            <div className="grid grid-pad">
              {renderedParties}
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
    content: state.content.parties,
    resources: state.content.resources
  };
}

function mapDispatchToProps(dispatch) {
  return {
      fetchParties: bindActionCreators(fetchParties, dispatch),
      fetchResourceLinks: bindActionCreators(fetchResourceLinks, dispatch)
  };
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
