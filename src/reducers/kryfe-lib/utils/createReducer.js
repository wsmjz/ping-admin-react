export default (initialState, handlers) => {
    if (!initialState || !handlers) {
      throw new Error('must pass args of "initialState" and "handlers" to createReducer!');
    }
  
    return (state = initialState, action) => {
      if (action && action.type) {
        const type = action.type;
  
        if (!handlers[type]) {
          return state;
        }
  
        return handlers[type](state, action);
      }
  
      return state;
    };
  };
  