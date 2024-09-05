import { api } from "@/lib/axios";

export type SignInInput = {
  email: string;
};

export async function signIn(input: SignInInput) {
  await api.post("/authenticate", { email: input.email });
}
