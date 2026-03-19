import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const matches = await prisma.match.findMany({
      orderBy: { date: 'desc' }, 
      take: 30
    })
    return Response.json({ matches })
  } catch (err) {
    return Response.json({ matches: [], error: err.message }, { status: 500 })
  }
}
