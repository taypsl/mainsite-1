import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ChatBubble from './ChatBubble.jsx';

class Chatbox extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToView = this.scrollToView.bind(this);
    this.state = { key: 0 };
    this.newMsgRef = React.createRef();
  }

  scrollToView() {
    console.log("ref: ", this.msgBegins);
    //set to scroll to the top 
    this.msgBegins && this.msgBegins.scrollIntoView(true); 
  }

  componentDidMount() {
    this.scrollToView();
  }

  componentDidUpdate() {
    this.scrollToView();
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

        {this.props.chatlog.map((msg) => {
          console.log("currentView: ", this.props.currentView.id);
          console.log("id: ", msg.id);
         
          return (
            <div key={msg.id}>
              {/*set inline style to account for header height*/}
              {this.props.currentView.id === msg.id && <div ref={el => this.msgBegins = el} style={{paddingTop: 35}} />}  
              <ChatBubble
                {...msg} // spread operator                
                sessionId={this.props.sessionId}
                theme={this.props.theme}
              />
            </div>
            );
        })}
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chatlog: state.chat.log,
  currentView: state.chat.currentView
});


export default connect(mapStateToProps)(Chatbox);
