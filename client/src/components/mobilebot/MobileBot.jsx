import React, { Component } from 'react';
import ChatContainer from './ChatContainer.jsx';
 
class MobileBot extends React.Component {
	constructor(props) {
	    super(props);
	}

  render() {
    return (
      <div className={ this.props.visible ? "position-bot the-bot bot-z-index-open": "position-bot the-bot bot-z-index-closed"}>
        <ChatContainer history={this.props.history} />
      </div>
    );
  }
}

export default MobileBot;
