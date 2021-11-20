import {initialCode} from "../reducers/code.reducer";
import { initialQuestion } from "../reducers/code.reducer";

export const getCode = (state = initialCode) => state;

export const getQuestion = (state = initialQuestion)=>state;