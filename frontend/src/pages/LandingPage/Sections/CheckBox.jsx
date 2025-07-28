const CheckBox = ({ continents, checkedContinents, onFilters }) => {
  const handleToggle = (continentId) => {
    const currentIndex = checkedContinents.indexOf(continentId);
    const newChecked = [...checkedContinents];
    if (currentIndex === -1) {
      newChecked.push(continentId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    onFilters(newChecked);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border">
      <h3 className="font-semibold mb-2 text-gray-700">대륙</h3>
      <div className="grid grid-cols-2 gap-2">
        {continents?.map(continent => (
          <div key={continent._id} className="flex items-center">
            <input
              type="checkbox"
              id={`continent-${continent._id}`}
              onChange={() => handleToggle(continent._id)}
              checked={checkedContinents.includes(continent._id)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={`continent-${continent._id}`} className="ml-2 text-sm text-gray-600">{continent.name}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CheckBox
