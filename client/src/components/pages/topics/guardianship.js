import React, { Component } from 'react';
import Squarebox from '../../template/square-box';
import Bannerbox from '../../template/banner-box';
import Infobox from '../../template/info-box';
import PropTypes from 'prop-types';

// images
import IcnPG from '../../../img/guardianship_pg_1.svg';
import IcnParent from '../../../img/guardianship_parent_1.svg';
import IcnChild from '../../../img/guardianship_child_1.svg';

export default class Guardianship extends Component {
	
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
		//guardianship id = '1'
		var faqTitle = []
    var self = this;
    // const topicArray = [];
    const guardianshipFAQs = this.state.topics
   	.filter(function(topic) {
   		return topic.id === '1'
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
            <h1>Guardianship</h1>
            <hr className="mainpage-title-line"/>
          </div>  
		      {/*<Bannerbox boxTitle='Reasons to Choose a Guardianship'
		           boxContent='Learn about guardianship situations, who may be a legal guardian, what is required of a legal guardian, and more.'
		           buttonText='FAQs'
               buttonLink='faqs/guardianship'
		      />*/}
		      <div className='grid grid-pad'>
		        <Squarebox 
		        	boxTitle='Potential Guardian'
	            imgSrc={IcnPG} /> 
		        <Squarebox 
		        	boxTitle='Parent'
	            imgSrc={IcnParent} />
	           <Squarebox 
		        	boxTitle='Child'
	            imgSrc={IcnChild} />  
		      </div>
		      <Infobox 
		      	boxTitle='FAQs'
	          boxContent={renderFaqTitles}
	          buttonText='View More'
            buttonLink='faqs/guardianship' />
		    </div>
		)
	}
}

Guardianship.propTypes = { limit: PropTypes.number };


/* 
   		console.log(JSON.stringify(list.faqs, null, 4));

    .map(function(faqs) {
      return (
        <div>{faqs.title}</div>
      )
    })

*/