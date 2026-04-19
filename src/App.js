import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { DEFAULT_VIEWS } from './data/mockData';
import Sidebar         from './components/Sidebar';
import Topbar          from './components/Topbar';
import AdminDashboard  from './pages/AdminDashboard';
import DriverDashboard from './pages/DriverDashboard';
import MyCourses       from './pages/MyCourses';
import DriversPage     from './pages/DriversPage';
import CoursesPage     from './pages/CoursesPage';
import BtwPage         from './pages/BtwPage';
import DrmPage         from './pages/DrmPage';
import ReportsPage     from './pages/ReportsPage';
import AuditPage       from './pages/AuditPage';
import GenericPage     from './pages/GenericPage';
import QuizPage        from './pages/QuizPage';
import LoginPage       from './pages/LoginPage';
import UserMgmtPage    from './pages/UserMgmtPage';

function AppInner() {
  const { user, portal: authPortal, logout } = useAuth();
  const [view,    setView]    = useState('dashboard');
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    if (authPortal) setView(DEFAULT_VIEWS[authPortal]);
  }, [authPortal]);

  const handleSuccess = () => {
    setSliding(true);
    setTimeout(() => setSliding(false), 400);
  };

  const handleLogout = () => { logout(); };

  // ── Not logged in ─────────────────────────────
  if (!user) {
    return <LoginPage onSuccess={handleSuccess}/>;
  }

  // ── Logged in ─────────────────────────────────
  const renderPage = () => {
    if (authPortal === 'admin') {
      if (view === 'dashboard') return <AdminDashboard onView={setView}/>;
      if (view === 'drivers')   return <DriversPage/>;
      if (view === 'usermgmt')  return <UserMgmtPage/>;
      if (view === 'drm')       return <DrmPage/>;
      if (view === 'reports')   return <ReportsPage/>;
      if (view === 'audit')     return <AuditPage/>;
    }
    if (authPortal === 'trainer') {
      if (view === 'courses')   return <CoursesPage/>;
      if (view === 'mydrivers') return <DriversPage/>;
      if (view === 'btw')       return <BtwPage portal="trainer"/>;
    }
    if (authPortal === 'driver') {
      if (view === 'mycourses') return <MyCourses/>;
      if (view === 'progress')  return <DriverDashboard onView={setView}/>;
      if (view === 'quiz')      return <QuizPage/>;
      if (view === 'btwlog')    return <BtwPage portal="driver"/>;
    }
    return <GenericPage view={view}/>;
  };

  return (
    <div className={`app ${sliding ? 'slide-in' : ''}`}>
      <Sidebar
        portal={authPortal}
        view={view}
        onPortal={()=>{}}
        onView={setView}
        user={user}
        onLogout={handleLogout}
      />
      <div className="main">
        <Topbar portal={authPortal} view={view} user={user} onLogout={handleLogout}/>
        <main className="content">{renderPage()}</main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner/>
    </AuthProvider>
  );
}