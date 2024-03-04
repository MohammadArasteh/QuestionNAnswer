import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtl from "stylis-plugin-rtl";
import React from "react";

const options = {
  rtl: { key: "css-ar", stylisPlugins: [rtl] },
  ltr: { key: "css-en" },
};

type Props = {
  dir: "rtl" | "ltr";
  children: React.ReactElement;
};

export function DirectionProvider({ children, dir }: Props) {
  const cache = createCache(options[dir]);
  return <CacheProvider value={cache} children={children} />;
}
