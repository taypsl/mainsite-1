import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import contentReducer from './content_reducer';
// import contentVariableReducer from './content_variable_reducer';
import assetsReducer from './assets_reducer';
import chatlog from './chatlog';
import chatUserInput from './chatUserInput';
import botStatusReducer from './botStatusReducer';
// import { 
//   checklistReducer,
//   tasksByChecklistType,
//   selectedChecklist 
// } from './checklist_reducer';

//redux todo app with data service middleware: 
import todos from './todos'
import loading from './loading'
import visibilityFilter from './visibilityFilter'


// import { routerStateReducer }      from 'redux-router';
// import { themeReducer }            from 'redux-theme';

// import communicationReducer from './communication_reducer';
// import customerReducer from './customer_reducer';
const chatReducer = combineReducers({
	log:chatlog, 
	input:chatUserInput,
	theme:botStatusReducer.themeReducer,
  botVisibility:botStatusReducer.visibilityReducer,
  ai: botStatusReducer.aiReducer,
  currentView: botStatusReducer.currentViewReducer
	// router:routerStateReducer
});

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  chat: chatReducer,
  content: contentReducer,
  // partyId: contentVariableReducer,
  assets: assetsReducer,
  // // checklist: checklistReducer,
  // selectedChecklist,
  // tasksByChecklistType,
  loading,
  todos,
  visibilityFilter
});


export default rootReducer;

  // communication: communicationReducer,
  // customer: customerReducer,