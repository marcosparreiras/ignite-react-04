import { Helmet, HelmetProvider } from "react-helmet-async";
import { Router } from "./router";

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop" />
      <Router />
    </HelmetProvider>
  );
}
