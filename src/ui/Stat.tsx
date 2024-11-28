import { StatProps } from "../utils/interfaces";

function Stat({ title, value, icon }: StatProps) {
  return (
    <div className={"flex items-center gap-3 bg-white p-4 dark:bg-[#161e2a]"}>
      <div className="basis-1/5 overflow-hidden rounded-full">{icon}</div>

      <div>
        <h4 className="mb-1 text-sm text-gray-500 dark:text-[#999]">{title}</h4>
        <div className="text-2xl font-semibold dark:text-white">{value}</div>
      </div>
    </div>
  );
}

export default Stat;
