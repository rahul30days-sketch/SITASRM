import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const secret = process.env.REVALIDATION_SECRET

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = (await request.json()) as { path?: string; tag?: string }

    if (body.path) {
      revalidatePath(body.path)
      return Response.json({ revalidated: true, path: body.path })
    }

    if (body.tag) {
      revalidateTag(body.tag)
      return Response.json({ revalidated: true, tag: body.tag })
    }

    return Response.json({ error: 'Must provide path or tag' }, { status: 400 })
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
