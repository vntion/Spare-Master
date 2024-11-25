import { Children, ReactNode, useState } from "react";
import PaginationButton from "./PaginationButton";

interface Props {
  children: ReactNode;
  msg: string;
}

function Pagination({ msg, children }: Props) {
  const [page, setPage] = useState<number>(0);
  const childrenArray = Children.toArray(children);
  const childrenLength = childrenArray.length;

  const handleNextPage = function () {
    if ((page + 1) * 10 >= childrenLength) return;
    setPage((cur) => cur + 1);
  };

  const handlePrevPage = function () {
    if (page === 0) return;
    setPage((cur) => cur - 1);
  };

  if (childrenLength === 0) {
    return <p className="text-center">Belum ada {msg}</p>;
  }

  return (
    <>
      <div className="flex-1 divide-y overflow-visible">
        {childrenArray.slice(page * 10, 10 * (page + 1))}
      </div>
      <PaginationButton
        totalData={childrenLength}
        page={page}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
      />
    </>
  );
}

export default Pagination;
