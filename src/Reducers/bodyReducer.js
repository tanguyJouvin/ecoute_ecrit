import { getBodyBook } from '../Utils/storageBook';

const bodyReducer = (state = getBodyBook(), action) => {
  switch (action.type) {
    case 'EDIT_BODY': {
      return action.payload;
    }
    // case 'MOVE_UP'://reducer inusité pr le moment à la demande de la cliente
    //   if (action.payload < state.length - 1) {
    //     const newState = [...state];
    //     const temp = newState[action.payload + 1];
    //     newState[action.payload + 1] = newState[action.payload];
    //     newState[action.payload] = temp;
    //     return newState;
    //   }
    //   break;
    // case 'MOVE_DOWN'://reducer inusité pr le moment à la demande de la cliente
    //   if (action.payload > 0) {
    //     const newState = [...state];
    //     const temp = newState[action.payload - 1];
    //     newState[action.payload - 1] = newState[action.payload];
    //     newState[action.payload] = temp;
    //     return newState;
    //   }
    //   break;
    default:
      return state;
  }
};

export default bodyReducer;
