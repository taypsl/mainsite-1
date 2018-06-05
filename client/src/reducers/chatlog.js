// var deepcopy = require('deepcopy');
// const uuid = require('uuid/v4');
//hard coded ids
const defaultState = [
  {
    message:
      "Hello, I'm Courtney!",
    type: 'text',
    source: 'server',
    isBot: true,
    id: '1371a65c-2932-4331-9918-768b39a68156'
  },
  {
    message:
      "I'm here to help you learn about the small claims process. I DO NOT offer legal advice. Ask me a question or click on a button to begin.",
    type: 'text',
    source: 'server',
    isBot: true,
    id: '4963d1fe-21c0-437c-993c-4722fddc1d57'
  },
  {
    message: "What is small claims court?",
    type:'button',
    isBot: true,
    id: '362891f8-e7eb-4f3c-afdf-c0dd7b29df5e'
  },
  {
    message: "Forms",
    type:'button',    
    isBot: true,
    id: 'a13a1668-4a0b-4cb9-b0f5-42228824a6a6'
  },
  {
    message: "Suing",
    type:'button',
    isBot: true,
    id: '0b0470ea-78a5-41c6-98c9-b3569f82a031'
  }, 
  {
    message: "Being Sued",
    type:'button',
    isBot: true,
    id: '99028cc1-130f-4fb3-b2b5-033c0b2706c7'
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
