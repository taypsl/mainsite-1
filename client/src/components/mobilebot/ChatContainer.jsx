import React from 'react';
import Menu from 'react-burger-menu/lib/menus/push';
import Header from './Header.jsx';
import Chatbox from '../chatbot/Chatbox.jsx';
import Chatbar from './../chatbot/Chatbar.jsx';
import LanguageIcon from '../chatbot/icons/LanguageIcon.jsx';
import ThemeIcon from '../chatbot/icons/ThemeIcon.jsx';
import FontSizeIcon from '../chatbot/icons/FontSizeIcon.jsx';
import { connect } from 'react-redux';

const uuidv1 = require('uuid/v1');

const sessionId = uuidv1();

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      id: sessionId,
      outerContainerClass: true  
    };
    this.resetSession = this.resetSession.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  resetSession() {
    this.setState({ id: uuidv1() });
  }

  toggleMenu() {
    this.setState({ outerContainerClass: !this.state.outerContainerClass })
  }

  render() {
    let botContainer;
    if (this.props.theme === 'dark') {
      botContainer = 'mono-grey-bg chat-container-bg-m';
    } else {
      botContainer = 'chat-box-bg chat-container-bg-m';
    }
    return (
      <div>
        {/* pushes out settings/navbar*/}

        {/*<Menu
          pageWrapId={'page-wrap'}
          outerContainerId={'outer-container'}
          right
          noOverlay
          width={'100px'}
          customCrossIcon={
            // settings icon replaced original x (close) icon
            <svg height="20" viewBox="0 0 25 25" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
            </svg>
          }
        >
          <div id="outer-container">
            <ThemeIcon />
            <FontSizeIcon />
            <LanguageIcon />
          </div>
        </Menu>*/}

        <div className={this.state.outerContainerClass ? 'outer-container hidden' : 'outer-container' }>
          <div className="bot-settings">
            <ThemeIcon className="bot-menu-icon" />
            <FontSizeIcon className="bot-menu-icon" />
            <LanguageIcon className="bot-menu-icon" />
          </div>
        </div>

        <main id="page-wrap">
          {/* botContainer wraps header and chatbar in fixed position*/}
          <div className={botContainer}>
            <Chatbox sessionId={this.state.id} theme={this.props.theme} />
            <Header resetSession={this.resetSession} theme={this.props.theme} toggleMenu ={this.toggleMenu} history={this.props.history} />
            <Chatbar sessionId={this.state.id} theme={this.props.theme} />
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.chat.theme,
});

export default connect(mapStateToProps)(ChatContainer);
