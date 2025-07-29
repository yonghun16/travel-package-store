import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axiosInstance from "../../utils/axios";
import ProductInfo from "./Sections/ProductInfo";
import ProductImage from "./Sections/ProductImage";

const DetailProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(false);
        const response = await axiosInstance.get(`/products/${productId}?type=single`)
        setProduct(response.data[0]);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId])

  if (loading) return <div className="flex justify-center items-center h-96"><div>로딩 중...</div></div>;
  if (error) return <div className="flex justify-center items-center h-96 text-red-500">상품 정보를 불러오는 데 실패했습니다.</div>;
  if (!product) return <div className="flex justify-center items-center h-96">상품이 존재하지 않습니다.</div>;

  return (
    <section className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ProductImage product={product} />
        </div>
        <div>
          <ProductInfo product={product} />
        </div>
      </div>
    </section>
  )
}

export default DetailProductPage
