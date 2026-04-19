import React from 'react';
import StatusBadge from '../components/StatusBadge';
import Icon from '../components/Icons';

const DRM_KEYS = [
  {
    id:'WV-2025-001', course:'Defensive Driving Fundamentals',
    system:'Widevine', created:'2025-01-15', status:'Active',
    licenses:284, expires:'2026-01-15'
  },
  {
    id:'WV-2025-002', course:'Emergency Procedures & Safety',
    system:'Widevine', created:'2025-02-01', status:'Active',
    licenses:196, expires:'2026-02-01'
  },
  {
    id:'PR-2025-001', course:'Pre-Service Orientation',
    system:'PlayReady', created:'2025-03-10', status:'Active',
    licenses:48, expires:'2026-03-10'
  },
  {
    id:'WV-2024-009', course:'Annual Compliance Refresh',
    system:'Widevine', created:'2024-06-01', status:'Revoked',
    licenses:0, expires:'2025-06-01'
  },
];

const SYSTEM_COLORS = {
  Widevine:  { color:'var(--blue)',   bg:'var(--blue-dim)'   },
  PlayReady: { color:'var(--purple)', bg:'var(--purple-dim)' },
  FairPlay:  { color:'var(--teal)',   bg:'var(--teal-dim)'   },
};

export default function DrmPage() {
  return (
    <div className="fade-in">

      {/* Stat tiles */}
      <div className="stat-grid">
        {[
          { label:'Total Key Policies', val:'4',   delta:'3 active',         up:true,  color:'blue',  icon:'Key'      },
          { label:'Active Licenses',    val:'528',  delta:'+12 this week',   up:true,  color:'green', icon:'Shield'   },
          { label:'Revoked Keys',       val:'1',    delta:'Expired Jun 2025', up:false, color:'red',   icon:'X'        },
          { label:'DRM Systems',        val:'2',    delta:'Widevine · PlayReady', up:true, color:'teal', icon:'Lock'  },
        ].map(t => (
          <div key={t.label} className={`stat-tile ${t.color}`}>
            <div className="stat-icon">
              <Icon name={t.icon} size={18} color={`var(--${t.color})`} strokeWidth={1.75}/>
            </div>
            <div className="stat-label">{t.label}</div>
            <div className="stat-val">{t.val}</div>
            <div className="stat-delta">
              <span className={t.up ? 'up' : 'down'}>
                <Icon name={t.up ? 'BarChart' : 'Alert'} size={11} strokeWidth={2.5}/>
                {t.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Info banner */}
      <div style={{
        background:'var(--blue-dim)', border:'1px solid rgba(29,111,242,0.2)',
        borderRadius:'var(--r2)', padding:'14px 18px',
        display:'flex', alignItems:'center', gap:12, marginBottom:24
      }}>
        <Icon name="Shield" size={18} color="var(--blue)"/>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:700, color:'var(--blue)' }}>
            Content DRM Protection Active
          </div>
          <div style={{ fontSize:12, color:'var(--text2)', marginTop:2 }}>
            All published video content is encrypted using Widevine L1 or PlayReady. Licenses are bound to authenticated user sessions and expire automatically.
          </div>
        </div>
        <button className="btn btn-ghost btn-sm">
          <Icon name="ExternalLink" size={12}/> Docs
        </button>
      </div>

      {/* Table */}
      <div className="card" style={{ padding:0 }}>
        <div style={{ padding:'18px 20px', borderBottom:'1px solid var(--border)' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="sec-title">Content Key Policies</div>
              <div className="sec-sub">DRM encryption keys for protected content</div>
            </div>
            <div className="flex items-center gap8">
              <button className="btn btn-ghost btn-sm">
                <Icon name="Refresh" size={12}/> Rotate Keys
              </button>
              <button className="btn btn-primary btn-sm">
                <Icon name="Plus" size={12}/> New Policy
              </button>
            </div>
          </div>
        </div>

        <div className="tbl-wrap" style={{ border:'none', boxShadow:'none', borderRadius:0 }}>
          <table>
            <thead>
              <tr>
                <th>Key ID</th>
                <th>Course</th>
                <th>DRM System</th>
                <th>Created</th>
                <th>Expires</th>
                <th>Licenses Issued</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {DRM_KEYS.map(k => {
                const sys = SYSTEM_COLORS[k.system] || SYSTEM_COLORS.Widevine;
                return (
                  <tr key={k.id}>
                    <td>
                      <span className="mono" style={{
                        fontSize:12, color:'var(--blue)', fontWeight:600,
                        background:'var(--blue-dim)', padding:'3px 8px',
                        borderRadius:'var(--r)', border:'1px solid rgba(29,111,242,0.15)'
                      }}>{k.id}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap8">
                        <Icon name="Book" size={12} color="var(--text3)"/>
                        <span style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{k.course}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{
                        display:'inline-flex', alignItems:'center', gap:6,
                        padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:700,
                        background: sys.bg, color: sys.color,
                        border:`1px solid ${sys.color}22`
                      }}>
                        <Icon name="Shield" size={10} strokeWidth={2.5}/>
                        {k.system}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap4">
                        <Icon name="Calendar" size={11} color="var(--text3)"/>
                        <span className="mono" style={{ fontSize:12 }}>{k.created}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap4">
                        <Icon name="Clock" size={11} color="var(--text3)"/>
                        <span className="mono" style={{ fontSize:12, color: k.status === 'Revoked' ? 'var(--red)' : 'var(--text2)' }}>
                          {k.expires}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap6">
                        <div style={{
                          height:5, width:60, background:'var(--bg4)',
                          borderRadius:10, overflow:'hidden'
                        }}>
                          <div style={{
                            height:'100%', borderRadius:10,
                            background: k.status === 'Revoked' ? 'var(--red)' : 'var(--blue)',
                            width:`${Math.min((k.licenses/300)*100,100)}%`
                          }}/>
                        </div>
                        <span className="mono" style={{ fontSize:12, fontWeight:700, color:'var(--text)' }}>
                          {k.licenses}
                        </span>
                      </div>
                    </td>
                    <td><StatusBadge status={k.status}/></td>
                    <td>
                      <div className="flex items-center gap6">
                        <button className="btn btn-ghost btn-sm">
                          <Icon name="Eye" size={11}/> View
                        </button>
                        {k.status === 'Active' && (
                          <button className="btn btn-danger btn-sm">
                            <Icon name="X" size={11}/> Revoke
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}