import React from 'react';
import Menu from 'react-burger-menu/lib/menus/push';
import Header from './Header.jsx';
import Chatbox from './Chatbox.jsx';
import Chatbar from './Chatbar.jsx';
import LanguageIcon from './icons/LanguageIcon.jsx';
import ThemeIcon from './icons/ThemeIcon.jsx';
import FontSizeIcon from './icons/FontSizeIcon.jsx';
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
      botContainer = 'mono-grey-bg chat-container-bg';
    } else {
      botContainer = 'chat-box-bg chat-container-bg';
    }
    return (
      <div>

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
            <Header resetSession={this.resetSession} toggleMenu ={this.toggleMenu} theme={this.props.theme} history={this.props.history}/> {/*added history from mbot*/}
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
