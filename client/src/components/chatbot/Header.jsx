// refresh and close icons live here as links to material icons, not svg-components
// css for settings icon is in header.scss, but code lives in ChatContaier.jsx and there's a note about settings icon replacing default 'x' from react-burger-menu package;
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

 
  render() {
    return (
      // this empty div wraps everything, and lets header view correctly in safari*/}
      <div>
        <div className="header-x">
          <div className="icon-container">
            <button
              type="button"
              id="close-button"
              className="close-bot"
              onClick={this.props.onClick.bind(this)}
            >
              <i className="material-icons" style={{ fontSize: '1.2em' }}>
                close
              </i>
            </button>

         {/*
            case type selection button -- removed for small claims bot 
            <div>
              {this.props.ai.caseType}
            </div> 
          */}

            <button id="email" className="button-chatbot-email">
              <i className="material-icons" style={{ fontSize: '2.5em' }}>
              email
              </i>
            </button>

            <button
              type="button"
              id="refresh-button"
              className="refresh-bot"
              onClick={this.props.onClick.bind(this)}
              >
              <i className="material-icons" style={{ fontSize: '2.5em' }}>refresh</i>
            </button>

            <button
              type="button"
              id="open-settings-button"
              className="open-bot-settings"
              onClick={this.props.onClick.bind(this)}
              >
              <i className="material-icons open-bot-settings-icon" style={{ fontSize: '2em' }}>settings</i>
            </button>
            
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chatlog: state.chat.log,
  ai: state.chat.ai,
});

const mapDispatchToProps = dispatch => ({
  onClick(event) {
    if (event.currentTarget.type !== 'button') {
      return;
    }
    if (event.currentTarget.id === 'refresh-button') {
      if (confirm("You will lose all previous conversations on refresh. Do you wish to proceed?")){
        //save all user input to database
        dispatch({ type: 'RESET_BOT' });
        dispatch({ type: 'General' });
        this.props.resetSession();
      }
    } else if (event.currentTarget.id === 'close-button' && this.state.width > 768) {
        dispatch({ type: 'TOGGLE_BOT' });
    } else if (event.currentTarget.id === 'close-button' && this.state.width < 768) {
        this.props.history.goBack();
    } else if (event.currentTarget.id === 'open-settings-button') {
        this.props.toggleMenu();    
    } else if (event.currentTarget.id === 'email'){
        //email the dialog
        axios.post();
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
