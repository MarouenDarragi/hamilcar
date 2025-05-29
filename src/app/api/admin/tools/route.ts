/**  force le runtime Node.js pour pouvoir utiliser fs  */
export const runtime = 'nodejs'          //  ← ajoute cette ligne !

import { writeFile, mkdir } from 'fs/promises'
import { join }         from 'path'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST (req: NextRequest) {
  try {
    /** corps attendu : { slug: string, data: any }  */
    const body = await req.json()

    const dir = join(process.cwd(), 'public', 'dataApi', 'tools')
    await mkdir(dir, { recursive: true })

    await writeFile(
      join(dir, `${body.slug}.json`),
      JSON.stringify(body.data, null, 2)
    )

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    )
  }
}
