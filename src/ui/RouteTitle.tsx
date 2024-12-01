import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function RouteTitle({ children }: Props) {
  return (
    <h1 className="mb-7 text-4xl font-semibold dark:text-white">{children}</h1>
  );
}

export default RouteTitle;
