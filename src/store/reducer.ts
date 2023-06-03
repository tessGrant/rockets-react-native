import { Launch, Pad } from "../api/types";

export interface State {
    launches: Launch[];
    pads: Pad[];
    favoriteLaunches: Launch[];
    favoritePads: Pad[];
  }
  
  const initialState: State = {
    launches: [],
    pads: [],
    favoriteLaunches:[],
    favoritePads: [],
  };

export const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'GET_LAUNCHES_OR_PADS':
            if(action.objectName === 'pad'){
                return {
                    ...state,
                    pads: action.payload
                }
            } else {
                return {
                    ...state,
                    launches: action.payload
                };
            }
        case 'ADD_LAUNCH_OR_PAD_TO_FAVORITES':
            if(action.objectName === 'pad'){
                return {
                    ...state,
                    favoritePads: [...state.favoritePads, action.payload]
                }
            } else {
                return {
                    ...state,
                    favoriteLaunches: [...state.favoriteLaunches, action.payload]
                };
            }
        case 'REMOVE_LAUNCH_OR_PAD_FROM_FAVORITES':
            if(action.objectName === 'pad'){
                return {
                    ...state,
                    favoritePads: state.favoritePads.filter((item: Pad)=>item.id !== action.payload),
                }
            }
            return {
                ...state,
                favoriteLaunches: state.favoriteLaunches.filter((item: Launch)=>item.flight_number !== action.payload),
            };
    default:
    return state;
}
};