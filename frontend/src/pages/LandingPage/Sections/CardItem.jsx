import { Link } from "react-router-dom"
import ImageSlider from "../../../componants/ImageSlider";
import { continents } from "../../../utils/filterData";

const CardItem = ({ product }) => {
  const continentName = continents.find(c => c._id === product.continents)?.name || '기타';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link to={`/product/${product._id}`}>
        <div className="relative h-48">
          <ImageSlider images={product.images} />
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {continentName}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-800 truncate group-hover:text-blue-600 transition-colors">{product.title}</h3>
          <p className="text-gray-700 font-bold mt-1">{product.price.toLocaleString()} 만원</p>
        </div>
      </Link>
    </div>
  )
}

export default CardItem
