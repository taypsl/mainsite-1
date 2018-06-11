import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/addTodo'
import VisibleTodoList from '../containers/visibleTodoList'
// import { connect } from 'react-redux'
// import { getData } from '../../../../actions/index.js'

class App extends React.Component {
  render(){
  return (
    <div>
    	<div className="checklist-title">
    		<hr className="title-line" />
    		<h1>Checklist</h1>
    		<hr className="title-line" />
    	</div>
    	<div className="checklist">
  	    <Footer party={this.props.location.state.party}/>
  	    { this.props.location.state.caseId ? 
          <VisibleTodoList caseId={this.props.location.state.caseId} caseType={this.props.location.state.caseType} party={this.props.location.state.party}/> :
          <VisibleTodoList caseType={this.props.location.state.caseType} party={this.props.location.state.party}/>
        }
  	  </div>
    </div>
  );
  }
}


export default App;
// export default connect(null, mapDispatchToProps )(App);

//    <AddTodo />
