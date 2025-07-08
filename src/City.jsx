import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getcuaca } from './lib/api'

function City() {
  const { city } = useParams()
  const [cuaca, setCuaca] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCuaca = async () => {
      try {
        const data = await getcuaca(city)
        setCuaca(data)
      } catch (error) {
        console.error("Error fetching cuaca:", error)
        setError("cuaca tidak ditemukan atau terjadi kesalahan.")
      }
    }

    if (city) fetchCuaca()
  }, [city])

  return (
    <>
     <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <Link href="/" className="text-blue-500 hover:underline mb-4">Kembali ke Beranda</Link>
    <h1 className="text-3xl font-bold mb-4">Cuaca di {city}</h1>
    {error ? (
      <p className="text-red-500">{error}</p>
    ) : cuaca ? (
      <div>
        <p>Country: {cuaca.location.country}</p>
        <p>region: {cuaca.location.region}</p>
        <p>Temperature: {cuaca.current.temp_c} °C</p>
        <p>Condition: {cuaca.current.condition.text}</p>
        <img src={cuaca.current.condition.icon} alt={cuaca.current.condition.text} />
        <p>Wind: {cuaca.current.wind_kph} kph</p>
        <p>Feels Like: {cuaca.current.feelslike_c} °C</p>
        <p>Last Updated: {cuaca.current.last_updated}</p>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
    </>
    
   
  )
}

export default City
