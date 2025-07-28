import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, removeCartItem, payProducts } from '../../store/thunkFunctions';
import CartTable from './Section/CartTable';

const CartPage = () => {
  const userData = useSelector(state => state.user?.userData);
  const cartDetail = useSelector(state => state.user?.cartDetail);
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cartItemIds = [];

    if (userData?.cart && userData.cart.length > 0) {
      userData.cart.forEach(item => {
        cartItemIds.push(item.id);
      })

      const body = {
        cartItemIds,
        userCart: userData.cart
      }

      dispatch(getCartItems(body));
    }
  }, [dispatch, userData])

  useEffect(() => {
    calculateTotal(cartDetail);
  }, [cartDetail])

  // 카트 아이템 가격 합계
  const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.map(item => total += item.price * item.quantity)
    setTotal(total);
  }

  // 카트 아이템 제거
  const handleRemoveCartItem = (productId) => {
    dispatch(removeCartItem(productId));
  }

  // 결제하기 클릭
  const handlePaymentClick = () => {
    dispatch(payProducts({cartDetail}));
  }

  return (
    <section>
      <div className='text-center m-7'>
        <h2 className='text-2xl'>나의 장바구니</h2>

        {cartDetail?.length > 0 ?
          <>
            <CartTable products={cartDetail} onRemoveItem={handleRemoveCartItem}/>
            <div className='mt-10'>
              <p><span className='font-bold'>합계:</span> {total}원</p>
              <button 
                className='text-white bg-black hover:bg-gray-500 rounded-md py-2 px-4 mt-50'
                onClick={handlePaymentClick}
              >
                결제하기
              </button>
            </div>
          </>
          :
          <p>장바구니가 비었습니다.</p>
        }
      </div>
    </section>
  )
}

export default CartPage
