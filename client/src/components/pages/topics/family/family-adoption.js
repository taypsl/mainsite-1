import React, { Component } from 'react';
import Squarebox from '../../../template/square-box';
import Bannerbox from '../../../template/banner-box';
import Infobox from '../../../template/info-box';

import AdoptiveParentIcon from '../../../../img/adoption_adoptive-parent.svg';
import BirthParentIcon from '../../../../img/adoption_birth-parent.svg';
import ChildIcon from '../../../../img/guardianship_child.svg';

import PropTypes from 'prop-types';
export default class Adoption extends Component {
	constructor(){
    super(); 
    this.state={
      topics:[]
    }
  }
  
  static defaultProps = { limit: 4 };
 
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
		//adoption id = '27'
		var faqTitle = []
    var self = this;
    // const topicArray = [];
    const adoptionContent = this.state.topics
   	.filter(function(topic) {
   		return topic.id === '27'
   	})

   	const adoptionFAQs = adoptionContent
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
		      <h1>{adoptionContent.name}</h1>
		      <Bannerbox boxTitle='Different ways adoptions are handled'
		           boxContent='Learn more about the adoption process and find help for your situation.'
		           buttonText='FAQs'
               buttonLink='faqs/adoption'
		      />
		      <div className='grid grid-pad'>
		        <Squarebox 
		        	boxTitle='Adoptive Parent'
		        	id='plaintiff'
	            imgSrc={AdoptiveParentIcon}
	            boxContent='Filing a Small Claim' /> 
		        <Squarebox 
		        	boxTitle='Birth Parent'
	            imgSrc={BirthParentIcon} /> 
            <Squarebox 
              boxTitle='Child'
              imgSrc={ChildIcon} /> 
		      </div>
		      <Infobox 
		      	boxTitle='FAQs'
	          boxContent={renderFaqTitles}
	          buttonText='View More'
            buttonLink='faqs/eviction' />
		    </div>
		)
	}
}

Adoption.propTypes = { limit: PropTypes.number };

