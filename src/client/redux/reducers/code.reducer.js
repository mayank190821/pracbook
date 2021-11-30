export const initialCode = "";
export const initialQuestion = [];
export const examList = [];
export const initialUser = {};
export const objectiveAnswers = [];

export const sourceCode = (state = initialCode, { code, type }) => {
  if (type === "ADD_CODE") {
    return code;
  }
  return state;
};

export const ques = (state = initialQuestion, { question, type }) => {
  if (type === "ADD_QUESTION") {
    return question;
  }
  return state;
};

export const exams = (state = examList, { exams, type }) => {
  // console.log("updated");
  if (type === "LOAD_EXAMS") {
    return exams;
  }
  return state;
};

export const user = (state = initialUser, { user, type }) => {
  if (type === "SAVE_USER") {
    return user;
  }
  return state;
};

export const objAns = (state = objectiveAnswers, { examAns, id, type }) => {
  if (type === "SAVE_OBJ_ANS") {
    let data = state;
    if (data === []) {
      return {
        examAns: examAns,
        id: id,
      };
    } else {
      let flag = 0;
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          data[i].examAns = examAns;
          flag = 1;
          break;
        }
      }
      if (flag == 0) {
        data.push({
          examAns: examAns,
          id: id,
        });
      }
      return data;
    }
  }
  return state;
};
