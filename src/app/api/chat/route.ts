// import { OpenAI } from 'openai'
// import { NextResponse } from 'next/server'

// // Initialize OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// })

// export async function POST(req: Request) {
//   if (!process.env.OPENAI_API_KEY) {
//     return NextResponse.json(
//       { error: 'OpenAI API key is not configured' },
//       { status: 500 }
//     )
//   }

//   try {
//     const { message } = await req.json()

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: message }],
//       temperature: 0.7,
//       max_tokens: 150,
//     })

//     return NextResponse.json({ 
//       response: completion.choices[0].message.content 
//     })
//   } catch (error) {
//     console.error('OpenAI API error:', error)
//     return NextResponse.json(
//       { error: 'Error processing your request' },
//       { status: 500 }
//     )
//   }
// }



import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize assistant ID - you should create this once and store the ID
const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID ?? "";

export async function POST(req: Request) {
	if (!process.env.OPENAI_API_KEY) {
	  return NextResponse.json(
		{ error: 'OpenAI API key is not configured' },
		{ status: 500 }
	  );
	}
  
	try {
	  const { message, threadId } = await req.json();
  
	  if (!message || typeof message !== 'string') {
		return NextResponse.json(
		  { error: 'Invalid message format' },
		  { status: 400 }
		);
	  }
  
	  // Create a new thread if threadId is not provided
	  const thread = threadId 
		? await openai.beta.threads.retrieve(threadId)
		: await openai.beta.threads.create();
  
	  // Add the message to the thread
	  await openai.beta.threads.messages.create(thread.id, {
		role: 'user',
		content: message,
	  });
  
	  // Run the assistant
	  const run = await openai.beta.threads.runs.create(thread.id, {
		assistant_id: ASSISTANT_ID,
	  });
  
	  // Wait for the completion
	  let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
	  
	  while (runStatus.status === 'in_progress' || runStatus.status === 'queued') {
		await new Promise(resolve => setTimeout(resolve, 1000));
		runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
	  }
  
	  if (runStatus.status === 'completed') {
		// Get the messages
		const messages = await openai.beta.threads.messages.list(thread.id);
		const lastMessage = messages.data[0];
  
		// Handle different content types
		const messageContent = lastMessage.content[0];
		let responseText = '';
  
		if (messageContent.type === 'text') {
		  responseText = messageContent.text.value;
		} else {
		  throw new Error('Unsupported message content type');
		}
  
		return NextResponse.json({ 
		  response: responseText,
		  threadId: thread.id 
		});
	  } else {
		throw new Error(`Run ended with status: ${runStatus.status}`);
	  }
  
	} catch (error) {
	  console.error('OpenAI API error:', error);
	  return NextResponse.json(
		{ error: 'Error processing your request' },
		{ status: 500 }
	  );
	}
  }

// export async function POST(req: Request) {
// 	if (!process.env.OPENAI_API_KEY) {
// 	  return NextResponse.json(
// 		{ error: 'OpenAI API key is not configured' },
// 		{ status: 500 }
// 	  );
// 	}
  
// 	try {
// 	  const { message, threadId: existingThreadId } = await req.json();
  
// 	  if (!message || typeof message !== 'string') {
// 		return NextResponse.json(
// 		  { error: 'Invalid message format' },
// 		  { status: 400 }
// 		);
// 	  }
  

  
// 	  // Create a thread if it doesn't exist
// 	  const thread = existingThreadId 
// 		? await openai.beta.threads.retrieve(existingThreadId)
// 		: await openai.beta.threads.create();
  
// 	  // Add the user's message to the thread
// 	  await openai.beta.threads.messages.create(thread.id, {
// 		role: "user",
// 		content: message,
// 	  });
  
// 	  // Run the assistant
// 	  const run = await openai.beta.threads.runs.create(thread.id, {
// 		assistant_id: ASSISTANT_ID,
// 	  });
  
// 	  // Create a new ReadableStream
// 	  const stream = new ReadableStream({
// 		async start(controller) {
// 		  try {
// 			// Poll for status updates
// 			while (true) {
// 			  const runStatus = await openai.beta.threads.runs.retrieve(
// 				thread.id,
// 				run.id
// 			  );
  
// 			  if (runStatus.status === 'completed') {
// 				// Get the messages
// 				const messages = await openai.beta.threads.messages.list(thread.id);
// 				const lastMessage = messages.data
// 				  .filter(message => message.role === 'assistant')
// 				  .pop();
  
// 				if (lastMessage && lastMessage.content[0].type === 'text') {
// 				  const content = lastMessage.content[0].text.value;
// 				  controller.enqueue(new TextEncoder().encode(content));
// 				}
// 				break;
// 			  } else if (runStatus.status === 'failed') {
// 				throw new Error('Assistant run failed');
// 			  }
  
// 			  // Wait before polling again
// 			  await new Promise(resolve => setTimeout(resolve, 500));
// 			}
  
// 			controller.close();
// 		  } catch (error) {
// 			controller.error(error);
// 		  }
// 		},
// 	  });
  
// 	  return new Response(stream, {
// 		headers: {
// 		  'Content-Type': 'text/plain',
// 		  'X-Thread-Id': thread.id,
// 		},
// 	  });
  
// 	} catch (error) {
// 	  console.error('OpenAI API error:', error);
// 	  return NextResponse.json(
// 		{ error: 'Error processing your request' },
// 		{ status: 500 }
// 	  );
// 	}
//   }