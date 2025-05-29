
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import dynamic from "next/dynamic";
// import * as PI from "@phosphor-icons/react";
// import { ApexOptions } from "apexcharts";
// /* ------------------------------------------------------------------ */
// /*  Imports dynamiques (client only)                                  */
// /* ------------------------------------------------------------------ */
// const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
// const GaugeComponent = dynamic(() => import("react-gauge-component"), {
//   ssr: false,
// });

// /* ------------------------------------------------------------------ */
// /*  Types JSON                                                        */
// /* ------------------------------------------------------------------ */
// interface Capacity {
//   capacite: string;
//   description: string[];
// }
// interface Descriptive {
//   name: string;
//   capacities: Capacity[];
// }
// interface Level {
//   min: number;
//   max: number;
//   niveau: string;
//   resume_niveau: string;
//   motif: string;
//   description: string;
// }
// interface Dimension {
//   name: string;
//   couleur: string;
//   icon: string;
//   descriptives: Descriptive[];
//   levels: Level[];
// }
// interface Tool {
//   title: string;
//   dimensions: Dimension[];
//   Index_G: Level[];
// }

// interface Stored {
//   answers: Record<string, number>;
//   dimScores: number[]; // 0-100 %
//   globalScore: number; // 0-100 %
// }

// /* ------------------------------------------------------------------ */
// /*  Aide : récupérer le niveau correspondant à un %                   */
// /* ------------------------------------------------------------------ */
// const findLevel = (pct: number, levels: Level[]) =>
//   levels.find((l) => pct >= l.min && pct <= l.max) ?? levels.at(-1)!;

// /* ------------------------------------------------------------------ */
// /*  Palette pour les jauges (vert ➜ rouge)                            */
// /* ------------------------------------------------------------------ */
// const SUB_ARCS = [
//   { limit: 20, color: "#22c55e", showTick: true },
//   { limit: 40, color: "#84cc16", showTick: true },
//   { limit: 60, color: "#eab308", showTick: true },
//   { limit: 80, color: "#f97316", showTick: true },
//   { limit: 100, color: "#ef4444", showTick: true },
// ];

// /*  Graduations fixes 0-20-40-60-80-100 ----------------------------- */
// const TICK_LABELS = {
//   type: "outer" as const,
//   ticks: [0, 20, 40, 60, 80, 100],
// };

// /* ================================================================== */
// /*  Composant                                                         */
// /* ================================================================== */
// export default function Rapport() {
//   const router = useRouter();
//   const [tool, setTool] = useState<Tool | null>(null);
//   const [data, setData] = useState<Stored | null>(null);
//   const [ready, setReady] = useState(false);

//   /* --------- charge le JSON outil -------------------------------- */
//   useEffect(() => {
//     fetch("/dataApi/tools/maturite-ia.json")
//       .then((r) => (r.ok ? r.json() : null))
//       .then((d: Tool | null) => setTool(d));
//   }, []);

//   /* --------- récupère les réponses ------------------------------- */
//   useEffect(() => {
//     const raw = sessionStorage.getItem("maturiteAnswers");
//     if (raw) setData(JSON.parse(raw) as Stored);
//     setReady(true);
//   }, []);

//   /* --------- pas de data ? → retour au questionnaire -------------- */
//   useEffect(() => {
//     if (ready && !data) router.replace("/outils/maturite_ia");
//   }, [ready, data, router]);

//   /* --------- petit spinner en attendant tout le chargement -------- */
//   if (!tool || !data)
//     return (
//       <div className="flex items-center justify-center h-[60vh]">
//         <div
//           className="w-12 h-12 border-4 border-blue rounded-full
//                       border-t-transparent animate-spin"
//         />
//       </div>
//     );

//   /* ------------------ calculs ------------------------------------ */
//   const { dimScores, globalScore } = data;
//   const levelsCount = tool.Index_G.length;
//   const globalLevel = findLevel(globalScore, tool.Index_G);

//   /* % → niveau (0-N) pour le radar -------------------------------- */
//   const radarSeries = [
//     {
//       name: "Score",
//       data: dimScores.map((p) =>
//         parseFloat(((p / 100) * levelsCount).toFixed(1))
//       ),
//     },
//   ];

//   /* couleurs des libellés = couleurs des dimensions */
//   const axisColors = tool.dimensions.map((d) => d.couleur);

//   /* -------------------- options ApexCharts --------------------- */
//   const radarOptions: ApexOptions = {
//     chart: {
//       type: "radar",
//       toolbar: { show: true },
//       sparkline: { enabled: true },
//     },

//     /* libellés d’axes colorés ---------------------------------- */
//     xaxis: {
//       categories: tool.dimensions.map((d) => d.name),
//       labels: {
//         show: true,
//         style: {
//           colors: axisColors,
//           fontSize: "11px",
//           fontFamily: "Arial",
//         },
//       },
//     },

//     /* graduations 0…levelsCount avec numérotation -------------- */
//     yaxis: {
//       min: 0,
//       max: levelsCount,
//       tickAmount: levelsCount,
//       labels: {
//         show: true,
//         formatter: (v) => String(v), // 0-1-2-3-4-5
//       },
//     },

//     stroke: { width: 2, colors: ["#2563eb"] },
//     fill: { opacity: 0.25, colors: ["#93c5fd"] },

//     grid: { padding: { left: 30, right: 30 } },
//   };
//   /* ================================================================= */
//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10 pt-10 space-y-12 shadow-xl rounded-lg">
//       {/* ================= Indice global ========================== */}
//       <section className="text-center space-y-6">
//         <h2 className="text-2xl font-semibold">
//           Votre niveau de maturité globale en matière d&rsquo;IA
//         </h2>

//         {/* ---- Gauge “Elastic blob” ---- */}
//         <GaugeComponent
//           id="g-global"
//           type="semicircle"
//           value={globalScore}
//           minValue={0}
//           maxValue={100}
//           pointer={{ type: "blob" }}
//           arc={{ subArcs: SUB_ARCS, width: 0.3, padding: 0.006 }}
//           labels={{
//             valueLabel: {
//               formatTextValue: (v) => `${v}%`,
//               matchColorWithArc: true, // ← couleur synchronisée avec la jauge
//             },
//           }}
//           style={{ width: "440px", margin: "0 auto" }}
//         />

//         <p className="font-medium">{globalLevel.resume_niveau}</p>
//         <p className="text-sm leading-relaxed text-gray-600">
//           {globalLevel.description}
//         </p>
//       </section>

//       {/* ================= Radar profil =========================== */}
//       <section className="space-y-4 shadow-xl rounded-lg p-6">
//         <h3 className="text-center text-lg font-semibold">
//           Votre profil personnalisé selon les&nbsp;
//           {tool.dimensions.length}&nbsp;dimensions
//         </h3>

//         <ApexChart
//           type="radar"
//           height={400}
//           series={radarSeries}
//           options={radarOptions}
//         />
//       </section>

//       {/* ================= Cartes par dimension ================== */}
//       <section className="grid md:grid-cols-2 gap-6 shadow-sm rounded-lg p-6">
//         {tool.dimensions.map((d, idx) => {
//           const score = dimScores[idx];
//           const level = findLevel(score, d.levels);
//           const Icon = (PI as any)[d.icon] as any;

//           return (
//             <div
//               key={idx}
//               className="rounded-lg border shadow-xl overflow-hidden "
//             >
//               <header
//                 className="flex items-center gap-2 px-4 py-2 "
//                 style={{ backgroundColor: d.couleur + "22" }}
//               >
//                 <div
//                   className="w-6 h-6 rounded-full flex items-center justify-center"
//                   style={{ backgroundColor: d.couleur }}
//                 >
//                   <Icon size={14} color="#fff" />
//                 </div>
//                 <h4 className="font-semibold">{d.name}</h4>
//               </header>

//               <div className="p-6 space-y-4 text-sm ">
//                 {/* ---- Gauge “Radial elastic” ---- */}
//                 <GaugeComponent
//                   id={`g-dim-${idx}`}
//                   type="radial"
//                   value={score}
//                   minValue={0}
//                   maxValue={100}
//                   pointer={{ elastic: true }}
//                   arc={{ subArcs: SUB_ARCS, padding: 0.008 }}
//                   labels={{
//                     valueLabel: {
//                       formatTextValue: (v) => `${v}%`,
//                       matchColorWithArc: true, // ← couleur synchronisée avec la jauge
//                     },
//                   }}
//                   style={{ width: "300px", margin: "0 auto"  }}
//                 />

//                 <p className="font-semibold">
//                   Niveau&nbsp;:{" "}
//                   <span className="uppercase">{level.niveau}</span>
//                 </p>
//                 <p>
//                   Résultat&nbsp;:&nbsp;
//                   <span className="font-bold text-blue">{score}%</span>
//                 </p>
//                 <p className="italic">{level.motif}</p>
//                 <p className="leading-relaxed">{level.description}</p>
//               </div>
//             </div>
//           );
//         })}
//       </section>

//       {/* ================= Action PDF ============================ */}
//       <div className="text-center pt-6">
//         <button
//           onClick={() => alert("TODO : génération PDF")}
//           className="px-6 py-2 rounded border-2 border-blue text-blue
//                      hover:bg-blue hover:text-white transition-colors"
//         >
//           télécharger en&nbsp;PDF
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import * as PI from "@phosphor-icons/react";
import { ApexOptions } from "apexcharts";
import { useRef } from 'react';
import DownloadPdfButton from "@/components/DownloadPdf/DownloadPdfButton";
/* ------------------------------------------------------------------ */
/*  Imports dynamiques (client only)                                  */
/* ------------------------------------------------------------------ */
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

/* ------------------------------------------------------------------ */
/*  Types JSON                                                        */
/* ------------------------------------------------------------------ */
interface Capacity {
  capacite: string;
  description: string[];
}
interface Descriptive {
  name: string;
  capacities: Capacity[];
}
interface Level {
  min: number;
  max: number;
  niveau: string;
  resume_niveau: string;
  motif: string;
  description: string;
}
interface Dimension {
  name: string;
  couleur: string;
  icon: string;
  descriptives: Descriptive[];
  levels: Level[];
}
interface Tool {
  title: string;
  dimensions: Dimension[];
  Index_G: Level[];
}

interface Stored {
  answers: Record<string, number>;
  dimScores: number[]; // 0-100 %
  globalScore: number; // 0-100 %
}


/* ------------------------------------------------------------------ */
/*  Aide : récupérer le niveau correspondant à un %                   */
/* ------------------------------------------------------------------ */
const findLevel = (pct: number, levels: Level[]) =>
  levels.find((l) => pct >= l.min && pct <= l.max) ?? levels.at(-1)!;

/* ------------------------------------------------------------------ */
/*  Palette pour les jauges (vert ➜ rouge)                            */
/* ------------------------------------------------------------------ */
const SUB_ARCS = [
  { limit: 20, color: "#22c55e", showTick: true },
  { limit: 40, color: "#84cc16", showTick: true },
  { limit: 60, color: "#eab308", showTick: true },
  { limit: 80, color: "#f97316", showTick: true },
  { limit: 100, color: "#ef4444", showTick: true },
];

/*  Graduations fixes 0-20-40-60-80-100 ----------------------------- */
const TICK_LABELS = {
  type: "outer" as const,
  ticks: [0, 20, 40, 60, 80, 100],
};

/* ================================================================== */
/*  Composant                                                         */
/* ================================================================== */
export default function Rapport() {
  const router = useRouter();
  const [tool, setTool] = useState<Tool | null>(null);
  const [data, setData] = useState<Stored | null>(null);
  const [ready, setReady] = useState(false);
const rootRef = useRef<HTMLDivElement>(null);
  /* --------- charge le JSON outil -------------------------------- */
  useEffect(() => {
    fetch("/dataApi/tools/maturite-ia.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: Tool | null) => setTool(d));
  }, []);

  /* --------- récupère les réponses ------------------------------- */
  useEffect(() => {
    const raw = sessionStorage.getItem("maturiteAnswers");
    if (raw) setData(JSON.parse(raw) as Stored);
    setReady(true);
  }, []);

  /* --------- pas de data ? → retour au questionnaire -------------- */
  useEffect(() => {
    if (ready && !data) router.replace("/outils/maturite_ia");
  }, [ready, data, router]);

  /* --------- petit spinner en attendant tout le chargement -------- */
  if (!tool || !data)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div
          className="w-12 h-12 border-4 border-blue rounded-full
                      border-t-transparent animate-spin"
        />
      </div>
    );

  /* ------------------ calculs ------------------------------------ */
  const { dimScores, globalScore } = data;
  const levelsCount = tool.Index_G.length;
  const globalLevel = findLevel(globalScore, tool.Index_G);

  /* % → niveau (0-N) pour le radar -------------------------------- */
  const radarSeries = [
    {
      name: "Score",
      data: dimScores.map((p) =>
        parseFloat(((p / 100) * levelsCount).toFixed(1))
      ),
    },
  ];

  /* couleurs des libellés = couleurs des dimensions */
  const axisColors = tool.dimensions.map((d) => d.couleur);

  /* -------------------- options ApexCharts --------------------- */
  const radarOptions: ApexOptions = {
    chart: {
      type: "radar",
      toolbar: { show: true },
      sparkline: { enabled: true },
    },

    /* libellés d’axes colorés ---------------------------------- */
    xaxis: {
      categories: tool.dimensions.map((d) => d.name),
      labels: {
        show: true,
        style: {
          colors: axisColors,
          fontSize: "11px",
          fontFamily: "Arial",
        },
      },
    },

    /* graduations 0…levelsCount avec numérotation -------------- */
    yaxis: {
      min: 0,
      max: levelsCount,
      tickAmount: levelsCount,
      labels: {
        show: true,
        formatter: (v) => String(v), // 0-1-2-3-4-5
      },
    },

    stroke: { width: 2, colors: ["#2563eb"] },
    fill: { opacity: 0.25, colors: ["#93c5fd"] },

    grid: { padding: { left: 30, right: 30 } },
  };
  /* ================================================================= */
  return (
    <main className="content pt-12 pb-10" >
    <div ref={rootRef} className="max-w-5xl mx-auto px-4 py-10 pt-10 space-y-12 shadow-xl rounded-lg">
      {/* ================= Indice global ========================== */}
      <section  className="pdf-section text-center space-y-6">
        <h2 className="text-2xl font-semibold">
          Votre niveau de maturité globale en matière d&rsquo;IA
        </h2>

        {/* ---- Gauge “Elastic blob” ---- */}
        <GaugeComponent
          id="g-global"
          type="semicircle"
          value={globalScore}
          minValue={0}
          maxValue={100}
          pointer={{ type: "blob" }}
          arc={{ subArcs: SUB_ARCS, width: 0.3, padding: 0.006 }}
          labels={{
            valueLabel: {
              formatTextValue: (v) => `${v}%`,
              matchColorWithArc: true, // ← couleur synchronisée avec la jauge
            },
          }}
          style={{ width: "440px", margin: "0 auto" }}
        />

        <p className="font-medium">{globalLevel.resume_niveau}</p>
        <p className="text-sm leading-relaxed text-gray-600">
          {globalLevel.description}
        </p>
      </section>

      {/* ================= Radar profil =========================== */}
      <section  className="pdf-section space-y-4 shadow-xl rounded-lg p-6">
        <h3 className="text-center text-lg font-semibold">
          Votre profil personnalisé selon les&nbsp;
          {tool.dimensions.length}&nbsp;dimensions
        </h3>

        <ApexChart
          type="radar"
          height={400}
          series={radarSeries}
          options={radarOptions}
        />
      </section>

      {/* ================= Cartes par dimension ================== */}
      <section  className="pdf-section grid md:grid-cols-2 gap-6 shadow-sm rounded-lg p-6">
        {tool.dimensions.map((d, idx) => {
          const score = dimScores[idx];
          const level = findLevel(score, d.levels);
          const Icon = (PI as any)[d.icon] as any;

          return (
            <div
              key={idx}
              className="rounded-lg border shadow-xl overflow-hidden "
            >
              <header
                className="flex items-center gap-2 px-4 py-2 "
                style={{ backgroundColor: d.couleur + "22" }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: d.couleur }}
                >
                  <Icon size={14} color="#fff" />
                </div>
                <h4 className="font-semibold">{d.name}</h4>
              </header>

              <div className="p-6 space-y-4 text-sm ">
                {/* ---- Gauge “Radial elastic” ---- */}
                <GaugeComponent
                  id={`g-dim-${idx}`}
                  type="radial"
                  value={score}
                  minValue={0}
                  maxValue={100}
                  pointer={{ elastic: true }}
                  arc={{ subArcs: SUB_ARCS, padding: 0.008 }}
                  labels={{
                    valueLabel: {
                      formatTextValue: (v) => `${v}%`,
                      matchColorWithArc: true, // ← couleur synchronisée avec la jauge
                    },
                  }}
                  style={{ width: "300px", margin: "0 auto"  }}
                />

                <p className="font-semibold">
                  Niveau&nbsp;:{" "}
                  <span className="uppercase">{level.niveau}</span>
                </p>
                <p>
                  Résultat&nbsp;:&nbsp;
                  <span className="font-bold text-blue">{score}%</span>
                </p>
                <p className="uppercase font-semibold">{level.motif}</p>
                <p className="leading-relaxed">{level.description}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* ================= Action PDF ============================ */}
 <div className="text-center pt-6">
          <DownloadPdfButton targetRef={rootRef}   fileName="rapport-maturite-ia.pdf"
        footerText="Cet outil a été développé par hamilcar service  – https://www.hamilcar.ca" />
     </div>
    </div></main>
  );
}
