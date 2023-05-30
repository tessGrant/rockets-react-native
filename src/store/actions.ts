import { Launch, Pad } from "../api/types";

export const addLaunchToFavorites = (item: Launch) => {
    console.log('Action fired!!!!')
    return {
      type: 'ADD_LAUNCH_TO_FAVORITES',
      payload: item
    };
  };
  
export const removeLaunchFromFavorites = (itemId: number) => {
    return {
      type: 'REMOVE_LAUNCH_FROM_FAVORITES',
      payload: itemId
    };
  };

export const addPadToFavorites = (item: Pad) => {
    return {
      type: 'ADD_PAD_TO_FAVORITES',
      payload: item
    };
  };
  
export const removePadFromFavorites = (itemId: number) => {
    return {
      type: 'REMOVE_PAD_FROM_FAVORITES',
      payload: itemId
    };
  };