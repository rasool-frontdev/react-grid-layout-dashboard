import { CartesianGrid, Legend,Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { theme } from "../../constants";

const lineData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 900 },
  { name: "Jul", value: 1000 },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomizedAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fontSize={12}
        fill={theme.tickText}
      >
        {payload.value}
      </text>
    </g>
  );
};

const LineChartComponent = () => {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <LineChart
        data={lineData}
        margin={{ top: 10, right: 40, left: 10, bottom: 50 }}
      >
        <CartesianGrid stroke={theme.gridStroke} />
        <XAxis
          dataKey="name"
          padding={{ left: 30, right: 30 }}
          tick={<CustomizedAxisTick />}
        />
        <YAxis
          domain={["dataMin - 5", "dataMax + 10"]}
          tick={<CustomizedAxisTick />}
        />
        <Tooltip wrapperStyle={{ backgroundColor: "#000", fontSize: 12 }} />
        <Legend
          wrapperStyle={{ color: theme.legendColor, fontSize: 12 }}
          layout="vertical"
          verticalAlign="top"
          height={36}
        />
        <Line
          type="linear"
          dataKey="value"
          stroke={theme.lineStroke}
          dot={{ stroke: theme.dotStroke, strokeWidth: 1, fill: theme.dotFill }}
          activeDot
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
