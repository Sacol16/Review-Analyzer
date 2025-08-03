import React from "react";

interface SuggestionsProps {
  suggestions: string[];
}

const Suggestions: React.FC<SuggestionsProps> = ({ suggestions }) => {
  if (!suggestions.length) return null;

  return (
    <div className="flex flex-wrap justify-center gap-4 px-4">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="w-60 p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition"
        >
          <p className="text-gray-800 text-sm">{suggestion}</p>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
