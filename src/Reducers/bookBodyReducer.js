const bookBodyReducer = (state = '', action) => {
  switch (action.type) {
    case 'MODIFICATION':
      return action.payload;
    default:
      return state;
  }
};

export default bookBodyReducer;
