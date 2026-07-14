function OutputBlock({weather}) {
  if (!weather) return null

  return (
    // --- Main card container ---
    <div className="bg-white rounded-xl shadow-xl p-6 w-full">
      <div className="flex items-center justify-between">
        {/* City and country */}
        <div>
          <h2 className="text-2xl font-bold">{weather.name}</h2>
          <p className="text-gray-600">{weather.sys?.country}</p>
        </div>
      </div>
      
      {/* Temperature */}
      <div className="flex items-center justify-center my-4">
        <span className="text-5xl font-bold">
          {Math.round(weather.main?.temp)}°C
        </span>
      </div>
      
      {/* Weather description */}
      <p className="text-center text-gray-600 capitalize">
        {weather.weather?.[0]?.description}
      </p>
 
    </div>
  )
}

export default OutputBlock