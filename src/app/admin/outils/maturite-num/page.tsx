// /* ------------------------------------------------------------------
//    pages/app/admin/outils/maturite-num/page.tsx
//    Outil de maturité numérique – écran d’administration
// ------------------------------------------------------------------ */
// 'use client'

// import React, { useEffect, useRef, useState, CSSProperties } from 'react'
// import * as PI from '@phosphor-icons/react'
// import {
//   ArrowLeft, ArrowRight, Gauge,
//   PlusCircle, MinusCircle,
//   TrashSimple, Trash, Check,
// } from '@phosphor-icons/react'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// /* ═════════════ Types ═════════════════════════════════════════════ */
// interface ReponseNiveau {
//   niveau:      string
//   contenu:     string
//   transition:  string
//   min:         number
//   max:         number
// }
// interface Question   { intitule: string; reponses: ReponseNiveau[] }
// interface Metrique   { nom: string; question: Question }
// interface Dimension  {
//   nom:         string
//   couleur:     string
//   icone:       string
//   description: string
//   pondération: number            // <-- AJOUTÉ
//   metriques:   Metrique[]
// }
// interface NiveauIdx  { min: number; max: number; titre: string; description: string }
// interface Outil      { titre: string; dimensions: Dimension[]; indexGlobal: NiveauIdx[] }

// /* ═════════════ Helpers ═══════════════════════════════════════════ */
// const blue = '#2563eb'
// const blueHead: CSSProperties = { backgroundColor: blue }

// const makeReponse = (i: number): ReponseNiveau => ({
//   niveau: `Niveau ${i + 1}`,
//   contenu: '',
//   transition: '',
//   min: i === 0 ? 0 : i * 20 + 1,
//   max: (i + 1) * 20,
// })
// const defaultQuestion = (): Question => ({
//   intitule: '',
//   reponses: Array.from({ length: 5 }, (_, i) => makeReponse(i)),
// })
// const blankMetrique = (): Metrique => ({
//   nom: 'Nouvelle métrique',
//   question: defaultQuestion(),
// })
// const blankDimension = (): Dimension => ({
//   nom: 'Nouvelle dimension',
//   couleur: '#60a5fa',
//   icone: 'SquaresFour',
//   description: '',
//   pondération: 1,                // <-- AJOUTÉ
//   metriques: [blankMetrique()],
// })
// const defaultIndexGlobal: NiveauIdx[] = [
//   { min: 0,  max: 25,  titre: 'Réactive',   description: '' },
//   { min: 26, max: 50,  titre: 'Débutante',  description: '' },
//   { min: 51, max: 75,  titre: 'Émergente',  description: '' },
//   { min: 76, max: 100, titre: 'Avancée',    description: '' },
// ]

// /* autosize -------------------------------------------------------- */
// function useAutosize(value: string) {
//   const ref = useRef<HTMLTextAreaElement>(null)
//   useEffect(() => {
//     if (ref.current) {
//       ref.current.style.height = 'auto'
//       ref.current.style.height = ref.current.scrollHeight + 'px'
//     }
//   }, [value])
//   return ref
// }
// const AT = (
//   p: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { value: string },
// ) => {
//   const r = useAutosize(p.value)
//   return (
//     <textarea
//       ref={r}
//       {...p}
//       className={(p.className ?? '') + ' text-sm resize-none whitespace-pre-line leading-relaxed border px-2 py-1'}
//     />
//   )
// }

// /* ═════════════ Composant ═════════════════════════════════════════ */
// export default function AdminMaturiteNumerique() {
//   const [outil, setOutil] = useState<Outil>({
//     titre: 'Outil de maturité numérique',
//     dimensions: [blankDimension()],
//     indexGlobal: defaultIndexGlobal,
//   })
//   const [dimIdx, setDimIdx] = useState(0)
//   const [metIdx, setMetIdx] = useState(0)
//   const [view, setView] = useState<'structure' | 'indexG'>('structure')
//   const [loading, setLoading] = useState(true)

//   /* ---- charge éventuel JSON déjà présent -------------------- */
//   useEffect(() => {
//     fetch('/dataApi/tools/maturite-num.json')
//       .then(r => (r.ok ? r.json() : null))
//       .then((d: Outil | null) => {
//         if (d) {
//           if (d.dimensions.length === 0) d.dimensions = [blankDimension()]
//           /* recalcul de la pondération si champ absent ou faux */
//           d.dimensions.forEach(dim => (dim.pondération = dim.metriques.length))
//           setOutil(d)
//         }
//       })
//       .finally(() => setLoading(false))
//   }, [])

//   /* ---- mutateur d'état -------------------------------------- */
//   const mutate = (fn: (d: Outil) => void) =>
//     setOutil(prev => {
//       const d = structuredClone(prev)
//       fn(d)
//       /* garde au moins 1 dimension + met à jour les pondérations */
//       if (d.dimensions.length === 0) d.dimensions = [blankDimension()]
//       d.dimensions.forEach(dim => (dim.pondération = dim.metriques.length))
//       return d
//     })

//   const dim = outil.dimensions[dimIdx]
//   const met = dim.metriques[metIdx]
//   const IconCmp = (PI as any)[dim.icone] as any

//   /* ---- sauvegarde (pondérations incluses) ------------------- */
//   const save = async () => {
//     /* copie profonde + pondérations à jour */
//     const toSave = structuredClone(outil)
//     toSave.dimensions.forEach(dimSav => (dimSav.pondération = dimSav.metriques.length))

//     const ok = await fetch('/api/admin/tools', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ slug: 'maturite-num', data: toSave }),
//     })
//       .then(r => r.ok)
//       .catch(() => false)

//     ok ? toast.success('Sauvegarde réussie') : toast.error('Erreur de sauvegarde')
//   }

//   /* ---- spinner ---------------------------------------------- */
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-[60vh]">
//         <div className="w-12 h-12 border-4 border-blue rounded-full border-t-transparent animate-spin" />
//       </div>
//     )
//   }

//   /* ═════════════ RENDER ═══════════════════════════════════════ */
//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <ToastContainer position="top-right" autoClose={2000} theme="colored" />

//       <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
//         <h1 className="text-xl font-semibold">{outil.titre}</h1>

//         {/* ------------- barre dimensions ----------------------- */}
//         {view === 'structure' && (
//           <>
//             <div className="flex flex-wrap gap-4 mb-6">
//               {outil.dimensions.map((d, i) => (
//                 <button
//                   key={i}
//                   onClick={() => {
//                     setDimIdx(i)
//                     setMetIdx(0)
//                   }}
//                   style={{
//                     backgroundColor: i === dimIdx ? d.couleur : undefined,
//                     color: i === dimIdx ? '#fff' : undefined,
//                   }}
//                   className="px-3 py-1 rounded-full border text-sm flex items-center gap-1"
//                 >
//                   {(PI as any)[d.icone]
//                     ? React.createElement((PI as any)[d.icone], { size: 12 })
//                     : <Check size={12} />}
//                   {d.nom}
//                 </button>
//               ))}

//               <button
//                 onClick={() =>
//                   mutate(o => {
//                     o.dimensions.push(blankDimension())
//                     setDimIdx(o.dimensions.length - 1)
//                     setMetIdx(0)
//                   })}
//                 className="flex items-center gap-1 px-3 py-1 border rounded-full text-sm"
//               >
//                 <PlusCircle size={14} /> Ajouter dimension
//               </button>

//               <button
//                 onClick={() => setView('indexG')}
//                 className="ml-auto flex items-center gap-1 bg-blue text-white px-4 py-1 rounded"
//               >
//                 <Gauge size={16} /> Index Global
//               </button>
//             </div>

//             <hr />
//           </>
//         )}

//         {/* ------------- INDEX GLOBAL -------------------------- */}
//         {view === 'indexG' && (
//           <>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setView('structure')}
//                 className="px-4 py-1 border-2 border-blue rounded text-blue text-sm"
//               >
//                 <ArrowLeft size={16} /> Retour
//               </button>
//               <h2 className="flex-1 text-center text-xl font-semibold">
//                 Index&nbsp;Global
//               </h2>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="min-w-full border-collapse text-sm mt-4">
//                 <thead>
//                   <tr style={blueHead} className="text-white">
//                     <th className="border p-2">CÔTE&nbsp;(min-max)</th>
//                     <th className="border p-2">Titre</th>
//                     <th className="border p-2">Description</th>
//                     <th className="border p-2 w-8" />
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {outil.indexGlobal.map((niv, i) => (
//                     <tr key={i} className="odd:bg-surface">
//                       <td className="border p-2">
//                         <div className="flex items-center gap-1">
//                           <input
//                             type="number"
//                             className="w-12 border-blue border px-1"
//                             value={niv.min}
//                             onChange={e =>
//                               mutate(o => (o.indexGlobal[i].min = +e.target.value))}
//                           />
//                           —
//                           <input
//                             type="number"
//                             className="w-12 border-blue border px-1"
//                             value={niv.max}
//                             onChange={e =>
//                               mutate(o => (o.indexGlobal[i].max = +e.target.value))}
//                           />
//                         </div>
//                       </td>
//                       <td className="border p-2">
//                         <input
//                           className="w-full px-1"
//                           value={niv.titre}
//                           onChange={e =>
//                             mutate(o => (o.indexGlobal[i].titre = e.target.value))}
//                         />
//                       </td>
//                       <td className="border p-2">
//                         <AT
//                           className="w-full"
//                           value={niv.description}
//                           onChange={e =>
//                             mutate(
//                               o =>
//                                 (o.indexGlobal[i].description = e.target.value),
//                             )}
//                         />
//                       </td>
//                       <td className="border p-2 text-center">
//                         {outil.indexGlobal.length > 1 && (
//                           <button
//                             onClick={() => mutate(o => o.indexGlobal.splice(i, 1))}
//                           >
//                             <MinusCircle size={16} />
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                   <tr>
//                     <td colSpan={4} className="border p-2 text-center">
//                       <button
//                         onClick={() =>
//                           mutate(o =>
//                             o.indexGlobal.push({
//                               min: 0,
//                               max: 0,
//                               titre: '',
//                               description: '',
//                             }),
//                           )}
//                         className="text-blue flex items-center gap-1 text-sm mx-auto"
//                       >
//                         <PlusCircle size={14} /> Ajouter un niveau
//                       </button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}

//         {/* ------------- STRUCTURE (Dim + Métriques) ------------ */}
//         {view === 'structure' && (
//           <>
//             {/* ----------- méta dimension ----------------------- */}
//             <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
//               <div className="flex flex-wrap gap-4 items-center">
//                 <label>Nom</label>
//                 <input
//                   className="py-1 w-48 border-blue border px-1"
//                   value={dim.nom}
//                   onChange={e =>
//                     mutate(o => (o.dimensions[dimIdx].nom = e.target.value))}
//                 />
//                 <label>Couleur</label>
//                 <input
//                   type="color"
//                   className="w-10 h-8 border"
//                   value={dim.couleur}
//                   onChange={e =>
//                     mutate(o => (o.dimensions[dimIdx].couleur = e.target.value))}
//                 />
//                 <label>Icône</label>
//                 <input
//                   className="py-1 w-40 border-blue border px-1"
//                   value={dim.icone}
//                   onChange={e =>
//                     mutate(o => (o.dimensions[dimIdx].icone = e.target.value))}
//                 />
//                 {IconCmp && <IconCmp size={18} />}

//                 {outil.dimensions.length > 1 && (
//                   <button
//                     onClick={() =>
//                       mutate(o => {
//                         o.dimensions.splice(dimIdx, 1)
//                         setDimIdx(Math.max(0, dimIdx - 1))
//                         setMetIdx(0)
//                       })}
//                     className="ml-auto text-critical flex items-center gap-1 text-sm"
//                   >
//                     <TrashSimple size={14} /> Supprimer dimension
//                   </button>
//                 )}
//               </div>

//               <AT
//                 className="w-full border border-blue px-1"
//                 placeholder="Description de la dimension…"
//                 value={dim.description}
//                 onChange={e =>
//                   mutate(
//                     o => (o.dimensions[dimIdx].description = e.target.value),
//                   )}
//               />
//             </div>

//             <hr className="my-6" />

//             {/* ----------- onglets métriques -------------------- */}
//             <div className="space-y-5 mb-6">
//               <h3 className="text-center font-semibold">
//                 Liste des métriques de la dimension – {dim.nom} –
//               </h3>

//               <div className="flex flex-wrap gap-3">
//                 {dim.metriques.map((m, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setMetIdx(i)}
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       i === metIdx
//                         ? 'bg-blue text-white'
//                         : 'border border-blue text-black bg-white'
//                     }`}
//                   >
//                     {m.nom}
//                   </button>
//                 ))}

//                 <button
//                   onClick={() =>
//                     mutate(o => {
//                       o.dimensions[dimIdx].metriques.push(blankMetrique())
//                       setMetIdx(o.dimensions[dimIdx].metriques.length - 1)
//                     })}
//                   className="flex items-center gap-1 px-3 py-1 border rounded-full text-sm"
//                 >
//                   <PlusCircle size={14} /> Ajouter métrique
//                 </button>
//               </div>
//             </div>

//             {/* ----------- fiche métrique ----------------------- */}
//             <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
//               <div className="flex flex-wrap gap-3 items-center">
//                 <label>Nom métrique</label>
//                 <input
//                   className="py-1 flex-1 border-blue border px-1"
//                   value={met.nom}
//                   onChange={e =>
//                     mutate(
//                       o =>
//                         (o.dimensions[dimIdx].metriques[metIdx].nom =
//                           e.target.value),
//                     )}
//                 />

//                 <span className="font-semibold">
//                   Pondération {dim.pondération}
//                 </span>

//                 {dim.metriques.length > 1 && (
//                   <button
//                     onClick={() =>
//                       mutate(o => {
//                         o.dimensions[dimIdx].metriques.splice(metIdx, 1)
//                         setMetIdx(Math.max(0, metIdx - 1))
//                       })}
//                     className="text-critical flex items-center gap-1 text-sm"
//                   >
//                     <Trash size={14} /> Supprimer
//                   </button>
//                 )}
//               </div>

//               <AT
//                 className="w-full border border-blue"
//                 placeholder="Énoncer la question…"
//                 value={met.question.intitule}
//                 onChange={e =>
//                   mutate(
//                     o =>
//                       (o.dimensions[dimIdx].metriques[metIdx].question.intitule =
//                         e.target.value),
//                   )}
//               />

//               {/* ---- table réponses --------------------------- */}
//               <div className="overflow-x-auto">
//                 <table className="min-w-full border-collapse text-sm">
//                   <thead>
//                     <tr>
//                       <th style={blueHead} className="text-white border p-2">
//                         Niveau
//                       </th>
//                       <th
//                         style={blueHead}
//                         className="text-white border p-2 bg-[#dbeafe]"
//                       >
//                         Réponse
//                       </th>
//                       <th
//                         style={blueHead}
//                         className="text-white border p-2 bg-[#fef9c3]"
//                       >
//                         Transition&nbsp;(Recommandation)
//                       </th>
//                       <th style={blueHead} className="text-white border p-2">
//                         CÔTE&nbsp;(min-max)
//                       </th>
//                       <th style={blueHead} className="text-white border p-2 w-8" />
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {met.question.reponses.map((r, i) => (
//                       <tr key={i} className="odd:bg-surface">
//                         {/* niveau */}
//                         <td className="border p-1">
//                           <input
//                             className="w-full px-1"
//                             value={r.niveau}
//                             onChange={e =>
//                               mutate(
//                                 o =>
//                                   (o.dimensions[dimIdx].metriques[metIdx].question.reponses[
//                                     i
//                                   ].niveau = e.target.value),
//                               )}
//                           />
//                         </td>

//                         {/* réponse */}
//                         <td className="border p-1 bg-[#dbeafe]">
//                           <AT
//                             className="w-full bg-[#dbeafe]"
//                             value={r.contenu}
//                             onChange={e =>
//                               mutate(
//                                 o =>
//                                   (o.dimensions[dimIdx].metriques[metIdx].question.reponses[
//                                     i
//                                   ].contenu = e.target.value),
//                               )}
//                           />
//                         </td>

//                         {/* transition */}
//                         <td className="border p-1 bg-[#fef9c3]">
//                           <AT
//                             className="w-full bg-[#fef9c3]"
//                             value={r.transition}
//                             onChange={e =>
//                               mutate(
//                                 o =>
//                                   (o.dimensions[dimIdx].metriques[metIdx].question.reponses[
//                                     i
//                                   ].transition = e.target.value),
//                               )}
//                           />
//                         </td>

//                         {/* côte */}
//                         <td className="border p-1">
//                           <div className="flex items-center gap-1">
//                             <input
//                               type="number"
//                               className="w-12 border-blue border px-1"
//                               value={r.min}
//                               onChange={e =>
//                                 mutate(
//                                   o =>
//                                     (o.dimensions[dimIdx].metriques[metIdx].question.reponses[
//                                       i
//                                     ].min = +e.target.value),
//                                 )}
//                             />
//                             —
//                             <input
//                               type="number"
//                               className="w-12 border-blue border px-1"
//                               value={r.max}
//                               onChange={e =>
//                                 mutate(
//                                   o =>
//                                     (o.dimensions[dimIdx].metriques[metIdx].question.reponses[
//                                       i
//                                     ].max = +e.target.value),
//                                 )}
//                             />
//                           </div>
//                         </td>

//                         {/* delete */}
//                         <td className="border p-1 text-center">
//                           {met.question.reponses.length > 1 && (
//                             <button
//                               onClick={() =>
//                                 mutate(
//                                   o =>
//                                     o.dimensions[dimIdx].metriques[
//                                       metIdx
//                                     ].question.reponses.splice(i, 1),
//                                 )}
//                             >
//                               <MinusCircle size={16} />
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     ))}

//                     {/* add row */}
//                     <tr>
//                       <td colSpan={5} className="border p-2 text-center">
//                         <button
//                           onClick={() =>
//                             mutate(
//                               o =>
//                                 o.dimensions[dimIdx].metriques[
//                                   metIdx
//                                 ].question.reponses.push(
//                                   makeReponse(met.question.reponses.length),
//                                 ),
//                             )}
//                           className="text-blue flex items-center gap-1 text-sm mx-auto"
//                         >
//                           <PlusCircle size={14} /> Ajouter un niveau
//                         </button>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </>
//         )}

//         {/* ------------- footer save --------------------------- */}
//         <div className="flex justify-end">
//           <button
//             onClick={save}
//             className="px-6 py-2 rounded bg-blue text-white text-sm"
//           >
//             Mettre à jour
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

/* ------------------------------------------------------------------
   pages/app/admin/outils/maturite-num/page.tsx
   Outil de maturité numérique – écran d’administration
------------------------------------------------------------------ */
'use client'

import React, { useEffect, useRef, useState, CSSProperties } from 'react'
import * as PI from '@phosphor-icons/react'
import {
  ArrowLeft, ArrowRight, Gauge,
  PlusCircle, MinusCircle,
  TrashSimple, Trash, Check,
} from '@phosphor-icons/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/* ═════════════ Types ═════════════════════════════════════════════ */
interface ReponseNiveau {
  niveau      : string
  contenu     : string
  transition  : string
  cote        : number                 // 0-100  ← NEW
}
interface Question   { intitule:string; reponses:ReponseNiveau[] }
interface Metrique   { nom:string; question:Question }
interface Dimension  {
  nom:string; couleur:string; icone:string; description:string;
  pondération:number;                         // maj auto = nb métriques
  metriques:Metrique[];
}
interface NiveauIdx  { min:number; max:number; titre:string; description:string }
interface Outil      { titre:string; dimensions:Dimension[]; indexGlobal:NiveauIdx[] }

/* ═════════════ Helpers ═══════════════════════════════════════════ */
const blue = '#2563eb'
const blueHead:CSSProperties = { backgroundColor: blue }

/* calcule la côte (%) sur l’ensemble du tableau passé */
const recalcCotes = (rep:ReponseNiveau[])=>{
  const n = rep.length
  rep.forEach((r,i)=>{ r.cote = Math.round(((i+1)/n)*100) })
}

/* crée un tableau de n réponses initiales ------------------------ */
const initialResponses = (n:number)=> {
  const res = Array.from({length:n},(_,i):ReponseNiveau=>({
    niveau     : `Niveau ${i+1}`,
    contenu    : '',
    transition : '',
    cote       : 0
  }))
  recalcCotes(res)
  return res
}
const defaultQuestion = ():Question=>({
  intitule : '',
  reponses : initialResponses(5)
})
const blankMetrique  = ():Metrique=>({ nom:'Nouvelle métrique', question:defaultQuestion() })
const blankDimension = ():Dimension=>({
  nom:'Nouvelle dimension',
  couleur:'#60a5fa',
  icone:'SquaresFour',
  description:'',
  pondération:1,
  metriques:[blankMetrique()]
})
const defaultIndexGlobal:NiveauIdx[]=[
  {min:0 ,max:25 ,titre:'Réactive' ,description:''},
  {min:26,max:50 ,titre:'Débutante',description:''},
  {min:51,max:75 ,titre:'Émergente',description:''},
  {min:76,max:100,titre:'Avancée'  ,description:''},
]

/* autosize -------------------------------------------------------- */
function useAutosize(value:string){
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(()=>{
    if(ref.current){
      ref.current.style.height='auto'
      ref.current.style.height=ref.current.scrollHeight+'px'
    }
  },[value])
  return ref
}
const AT = (
  p:React.TextareaHTMLAttributes<HTMLTextAreaElement>&{value:string}
)=>{
  const r=useAutosize(p.value)
  return <textarea
           ref={r}{...p}
           className={(p.className??'')+
           ' text-sm resize-none whitespace-pre-line leading-relaxed border px-2 py-1'}/>
}

/* ═════════════ Composant ═════════════════════════════════════════ */
export default function AdminMaturiteNumerique(){

  const [outil,setOutil] = useState<Outil>({
    titre:'Outil de maturité numérique',
    dimensions:[blankDimension()],
    indexGlobal:defaultIndexGlobal
  })
  const [dimIdx,setDimIdx] = useState(0)
  const [metIdx,setMetIdx] = useState(0)
  const [view  ,setView]   = useState<'structure'|'indexG'>('structure')
  const [loading,setLoading]=useState(true)

  /* ---- charge JSON existant ------------------------------------ */
  useEffect(()=>{
    fetch('/dataApi/tools/maturite-num.json')
      .then(r=>r.ok?r.json():null)
      .then((d:Outil|null)=>{
        if(d){
          if(d.dimensions.length===0) d.dimensions=[blankDimension()]
          /* mise à niveau : min/max → cote (%), recalcul si manquant */
          d.dimensions.forEach(dim=>{
            dim.metriques.forEach(m=>{
              // si ancienne structure -> convertir
              m.question.reponses.forEach((r,i,arr)=>{
                // @ts-ignore
                if(r.min!=null && r.max!=null){
                  const n = arr.length
                  r.cote = Math.round(((i+1)/n)*100)
                  // @ts-ignore
                  delete r.min; delete r.max
                }
              })
              recalcCotes(m.question.reponses)
            })
            dim.pondération = dim.metriques.length
          })
          setOutil(d)
        }
      })
      .finally(()=>setLoading(false))
  },[])

  /* ---- mutateur utilitaire ------------------------------------- */
  const mutate = (fn:(d:Outil)=>void)=>
    setOutil(prev=>{
      const d = structuredClone(prev)
      fn(d)
      /* toujours ≥1 dimension  + maj pondérations + recalc cotes */
      if(d.dimensions.length===0) d.dimensions=[blankDimension()]
      d.dimensions.forEach(dim=>{
        dim.pondération = dim.metriques.length
        dim.metriques.forEach(m=> recalcCotes(m.question.reponses))
      })
      return d
    })

  /* ---- raccourcis courants ------------------------------------- */
  const dim = outil.dimensions[dimIdx]
  const met = dim.metriques[metIdx]
  const IconCmp = (PI as any)[dim.icone] as any

  /* ---- sauvegarde ---------------------------------------------- */
  const save = async ()=>{
    const ok = await fetch('/api/admin/tools',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({slug:'maturite-num',data:outil})
    }).then(r=>r.ok).catch(()=>false)

    ok? toast.success('Sauvegarde réussie')
       : toast.error('Erreur de sauvegarde')
  }

  /* ---- spinner -------------------------------------------------- */
  if(loading){
    return(
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue rounded-full
                        border-t-transparent animate-spin"/>
      </div>
    )
  }

  /* ═════════════ RENDER ══════════════════════════════════════════ */
  return(
    <div className="max-w-6xl mx-auto p-4">
      <ToastContainer position="top-right" autoClose={2000} theme="colored"/>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">

        <h1 className="text-xl font-semibold">{outil.titre}</h1>

        {/* -------- barre dimensions ------------------------------- */}
        {view==='structure'&&(
          <>
            <div className="flex flex-wrap gap-4 mb-6">
              {outil.dimensions.map((d,i)=>(
                <button key={i}
                        onClick={()=>{setDimIdx(i);setMetIdx(0)}}
                        style={{
                          backgroundColor:i===dimIdx?d.couleur:undefined,
                          color:i===dimIdx?'#fff':undefined}}
                        className="px-3 py-1 rounded-full border text-sm flex items-center gap-1">
                  {(PI as any)[d.icone]
                    ? React.createElement((PI as any)[d.icone],{size:12})
                    : <Check size={12}/>}
                  {d.nom}
                </button>
              ))}

              <button
                onClick={()=>mutate(o=>{
                  o.dimensions.push(blankDimension())
                  setDimIdx(o.dimensions.length-1); setMetIdx(0)
                })}
                className="flex items-center gap-1 px-3 py-1 border rounded-full text-sm">
                <PlusCircle size={14}/> Ajouter dimension
              </button>

              <button onClick={()=>setView('indexG')}
                      className="ml-auto flex items-center gap-1 bg-blue text-white px-4 py-1 rounded">
                <Gauge size={16}/> Index Global
              </button>
            </div>

            <hr/>
          </>
        )}

        {/* --------- INDEX GLOBAL (inchangé) ----------------------- */}
        {view==='indexG'&&(
          <>
            <div className="flex items-center gap-3">
              <button onClick={()=>setView('structure')}
                      className="px-4 py-1 border-2 border-blue rounded text-blue text-sm">
                <ArrowLeft size={16}/> Retour
              </button>
              <h2 className="flex-1 text-center text-xl font-semibold">Index&nbsp;Global</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm mt-4">
                <thead>
                  <tr style={blueHead} className="text-white">
                    <th className="border p-2">CÔTE&nbsp;(min-max)</th>
                    <th className="border p-2">Titre</th>
                    <th className="border p-2">Description</th>
                    <th className="border p-2 w-8"/>
                  </tr>
                </thead>
                <tbody>
                  {outil.indexGlobal.map((niv,i)=>(
                    <tr key={i} className="odd:bg-surface">
                      <td className="border p-2">
                        <div className="flex items-center gap-1">
                          <input type="number" className="w-12 border-blue border px-1"
                                 value={niv.min}
                                 onChange={e=>mutate(
                                   o=>o.indexGlobal[i].min=+e.target.value)}/>
                          —
                          <input type="number" className="w-12 border-blue border px-1"
                                 value={niv.max}
                                 onChange={e=>mutate(
                                   o=>o.indexGlobal[i].max=+e.target.value)}/>
                        </div>
                      </td>
                      <td className="border p-2">
                        <input className="w-full px-1"
                               value={niv.titre}
                               onChange={e=>mutate(
                                 o=>o.indexGlobal[i].titre=e.target.value)}/>
                      </td>
                      <td className="border p-2">
                        <AT className="w-full" value={niv.description}
                            onChange={e=>mutate(
                              o=>o.indexGlobal[i].description=e.target.value)}/>
                      </td>
                      <td className="border p-2 text-center">
                        {outil.indexGlobal.length>1&&(
                          <button onClick={()=>mutate(o=>o.indexGlobal.splice(i,1))}>
                            <MinusCircle size={16}/>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={4} className="border p-2 text-center">
                      <button onClick={()=>mutate(o=>
                            o.indexGlobal.push({min:0,max:0,titre:'',description:''}))}
                              className="text-blue flex items-center gap-1 text-sm mx-auto">
                        <PlusCircle size={14}/> Ajouter un niveau
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* --------- STRUCTURE (dimension / métriques) ------------- */}
        {view==='structure'&&(
          <>
            {/* méta dimension */}
            <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
              <div className="flex flex-wrap gap-4 items-center">
                <label>Nom</label>
                <input className="py-1 w-48 border-blue border px-1"
                       value={dim.nom}
                       onChange={e=>mutate(
                         o=>o.dimensions[dimIdx].nom=e.target.value)}/>
                <label>Couleur</label>
                <input type="color" className="w-10 h-8 border"
                       value={dim.couleur}
                       onChange={e=>mutate(
                         o=>o.dimensions[dimIdx].couleur=e.target.value)}/>
                <label>Icône</label>
                <input className="py-1 w-40 border-blue border px-1"
                       value={dim.icone}
                       onChange={e=>mutate(
                         o=>o.dimensions[dimIdx].icone=e.target.value)}/>
                {IconCmp&&<IconCmp size={18}/>}

                {outil.dimensions.length>1&&(
                  <button onClick={()=>mutate(o=>{
                             o.dimensions.splice(dimIdx,1)
                             setDimIdx(Math.max(0,dimIdx-1)); setMetIdx(0)})}
                          className="ml-auto text-critical flex items-center gap-1 text-sm">
                    <TrashSimple size={14}/> Supprimer dimension
                  </button>
                )}
              </div>

              <AT className="w-full border-blue border"
                  placeholder="Description de la dimension…"
                  value={dim.description}
                  onChange={e=>mutate(
                    o=>o.dimensions[dimIdx].description=e.target.value)}/>
            </div>

            <hr className="my-6"/>

            {/* onglets métriques */}
            <div className="space-y-5 mb-6">
              <h3 className="text-center font-semibold">
                Liste des métriques de la dimension – {dim.nom} –
              </h3>

              <div className="flex flex-wrap gap-3">
                {dim.metriques.map((m,i)=>(
                  <button key={i} onClick={()=>setMetIdx(i)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            i===metIdx
                              ?'bg-blue text-white'
                              :'border border-blue text-black bg-white'}`}>
                    {m.nom}
                  </button>
                ))}

                <button onClick={()=>mutate(o=>{
                            o.dimensions[dimIdx].metriques.push(blankMetrique())
                            setMetIdx(o.dimensions[dimIdx].metriques.length-1)})}
                        className="flex items-center gap-1 px-3 py-1 border rounded-full text-sm">
                  <PlusCircle size={14}/> Ajouter métrique
                </button>
              </div>
            </div>

            {/* fiche métrique */}
            <div className="bg-white shadow-md rounded-lg p-6 space-y-6">

              <div className="flex flex-wrap gap-3 items-center">
                <label>Nom métrique</label>
                <input className="py-1 flex-1 border-blue border px-1"
                       value={met.nom}
                       onChange={e=>mutate(
                         o=>o.dimensions[dimIdx].metriques[metIdx].nom=e.target.value)}/>
                <span className="font-semibold">
                  Pondération&nbsp;{dim.pondération}
                </span>
                {dim.metriques.length>1&&(
                  <button onClick={()=>mutate(o=>{
                             o.dimensions[dimIdx].metriques.splice(metIdx,1)
                             setMetIdx(Math.max(0,metIdx-1))})}
                          className="text-critical flex items-center gap-1 text-sm">
                    <Trash size={14}/> Supprimer
                  </button>
                )}
              </div>

              <AT className="w-full border border-blue"
                  placeholder="Énoncer la question…"
                  value={met.question.intitule}
                  onChange={e=>mutate(
                    o=>o.dimensions[dimIdx].metriques[metIdx]
                         .question.intitule=e.target.value)}/>

              {/* table réponses */}
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th style={blueHead} className="text-white border p-2">Niveau</th>
                      <th style={blueHead} className="text-white border p-2 bg-[#dbeafe]">
                        Réponse
                      </th>
                      <th style={blueHead} className="text-white border p-2 bg-[#fef9c3]">
                        Transition (Recommandation)
                      </th>
                      <th style={blueHead} className="text-white border p-2">
                        CÔTE&nbsp;(%)
                      </th>
                      <th style={blueHead} className="text-white border p-2 w-8"/>
                    </tr>
                  </thead>
                  <tbody>
                    {met.question.reponses.map((r,i)=>(
                      <tr key={i} className="odd:bg-surface">

                        {/* niveau */}
                        <td className="border p-1">
                          <input className="w-full px-1"
                                 value={r.niveau}
                                 onChange={e=>mutate(
                                   o=>o.dimensions[dimIdx].metriques[metIdx]
                                         .question.reponses[i].niveau=e.target.value)}/>
                        </td>

                        {/* réponse */}
                        <td className="border p-1 bg-[#dbeafe]">
                          <AT className="w-full bg-[#dbeafe]"
                              value={r.contenu}
                              onChange={e=>mutate(
                                o=>o.dimensions[dimIdx].metriques[metIdx]
                                      .question.reponses[i].contenu=e.target.value)}/>
                        </td>

                        {/* transition */}
                        <td className="border p-1 bg-[#fef9c3]">
                          <AT className="w-full bg-[#fef9c3]"
                              value={r.transition}
                              onChange={e=>mutate(
                                o=>o.dimensions[dimIdx].metriques[metIdx]
                                      .question.reponses[i].transition=e.target.value)}/>
                        </td>

                        {/* côte (readonly) */}
                        <td className="border p-1 text-center font-semibold">
                          {r.cote}%
                        </td>

                        {/* delete */}
                        <td className="border p-1 text-center">
                          {met.question.reponses.length>1&&(
                            <button onClick={()=>mutate(
                                      o=>o.dimensions[dimIdx].metriques[metIdx]
                                            .question.reponses.splice(i,1))}>
                              <MinusCircle size={16}/>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}

                    {/* add line */}
                    <tr>
                      <td colSpan={5} className="border p-2 text-center">
                        <button onClick={()=>mutate(
                                  o=>{
                                    o.dimensions[dimIdx].metriques[metIdx]
                                      .question.reponses
                                      .push({niveau:`Niveau ${met.question.reponses.length+1}`,
                                             contenu:'',transition:'',cote:0})
                                  })}
                                className="text-blue flex items-center gap-1 text-sm mx-auto">
                          <PlusCircle size={14}/> Ajouter un niveau
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* -------- save ------------------------------------------ */}
        <div className="flex justify-end">
          <button onClick={save}
                  className="px-6 py-2 rounded bg-blue text-white text-sm">
            Mettre à jour
          </button>
        </div>
      </div>
    </div>
  )
}
