import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../../../store/thunkFunctions'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const routes = [
  { to: "/login", name: '로그인', auth: false },
  { to: "/register", name: '회원가입', auth: false },
  { to: "/product/upload", name: '업로드', auth: true, admin: true },
  { to: "/user/cart", name: '카트', auth: true, icon: <AiOutlineShoppingCart className="text-2xl" /> },
  { to: "/history", name: '주문목록', auth: true },
  { to: "", name: '로그아웃', auth: true },
];

const NavItem = ({ mobile, closeMenu }) => {
  const { isAuth, userData } = useSelector(state => state.user);
  const cart = userData?.cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalQuantity = cart?.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.quantity;
  }, 0);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      if (closeMenu) closeMenu();
    }
  };

  const renderLink = (route) => {
    const baseClasses = "py-2 text-center transition-colors duration-300 text-gray-600";
    const mobileClasses = "w-full text-2xl py-4";
    const desktopClasses = "px-4 rounded-md hover:bg-gray-100";

    if (route.name === '로그아웃') {
      return (
        <button onClick={handleLogout} className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}>
          {route.name}
        </button>
      );
    } else if (route.icon) {
      // ✅ 모바일에서도 relative 속성을 추가하여 위치 기준점을 설정합니다.
      const iconDesktopClasses = "relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100";
      const iconMobileClasses = `relative ${mobileClasses}`;
      return (
        <Link to={route.to} onClick={closeMenu} className={`${mobile ? iconMobileClasses : iconDesktopClasses}`}>
          {route.icon}
          {totalQuantity > 0 && (
            <span className='absolute top-[2px] -translate-y-[8px] right-[-6px] flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full'>
              {totalQuantity}
            </span>
          )}
        </Link>
      );
    } else {
      return (
        <Link to={route.to} onClick={closeMenu} className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}>
          {route.name}
        </Link>
      );
    }
  };

  return (
    <ul className={`flex items-center gap-4 ${mobile ? "flex-col h-full justify-center" : ""}`}>
      {routes.map((route) => {
        if (isAuth !== route.auth) return null;
        if (route.admin && userData?.role !== 1) return null;
        return <li key={route.name}>{renderLink(route)}</li>;
      })}
    </ul>
  );
};

export default NavItem;
