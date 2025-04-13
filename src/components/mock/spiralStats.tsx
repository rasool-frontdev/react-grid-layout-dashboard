import { FC } from "react";
import { Legend, RadialBar, RadialBarChart, ResponsiveContainer,Tooltip } from "recharts";

import { theme } from "@/constants";

interface SpiralStatsProps {
  data: {
    name: string;
    value: number;
    fill: string;
  }[];
  title: string;
}

const style = {
  background: "#2c2c2c",
};

const SpiralStats: FC<SpiralStatsProps> = ({ data, title }) => {
  return (
    <>
      <h3 className="text-lg font-medium text-gray-700 m-2">{title}</h3>
      <ResponsiveContainer>
        <RadialBarChart data={data}>
          <Tooltip />
          <Legend
            wrapperStyle={{
              color: theme.legendColor,
              fontSize: 12,
            }}
            layout="horizontal"
            verticalAlign="top"
            height={50}
          />
          <RadialBar
            background={{ fill: style.background }}
            dataKey="value"
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </>
  );
};

export default SpiralStats;
