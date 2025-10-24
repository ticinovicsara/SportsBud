import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

function ProtectedRoute({ children }) {
  const { user } = useUser();

  console.log(`ProtectedRoute - user: ${user}`);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
