import { Launch, Pad } from "../api/types";

export interface State {
    launches: Launch[];
    pads: Pad[];
    addToFavorites: (item: Launch | Pad) => void;
    removeFromFavorites: (itemId: number) => void;
  }
  
  const initialState: State = {
    launches: [],
    pads: [],
    addToFavorites: () => {},
    removeFromFavorites: () => {}
  };

export const rootReducer = (state = initialState, action: any) => {

switch (action.type) {
    case 'ADD_LAUNCH_TO_FAVORITES':
    return {
        ...state,
        launches: [...state.launches, action.payload]
    };
    case 'REMOVE_LAUNCH_FROM_FAVORITES':
    return {
        ...state,
        launches: state.launches.filter((item: Launch)=>item.flight_number !== action.payload),
    };
    case 'ADD_PAD_TO_FAVORITES':
    return {
        ...state,
        pads: [...state.pads, action.payload]
    };
    case 'REMOVE_PAD_FROM_FAVORITES':
    return {
        ...state,
        pads: state.pads.filter((item: Pad)=>item.id !== action.payload),
    };
    default:
    return state;
}
};