function CityList({cities, selectedCity, onSelect, onDelete}) {
  if (cities.length === 0) return null
  return (
    <div className="flex flex-wrap gap-2 w-full">
      {cities.map((city) => (
        <div
          key={city.id}
          className={`flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer ${
            selectedCity?.id === city.id
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-800 hover:bg-white'
          }`}
        >
          <span onClick={() => onSelect(city)}>
            {city.name}
          </span>
          <button
            onClick={() => onDelete(city.id)}
            className="text-sm hover:text-red-600"
          >
            Х
          </button>
        </div>
      ))}
    </div>
  )
}

export default CityList