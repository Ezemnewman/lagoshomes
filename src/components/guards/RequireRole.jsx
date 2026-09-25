import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RequireRole({ allowedRoles, children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) {
    if (user.role === 'ADMIN')  return <Navigate to="/admin" replace />;
    if (user.role === 'AGENT')  return <Navigate to="/agent-dashboard" replace />;
    if (user.role === 'BUYER')  return <Navigate to="/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}