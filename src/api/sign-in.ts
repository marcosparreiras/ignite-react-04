import { api } from "@/lib/axios";

type Input = {
  email: string;
};

export async function signIn(input: Input) {
  await api.post("/authenticate", { email: input.email });
}
