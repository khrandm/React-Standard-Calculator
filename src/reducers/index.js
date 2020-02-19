import entryReducer from "./entryReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  calculator: entryReducer
});

export default reducers;
