/* import library */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Outlet, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

/* import modules, hooks, components */
import { authUser } from './store/thunkFunctions';


/* import pages */
import Navbar from './layout/NavBar';
import Footer from './layout/Footer';


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user?.isAuth); // 로그인 상태 불러옴
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuth) {           // 로그인 상태 라면
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);

  return (
    <div className='flex flex-col min-h-screen bg-gray-50 font-sans'>
      <ToastContainer
        position="bottom-right"
        theme='light'
        pauseOnHover
        autoClose={1500}
      />

      <Navbar />
      <main className='flex-grow container mx-auto px-4 sm:px-6 lg:px-8'>
        <Outlet />
      </main>
      <Footer />

    </div>
  )
}

export default App
