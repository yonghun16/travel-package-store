import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axios"
import CheckBox from "./Sections/CheckBox"
import RadioBox from "./Sections/RadioBox"
import SearchInput from "./Sections/SearchInput"
import CardItem from "./Sections/CardItem"
import { continents, prices } from '../../utils/filterData'
import { MdErrorOutline } from "react-icons/md";

const LandingPage = () => {
  const limit = 8; // 카드를 4의 배수로 맞추기 위해 8로 변경
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([])
  const [skip, setSkip] = useState(0)
  const [hasMore, setHasMore] = useState(false) // 초기값을 false로 변경
  const [filters, setFilters] = useState({
    continents: [],
    prices: []
  })
  const [selectedPriceId, setSelectedPriceId] = useState(0); // 초기값을 0으로 명시

  useEffect(() => {
    fetchProducts({ skip: 0, limit, filters, searchTerm })
  }, [filters])

  // 검색어 디바운싱
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts({ skip: 0, limit, filters, searchTerm });
      setSkip(0);
    }, 300); // 0.3초 딜레이
    return () => clearTimeout(timer);
  }, [searchTerm]);


  const fetchProducts = async ({ skip, limit, loadMore = false, filters = {}, searchTerm = "" }) => {
    const params = { skip, limit, filters, searchTerm }
    try {
      const response = await axiosInstance.get('/products', { params })
      if (loadMore) {
        setProducts(prev => [...prev, ...response.data.products])
      } else {
        setProducts(response.data.products)
      }
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error(error)
    }
  }

  const handleLoadMore = () => {
    const newSkip = skip + limit;
    fetchProducts({ skip: newSkip, limit, loadMore: true, filters, searchTerm })
    setSkip(newSkip)
  }

  const handleFilters = (newFilteredData, category) => {
    const newFilters = { ...filters }
    if (category === 'prices') {
        const priceId = parseInt(newFilteredData, 10);
        const priceRange = prices.find(p => p._id === priceId)?.array || [];
        newFilters[category] = priceRange;
        setSelectedPriceId(priceId);
    } else {
        newFilters[category] = newFilteredData;
    }
    setFilters(newFilters);
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <section className="py-8">
      {/* 페이지 헤더 */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800">당신을 위한 최고의 여행지</h2>
        <p className="text-lg text-gray-500 mt-2">잊지 못할 추억을 만들어보세요.</p>
      </div>

      {/* 메인 컨텐츠 영역 (필터 + 상품 목록) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 필터 섹션 */}
        <div className="mt-14 md:col-span-1 space-y-6">
          <CheckBox
            continents={continents}
            checkedContinents={filters.continents}
            onFilters={filters => handleFilters(filters, "continents")}
          />
          <RadioBox
            prices={prices}
            selectedPriceId={selectedPriceId}
            onFilters={id => handleFilters(id, "prices")}
          />
        </div>

        {/* 상품 목록 및 검색 섹션 */}
        <div className="md:col-span-3">
          <div className="flex justify-end mb-4">
            <SearchInput
              searchTerm={searchTerm}
              onSearch={handleSearchTermChange}
            />
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map(product =>
                <CardItem product={product} key={product._id} />
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 bg-white rounded-lg shadow-sm border">
              <MdErrorOutline className="text-5xl text-gray-300"/>
              <p className="mt-4 text-gray-500">검색 결과가 없습니다.</p>
            </div>
          )}

          {hasMore && products.length > 0 &&
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-300">
                더 보기
              </button>
            </div>
          }
        </div>
      </div>
    </section>
  )
}

export default LandingPage
