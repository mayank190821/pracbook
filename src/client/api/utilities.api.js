const fetchCardDetails = async (id) => {
  let response = await fetch(`/api/faculty/exams/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

const fetchQuesDetails = async () => {
  let response = await fetch(`/api/questions/objective/fetchQuestions`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

const fetchCpQuesDetails = async () => {
  let response = await fetch(`/api/questions/coding/fetchCpQuestions`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
const fetchResultByStudentId = async (id) => {
        console.log(id);
  let response = await fetch(`/api/student/result/${id}`,{
    method : "GET",
    headers: {
      Accept:"application/json",
      "Content-Type":"application/json",
    }
  });
  // console.log(response);

  return await response.json();
};
const fetchExamById = async (id) => {
  let response = await fetch(`/api/exam`, {
    method: "GET",
    headers: {
      id: id,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export {
  fetchCardDetails,
  fetchQuesDetails,
  fetchCpQuesDetails,
  fetchResultByStudentId,
  fetchExamById,
};