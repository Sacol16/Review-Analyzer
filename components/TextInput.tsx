'use client';
import { useState } from "react";
import { Plus } from "lucide-react";

export default function TextInput({ onAddReview }: { onAddReview: (review: string) => void }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (trimmed) {
      onAddReview(trimmed);
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative flex items-center w-full max-w-xl rounded-2xl px-4 py-2 bg-white shadow-md">
      <input
        type="text"
        placeholder="Write a review here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow outline-none text-black placeholder-gray-400 bg-transparent"
      />
      <button
        onClick={handleSubmit}
        className="text-blue-500 hover:text-blue-600 transition-colors ml-2"
        aria-label="Agregar reseña"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}
