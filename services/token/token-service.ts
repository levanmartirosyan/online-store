import Cookies from "js-cookie";

export const setToken = (token: string) => {
  try {
    Cookies.set("token", token, {
      expires: 30,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
  } catch (e) {}
};

export const getToken = (): string | null => {
  try {
    return Cookies.get("token") || null;
  } catch (e) {
    return null;
  }
};

export const clearToken = () => {
  try {
    Cookies.remove("token", { path: "/" });
  } catch (e) {}
};
