import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, removeCartItem, payProducts } from '../../store/thunkFunctions';
import CartTable from './Section/CartTable';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const CartPage = () => {
  const { userData, cartDetail } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (userData?.cart?.length > 0) {
      const cartItemIds = userData.cart.map(item => item.id);
      dispatch(getCartItems({ cartItemIds, userCart: userData.cart }));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (cartDetail?.length > 0) {
      const newTotal = cartDetail.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotal(newTotal);
    } else {
      setTotal(0);
    }
  }, [cartDetail]);

  const handleRemoveCartItem = (productId) => {
    dispatch(removeCartItem(productId));
  }

  const handlePaymentClick = () => {
    dispatch(payProducts({ cartDetail }));
  }

  return (
    <section className="py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">나의 장바구니</h2>
      </div>

      {cartDetail?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartTable products={cartDetail} onRemoveItem={handleRemoveCartItem} />
          </div>
          <div className="lg:col-span-1">
            <div className="p-6 bg-white rounded-lg shadow-md border">
              <h3 className="text-xl font-semibold mb-4">주문 요약</h3>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>합계:</span>
                <span>{total.toLocaleString()} 만원</span>
              </div>
              <button
                className='w-full mt-6 bg-blue-500 text-white font-bold rounded-md py-3 hover:bg-blue-600 transition-colors duration-300'
                onClick={handlePaymentClick}
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 px-6 bg-white rounded-lg shadow-md border">
          <AiOutlineShoppingCart className="mx-auto text-5xl text-gray-300" />
          <p className="mt-4 text-gray-500">장바구니가 비었습니다.</p>
        </div>
      )}
    </section>
  )
}

export default CartPage
