const fetchExam = async (id) => {
  let response = await fetch("/api/exam", {
    method: "GET",
    headers: {
      prackey: "pracbookauthkey",
      Accept: "application/json",
      id: id,
    },
  });
  return await response.json();
};
const scheduleExam = async (data) => {
  let response = await fetch("/api/exam", {
    method: "POST",
    headers: {
      prackey: "pracbookauthkey",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

const fetchExamQuestion = async (id) => {
  let model;
  if (id.slice(0, 2) === "ob") {
    model = "objective";
  } else {
    model = "coding";
  }
  let response = await fetch(`/api/questions/${model}/fetchByID`, {
    method: "GET",
    headers: {
      prackey: "pracbookauthkey",
      Accept: "application/json",
      "Content-Type": "application/json",
      id: id,
    },
  });
  return await response.json();
};

const addVivaQuestion = async (data) => {
  let response = await fetch("/api/questions/objective/add", {
    method: "POST",
    headers: {
      prackey: "pracbookauthkey",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

const addCodingQuestion = async (data) => {
  let response = await fetch("/api/questions/coding/add", {
    method: "POST",
    headers: {
      prackey: "pracbookauthkey",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

const compile = async (data) => {
  let response = await fetch("/api/exam/compile", {
    method: "POST",
    headers: {
      prackey: "pracbookauthkey",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

const uploadResult = async ({ id, examId, marks }) => {
  let response = await fetch(`/api/student/result/${id}`, {
    method: "PUT",
    headers: {
      prackey: "pracbookauthkey",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      examId: examId,
      marks: marks,
    }),
  });
  return await response.json();
};

const deleteOneByID = async (id) => {
  let response = await fetch(`/api/exam`, {
    method: "DELETE",
    headers: {
      prackey: "pracbookauthkey",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  return await response.json();
};
export {
  fetchExam,
  fetchExamQuestion,
  scheduleExam,
  addVivaQuestion,
  addCodingQuestion,
  compile,
  deleteOneByID,
  uploadResult,
};
