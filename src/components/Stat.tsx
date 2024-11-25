import { StatProps } from "../utils/interfaces";

function Stat({ title, value, color }: StatProps) {
  const bgColor = {
    orange: "bg-orange-600",
    blue: "bg-blue-500",
    indigo: "bg-indigo-500",
  };

  return (
    <div className={"grid grid-cols-1 p-4 text-white " + `${bgColor[color]}`}>
      <h4 className="text-xl font-medium">{title}</h4>
      <div className="justify-self-center text-center text-8xl font-bold">
        {value}
      </div>
    </div>
  );
}

export default Stat;
