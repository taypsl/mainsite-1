// var deepcopy = require('deepcopy');

const defaultState = [
  {
    message:
      "Hello, I'm Courtney!",
    type: 'text',
    source: 'server',
    isBot: true
  },
  {
    message:
      "I'm here to help you learn about the small claims process. I DO NOT offer legal advice. Ask me a question or click on a button to begin.",
    type: 'text',
    source: 'server',
    isBot: true
  },
  {
    message: "What is small claims court?",
    type:'button',
    isBot: true
  },
  {
    message: "Forms",
    type:'button',    
    isBot: true
  },
  {
    message: "Suing",
    type:'button',
    isBot: true
  }, 
  {
    message: "Being Sued",
    type:'button',
    isBot: true
  }
  


  // {
    // message: 'Tell briefly what brought you here.',
    // type: 'message',
    // isBot: true
  // },
  // {
    // message: 'Or you can choose a case type below.',
    // type: 'message',
    // isBot: true
  // },
  // {
  //   message: 'Small Claims',
  //   type: 'button',
  //   isBot: true
  // },
  // {
  //   message: 'Guardianship',
  //   type: 'button',
  //   isBot: true
  // },
  // {
  //   message: 'Family Law',
  //   type: 'button',
  //   isBot: true
  // },
  // {
  //   message: 'Eviction',
  //   type: 'button',
  //   isBot: true
  // },
  // {
  //   message: 'Domestic Violence',
  //   type: 'button',
  //   isBot: true
  // },
  // {
  //   message: 'Traffic',
  //   type: 'button',
  //   isBot: true
  // }
];

module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHAT_ADD_MESSAGE': {
      const newChat = state.slice(); //create a shallow copy of new array containing the same elements as defaultState
      newChat.push(action.payload); //append to the end of the array

      return newChat;
    }
    case 'RESET_BOT': {
      // return deepcopy(defaultState);
      return defaultState;
    }
  }

  return state;
};
