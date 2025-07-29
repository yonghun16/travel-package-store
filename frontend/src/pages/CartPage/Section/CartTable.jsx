import { AiOutlineDelete } from "react-icons/ai";

const CartTable = ({ products, onRemoveItem }) => {
  const renderCartImage = (images) => {
    if (images?.length > 0) {
      return `${import.meta.env.VITE_SERVER_URL}/${images[0]}`;
    }
    return `https://placehold.co/100x100/e2e8f0/e2e8f0?text=No+Image`;
  };

  return (
    <div className="w-full">
      {/* Table Header for larger screens */}
      <div className="hidden sm:grid grid-cols-12 gap-4 font-semibold text-gray-600 border-b pb-2 mb-4">
        <div className="col-span-2">상품</div>
        <div className="col-span-5"></div>
        <div className="col-span-2 text-center">수량</div>
        <div className="col-span-2 text-right">가격</div>
        <div className="col-span-1"></div>
      </div>
      {/* Table Body */}
      <div className="space-y-4">
        {products.map(product => (
          <div key={product._id} className="grid grid-cols-12 gap-4 items-center p-2 rounded-lg bg-white shadow-sm border">
            <div className="col-span-3 sm:col-span-2">
              <img
                className='w-full h-16 object-cover rounded-md'
                src={renderCartImage(product.images)}
                alt={product.title}
              />
            </div>
            <div className="col-span-9 sm:col-span-5">
              <h3 className="font-semibold text-gray-800">{product.title}</h3>
            </div>
            <div className="col-span-6 sm:col-span-2 text-center">
              {product.quantity} 개
            </div>
            <div className="col-span-6 sm:col-span-2 text-right font-semibold">
              {product.price.toLocaleString()} 원
            </div>
            <div className="col-span-12 sm:col-span-1 flex justify-end">
              <button onClick={() => onRemoveItem(product._id)} className="text-gray-400 hover:text-red-500 transition-colors">
                <AiOutlineDelete size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartTable;
