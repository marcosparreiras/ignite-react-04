import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div>
      <h1>Head</h1>
      <div>
        <Outlet />
      </div>
      <h1>Footer</h1>
    </div>
  );
}
