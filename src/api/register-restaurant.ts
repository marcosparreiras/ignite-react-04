import { api } from "@/lib/axios";

export type RegisterRestaurantInput = {
  email: string;
  phone: string;
  restaurantName: string;
  managerName: string;
};

export async function registerRestaurant(input: RegisterRestaurantInput) {
  await api.post("/restaurants", {
    email: input.email,
    phone: input.phone,
    restaurantName: input.restaurantName,
    managerName: input.managerName,
  });
}
