import { RouterProvider } from "react-router-dom";
import { DirectionProvider } from "./RtlProvider";
import { router } from "../lib";

type Props = {
  children: React.ReactElement;
};

export function AppProviders({ children }: Props) {
  return (
    <DirectionProvider dir="rtl">
      <RouterProvider router={router} fallbackElement={children} />
    </DirectionProvider>
  );
}
