import React, { useState, useEffect } from 'react';
import { NAV } from '../data/mockData';
import Icon from './Icons';

const NAV_ICONS = {
  dashboard:'Home',      drivers:'Users',       trainers:'GraduationCap',
  depots:'Building',     drm:'Key',             reports:'BarChart',
  audit:'Audit',         settings:'Settings',   courses:'Book',
  quizbank:'Pencil',     media:'Upload',        mydrivers:'Users',
  btw:'Car',             mycourses:'Book',      progress:'Home',
  quiz:'Pencil',         certs:'Trophy',        schedule:'Calendar',
  usermgmt:'UserCheck',  registrations:'Users', batchassign:'Layers',
  videomatrix:'BarChart',adminprofile:'Users',  trainerprofile:'Users',
  profile:'Users',
};

const PORTAL_COLOR = { admin:'blue', trainer:'teal', driver:'amber' };
const PORTAL_LABEL = { admin:'Admin Portal', trainer:'Trainer Portal', driver:'Driver Portal' };

export default function Sidebar({ portal, view, onView, user, onLogout }) {
  const color = PORTAL_COLOR[portal] || 'blue';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile,   setIsMobile]   = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  // Close menu when nav item clicked on mobile
  const handleNav = (id) => {
    onView(id);
    setMobileOpen(false);
  };

  // All nav items flat for mobile bottom bar
  const allItems = (NAV[portal] || []).flatMap(s => s.items).slice(0, 5);

  if (isMobile) {
    return (
      <>
        {/* Mobile top header */}
        <div style={{
          position:'fixed', top:0, left:0, right:0, zIndex:200,
          background:'var(--bg2)', borderBottom:'1px solid var(--border)',
          padding:'12px 16px',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          boxShadow:'var(--shadow-sm)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:8, background:'var(--blue)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon name="Bus" size={16} color="#fff" strokeWidth={2}/>
            </div>
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:'var(--text)', lineHeight:1 }}>TransitLearn</div>
              <div style={{ fontSize:10, color:'var(--text3)', lineHeight:1.2 }}>{PORTAL_LABEL[portal]}</div>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:28, height:28, borderRadius:7, background:`var(--${color}-dim)`, color:`var(--${color})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, fontFamily:'var(--font-mono)' }}>
                {user?.avatar || 'U'}
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(o => !o)}
              style={{ width:36, height:36, borderRadius:8, background:'var(--bg3)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <Icon name={mobileOpen ? 'X' : 'Menu'} size={18} color="var(--text)"/>
            </button>
          </div>
        </div>

        {/* Mobile slide-in menu */}
        {mobileOpen && (
          <>
            {/* Overlay */}
            <div
              onClick={() => setMobileOpen(false)}
              style={{ position:'fixed', inset:0, zIndex:299, background:'rgba(0,0,0,0.4)', backdropFilter:'blur(2px)' }}
            />
            {/* Drawer */}
            <div style={{
              position:'fixed', top:0, right:0, bottom:0, zIndex:300,
              width:280, background:'var(--bg2)',
              borderLeft:'1px solid var(--border)',
              boxShadow:'-8px 0 32px rgba(0,0,0,0.15)',
              display:'flex', flexDirection:'column',
              overflowY:'auto',
            }}>
              {/* Drawer header */}
              <div style={{ padding:'16px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div className={`sb-portal-pill ${color}`} style={{ margin:0 }}>
                  <div className="sb-portal-dot"/>
                  <span className="sb-portal-label">{PORTAL_LABEL[portal]}</span>
                </div>
                <button onClick={() => setMobileOpen(false)}
                  style={{ width:32, height:32, borderRadius:8, background:'var(--bg3)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                  <Icon name="X" size={15} color="var(--text)"/>
                </button>
              </div>

              {/* Nav sections */}
              <nav style={{ flex:1, padding:'12px 10px', overflowY:'auto' }}>
                {(NAV[portal] || []).map(section => (
                  <div key={section.section} style={{ marginBottom:16 }}>
                    <div className="sb-section-label">{section.section}</div>
                    {section.items.map(item => (
                      <div key={item.id}
                        className={`nav-item${view===item.id?' active':''}`}
                        onClick={() => handleNav(item.id)}
                        style={{ marginBottom:2 }}>
                        <span className="nav-icon">
                          <Icon name={NAV_ICONS[item.id]||'Layers'} size={15}
                            strokeWidth={view===item.id?2.2:1.75}/>
                        </span>
                        <span className="nav-label">{item.label}</span>
                        {item.badge && <span className="nav-badge">{item.badge}</span>}
                      </div>
                    ))}
                  </div>
                ))}
              </nav>

              {/* User + logout */}
              <div style={{ padding:'14px 16px', borderTop:'1px solid var(--border)', display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:38, height:38, borderRadius:10, background:`var(--${color}-dim)`, color:`var(--${color})`, border:`1.5px solid var(--${color})33`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, fontFamily:'var(--font-mono)', flexShrink:0 }}>
                  {user?.avatar || 'U'}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user?.name || 'User'}</div>
                  <div style={{ fontSize:11, color:'var(--text3)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user?.role || ''}</div>
                </div>
                <button onClick={() => { onLogout(); setMobileOpen(false); }}
                  style={{ width:34, height:34, borderRadius:8, background:'var(--red-dim)', border:'1px solid rgba(220,38,38,0.2)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                  <Icon name="LogOut" size={14} color="var(--red)"/>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Mobile bottom nav bar */}
        <div style={{
          position:'fixed', bottom:0, left:0, right:0, zIndex:200,
          background:'var(--bg2)', borderTop:'1px solid var(--border)',
          display:'flex', alignItems:'stretch',
          boxShadow:'0 -4px 16px rgba(0,0,0,0.08)',
        }}>
          {allItems.map(item => {
            const active = view === item.id;
            return (
              <button key={item.id}
                onClick={() => handleNav(item.id)}
                style={{
                  flex:1, display:'flex', flexDirection:'column',
                  alignItems:'center', justifyContent:'center',
                  gap:3, padding:'8px 4px 10px',
                  background:'none', border:'none', cursor:'pointer',
                  color: active ? `var(--${color})` : 'var(--text3)',
                  transition:'all 0.15s', position:'relative',
                }}>
                {active && (
                  <div style={{ position:'absolute', top:0, left:'20%', right:'20%', height:2, background:`var(--${color})`, borderRadius:'0 0 4px 4px' }}/>
                )}
                <div style={{ width:28, height:28, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', background: active ? `var(--${color}-dim)` : 'transparent', transition:'all 0.15s' }}>
                  <Icon name={NAV_ICONS[item.id]||'Layers'} size={16}
                    color={active ? `var(--${color})` : 'var(--text3)'}
                    strokeWidth={active ? 2.2 : 1.75}/>
                </div>
                <span style={{ fontSize:9, fontWeight: active ? 700 : 500, letterSpacing:'0.2px', lineHeight:1 }}>
                  {item.label.split(' ')[0]}
                </span>
                {item.badge && (
                  <div style={{ position:'absolute', top:6, right:'calc(50% - 18px)', width:14, height:14, borderRadius:'50%', background:`var(--${color})`, color:'#fff', fontSize:8, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {item.badge}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Spacer for fixed top bar */}
        <div style={{ height:57 }}/>
      </>
    );
  }

  // ── DESKTOP ──────────────────────────────────────────
  return (
    <aside className="sidebar">
      <div className="sb-logo">
        <div className="sb-logo-icon">
          <Icon name="Bus" size={18} color="#fff" strokeWidth={2}/>
        </div>
        <div>
          <div className="sb-logo-name">TransitLearn</div>
          <div className="sb-logo-sub">Training Platform</div>
        </div>
      </div>

      <div className={`sb-portal-pill ${color}`}>
        <div className="sb-portal-dot"/>
        <span className="sb-portal-label">{PORTAL_LABEL[portal]}</span>
      </div>

      <nav className="sb-nav">
        {(NAV[portal] || []).map(section => (
          <div key={section.section} className="sb-section">
            <div className="sb-section-label">{section.section}</div>
            {section.items.map(item => (
              <div key={item.id}
                className={`nav-item${view===item.id?' active':''}`}
                onClick={() => onView(item.id)}>
                <span className="nav-icon">
                  <Icon name={NAV_ICONS[item.id]||'Layers'} size={15}
                    strokeWidth={view===item.id?2.2:1.75}/>
                </span>
                <span className="nav-label">{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </nav>

      <div className="sb-user">
        <div className={`sb-avatar ${color}`}>{user?.avatar || 'U'}</div>
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