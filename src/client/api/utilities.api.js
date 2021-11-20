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

export { fetchCardDetails };