import { FC } from "react";
import { Bar, BarChart, Brush, CartesianGrid, Legend, ReferenceLine, ResponsiveContainer,Tooltip, XAxis, YAxis } from "recharts";

import { theme } from "@/constants";

import { CustomizedAxisTick } from "./lineChart";

interface BarStatsProps {
  data: {
    name: string;
    uv?: number;
    pv?: number;
    [key: string]: string | number | undefined;
  }[];
  title: string;
}

const BarStats: FC<BarStatsProps> = ({ data, title }) => {
  return (
    <div className="w-full h-full">
      <h3 className="text-lg font-medium text-gray-700 m-2">{title}</h3>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 10, right: 40, left: 10, bottom: 50 }}
        >
          <CartesianGrid stroke={theme.gridStroke} />
          <XAxis
            dataKey="name"
            padding={{ left: 30, right: 30 }}
            tick={<CustomizedAxisTick />}
          />
          <YAxis tick={<CustomizedAxisTick />} />
          <Tooltip
            wrapperStyle={{
              backgroundColor: "#000",
              fontSize: 12,
            }}
          />
          <Legend
            wrapperStyle={{
              color: theme.legendColor,
              fontSize: 12,
            }}
            layout="horizontal"
            verticalAlign="top"
            height={36}
          />
          <ReferenceLine
            y={0}
            stroke="#000"
          />
          <Brush
            dataKey="name"
            height={15}
            stroke="gray"
            fill="#000"
          />
          <Bar
            dataKey="pv"
            fill="#8884d8"
          />
          <Bar
            dataKey="uv"
            fill="#82ca9d"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarStats;
