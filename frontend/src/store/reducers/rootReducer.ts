import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user";
import alertSlice from "./alert";
import friendsSlice from "./friends";

const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case "DUMMY":
      return {
        ...state,
      };
    default: {
      const combinedReducers = combineReducers({
        user: userSlice,
        alert: alertSlice,
        friends: friendsSlice,
      });
      return combinedReducers(state, action);
    }
  }
};

export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
