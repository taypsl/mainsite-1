import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories } from '../../actions/content.js';
import Squarebox from '../template/square-box';
import Asset from '../template/responsive-image';
import client from '../../services/contentful-client'
import TitleLine from '../template/title-line';
import { DEFAULT_LANG } from '../../actions/types'; 

class HomePage extends React.Component {

  componentWillMount() {
      this.props.categories.length === 0 && this.props.fetchCategories()
  }

  renderCategories() {
    const lang = this.props.language;
    return this.props.categories.map((category) => {
      return (
        <div className="Square-box-container" key={category.id}>
          <Link to={ category.slug }>
            <Squarebox 
              id={category.id}
              boxTitle={ category.titles[lang] }  
              assetId={ category.imageId }
            />
          </Link>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="mainpage">
        <TitleLine title="Self-Help Law Center" />
        <div className="grid grid-pad">
          {this.renderCategories()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    categories: state.content.categories,
    language: state.content.language,
   };
}

export default connect(mapStateToProps, { fetchCategories })(HomePage);