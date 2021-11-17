const facultySignup = async (data) => {
    try {
        let res = await fetch("/api/faculty/signup", {
            method: "POST",
            headers: {

                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        return await res.json();
    }
    catch (err) {
        console.log(err);
    }
}
export { facultySignup };