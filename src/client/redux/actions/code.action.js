export const saveCode = (code) => {
  return {
    type: "ADD_CODE",
    code: code,
  };
};
export const saveQuestion = (question) => {
  return {
    type: "ADD_QUESTION",
    question: question,
  };
};
export const loadExams = (exams) => {
  return {
    type: "LOAD_EXAMS",
    exams: exams,
  };
};
export const saveUser = (user) => {
  return {
    type: "SAVE_USER",
    user: user,
  };
};
