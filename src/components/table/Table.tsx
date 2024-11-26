import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Table({ children }: Props) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-md border border-[#999]/30">
      {children}
    </div>
  );
}

export default Table;
