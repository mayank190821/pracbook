import { sourceCode, ques, exams, user, objAns } from "./reducers/code.reducer";
import { createStore, combineReducers } from "redux";

export const reducer = combineReducers({
  sourceCode,
  ques,
  exams,
  user,
  objAns
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
