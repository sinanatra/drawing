
export const load = ({ fetch }) => {

    const fetchData = async () => {
        const res = await fetch('/api/get')
        const data = await res.json()
        return data
    }
    return {
        posts: fetchData()
    }

}
