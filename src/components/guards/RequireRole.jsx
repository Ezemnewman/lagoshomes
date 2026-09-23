import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

/**
 * Redirects based on role mismatch.
 * allowedRoles: ['ADMIN'] | ['AGENT'] | ['BUYER'] | ['ADMIN','AGENT'] etc.
 */
export default function RequireRole({ allowedRoles, children }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) {
    // Redirect each role to their own home
    if (user.role === 'ADMIN')  return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'AGENT')  return <Navigate to="/agent/dashboard" replace />;
    if (user.role === 'BUYER')  return <Navigate to="/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}