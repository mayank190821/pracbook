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

const fetchStudentDetails = async()=>{
  let res = await fetch("/api/faculty/result/:facultyId",{
  method:"GET",
  headers: {
    Accept:"application/json",
    "Content-Type":"application/json"
  }
});
return await res.json();
}
export { fetchCardDetails, fetchQuesDetails , fetchCpQuesDetails, fetchStudentDetails};