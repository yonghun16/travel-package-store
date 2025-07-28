const RadioBox = ({ prices, selectedPriceId, onFilters }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border">
      <h3 className="font-semibold mb-2 text-gray-700">가격대</h3>
      <div className="space-y-2">
        {prices?.map(price => (
          <div key={price._id} className="flex items-center">
            <input
              type="radio"
              id={`price-${price._id}`}
              checked={selectedPriceId === price._id}
              onChange={event => onFilters(event.target.value)}
              value={price._id}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={`price-${price._id}`} className="ml-2 text-sm text-gray-600">{price.name}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RadioBox
