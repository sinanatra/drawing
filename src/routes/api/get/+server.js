import db from "$lib/db"

export const GET = async ({ request, url }) => {
    const res = await db.collection('paintdata').find().toArray()
    const data = await res

    return new Response(JSON.stringify(data), { status: 200 })

}