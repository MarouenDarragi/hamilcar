// src/app/api/chat/route.ts ou app/api/chat/route.ts
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// 1. Initialisation du client OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Stockage en mémoire simple pour l'ID de l'assistant créé dynamiquement (sera perdu au redémarrage)
let dynamicAssistantId: string | null = null;

// Configuration par défaut pour l'assistant créé dynamiquement
const DEFAULT_ASSISTANT_CONFIG = {
  name: "Assistant Dynamique",
  instructions: "Tu es un assistant conversationnel utile intégré dans une application Next.js. Réponds aux questions de manière concise et amicale.",
  model: "gpt-4o", // Ou un autre modèle comme "gpt-3.5-turbo"
  tools: [] // Ajoutez des outils si nécessaire, ex: [{ type: "code_interpreter" }]
};

// Fonction pour obtenir ou créer l'assistant ID
async function getOrCreateAssistantId(): Promise<string> {
  const envAssistantId = process.env.OPENAI_ASSISTANT_ID;

  if (envAssistantId) {
    console.log(`Utilisation de l'assistant ID depuis .env: ${envAssistantId}`);
    // Optionnel mais recommandé: Vérifier si l'assistant existe réellement
    try {
      await openai.beta.assistants.retrieve(envAssistantId);
      return envAssistantId;
    } catch (error) {
      console.warn(`L'assistant ID ${envAssistantId} fourni dans .env n'a pas été trouvé ou est invalide. Tentative de création d'un nouvel assistant.`);
      // Si l'ID de l'env est invalide, on force la création (plutôt que d'utiliser un ID potentiellement stocké en mémoire)
      dynamicAssistantId = null;
    }
  }

  // Si on arrive ici, soit l'env var est absente, soit elle était invalide
  if (dynamicAssistantId) {
    console.log(`Utilisation de l'assistant ID créé dynamiquement en mémoire: ${dynamicAssistantId}`);
    // Vérifier si cet ID en mémoire existe toujours chez OpenAI
     try {
      await openai.beta.assistants.retrieve(dynamicAssistantId);
      return dynamicAssistantId;
    } catch (error) {
      console.warn(`L'assistant ID en mémoire ${dynamicAssistantId} n'est plus valide. Création d'un nouvel assistant.`);
       dynamicAssistantId = null; // Réinitialiser car invalide
    }
  }


  // Créer un nouvel assistant
  console.log("Aucun ID d'assistant valide trouvé. Création d'un nouvel assistant...");
  try {
    const newAssistant = await openai.beta.assistants.create({
      name: DEFAULT_ASSISTANT_CONFIG.name,
      instructions: DEFAULT_ASSISTANT_CONFIG.instructions,
      model: DEFAULT_ASSISTANT_CONFIG.model,
      tools: DEFAULT_ASSISTANT_CONFIG.tools,
    });
    dynamicAssistantId = newAssistant.id; // Stocker l'ID en mémoire
    console.log(`Nouvel assistant créé avec succès. ID: ${dynamicAssistantId}`);
    console.warn("Cet ID d'assistant n'est pas sauvegardé de manière persistante. Ajoutez-le à votre .env.local (OPENAI_ASSISTANT_ID) pour le réutiliser après un redémarrage du serveur.");
    return dynamicAssistantId;
  } catch (creationError) {
    console.error("Échec de la création dynamique de l'assistant:", creationError);
    throw new Error("Impossible de créer ou de récupérer un ID d'assistant valide.");
  }
}

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'La clé API OpenAI n\'est pas configurée sur le serveur.' },
      { status: 500 }
    );
  }

  try {
    const { message, threadId: existingThreadId } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Format de message invalide' }, { status: 400 });
    }

    // **Modification clé : Obtenir ou créer l'ID de l'assistant**
    const assistantIdToUse = await getOrCreateAssistantId();

    // Gestion du Thread (inchangée)
    let threadId = existingThreadId;
    if (!threadId) {
      const thread = await openai.beta.threads.create();
      threadId = thread.id;
      console.log(`Nouveau thread créé: ${threadId}`);
    } else {
      console.log(`Utilisation du thread existant: ${threadId}`);
       // Optionnel: Vérifier si le thread existe
       try { await openai.beta.threads.retrieve(threadId); }
       catch {
         console.warn(`Thread ${threadId} non trouvé, création d'un nouveau thread.`);
         const thread = await openai.beta.threads.create(); threadId = thread.id;
       }
    }

    // Ajouter le message au Thread (inchangé)
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: message,
    });

    // Créer un Run avec l'ID d'assistant obtenu/créé
    console.log(`Création d'un Run pour l'assistant ${assistantIdToUse} sur le thread ${threadId}...`);
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantIdToUse, // Utiliser l'ID déterminé
    });
    console.log(`Run créé: ${run.id}`);

    // Attendre la complétion (Polling - inchangé)
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    const startTime = Date.now();
    const timeout = 60000; // 60 secondes

    while (['queued', 'in_progress', 'cancelling'].includes(runStatus.status)) {
       if (Date.now() - startTime > timeout) {
          console.error(`Timeout pour le Run ${run.id}`);
          try { await openai.beta.threads.runs.cancel(threadId, run.id); } catch (cancelError) {}
          throw new Error("Le traitement de la requête a expiré.");
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
      console.log(`Statut du Run ${run.id}: ${runStatus.status}`);
    }

    // Récupérer et renvoyer la réponse (inchangé, mais ajout de assistantId)
    if (runStatus.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(threadId, { order: 'desc', limit: 1 });
      const lastMessage = messages.data[0];

      if (lastMessage?.content[0]?.type === 'text') {
        const responseText = lastMessage.content[0].text.value;
        return NextResponse.json({
          response: responseText,
          threadId: threadId,
          assistantId: assistantIdToUse // **Renvoyer l'ID utilisé**
        });
      } else {
        throw new Error('Aucune réponse texte reçue de l\'assistant.');
      }
    } else {
      console.error(`Run ${run.id} terminé avec statut: ${runStatus.status}`, runStatus.last_error);
      throw new Error(runStatus.last_error?.message || `Le Run a échoué: ${runStatus.status}`);
    }

  } catch (error: any) {
    console.error('Erreur API Chat:', error);
    const message = error instanceof Error ? error.message : 'Erreur lors du traitement de votre requête';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}