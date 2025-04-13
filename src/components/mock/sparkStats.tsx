import { FC } from "react";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";

interface SparkStatsProps {
  data: number[];
  title: string;
}

const SparkStats: FC<SparkStatsProps> = ({ data, title }) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-700 m-2">{title}</h3>
      <Sparklines
        data={data}
        limit={data.length}
      >
        <SparklinesLine color="#1c8cdc" />
        <SparklinesSpots />
      </Sparklines>
    </div>
  );
};

export default SparkStats;
