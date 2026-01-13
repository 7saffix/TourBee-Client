import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routers/index.tsx";
import { ThemeProvider } from "./provider/ThemeProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster richColors />
    </ThemeProvider>
  </Provider>
);
