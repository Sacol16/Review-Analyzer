"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const AttributesBarChart = ({ data }: { data: Record<string, number> }) => {
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: key,
    puntuación: value,
  }));

  return (
    <ResponsiveContainer width={400} height={250}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 5]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="puntuación" fill="#60a5fa" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AttributesBarChart;
