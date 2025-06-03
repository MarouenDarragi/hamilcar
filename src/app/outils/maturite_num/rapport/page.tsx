/* ------------------------------------------------------------------
   /app/outils/maturite_num/rapport.tsx
   Rapport – Outil de maturité numérique
------------------------------------------------------------------ */
'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter }          from 'next/navigation'
import dynamic                from 'next/dynamic'
import * as PI                from '@phosphor-icons/react'
import { ApexOptions }        from 'apexcharts'
import DownloadPdfButton      from '@/components/DownloadPdf/DownloadPdfButton'

/* ---- imports dynamiques ---- */
const ApexChart     = dynamic(()=>import('react-apexcharts'),{ssr:false})
const GaugeComponent= dynamic(()=>import('react-gauge-component'),{ssr:false})

/* ═════════ TYPES JSON ════════════════════════════════════════════ */
interface ReponseNiveau{
  niveau:      string
  contenu:     string
  transition:  string
}
interface Question   { intitule:string; reponses:ReponseNiveau[] }
interface Metrique   { nom:string; question:Question }
interface Dimension  { name:string; couleur:string; icon:string;
                       description:string; metriques:Metrique[] }
interface Level      { min:number; max:number; titre:string; description:string }
interface Tool       { title:string; dimensions:Dimension[]; indexGlobal:Level[] }

/* structure stockée par le questionnaire ------------------------- */
interface Stored{ answers:Record<string,number> }

/* ═════════ CONSTANTES ═══════════════════════════════════════════ */
const SUB_ARCS = [
  { limit:20 , color:'#22c55e', showTick:true },
  { limit:40 , color:'#84cc16', showTick:true },
  { limit:60 , color:'#eab308', showTick:true },
  { limit:80 , color:'#f97316', showTick:true },
  { limit:100, color:'#ef4444', showTick:true },
]

/* clé identique à celle du questionnaire ------------------------- */
const keyFor=(d:number,m:number)=>`${d}-${m}-0`

/* trouver le niveau (Level) pour un pourcentage ------------------ */
const findLevel=(p:number,levels:Level[])=>
  levels.find(l=>p>=l.min && p<=l.max) ?? levels.at(-1)!

/* ══════════ COMPOSANT ═══════════════════════════════════════════ */
export default function RapportMaturiteNum(){

  const router = useRouter()
  const [tool ,setTool ] = useState<Tool|null>(null)
  const [data ,setData ] = useState<Stored|null>(null)
  const [ready,setReady] = useState(false)

  /* ref racine → PDF -------------------------------------------- */
  const rootRef = useRef<HTMLDivElement>(null)

  /* ---- charge le JSON outil ----------------------------------- */
  useEffect(()=>{
    fetch('/dataApi/tools/maturite-num.json')
      .then(r=>r.ok?r.json():null)
      .then((d:Tool|null)=>setTool(d))
  },[])

  /* ---- récupère les réponses ---------------------------------- */
  useEffect(()=>{
    const raw=sessionStorage.getItem('maturiteNumAnswers')
    if(raw) setData(JSON.parse(raw) as Stored)
    setReady(true)
  },[])

  /* ---- si pas de données, retour questionnaire ---------------- */
  useEffect(()=>{
    if(ready && !data) router.replace('/outils/maturite_num')
  },[ready,data,router])

  if(!tool || !data)
    return(
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue rounded-full
                        border-t-transparent animate-spin"/>
      </div>
    )

  /* ════════ CALCULS ═════════════════════════════════════════════ */

  /* 1. score (0-100) par métrique = (index+1)*20 ---------------- */
  const metricScore=(choice:number)=> (choice+1)*20

  /* 2. dimension → moyenne des métriques ------------------------ */
  const dimScores = tool.dimensions.map((dim,di)=>{
    const scores = dim.metriques.map((_,mi)=>{
      const idx = data.answers[keyFor(di,mi)] ?? 0       // défaut → niveau1
      return metricScore(idx)
    })
    return Math.round( scores.reduce((s,v)=>s+v,0)/scores.length )
  })

  /* 3. pondération = nombre de métriques ------------------------ */
  const ponderations = tool.dimensions.map(d=>d.metriques.length)
  const totalPond    = ponderations.reduce((s,v)=>s+v,0)

  /* 4. indice global pondéré ------------------------------------ */
  const globalScore = Math.round(
    dimScores.reduce((s,v,i)=> s + v*ponderations[i] ,0)/ totalPond
  )

  /* 5. niveau global ------------------------------------------- */
  const globalLevel = findLevel(globalScore, tool.indexGlobal)

  /* 6. radar série (échelle 0-niveaux) -------------------------- */
  const levelsCount = tool.indexGlobal.length
  const radarSeries=[{
    name:'Score',
    data:dimScores.map(p=>parseFloat(((p/100)*levelsCount).toFixed(1)))
  }]
  const axisColors = tool.dimensions.map(d=>d.couleur)

  const radarOpts:ApexOptions={
    chart:{type:'radar',sparkline:{enabled:true}},
    stroke:{width:2,colors:['#2563eb']},
    fill:{opacity:0.25,colors:['#93c5fd']},
    xaxis:{
      categories:tool.dimensions.map(d=>d.name),
      labels:{style:{colors:axisColors,fontSize:'11px'}}
    },
    yaxis:{min:0,max:levelsCount,tickAmount:levelsCount},
    grid:{padding:{left:30,right:30}},
  }

  /* ════════ RENDER ═════════════════════════════════════════════ */
  return(
    <main className="content pt-12 pb-10">
      <div ref={rootRef}
           className="max-w-5xl mx-auto px-4 py-10 space-y-12 shadow-xl rounded-lg">

        {/* =========== INDICE GLOBAL ============================ */}
        <section className="pdf-section text-center space-y-6">
          <h2 className="text-2xl font-semibold">
            Votre indice global de maturité numérique
          </h2>

          <GaugeComponent id="g-global" type="semicircle"
            value={globalScore} minValue={0} maxValue={100}
            arc={{subArcs:SUB_ARCS,width:0.3,padding:0.006}}
            pointer={{type:'blob'}}
            labels={{ valueLabel:{
              formatTextValue:v=>`${v}%`,
              matchColorWithArc:true
            }}}
            style={{width:'440px',margin:'0 auto'}}
          />

          <p className="font-medium uppercase">{globalLevel.titre}</p>
          <p className="text-sm leading-relaxed text-gray-600">
            {globalLevel.description}
          </p>
        </section>

        {/* =========== RADAR PROFIL ============================ */}
        <section className="pdf-section space-y-4 shadow-xl rounded-lg p-6">
          <h3 className="text-center text-lg font-semibold">
            Répartition par&nbsp;dimension
          </h3>

          <ApexChart type="radar" height={400}
                     series={radarSeries} options={radarOpts}/>
        </section>

        {/* =========== CARTES DIMENSIONS ======================= */}
        <section className="pdf-section grid md:grid-cols-2 gap-6">
          {tool.dimensions.map((dim,di)=>{
            const score = dimScores[di]
            const level = findLevel(score, tool.indexGlobal)
            const Icon = (PI as any)[(dim as any).icone ?? (dim as any).icon] as any
            const SafeIcon = typeof Icon === 'function' ? Icon : PI.CheckCircle
            const choiceIndices = dim.metriques.map((_,mi)=>
              data.answers[keyFor(di,mi)] ?? 0)
const RawIcon = (PI as any)[(dim as any).icone ?? (dim as any).icon] as any;
const IconCmp = typeof RawIcon === 'function' ? RawIcon : PI.CheckCircle;
            return(
              <article key={di}
                       className="rounded-lg border shadow-xl overflow-hidden">
                {/* header couleur -------------------------------- */}
                <header className="flex items-center gap-2 px-4 py-2"
                        style={{backgroundColor:dim.couleur+'22'}}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center"
                       style={{backgroundColor:dim.couleur}}>
                    <IconCmp size={14} color="#fff"/>
                  </div>
                  <h4 className="font-semibold">{dim.name}</h4>
                </header>

                {/* body ----------------------------------------- */}
                <div className="p-6 space-y-4 text-sm">
                  {/* gauge */}
                  <GaugeComponent
                    id={`g-dim-${di}`} type="radial"
                    value={score} minValue={0} maxValue={100}
                    arc={{subArcs:SUB_ARCS,padding:0.008}}
                    pointer={{elastic:true}}
                    labels={{ valueLabel:{
                      formatTextValue:v=>`${v}%`,
                      matchColorWithArc:true
                    }}}
                    style={{width:'260px',margin:'0 auto'}}
                  />

                  <p className="font-semibold">
                    Niveau&nbsp;: <span className="uppercase">{level.titre}</span>
                  </p>
                  <p>
                    Résultat&nbsp;:&nbsp;
                    <span className="font-bold text-blue">{score}%</span>
                  </p>
                  <p className="leading-relaxed">{level.description}</p>

                  {/* ---- recommandations choisies --------------- */}
                  <details className="mt-4">
                    <summary className="cursor-pointer font-medium">
                      Recommandations&nbsp;({choiceIndices.length})
                    </summary>
                    <ul className="mt-2 space-y-2 list-disc ml-5">
                      {dim.metriques.map((met,mi)=>{
                        const idx   = choiceIndices[mi]
                        const resp  = met.question.reponses[idx]
                        return(
                          <li key={mi}>
                            <span className="font-semibold">{met.nom}</span>
                            {resp.transition
                              ? <> — {resp.transition}</>
                              : null}
                          </li>
                        )
                      })}
                    </ul>
                  </details>
                </div>
              </article>
            )
          })}
        </section>

        {/* =========== PDF ===================================== */}
        <div className="text-center pt-4">
          <DownloadPdfButton
            targetRef={rootRef}
            fileName="rapport-maturite-numerique.pdf"
            footerText="Cet outil a été développé par Hamilcar Services et solutions Inc. – https://www.hamilcar.ca"
          />
        </div>
      </div>
    </main>
  )
}
