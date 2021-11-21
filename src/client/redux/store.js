import {sourceCode,ques, exams} from "./reducers/code.reducer";
import {createStore, combineReducers} from "redux";

export const reducer = combineReducers({
    sourceCode,
    ques,
    exams
})

export const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)