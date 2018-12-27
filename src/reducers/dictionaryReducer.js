const dictionaryReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_DICTIONARY':
      return state.concat([action.dictionary]);
    case 'DELETE_DICTIONARY':
      return state.filter((dict) => dict.id !== action.id);
    case 'UPDATE_DICTIONARY':
      return state.map((dict) => {
        if (dict.id === action.dictionary.id) {
          return action.dictionary;
        } else return dict;
      })
    default:
      return state;
  }
}
export default dictionaryReducer;