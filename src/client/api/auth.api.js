const studentSignin = async (data) => {
    try {
        let response = await fetch("/auth/student", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        return await response.json();
      } catch (err) {
        console.log(err);
    }
} 

export {studentSignin};