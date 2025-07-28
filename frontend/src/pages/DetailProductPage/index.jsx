import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axiosInstance from "../../utils/axios";

import ProductInfo from "./Sections/ProductInfo";
import ProductImage from "./Sections/ProductImage";

const DetailProductPage = () => {
  const { productId } = useParams();    // params.productId
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axiosInstance.get(`/products/${productId}?type=single`)
        console.log(response)
        setProduct(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [productId])

  if(!product) return null;

  return (
    <section>
      <div className="text-center">
        <h1>{product.title}</h1>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          {/* product Image*/}
          <ProductImage product={product}/>
        </div>
        <div className="w-1/2">
          {/* product Info*/}
          <ProductInfo product={product}/>
        </div>
      </div>
    </section>
  )
}

export default DetailProductPage
