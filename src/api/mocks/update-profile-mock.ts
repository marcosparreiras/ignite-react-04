import { http, HttpResponse } from "msw";
import type { UpdateProfileInput } from "../update-profile";

export const updateProfileMock = http.put<never, UpdateProfileInput>(
  "/profile",
  async ({ request }) => {
    const { name } = await request.json();
    if (name === "Pizza Shop 01") {
      return new HttpResponse(null, { status: 204 });
    }
    return new HttpResponse(null, { status: 400 });
  }
);
