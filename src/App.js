import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [portal, setPortal] = useState('admin');
  const [view,   setView]   = useState('dashboard');

  useEffect(() => { setView(DEFAULT_VIEWS[portal]); }, [portal]);

  const renderPage = () => {
    if (portal === 'admin') {
      if (view === 'dashboard') return <AdminDashboard onView={setView} />;
      if (view === 'drivers')   return <DriversPage />;
      if (view === 'drm')       return <DrmPage />;
      if (view === 'reports')   return <ReportsPage />;
      if (view === 'audit')     return <AuditPage />;
    }
    if (portal === 'trainer') {
      if (view === 'courses')   return <CoursesPage />;
      if (view === 'mydrivers') return <DriversPage />;
      if (view === 'btw')       return <BtwPage portal="trainer" />;
    }
    if (portal === 'driver') {
      if (view === 'mycourses') return <MyCourses />;
      if (view === 'progress')  return <DriverDashboard onView={setView} />;
      if (view === 'quiz')      return <QuizPage />;
      if (view === 'btwlog')    return <BtwPage portal="driver" />;
    }
    return <GenericPage view={view} />;
  };

  return (
    <div className="app">
      <Sidebar portal={portal} view={view} onPortal={setPortal} onView={setView} />
      <div className="main">
        <Topbar portal={portal} view={view} />
        <main className="content">{renderPage()}</main>
      </div>
    </div>
  );
}