import { redirect } from "next/navigation"

export default async function PlayerRedirect({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    redirect(`/players/${id}`)
}
