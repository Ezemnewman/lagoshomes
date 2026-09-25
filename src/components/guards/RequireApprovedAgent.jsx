import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RequireApprovedAgent({ children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'AGENT') return <Navigate to="/dashboard" replace />;

  if (!user.agentProfile || user.agentProfile.status !== 'APPROVED') {
    return <Navigate to="/agents/apply" replace />;
  }

  return children;
}