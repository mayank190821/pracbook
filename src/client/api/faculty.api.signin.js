const facultySingin = async (data) => {
    try {
        let res = await fetch("/auth/faculty", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    }
    catch (err) {
        console.log(err);
    }
}
export { facultySingin };