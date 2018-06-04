import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import ImageViewer from './ImageViewer.jsx';
// const opn = require('opn');
const CASETYPES = {
  'Small Claims': 0,
  Guardianship: 1,
  'Domestic Violence': 2,
  'Family Law': 3,
  Eviction: 4,
  Traffic: 5,
};

class ChatBubble extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let className = ' bot-bubble';
    if (this.props.theme === 'dark') {
      className += ' mono-bot-bubble';
    }

    const botButtons = 'button-blue bot-buttons';
    let userBubble = 'user-bubble user-bubble-alignment';
    if (this.props.theme === 'dark') {
      userBubble += ' mono-user-bubble';
    }

    if (this.props.type === 'button') {
      return (
        <div className={botButtons} onClick={this.props.onClick.bind(this)}>
          {ReactHtmlParser(this.props.message)}
        </div>
      );
    } else if (this.props.type === 'image') {
      return <ImageViewer src={this.props.message.src} alt={this.props.message.alt} />;
    } else if (this.props.type === 'map') {
      return (
        <div className="map-container">
          <iframe className="map-S" src={this.props.message.src} name={this.props.message.name} />
        </div>
      );
    } else if (this.props.type === 'table') {
      console.log('executed');
      return (
        <div>
          <a href={this.props.message.url} target='_blank'>
          <table onClick={this.props.onClick.bind(this)}>
            <thead>
              <tr>
                <th>
                  {'Company Name'}
                </th>
                <th>
                  {'Entity Number'}
                </th>
                <th>
                  {'Agent of Service'}
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.message.table.map((row, i) =>
                <tr key={i}>
                  <td>
                    {row.companyName}
                  </td>
                  <td>
                    {row.entityNum}
                  </td>
                  <td>
                    {row.agentOfService}
                  </td>
                </tr>,
              )}
            </tbody>
          </table>
          </a>
        </div>
      );
    } else if (this.props.isBot === false) {
      className = ' user-bubble user-bubble-alignment'; // using '=' instead of '+=' seperates blue chat-bubble from orange user-bubble-alignment
      return (
        // allows user bubble and bot bubble to be on two different lines because we're wrapping in div className=bubble-breaker
        <div className="bubble-breaker">
          <div className={userBubble}>
            {ReactHtmlParser(this.props.message)}
          </div>
        </div>
      );
    }

    //bot bubble
    return (
      <div className={className} /* onClick={this.props.onClick}*/>
        {ReactHtmlParser(this.props.message)}
        {/* this.props.source === 'dialogflow' 
        && <p className="feedback">
          Is this response helpful?
        <input type="submit" value="Yes" />
        <input type="submit" value="No" />
        </p> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ai: state.chat.ai,
});

const mapDispatchToProps = dispatch => ({
  // controls buttons onclick function in bot response
  onClick(event) {
    // onClick on table can't use opn in frontend, has to transmit to backend.
    event.stopPropagation();
    console.log('EVENT TYPE: ', event.currentTarget.nodeName);
    if (event.currentTarget.nodeName === 'TABLE') {
      console.log('URL: ', this.props.message.url);
      axios.post('/api/chat/message', { url: this.props.message.url }).then((response) => {
        dispatch({
          type: 'CHAT_ADD_MESSAGE',
          payload: {
            message: response.data.speech,
            type: 'text',
            source: 'dialogflow',
            isBot: true,
          },
        });
      });
      return;
    }
    // onClick on buttons
    const data = { message: this.props.message, type: this.props.type, isBot: this.props.isBot };
    console.log('SESSIONID: ', this.props.sessionId);
    const inputData = { payload: data, id: this.props.sessionId };
    // console.log("ai: ", this);
    if (!this.props.ai.selected || this.props.message in CASETYPES) {
      inputData.ai = false;
      // dispatch({type: 'SELECT_CASE_TYPE'});
    } else {
      inputData.ai = true;
    }
    axios
      .post('/api/chat/message', inputData) 
      .then((response) => {
        console.log('Response:', response);
        response.data.fulfillmentMessages.forEach((ffmtMsg ) => {
          
          if (ffmtMsg.message === 'text'){ //text response
            dispatch({
              type: 'CHAT_ADD_MESSAGE',
              payload: {
                message: ffmtMsg.text.text[0],
                type: 'text',
                source: 'dialogflow',
                isBot: true,
              }
            });
          }else if (ffmtMsg.message == 'payload'){ // payload response
            // console.log("payload buttons: ", ffmtMsg.payload.fields.buttons)
            //if buttons in payload
            ffmtMsg.payload.fields.buttons &&
            ffmtMsg.payload.fields.buttons.listValue.values.forEach((btn) => {
              
              dispatch({
                    type: 'CHAT_ADD_MESSAGE',
                    payload: {
                      message: btn.stringValue,
                      type: 'button',
                      isBot: true,
                    },
                  });
            });
            //if image in payload
            ffmtMsg.payload.fields.image &&
            dispatch({
                  type: 'CHAT_ADD_MESSAGE',
                  payload: {
                    message: {
                      src: ffmtMsg.payload.fields.image.structValue.fields.src.stringValue,
                      alt: ffmtMsg.payload.fields.image.structValue.fields.alt.stringValue
                    },
                    type: 'image',
                    isBot: true,
                  },
              });
            }
          }); 
        })
      .catch((error) => {
        console.error('Error:', error);
      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatBubble);
