function LoadingStatus({isLoading, error}) {
  // Show loading spinner
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        {/* Animate spin */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Show error message
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    )
  }
  
  // Do nothing if no error/loading
  return null
}

export default LoadingStatus