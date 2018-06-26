import React from 'react';
import { connect, dispatch } from 'react-redux';
import axios from 'axios';
const uuid = require('uuid/v4');

// import and set up SpeechRecognition object
let recognition,
  synth,
  voices, 
  utt;

let defaultVoiceIdx = 0;
const defaultVoiceNames = {
  pc: 'Microsoft Zira Desktop - English (United States)',
  mac: 'Samantha',
};
const defaultLang = 'en-US';
const defaultRate = 1.0;
const defaultPitch = 1.0;
const defaultVolume = 5.0;
// existing payload types
// let payloadTypes = {0:"image", 1:"button", 2:"map"};

try {
  const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
  const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  synth = window.speechSynthesis;
  // SpeechSynthesis.getVoices is async operation
  // voices=synth.getVoices();
  synth.onvoiceschanged = () => {
    voices = synth.getVoices();
    voices.forEach((v, i) => {
      if (v.name == defaultVoiceNames.pc || v.name == defaultVoiceNames.mac) {
        defaultVoiceIdx = i;
      }
      console.log('voiceIdx: ', defaultVoiceIdx);
    });
  };
} catch (e) {
  // do nothing yet, user will be alerted later when they press the mic button
  console.log("error: ", e);
}

class Chatbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { speechEnabled: Boolean(recognition && synth) };
  }

  componentWillUpdate() {
    if (this.state.speechEnabled) {
      synth.cancel();
    }
  }

  componentWillMount() {
    if (this.state.speechEnabled) {
      synth.cancel();
    }
  }

  render() {
    return (
      // this empty div wraps everything, and lets the chatbar view correctly in safari*/}
      <div>
        <div className="chatbar">
          <div>
            <button
              type="button"
              value="speak"
              className="mic"
              onClick={this.props.onClick.bind(this)}
            >
              <i className="material-icons" style={{ fontSize: '35px' }}>
                mic
              </i>
            </button>
          </div>

          <div>
            <input
              className="chat-input"
              type="text"
              placeholder="Type your message here"
              ref={input => (this.textInput = input)}
              onKeyUp={this.props.onKeyUp.bind(this)}
            />
          </div>

          <div>
            <button
              type="button"
              value="send"
              className="circle-x"
              onClick={this.props.onClick.bind(this)}
            >
              <i className="material-icons" style={{ fontSize: '20px' }}>
                send
              </i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ai: state.chat.ai,
});

const mapDispatchToProps = (dispatch) => {
  // let msg, recognition, synth, voices, utt;
  // send post requests to api.ai, process response, and dispatch action to reducers

  const postAndDispatch = function (data, sessionId, speak, caseTypeSelected) {
    console.log('SESSIONID: ', sessionId);
    dispatch({
      type: 'CHAT_ADD_MESSAGE',
      payload: data,
    });
    dispatch({
      type: 'USER_INPUT',
      payload: data,
    });

    const inputData = { payload: data, id: sessionId };
    if (!caseTypeSelected) {
      inputData.ai = false;
    } else {
      inputData.ai = true;
    }

    axios
      .post('/api/chat/message', inputData)
      .then((response) => {
        let speech;
        // response.data is a data envelope by redux
        // it contains the fulfillment section of the data object which the backend chooses to return.
        
        //dialogflow fulfillment messages, possible multiple messages and multiple formats 
        response.data.fulfillmentMessages.forEach((ffmtMsg, index) => {
          let id;
          //set focus to beginning of new message in redux 
          if (index === 0){ 
            id = uuid();
            dispatch({
              type: 'SET_FOCUS',
              payload: {id} 
            }) 
            // newMsg = false;
          }
          
          if (ffmtMsg.message === 'text'){ //text response
            speech += ffmtMsg.text.text[0]
            dispatch({
              type: 'CHAT_ADD_MESSAGE',
              payload: {
                message: ffmtMsg.text.text[0],
                type: 'text',
                source: 'dialogflow',
                isBot: true,
                id: id ? id : uuid()  //texts will head all response msgs
              }
            });
          }else if (ffmtMsg.message == 'payload'){ // payload response
            console.log("payload buttons: ", ffmtMsg.payload.fields.buttons)
            //if buttons in payload
            ffmtMsg.payload.fields.buttons &&
            ffmtMsg.payload.fields.buttons.listValue.values.forEach((btn) => {
              
              dispatch({
                    type: 'CHAT_ADD_MESSAGE',
                    payload: {
                      message: btn.stringValue,
                      type: 'button',
                      isBot: true,
                      id: uuid()
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
                    id: uuid()
                  },
                });
          }
        });

        //webhookPayload
        const webhookPayload = response.data.webhookPayload;
        if (webhookPayload) {
          webhookPayload.fields.map &&
          dispatch({
            type: 'CHAT_ADD_MESSAGE',
            payload: {
              message: {
                src: webhookPayload.fields.map.structValue.fields.src.stringValue, 
                name: webhookPayload.fields.map.structValue.fields.name.stringValue
              },
              type: 'map',
              isBot: true,
              id: uuid()
            }
          });

          // console.log(webhookPayload.fields);
          webhookPayload.fields.table &&           
          dispatch({
            type: 'CHAT_ADD_MESSAGE',
            payload: {
              message: { table:
                webhookPayload.fields.table.listValue.values.map((item) => {
                  return {
                      agentOfService: item.structValue.fields.agentOfService.stringValue,
                      companyName: item.structValue.fields.companyName.stringValue,
                      entityNum: item.structValue.fields.entityNum.stringValue,
                      jurisdiction: item.structValue.fields.jurisdiction.stringValue
                    };
                  }),
                url: webhookPayload.fields.url.stringValue
                },
              
              type: 'table',
              isBot: true,
              id: uuid()
            }
          });
        }

        if (speak) {
          speak();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // speech synthesis for reading responses from api.ai
  const speak = function (speech) {
    const utt = new SpeechSynthesisUtterance();
    utt.lang = defaultLang;
    utt.text = speech;
    utt.voice = voices[defaultVoiceIdx];
    utt.rate = defaultRate;
    utt.pitch = defaultPitch;
    utt.volume = defaultVolume;
    synth.speak(utt);
  };

  return {
    // controls onclick events on buttons in chatbar
    onClick(event) {
      // using currentTarget instead of target because currentTarget is the object listening(the button). target is that actual target received, which is the icon, and not what we want
      event.preventDefault();
      event.stopPropagation();
      if (event.currentTarget.type !== 'button') {
        return;
      }
      console.log('event.currentTarget.value:', event.currentTarget.value);
      if (event.currentTarget.value === 'speak') {
        console.log('speak button clicked');
        if (!this.state.speechEnabled) {
          alert('your browser does not support speech functions');
          return;
        }
        if (synth && synth.speaking) {
          console.log('speech canceld');
          // recognition.abort();
          synth.cancel();
        }
        try {
          recognition.start();
        } catch (e) {
          // stop last recognition if still on.
          recognition.stop();
          recognition.start();
        }
        recognition.onresult = (e) => {
          console.log('recog results: ', e.results);

          const userInput = e.results[e.results.length - 1][0].transcript;
          // console.log('result: ', transcript);
          if (!userInput || /^\s*$/.test(userInput)) {
            return;
          }
          const data = { message: userInput, type: 'text', isBot: false };
          postAndDispatch(data, this.props.sessionId, speak, this.props.ai.selected);
          recognition.stop();
        };

        recognition.onerror = (e) => {
          recognition.stop();
          console.error(e);
        };

        recognition.onend = () => {
          recognition.stop();
          console.log('recognition end.');
        };
      } else {
        console.log('send button clicked');
        console.log('input message', this.textInput.value);
        if (synth && synth.speaking) {
          synth.cancel();
        }
        const userInput = this.textInput.value;
        if (!userInput || /^\s*$/.test(userInput)) {
          return;
        }
        const data = {
          message: userInput,
          type: 'text',
          isBot: false,
        };
        // clears textbox
        this.textInput.value = '';
        console.log('message:', data);
        postAndDispatch(data, this.props.sessionId, null, this.props.ai.selected);
      }
    },
    onKeyUp(event) {
      if (event.keyCode === 13) {
        console.log('message:', event.target.value);
        if (synth && synth.speaking) {
          synth.cancel();
        }
        const userInput = event.target.value;
        if (!userInput || /^\s*$/.test(userInput)) {
          return;
        }
        const data = { message: userInput, type: 'text', isBot: false };
        // clear input bar
        this.textInput.value = '';

        postAndDispatch(data, this.props.sessionId, null, this.props.ai.selected);
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatbar);
