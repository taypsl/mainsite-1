// // refresh and close icons live here as links to material icons, not svg-components
// // css for settings icon is in header.scss, but code lives in ChatContaier.jsx and there's a note about settings icon replacing default 'x' from react-burger-menu package;
// import React from 'react';
// import { connect } from 'react-redux';

// class Header extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       // this empty div wraps everything, and lets header view correctly in safari*/}
//       <div>
//         <div className="header-m">
//           <div className="icon-container-m">
//             <button
//               type="button"
//               id="close-button-m"
//               className="back-arrow-m"
//               onClick={this.props.onClick.bind(this)}
//             >
//               <i className="material-icons" style={{ fontSize: '2.3em' }}>
//                 arrow_back
//               </i>
//             </button>
//             {/* case type button*/}
//             {/* <button type="button">
//               {this.props.ai.caseType}
//             </button>*/}
//             <button
//               type="button"
//               id="refresh-button"
//               className="refresh-bot-m"
//               onClick={this.props.onClick.bind(this)}
//             >
//               <i className="material-icons" style={{ fontSize: '2.5em' }}>
//                 refresh
//               </i>
//             </button>
//             <button
//               type="button"
//               id="open-settings-button"
//               className="open-bot-settings"
//               onClick={this.props.onClick.bind(this)}
//               >
//               <i className="material-icons open-bot-settings-icon" style={{ fontSize: '2em' }}>settings</i>
//             </button>

//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   chatlog: state.chat.log,
//   ai: state.chat.ai,
// });

// const mapDispatchToProps = dispatch => ({
//   onClick(event) {
//     if (event.currentTarget.type !== 'button') {
//       return;
//     }
//     if (event.currentTarget.id === 'refresh-button') {
//       dispatch({ type: 'RESET_BOT' });
//       dispatch({ type: 'General' });
//       this.props.resetSession();
//     } else if (event.currentTarget.id === 'open-settings-button') {
//         this.props.toggleMenu();   
//     } else {
//       // id==='close-button'
//       // dispatch({ type: 'TOGGLE_BOT' });
//       this.props.history.goBack(); 
//     }
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Header);
