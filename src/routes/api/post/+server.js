import db from "$lib/db"

export const POST = async ({ request }) => {
    try {
        const data = await request.json();

        console.log(data.dataPoints)
        if (data.dataPoints && data.dataPoints[0][0] != null) {
            const collection = await db.collection('paintdata');
            collection.insertOne(data);
            return new Response(JSON.stringify(data), { status: 200 })
        }
        else {
            return new Response(JSON.stringify(data), { status: 422 })
        }

    } catch (err) {
        console.log(err)
    }
}