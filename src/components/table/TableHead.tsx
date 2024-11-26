import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  cols: "pembelian" | "produk" | "user";
}

function TableHead({ cols, children }: Props) {
  const tableCols = {
    pembelian: "grid-cols-[1.5fr_1.5fr_2fr_1.5fr_1fr_1.2fr] gap-2",
    produk: "grid-cols-[1fr_2fr_3fr_1.5fr_1fr] py-3",
    user: "grid-cols-[1fr_3fr_5fr_3fr_1fr]",
  };

  return (
    <div
      className={
        `grid items-center border-b border-b-[#999]/30 p-3 font-semibold dark:text-white ` +
        `${tableCols[cols]}`
      }
    >
      {children}
    </div>
  );
}

export default TableHead;
