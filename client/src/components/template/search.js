import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router';
import axios from 'axios';
import SearchResults from '../pages/search-results-page';
import { connect } from 'react-redux'; 

class Search extends Component {
  constructor(props){
    super(props);
    this.state={value: ''};
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  
  handleChange(event){
    this.setState({value: event.target.value});
    console.log("state:", this.state.value);
  }

  handleSubmit(event){
    //process query string
    console.log("form submitted");
    let queryStr = this.state.value.trim().toLowerCase().split(/ +/).join(' ');
    queryStr = encodeURIComponent(queryStr);
    this.props.history.push('/search-results/'+queryStr);
    // console.log("query string: ", queryStr);
    // event.preventDefault();
    // console.log("props", this.props);
    // this.props.history.push('/search-results', {query: this.state.value});
    
    // axios.get('/api/results/'+queryStr)
    // .then((response)=> {console.log('redirected')})
    // .catch((error) => {console.log(error)});
      
  }


  
  // componentDidMount(){
  //           var config = {
  //         gcseId: '010012988809159316594:zgkefy-h6yk',
  //         resultsUrl: 'http://localhost:8000/search-results',
  //         searchWrapperClass: 'gcse-search-wrapper',
  //         resultsWrapperClass: 'gcse-results-wrapper'
  //       };

  //       var renderSearchForms = function () {
  //         if (document.readyState == 'complete') {
  //           queryAndRender();
  //         } else {
  //           google.setOnLoadCallback(function () {
  //             queryAndRender();
  //           }, true);
  //         }
  //       };

  //       var queryAndRender = function() {
  //         var gsceSearchForms = document.querySelectorAll('.' + config.searchWrapperClass);
  //         var gsceResults = document.querySelectorAll('.' + config.resultsWrapperClass);

  //         if (gsceSearchForms) {
  //           console.log("found search forms", gsceSearchForms);
  //           renderSearch(gsceSearchForms[0]);
  //         }
  //         if (gsceResults) {
  //           console.log("found results forms", gsceResults);
  //           renderResults(gsceResults[0], );
  //         }
  //       };

  //       var renderSearch = function (div) {

  //           google.search.cse.element.render(
  //             {
  //               div: div.id,
  //               tag: 'searchbox-only',
  //               attributes: {
  //                 resultsUrl: config.resultsUrl
  //               }
  //             }
  //           );

  //           console.log("google element has been created");
  //           if (div.dataset &&
  //               div.dataset.stylingFunction &&
  //               window[div.dataset.stylingFunction] &&
  //               typeof window[div.dataset.stylingFunction] === 'function') {
  //             window[div.dataset.stylingFunction](form);
  //           }
  //       };

  //       var renderResults = function(div) {
  //         console.log("renderResults div: ", div);
  //         google.search.cse.element.render(
  //           {
  //             div: div.id,
  //             tag: 'searchresults-only'
  //           });
  //       };

  //       window.__gcse = {
  //         parsetags: 'explicit',
  //         callback: renderSearchForms
  //       };

  //       (function () {
  //         var cx = config.gcseId;
  //         var gcse = document.createElement('script');
  //         gcse.type = 'text/javascript';
  //         gcse.async = true;
  //         gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
  //           '//cse.google.com/cse.js?cx=' + cx;
  //         var s = document.getElementsByTagName('script')[0];
  //         s.parentNode.insertBefore(gcse, s);
  //       })();

  // }

  



  render() {   

    return (
        <div className="Search">
            <form onSubmit={this.handleSubmit} className="Search-form" value="Search">         
                <input className="Search-bar" type="text" placeholder=" Search our site" onChange={this.handleChange} value={this.state.value} />
                <input className="Search-button" value="Search" type="submit"></input>
             </form>
          
          {/*<div className="gcse-search-wrapper" id="testSearch"></div>
          <div className="gcse-results-wrapper" id="testResults"></div>*/}
        </div>
        
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//     handleSubmit: (e) => {
//       e.preventDefault();
//       dispatch({type: 'STORE_QUERY', action: {query: this.state.query}})
//       this.props.history.push('/search-results');
//     }
// });

// export default connect(null, mapDispatchToProps)(Search);
export default withRouter(Search);