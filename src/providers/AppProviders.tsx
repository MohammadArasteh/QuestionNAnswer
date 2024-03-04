import { DirectionProvider } from "./RtlProvider";

type Props = {
  children: React.ReactElement;
};

export function AppProviders({ children }: Props) {
  return <DirectionProvider dir="rtl">{children}</DirectionProvider>;
}
