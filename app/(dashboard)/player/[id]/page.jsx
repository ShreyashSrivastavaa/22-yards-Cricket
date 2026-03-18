import { redirect } from "next/navigation"

export default async function PlayerRedirect({ params }) {
    const { id } = await params
    redirect(`/players/${id}`)
}
