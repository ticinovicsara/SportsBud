import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function ProtectedRoute() {
  const { user } = useUser();

  console.log('ProtectedRoute - user:', user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
