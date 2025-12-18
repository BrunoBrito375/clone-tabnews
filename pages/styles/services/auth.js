export function login(email, password) {
  if (email && password) {
    localStorage.setItem("user", email);
    return true;
  }
  return false;
}

export function isAuthenticated() {
  return typeof window !== "undefined" && localStorage.getItem("user");
}

export function logout() {
  localStorage.removeItem("user");
}
