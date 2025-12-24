import { UseServicePost } from "@/services/hooks/UseService";
import { AuthLogin } from "@/services/endpoints/auth";
import { setToken } from "@/services/token/token-service";
import { LogInRequest } from "@/types/auth";

export async function handleLogIn(loginBody: LogInRequest) {
  const response = await UseServicePost(AuthLogin, loginBody);
  const data = response?.data ?? response;

  const token = data?.token ?? data?.access_token ?? null;
  const user = data?.user ?? data?.profile ?? null;

  if (token) {
    try {
      setToken(token);
    } catch (e) {}
  }

  if (user) {
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (e) {}
  }

  try {
    window.dispatchEvent(new CustomEvent("user:login", { detail: user }));
  } catch (e) {}

  return { user, token, raw: data };
}
