import { Launch, Pad } from "../api/types";

export const addToFavorites = (item: Launch | Pad, itemName: string) => {
    return {
      type: 'ADD_LAUNCH_OR_PAD_TO_FAVORITES',
      payload: item,
      objectName: itemName
    };
  };
  
export const removeFromFavorites = (itemId: number, itemName: string) => {
    return {
      type: 'REMOVE_LAUNCH_OR_PAD_FROM_FAVORITES',
      payload: itemId,
      objectName: itemName
    };
  };