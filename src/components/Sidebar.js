import React from 'react';
import { NAV, PORTALS } from '../data/mockData';
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

const PORTAL_ICONS = { driver: 'Bus', trainer: 'GraduationCap', admin: 'Settings' };

export default function Sidebar({ portal, view, onPortal, onView }) {
  const currentPortal = PORTALS.find(p => p.id === portal);

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

      {/* Portal Switcher */}
      <div className="sb-portal-switch">
        {PORTALS.map(p => (
          <button
            key={p.id}
            className={`portal-btn${portal === p.id ? ' active' : ''}`}
            onClick={() => onPortal(p.id)}
          >
            <div className="p-icon">
              <Icon name={PORTAL_ICONS[p.id]} size={14} strokeWidth={2} />
            </div>
            <span className="p-label">{p.label}</span>
            <div className="p-check">
              <Icon name="Check" size={9} color="#fff" strokeWidth={3} />
            </div>
          </button>
        ))}
      </div>

      {/* Nav */}
      <nav className="sb-nav">
        {NAV[portal].map(section => (
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
                {item.badge && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="sb-user">
        <div className="sb-avatar">
          {currentPortal?.avatar}
        </div>
        <div className="sb-user-info">
          <div className="sb-user-name">{currentPortal?.name}</div>
          <div className="sb-user-role">{currentPortal?.label}</div>
        </div>
        <Icon name="LogOut" size={14} color="var(--text3)" />
      </div>
    </aside>
  );
}