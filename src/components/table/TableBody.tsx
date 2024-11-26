import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function TableBody({ children }: Props) {
  return (
    <div className="flex flex-1 flex-col overflow-y-visible bg-white dark:bg-[#161e2a]">
      {children}
    </div>
  );
}

export default TableBody;
