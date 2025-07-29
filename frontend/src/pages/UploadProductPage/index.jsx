import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axios"
import FileUpload from "../../componants/FileUpload"
import { continents } from "../../utils/filterData"
import { toast } from "react-toastify"
import { AiOutlineArrowRight } from "react-icons/ai"

const UploadProductPage = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    images: [],
    continents: 1,
  })

  const userData = useSelector((state) => state.user?.userData)
  const navigate = useNavigate()

  const handleImages = (newImages) => {
    setProduct((prevState) => ({
      ...prevState,
      images: newImages
    }))
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setProduct((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 간단한 유효성 검사
    if (!product.title || !product.description || product.price <= 0 || product.images.length === 0) {
        toast.error('모든 필드를 채워주세요.');
        return;
    }

    const body = {
      writer: userData.id,
      ...product
    }

    try {
      await axiosInstance.post('/products', body)
      toast.success('상품이 성공적으로 업로드되었습니다.');
      navigate('/')
    } catch (error) {
      console.error(error)
      toast.error('상품 업로드에 실패했습니다.');
    }
  }

  const inputStyles = "w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <section className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800">여행 상품 업로드</h1>
      </div>
      <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white rounded-lg shadow-lg border">
        
        <FileUpload onImageChange={handleImages} images={product.images} />
        
        <div>
          <label htmlFor="title" className="font-semibold text-gray-700">상품명</label>
          <input id="title" name="title" onChange={handleChange} value={product.title} className={inputStyles} />
        </div>
        
        <div>
          <label htmlFor="description" className="font-semibold text-gray-700">설명</label>
          <textarea id="description" name="description" onChange={handleChange} value={product.description} className={`${inputStyles} h-24`} />
        </div>
        
        <div>
          <label htmlFor="price" className="font-semibold text-gray-700">가격</label>
          <input type="number" id="price" name="price" onChange={handleChange} value={product.price} className={inputStyles} />
        </div>
        
        <div>
          <label htmlFor="continents" className="font-semibold text-gray-700">지역</label>
          <select id="continents" name="continents" onChange={handleChange} value={product.continents} className={inputStyles}>
            {continents.map((item) => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <button type='submit' className="w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
            <AiOutlineArrowRight />
            생성하기
          </button>
        </div>
      </form>
    </section>
  )
}

export default UploadProductPage
