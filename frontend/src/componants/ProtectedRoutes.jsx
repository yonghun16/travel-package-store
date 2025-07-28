import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

function ProtectedRoutes() {
  const isAuth = useSelector(state => state.user?.isAuth);

  return (
    isAuth ? <Outlet /> : <Navigate to="/login" replace />
  );
}

export default ProtectedRoutes
