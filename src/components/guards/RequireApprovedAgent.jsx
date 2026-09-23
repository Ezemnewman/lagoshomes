import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function RequireApprovedAgent({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'AGENT') return <Navigate to="/dashboard" replace />;

  // Agent exists but not yet approved
  if (!user.agentProfile || user.agentProfile.status !== 'APPROVED') {
    return <Navigate to="/agent/pending" replace />;
  }

  return children;
}