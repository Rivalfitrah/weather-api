import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getcuaca } from './lib/api'

function App() {
  const [cuaca, setCuaca] = useState(null)
  const [city, setCity] = useState()

  useEffect(()=> {
    const fetchCuaca = async () => {
      try {
        const data = await getcuaca()
        setCuaca(data)
      } catch (error) {
        console.error("Error fetching cuaca:", error)
      }
    }

    fetchCuaca()
  }, [])

  const handlecuaca = async (e) => {
    e.preventDefault()
    try {
      const data = await getcuaca(city)
      setCuaca(data)
    } catch (error) {
      console.error("Error fetching cuaca for city:", error)
    }
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <h1 className='text-2xl font-bold mb-4'>Weather App</h1>
        <form action="city" onSubmit={handlecuaca}>
          <div className='mb-4'>
            <label htmlFor="city" className='block text-sm font-medium text-gray-700'>Enter City:</label>
            <input type="text" id="city" name="city" className='mt-1 block w-full p-2 border border-gray-300 rounded-md' placeholder='e.g. Jakarta' 
            onChange={(e) => setCity(e.target.value)} />
          </div>
          <button type="submit" className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>Get Weather</button>
        </form>

        {cuaca ? (
          <div>
            <p>Temperature: {cuaca.current.temp_c} °C</p>
            <p>Condition: {cuaca.current.condition.text}</p>
            <img src={cuaca.current.condition.icon} alt={cuaca.current.condition.text} />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    
      


    </>
  )
}

export default App
