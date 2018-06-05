import React from 'react'
import Todo from './Todo'
import { getData } from '../../../../actions/index.js'
import PropTypes from 'prop-types';

class TodoList extends React.Component{
  constructor(props){
    super(props);
  }
  

  componentWillMount(){
    console.log("CaseType: ", this.props.caseType);
    console.log("party: ", this.props.party);
    if (this.props.caseId){
      this.props.onUpdate(this.props.caseId, this.props.caseType, this.props.party);
    }else {
      this.props.onUpdate(null, this.props.caseType, this.props.party);
    }
  }

  render() {
    const { todos, onTodoClick, onAccordionClick, loading, onSaveClick } = this.props;
    return ( 
    <div>
      
      <div className="checklist-list-container">
        {/* loading ? 'Loading...': '' */}
        {todos.map(todo =>
          <Todo
            key={todo.id}
            {...todo}
            onClick={() => { onTodoClick(todo.id); }}
            onToggle={() => { onAccordionClick(todo.id);}}
          />
        )}
      </div>
      
      {this.props.caseId && <button type="button" className="btn-checklist-save" onClick={() => { onSaveClick(this.props.caseId, this.props.todosComplete)} } >Save</button>}
    </div>

    );

    }
}
TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    expanded: PropTypes.bool.isRequired,
    blockText: PropTypes.string.isRequired, 
    
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired,
  onAccordionClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  // toggled: PropTypes.bool.isRequired
}

export default TodoList;
