import React, { useState } from 'react';
import { AUDIT_LOG } from '../data/mockData';
import Icon from '../components/Icons';

const ACTION_STYLES = {
  'Assignment.Created':  { cls:'badge-blue',   icon:'ClipBoard',     color:'var(--blue)'   },
  'BtwSession.Signed':   { cls:'badge-teal',   icon:'Check',         color:'var(--teal)'   },
  'Quiz.Submitted':      { cls:'badge-amber',  icon:'Pencil',        color:'var(--amber)'  },
  'Driver.Created':      { cls:'badge-green',  icon:'UserCheck',     color:'var(--green)'  },
  'Course.Published':    { cls:'badge-purple', icon:'Zap',           color:'var(--purple)' },
  'VideoProgress.Saved': { cls:'badge-gray',   icon:'Video',         color:'var(--text3)'  },
};

export default function AuditPage() {
  const [filter, setFilter] = useState('All');

  const actions = ['All', ...new Set(AUDIT_LOG.map(l => l.action))];

  const filtered = filter === 'All'
    ? AUDIT_LOG
    : AUDIT_LOG.filter(l => l.action === filter);

  return (
    <div className="fade-in">

      {/* Integrity notice */}
      <div style={{
        background:'var(--amber-dim)', border:'1px solid rgba(245,158,11,0.25)',
        borderRadius:'var(--r2)', padding:'14px 18px',
        display:'flex', alignItems:'center', gap:12, marginBottom:24
      }}>
        <div style={{
          width:36, height:36, borderRadius:10, background:'var(--amber-dim)',
          border:'1.5px solid rgba(245,158,11,0.3)',
          display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0
        }}>
          <Icon name="Shield" size={16} color="var(--amber)"/>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:700, color:'var(--amber)' }}>
            Hash Chain Integrity: Verified ✓
          </div>
          <div style={{ fontSize:12, color:'var(--text2)', marginTop:2 }}>
            All audit log entries are cryptographically chained. Tampering is detectable. Last verified: 2025-04-14 14:30:00 UTC
          </div>
        </div>
        <span className="mono" style={{
          fontSize:10, color:'var(--amber)', background:'var(--amber-dim)',
          padding:'4px 10px', borderRadius:'var(--r)',
          border:'1px solid rgba(245,158,11,0.2)'
        }}>
          SHA-256
        </span>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {[
          { label:'Total Events',    val: AUDIT_LOG.length,  color:'blue',  icon:'Audit'   },
          { label:'Today',           val:'6',                color:'teal',  icon:'Clock'   },
          { label:'Unique Users',    val:'3',                color:'amber', icon:'Users'   },
          { label:'Integrity',       val:'100%',             color:'green', icon:'Shield'  },
        ].map(t => (
          <div key={t.label} style={{
            background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'var(--r2)', padding:'14px 16px',
            display:'flex', alignItems:'center', gap:12,
            boxShadow:'var(--shadow-sm)'
          }}>
            <div style={{
              width:36, height:36, borderRadius:10,
              background:`var(--${t.color}-dim)`,
              display:'flex', alignItems:'center', justifyContent:'center'
            }}>
              <Icon name={t.icon} size={16} color={`var(--${t.color})`}/>
            </div>
            <div>
              <div style={{ fontSize:22, fontFamily:'var(--font-head)', fontWeight:800, color:'var(--text)', lineHeight:1 }}>{t.val}</div>
              <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600, marginTop:2 }}>{t.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb16">
        <div className="flex items-center gap8">
          <Icon name="Filter" size={13} color="var(--text3)"/>
          <span style={{ fontSize:12, color:'var(--text3)', fontWeight:600 }}>Filter by action:</span>
          <select
            className="form-input"
            style={{ width:'auto', padding:'6px 12px', fontSize:12 }}
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            {actions.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap8">
          <span style={{ fontSize:12, color:'var(--text3)' }}>
            Showing {filtered.length} of {AUDIT_LOG.length} events
          </span>
          <button className="btn btn-ghost btn-sm">
            <Icon name="Download" size={12}/> Export JSON
          </button>
          <button className="btn btn-ghost btn-sm">
            <Icon name="Download" size={12}/> Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Entity</th>
              <th>IP Address</th>
              <th>Hash</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log, i) => {
              const style = ACTION_STYLES[log.action] || { cls:'badge-gray', icon:'Info', color:'var(--text3)' };
              const fakeHash = `0x${Math.abs(log.ts.split('').reduce((a,c)=>((a<<5)-a)+c.charCodeAt(0),0)).toString(16).padStart(8,'0').slice(0,8)}`;
              return (
                <tr key={i}>
                  <td>
                    <div className="flex items-center gap6">
                      <Icon name="Clock" size={11} color="var(--text3)"/>
                      <span className="mono" style={{ fontSize:11.5, color:'var(--text2)' }}>{log.ts}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap8">
                      <div className="avatar-sm" style={{ fontSize:9 }}>
                        {log.user.split('@')[0].slice(0,2).toUpperCase()}
                      </div>
                      <span style={{ fontSize:12.5, color:'var(--text)' }}>{log.user}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${style.cls}`}>
                      <Icon name={style.icon} size={10} strokeWidth={2.5}/>
                      {log.action}
                    </span>
                  </td>
                  <td>
                    <span className="chip">
                      <Icon name="Database" size={10}/>
                      {log.entity}
                    </span>
                  </td>
                  <td>
                    <span className="mono" style={{ fontSize:11.5, color:'var(--text3)' }}>
                      {log.ip}
                    </span>
                  </td>
                  <td>
                    <span className="mono" style={{
                      fontSize:10.5, color:'var(--text3)',
                      background:'var(--bg3)', padding:'2px 8px',
                      borderRadius:'var(--r)', border:'1px solid var(--border)',
                      display:'inline-flex', alignItems:'center', gap:4
                    }}>
                      <Icon name="Link" size={9}/>
                      {fakeHash}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}