import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore();
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Placeholders for future phases */}
          <Route path="cases" element={<div className="p-6">Cases Module Pending</div>} />
          <Route path="persons" element={<div className="p-6">Person Intelligence Pending</div>} />
          <Route path="threat-intelligence" element={<div className="p-6">Threat Intelligence Pending</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
