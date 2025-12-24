import { AuthRegister } from "@/services/endpoints/auth";
import { UseServicePost } from "@/services/hooks/UseService";
import { RegisterRequest } from "@/types/auth";

export async function handleRegister(registerBody: RegisterRequest) {
  const response = await UseServicePost(AuthRegister, registerBody);
  const data = response?.data ?? response;

  return { raw: data };
}
