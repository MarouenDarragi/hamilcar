"use client";
import { useState } from "react";
import MaturityForm from "@/components/outils/MaturityForm";

const calculateMaturityScore = (responses: Record<number, number>) => {
  const evaluationModel = [
    { id: 1, weight: 2 },
    { id: 2, weight: 3 },
    { id: 3, weight: 2 },
    { id: 4, weight: 3 },
    { id: 5, weight: 3 },
    { id: 6, weight: 2 },
  ];

  let totalScore = 0;
  let maxScore = 0;

  evaluationModel.forEach((criterion) => {
    const responseValue = responses[criterion.id] || 0;
    totalScore += responseValue * criterion.weight;
    maxScore += 5 * criterion.weight;
  });

  return (totalScore / maxScore) * 100;
};

export default function MaturityPage() {
  const [report, setReport] = useState<{
    score: number;
    interpretation: string;
  } | null>(null);

  const handleSubmit = (responses: Record<number, number>) => {
    const score = calculateMaturityScore(responses);
    const interpretation =
      score >= 80
        ? "Maturité avancée"
        : score >= 50
        ? "Maturité intermédiaire"
        : "Maturité faible";
    setReport({ score, interpretation });
  };

  return (
    <div className="p-8">
      <MaturityForm onSubmit={handleSubmit} />
      {report && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <h3 className="text-lg font-bold">Résultat</h3>
          <p>Score de maturité : {report.score.toFixed(2)}%</p>
          <p>Interprétation : {report.interpretation}</p>
        </div>
      )}
    </div>
  );
}
