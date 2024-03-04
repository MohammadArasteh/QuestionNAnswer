import { RouterProvider } from "react-router-dom";
import { DirectionProvider } from "./RtlProvider";
import { router } from "../lib";
import { Provider as RTKProvider } from "react-redux";
import { store } from "@/store/store";

export function AppProviders() {
  return (
    <RTKProvider store={store}>
      <DirectionProvider dir="rtl">
        <RouterProvider router={router} fallbackElement={<div />} />
      </DirectionProvider>
    </RTKProvider>
  );
}
