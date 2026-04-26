import React, { useState } from 'react';
import { DRIVERS, COURSES, COURSE_PROGS } from '../data/mockData';
import Icon from '../components/Icons';

// Elena Marsh's assigned drivers (IDs 1-4)
const MY_DRIVER_IDS = [1, 2, 3, 4];

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

export default function TrainerDriversPage({ user }) {
  const [selected, setSelected] = useState(null);
  const [search,   setSearch]   = useState('');

  const myDrivers = DRIVERS.filter(d => MY_DRIVER_IDS.includes(d.id))
    .filter(d =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.emp.toLowerCase().includes(search.toLowerCase())
    );

  // ── Driver Detail View ──────────────────────────────────────────
  if (selected) {
    const d = selected;
    return (
      <div className="fade-in">
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>
            <Icon name="ArrowLeft" size={13}/> My Drivers
          </button>
          <Icon name="ChevronRight" size={13} color="var(--text3)"/>
          <span style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{d.name}</span>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>

          {/* Driver profile */}
          <div className="card">
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20 }}>
              <div style={{
                width:56, height:56, borderRadius:14, flexShrink:0,
                background:'var(--blue-dim)', color:'var(--blue)',
                border:'1.5px solid rgba(27,110,243,0.2)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:16, fontWeight:800, fontFamily:'var(--font-mono)',
              }}>
                {d.name.split(' ').map(n=>n[0]).join('')}
              </div>
              <div>
                <div style={{ fontSize:17, fontWeight:800, color:'var(--text)', letterSpacing:'-0.3px' }}>
                  {d.name}
                </div>
                <div style={{ fontSize:12, color:'var(--text3)', fontFamily:'var(--font-mono)', marginTop:3 }}>
                  {d.emp}
                </div>
                <span className={`badge ${d.comp==='OK'?'badge-green':d.comp==='At Risk'?'badge-amber':'badge-red'}`}
                  style={{ marginTop:6 }}>
                  <Icon name={d.comp==='OK'?'Check':'Alert'} size={9} strokeWidth={2.5}/>
                  {d.comp}
                </span>
              </div>
            </div>

            {[
              { key:'Depot',      val:d.depot,   icon:'Building'  },
              { key:'Status',     val:d.status,  icon:'Bus'       },
              { key:'License',    val:d.lic,     icon:'Key'       },
            ].map(r => (
              <div key={r.key} className="kv-row">
                <span className="kv-key" style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <Icon name={r.icon} size={11}/> {r.key}
                </span>
                <span className="kv-val" style={{ fontSize:12 }}>{r.val}</span>
              </div>
            ))}
          </div>

          {/* Overall progress */}
          <div className="card" style={{ borderTop:'3px solid var(--brand)' }}>
            <div style={{ fontSize:14, fontWeight:700, color:'var(--text)', marginBottom:16 }}>
              Overall Progress
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:16 }}>
              <div style={{
                width:72, height:72, borderRadius:'50%',
                background:'var(--brand-dim)', border:'4px solid var(--brand)',
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0,
              }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:16, fontWeight:800, color:'var(--brand)' }}>
                  {d.prog}%
                </span>
              </div>
              <div>
                <div style={{ fontSize:24, fontWeight:800, color:'var(--text)', lineHeight:1 }}>{d.prog}%</div>
                <div style={{ fontSize:12, color:'var(--text3)', marginTop:3 }}>Course completion</div>
                <div style={{ marginTop:8 }}>
                  <div className="prog-bar" style={{ width:140 }}>
                    <div className={`prog-fill ${progCls(d.prog)}`} style={{ width:`${d.prog}%` }}/>
                  </div>
                </div>
              </div>
            </div>

            {/* Course breakdown */}
            <div style={{ marginTop:8 }}>
              <div style={{ fontSize:12, fontWeight:600, color:'var(--text2)', marginBottom:10 }}>
                Course Breakdown
              </div>
              {COURSES.slice(0,3).map(c => {
                const p = Math.round((d.prog / 100) * (COURSE_PROGS[c.id] || 0));
                return (
                  <div key={c.id} style={{ marginBottom:10 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                      <span style={{ fontSize:11.5, color:'var(--text2)', fontWeight:500 }}>{c.title}</span>
                      <span style={{ fontSize:11, fontWeight:700, color:progColor(p), fontFamily:'var(--font-mono)' }}>{p}%</span>
                    </div>
                    <div className="prog-bar" style={{ height:4 }}>
                      <div className={`prog-fill ${progCls(p)}`} style={{ width:`${p}%` }}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Drivers List ────────────────────────────────────────────────
  const avgProg = Math.round(myDrivers.reduce((a,d) => a+d.prog, 0) / (myDrivers.length||1));
  const onTrack = myDrivers.filter(d => d.comp === 'OK').length;
  const atRisk  = myDrivers.filter(d => d.comp !== 'OK').length;

  return (
    <div className="fade-in">

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>
            My Drivers
          </div>
          <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>
            {myDrivers.length} drivers assigned to you
          </div>
        </div>
        <div className="tb-search">
          <Icon name="Search" size={13} color="var(--text3)"/>
          <input placeholder="Search drivers..."
            value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
      </div>

      {/* Summary tiles */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {[
          { label:'My Drivers',    val:myDrivers.length, color:'blue',  icon:'Users'    },
          { label:'Avg Progress',  val:`${avgProg}%`,    color:'teal',  icon:'BarChart' },
          { label:'On Track',      val:onTrack,          color:'green', icon:'Check'    },
          { label:'Need Attention',val:atRisk,           color:'red',   icon:'Alert'    },
        ].map(t => (
          <div key={t.label} style={{
            background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'var(--r2)', padding:'14px 16px',
            display:'flex', alignItems:'center', gap:12, boxShadow:'var(--shadow-sm)',
          }}>
            <div style={{ width:36, height:36, borderRadius:10, background:`var(--${t.color}-dim)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon name={t.icon} size={16} color={`var(--${t.color})`}/>
            </div>
            <div>
              <div style={{ fontSize:22, fontWeight:800, color:'var(--text)', lineHeight:1 }}>{t.val}</div>
              <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600, marginTop:2 }}>{t.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Driver cards */}
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {myDrivers.length === 0 ? (
          <div className="card empty-state">
            <div className="empty-icon">👥</div>
            <div>No drivers found</div>
          </div>
        ) : myDrivers.map(d => (
          <div key={d.id}
            onClick={() => setSelected(d)}
            style={{
              background:'var(--bg2)', border:'1px solid var(--border)',
              borderRadius:'var(--r3)', padding:'18px 20px',
              cursor:'pointer', transition:'all 0.15s',
              display:'flex', alignItems:'center', gap:16,
              boxShadow:'var(--shadow-sm)',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow='var(--shadow-md)'; e.currentTarget.style.transform='translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow='var(--shadow-sm)'; e.currentTarget.style.transform=''; }}
          >
            {/* Avatar */}
            <div style={{
              width:44, height:44, borderRadius:12, flexShrink:0,
              background: d.comp==='OK' ? 'var(--green-dim)' : d.comp==='At Risk' ? 'var(--amber-dim)' : 'var(--red-dim)',
              color: d.comp==='OK' ? 'var(--green)' : d.comp==='At Risk' ? 'var(--amber)' : 'var(--red)',
              border:`1.5px solid ${d.comp==='OK'?'rgba(22,163,74,0.2)':d.comp==='At Risk'?'rgba(217,119,6,0.2)':'rgba(220,38,38,0.2)'}`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:13, fontWeight:700, fontFamily:'var(--font-mono)',
            }}>
              {d.name.split(' ').map(n=>n[0]).join('')}
            </div>

            {/* Info */}
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                <span style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>{d.name}</span>
                <span style={{ fontSize:11, color:'var(--text3)', fontFamily:'var(--font-mono)' }}>{d.emp}</span>
                <span className={`badge ${d.status==='In-Service'?'badge-blue':'badge-teal'}`}>
                  {d.status}
                </span>
                {d.comp !== 'OK' && (
                  <span className={`badge ${d.comp==='At Risk'?'badge-amber':'badge-red'}`}>
                    <Icon name="Alert" size={9} strokeWidth={2.5}/> {d.comp}
                  </span>
                )}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div className="prog-bar" style={{ width:200 }}>
                  <div className={`prog-fill ${progCls(d.prog)}`} style={{ width:`${d.prog}%` }}/>
                </div>
                <span style={{ fontSize:12, fontWeight:700, color:progColor(d.prog), fontFamily:'var(--font-mono)', flexShrink:0 }}>
                  {d.prog}%
                </span>
                <span className="chip" style={{ fontSize:10, flexShrink:0 }}>
                  <Icon name="Building" size={9}/> {d.depot}
                </span>
              </div>
            </div>

            {/* Arrow */}
            <Icon name="ChevronRight" size={16} color="var(--text3)"/>
          </div>
        ))}
      </div>
      )} {/* end overview tab */}
    </div>
  );
}