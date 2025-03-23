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
//       model: "gpt-3.5-turbo",
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