import React, { Component } from 'react';
import Squarebox from '../../template/square-box';
import Bannerbox from '../../template/banner-box';
import Infobox from '../../template/info-box';


import SeekingProtectionIcon from '../../../img/dv_psp_1.svg';
import PersonAccusedIcon from '../../../img/dv_paa_1.svg';
import OtherPersonIcon from '../../../img/dv_opp_1.svg';

import PropTypes from 'prop-types';

export default class Dv extends Component {
	constructor(){
    super(); 
    this.state={
      topics:[]
    }
  }
  
  static defaultProps = { limit: 4 };

  // static defaultProps() {
  //   return {
  //     limit: 4
  //   }
  // }
 
  componentDidMount() {
    return fetch('https://case-data.glitch.me/courtdata')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({topics: responseJson});
      // console.log(this.state.topics)
    })
    .catch((error) => {
      console.error(error);
    });
  }

	render() {
		//dv id = '6'
		var faqTitle = []
    var self = this;
    // const topicArray = [];
    const dvFAQs = this.state.topics
   	.filter(function(topic) {
   		return topic.id === '6'
   	})
   	.map(function(list) {
   		const faqList = list.faqs;
      
      // console.log(faqList)
      for (const key of Object.keys(faqList)) {
          // console.log(faqList[key].title);
          faqTitle.push(faqList[key].title)
      }
      return (faqTitle)
   	})
    // .map(function(faqTitleAry) {
    //    <div>{title}</div>
    // }) 
    const renderFaqTitles = faqTitle
    .filter(function(title, index){
      // console.log(self)
      // console.log(self.props.limit)
      if(self.props.limit) {
        return (index < self.props.limit)
      }
      return true
    })
    .map((title) =>
      <div className='topic-title'>{title}</div>
    );


		return (
			<div className='Topic'>
		      <div className="mainpage-title">
            <hr className="mainpage-title-line" />
            <h1>Domestic Violence</h1>
            <hr className="mainpage-title-line"/>
          </div> 
		      <div className="warning"><p>WARNING! People can tell what Internet sites you have visited on your computer. Be Safe!</p></div>
		      {/*<Bannerbox boxTitle='What is Abuse?'
		           boxContent='Learn about how to file a restraining order for yourself and others.'
		           buttonText='FAQs'
               buttonLink='faqs/dv'
		      />*/}
		      <div className='grid grid-pad'>
		        <Squarebox 
		        	boxTitle='Person Seeking Protection'
	            imgSrc={SeekingProtectionIcon} /> 
		        <Squarebox 
		        	boxTitle='Person Accused of Abuse'
	            imgSrc={PersonAccusedIcon} />
	           <Squarebox 
		        	boxTitle='Other Protected Person'
	            imgSrc={OtherPersonIcon} />  
		      </div> 
		      <Infobox 
		      	boxTitle='FAQs'
	          boxContent={renderFaqTitles}
	          buttonText='View More'
	          buttonLink='faqs/dv' />
		    </div>
		)
	}
}

Dv.propTypes = { limit: PropTypes.number };


/* 
   		console.log(JSON.stringify(list.faqs, null, 4));

    .map(function(faqs) {
      return (
        <div>{faqs.title}</div>
      )
    })

*/