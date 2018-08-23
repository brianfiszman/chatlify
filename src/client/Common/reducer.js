import { SET_USER } from "./actions";

const initialState = { user: "" };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
};

export default rootReducer;
