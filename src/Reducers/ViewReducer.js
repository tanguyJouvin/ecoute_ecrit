const ViewReducer = (state = 'Author', action) => {
  switch (action.type) {
    case 'SWITCH':
      return action.payload;
    default:
      return state;
  }
};

export default ViewReducer;
