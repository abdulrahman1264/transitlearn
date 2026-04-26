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
import SettingsPage     from './pages/SettingsPage';
import AnalyticsPage    from './pages/AnalyticsPage';
import CertificatesPage from './pages/CertificatesPage';
import MediaUploadPage    from './pages/MediaUploadPage';
import TrainerDriversPage from './pages/TrainerDriversPage';
import AdminCoursesPage from './pages/AdminCoursesPage';
import AdminProfile     from './pages/AdminProfile';
import QuizBankPage       from './pages/QuizBankPage';
import TrainersPage from './pages/TrainersPage';
import DepotsPage   from './pages/DepotsPage';
import TrainerProfile     from './pages/TrainerProfile';

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
      if (view === 'dashboard')    return <AdminDashboard onView={setView}/>;
      if (view === 'courses')      return <AdminCoursesPage/>;
      if (view === 'drivers')      return <DriversPage/>;
      if (view === 'trainers')     return <TrainersPage/>;
      if (view === 'usermgmt')     return <UserMgmtPage/>;
      if (view === 'depots')       return <DepotsPage/>;
      if (view === 'drm')          return <DrmPage/>;
      if (view === 'reports')      return <ReportsPage/>;
      if (view === 'audit')        return <AuditPage/>;
      if (view === 'settings')     return <SettingsPage/>;
      if (view === 'analytics')    return <AnalyticsPage/>;
      if (view === 'certs')        return <CertificatesPage portal="admin" user={user}/>;
      if (view === 'adminprofile') return <AdminProfile user={user}/>;
    }
    if (authPortal === 'trainer') {
      if (view === 'courses')        return <CoursesPage/>;
      if (view === 'media')          return <MediaUploadPage/>;
      if (view === 'quizbank')       return <QuizBankPage/>;
      if (view === 'mydrivers')      return <TrainerDriversPage user={user}/>;
      if (view === 'btw')            return <BtwPage portal="trainer" user={user}/>;
      if (view === 'trainerprofile') return <TrainerProfile user={user}/>;
    }
    if (authPortal === 'driver') {
      if (view === 'mycourses') return <MyCourses user={user}/>;
      if (view === 'progress')  return <DriverDashboard onView={setView} user={user}/>;
      if (view === 'quiz')      return <QuizPage/>;
      if (view === 'certs')     return <CertificatesPage portal="driver" user={user}/>;
      if (view === 'schedule')  return <GenericPage view={view}/>;
      if (view === 'profile')   return <GenericPage view={view}/>;
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