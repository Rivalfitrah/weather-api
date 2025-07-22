import axios from "axios"

const baseUrl = "http://api.weatherapi.com/v1"
const apiKey = import.meta.env.VITE_WEATHER_API_KEY


// function untuk get cuaca
export const getcuaca =async (city) => {
    try {
        const response = await axios.get(`${baseUrl}/current.json`, {
            params: {
                key: apiKey,
                q: city || "Jakarta", // Default to Jakarta if no city is provided
                lang: "id" // Set language to Indonesian
            }
        })
        console.log(response.data)
        return response.data

    } catch (error) {
        console.error("Gagal mengambil data cuaca:", error)
        throw error
    }
}