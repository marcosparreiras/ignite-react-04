import { api } from "@/lib/axios";

export type UpdateProfileInput = {
  name: string;
  description: string | null;
};

export async function updateProfile(input: UpdateProfileInput) {
  await api.put("/profile", {
    name: input.name,
    description: input.description,
  });
}
