/* import libraries */
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

/* import module */
import axiosInstance from "../../utils/axios"
import FileUpload from "../../componants/FileUpload"


/* data */
// 상품 지역
const continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" },
]

/* component */
const UploadProductPage = () => {
  // 상품 상태
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    images: [],
    continents: 1,
  })

  // 이미지 상태 업데이트
  const handleImages = (newImages) => {
    setProduct((prevState) => ({
      ...prevState,
      images: newImages
    }))
  }

  // 상품 상태 업데이트 onChange
  const handleChange = (event) => {
    const { name, value } = event.target

    setProduct((prevState) => ({
      ...prevState,
      [name]: value       // name = key, value = value
    }))
  }

  // submit
  const userData = useSelector((state) => state.user?.userData)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      writer: userData.id,
      ...product
    }

    try {
      await axiosInstance.post('/products', body)
      navigate('/')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section>
      <div className="text-center m-7">
        <h1>예상 상품 업로드</h1>
      </div>

      <form className="mt-6" onSubmit={handleSubmit}>

        <FileUpload onImageChange={handleImages} images={product.images} />

        <div className="mt-4">
          <label htmlFor="title">이름</label>
          <input
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
            name="title"
            id="title"
            onChange={handleChange}
            value={product.title}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="description">설명</label>
          <input
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
            name="description"
            id="description"
            onChange={handleChange}
            value={product.description}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="price">가격</label>
          <input
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
            type="number"
            name="price"
            id="price"
            onChange={handleChange}
            value={product.price}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="continents">지역</label>
          <select
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
            name="continents"
            id="continents"
            onChange={handleChange}
            value={product.continents}
          >
            {continents.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <button 
            className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 cursor-pointer"
            type='submit'
          >
            생성하기
          </button>
        </div>

      </form>
    </section>
  )
}

export default UploadProductPage
