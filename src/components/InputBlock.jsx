import {useState} from 'react'

function InputBlock({onSearch}) {
  // State to store current city name
  const [city, setCity] = useState('')
  
  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (city.trim()) {
      onSearch(city.trim())
      setCity('')  // clear input field
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-md text-white">
        
      {/* Text input for city name */}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Введите город"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Поиск
      </button>
    </form>
  )
}

export default InputBlock