"use client";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#4ade80", "#facc15", "#f87171"]; // verde, amarillo, rojo

const SentimentPieChart = ({ data }: { data: { positive: number; neutral: number; negative: number } }) => {
  const chartData = [
    { name: "Positivo", value: data.positive },
    { name: "Neutral", value: data.neutral },
    { name: "Negativo", value: data.negative },
  ];

  return (
    <ResponsiveContainer width={300} height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SentimentPieChart;
