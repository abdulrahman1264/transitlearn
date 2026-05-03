import React from 'react';
import { TOPBAR_TITLES } from '../data/mockData';
import Icon from '../components/Icons';

const PAGE_ICONS = {
  settings: 'Settings', trainers: 'GraduationCap', depots: 'Building',
  quizbank: 'Pencil',   media: 'Media',            assign: 'ClipBoard',
  analytics:'Analytics',certs: 'Trophy',           schedule:'Calendar',
};

export default function GenericPage({ view }) {
  const title  = TOPBAR_TITLES[view] || view;
  const icon   = PAGE_ICONS[view]    || 'Layers';

  return (
    <div className="fade-in" style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'60vh' }}>
      <div style={{ textAlign:'center', maxWidth:380 }}>

        {/* Icon */}
        <div style={{
          width:80, height:80, borderRadius:24,
          background:'var(--blue-dim)', border:'2px solid rgba(29,111,242,0.2)',
          display:'flex', alignItems:'center', justifyContent:'center',
          margin:'0 auto 24px',
          boxShadow:'0 8px 24px rgba(29,111,242,0.15)'
        }}>
          <Icon name={icon} size={34} color="var(--blue)" strokeWidth={1.5}/>
        </div>

        <div style={{
          fontFamily:'var(--font-head)', fontSize:22, fontWeight:800,
          color:'var(--text)', marginBottom:10, letterSpacing:'-0.5px'
        }}>
          {title}
        </div>

        <div style={{ fontSize:13.5, color:'var(--text2)', lineHeight:1.6, marginBottom:28 }}>
          This section is currently under development and will be available in the next release. Check back soon!
        </div>

        {/* Feature pills */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center', marginBottom:28 }}>
          {['Coming Soon', 'In Development', 'v2.0 Feature'].map(tag => (
            <span key={tag} className="chip" style={{ fontSize:11 }}>
              <Icon name="Zap" size={10} color="var(--blue)"/> {tag}
            </span>
          ))}
        </div>

        <div style={{
          background:'var(--blue-dim)', border:'1px solid rgba(29,111,242,0.2)',
          borderRadius:'var(--r2)', padding:'14px 18px', textAlign:'left'
        }}>
          <div className="flex items-center gap8" style={{ marginBottom:8 }}>
            <Icon name="Info" size={13} color="var(--blue)"/>
            <span style={{ fontSize:12, fontWeight:700, color:'var(--blue)' }}>Planned Features</span>
          </div>
          {(['Full CRUD operations', 'Real-time data sync', 'Export & reporting', 'Role-based access control']).map(f => (
            <div key={f} className="flex items-center gap8" style={{ padding:'5px 0' }}>
              <Icon name="ChevronRight" size={11} color="var(--blue)"/>
              <span style={{ fontSize:12, color:'var(--text2)' }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
      </div>
  );
}