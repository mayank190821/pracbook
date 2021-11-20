import axios from "axios";

const fetchExam = async (id) => {
  let response = await fetch("/api/exam", {
    method: "GET",
    headers: {
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
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

const fetchExamQuestion = async (id) =>{
  let model;
  if(id.slice(0, 2) === "ob"){
    model = "objective";
  }
  else{
    model = "coding";
  }
  let response = await fetch(`/api/questions/${model}/fetchByID`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      id: id
    }
  });
  return await response.json();
}

const compile = async (data) => {
  var options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: { base64_encoded: "false", fields: "*", wait: true },
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "x-rapidapi-key": "d325964fcamsh45becd7c7e264c2p14f9d3jsna1e660b7b5ee",
    }, 
    data: data
  };

  return await axios
    .request(options)
    .then((response) => {
        return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

export { fetchExam, fetchExamQuestion, scheduleExam, compile };
