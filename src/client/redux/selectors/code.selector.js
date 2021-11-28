import {
  examList,
  initialQuestion,
  initialCode,
  initialUser,
  objectiveAnswers
} from "../reducers/code.reducer";

export const getCode = (state = initialCode) => state;

export const getQuestion = (state = initialQuestion) => state;

export const getExams = (state = examList) => state.exams;

export const getUser = (state = initialUser) => state.user;

export const getObjAns = (state = objectiveAnswers) => state.objAns;

