"use client";

import TextInput from "@/components/TextInput";
import JSONUploader from "@/components/JSONUploader";
import ReviewCards from "@/components/ReviewCards";
import SentimentPieChart from "@/components/SentimentPieChart";
import AttributesBarChart from "@/components/AttributesBarChart";
import TopicsTreeMap from "@/components/TopicsTreeMap";
import Suggestions from "@/components/Suggestions";
import type { AnalysisResult } from "@/components/types";

import { useState } from "react";

export default function Home() {
  const [reviews, setReviews] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleDelete = (index: number) => {
    setReviews((prev) => prev.filter((_, i) => i !== index));
  };
  const addReview = (review: string) => {
    setReviews((prev) => [...prev, review]);
  };

  const analyzeReviews = async (reviews: string[]) => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviews }),
    });

    const data = await res.json();
    return data;
  };

  const handleAnalyze = async () => {
    try {
      const result = await analyzeReviews(reviews);
      console.log("Resultado del análisis:", result);
      // Aquí podrías guardar los resultados en un estado
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error al analizar reseñas:", error);
    }
  };

  return (
    <main className="overflow-x-hidden text-neutral-800 antialiased min-h-screen flex flex-col items-center pt-12">
      {/* Fondo degradado pastel */}
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="h-screen w-screen bg-gradient-to-br from-blue-100 via-white to-cyan-100"></div>
      </div>

      {/* Título */}
      <h1 className="text-4xl font-bold mb-6">Review Analyzer</h1>

      {/* Sección de entrada de texto y subida de JSON */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
        <TextInput onAddReview={addReview} />
        <JSONUploader onLoadReviews={setReviews} />
      </div>

      {/* Reseñas */}
      <section className="w-full max-w-6xl text-center mb-16">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <ReviewCards reviews={reviews} onDelete={handleDelete} />
        <button
          onClick={handleAnalyze}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Analyze Reviews
        </button>

      </section>

      {/* Gráficas */}
      <section className="w-full max-w-6xl text-center mb-16">
        <h2 className="text-2xl font-semibold mb-6">Graphs</h2>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {analysisResult && (
            <>
              <div className="grid grid-cols-2 gap-6">
                <div className="aspect-square bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
                  <h2 className="text-2xl font-semibold mb-4">Sentiments Pie Chart</h2>
                  <SentimentPieChart data={analysisResult.sentiment} />
                </div>
                <div className="aspect-square bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
                  <h2 className="text-2xl font-semibold mb-4">Attributes Bar Chart</h2>
                  <AttributesBarChart data={analysisResult.attributes} />
                </div>
                <div className="col-span-2 aspect-video bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
                  <h2 className="text-2xl font-semibold mb-4">Topics Tree Map</h2>
                  <TopicsTreeMap data={analysisResult.topics} />
                </div>
              </div>
              
            </>
          )}
        </div>
      </section>

      {/* Insights */}
      <section className="w-full max-w-6xl text-center mb-24">
        <h2 className="text-2xl font-semibold mb-6">Suggestions</h2>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          <Suggestions suggestions={analysisResult?.suggestions || []} />
        </div>
      </section>
    </main>
  );
}
