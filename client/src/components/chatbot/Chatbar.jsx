import React from 'react';
import { connect, dispatch } from 'react-redux';

import axios from 'axios';
// import ChatButton from './ChatButton.jsx';

// import and set up SpeechRecognition object
let msg,
  recognition,
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
  // const result = {};
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
        <div className="chatbar-m">
          <div>
            <button
              type="button"
              value="speak"
              // ref="rec" //a react attrib
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
              // onChange={this.props.onChange.bind(this)}
              // onKeyUp={(e) => this.props.onKeyUp.bind(this, e, e.target.value)()}
              onKeyUp={this.props.onKeyUp.bind(this)}
            />
          </div>

          <div>
            <button
              type="button"
              // ref="sendButton" //a react attrib
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
  // userInput: state.chat.input,
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
      // dispatch({type: data.message.toLowerCase()});
      inputData.ai = false;
    } else {
      inputData.ai = true;
    }

    axios
      .post('/api/chat/message', inputData)
      .then((response) => {
        console.log('Response:', response);
        // response.data is a data envelope by redux
        // it contains the fulfillment section of the data object which the backend chooses to return.
        msg = response.data.result.fulfillment.speech;
        if (response.status === 200) {
          if (!msg.startsWith('\\n')) {
            dispatch({
              type: 'CHAT_ADD_MESSAGE',
              payload: {
                message: msg,
                type: 'text',
                source: 'dialogflow',
                isBot: true,
              },
            });
          } else {
            // multi-paragraphs

            const paragraphs = msg.slice(2, -1).trim().split(/\\n/);
            console.log(paragraphs);
            let i = 0;
            msg = '';
            for (i = 0; i < paragraphs.length; i++) {
              msg += paragraphs[i];
              dispatch({
                type: 'CHAT_ADD_MESSAGE',
                payload: {
                  message: paragraphs[i].trim(),
                  type: 'text',
                  isBot: true,
                },
              });
            }
          }
          // console.log('case type: ', response.data.caseType.toLowerCase());
          response.data.caseType && dispatch({ type: response.data.caseType });
          let customPayload;
          if (!response.data.result.fulfillment.data) {
            const messages = response.data.result.fulfillment.messages;
            console.log('Messages:', messages);
            if (messages.length > 1 && messages[1].type == 4) {
              // buttons in payload
              if (messages[1].payload.buttons) {
                // get custom payload from api.ai
                // console.log("buttons:", response.data.messages[1].payload.buttons);
                customPayload = messages[1].payload.buttons;
                customPayload.forEach((btn) => {
                  dispatch({
                    type: 'CHAT_ADD_MESSAGE',
                    payload: {
                      message: btn,
                      type: 'button',
                      isBot: true,
                    },
                  });
                });
              }
              // if image in payload
              if (messages[1].payload.image) {
                customPayload = messages[1].payload.image;
                dispatch({
                  type: 'CHAT_ADD_MESSAGE',
                  payload: {
                    message: customPayload,
                    type: 'image',
                    isBot: true,
                  },
                });
              }
              // if map in payload
              if (messages[1].payload.map) {
                customPayload = messages[1].payload.map;
                dispatch({
                  type: 'CHAT_ADD_MESSAGE',
                  payload: {
                    message: customPayload,
                    type: 'map',
                    isBot: true,
                  },
                });
              }
            }
          } else {
            // server response
            const data = response.data.result.fulfillment.data;
            if (data.buttons) {
              customPayload = data.buttons;
              customPayload.forEach((btn) => {
                dispatch({
                  type: 'CHAT_ADD_MESSAGE',
                  payload: {
                    message: btn,
                    type: 'button',
                    isBot: true,
                  },
                });
              });
            }
            if (data.image) {
              customPayload = data.image;
              dispatch({
                type: 'CHAT_ADD_MESSAGE',
                payload: {
                  message: customPayload,
                  type: 'image',
                  isBot: true,
                },
              });
            }
            if (data.map) {
              customPayload = data.map;
              dispatch({
                type: 'CHAT_ADD_MESSAGE',
                payload: {
                  message: customPayload,
                  type: 'map',
                  isBot: true,
                },
              });
            }
            if (data.table) {
              customPayload = data;
              console.log('CUSTOMPAYLOAD', customPayload);
              dispatch({
                type: 'CHAT_ADD_MESSAGE',
                payload: {
                  message: customPayload,
                  type: 'table',
                  isBot: true,
                },
              });
            }
          }
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
  const speak = function () {
    utt = new SpeechSynthesisUtterance();
    utt.lang = defaultLang;
    utt.text = msg;
    // console.log(msg);
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
        // else{
        // try {
        // const SpeechRecognition =
        // SpeechRecognition || webkitSpeechRecognition;
        // const SpeechGrammarList =
        // SpeechGrammarList || webkitSpeechGrammarList;
        // const SpeechRecognitionEvent =
        // SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

        // recognition = new SpeechRecognition();
        // recognition.lang = 'en-US';
        // // const result = {};
        // synth = window.speechSynthesis;
        // // SpeechSynthesis.getVoices is async operation
        // voices=synth.getVoices();
        // synth.onvoiceschanged = ()=> {
        // voices = synth.getVoices();
        // }
        // console.log('voices: ', voices);
        // } catch (e) {
        // alert('your browser may not support speech recognition');
        // return;
        // }
        // }
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
