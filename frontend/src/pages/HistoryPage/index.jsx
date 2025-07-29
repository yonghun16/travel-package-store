import { useSelector } from 'react-redux'
import dayjs from 'dayjs';

const HistoryPage = () => {
  const userData = useSelector(state => state.user?.userData);

  return (
    <section className="py-8">
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-gray-800'>주문 내역</h2>
      </div>

      {userData?.history?.length > 0 ? (
        <div className='overflow-x-auto bg-white p-4 rounded-lg shadow-md border'>
          <table className='w-full text-sm text-left text-gray-600'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th scope="col" className="px-6 py-3">Payment ID</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
                <th scope="col" className="px-6 py-3">Date of Purchase</th>
              </tr>
            </thead>
            <tbody>
              {userData.history.map((item) => (
                <tr className='bg-white border-b hover:bg-gray-50' key={item.paymentId}>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.id}</td>
                  <td className="px-6 py-4">{item.price.toLocaleString()} 만원</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">{dayjs(item.dateOfPurchase).format('YYYY-MM-DD HH:mm:ss')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 px-6 bg-white rounded-lg shadow-md border">
          <p className="text-gray-500">주문 내역이 없습니다.</p>
        </div>
      )}
    </section>
  )
}

export default HistoryPage
