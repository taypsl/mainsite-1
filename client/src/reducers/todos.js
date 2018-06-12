import checklistTemplatePlaintiff from '../../data/checklist_plaintiff.js';
import checklistTemplateDefendant from '../../data/checklist_defendant.js';
import { LOAD_TODOS, SMALL_CLAIMS, PLAINTIFF, DEFENDANT } from '../actions/types'; 
 
const todo = (state, action) => {
  switch (action.type) {
  case 'ADD_TODO':
    return {
      id: action.id,
      text: action.text,
      completed: false
    }
  case 'TOGGLE_TODO':
    if (state.id !== action.id) {
      return state
    }
    return Object.assign({}, state, {
      completed: !state.completed
    })
  case 'ACCORDION_TODO':
    if(state.id != action.id) {
      return state
    }
    return Object.assign({}, state, {
      expanded: !state.expanded
    })
  default:
    return state
  } 
}

const todos = (state=[] , action) => {
  switch (action.type) {
  
  case SMALL_CLAIMS+'-'+PLAINTIFF:
    console.log("loading complete plaintiff template for small claims", checklistTemplatePlaintiff);
    return checklistTemplatePlaintiff['smallClaims'];

  case SMALL_CLAIMS+'-'+DEFENDANT:
    console.log("loading complete defendant template for small claims");
    return checklistTemplateDefendant['smallClaims'];
  
  case 'ADD_TODO':
    return [
      ...state,
      todo(undefined, Object.assign(action, {
        id: state.length
      }))
    ]
  case 'TOGGLE_TODO':
    return state.map(t =>
      todo(t, action)
    );
  case 'ACCORDION_TODO':
    return state.map(t =>
      todo(t, action)
    );
  // case 'GET_TODO_DATA_RECEIVED':
  //   return action.data;
  
  case LOAD_TODOS:
    // console.log("LOAD_TODOS action called: ", action.payload);
    // console.log("Old State: ", state);
    if (action.payload.length > 0){
      console.log("loading updated todos");
      let newState = state.slice();
      newState = newState.map((t, i) => ({
        // console.log("old todo": todo);
        ...t,
        completed : action.payload[i].completed
      })
      );
      // console.log("New State: ", newState);
      return newState;
    }else{
      console.log("loading template");
      return state;
    }


  default:
    return state
  }

}

export default todos