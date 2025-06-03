
'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import * as PI from '@phosphor-icons/react'
import {
  ArrowLeft, ArrowRight, Check, CheckCircle
} from '@phosphor-icons/react'
import { z } from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/* ──────────── constantes & types ────────────────────────────────── */
export const OPTIONS = [
  "N'existe pas",
  'Existe partiellement',
  'Existe pleinement',
  'Optimisée',
  'Adaptative'
]

interface Capacity   { capacite:string; description:string[] }
interface Descriptive{ name:string; capacities:Capacity[] }
interface Level      { min:number; max:number; niveau:string;
                       resume_niveau:string; motif:string; description:string }
interface Dimension  { name:string; couleur:string; icon:string;
                       descriptives:Descriptive[]; levels:Level[] }
interface Tool       { title:string; dimensions:Dimension[] }

/* couleurs génériques */
const GREEN  = '#22C55E'
const GRAY   = '#E5E7EB'
const GRAY_TXT = '#4B5563'

/* ──────────── composant ─────────────────────────────────────────── */
export default function MaturiteIAForm(){

  /* ---------------- état ---------------- */
  const [tool,setTool]   = useState<Tool|null>(null)
  const [step,setStep]   = useState(0)
  const [answers,setAns] = useState<Record<string,number>>({})
  const [triedNext,setTried] = useState(false)           // pour signaler erreurs
 const router = useRouter()
  /* ------------ chargement JSON --------- */
  useEffect(()=>{
    fetch('/dataApi/tools/maturite-ia.json')
      .then(r=>r.ok?r.json():null)
      .then((d:Tool|null)=>d&&setTool(d))
  },[])
  if(!tool) return <p className="text-center p-10">Chargement…</p>

  const dim       = tool.dimensions[step]
  const allKeys   = (d:Dimension)=>
      d.descriptives.flatMap((ds,di)=>
        ds.capacities.map((_,ci)=>`${d.name}|${di}-${ci}`))
  const isDone    = (d:Dimension)=> allKeys(d).every(k=>answers[k]!=null)
  const currentDone = isDone(dim)
  const canOpen   = (idx:number)=> idx<=step || tool.dimensions.slice(0,idx).every(isDone)

  /* ------------ actions ------------------ */
  const setAnswer=(k:string,v:number)=> setAns(a=>({...a,[k]:v}))

  /* zod : toutes les questions de la dimension courante doivent être ≠ undefined */
  const dimSchema = z.object(
    Object.fromEntries(allKeys(dim).map(k=>[k,z.number()]))
  )
 const tryNext = () => {
  setTried(true)

  /* étape intermédiaire ------------------------------------- */
  if (step < tool.dimensions.length - 1) {
    const obj: Record<string, unknown> = {}
    allKeys(dim).forEach(k => { if (answers[k] != null) obj[k] = answers[k] })
    if (!dimSchema.safeParse(obj).success) {
      toast.error('Veuillez répondre à toutes les questions.')
      return
    }
    setStep(s => s + 1)
    setTried(false)
    return
  }

  /* dernière étape ------------------------------------------ */
  if (!isDone(dim)) {
    toast.error('Veuillez répondre à toutes les questions.')
    return
  }

  /* calcul des scores … (code déjà fourni) */

    const dimScores = tool.dimensions.map(d => {
    const vals = allKeys(d).map(k => answers[k] ?? 1)   // 1 = “n’existe pas”
    const avg  = vals.reduce((s,v) => s + v, 0) / vals.length
    return Math.round(avg * 20)                // 1-5  →  20-100 %
  })

  // 2. indice global
  const globalScore = Math.round(
    dimScores.reduce((s,v) => s + v, 0) / dimScores.length
  )

  // 3. persister
  sessionStorage.setItem('maturiteAnswers', JSON.stringify({
    answers, dimScores, globalScore
  }))
  router.push('/outils/maturite_ia/rapport')
}   // <<< fermeture correcte


  /* ------------ rendu -------------------- */
  return(
             <>
       <div className="overflow-x-hidden">
        <ToastContainer position="top-right" autoClose={2000} theme="colored"/>
         <header id="header">
           {/* <TopNavOne />
          <MenuOne /> */}
         </header>
         <main className="content">
    <div className="max-w-screen-xl mx-auto bg-white shadow-xl rounded-lg p-8 space-y-10">

      {/* barre d’étapes (wizard) --------------------------------- */}
      <div className="flex items-center">
        {tool.dimensions.map((d,i)=>{
          const Icon = (PI as any)[d.icon] as any
          const active   = i===step
          const finished = isDone(d)
          const clickable= canOpen(i)

          return (
            <React.Fragment key={i}>
              <button
                disabled={!clickable}
                onClick={()=>{setStep(i); setTried(false)}}
                className="flex flex-col items-center disabled:cursor-not-allowed">
                {/* cercle */}
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width:56, height:56,
                    backgroundColor: finished
                      ? GREEN
                      : (active ? d.couleur : GRAY)
                  }}>
                  {finished
                    ? <CheckCircle size={26} weight="fill" color="#fff"/>
                    : <Icon size={24} color={active ? '#fff':GRAY_TXT }/>}
                </div>
                {/* titre */}
                <span className="mt-1 text-xs font-medium"
                      style={{color: active ? d.couleur : GRAY_TXT}}>
                  {d.name}
                </span>
              </button>

              {/* trait sauf dernier */}
              {i<tool.dimensions.length-1 && (
                <div className="flex-1 h-[2px]"
                     style={{backgroundColor: finished ? GREEN : GRAY}}/>
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* ---------------- titre questions ------------------------ */}
      <h2 className="text-xl font-semibold text-center">
        Votre organisation dispose-t-elle des capacités suivantes&nbsp;?
      </h2>

      {/* ---------------- questions ----------------------------- */}
      <div className="space-y-8 border-blue" >
        {dim.descriptives.flatMap((ds,di)=> ds.capacities.map((cap,ci,arr)=>{

          const key = `${dim.name}|${di}-${ci}`
          const val = answers[key]
          /* numéro demandé : (dimension) . (index dans la dimension) */
          const index = `${step+1}.${ci+1}`

         /*  – style si non-répondu */
const errorStyle =
  triedNext && val == null
    ? 'border-critical ring-2 ring-critical/40'  // rouge = couleur “critical” de ton thème
    : 'border-gray ring-2 ring-gray/40' // gris = couleur “grey” de ton thème

          return(
            <div key={key}
                 className={`rounded-md p-6 bg-gray-50 ${errorStyle}`}>
              <h3 className="font-semibold mb-3 text-blue">
                {index} {cap.capacite.toUpperCase()}
              </h3>

              <ul className="list-disc ml-6 space-y-1 text-sm mb-4">
                {cap.description.map((t,ti)=> <li key={ti}>{t}</li>)}
              </ul>

              <div className="flex flex-wrap gap-6">
                {OPTIONS.map((opt,idx)=>(
                  <label key={idx}
                         className="flex items-center gap-1 text-sm font-bold cursor-pointer">
                    <input type="radio"
                           checked={val===idx}
                           onChange={()=>setAnswer(key,idx)}/>
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          )}
        ))}
      </div>

      {/* ---------------- navigation ---------------------------- */}
      <div className="flex justify-between items-center">
        <button disabled={step===0}
          onClick={()=>{setStep(s=>s-1); setTried(false)}}
          className="flex items-center gap-1 px-6 py-2 border rounded
                     hover:bg-blue hover:text-white disabled:opacity-40 text-sm">
          <ArrowLeft size={18}/> Précédent
        </button>

        <button onClick={tryNext}
          className={`flex items-center gap-1 px-6 py-2 rounded text-white text-sm
                      ${currentDone ? 'bg-blue hover:opacity-90'
                                     : 'bg-grey cursor-not-allowed'}`}>
          {step===tool.dimensions.length-1 ? 'Finish' : 'Suivant'}
          {step===tool.dimensions.length-1
            ? <Check size={18}/>
            : <ArrowRight size={18}/> }
        </button>
      </div>
    </div>
           </main>
          <footer id="footer">{/* <Footer /> */}</footer>
        </div>     </>
  )
}
