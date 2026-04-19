import React from 'react';
import { NAV } from '../data/mockData';
import Icon from './Icons';

const NAV_ICONS = {
  dashboard: 'Home', drivers: 'Users', trainers: 'GraduationCap',
  depots: 'Building', drm: 'Key', reports: 'BarChart', audit: 'Audit',
  settings: 'Settings', courses: 'Book', quizbank: 'Pencil',
  media: 'Media', mydrivers: 'Users', assign: 'ClipBoard',
  btw: 'Car', analytics: 'Analytics', mycourses: 'Book',
  progress: 'BarChart', quiz: 'Pencil', btwlog: 'Car',
  certs: 'Trophy', schedule: 'Calendar',
};

export default function Sidebar({ portal, view, onView, user, onLogout }) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sb-logo">
        <div className="sb-logo-mark">
          <Icon name="Bus" size={18} color="#fff" strokeWidth={2} />
        </div>
        <div className="sb-logo-text">
          <strong>TransitLearn</strong>
          <span>Training Platform</span>
        </div>
      </div>

      {/* Portal label */}
      <div style={{ padding:'10px 16px 8px' }}>
        <span className={`tb-badge ${portal === 'admin' ? 'blue' : portal === 'trainer' ? 'teal' : 'amber'}`}
          style={{ fontSize:10, padding:'4px 10px' }}>
          {portal === 'admin' ? 'Admin Portal' : portal === 'trainer' ? 'Trainer Portal' : 'Driver Portal'}
        </span>
      </div>

      {/* Nav */}
      <nav className="sb-nav">
        {(NAV[portal] || []).map(section => (
          <div key={section.section} className="sb-section">
            <div className="sb-section-label">{section.section}</div>
            {section.items.map(item => (
              <div
                key={item.id}
                className={`nav-item${view === item.id ? ' active' : ''}`}
                onClick={() => onView(item.id)}
              >
                <span className="nav-icon">
                  <Icon
                    name={NAV_ICONS[item.id] || 'Layers'}
                    size={15}
                    strokeWidth={view === item.id ? 2.2 : 1.75}
                  />
                </span>
                <span className="nav-label">{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="sb-user">
        <div className="sb-avatar">{user?.avatar || 'U'}</div>
        <div className="sb-user-info">
          <div className="sb-user-name">{user?.name || 'User'}</div>
          <div className="sb-user-role">{user?.role || ''}</div>
        </div>
        <button onClick={onLogout} title="Sign out" style={{
          background:'none', border:'none', cursor:'pointer',
          color:'var(--text3)', display:'flex', padding:4, borderRadius:'var(--r)',
          transition:'all 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
        >
          <Icon name="LogOut" size={15} />
        </button>
      </div>
    </aside>
  );
}