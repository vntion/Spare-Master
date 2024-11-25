import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface Props {
  totalData: number;
  page: number;
  onNext: () => void;
  onPrev: () => void;
}

function PaginationButton({ totalData, page, onNext, onPrev }: Props) {
  return (
    <div className="flex justify-between bg-primaryBg px-4 py-3 text-sm">
      <div>
        Menampilkan <span className="font-bold">{page * 10 + 1}</span> hingga{" "}
        <span className="font-bold">
          {(page + 1) * 10 < totalData ? (page + 1) * 10 : totalData}
        </span>{" "}
        dari <span className="font-bold">{totalData}</span> hasil
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center" onClick={onPrev}>
          <ArrowLeftIcon className="size-4" />
          <span>Previous</span>
        </button>

        <button className="flex items-center" onClick={onNext}>
          <span>Next</span>
          <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}

export default PaginationButton;
