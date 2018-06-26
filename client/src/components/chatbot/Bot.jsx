import React, { Component } from 'react';
import ChatContainer from './ChatContainer.jsx';
import OpenBot from './OpenBot.jsx';
import { connect } from 'react-redux';

class Bot extends Component {
	constructor(props) {
		super(props);
    this.state = {
      botClicked: false
    }
    this.botClicked = this.botClicked.bind(this)
	}

  botClicked() {
    this.setState({botClicked: true})
  }

	render() {
    return (
      <div>
        <div className={this.props.viewPopup && !this.state.botClicked ? "Bot-popup" : "hidden"}>
          <p><b>Have a Question about Small Claims?</b></p>
          <p>Click here to chat with Courtney, our AI messenger bot.</p>
        </div>
        <div onClick={() => this.botClicked()} className={ this.props.visible ? "position-bot the-bot bot-z-index-open": "position-bot the-bot bot-z-index-closed"}>
          <OpenBot ref={el => (this.chatWindow = el)}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  visible: state.chat.botVisibility,
});

export default connect(mapStateToProps)(Bot);