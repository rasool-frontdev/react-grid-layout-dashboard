import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { router } from "@/routes/route";

import "react-grid-layout/css/styles.css";

const App = () => {
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    >
      <Toaster />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
