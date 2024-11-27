import { format, isEqual } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Data dummy untuk chart, sesuaikan dengan data dari backend
const data = [
  { createdAt: "Jan-Feb", totalHarga: 500000 },
  { createdAt: "Mar-Apr", totalHarga: 0 },
  { createdAt: "Mei-Juni", totalHarga: 0 },
  { createdAt: "Juli-Agst", totalHarga: 0 },
  { createdAt: "Sep-Okt", totalHarga: 0 },
  { createdAt: "Nov-Des", totalHarga: 0 },
];

const PembelianChart = () => {
  const compareDate = function () {
    console.log(format("2024-11-25 00:10:07", "MMM"));
  };

  compareDate();

  return (
    <div className="mt-8 rounded-md bg-white p-5 dark:bg-[#161e2a]">
      <h4 className="mb-5 text-xl font-bold dark:text-white">Pembelian</h4>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="createdAt"
            label={{
              value: "Tanggal Pembelian",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            label={{ value: "Harga (Rp)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="totalHarga"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PembelianChart;
