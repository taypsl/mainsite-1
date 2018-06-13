import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TitleLine from '../../template/title-line';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Squarebox from '../../template/square-box';
// import Bannerbox from '../../../template/banner-box';
import Infobox from '../../template/info-box';
import { fetchParties, fetchFaqs, fetchResourceLinks } from '../../../actions/content.js';

import client from '../../../services/contentful-client'

import { DEFAULT_LANG } from '../../../actions/types';

// const temporaryFaqs = [
//   {
//     id: 1,
//     title: "Do I need a lawyer?",
//     url: "faqs"
//   },
//   {
//     id: 2,
//     title: "Which Court Should I Use: Small Claims or Limited Civil?",
//     url: "faqs"
//   },
//   {
//     id: 3,
//     title: "What Kinds of Cases are Heard in Small Claims Court?",
//     url: "faqs"
//   },
//   {
//     id: 4,
//     title: "How Much Money Can I Sue For?",
//     url: "faqs"
//   }
// ]

const pageIds = {
	"guardianship": "25rk8cpWJeA666YKwumQyu", 
	"dv": "2rfORKm0KQe4K0uuEuoQci",
	"family-law": "4O0eqo7xHOaMMA8WyYW80C",
	"eviction": "6qxRrat4HKc8UUk4yCGuSg",
	"traffic": "2Syl95Uko8IwQqUgi2wSem"
}

class Topic extends Component {
  constructor() {
    super();
    this.onPartyClick = this.onPartyClick.bind(this)
    this.toSentenceCase = this.toSentenceCase.bind(this)
  }

  componentWillMount() {
  	console.log('topics page componentWillMount')
// the next two consts need to be pulled from content
    const url = this.props.match.url.split('/')[1]
    console.log("url on topic generic page: ", url)
    const pageTopicId = pageIds[url]
    console.log("pageTopicId: ", pageTopicId)
    
    this.props.fetchParties(pageTopicId)    
    this.props.fetchResourceLinks(pageTopicId)
  }

  onPartyClick(_id, e){
    this.props.storePartyId(_id)
    console.log('onpartyclick, id', _id)
    e.stopPropagation();
    this.setState({partyId: _id})
  }

  toSentenceCase(str) {
    // create a readable title from the slug
    return str.split('-').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }


  render() {
    const lang = this.props.language;
    // const faqs = temporaryFaqs.map((faq, index) => {
    //   return (
    //     <div key={index}>
    //       <Link to={faq.url}>
    //         <p>{faq.title}</p>
    //       </Link>
    //     </div>
    //   )
    // })

    const resources = this.props.resources.map((item) => {
      return (
        <div key={item.resourceId}>
          {/*resource link titles not translated, now default to 'en-US'*/}
          <a href={item.url } target="_blank">{item.titles[lang] || item.titles['en-US']}</a>
        </div>
      )
    })

    const currentUnit = this.props.match.url.split('/')[1];
    const currentTitle = this.toSentenceCase(currentUnit)
    const renderedParties = this.props.parties.map((party) => {
        return (
          <div className="Square-box-container" key={party.id}>
            <Link to={`/${currentUnit}/${party.url}`}>
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
          <div className="Topic">
            <TitleLine title={currentTitle === "Dv" ? "Domestic Violence" : currentTitle} />
            <div className="grid grid-pad">
              {renderedParties}
              {/*static content, to be linked to faq pages*/}
              {/*<Infobox 
                boxTitle="Frequently Asked Questions"
                boxContent={faqs}
                buttonText="View More"
                infoboxClass="Box Info-box Grey-background medium-box"
              />*/}

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
    parties: state.content.parties,
    resources: state.content.resources,
    language: state.content.language
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( {fetchParties, fetchResourceLinks}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Topic);
