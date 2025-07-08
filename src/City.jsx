import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
    {error ? (
      <p className="text-red-500">{error}</p>
    ) : cuaca ? (
      <div>
        <h2>Cuaca di {cuaca.location.name}</h2>
        <p>Temperature: {cuaca.current.temp_c} °C</p>
        <p>Condition: {cuaca.current.condition.text}</p>
        <img src={cuaca.current.condition.icon} alt={cuaca.current.condition.text} />
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  )
}

export default City
