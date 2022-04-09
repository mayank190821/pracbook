const signin = async (data, role) => {
  try {
    let response = await fetch(`/auth/${role}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return (await response)
      ? response.json()
      : { error: "check your internet" };
  } catch (err) {
    return { error: "check your internet" };
  }
};
const getStudent = async (id) => {
  try {
    let response = await fetch(`/api/getStudent/${id}`, {
      method: "GET",
      headers: {
        prackey: "pracbookauthkey",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return (await response)
      ? response.json()
      : { error: "check your internet" };
  } catch (err) {
    return { error: "check your internet" }
  }
};
const signup = async (data, role) => {
  try {
    let response = await fetch(`/auth/${role}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (err) {
    return { error: "check your internet" }
  }
};

export { signin, signup, getStudent };
