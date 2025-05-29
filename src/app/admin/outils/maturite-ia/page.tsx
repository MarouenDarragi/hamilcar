
// 'use client'

// import React, { useEffect, useRef, useState } from 'react'
// import * as PI from '@phosphor-icons/react'
// import {
//   ArrowLeft, ArrowRight, Plus, PlusCircle,
//   Trash, TrashSimple, Check, MinusCircle
// } from '@phosphor-icons/react'
// import ConfirmationDialog from '@/components/Admin/ConfirmationDialog'

// /* ------------------------------------------------------------------ */
// /* Types & helpers                                                    */
// /* ------------------------------------------------------------------ */
// interface Capacity   { capacite:string; description:string[] }
// interface Descriptive{ name:string; capacities:Capacity[] }
// interface Level      { min:number; max:number; niveau:string; resume_niveau:string; motif:string; description:string }
// interface Dimension  { name:string; couleur:string; icon:string; descriptives:Descriptive[]; levels:Level[] }
// interface Tool       { title:string; dimensions:Dimension[] }

// const defaultLevels = ():Level[] => [
//   { min:0,  max:21,  niveau:'Niveau 1', resume_niveau:'', motif:'', description:'' },
//   { min:21, max:40,  niveau:'Niveau 2', resume_niveau:'', motif:'', description:'' },
//   { min:41, max:60,  niveau:'Niveau 3', resume_niveau:'', motif:'', description:'' },
//   { min:61, max:80,  niveau:'Niveau 4', resume_niveau:'', motif:'', description:'' },
//   { min:81, max:100, niveau:'Niveau 5', resume_niveau:'', motif:'', description:'' }
// ]
// function blankDimension():Dimension{
//   return {
//     name:'Nouvelle dimension',
//     couleur:'#2868D8',
//     icon:'SquaresFour',
//     descriptives:[{ name:'', capacities:[{ capacite:'', description:[] }] }],
//     levels: defaultLevels()
//   }
// }

// /* autosize textarea ------------------------------------------------ */
// const useAutosize = (val:string)=>{
//   const ref=useRef<HTMLTextAreaElement>(null)
//   useEffect(()=>{
//     if(ref.current){
//       ref.current.style.height='auto'
//       ref.current.style.height=ref.current.scrollHeight+'px'
//     }
//   },[val])
//   return ref
// }
// const AT=(p:React.TextareaHTMLAttributes<HTMLTextAreaElement>&{value:string})=>{
//   const ref = useAutosize(p.value)
//   return <textarea ref={ref} {...p}
//            className={(p.className??'')+
//            ' text-sm whitespace-pre-line break-words resize-none leading-relaxed'}/>
// }

// /* ------------------------------------------------------------------ */
// /* Page                                                               */
// /* ------------------------------------------------------------------ */
// export default function AdminMaturiteIA(){

//   const [tool,setTool] = useState<Tool>({
//     title:'Évaluation de la maturité en IA', dimensions:[]
//   })
//   const [dimIdx,setIdx]  = useState(0)
//   const [showRes,setRes] = useState(false)
//   const [confirmOpen,setConfirmOpen] = useState(false)

//   useEffect(()=>{
//     fetch('/dataApi/tools/maturite-ia.json')
//       .then(r=>r.ok?r.json():null)
//       .then((d:Tool|null)=>d&&setTool(d))
//       .catch(()=>{})
//   },[])

//   const dims = tool.dimensions
//   const dim  = dims[dimIdx] ?? blankDimension()

//   const mutateDim = (fn:(d:Dimension)=>void)=>{
//     setTool(p=>{
//       const c = structuredClone(p)
//       fn(c.dimensions[dimIdx])
//       return c
//     })
//   }

//   const addDimension = ()=>{
//     setTool(p=>{
//       const c = structuredClone(p)
//       c.dimensions.push(blankDimension())
//       return c
//     })
//     setIdx(dims.length)
//   }
//   const deleteCurrentDimension = ()=>{
//     setTool(p=>{
//       const c = structuredClone(p)
//       c.dimensions.splice(dimIdx,1)
//       return c
//     })
//     setIdx(i=>Math.max(0,i-1))
//   }

//   async function saveJSON(){
//     await fetch('/api/admin/tools',{
//       method:'POST',
//       headers:{'Content-Type':'application/json'},
//       body:JSON.stringify({slug:'maturite-ia', data:tool})
//     })
//     alert('JSON enregistré')
//   }

//   const IconCmp = (PI as any)[dim.icon] as React.ComponentType<{size?:number}>|undefined
//   const headerStyle = {backgroundColor:dim.couleur}

//   /* ================================ RENDER ========================= */
//   return(
//     <div className="max-w-6xl mx-auto p-4">
//       <div className="bg-white border shadow-md rounded-lg p-6 space-y-6">

//         <h1 className="text-xl font-semibold">{tool.title}</h1>

//         {/* Wizard */}
//         <div className="flex flex-wrap gap-2">
//           {dims.map((d,i)=>{
//             const Ico=(PI as any)[d.icon] as any
//             return(
//               <button key={i} onClick={()=>setIdx(i)}
//                 style={{backgroundColor:d.couleur}}
//                 className={`px-3 py-1 rounded-full text-white text-sm flex items-center gap-1 ${
//                   i!==dimIdx && 'opacity-60'}`}>
//                 {Ico ? <Ico size={12}/> : <Check size={12}/>} {d.name}
//               </button>
//             )
//           })}
//           <button onClick={addDimension}
//             className="flex items-center gap-1 px-3 py-1 border rounded-full text-sm">
//             <PlusCircle size={14}/> Ajouter
//           </button>
//         </div>

//         {/* ligne de séparation */}
//         <div className="border-t my-2"/>

//         {/* Métadonnées ------------------------------------------------ */}
//         <div className="flex flex-wrap items-center gap-3 text-sm border-b pb-3">
//           <label>Nom</label>
//           {/* toujours encadré bleu */}
//           <input
//             className="border-2 border-blue px-2 py-1 w-48 ring-0 focus:outline-none"
//             value={dim.name}
//             onChange={e=>mutateDim(d=>{d.name=e.target.value})}
//           />

//           <label>Couleur</label>
//           <input type="color"
//             className="w-10 h-8 border p-0"
//             value={dim.couleur}
//             onChange={e=>mutateDim(d=>{d.couleur=e.target.value})}/>

//           <label>Icon</label>
//           {/* toujours encadré bleu */}
//           <input
//             className="border-2 border-blue px-2 py-1 w-40 ring-0 focus:outline-none"
//             value={dim.icon}
//             onChange={e=>mutateDim(d=>{d.icon=e.target.value})}/>
//           {IconCmp && <IconCmp size={18}/>}

//           <div className="ml-auto">
//             <button
//               onClick={()=>setConfirmOpen(true)}
//               className="flex items-center gap-1 px-2 py-1 border rounded text-critical text-sm">
//               <TrashSimple size={14}/> Supprimer
//             </button>
//           </div>
//         </div>

//         {/* Confirmation */}
//         <ConfirmationDialog
//           isOpen={confirmOpen}
//           onClose={()=>setConfirmOpen(false)}
//           onConfirm={()=>{
//             deleteCurrentDimension()
//             setConfirmOpen(false)
//           }}
//           title="Supprimer la dimension"
//           message="Cette action retirera définitivement la dimension et toutes ses données."
//         />

//         <button onClick={()=>setRes(v=>!v)}
//           className="px-4 py-2 rounded bg-blue text-white text-sm">
//           {showRes?'Retour aux questions':'Résultats'}
//         </button>

//         {/* ------------------------------------------------------------ */}
//         {/* QUESTIONS TABLE                                             */}
//         {/* ------------------------------------------------------------ */}
//         {!showRes && (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border-collapse text-sm">
//               <thead>
//                 <tr style={headerStyle} className="text-white">
//                   <th className="border p-2">Dimension</th>
//                   <th className="border p-2">Descriptif</th>
//                   <th className="border p-2">Capacité</th>
//                   <th className="border p-2 w-[28rem]">Sous-capacités</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {dim.descriptives.map((desc,di)=>
//                   desc.capacities.map((cap,ci)=>(
//                     <tr key={`${di}-${ci}`} className="odd:bg-surface">
//                       {/* dimension rowspan */}
//                       {di===0&&ci===0&&(
//                         <td rowSpan={dim.descriptives.reduce((n,d)=>n+d.capacities.length,0)}
//                             style={headerStyle} className="border p-0">
//                           <input
//                             className="w-full h-full px-2 py-1 text-white font-semibold bg-transparent outline-none"
//                             value={dim.name}
//                             onChange={e=>mutateDim(d=>{d.name=e.target.value})}/>
//                         </td>
//                       )}

//                       {/* descriptif rowspan */}
//                       {ci===0&&(
//                         <td rowSpan={desc.capacities.length} className="border p-2">
//                           <input
//                             className="w-full border px-2 py-1"
//                             value={desc.name}
//                             onChange={e=>mutateDim(d=>{d.descriptives[di].name=e.target.value})}/>
//                         </td>
//                       )}

//                       {/* capacité */}
//                       <td className="border p-2">
//                         <div className="flex gap-2">
//                           <input
//                             className="flex-1 border px-2 py-1"
//                             value={cap.capacite}
//                             onChange={e=>mutateDim(d=>{
//                               d.descriptives[di].capacities[ci].capacite=e.target.value
//                             })}/>
//                           <button title="Supprimer capacité"
//                             onClick={()=>mutateDim(d=>{
//                               d.descriptives[di].capacities.splice(ci,1)
//                             })}
//                             className="border p-1 rounded text-critical">
//                             <Trash size={14}/>
//                           </button>
//                         </div>
//                       </td>

//                       {/* sous-capacités */}
//                       <td className="border p-2">
//                         <div className="flex flex-col gap-2">
//                           {cap.description.map((line,li)=>(
//                             <div key={li} className="flex gap-2">
//                               <AT className="flex-1 border px-2 py-1"
//                                   value={line}
//                                   onChange={e=>mutateDim(d=>{
//                                     d.descriptives[di].capacities[ci].description[li]=e.target.value
//                                   })}/>
//                               <button
//                                 title="Supprimer ligne"
//                                 onClick={()=>mutateDim(d=>{
//                                   d.descriptives[di].capacities[ci].description.splice(li,1)
//                                 })}
//                                 className="border p-1 rounded text-critical">
//                                 <Trash size={14}/>
//                               </button>
//                             </div>
//                           ))}
//                           <button
//                             onClick={()=>mutateDim(d=>{
//                               d.descriptives[di].capacities[ci].description.push('')
//                             })}
//                             className="text-blue text-xs flex items-center gap-1">
//                             <Plus size={12}/> Ajouter
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//                 {/* add capacité */}
//                 <tr>
//                   <td colSpan={4} className="border p-2 text-center">
//                     <button
//                       onClick={()=>mutateDim(d=>{
//                         const first=d.descriptives[0]??{name:'',capacities:[]}
//                         if(d.descriptives.length===0) d.descriptives.push(first)
//                         first.capacities.push({capacite:'',description:[]})
//                       })}
//                       className="text-blue text-sm flex items-center gap-1 mx-auto">
//                       <Plus size={14}/> Ajouter une capacité
//                     </button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* ------------------------------------------------------------ */}
//         {/* RESULTATS TABLE                                             */}
//         {/* ------------------------------------------------------------ */}
//         {showRes && (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border-collapse text-sm">
//               <thead>
//                 <tr style={headerStyle} className="text-white whitespace-nowrap">
//                   <th className="border p-2">Champ</th>
//                   {dim.levels.map((l,i)=>(
//                     <th key={i} className="border p-2 relative">
//                       <input
//                         className="w-full bg-transparent text-white font-semibold outline-none text-center"
//                         value={l.niveau}
//                         onChange={e=>mutateDim(d=>{d.levels[i].niveau=e.target.value})}/>
//                       {dim.levels.length>1&&(
//                         <button title="Supprimer niveau"
//                           onClick={()=>mutateDim(d=>{d.levels.splice(i,1)})}
//                           className="absolute -top-1 -right-1">
//                           <MinusCircle size={16} weight="fill" color="#FFFFFF"/>
//                         </button>
//                       )}
//                     </th>
//                   ))}
//                   <th className="border p-2 w-10 text-center">
//                     <button
//                       onClick={()=>mutateDim(d=>{
//                         d.levels.push({
//                           min:0,max:0,niveau:`Niveau ${d.levels.length+1}`,
//                           resume_niveau:'',motif:'',description:''
//                         })
//                       })}>
//                       <PlusCircle size={16}/>
//                     </button>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="odd:bg-surface">
//                 {/* Min–Max */}
//                 <tr>
//                   <td className="border p-2 font-semibold">Min – Max</td>
//                   {dim.levels.map((lvl,i)=>(
//                     <td key={i} className="border p-2">
//                       <div className="flex gap-1 items-center">
//                         <input type="number"
//                           className="w-16 border px-1"
//                           value={lvl.min}
//                           onChange={e=>mutateDim(d=>{
//                             d.levels[i].min=parseInt(e.target.value)||0
//                           })}/>
//                         —
//                         <input type="number"
//                           className="w-16 border px-1"
//                           value={lvl.max}
//                           onChange={e=>mutateDim(d=>{
//                             d.levels[i].max=parseInt(e.target.value)||0
//                           })}/>
//                       </div>
//                     </td>
//                   ))}
//                 </tr>

//                 {['resume_niveau','motif','description'].map(field=>(
//                   <tr key={field}>
//                     <td className="border p-2 font-semibold capitalize">
//                       {field.replace('_',' ')}
//                     </td>
//                     {dim.levels.map((lvl,i)=>(
//                       <td key={i} className="border p-2">
//                         {field==='description'
//                           ? <AT className="w-full border px-2 py-1 min-h-[3rem] max-h-32"
//                                 value={lvl.description}
//                                 onChange={e=>mutateDim(d=>{
//                                   d.levels[i].description=e.target.value
//                                 })}/>
//                           : <input
//                               className="w-full border px-2 py-1"
//                               value={lvl[field as keyof Level] as string}
//                               onChange={e=>mutateDim(d=>{
//                                 (d.levels[i] as any)[field]=e.target.value
//                               })}/>}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* ------------------------------------------------------------ */}
//         {/* Footer nav & save                                            */}
//         {/* ------------------------------------------------------------ */}
//         <div className="flex items-center gap-3">
//           <button
//             onClick={()=>setIdx(i=>i-1)}
//             disabled={dimIdx===0}
//             className="px-4 py-2 border-2 border-blue text-blue bg-white rounded transition-colors
//                        hover:bg-blue hover:text-white text-sm disabled:opacity-40">
//             <ArrowLeft size={16}/> Précédent
//           </button>

//           <button
//             onClick={()=>setIdx(i=>i+1)}
//             disabled={dimIdx===dims.length-1}
//             className="px-4 py-2 border-2 border-blue text-blue bg-white rounded transition-colors
//                        hover:bg-blue hover:text-white text-sm disabled:opacity-40">
//             Suivant <ArrowRight size={16}/>
//           </button>

//           <button onClick={saveJSON}
//             className="ml-auto px-4 py-2 rounded bg-success text-white text-sm">
//             Mettre à jour
//           </button>
//         </div>

//       </div>{/* /card */}
//     </div>
//   )
// }

/* ------------------------------------------------------------------ */
/*  page.tsx  –  interface d’administration de l’outil Maturité IA    */

// /* ------------------------------------------------------------------ */
// 'use client'
// import React, { useEffect, useRef, useState, CSSProperties } from 'react'
// import * as PI from '@phosphor-icons/react'
// import {
//   ArrowLeft, ArrowRight, Gauge, MinusCircle, Plus, PlusCircle,
//   Trash, TrashSimple, Check
// } from '@phosphor-icons/react'
// import ConfirmationDialog from '@/components/Admin/ConfirmationDialog'

// /* ------------------------------------------------------------------ */
// /* Types                                                              */
// /* ------------------------------------------------------------------ */
// interface Capacity   { capacite: string; description: string[] }
// interface Descriptive{ name: string; capacities: Capacity[] }
// interface Level      { min: number; max: number; niveau: string;
//                        resume_niveau: string; motif: string; description: string }
// interface Dimension  { name: string; couleur: string; icon: string;
//                        descriptives: Descriptive[]; levels: Level[] }
// interface Tool       { title: string; dimensions: Dimension[]; Index_G: Level[] }

// /* ------------------------------------------------------------------ */
// /* Helpers                                                            */
// /* ------------------------------------------------------------------ */
// const blue       = '#2563eb'
// const blueHead:CSSProperties = { backgroundColor: blue }

// const defaultLevels = ():Level[] => [
//   { min:0,  max:21,  niveau:'Niveau 1', resume_niveau:'', motif:'', description:'' },
//   { min:21, max:40,  niveau:'Niveau 2', resume_niveau:'', motif:'', description:'' },
//   { min:41, max:60,  niveau:'Niveau 3', resume_niveau:'', motif:'', description:'' },
//   { min:61, max:80,  niveau:'Niveau 4', resume_niveau:'', motif:'', description:'' },
//   { min:81, max:100, niveau:'Niveau 5', resume_niveau:'', motif:'', description:'' }
// ]
// const blankDimension = ():Dimension => ({
//   name:'Nouvelle dimension',
//   couleur: blue,
//   icon:'SquaresFour',
//   descriptives:[{ name:'', capacities:[{ capacite:'', description:[] }] }],
//   levels: defaultLevels()
// })

// /* autosize pour <textarea> ----------------------------------------- */
// function useAutosize(value:string){
//   const ref = useRef<HTMLTextAreaElement>(null)
//   useEffect(()=>{
//     if(ref.current){
//       ref.current.style.height='auto'
//       ref.current.style.height=ref.current.scrollHeight+'px'
//     }
//   },[value])
//   return ref
// }
// const AT = (p:React.TextareaHTMLAttributes<HTMLTextAreaElement>&{value:string})=>{
//   const ref = useAutosize(p.value)
//   return <textarea ref={ref} {...p}
//     className={(p.className??'')+' text-sm whitespace-pre-line break-words resize-none leading-relaxed'}/>
// }

// /* ------------------------------------------------------------------ */
// /* Tableau “Levels” réutilisable                                      */
// /* ------------------------------------------------------------------ */
// function LevelsTable({levels,onChange,headerStyle,showMotif}:{
//   levels:Level[]; onChange:(l:Level[])=>void;
//   headerStyle:CSSProperties; showMotif:boolean
// }){
//   return(
//     <div className="overflow-x-auto">
//       <table className="min-w-full border-collapse text-sm">
//         <thead>
//           <tr style={headerStyle} className="text-white whitespace-nowrap">
//             <th className="border p-2">Champ</th>
//             {levels.map((l,i)=><th key={i} className="border p-2">{l.niveau}</th>)}
//           </tr>
//         </thead>

//         <tbody className="odd:bg-surface">
//           {/* min–max */}
//           <tr>
//             <td className="border p-2 font-semibold">Min – Max</td>
//             {levels.map((lv,i)=>(
//               <td key={i} className="border p-2">
//                 <div className="flex gap-1 items-center">
//                   <input type="number" className="w-14 border px-1"
//                     value={lv.min}
//                     onChange={e=>{
//                       const v=[...levels]; v[i].min=+e.target.value||0; onChange(v)
//                     }}/>
//                   —
//                   <input type="number" className="w-14 border px-1"
//                     value={lv.max}
//                     onChange={e=>{
//                       const v=[...levels]; v[i].max=+e.target.value||0; onChange(v)
//                     }}/>
//                 </div>
//               </td>
//             ))}
//           </tr>

//           {/* resume / motif / description */}
//           {['resume_niveau', ...(showMotif?['motif']:[]), 'description'].map(field=>(
//             <tr key={field}>
//               <td className="border p-2 font-semibold capitalize">{field.replace('_',' ')}</td>
//               {levels.map((lv,i)=>(
//                 <td key={i} className="border p-2">
//                   {field==='description'
//                     ? <AT className="w-full border px-2 py-1 min-h-[3rem] max-h-32"
//                         value={lv.description}
//                         onChange={e=>{
//                           const v=[...levels]; v[i].description=e.target.value; onChange(v)
//                         }}/>
//                     : <input className="w-full border px-2 py-1"
//                         value={lv[field as keyof Level] as string}
//                         onChange={e=>{
//                           const v=[...levels]; (v[i] as any)[field]=e.target.value; onChange(v)
//                         }}/>
//                   }
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// /* ------------------------------------------------------------------ */
// /* Page                                                               */
// /* ------------------------------------------------------------------ */
// export default function AdminMaturiteIA(){

//   const [tool,setTool] = useState<Tool>({
//     title:'Évaluation de la maturité en IA',
//     dimensions:[],
//     Index_G: defaultLevels()
//   })
//   const [dimIdx,setIdx]   = useState(0)
//   const [view,setView]    = useState<'q'|'r'|'g'>('q') // q=eval r=result g=index
//   const [confirmOpen,setConfirmOpen] = useState(false)

//   /* charger JSON --------------------------------------------------- */
//   useEffect(()=>{
//     fetch('/dataApi/tools/maturite-ia.json')
//       .then(r=>r.ok?r.json():null)
//       .then((d:Tool|null)=>d&&setTool(d))
//       .catch(()=>{})
//   },[])

//   const dims = tool.dimensions
//   const dim  = dims[dimIdx] ?? blankDimension()

//   const mutateDim=(fn:(d:Dimension)=>void)=>
//     setTool(p=>{const c=structuredClone(p); fn(c.dimensions[dimIdx]); return c})
//   const mutateIndexG=(lv:Level[])=>setTool(p=>({...p,Index_G:lv}))

//   /* sauvegarde ----------------------------------------------------- */
//   const saveJSON = async ()=>{
//     await fetch('/api/admin/tools',{
//       method:'POST',
//       headers:{'Content-Type':'application/json'},
//       body:JSON.stringify({slug:'maturite-ia',data:tool})
//     })
//     alert('JSON enregistré')
//   }

//   const IconCmp = (PI as any)[dim.icon] as any
//   const headerStyle = view==='g' ? blueHead : { backgroundColor: dim.couleur }

//   /* ---------------------------------------------------------------- */
//   return(
//   <div className="max-w-6xl mx-auto p-4">
//     <div className="bg-white border shadow-md rounded-lg p-6 space-y-6">

//       <h1 className="text-xl font-semibold">{tool.title}</h1>

//       {/* Wizard + bouton Index (caché si g) ------------------------ */}
//       {view!=='g' && (
//         <div className="flex flex-wrap gap-2">
//           {dims.map((d,i)=>{
//             const Ico=(PI as any)[d.icon] as any
//             return(
//               <button key={i} onClick={()=>{setIdx(i);setView('q')}}
//                 style={{backgroundColor:d.couleur}}
//                 className={`px-3 py-1 rounded-full text-white text-sm flex items-center gap-1 ${
//                   i!==dimIdx&&'opacity-60'}`}>
//                 {Ico ? <Ico size={12}/> : <Check size={12}/>} {d.name}
//               </button>
//             )
//           })}
//           <button onClick={()=>{setTool(p=>({...p,dimensions:[...p.dimensions,blankDimension()]})); setIdx(dims.length); setView('q')}}
//             className="flex items-center gap-1 px-3 py-1 border rounded-full text-sm">
//             <PlusCircle size={14}/> Ajouter
//           </button>
//           {/* bouton Index Global à droite */}
//           <button onClick={()=>setView('g')}
//             className="ml-auto flex items-center gap-1 bg-blue text-white px-4 py-1 rounded">
//             <Gauge size={16}/> Index Global
//           </button>
//         </div>
//       )}

//       <div className="border-t my-2"/>

//       {/* métadonnées (masquées en g) ------------------------------ */}
//       {view!=='g' && (
//         <div className="flex flex-wrap items-center gap-3 text-sm border-b pb-3">
//           <label>Nom</label>
//           <input className="border-2 border-blue px-2 py-1 w-48"
//             value={dim.name}
//             onChange={e=>mutateDim(d=>{d.name=e.target.value})}/>
//           <label>Couleur</label>
//           <input type="color" className="w-10 h-8 border p-0"
//             value={dim.couleur}
//             onChange={e=>mutateDim(d=>{d.couleur=e.target.value})}/>
//           <label>Icon</label>
//           <input className="border-2 border-blue px-2 py-1 w-40"
//             value={dim.icon}
//             onChange={e=>mutateDim(d=>{d.icon=e.target.value})}/>
//           {IconCmp && <IconCmp size={18}/>}

//           <button onClick={()=>setConfirmOpen(true)}
//             className="ml-auto flex items-center gap-1 px-2 py-1 border rounded text-critical text-sm">
//             <TrashSimple size={14}/> Supprimer
//           </button>
//         </div>
//       )}

//       <ConfirmationDialog
//         isOpen={confirmOpen}
//         onClose={()=>setConfirmOpen(false)}
//         onConfirm={()=>{setTool(p=>{
//           const c=structuredClone(p); c.dimensions.splice(dimIdx,1); return c
//         }); setIdx(i=>Math.max(0,i-1)); setConfirmOpen(false); setView('q')}}
//         title="Supprimer la dimension"
//         message="Cette action retirera définitivement la dimension et toutes ses données."
//       />

//       {/* onglets centre (masqués en g) ---------------------------- */}
//       {view!=='g' && (
//         <div className="flex gap-4 justify-center">
//           <button onClick={()=>setView('q')}
//             className={`px-4 py-1 rounded ${view==='q'?'bg-blue text-white':'border'}`}>Évaluation</button>
//           <button onClick={()=>setView('r')}
//             className={`px-4 py-1 rounded ${view==='r'?'bg-blue text-white':'border'}`}>Résultats</button>
//         </div>
//       )}

//       {view==='g' && (
//         <div>      <button onClick={()=>location.reload()}
//             className="px-4 py-2 border-2 border-blue text-blue bg-white rounded
//                        hover:bg-blue hover:text-white text-sm">
//             <ArrowLeft size={16}/> Retour
//           </button><h2 className="text-center text-2xl font-semibold text-blue">Index&nbsp;Global</h2></div>
        
//       )}

//       {/* ----------------- tables ------------------------------- */}
      // {view==='q' && (
      //     <div className="overflow-x-auto">
      //       <table className="min-w-full border-collapse text-sm">
      //         <thead>
      //           <tr style={headerStyle} className="text-white">
      //             <th className="border p-2">Dimension</th>
      //             <th className="border p-2">Descriptif</th>
      //             <th className="border p-2">Capacité</th>
      //             <th className="border p-2 w-[28rem]">Sous-capacités</th>
      //           </tr>
      //         </thead>
      //         <tbody>
      //           {dim.descriptives.map((desc,di)=>
      //             desc.capacities.map((cap,ci)=>(
      //               <tr key={`${di}-${ci}`} className="odd:bg-surface">
      //                 {/* dimension rowspan */}
      //                 {di===0&&ci===0&&(
      //                   <td rowSpan={dim.descriptives.reduce((n,d)=>n+d.capacities.length,0)}
      //                       style={headerStyle} className="border p-0">
      //                     <input
      //                       className="w-full h-full px-2 py-1 text-white font-semibold bg-transparent outline-none"
      //                       value={dim.name}
      //                       onChange={e=>mutateDim(d=>{d.name=e.target.value})}/>
      //                   </td>
      //                 )}

      //                 {/* descriptif rowspan */}
      //                 {ci===0&&(
      //                   <td rowSpan={desc.capacities.length} className="border p-2">
      //                     <input
      //                       className="w-full border px-2 py-1"
      //                       value={desc.name}
      //                       onChange={e=>mutateDim(d=>{d.descriptives[di].name=e.target.value})}/>
      //                   </td>
      //                 )}

      //                 {/* capacité */}
      //                 <td className="border p-2">
      //                   <div className="flex gap-2">
      //                     <input
      //                       className="flex-1 border px-2 py-1"
      //                       value={cap.capacite}
      //                       onChange={e=>mutateDim(d=>{
      //                         d.descriptives[di].capacities[ci].capacite=e.target.value
      //                       })}/>
      //                     <button title="Supprimer capacité"
      //                       onClick={()=>mutateDim(d=>{
      //                         d.descriptives[di].capacities.splice(ci,1)
      //                       })}
      //                       className="border p-1 rounded text-critical">
      //                       <Trash size={14}/>
      //                     </button>
      //                   </div>
      //                 </td>

      //                 {/* sous-capacités */}
      //                 <td className="border p-2">
      //                   <div className="flex flex-col gap-2">
      //                     {cap.description.map((line,li)=>(
      //                       <div key={li} className="flex gap-2">
      //                         <AT className="flex-1 border px-2 py-1"
      //                             value={line}
      //                             onChange={e=>mutateDim(d=>{
      //                               d.descriptives[di].capacities[ci].description[li]=e.target.value
      //                             })}/>
      //                         <button
      //                           title="Supprimer ligne"
      //                           onClick={()=>mutateDim(d=>{
      //                             d.descriptives[di].capacities[ci].description.splice(li,1)
      //                           })}
      //                           className="border p-1 rounded text-critical">
      //                           <Trash size={14}/>
      //                         </button>
      //                       </div>
      //                     ))}
      //                     <button
      //                       onClick={()=>mutateDim(d=>{
      //                         d.descriptives[di].capacities[ci].description.push('')
      //                       })}
      //                       className="text-blue text-xs flex items-center gap-1">
      //                       <Plus size={12}/> Ajouter
      //                     </button>
      //                   </div>
      //                 </td>
      //               </tr>
      //             ))
      //           )}
      //           {/* add capacité */}
      //           <tr>
      //             <td colSpan={4} className="border p-2 text-center">
      //               <button
      //                 onClick={()=>mutateDim(d=>{
      //                   const first=d.descriptives[0]??{name:'',capacities:[]}
      //                   if(d.descriptives.length===0) d.descriptives.push(first)
      //                   first.capacities.push({capacite:'',description:[]})
      //                 })}
      //                 className="text-blue text-sm flex items-center gap-1 mx-auto">
      //                 <Plus size={14}/> Ajouter une capacité
      //               </button>
      //             </td>
      //           </tr>
      //         </tbody>
      //       </table>
      //     </div>
      //   )}

//       {view==='r' && (
//         <LevelsTable
//           levels={dim.levels}
//           onChange={lv=>mutateDim(d=>{d.levels=lv})}
//           headerStyle={headerStyle}
//           showMotif={true}
//         />
//       )}

//       {view==='g' && (
//         <LevelsTable
//           levels={tool.Index_G}
//           onChange={mutateIndexG}
//           headerStyle={blueHead}
//           showMotif={false}
//         />
//       )}

//       {/* ---------------- footer ------------------------------- */}
//       {view!=='g' ? (
//         <div className="flex items-center gap-3">
//           <button onClick={()=>setIdx(i=>i-1)} disabled={dimIdx===0}
//             className="px-4 py-2 border-2 border-blue text-blue bg-white rounded
//                        hover:bg-blue hover:text-white text-sm disabled:opacity-40">
//             <ArrowLeft size={16}/> Précédent
//           </button>
//           <button onClick={()=>setIdx(i=>i+1)} disabled={dimIdx===dims.length-1}
//             className="px-4 py-2 border-2 border-blue text-blue bg-white rounded
//                        hover:bg-blue hover:text-white text-sm disabled:opacity-40">
//             Suivant <ArrowRight size={16}/>
//           </button>
//           <button onClick={saveJSON}
//             className="ml-auto px-4 py-2 rounded bg-blue text-white text-sm">
//             Mettre à jour
//           </button>
//         </div>
//       ) : (
//         /* footer spécial Index Global : retour + mise à jour */
//         <div className="flex gap-3 justify-end">
     
//           <button onClick={saveJSON}
//             className="px-4 py-2 rounded bg-blue text-white text-sm">
//             Mettre à jour
//           </button>
//         </div>
//       )}

//     </div>
//   </div>
// )}
/* ------------------------------------------------------------------ */
/*  pages/app/(admin)/outils_maturite_ia/page.tsx                      */
/* ------------------------------------------------------------------ */
'use client'

import React, { useEffect, useRef, useState, CSSProperties } from 'react'
import dynamic        from 'next/dynamic'
import * as PI        from '@phosphor-icons/react'
import {
  ArrowLeft, ArrowRight, Gauge, MinusCircle, Plus, PlusCircle,
  Trash, TrashSimple, Check
} from '@phosphor-icons/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ConfirmationDialog from '@/components/Admin/ConfirmationDialog'

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
interface Capacity   { capacite: string; description: string[] }
interface Descriptive{ name: string; capacities: Capacity[] }
interface Level      { min: number; max: number; niveau: string;
                       resume_niveau: string; motif: string; description: string }
interface Dimension  { name: string; couleur: string; icon: string;
                       descriptives: Descriptive[]; levels: Level[] }
interface Tool       { title: string; dimensions: Dimension[]; Index_G: Level[] }

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */
const blue       = '#2563eb'
const blueHead:CSSProperties = { backgroundColor: blue }

const defaultLevels = ():Level[] => [
  { min:0,  max:21,  niveau:'Niveau 1', resume_niveau:'', motif:'', description:'' },
  { min:21, max:40,  niveau:'Niveau 2', resume_niveau:'', motif:'', description:'' },
  { min:41, max:60,  niveau:'Niveau 3', resume_niveau:'', motif:'', description:'' },
  { min:61, max:80,  niveau:'Niveau 4', resume_niveau:'', motif:'', description:'' },
  { min:81, max:100, niveau:'Niveau 5', resume_niveau:'', motif:'', description:'' }
]
const blankDimension = ():Dimension => ({
  name:'Nouvelle dimension',
  couleur: blue,
  icon:'SquaresFour',
  descriptives:[{ name:'', capacities:[{ capacite:'', description:[] }] }],
  levels: defaultLevels()
})

/* autosize pour <textarea> ----------------------------------------- */
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
const AT = (p:React.TextareaHTMLAttributes<HTMLTextAreaElement>&{value:string})=>{
  const ref = useAutosize(p.value)
  return <textarea ref={ref} {...p}
    className={(p.className??'')+
      ' text-sm whitespace-pre-line break-words resize-none leading-relaxed'}/>
}

/* ------------------------------------------------------------------ */
/* Tableau “Levels”  (éditable)                                       */
/* ------------------------------------------------------------------ */
function LevelsTable({levels,onChange,headerStyle,showMotif}:{
  levels:Level[]
  onChange:(l:Level[])=>void
  headerStyle:CSSProperties
  showMotif:boolean
}){
  /* add / remove -------------------------------------------------- */
  const addLevel = ()=>{
    onChange([
      ...levels,
      { min:0,max:0,niveau:`Niveau ${levels.length+1}`,
        resume_niveau:'',motif:'',description:'' }
    ])
  }
  const deleteLevel = (idx:number)=>{
    if(levels.length<=1) return
    const v=[...levels]; v.splice(idx,1); onChange(v)
  }

  return(
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr style={headerStyle} className="text-white whitespace-nowrap">
            <th className="border p-2">Champ</th>
            {levels.map((l,i)=>(

              <th key={i} className="border p-2 relative">
                <input
                  className="w-full bg-transparent text-white font-semibold outline-none text-center"
                  value={l.niveau}
                  onChange={e=>{
                    const v=[...levels]; v[i].niveau=e.target.value; onChange(v)
                  }}/>
                {levels.length>1 && (
                  <button
                    onClick={()=>deleteLevel(i)}
                    className="absolute -top-1 -right-1">
                    <MinusCircle size={16} weight="fill" color="#FFFFFF"/>
                  </button>
                )}
              </th>
            ))}
            <th className="border p-2 w-10 text-center">
              <button onClick={addLevel}>
                <PlusCircle size={16}/>
              </button>
            </th>
          </tr>
        </thead>

        <tbody className="odd:bg-surface">
          {/* Min–Max ------------------------------------------------- */}
          <tr>
            <td className="border p-2 font-semibold">Min – Max</td>
            {levels.map((lv,i)=>(
              <td key={i} className="border p-2">
                <div className="flex gap-1 items-center">
                  <input type="number" className="w-14 border px-1"
                    value={lv.min}
                    onChange={e=>{
                      const v=[...levels]; v[i].min=+e.target.value||0; onChange(v)
                    }}/>
                  —
                  <input type="number" className="w-14 border px-1"
                    value={lv.max}
                    onChange={e=>{
                      const v=[...levels]; v[i].max=+e.target.value||0; onChange(v)
                    }}/>
                </div>
              </td>
            ))}
          </tr>

          {/* Autres champs ------------------------------------------ */}
          {['resume_niveau', ...(showMotif?['motif']:[]), 'description'].map(field=>(
            <tr key={field}>
              <td className="border p-2 font-semibold capitalize">
                {field.replace('_',' ')}
              </td>
              {levels.map((lv,i)=>(
                <td key={i} className="border p-2">
                  {field==='description'
                    ? <AT className="w-full border px-2 py-1 min-h-[3rem] max-h-32"
                          value={lv.description}
                          onChange={e=>{
                            const v=[...levels]; v[i].description=e.target.value; onChange(v)
                          }}/>
                    : <input className="w-full border px-2 py-1"
                          value={lv[field as keyof Level] as string}
                          onChange={e=>{
                            const v=[...levels]
                            ;(v[i] as any)[field]=e.target.value
                            onChange(v)
                          }}/>
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */
export default function AdminMaturiteIA(){

  /* ====== état =================================================== */
  const [tool,setTool] = useState<Tool>({
    title:'Évaluation de la maturité en IA',
    dimensions:[],
    Index_G: defaultLevels()
  })
  const [dimIdx,setIdx]    = useState(0)
  const [view,setView]     = useState<'q'|'r'|'g'>('q')
  const [confirmOpen,setConfirmOpen] = useState(false)
  const [loading,setLoading] = useState(true)     // spinner

  /* ====== chargement JSON ======================================= */
  useEffect(()=>{
    fetch('/dataApi/tools/maturite-ia.json')
      .then(r=>r.ok?r.json():null)
      .then((d:Tool|null)=>{ if(d) setTool(d) })
      .finally(()=>setLoading(false))
  },[])

  /* ====== helpers mutateurs ===================================== */
  const dims = tool.dimensions
  const dim  = dims[dimIdx] ?? blankDimension()

  const mutateDim=(fn:(d:Dimension)=>void)=>
    setTool(p=>{const c=structuredClone(p); fn(c.dimensions[dimIdx]); return c})
  const mutateIndexG=(lv:Level[])=>setTool(p=>({...p,Index_G:lv}))

  /* ====== sauvegarde JSON ======================================= */
  const saveJSON = async ()=>{
    const res = await fetch('/api/admin/tools',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({slug:'maturite-ia',data:tool})
    })
    if(res.ok) toast.success('La sauvegarde a été effectuée avec succès  🎉')
    else       toast.error('Erreur de sauvegarde')
  }

  /* ====== loader spinner ======================================== */
  if(loading){
    return(
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue rounded-full
                        border-t-transparent animate-spin"/>
      </div>
    )
  }

  /* ====== rendu ================================================== */
  const IconCmp = (PI as any)[dim.icon] as any
  const headerStyle = view==='g' ? blueHead : { backgroundColor: dim.couleur }

  return(
  <div className="max-w-6xl mx-auto p-4">
    {/* Toast global */}
    <ToastContainer position="top-right" autoClose={2000} theme="colored"/>

    <div className="bg-white border shadow-md rounded-lg p-6 space-y-6">

      <h1 className="text-xl font-semibold">{tool.title}</h1>

      {/* Wizard + bouton Index (caché en g) ---------------------- */}
      {view!=='g' && (
        <div className="flex flex-wrap gap-2">
          {dims.map((d,i)=>{
            const Ico=(PI as any)[d.icon] as any
            return(
              <button key={i}
                onClick={()=>{setIdx(i); setView('q')}}
                style={{backgroundColor:d.couleur}}
                className={`px-3 py-1 rounded-full text-white text-sm flex items-center gap-1 ${
                  i!==dimIdx&&'opacity-60'}`}>
                {Ico ? <Ico size={12}/> : <Check size={12}/>} {d.name}
              </button>
            )
          })}
          {/* + dimension */}
          <button onClick={()=>{
                    setTool(p=>({...p,dimensions:[...p.dimensions,blankDimension()]}))
                    setIdx(dims.length); setView('q')
                  }}
            className="flex items-center gap-1 px-3 py-1 border rounded-full text-sm">
            <PlusCircle size={14}/> Ajouter
          </button>
          {/* Index global */}
          <button onClick={()=>setView('g')}
            className="ml-auto flex items-center gap-1 bg-blue text-white px-4 py-1 rounded">
            <Gauge size={16}/> Index Global
          </button>
        </div>
      )}

      <div className="border-t my-2"/>

      {/* Métadonnées (cachées en g) ----------------------------- */}
      {view!=='g' && (
        <div className="flex flex-wrap items-center gap-3 text-sm border-b pb-3">
          <label>Nom</label>
          <input className="border-2 border-blue px-2 py-1 w-48"
            value={dim.name}
            onChange={e=>mutateDim(d=>{d.name=e.target.value})}/>
          <label>Couleur</label>
          <input type="color" className="w-10 h-8 border p-0"
            value={dim.couleur}
            onChange={e=>mutateDim(d=>{d.couleur=e.target.value})}/>
          <label>Icon</label>
          <input className="border-2 border-blue px-2 py-1 w-40"
            value={dim.icon}
            onChange={e=>mutateDim(d=>{d.icon=e.target.value})}/>
          {IconCmp && <IconCmp size={18}/>}

          <button onClick={()=>setConfirmOpen(true)}
            className="ml-auto flex items-center gap-1 px-2 py-1 border rounded text-critical text-sm">
            <TrashSimple size={14}/> Supprimer
          </button>
        </div>
      )}

      <ConfirmationDialog
        isOpen={confirmOpen}
        onClose={()=>setConfirmOpen(false)}
        onConfirm={()=>{setTool(p=>{
          const c=structuredClone(p); c.dimensions.splice(dimIdx,1); return c
        }); setIdx(i=>Math.max(0,i-1)); setConfirmOpen(false); setView('q')}}
        title="Supprimer la dimension"
        message="Cette action retirera définitivement la dimension et toutes ses données."
      />

      {/* Onglets (cachés en g) ---------------------------------- */}
      {view!=='g' && (
        <div className="flex gap-4 justify-center">
          <button onClick={()=>setView('q')}
            className={`px-4 py-1 rounded ${view==='q'?'bg-blue text-white':'border'}`}>Évaluation</button>
          <button onClick={()=>setView('r')}
            className={`px-4 py-1 rounded ${view==='r'?'bg-blue text-white':'border'}`}>Résultats</button>
        </div>
      )}

      {/* Titre & bouton retour en g ----------------------------- */}
      {view==='g' && (
        <div className="flex items-center gap-4">
          <button onClick={()=>location.reload()}
            className="px-4 py-2 border-2 border-blue text-blue bg-white rounded
                       hover:bg-blue hover:text-white text-sm">
            <ArrowLeft size={16}/> Retour
          </button>
          <h2 className="flex-1 text-center text-2xl font-semibold text-blue">Index&nbsp;Global</h2>
        </div>
      )}

      {/* =================== TABLES ============================ */}
  
      {view==='q' && ( <React.Fragment>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr style={headerStyle} className="text-white">
                  <th className="border p-2">Dimension</th>
                  <th className="border p-2">Descriptif</th>
                  <th className="border p-2">Capacité</th>
                  <th className="border p-2 w-[28rem]">Desc-Sous-capacités</th>
                </tr>
              </thead>
              <tbody>
                {dim.descriptives.map((desc,di)=>
                  desc.capacities.map((cap,ci)=>(
                    <tr key={`${di}-${ci}`} className="odd:bg-surface">
                      {/* dimension rowspan */}
                      {di===0&&ci===0&&(
                        <td rowSpan={dim.descriptives.reduce((n,d)=>n+d.capacities.length,0)}
                            style={headerStyle} className="border p-0">
                          <input
                            className="w-full h-full px-2 py-1 text-white font-semibold bg-transparent outline-none"
                            value={dim.name}
                            onChange={e=>mutateDim(d=>{d.name=e.target.value})}/>
                        </td>
                      )}

                      {/* descriptif rowspan */}
                      {ci===0&&(
                        <td rowSpan={desc.capacities.length} className="border p-2">
                          <input
                            className="w-full border px-2 py-1"
                            value={desc.name}
                            onChange={e=>mutateDim(d=>{d.descriptives[di].name=e.target.value})}/>
                        </td>
                      )}

                      {/* capacité */}
                      <td className="border p-2">
                        <div className="flex gap-2">
                          <input
                            className="flex-1 border px-2 py-1"
                            value={cap.capacite}
                            onChange={e=>mutateDim(d=>{
                              d.descriptives[di].capacities[ci].capacite=e.target.value
                            })}/>
                          <button title="Supprimer capacité"
                            onClick={()=>mutateDim(d=>{
                              d.descriptives[di].capacities.splice(ci,1)
                            })}
                            className="border p-1 rounded text-critical">
                            <Trash size={14}/>
                          </button>
                        </div>
                      </td>

                      {/* sous-capacités */}
                      <td className="border p-2">
                        <div className="flex flex-col gap-2">
                          {cap.description.map((line,li)=>(
                            <div key={li} className="flex gap-2">
                              <AT className="flex-1 border px-2 py-1"
                                  value={line}
                                  onChange={e=>mutateDim(d=>{
                                    d.descriptives[di].capacities[ci].description[li]=e.target.value
                                  })}/>
                              <button
                                title="Supprimer ligne"
                                onClick={()=>mutateDim(d=>{
                                  d.descriptives[di].capacities[ci].description.splice(li,1)
                                })}
                                className="border p-1 rounded text-critical">
                                <Trash size={14}/>
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={()=>mutateDim(d=>{
                              d.descriptives[di].capacities[ci].description.push('')
                            })}
                            className="text-blue text-xs flex items-center gap-1">
                            <Plus size={12}/> Ajouter
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
                {/* add capacité */}
                <tr>
                  <td colSpan={4} className="border p-2 text-center">
                    <button
                      onClick={()=>mutateDim(d=>{
                        const first=d.descriptives[0]??{name:'',capacities:[]}
                        if(d.descriptives.length===0) d.descriptives.push(first)
                        first.capacities.push({capacite:'',description:[]})
                      })}
                      className="text-blue text-sm flex items-center gap-1 mx-auto">
                      <Plus size={14}/> Ajouter une capacité
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div></React.Fragment>
        )}

      {view==='r' && (
        <LevelsTable
          levels={dim.levels}
          onChange={lv=>mutateDim(d=>{d.levels=lv})}
          headerStyle={headerStyle}
          showMotif={true}
        />
      )}

      {view==='g' && (
        <LevelsTable
          levels={tool.Index_G}
          onChange={mutateIndexG}
          headerStyle={blueHead}
          showMotif={false}
        />
      )}

      {/* =================== FOOTER ============================ */}
      {view!=='g' ? (
        <div className="flex items-center gap-3">
          <button onClick={()=>setIdx(i=>i-1)} disabled={dimIdx===0}
            className="px-4 py-2 border-2 border-blue text-blue bg-white rounded
                       hover:bg-blue hover:text-white text-sm disabled:opacity-40">
            <ArrowLeft size={16}/> Précédent
          </button>

          <button onClick={()=>setIdx(i=>i+1)} disabled={dimIdx===dims.length-1}
            className="px-4 py-2 border-2 border-blue text-blue bg-white rounded
                       hover:bg-blue hover:text-white text-sm disabled:opacity-40">
            Suivant <ArrowRight size={16}/>
          </button>

          <button onClick={saveJSON}
            className="ml-auto px-4 py-2 rounded bg-blue text-white text-sm">
            Mettre à jour
          </button>
        </div>
      ) : (
        <div className="flex justify-end">
          <button onClick={saveJSON}
            className="px-4 py-2 rounded bg-blue text-white text-sm">
            Mettre à jour
          </button>
        </div>
      )}

    </div>
  </div>
)}
