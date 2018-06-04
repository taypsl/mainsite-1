import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ChatBubble from './ChatBubble.jsx';

class Chatbox extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: 'instant' });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    let className = '';
    console.log('current theme : ', this.props.theme);
    if (this.props.theme === 'dark') {
      className = 'dark chatbox-alignment';
    } else {
      className = 'chat-box-bg chatbox-alignment';
    }

    return (
      <div className={className}>
        {this.props.chatlog.map((value, key) => {
          console.log(value);
          return (
            <ChatBubble
              {...value} // spread operator
              key={key}
              sessionId={this.props.sessionId}
              theme={this.props.theme}
            />
          );
        })}
        <div
          className="clear"
          ref={(el) => {
            this.messagesEnd = el;
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chatlog: state.chat.log,
});


export default connect(mapStateToProps)(Chatbox);
