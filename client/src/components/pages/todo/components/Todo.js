import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';

const Todo = ({ onClick, onToggle, completed, expanded, title, blockText }) => (
  <div 
    className="list-item-container"
    style={{
      backgroundColor: completed ? "#eeeeee" : "#ffffff"
    }}
  >
    <i 
      onClick={onClick}
      className={completed ? "list-item-checkbox fa fa-check-circle" : "list-item-checkbox fa fa-circle-o"}

    >
    </i>
    
    <div 
      className="list-item"
      onClick={onToggle}
    >
      <div className="list-item-title" >
        {title}
        <i
          onClick={onToggle} 
          className={expanded ? "list-item-chevron fa fa-chevron-up" : "list-item-chevron fa fa-chevron-down"}
        >
        </i>
      </div>
      <div 
        className="list-item-text"
        style={ {
          display: expanded ? "block" : "none"
        }}
        dangerouslySetInnerHTML={ { __html: blockText } }
      >
        

      </div>

    </div>
 
  </div>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  blockText: PropTypes.string.isRequired, 
  expanded: PropTypes.bool.isRequired
}

export default Todo

/* 
            className={expanded ? "list-item-chevron fa fa-chevron-up" : "list-item-title fa fa-chevron-down"}

    <div className="list-item">
      <h4 className="list-item-title">{title}</h4>
      <div className="list-caret fa fa-caret-down">
        <div className="hideText">{blockText}</div>
      </div>

    </div>

*/