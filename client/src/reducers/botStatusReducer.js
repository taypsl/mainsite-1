


const visibilityReducer = (state=false, action) => {
	switch (action.type) {
		case "TOGGLE_BOT":
			// console.log(state);
			// console.log("toggled visibility!");
			return !state;
		

		default:
			return state;
		


	}

}

const botMenuVisibilityReducer = (state=false, action) => {
	switch (action.type) {
		case "TOGGLE_BOT_MENU":

			return !state;
		

		default:
			return state;
		


	}

}

const themeReducer = (state='light', action) => {
	switch (action.type) {
		case "TOGGLE_THEME":
			// console.log(state);
			// console.log("toggled theme!");
			if (state === 'light'){
				return 'dark';
			}
			if (state === 'dark'){
				return 'light';
			}
		

		default:
			return state;
		


	}

}

//keep track of whether case type has been selected
const defaultState = {selected: false, caseType: 'General'};
const aiReducer = (state= defaultState , action)=>{
	switch (action.type){
		case "Small Claims":
			// console.log("small claims selected");
			return {selected: true, caseType:'Small Claims'};
		case "Guardianship":
			return {selected: true, caseType:'Guardianship'};
		case "General":
			return defaultState;
		default:
			return state;
	}

}

//keep track of where the new message block begins
const currentViewReducer = (state= {id: '1371a65c-2932-4331-9918-768b39a68156'}, action) => {
	switch (action.type) {
		case "SET_FOCUS":
			return {id: action.payload.id};
		default:
			return state;
	}

}

module.exports = {themeReducer, visibilityReducer, botMenuVisibilityReducer, aiReducer, currentViewReducer};
