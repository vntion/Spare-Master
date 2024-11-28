import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useData } from "../../contexts/DataContext";
import { calcTotalPembelian } from "../../utils/helpers";
import { DataPoint } from "../../utils/interfaces";
import CustomTooltip from "./CustomTooltip";

const formatYAxis = (value: number): string => {
  if (value >= 1000) {
    return `${(value / 1000).toString()}k`;
  }
  return value.toString();
};

function PembelianChart() {
  const { pembelian } = useData();

  const data: DataPoint[] = [
    {
      bulan: "Jan-Feb",
      totalPembelian: calcTotalPembelian(pembelian, "Jan", "Feb"),
    },
    {
      bulan: "Mar-Apr",
      totalPembelian: calcTotalPembelian(pembelian, "Mar", "Apr"),
    },
    {
      bulan: "Mei-Juni",
      totalPembelian: calcTotalPembelian(pembelian, "Mei", "Juni"),
    },
    {
      bulan: "Juli-Agst",
      totalPembelian: calcTotalPembelian(pembelian, "Juli", "Agst"),
    },
    {
      bulan: "Sep-Okt",
      totalPembelian: calcTotalPembelian(pembelian, "Sep", "Okt"),
    },
    {
      bulan: "Nov-Des",
      totalPembelian: calcTotalPembelian(pembelian, "Nov", "Des"),
    },
  ];

  return (
    <div className="mt-8 rounded-md bg-white p-5 dark:bg-[#161e2a]">
      <h4 className="mb-5 text-xl font-bold dark:text-white">Pembelian</h4>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="bulan" />
          <YAxis tickFormatter={formatYAxis} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={CustomTooltip} />
          <Area
            type="monotone"
            dataKey="totalPembelian"
            stroke="#1782cf"
            fill="#1782cf"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PembelianChart;
