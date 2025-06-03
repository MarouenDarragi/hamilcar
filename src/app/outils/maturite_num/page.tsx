/* ------------------------------------------------------------------
   /app/outils/maturite_num/page.tsx
   Questionnaire – Outil de maturité numérique (1 question / écran)
------------------------------------------------------------------ */
'use client'

import React, { useEffect, useState } from 'react'
import { useRouter }  from 'next/navigation'
import * as PI        from '@phosphor-icons/react'
import {
  ArrowLeft, ArrowRight, Check, CheckCircle, Info,
} from '@phosphor-icons/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/* ═════════════ Types JSON ═══════════════════════════════════════ */
interface ReponseNiveau {
  niveau     : string
  contenu    : string
  transition : string
  cote       : number            // 20, 40, 60, 80, 100
}
interface Question   { intitule:string; reponses:ReponseNiveau[] }
interface Metrique   { nom:string; question:Question }
interface Dimension  {
  nom:string; couleur:string; icone:string; description:string;
  pondération:number;
  metriques:Metrique[];
}
interface NiveauIdx  { min:number; max:number; titre:string; description:string }
interface Tool       { titre:string; dimensions:Dimension[]; indexGlobal:NiveauIdx[] }

/* ═════════════ Helpers visuels ═════════════════════════════════ */
const GRAY      = '#E5E7EB'
const GRAY_TXT  = '#4B5563'
const GREEN     = '#22C55E'
const BLUE      = '#2868D8'

/* clé réponse --------------------------------------------------- */
const rKey = (d:number,m:number)=>`${d}-${m}`

/* ═════════════ Composant principal ═════════════════════════════ */
export default function QuestionnaireMaturiteNum(){

  const [tool,setTool] = useState<Tool|null>(null)
  const [dimIdx,setDim] = useState(0)
  const [metIdx,setMet] = useState(0)
  const [answers,setAns] = useState<Record<string,number>>({})
  const [tried ,setTried] = useState(false)
  const router = useRouter()

  /* charge le JSON ------------------------------------------------ */
  useEffect(()=>{
    fetch('/dataApi/tools/maturite-num.json')
      .then(r=>r.ok?r.json():null)
      .then((d:Tool|null)=>d&&setTool(d))
  },[])

  if(!tool)
    return(
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue rounded-full
                        border-t-transparent animate-spin"/>
      </div>
    )

  /* pointeurs ---------------------------------------------------- */
  const dim  = tool.dimensions[dimIdx]
  const met  = dim.metriques[metIdx]
  const key  = rKey(dimIdx,metIdx)
  const done = answers[key]!=null
  const lastMet  = metIdx===dim.metriques.length-1
  const lastDim  = dimIdx===tool.dimensions.length-1

  const saveAns = (v:number)=> setAns(a=>({...a,[key]:v}))

  /* navigation --------------------------------------------------- */
  const next = ()=>{
    setTried(true)
    if(!done){ toast.error('Veuillez choisir une réponse.'); return }

    if(!lastMet){ setMet(m=>m+1); setTried(false); return }
    if(!lastDim){ setDim(d=>d+1); setMet(0); setTried(false); return }

    /* calculs finaux ------------------------------------- */
    const meanDim = tool.dimensions.map((d,di)=>{
      const vals = d.metriques.map((__,mi)=>{
        const v = answers[rKey(di,mi)] ?? 0
        return d.metriques[mi].question.reponses[v].cote
      })
      return Math.round(vals.reduce((s,v)=>s+v,0)/vals.length)
    })
    const num = meanDim.reduce((s,v,i)=>s+v*tool.dimensions[i].pondération,0)
    const den = tool.dimensions.reduce((s,d)=>s+d.pondération,0)
    const global = Math.round(num/den)

    sessionStorage.setItem('maturiteNumAnswers',
      JSON.stringify({answers,dimScores:meanDim,globalScore:global}))
    router.push('/outils/maturite_num/rapport')
  }
  const prev = ()=>{
    if(metIdx>0){ setMet(m=>m-1); setTried(false); return }
    if(dimIdx>0){
      setDim(d=>d-1)
      setMet(tool.dimensions[dimIdx-1].metriques.length-1)
      setTried(false)
    }
  }
  const dimDone = (d:number)=>
    tool.dimensions[d].metriques.every((__,m)=>answers[rKey(d,m)]!=null)

  /* ======================================================= */
  /* RENDER                                                 */
  /* ======================================================= */
  return(
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="colored"/>

      <div className="pt-32 max-w-screen-xl mx-auto p-6 space-y-12">

        {/* barre étapes (dimensions) ------------------------ */}
        <div className="flex items-center overflow-x-auto space-x-4 pb-4">
          {tool.dimensions.map((d,i)=>{
            const Icon = (PI as any)[d.icone] as any
            const active = i===dimIdx
            const finished=dimDone(i)
            const okOpen = i<=dimIdx || tool.dimensions.slice(0,i).every((__,k)=>dimDone(k))
            return(
              <React.Fragment key={i}>
                <button disabled={!okOpen}
                        onClick={()=>{setDim(i);setMet(0);setTried(false)}}
                        className="flex flex-col items-center disabled:cursor-not-allowed">
                  <div className="flex items-center justify-center rounded-full shadow
                                 transition-colors"
                       style={{
                         width:54,height:54,
                         backgroundColor: finished?GREEN: active?d.couleur:GRAY
                       }}>
                    {finished
                      ? <CheckCircle size={26} weight="fill" color="#fff"/>
                      : <Icon size={24} color={active?'#fff':GRAY_TXT}/>}
                  </div>
                  <span className="mt-1 text-xs font-medium text-center w-24 truncate"
                        style={{color:active?d.couleur:GRAY_TXT}}>
                    {d.nom}
                  </span>
                </button>
                {i<tool.dimensions.length-1 &&
                  <div className="flex-1 h-[2px]"
                       style={{backgroundColor:finished?GREEN:GRAY}}/>}
              </React.Fragment>
            )
          })}
        </div>

        {/* en-tête dimension -------------------------------- */}
        <section>
          <h2 className="text-2xl font-semibold" style={{color:dim.couleur}}>{dim.nom}</h2>
          <p className="mt-1 text-sm text-secondary max-w-3xl">{dim.description}</p>
          <hr className="my-4 border-t-2" style={{borderColor:dim.couleur}}/>
        </section>

        {/* flèches métriques -------------------------------- */}
        <div className="flex justify-center gap-0">
          {dim.metriques.map((m,i)=>(
            <div key={i} className="flex metric-arrow">
              <div className={`px-6 py-2 text-sm font-medium
                               ${i===metIdx?'bg-blue text-white':'bg-grey text-white/80'}
                               ${i===0?'rounded-l-full':''}`}>
                {m.nom}
              </div>
              <div className={`w-5 -ml-px ${i===metIdx?'bg-blue':'bg-grey'} arrow-pointe`}/>
            </div>
          ))}
        </div>

        {/* bloc Q/R – question en-haut, réponses pleine largeur */}
        <div className="ring-1 ring-line rounded-lg overflow-hidden flex flex-col gap-6">

          {/* question */}
          <div className="p-6 bg-white">
            <div className="flex gap-1 text-xs text-secondary mb-2">
              <Info size={14}/> Objectif
            </div>
            <p className="text-sm whitespace-pre-wrap">{met.question.intitule}</p>
          </div>

          {/* réponses : ligne unique pleine largeur */}
          <div className="grid grid-cols-5 divide-x divide-white/20 gap-x-2">
            {met.question.reponses.map((r,idx)=>{
              const selected = answers[key]===idx
              const error    = tried && !selected
              return(
                <label key={idx}
                       className={`relative flex flex-col justify-between
                                   p-4 min-h-[220px] text-black text-[13px]
                                   leading-relaxed cursor-pointer
                                   ${selected?'bg-blue text-white':'bg-grey/20 text-black'}
                                   ${error?'ring-2 ring-critical/50':''}`}>

                  {/* info popover */}
                  {/* {r.transition && (
                    <span className="absolute top-2 right-2 group">
                      <Info size={14}
                            className="text-white/70 group-hover:text-white"/>
                      <span className="hidden group-hover:block absolute z-10 -top-2 right-6
                                       w-64 p-2 text-xs bg-white text-black border rounded shadow">
                        {r.transition}
                      </span>
                    </span>
                  )} */}

                       {/* titre Niveau + séparateur */}
          <span
            className={`
              font-semibold text-center block
              pb-2 mb-2 border-b
              ${selected ? 'border-white/30' : 'border-black/20'}
            `}
          >
            {r.niveau}
          </span>

                  <p className="whitespace-pre-wrap mt-2 flex-1">{r.contenu}</p>

                  {/* radio custom */}
                  <input type="radio" name={key}
                         checked={selected}
                         onChange={()=>saveAns(idx)}
                         className="peer sr-only"/>
                  <span className="mx-auto mt-4 mb-1 w-5 h-5 rounded-full border-2
                                    border-black flex items-center justify-center">
                    <span className={`w-2.5 h-2.5 rounded-full
                                      ${selected?'bg-white border-white':''}`}/>
                  </span>
                </label>
              )
            })}
          </div>
        </div>

        {/* navigation --------------------------------------- */}
        <div className="flex justify-between items-center mt-8">
          <button onClick={prev}
                  disabled={dimIdx===0&&metIdx===0}
                  className="flex items-center gap-1 px-6 py-2 border rounded
                             hover:bg-blue hover:text-white disabled:opacity-40 text-sm">
            <ArrowLeft size={18}/> Précédent
          </button>

          <span className="text-sm text-secondary">
            {dimIdx+1}.{metIdx+1} / {tool.dimensions.length}.{dim.metriques.length}
          </span>

          <button onClick={next}
                  className={`flex items-center gap-1 px-6 py-2 rounded text-white text-sm
                              ${done?'bg-blue hover:opacity-90':'bg-grey'}`}>
            {lastDim&&lastMet?'Terminer':'Suivant'}
            {lastDim&&lastMet? <Check size={18}/> : <ArrowRight size={18}/> }
          </button>
        </div>
      </div>

      {/* CSS flèches -------------------------------------- */}
      <style jsx>{`
        .arrow-pointe{
          clip-path:polygon(0 0,100% 50%,0 100%);
          box-shadow:0 0 2px rgba(0,0,0,.15) inset;
        }
        .metric-arrow:not(:last-child) .arrow-pointe{
          border-right:2px solid #fff;
        }
      `}</style>
    </>
  )
}
