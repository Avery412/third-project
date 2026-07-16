import { useState, useEffect } from 'react'
import Header from './components/Header'
import InputBlock from './components/InputBlock'
import OutputBlock from './components/OutputBlock'
import LoadingStatus from './components/LoadingStatus'
import CityList from './components/CityList'

// --- Get API key ---
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

function App() {

  const [weather, setWeather] = useState(null) // Weather state
  const [isLoading, setIsLoading] = useState(false) // Loading state
  const [error, setError] = useState(null) // Error state
  const [cities, setCities] = useState([]) // City list
  const [selectedCity, setSelectedCity] = useState(null) // Selected city

  // --- Gets weather by geolocation ---
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // Extract latitude and longitude from the position object
        const {latitude, longitude} = position.coords
        
        // Build the API URL
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=ru`
        
        try {
          const response = await fetch(url) // Fetch data
          const data = await response.json() // Parse the JSON response
          
          // Create city object
          const newCity = {
            id: Date.now(),
            name: data.name,
            country: data.sys.country,
            weather: data,
          }

          addCity(newCity)
          setWeather(data)
          setSelectedCity(newCity)

        } catch (err) {
          setError('Не удалось получить погоду по геолокации')
        }
      },
    )
  }, [])

  // --- Adds new city ---
  const addCity = (cityData) => {
    // Check city existence
    if (cities.some(c => c.name === cityData.name)) {
      alert('Вы уже добавили этот город')
      return
    }
    setCities([...cities, cityData])
  }

  // --- Selects city ---
  const selectCity = (city) => {
    setSelectedCity(city)
    setWeather(city.weather)
  }

  // --- Deletes city ---
  const deleteCity = (id) => {
    const newCities = cities.filter(c => c.id !== id)
    setCities(newCities)
    if (selectedCity?.id === id) {
      setSelectedCity(newCities[0] || null)
      setWeather(newCities[0]?.weather || null)
    }
  }

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

      // Create city object
      const newCity = {
        id: Date.now(),
        name: data.name,
        country: data.sys.country,
        weather: data,
      }

      // Add to list and show
      addCity(newCity) 
      setWeather(data)
      setSelectedCity(newCity)

    } catch (err) {
      setError(err.message)
      setWeather(null)
    } finally {
      setIsLoading(false) // hide loading
    }
  }

  return (
    // --- Main container ---
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-700 flex flex-col items-center p-4">
      
      <Header />
      
      <div className="flex flex-col items-center gap-6 mt-6 w-full max-w-md">
        
        <InputBlock onSearch={fetchWeather} />
        <CityList
          cities={cities}
          selectedCity={selectedCity}
          onSelect={selectCity}
          onDelete={deleteCity}
        />
        <LoadingStatus isLoading={isLoading} error={error} />
        <OutputBlock weather={weather} />
        
      </div>
    </div>
  )
}

export default App