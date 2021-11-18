const fetchExam = async (id) => {
    let response = await fetch("/api/exam", {
        method: "GET",
        headers: {
            Accept: "application/json",
            id: id
        }
    })
    return await response.json();
}

export {fetchExam}