import {
  examList,
  initialQuestion,
  initialCode,
  initialUser,
} from "../reducers/code.reducer";

export const getCode = (state = initialCode) => state;

export const getQuestion = (state = initialQuestion) => state;

export const getExams = (state = examList) => state.exams;

export const getUser = (state = initialUser) => state.user;
