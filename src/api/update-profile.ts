import { api } from "@/lib/axios";

type Input = {
  name: string;
  description: string | null;
};

export async function updateProfile(input: Input) {
  await api.put("/profile", {
    name: input.name,
    description: input.description,
  });
}
