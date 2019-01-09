const dictionary = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PAIR':
      return state.concat([action.dictionary]);
    case 'DELETE_PAIR':
      return state.filter((dict) => dict.id !== action.id);
    case 'UPDATE_DOMAIN':
      return state.map((dict) => {
        if (dict.id === action.dictionary.id) {
          return action.dictionary;
        } else return dict;
      });
    case 'UPDATE_RANGE':
      return state.map((dict) => {
        if (dict.id === action.dictionary.id) {
          return action.dictionary;
        } else return dict;
      })
    default:
      return state;
  }
}
export default dictionary;
