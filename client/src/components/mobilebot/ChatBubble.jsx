// import React from 'react';
// import { connect } from 'react-redux';
// import axios from 'axios';
// import ReactHtmlParser from 'react-html-parser';
// import ImageViewer from '../chatbot/ImageViewer.jsx';
// // const opn = require('opn');
// const CASETYPES = {
//   'Small Claims': 0,
//   Guardianship: 1,
//   'Domestic Violence': 2,
//   'Family Law': 3,
//   Eviction: 4,
//   Traffic: 5,
// };

// class ChatBubble extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     let className = ' bot-bubble';
//     if (this.props.theme === 'dark') {
//       className += ' mono-bot-bubble';
//     }

//     let botButtons = 'button-blue bot-buttons';
//     if (this.props.theme === 'dark') {
//       botButtons += ' botButtons';
//     }

//     let userBubble = 'user-bubble user-bubble-alignment-m';
//     if (this.props.theme === 'dark') {
//       userBubble += ' mono-user-bubble';
//     }

//     if (this.props.type === 'button') {
//       return (
//         <div className={botButtons} onClick={this.props.onClick.bind(this)}>
//           {ReactHtmlParser(this.props.message)}
//         </div>
//       );
//     } else if (this.props.type === 'image') {
//       // className = 'rcorner';
//       // console.log(this.props.message);
//       // const attr = JSON.parse(this.props.message);
//       return <ImageViewer src={this.props.message.src} alt={this.props.message.alt} />;
//     } else if (this.props.type === 'map') {
//       return (
//         <div className="map-container">
//           <iframe className="map-S" src={this.props.message.src} name={this.props.message.name} />
//         </div>
//       );
//     } else if (this.props.type === 'table') {
//       console.log('executed');
//       return (
//         <div>
//           <table onClick={this.props.onClick.bind(this)}>
//             <thead>
//               <tr>
//                 <th>
//                   {'Company Name'}
//                 </th>
//                 <th>
//                   {'Entity Number'}
//                 </th>
//                 <th>
//                   {'Agent of Service'}
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {this.props.message.table.map((row, i) =>
//                 <tr key={i}>
//                   <td>
//                     {row.companyName}
//                   </td>
//                   <td>
//                     {row.entityNum}
//                   </td>
//                   <td>
//                     {row.agentOfService}
//                   </td>
//                 </tr>,
//               )}
//             </tbody>
//           </table>
//         </div>
//       );
//     } else if (this.props.isBot === false) {
//       className = ' user-bubble user-bubble-alignment-m'; // using '=' instead of '+=' seperates blue chat-bubble from orange user-bubble-alignment
//       return (
//         // allows user bubble and bot bubble to be on two different lines because we're wrapping in div className=bubble-breaker
//         <div className="bubble-breaker-m">
//           <div className={userBubble}>
//             {ReactHtmlParser(this.props.message)}
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className={className} /* onClick={this.props.onClick}*/>
//         {ReactHtmlParser(this.props.message)}
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   ai: state.chat.ai,
// });

// const mapDispatchToProps = dispatch => ({
//   // controls buttons onclick function in bot response
//   onClick(event) {
//     // onClick on table can't use opn in frontend, has to transmit to backend.
//     event.stopPropagation();
//     console.log('EVENT TYPE: ', event.currentTarget.nodeName);
//     if (event.currentTarget.nodeName === 'TABLE') {
//       console.log('URL: ', this.props.message.url);
//       axios.post('/api/chat/message', { url: this.props.message.url }).then((response) => {
//         dispatch({
//           type: 'CHAT_ADD_MESSAGE',
//           payload: {
//             message: response.data.speech,
//             type: 'text',
//             isBot: true,
//           },
//         });
//       });
//       return;
//     }
//     // onClick on buttons
//     const data = { message: this.props.message, type: this.props.type, isBot: this.props.isBot };
//     console.log('SESSIONID: ', this.props.sessionId);
//     const inputData = { payload: data, id: this.props.sessionId };
//     // console.log("ai: ", this);
//     if (!this.props.ai.selected || this.props.message in CASETYPES) {
//       inputData.ai = false;
//       // dispatch({type: 'SELECT_CASE_TYPE'});
//     } else {
//       inputData.ai = true;
//     }
//     axios
//       .post('/api/chat/message', inputData) // redux way of saying once we send a POST request to server, then if we receive a response(Promise) from server
//       .then((response) => {
//         console.log('Response:', response);
//         // response = JSON.parse(response);

//         if (response.status === 200) {
//           // axios.response.data, get speech from api.ai

//           const msg = response.data.result.fulfillment.speech;
//           if (!msg.startsWith('\\n')) {
//             // single paragraph
//             dispatch({
//               type: 'CHAT_ADD_MESSAGE',
//               payload: {
//                 message: msg,
//                 type: 'text',
//                 isBot: true,
//               },
//             });
//           } else {
//             // multi-paragraphs

//             const paragraphs = msg.slice(2, -1).trim().split(/\\n/);
//             console.log(paragraphs);
//             let i = 0;
//             // msg="";
//             for (i = 0; i < paragraphs.length; i++) {
//               // msg+=paragraphs[i];
//               dispatch({
//                 type: 'CHAT_ADD_MESSAGE',
//                 payload: {
//                   message: paragraphs[i].trim(),
//                   type: 'text',
//                   isBot: true,
//                 },
//               });
//             }
//           }
//           // console.log('case type: ', response.data.caseType.toLowerCase());
//           dispatch({ type: response.data.caseType });
//           // if there's a custom payload attached to api.ai response
//           let customPayload;
//           if (!response.data.result.fulfillment.data) {
//             const messages = response.data.result.fulfillment.messages;
//             console.log('Messages:', messages);
//             if (messages.length > 1 && messages[1].type == 4) {
//               // buttons in payload
//               if (messages[1].payload.buttons) {
//                 // get custom payload from api.ai
//                 // console.log("buttons:", response.data.messages[1].payload.buttons);
//                 customPayload = messages[1].payload.buttons;
//                 customPayload.forEach((btn) => {
//                   dispatch({
//                     type: 'CHAT_ADD_MESSAGE',
//                     payload: {
//                       message: btn,
//                       type: 'button',
//                       isBot: true,
//                     },
//                   });
//                 });
//               }
//               // if image in payload
//               if (messages[1].payload.image) {
//                 customPayload = messages[1].payload.image;
//                 dispatch({
//                   type: 'CHAT_ADD_MESSAGE',
//                   payload: {
//                     message: customPayload,
//                     type: 'image',
//                     isBot: true,
//                   },
//                 });
//               }
//               // if map in payload
//               if (messages[1].payload.map) {
//                 customPayload = messages[1].payload.map;
//                 dispatch({
//                   type: 'CHAT_ADD_MESSAGE',
//                   payload: {
//                     message: customPayload,
//                     type: 'map',
//                     isBot: true,
//                   },
//                 });
//               }
//             }
//           } else {
//             const data = response.data.result.fulfillment.data;
//             console.log('DATA: ', data);
//             if (data.buttons) {
//               customPayload = data.buttons;
//               customPayload.forEach((btn) => {
//                 dispatch({
//                   type: 'CHAT_ADD_MESSAGE',
//                   payload: {
//                     message: btn,
//                     type: 'button',
//                     isBot: true,
//                   },
//                 });
//               });
//             }
//             if (data.image) {
//               customPayload = data.image;
//               dispatch({
//                 type: 'CHAT_ADD_MESSAGE',
//                 payload: {
//                   message: customPayload,
//                   type: 'image',
//                   isBot: true,
//                 },
//               });
//             }
//             if (data.map) {
//               customPayload = data.map;
//               dispatch({
//                 type: 'CHAT_ADD_MESSAGE',
//                 payload: {
//                   message: customPayload,
//                   type: 'map',
//                   isBot: true,
//                 },
//               });
//             }

//             if (data.table) {
//               customPayload = data;
//               console.log('CUSTOMPAYLOAD', customPayload);
//               dispatch({
//                 type: 'CHAT_ADD_MESSAGE',
//                 payload: {
//                   message: customPayload,
//                   type: 'table',
//                   isBot: true,
//                 },
//               });
//             }
//           }
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ChatBubble);
