const fetchCardDetails = async (id, role) => {
  console.log(`/api/${role}/exams/${id}`);
  let response = await fetch(`/api/${role}/exams/${id}`, {
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

const fetchStudentDetails = async (props) => {
  console.log(props.section, props.type, props.id);
  let res = await fetch(`/api/faculty/result/${props.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject: props.subject,
      section: props.section,
      type: props.type,
      year: props.year,
    }),
  });
  return await res.json();
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
  fetchExamById,
  fetchStudentDetails,
};
