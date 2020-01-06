import { getBookHead } from '../Utils/storageBook';

const headReducer = (state = getBookHead(), action) => {
  switch (action.type) {
    case 'EDIT_AUTHOR': {
      const newStateAuthor = { ...state };
      newStateAuthor.author = action.payload;
      return newStateAuthor;
    }
    case 'EDIT_TITLE': {
      const newStateTitle = { ...state };
      newStateTitle.title = action.payload;
      return newStateTitle;
    }
    case 'EDIT_SUBTITLE': {
      const newStateSubtitle = { ...state };
      newStateSubtitle.subtitle = action.payload;
      return newStateSubtitle;
    }
    case 'EDIT_OTHERBOOKS': {
      const newStateOthersBooks = { ...state };
      newStateOthersBooks.otherBooks = action.payload;
      return newStateOthersBooks;
    }
    case 'EDIT_DEDICATION': {
      const newStateDedication = { ...state };
      newStateDedication.dedication = action.payload;
      return newStateDedication;
    }
    case 'EDIT_QUOTES': {
      const newStateQuotes = { ...state };
      newStateQuotes.quotes = action.payload;
      return newStateQuotes;
    }
    case 'EDIT_THANKS': {
      const newStateThanks = { ...state };
      newStateThanks.thanks.position = action.payload.position;
      newStateThanks.thanks.text = action.payload.text;
      return newStateThanks;
    }
    case 'EDIT_PREFACE': {
      const newState = { ...state };
      newState[action.payload.type] = action.payload.content;
      return newState;
    }
    default:
      return state;
  }
};

export default headReducer;
