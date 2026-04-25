import React from 'react';
import { NAV } from '../data/mockData';
import Icon from './Icons';

const NAV_ICONS = {
  dashboard:'Home',    drivers:'Users',       trainers:'GraduationCap',
  depots:'Building',   drm:'Key',             reports:'BarChart',
  audit:'Audit',       settings:'Settings',   courses:'Book',
  quizbank:'Pencil',   media:'Media',         mydrivers:'Users',
  assign:'ClipBoard',  btw:'Car',             analytics:'Analytics',
  mycourses:'Book',    progress:'BarChart',   quiz:'Pencil',
  btwlog:'Car',        certs:'Trophy',        schedule:'Calendar',
  usermgmt:'UserCheck',
};

const PORTAL_COLOR = {
  admin:'blue', trainer:'teal', driver:'amber',
};

const PORTAL_LABEL = {
  admin:'Admin Portal', trainer:'Trainer Portal', driver:'Driver Portal',
};

export default function Sidebar({ portal, view, onView, user, onLogout }) {
  const color = PORTAL_COLOR[portal] || 'blue';

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sb-logo">
        <div className="sb-logo-icon">
          <Icon name="Bus" size={18} color="#fff" strokeWidth={2}/>
        </div>
        <div>
          <div className="sb-logo-name">TransitLearn</div>
          <div className="sb-logo-sub">Training Platform</div>
        </div>
      </div>

      {/* Portal pill */}
      <div className={`sb-portal-pill ${color}`}>
        <div className="sb-portal-dot"/>
        <span className="sb-portal-label">{PORTAL_LABEL[portal]}</span>
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
        <div className={`sb-avatar ${color}`}>
          {user?.avatar || 'U'}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div className="sb-user-name">{user?.name || 'User'}</div>
          <div className="sb-user-role">{user?.role || ''}</div>
        </div>
        <button className="sb-logout" onClick={onLogout} title="Sign out">
          <Icon name="LogOut" size={14}/>
        </button>
      </div>
    </aside>
  );
}