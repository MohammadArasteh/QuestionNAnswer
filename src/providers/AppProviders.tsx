import { RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import { DirectionProvider } from "./RtlProvider";
import { router } from "../lib";
import { Provider as RTKProvider } from "react-redux";
import { store } from "@/store/store";

export function AppProviders() {
  return (
    <RTKProvider store={store}>
      <CssBaseline />
      <DirectionProvider dir="rtl">
        <RouterProvider router={router} />
      </DirectionProvider>
    </RTKProvider>
  );
}
