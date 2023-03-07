import db from "$lib/db"

export const POST = async ({ request }) => {
    try {
        const data = await request.json();
        const collection = await db.collection('paintdata');
        collection.insertOne(data);
        return new Response(JSON.stringify(data), { status: 200 })

    } catch (err) {
        console.log(err)
    }
}