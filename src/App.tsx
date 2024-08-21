import { Helmet, HelmetProvider } from "react-helmet-async";
import { Router } from "./router";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme">
      <HelmetProvider>
        <Helmet titleTemplate="%s | pizza.shop" />
        <Toaster richColors />
        <Router />
      </HelmetProvider>
    </ThemeProvider>
  );
}
