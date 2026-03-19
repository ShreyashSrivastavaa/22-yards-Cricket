import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const teams = await prisma.team.findMany()
    return Response.json({ teams })
  } catch (err) {
    return Response.json({ teams: [], error: err.message }, { status: 500 })
  }
}
