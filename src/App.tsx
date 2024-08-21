import { Helmet, HelmetProvider } from "react-helmet-async";
import { Router } from "./router";
import { Toaster } from "sonner";

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop" />
      <Toaster richColors />
      <Router />
    </HelmetProvider>
  );
}
