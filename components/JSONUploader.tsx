"use client";
import React, { useRef } from "react";

interface JSONUploaderProps {
  onLoadReviews?: (data: string[]) => void;
}

const JSONUploader: React.FC<JSONUploaderProps> = ({ onLoadReviews }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/json") {
      alert("Solo se permiten archivos JSON.");
      return;
    }

    try {
      const text = await file.text();
      const json = JSON.parse(text);

      // Validar que sea un arreglo de strings o de objetos con propiedad "text"
      let reviews: string[] = [];

      if (Array.isArray(json)) {
        if (typeof json[0] === "string") {
          reviews = json;
        } else if (typeof json[0] === "object" && json[0].text) {
          reviews = json.map((r) => r.text);
        } else {
          throw new Error("El JSON debe contener un array de strings o de objetos con 'text'");
        }
      }

      onLoadReviews?.(reviews);
    } catch (error) {
      alert("El archivo no es un JSON válido o su estructura no es correcta.");
    }
  };

  return (
    <div>
      <button
        onClick={() => inputRef.current?.click()}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Upload JSON
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default JSONUploader;
