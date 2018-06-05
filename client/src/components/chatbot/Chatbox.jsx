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
    // this.newMsgRef.current && this.newMsgRef.current.scrollIntoView({ behavior: 'instant' });
    // this.msgBegins && this.msgBegins.scrollIntoView({behavior: 'instant'}); //scroll to the center
    this.msgBegins && this.msgBegins.scrollIntoView(true); //set to scroll to the top 
  }

  componentDidMount() {
    this.scrollToView();
    // this.setState({ key: this.props.chatlog.length })
  }

  componentDidUpdate() {
    this.scrollToView();
    // this.setState({ key: this.props.chatlog.length })
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
            <div>
              {this.props.currentView.id === msg.id && <div ref={el => this.msgBegins = el} style={{'padding-top': 30}} />}  {/*set inline style to account for header height*/}
              <ChatBubble
                {...msg} // spread operator                
                sessionId={this.props.sessionId}
                theme={this.props.theme}
                key={msg.id}              
              />
            </div>
            );
        })}

       {/* <div
          className="clear"
          ref={(el) => {
            this.messagesEnd = el;
          }}
        /> */} 

        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chatlog: state.chat.log,
  currentView: state.chat.currentView
});


export default connect(mapStateToProps)(Chatbox);
