// Simple client-side auth flag (demo only)
const KEY = "tat_authed";

export const authStore = {
  isAuthed: () => typeof window !== "undefined" && sessionStorage.getItem(KEY) === "1",
  login: () => sessionStorage.setItem(KEY, "1"),
  logout: () => sessionStorage.removeItem(KEY),
};

export const CREDENTIALS = { username: "1234", password: "tactics" };
