import { useEffect, useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const [city, setCity] = useState('')
  const navigate = useNavigate()

  const handlecuaca = (e) => {
  e.preventDefault()
  if (!city.trim()) {
    alert("Silakan masukkan nama kota!")
    return
  }
  navigate(`/${city.trim()}`)
}


  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <h1 className='text-2xl font-bold mb-4'>Weather App</h1>
        <form onSubmit={handlecuaca}>
          <div className='mb-4'>
            <label htmlFor="city" className='block text-sm font-medium text-gray-700'>Enter City:</label>
            <input type="text" id="city" name="city" className='mt-1 block w-full p-2 border border-gray-300 rounded-md' placeholder='e.g. Jakarta' 
            onChange={(e) => setCity(e.target.value)} />
          </div>
          <button type="submit" className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>Get Weather</button>
        </form>

      </div>
    
      


    </>
  )
}

export default App
