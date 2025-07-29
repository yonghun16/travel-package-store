import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../store/thunkFunctions';
import { AiOutlineShoppingCart, AiOutlineDelete } from 'react-icons/ai';

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id }))
  }

  const handleDeleteProduct = () => {
    alert('아직 삭제기능은 작업중입니다.');
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h2>
      <p className="text-3xl font-bold text-blue-600 mb-4">{product.price.toLocaleString()} 원</p>

      <div className="text-gray-600 space-y-2 mb-6 flex-grow">
        <p><span className="font-semibold text-gray-900">판매된 개수:</span> {product.sold} 개</p>
        <p className="leading-relaxed"><span className="font-semibold text-gray-900">설명:</span> {product.description}</p>
      </div>

      <div className="mt-auto space-y-2">
        <button
          onClick={handleAddToCart}
          className='w-full flex items-center justify-center gap-2 px-4 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors font-semibold'
        >
          <AiOutlineShoppingCart />
          장바구니에 담기
        </button>
        {userData?.role === 1 && (
          <button
            onClick={handleDeleteProduct}
            className='w-full flex items-center justify-center gap-2 px-4 py-3 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors font-semibold'
          >
            <AiOutlineDelete />
            상품 삭제하기
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
