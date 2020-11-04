import axios from "axios"

const eventsInstance = axios.create({
    baseURL : "https://detangled.in/develop/e43515d6-0ac8-4936-87ac-9ea263ceb3ae"
})


export default eventsInstance