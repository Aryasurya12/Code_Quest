import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';

const AppContent: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="cq-background min-h-screen text-white flex flex-col">
      {user ? <DashboardPage /> : <LandingPage />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
