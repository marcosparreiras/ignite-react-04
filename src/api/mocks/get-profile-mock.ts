import { http, HttpResponse } from "msw";
import { GetProfileResponse } from "../get-profile";

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  "/me",
  () => {
    return HttpResponse.json({
      id: "custom-user-id",
      createdAt: new Date(),
      email: "johndoe@example.com",
      name: "John Doe",
      phone: "999999999",
      role: "manager",
      updatedAt: null,
    });
  }
);
