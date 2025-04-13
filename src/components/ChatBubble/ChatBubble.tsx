// // src/components/ChatBubble.tsx
// 'use client'

// import { useState, useEffect, useRef, FormEvent } from 'react'
// import * as Icon from "@phosphor-icons/react"
// import { motion, AnimatePresence } from 'framer-motion'

// // Interface Message (inchangée)
// interface Message {
//   role: 'user' | 'assistant'
//   content: string
// }

// // --- Variantes d'Animation Framer Motion ---

// // Pour le bouton flottant principal
// const bubbleVariants = {
//   initial: { opacity: 0, scale: 0.5 },
//   animate: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
//   hover: { scale: 1.15, transition: { type: 'spring', stiffness: 400, damping: 15 } },
//   tap: { scale: 0.9 }
// };

// // Pour la fenêtre de chat
// const chatWindowVariants = {
//   hidden: { opacity: 0, y: 50, scale: 0.95 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { type: "spring", stiffness: 260, damping: 25, when: "beforeChildren", staggerChildren: 0.05 }
//   },
//   exit: {
//     opacity: 0,
//     y: 30,
//     scale: 0.95,
//     transition: { duration: 0.2, ease: "easeOut" }
//   }
// };

// // Pour l'apparition des messages
// const messageItemVariants = {
//   hidden: (role: string) => ({
//     opacity: 0,
//     x: role === 'user' ? 40 : -40,
//     scale: 0.9,
//   }),
//   visible: {
//     opacity: 1,
//     x: 0,
//     scale: 1,
//     transition: { type: "spring", stiffness: 400, damping: 25 }
//   }
// };

// export default function ChatBubble() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [message, setMessage] = useState('');
//   const [chatHistory, setChatHistory] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [threadId, setThreadId] = useState<string | null>(null);
//   // Optionnel: stocker l'ID de l'assistant pour affichage/debug
//   const [currentAssistantId, setCurrentAssistantId] = useState<string | null>(null);

//   const chatWindowRef = useRef<HTMLDivElement>(null); // Référence pour la fenêtre modale
//   const messagesEndRef = useRef<HTMLDivElement>(null); // Pour le défilement
//   const bubbleButtonRef = useRef<HTMLButtonElement>(null); // Référence pour le bouton flottant

//   // --- Logique de Gestion ---

//   // Fermer le chat en cliquant à l'extérieur
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         isOpen &&
//         chatWindowRef.current &&
//         !chatWindowRef.current.contains(event.target as Node) &&
//         bubbleButtonRef.current && // S'assurer que le clic n'est pas sur le bouton d'ouverture non plus
//         !bubbleButtonRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen]); // Dépend de l'état isOpen

//   // Faire défiler vers le bas pour les nouveaux messages
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [chatHistory, isLoading]); // Déclencher aussi pendant le chargement

//   // Soumission du message (logique API inchangée)
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     const trimmedMessage = message.trim();
//     if (!trimmedMessage || isLoading) return;

//     setError(null);
//     const newMessage: Message = { role: 'user', content: trimmedMessage };
//     setChatHistory(prev => [...prev, newMessage]);
//     setMessage('');
//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: trimmedMessage, threadId: threadId }),
//       });
//       const data = await response.json();

//       if (!response.ok || data.error) {
//         throw new Error(data.error || `Server error (${response.status})`);
//       }

//       if (data.threadId) setThreadId(data.threadId);
//       if (data.assistantId) setCurrentAssistantId(data.assistantId);

//       setChatHistory(prev => [...prev, { role: 'assistant', content: data.response }]);
//     } catch (err: any) {
//       console.error('Chat submission error:', err);
//       setError(err.message || 'An error occurred. Please try again.');
//       // Optionnel: ne pas effacer le message de l'utilisateur en cas d'erreur
//       // setChatHistory(prev => prev.slice(0, -1)); // Enlève le message user de l'UI
//       // setMessage(trimmedMessage); // Remet le message dans l'input
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // --- Rendu JSX ---
//   return (
//     <>
//       {/* Conteneur Fixe pour le bouton et la fenêtre */}
//       <div className="fixed bottom-5 right-5 z-[9998] flex flex-col items-end">

//         {/* Fenêtre de Chat Modale */}
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               ref={chatWindowRef}
//               variants={chatWindowVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="mb-4 w-[calc(100vw-40px)] sm:w-[380px] max-h-[70vh] bg-white rounded-xl shadow-2xl border border-line overflow-hidden flex flex-col"
//             >
//               {/* En-tête du Chat */}
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 }}
//                 className="flex items-center justify-between p-4 bg-blue text-white sticky top-0 z-10"
//               >
//                 <div className="flex items-center gap-2">
//                   <Icon.Robot weight="fill" className="w-6 h-6" />
//                   <h3 className="text-lg font-semibold">Assistant AI</h3>
//                 </div>
//                 <motion.button
//                   onClick={() => setIsOpen(false)}
//                   className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
//                   aria-label="Fermer le chat"
//                   whileHover={{ scale: 1.1, rotate: 90 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <Icon.X weight="bold" className="w-5 h-5" />
//                 </motion.button>
//               </motion.div>

//               {/* Zone des Messages */}
//               <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
//                 {chatHistory.map((msg, index) => (
//                   <motion.div
//                     key={`${msg.role}-${index}`} // Clé plus spécifique
//                     custom={msg.role}
//                     variants={messageItemVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
//                   >
//                     <div
//                       className={`inline-block py-2 px-4 rounded-xl max-w-[85%] shadow-sm ${
//                         msg.role === 'user'
//                           ? 'bg-blue text-white rounded-br-none' // Style utilisateur
//                           : 'bg-surface text-black rounded-bl-none' // Style assistant
//                       }`}
//                     >
//                       {/* Gestion basique des sauts de ligne */}
//                       {msg.content.split('\n').map((line, i, arr) => (
//                         <span key={i}>
//                           {line}
//                           {i < arr.length - 1 && <br />}
//                         </span>
//                       ))}
//                     </div>
//                   </motion.div>
//                 ))}

//                 {/* Indicateur de Chargement */}
//                 {isLoading && (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.7 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="flex justify-start"
//                   >
//                     <div className="py-2 px-4 rounded-xl rounded-bl-none bg-surface text-black shadow-sm">
//                       <motion.div
//                          className="flex items-center gap-2"
//                          initial="start"
//                          animate="end"
//                          variants={{
//                             start: { transition: { staggerChildren: 0.15 } },
//                             end: { transition: { staggerChildren: 0.15 } }
//                          }}
//                       >
//                          {[...Array(3)].map((_, i) => (
//                            <motion.div
//                              key={i}
//                              className="w-2 h-2 bg-secondary rounded-full"
//                              variants={{
//                                start: { y: "0%", opacity: 0.5 },
//                                end: { y: ["0%", "-50%", "0%"], opacity: [0.5, 1, 0.5] }
//                              }}
//                              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
//                            />
//                          ))}
//                       </motion.div>
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* Message d'Erreur */}
//                 {error && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="p-3 rounded-lg bg-critical/10 text-critical text-sm border border-critical/30" // Utilise couleur critique
//                   >
//                     <Icon.WarningCircle weight="bold" className="inline w-4 h-4 mr-1 mb-0.5" />
//                     {error}
//                   </motion.div>
//                 )}

//                 {/* Div pour le scroll */}
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Zone de Saisie */}
//               <motion.form
//                 onSubmit={handleSubmit}
//                 className="p-4 border-t border-line bg-surface sticky bottom-0 z-10"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <div className="flex items-center gap-3">
//                   <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Votre message..."
//                     disabled={isLoading}
//                     className="flex-1 px-4 py-2 rounded-full border border-line bg-white focus:outline-none focus:ring-2 focus:ring-blue/50 focus:border-blue text-black placeholder-placehover disabled:opacity-60"
//                     autoComplete="off"
//                     onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) handleSubmit(e as any); }}
//                   />
//                   <motion.button
//                     type="submit"
//                     disabled={isLoading || !message.trim()}
//                     className="flex-shrink-0 bg-blue text-white p-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
//                     whileHover={isLoading || !message.trim() ? {} : { scale: 1.1 }}
//                     whileTap={isLoading || !message.trim() ? {} : { scale: 0.9 }}
//                     aria-label="Envoyer le message"
//                   >
//                     <Icon.PaperPlaneRight weight="fill" className="w-5 h-5" />
//                   </motion.button>
//                 </div>
//               </motion.form>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Bouton Flottant Principal (Robot) */}
//         <motion.button
//           ref={bubbleButtonRef}
//           variants={bubbleVariants}
//           initial="initial"
//           animate="animate"
//           whileHover="hover"
//           whileTap="tap"
//           onClick={() => setIsOpen(!isOpen)}
//           className={`bg-blue text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 ease-out ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
//           aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
//           style={{ pointerEvents: isOpen ? 'none' : 'auto' }} // Désactive le bouton quand ouvert
//         >
//            {/* L'icône Robot est toujours présente mais le bouton disparaît */}
//            <Icon.Robot weight="fill" className="w-7 h-7" />
//         </motion.button>

//       </div>
//     </>
//   );
// }





// src/components/ChatBubble.tsx
'use client'

import React, { useState, useEffect, useRef, FormEvent, KeyboardEvent, ChangeEvent } from 'react'
import * as Icon from "@phosphor-icons/react"
import { motion, AnimatePresence } from 'framer-motion'

// Interface Message (inchangée)
interface Message {
  role: 'user' | 'assistant'
  content: string
}

// --- Variantes d'Animation Framer Motion ---
// Pour le bouton flottant principal
const bubbleVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
  hover: { scale: 1.15, transition: { type: 'spring', stiffness: 400, damping: 15 } },
  tap: { scale: 0.9 }
};

// Pour la fenêtre de chat (simplifié, la taille est gérée par les classes + transitions)
const chatWindowVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 30, when: "beforeChildren", staggerChildren: 0.05 }
  },
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

// Pour l'apparition des messages
const messageItemVariants = {
  hidden: (role: string) => ({
    opacity: 0,
    x: role === 'user' ? 40 : -40,
    scale: 0.9,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  }
};


export default function ChatBubble() {
  // --- États ---
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [currentAssistantId, setCurrentAssistantId] = useState<string | null>(null);
  // Nouvel état pour la taille agrandie/réduite
  const [isExpanded, setIsExpanded] = useState(false);

  // --- Références ---
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const bubbleButtonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // --- Effets ---

  // Fermer au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ( isOpen && chatWindowRef.current && !chatWindowRef.current.contains(event.target as Node) &&
           bubbleButtonRef.current && !bubbleButtonRef.current.contains(event.target as Node) ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Scroll vers le bas
  useEffect(() => {
    // Scroll un peu plus bas pour mieux voir le dernier message, surtout après chargement
    setTimeout(() => {
       messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100);
  }, [chatHistory, isLoading]); // Déclencher aussi pendant/après le chargement

  // Réinitialiser l'état d'expansion lorsque le chat se ferme
   useEffect(() => {
    if (!isOpen) {
      setIsExpanded(false);
    }
  }, [isOpen]);


  // --- Gestionnaires d'Événements ---

  // Ajustement automatique de la hauteur du textarea
  const handleTextareaInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    // Hauteur max (ex: ~6 lignes)
    const maxHeight = 6 * 1.5 * 16; // 6 lignes * line-height * font-size (approx)
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
  };

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    handleTextareaInput(event);
  };

  // Gérer la touche Entrée
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  // Soumission du message
  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) return;

    setError(null);
    const newMessage: Message = { role: 'user', content: trimmedMessage };
    setChatHistory(prev => [...prev, newMessage]);
    setMessage('');
    setIsLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.overflowY = 'hidden';
      textareaRef.current.value = ''; // Vider explicitement aussi
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedMessage, threadId: threadId }),
      });
      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || `Server error (${response.status})`);
      }
      if (data.threadId) setThreadId(data.threadId);
      if (data.assistantId) setCurrentAssistantId(data.assistantId);
      setChatHistory(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (err: any) {
      console.error('Chat submission error:', err);
      setError(err.message || 'An error occurred. Please try again.');
      setChatHistory(prev => prev.slice(0,-1)); // Enlève msg user de l'UI
      setMessage(trimmedMessage); // Remet msg dans l'input
      if (textareaRef.current) { // Réajuste hauteur
         handleTextareaInput({ target: textareaRef.current } as ChangeEvent<HTMLTextAreaElement>);
      }
    } finally {
      setIsLoading(false);
      textareaRef.current?.focus();
    }
  };

  // --- Rendu JSX ---
  return (
    <>
      {/* Conteneur Fixe */}
      <div className="fixed bottom-5 right-5 z-[9998] flex flex-col items-end">

        {/* Fenêtre de Chat Modale */}
        <AnimatePresence>
          {isOpen && (
            // Ajout de `transition-[width,max-height]` pour animer les changements de taille
            <motion.div
              ref={chatWindowRef}
              variants={chatWindowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              // Classes conditionnelles pour la taille + transition
              className={`mb-4 bg-white rounded-xl shadow-2xl border border-line overflow-hidden flex flex-col transition-[width,max-height] duration-300 ease-in-out ${
                isExpanded
                  ? 'w-[calc(100vw-32px)] sm:w-[550px] md:w-[650px] lg:w-[750px] max-h-[88vh]' // Taille Agrandie
                  : 'w-[calc(100vw-32px)] sm:w-[420px] md:w-[460px] lg:w-[500px] max-h-[78vh]' // Taille Normale (un peu plus grande qu'avant)
              }`}
            >
              {/* En-tête */}
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="flex items-center justify-between p-4 bg-blue text-white sticky top-0 z-10 flex-shrink-0" // flex-shrink-0
              >
                <div className="flex items-center gap-3"> {/* Gap augmenté */}
                  <Icon.Robot weight="fill" className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">Assistant AI</h3>
                </div>
                {/* Boutons d'action dans l'en-tête */}
                <div className="flex items-center gap-2">
                    {/* Bouton Agrandir/Réduire */}
                    <motion.button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
                      aria-label={isExpanded ? "Réduire la fenêtre" : "Agrandir la fenêtre"}
                      whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                    >
                      {isExpanded ? (
                        <Icon.ArrowsInSimple weight="bold" className="w-5 h-5" />
                      ) : (
                        <Icon.ArrowsOutSimple weight="bold" className="w-5 h-5" />
                      )}
                    </motion.button>

                    {/* Bouton Fermer */}
                    <motion.button
                      onClick={() => setIsOpen(false)}
                      className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
                      aria-label="Fermer le chat"
                      whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                    >
                      <Icon.X weight="bold" className="w-5 h-5" />
                    </motion.button>
                </div>
              </motion.div>

              {/* Zone des Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white min-h-[65vh]">

                {/* --- Message d'Accueil --- */}
                {!isLoading && chatHistory.length === 0 && !error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center text-secondary p-8 flex flex-col items-center justify-center h-full"
                  >
                    <Icon.Sparkle weight="duotone" className="w-12 h-12 mb-4 text-blue" />
                    <p className="text-lg font-medium text-black mb-1">Welcome!</p>
                    <p className="text-sm max-w-xs">m here to help. Ask me anything or tell me what you need assistance with.</p>
                  </motion.div>
                )}
                 {/* --- Fin Message d'Accueil --- */}


                {/* --- Historique des Messages --- */}
                {chatHistory.map((msg, index) => (
                  <motion.div
                    key={`${msg.role}-${index}-${msg.content.substring(0, 10)}`} // Clé plus robuste
                    custom={msg.role}
                    variants={messageItemVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`inline-block py-2 px-4 rounded-xl max-w-[85%] shadow-sm text-sm sm:text-base ${ // Taille texte responsive
                        msg.role === 'user'
                          ? 'bg-blue text-white rounded-br-none'
                          : 'bg-surface text-black rounded-bl-none'
                      }`}
                    >
                      {msg.content.split('\n').map((line, i, arr) => ( <span key={i}> {line} {i < arr.length - 1 && <br />} </span> ))}
                    </div>
                  </motion.div>
                ))}
                 {/* --- Fin Historique --- */}


                {/* Indicateur de Chargement */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-start"
                  >
                    <div className="py-2 px-4 rounded-xl rounded-bl-none bg-surface text-black shadow-sm">
                      <motion.div
                         className="flex items-center gap-2"
                         initial="start"
                         animate="end"
                         variants={{
                            start: { transition: { staggerChildren: 0.15 } },
                            end: { transition: { staggerChildren: 0.15 } }
                         }}
                      >
                         {[...Array(3)].map((_, i) => (
                           <motion.div
                             key={i}
                             className="w-2 h-2 bg-secondary rounded-full"
                             variants={{
                               start: { y: "0%", opacity: 0.5 },
                               end: { y: ["0%", "-50%", "0%"], opacity: [0.5, 1, 0.5] }
                             }}
                             transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                           />
                         ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Message d'Erreur */}
                {error && (
                  <motion.div /* ... (identique à avant) ... */ className="p-3 rounded-lg bg-critical/10 text-critical text-sm border border-critical/30">
                    <Icon.WarningCircle weight="bold" className="inline w-4 h-4 mr-1 mb-0.5" /> {error}
                  </motion.div>
                )}

                {/* Div pour le scroll */}
                <div ref={messagesEndRef} />
              </div>

              {/* Zone de Saisie (légers ajustements padding/gap) */}
              <motion.form
                onSubmit={handleSubmit}
                className="p-3 border-t border-line bg-surface sticky bottom-0 z-10 flex-shrink-0" // flex-shrink-0
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-end gap-2.5"> {/* Gap légèrement augmenté */}
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={handleMessageChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Your message... (Shift+Enter for new line)"
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-line bg-white focus:outline-none focus:ring-2 focus:ring-blue/50 focus:border-blue text-black placeholder-placehover disabled:opacity-60 resize-none overflow-y-hidden text-sm sm:text-base" // Padding vertical ajusté, taille texte
                    rows={1}
                    style={{ height: 'auto' }}
                    aria-label="Message à envoyer"
                  />
                  <motion.button
                    type="submit"
                    disabled={isLoading || !message.trim()}
                    className="flex-shrink-0 bg-blue text-white p-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200 self-end mb-[1px]"
                    whileHover={isLoading || !message.trim() ? {} : { scale: 1.1 }}
                    whileTap={isLoading || !message.trim() ? {} : { scale: 0.9 }}
                    aria-label="Envoyer le message"
                  >
                    <Icon.PaperPlaneRight weight="fill" className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bouton Flottant Principal (Robot - taille déjà augmentée) */}
        <motion.button
          ref={bubbleButtonRef}
          variants={bubbleVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          onClick={() => setIsOpen(!isOpen)}
          className={`bg-blue text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 ease-out ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
          aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
          style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
        >
           <Icon.Robot weight="fill" className="w-8 h-8" />
        </motion.button>

      </div>
    </>
  );
}