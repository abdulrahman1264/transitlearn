import React, { useState } from 'react';
import Icon from '../components/Icons';

const DEPOTS = [
  { id:1, name:'Central Depot',  code:'CD-01', city:'Dubai',       manager:'Ahmed Al Rashid', drivers:48, trainers:2, routes:12, capacity:60, completion:94, status:'Active'   },
  { id:2, name:'North Terminal', code:'NT-02', city:'Dubai',       manager:'Fatima Hassan',   drivers:32, trainers:1, routes:8,  capacity:40, completion:78, status:'Active'   },
  { id:3, name:'South Hub',      code:'SH-03', city:'Dubai',       manager:'Omar Khalid',     drivers:27, trainers:1, routes:7,  capacity:35, completion:61, status:'Active'   },
  { id:4, name:'East Station',   code:'ES-04', city:'Sharjah',     manager:'Layla Mohamed',   drivers:19, trainers:1, routes:5,  capacity:25, completion:85, status:'Active'   },
  { id:5, name:'West Garage',    code:'WG-05', city:'Dubai',       manager:'Khalid Ibrahim',  drivers:41, trainers:2, routes:10, capacity:50, completion:91, status:'Active'   },
  { id:6, name:'Airport Hub',    code:'AH-06', city:'Dubai',       manager:'Sara Abdullah',   drivers:0,  trainers:0, routes:6,  capacity:30, completion:0,  status:'Inactive' },
];

const ROUTES = [
  { id:1, name:'Route 14 — Downtown Loop', depot:'Central Depot',  length:'24 km', stops:18, drivers:8, status:'Active'   },
  { id:2, name:'Route 7 — Airport Express',depot:'North Terminal', length:'32 km', stops:12, drivers:6, status:'Active'   },
  { id:3, name:'Route 22 — Suburban',      depot:'South Hub',      length:'18 km', stops:14, drivers:5, status:'Active'   },
  { id:4, name:'Route 9 — Business Bay',   depot:'Central Depot',  length:'15 km', stops:10, drivers:7, status:'Active'   },
  { id:5, name:'Route 33 — School Circuit',depot:'West Garage',    length:'22 km', stops:16, drivers:4, status:'Active'   },
  { id:6, name:'Route 41 — Marina Link',   depot:'East Station',   length:'28 km', stops:20, drivers:3, status:'Inactive' },
];

function depotColor(p) {
  if (p >= 90) return 'var(--green)';
  if (p >= 75) return 'var(--amber)';
  return 'var(--red)';
}
function depotCls(p) {
  if (p >= 90) return 'prog-green';
  if (p >= 75) return 'prog-amber';
  return 'prog-red';
}

export default function DepotsPage() {
  const [tab,     setTab]     = useState('depots');
  const [search,  setSearch]  = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [depots,  setDepots]  = useState(DEPOTS);
  const [routes,  setRoutes]  = useState(ROUTES);
  const [toast,   setToast]   = useState('');
  const [newD,    setNewD]    = useState({ name:'', code:'', city:'Dubai', manager:'', capacity:'30' });
  const [newR,    setNewR]    = useState({ name:'', depot:'Central Depot', length:'', stops:'', status:'Active' });

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(''),3000); };

  const filteredDepots = depots.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.city.toLowerCase().includes(search.toLowerCase())
  );
  const filteredRoutes = routes.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.depot.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade-in">

      {toast && (
        <div style={{
          position:'fixed', top:20, right:20, zIndex:2000,
          background:'var(--green-dim)', border:'1px solid rgba(22,163,74,0.3)',
          borderRadius:'var(--r2)', padding:'12px 18px',
          fontSize:13, color:'var(--green)', fontWeight:600,
          boxShadow:'var(--shadow-lg)', display:'flex', alignItems:'center', gap:8,
        }}>
          <Icon name="Check" size={14} strokeWidth={2.5}/> {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>
            Depots & Routes
          </div>
          <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>
            Manage bus depots and training routes
          </div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <div className="tb-search">
            <Icon name="Search" size={13} color="var(--text3)"/>
            <input placeholder={`Search ${tab}...`}
              value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <button className="btn btn-primary" onClick={()=>setShowAdd(true)}>
            <Icon name="Plus" size={14}/> Add {tab==='depots'?'Depot':'Route'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {[
          { label:'Total Depots',  val:depots.length,                              color:'blue',  icon:'Building' },
          { label:'Total Routes',  val:routes.length,                              color:'teal',  icon:'Map'      },
          { label:'Total Drivers', val:depots.reduce((a,d)=>a+d.drivers,0),        color:'amber', icon:'Users'    },
          { label:'Avg Completion',val:Math.round(depots.filter(d=>d.completion>0).reduce((a,d)=>a+d.completion,0)/depots.filter(d=>d.completion>0).length)+'%', color:'green', icon:'BarChart' },
        ].map(t=>(
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

      {/* Tabs */}
      <div className="tabs">
        {['depots','routes'].map(t=>(
          <button key={t} className={`tab ${tab===t?'active':''}`}
            onClick={()=>{ setTab(t); setSearch(''); setShowAdd(false); }}
            style={{ border:'none', background:'none', cursor:'pointer', fontFamily:'var(--font)', textTransform:'capitalize' }}>
            <Icon name={t==='depots'?'Building':'Map'} size={13}/> {t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>

      {/* ── DEPOTS TAB ─────────────────────────── */}
      {tab === 'depots' && (
        <>
          {showAdd && (
            <div className="card mb16" style={{ borderTop:'3px solid var(--brand)' }}>
              <div style={{ fontWeight:700, fontSize:14, color:'var(--text)', marginBottom:14 }}>Add New Depot</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
                {[
                  { label:'Depot Name', key:'name',     type:'text' },
                  { label:'Code',       key:'code',     type:'text' },
                  { label:'City',       key:'city',     type:'text' },
                  { label:'Manager',    key:'manager',  type:'text' },
                  { label:'Capacity',   key:'capacity', type:'number' },
                ].map(f=>(
                  <div key={f.key} className="form-group" style={{ marginBottom:0 }}>
                    <label className="form-label">{f.label}</label>
                    <input className="form-input" type={f.type}
                      value={newD[f.key]}
                      onChange={e=>setNewD(p=>({...p,[f.key]:e.target.value}))}/>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', gap:8, marginTop:14 }}>
                <button className="btn btn-primary" onClick={()=>{
                  if (!newD.name) return;
                  setDepots(prev=>[...prev,{ id:Date.now(), ...newD, drivers:0, trainers:0, routes:0, capacity:Number(newD.capacity), completion:0, status:'Active' }]);
                  setNewD({ name:'', code:'', city:'Dubai', manager:'', capacity:'30' });
                  setShowAdd(false);
                  showToast('✅ Depot added successfully');
                }}>
                  <Icon name="Check" size={12}/> Add Depot
                </button>
                <button className="btn btn-ghost" onClick={()=>setShowAdd(false)}>Cancel</button>
              </div>
            </div>
          )}

          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {filteredDepots.map(d => (
              <div key={d.id} style={{
                background:'var(--bg2)', border:'1px solid var(--border)',
                borderRadius:'var(--r3)', padding:'18px 20px',
                boxShadow:'var(--shadow-sm)',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:14 }}>
                  <div style={{
                    width:46, height:46, borderRadius:12, flexShrink:0,
                    background: d.status==='Active' ? 'var(--blue-dim)' : 'var(--bg4)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    border:`1.5px solid ${d.status==='Active'?'rgba(27,110,243,0.2)':'var(--border)'}`,
                  }}>
                    <Icon name="Building" size={20} color={d.status==='Active'?'var(--blue)':'var(--text3)'}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:5 }}>
                      <span style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>{d.name}</span>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text3)', background:'var(--bg4)', padding:'2px 8px', borderRadius:5 }}>{d.code}</span>
                      <span className={`badge ${d.status==='Active'?'badge-green':'badge-gray'}`}>
                        {d.status}
                      </span>
                    </div>
                    <div style={{ display:'flex', gap:8 }}>
                      <span className="chip" style={{ fontSize:10 }}><Icon name="Map" size={9}/> {d.city}</span>
                      <span className="chip" style={{ fontSize:10 }}><Icon name="Users" size={9}/> Manager: {d.manager}</span>
                    </div>
                  </div>

                  {/* Completion */}
                  <div style={{ textAlign:'center', minWidth:80 }}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:22, fontWeight:800, color:depotColor(d.completion) }}>
                      {d.completion}%
                    </div>
                    <div style={{ fontSize:10, color:'var(--text3)', fontWeight:600 }}>Completion</div>
                  </div>
                </div>

                {/* Stats grid */}
                <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:12 }}>
                  {[
                    { label:'Drivers',  val:d.drivers,  icon:'Users'      },
                    { label:'Trainers', val:d.trainers, icon:'GraduationCap'},
                    { label:'Routes',   val:d.routes,   icon:'Map'        },
                    { label:'Capacity', val:d.capacity, icon:'Layers'     },
                  ].map(s=>(
                    <div key={s.label} style={{
                      background:'var(--bg3)', borderRadius:'var(--r)', padding:'8px 12px',
                      border:'1px solid var(--border)', textAlign:'center',
                    }}>
                      <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600, marginBottom:3, display:'flex', alignItems:'center', justifyContent:'center', gap:3 }}>
                        <Icon name={s.icon} size={9}/> {s.label}
                      </div>
                      <div style={{ fontSize:16, fontWeight:800, color:'var(--text)' }}>{s.val}</div>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                    <span style={{ fontSize:11, color:'var(--text3)' }}>Training Completion</span>
                    <span style={{ fontSize:11, fontWeight:700, color:depotColor(d.completion) }}>{d.completion}%</span>
                  </div>
                  <div className="prog-bar" style={{ height:7 }}>
                    <div className={`prog-fill ${depotCls(d.completion)}`} style={{ width:`${d.completion}%` }}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── ROUTES TAB ─────────────────────────── */}
      {tab === 'routes' && (
        <>
          {showAdd && (
            <div className="card mb16" style={{ borderTop:'3px solid var(--teal)' }}>
              <div style={{ fontWeight:700, fontSize:14, color:'var(--text)', marginBottom:14 }}>Add New Route</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
                {[
                  { label:'Route Name', key:'name',   type:'text'   },
                  { label:'Length',     key:'length', type:'text'   },
                  { label:'Stops',      key:'stops',  type:'number' },
                ].map(f=>(
                  <div key={f.key} className="form-group" style={{ marginBottom:0 }}>
                    <label className="form-label">{f.label}</label>
                    <input className="form-input" type={f.type}
                      value={newR[f.key]}
                      onChange={e=>setNewR(p=>({...p,[f.key]:e.target.value}))}/>
                  </div>
                ))}
                <div className="form-group" style={{ marginBottom:0 }}>
                  <label className="form-label">Depot</label>
                  <select className="form-input" value={newR.depot}
                    onChange={e=>setNewR(p=>({...p,depot:e.target.value}))}>
                    {depots.map(d=><option key={d.id}>{d.name}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display:'flex', gap:8, marginTop:14 }}>
                <button className="btn btn-primary" onClick={()=>{
                  if (!newR.name) return;
                  setRoutes(prev=>[...prev,{ id:Date.now(), ...newR, stops:Number(newR.stops)||0, drivers:0 }]);
                  setNewR({ name:'', depot:'Central Depot', length:'', stops:'', status:'Active' });
                  setShowAdd(false);
                  showToast('✅ Route added successfully');
                }}>
                  <Icon name="Check" size={12}/> Add Route
                </button>
                <button className="btn btn-ghost" onClick={()=>setShowAdd(false)}>Cancel</button>
              </div>
            </div>
          )}

          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Depot</th>
                  <th>Length</th>
                  <th>Stops</th>
                  <th>Drivers</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoutes.map(r => (
                  <tr key={r.id}>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <Icon name="Map" size={13} color="var(--text3)"/>
                        <span style={{ fontWeight:600, color:'var(--text)' }}>{r.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="chip" style={{ fontSize:10 }}>
                        <Icon name="Building" size={9}/> {r.depot}
                      </span>
                    </td>
                    <td><span style={{ fontFamily:'var(--font-mono)', fontSize:12 }}>{r.length}</span></td>
                    <td><span style={{ fontFamily:'var(--font-mono)', fontSize:12 }}>{r.stops} stops</span></td>
                    <td>
                      <span className="chip" style={{ fontSize:10 }}>
                        <Icon name="Users" size={9}/> {r.drivers}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${r.status==='Active'?'badge-green':'badge-gray'}`}>
                        <Icon name={r.status==='Active'?'Zap':'X'} size={9} strokeWidth={2.5}/>
                        {r.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display:'flex', gap:5 }}>
                        <button className="btn btn-ghost btn-sm">
                          <Icon name="Edit" size={11}/>
                        </button>
                        <button className="btn btn-danger btn-sm"
                          onClick={()=>{ setRoutes(prev=>prev.filter(x=>x.id!==r.id)); showToast('Route removed'); }}>
                          <Icon name="X" size={11}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}