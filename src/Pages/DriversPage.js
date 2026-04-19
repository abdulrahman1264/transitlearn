import React, { useState } from 'react';
import { DRIVERS } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import Icon from '../components/Icons';

const FILTERS = ['All', 'Pre-Service', 'In-Service'];

function progColor(p) {
  if (p === 100) return 'var(--green)';
  if (p < 40)    return 'var(--red)';
  return 'var(--blue)';
}
function progCls(p) {
  if (p === 100) return 'prog-green';
  if (p < 40)    return 'prog-red';
  return 'prog-blue';
}

export default function DriversPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = DRIVERS.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
      || d.emp.toLowerCase().includes(search.toLowerCase())
      || d.depot.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || d.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="fade-in">

      {/* Header controls */}
      <div className="flex items-center justify-between mb24">
        <div>
          <div style={{ fontFamily:'var(--font-head)', fontSize:15, fontWeight:800, color:'var(--text)' }}>
            {filtered.length} drivers found
          </div>
          <div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>
            Showing {filter === 'All' ? 'all statuses' : filter}
          </div>
        </div>
        <div className="flex items-center gap8">
          {/* Search */}
          <div className="tb-search">
            <Icon name="Search" size={13} color="var(--text3)" />
            <input
              placeholder="Search drivers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {/* Filter buttons */}
          {FILTERS.map(f => (
            <button
              key={f}
              className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter(f)}
            >
              {f === 'All'         && <Icon name="Users"   size={12} />}
              {f === 'Pre-Service' && <Icon name="Star"    size={12} />}
              {f === 'In-Service'  && <Icon name="Bus"     size={12} />}
              {f}
            </button>
          ))}
          <button className="btn btn-ghost btn-sm">
            <Icon name="Download" size={12} /> Export
          </button>
        </div>
      </div>

      {/* Summary tiles */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 }}>
        {[
          { label:'Total',       val: DRIVERS.length,                                        color:'blue',  icon:'Users'   },
          { label:'In-Service',  val: DRIVERS.filter(d=>d.status==='In-Service').length,     color:'teal',  icon:'Bus'     },
          { label:'Pre-Service', val: DRIVERS.filter(d=>d.status==='Pre-Service').length,    color:'amber', icon:'Star'    },
          { label:'Non-Compliant',val:DRIVERS.filter(d=>d.comp!=='OK').length,               color:'red',   icon:'Alert'   },
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
              <Icon name={t.icon} size={16} color={`var(--${t.color})`} />
            </div>
            <div>
              <div style={{ fontSize:22, fontFamily:'var(--font-head)', fontWeight:800, color:'var(--text)', lineHeight:1 }}>{t.val}</div>
              <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600, marginTop:2 }}>{t.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>Driver</th>
              <th>Employee #</th>
              <th>Depot</th>
              <th>Status</th>
              <th>Progress</th>
              <th>License Exp.</th>
              <th>Compliance</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <div>No drivers match your search</div>
                  </div>
                </td>
              </tr>
            ) : filtered.map(d => (
              <tr key={d.id}>
                <td>
                  <div className="flex items-center gap10">
                    <div className="avatar-sm">
                      {d.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <span style={{ fontWeight:600, color:'var(--text)' }}>{d.name}</span>
                  </div>
                </td>
                <td>
                  <span className="mono" style={{ fontSize:12, color:'var(--text3)' }}>{d.emp}</span>
                </td>
                <td>
                  <span className="chip">
                    <Icon name="Building" size={10}/> {d.depot}
                  </span>
                </td>
                <td><StatusBadge status={d.status} /></td>
                <td>
                  <div className="flex items-center gap8">
                    <div className="prog-bar" style={{ width:88 }}>
                      <div className={`prog-fill ${progCls(d.prog)}`} style={{ width:`${d.prog}%` }} />
                    </div>
                    <span style={{
                      fontFamily:'var(--font-mono)', fontSize:12,
                      color: progColor(d.prog), fontWeight:700, width:32
                    }}>{d.prog}%</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap4">
                    <Icon name="Calendar" size={11} color="var(--text3)" />
                    <span className="mono" style={{ fontSize:12 }}>{d.lic}</span>
                  </div>
                </td>
                <td><StatusBadge status={d.comp} /></td>
                <td>
                  <button className="btn btn-ghost btn-sm">
                    <Icon name="Eye" size={12}/> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}