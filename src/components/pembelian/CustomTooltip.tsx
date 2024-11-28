import { TooltipProps } from "recharts";
import { formatRupiah } from "../../utils/helpers";

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded border bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-[#161e2a]">
      <p className="font-bold text-gray-700 dark:text-gray-200">{`Bulan: ${label}`}</p>
      <p className="text-[#1782cf]">
        {`Total Pembelian: ${formatRupiah(payload[0].value ?? 0)}`}
      </p>
    </div>
  );
}

export default CustomTooltip;
