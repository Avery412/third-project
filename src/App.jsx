import { useState } from 'react'
import Header from './components/Header'
import InputBlock from './components/InputBlock'
import OutputBlock from './components/OutputBlock'
import LoadingStatus from './components/LoadingStatus'

// --- Get API key ---
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

function App() {

  const [weather, setWeather] = useState(null) // Weather state
  const [isLoading, setIsLoading] = useState(false) // Loading state
  const [error, setError] = useState(null) // Error state

  // --- Gets weather data from the API ---
  const fetchWeather = async (cityName) => {
    setIsLoading(true) // loading
    setError(null) // clear errors
    
    try {
      // Build the API URL
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`
      
      // Make the API request
      const response = await fetch(url)
    
      if (!response.ok) {
        throw new Error('Город не найден.')
      }
      
      // Parse the JSON response
      const data = await response.json()
      
      // Store the weather data
      setWeather(data)
    } catch (err) {
      setError(err.message)
      setWeather(null)
    } finally {
      setIsLoading(false) // hide loading
    }
  }

  return (
    // --- Main container ---
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex flex-col items-center p-4">
      
      <Header />
      
      <div className="flex flex-col items-center gap-6 mt-6 w-full max-w-md">
        
        <InputBlock onSearch={fetchWeather} />
        <LoadingStatus isLoading={isLoading} error={error} />
        <OutputBlock weather={weather} />
        
      </div>
    </div>
  )
}

export default App