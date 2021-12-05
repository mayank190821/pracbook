function authenticate(jwt) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("jwt", JSON.stringify(jwt));
  }
}
function isAuthenticated() {
  if (typeof window === "undefined") return false;
  if (sessionStorage.getItem("jwt")) {
    return JSON.parse(sessionStorage.getItem("jwt"));
  } else {
    return false;
  }
}

function clearJWT(cb) {
  if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
  cb();
  document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export { authenticate, isAuthenticated, clearJWT };
