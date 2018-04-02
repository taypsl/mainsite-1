import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TitleLine from '../template/title-line';
import AccordionBoxContainer from '../template/accordion-box/accordion-box-container';
import { fetchVideos, fetchVideoLinks, fetchVideoSubcategories } from '../../actions/content.js';

const uuid = require('uuid/v4');


class Videos extends Component {
  componentWillMount() {
    if (!this.props.videos || Object.keys(this.props.videos).length <= 0) {
      this.props.fetchVideoSubcategories()
      this.props.fetchVideos()
      console.log(this.props.videos, 'this.props.videos')
    }

    if (!this.props.videoLinks || Object.keys(this.props.videoLinks).length <= 0) {
      this.props.fetchVideoLinks()
      console.log(this.props.videoLinks, 'this.props.videoLinks')
    }
  }

  // renderVideos() {
  //   const videos = this.props.videos;

  //   return Object.keys(videos).map((categoryName) => {
  //     const category = videos[categoryName];

  //     return (
  //       <div key={uuid()} 
  //         className="full-size" 
  //         style={{ width: '100%', height: '100%' }}
  //       >
  //         <h2>{category.title}</h2>
  //         {this.renderSubcategories(category.subcategories)}
  //       </div>
  //     );
  //   })
  // }

  renderVideoLinks() {
    const videoLinks = this.props.videoLinks;

    return (
      <div className="full-size" style={{ width: '100%', height: '100%' }}>
        <h2>Informational Videos</h2>

        <AccordionBoxContainer 
          stageContent={videoLinks} 
          type='links'
          linkTo='videos/'
          itemField={'links'} 
          tabs={[] /* shush */}
        />
      </div>
    );
  }

  renderVideos() {
    return (
      <AccordionBoxContainer 
        stageContent={this.props.videos} 
        type='links'
        linkTo='videos/'
        itemField={'videos'} 
        tabs={[] /* shush */}
      />
    );
  }

	render() {
		return (
			<div>
        <TitleLine title="Video Resources" />
        <div className="grid grid-pad" className="full-size" style={{ width: '100%', height: '100%' }}>
          {this.renderVideos()}
          {this.renderVideoLinks()}
        </div>
      </div>
		)
	}
}

function mapStateToProps(state) {
  return { videos: state.content.videos,
           videoLinks: state.content.videoLinks,
           assets: state.content.assets
   };
}

export default connect(mapStateToProps, { fetchVideos, fetchVideoLinks, fetchVideoSubcategories })(Videos);
