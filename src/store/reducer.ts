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
        case 'ADD_LAUNCH_OR_PAD_TO_FAVORITES':
            if(action.itemName === 'pad'){
                return {
                    ...state,
                    pads: [...state.pads, action.payload]
                }
            } else {
                return {
                    ...state,
                    launches: [...state.launches, action.payload]
                };
            }
    case 'REMOVE_LAUNCH_OR_PAD_FROM_FAVORITES':
        if(action.itemName === 'pad'){
            return {
                ...state,
                pads: state.pads.filter((item: Pad)=>item.id !== action.payload),
            }
        }
        return {
            ...state,
            launches: state.launches.filter((item: Launch)=>item.flight_number !== action.payload),
        };
    default:
    return state;
}
};