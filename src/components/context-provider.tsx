"use client";

import { Provider } from "jotai";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export const ContextProvider = ({ children }: Props) => {
  return <Provider>{children}</Provider>;
};
