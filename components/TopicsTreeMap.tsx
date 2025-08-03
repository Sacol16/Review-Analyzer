"use client";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";

const TopicsTreeMap = ({ data }: { data: { name: string; value: number }[] }) => {
  return (
    <ResponsiveContainer width={600} height={400}>
      <Treemap
        data={data}
        dataKey="value"
        nameKey="name"
        stroke="#fff"
        fill="#21d963"
        aspectRatio={1}
      >
        <Tooltip />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default TopicsTreeMap;
