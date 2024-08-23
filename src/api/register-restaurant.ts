import { api } from "@/lib/axios";

type Input = {
  email: string;
  phone: string;
  restaurantName: string;
  managerName: string;
};

export async function registerRestaurant(input: Input) {
  await api.post("/restaurants", {
    email: input.email,
    phone: input.phone,
    restaurantName: input.restaurantName,
    managerName: input.managerName,
  });
}
