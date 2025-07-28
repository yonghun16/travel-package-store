import { AiOutlineSearch } from "react-icons/ai";

const SearchInput = ({ onSearch, searchTerm }) => {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
        placeholder="어디로 떠나고 싶으신가요?"
        onChange={onSearch}
        value={searchTerm}
      />
      <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>
  )
}

export default SearchInput
