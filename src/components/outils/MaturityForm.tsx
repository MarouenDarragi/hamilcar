import { useState } from "react";

const evaluationModel = [
  { id: 1, name: "Stratégie numérique" },
  { id: 2, name: "Implication de la direction" },
  { id: 3, name: "Utilisation du cloud" },
  { id: 4, name: "Automatisation des processus" },
  { id: 5, name: "Politique de sécurité" },
  { id: 6, name: "Formation des employés" },
];

export default function MaturityForm({
  onSubmit,
}: {
  onSubmit: (responses: Record<number, number>) => void;
}) {
  const [responses, setResponses] = useState<Record<number, number>>({});

  const handleChange = (id: number, value: number) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Évaluation de maturité</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(responses);
        }}
      >
        {evaluationModel.map((question) => (
          <div key={question.id} className="mb-2">
            <label className="block font-medium">{question.name}</label>
            <select
              className="border p-2 rounded w-full"
              onChange={(e) =>
                handleChange(question.id, Number(e.target.value))
              }
            >
              <option value="0">Sélectionnez une réponse</option>
              <option value="1">Très faible</option>
              <option value="2">Faible</option>
              <option value="3">Moyen</option>
              <option value="4">Élevé</option>
              <option value="5">Très élevé</option>
            </select>
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Soumettre
        </button>
      </form>
    </div>
  );
}
