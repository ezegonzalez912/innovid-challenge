export const getUsageCPU = (id: number) => {

    return fetch(`http://localhost:8000/status/${id}`)
    .then(res => res.json())
}