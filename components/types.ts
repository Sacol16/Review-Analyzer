// types.ts (o al inicio del componente donde lo uses)
export type AnalysisResult = {
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  attributes: Record<string, number>;
  topics: { name: string; value: number }[];
  suggestions: string[];
};
