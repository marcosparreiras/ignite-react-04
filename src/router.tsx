import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./pages/app/dashboard";
import { SingIn } from "./pages/auth/sign-in";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "sign-in",
    element: <SingIn />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
