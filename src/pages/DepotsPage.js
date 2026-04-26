import React, { useState } from 'react';
import Icon from '../components/Icons';

const INITIAL_DEPOTS = [
  { id:1, name:'Central Depot',  code:'CD-01', city:'Dubai',   manager:'Ahmed Al Rashid', drivers:48, trainers:2, routes:12, capacity:60, completion:94, status:'Active',   phone:'+971 4 111 2233', email:'central@rta.ae'  },
  { id:2, name:'North Terminal', code:'NT-02', city:'Dubai',   manager:'Fatima Hassan',   drivers:32, trainers:1, routes:8,  capacity:40, completion:78, status:'Active',   phone:'+971 4 222 3344', email:'north@rta.ae'    },
  { id:3, name:'South Hub',      code:'SH-03', city:'Dubai',   manager:'Omar Khalid',     drivers:27, trainers:1, routes:7,  capacity:35, completion:61, status:'Active',   phone:'+971 4 333 4455', email:'south@rta.ae'    },
  { id:4, name:'East Station',   code:'ES-04', city:'Sharjah', manager:'Layla Mohamed',   drivers:19, trainers:1, routes:5,  capacity:25, completion:85, status:'Active',   phone:'+971 6 444 5566', email:'east@rta.ae'     },
  { id:5, name:'West Garage',    code:'WG-05', city:'Dubai',   manager:'Khalid Ibrahim',  drivers:41, trainers:2, routes:10, capacity:50, completion:91, status:'Active',   phone:'+971 4 555 6677', email:'west@rta.ae'     },
  { id:6, name:'Airport Hub',    code:'AH-06', city:'Dubai',   manager:'Sara Abdullah',   drivers:0,  trainers:0, routes:6,  capacity:30, completion:0,  status:'Inactive', phone:'+971 4 666 7788', email:'airport@rta.ae'  },
];

const INITIAL_ROUTES = [
  { id:1, name:'Route 14 — Downtown Loop',  depot:'Central Depot',  length:'24 km', stops:18, drivers:8,  status:'Active'   },
  { id:2, name:'Route 7 — Airport Express', depot:'North Terminal', length:'32 km', stops:12, drivers:6,  status:'Active'   },
  { id:3, name:'Route 22 — Suburban',       depot:'South Hub',      length:'18 km', stops:14, drivers:5,  status:'Active'   },
  { id:4, name:'Route 9 — Business Bay',    depot:'Central Depot',  length:'15 km', stops:10, drivers:7,  status:'Active'   },
  { id:5, name:'Route 33 — School Circuit', depot:'West Garage',    length:'22 km', stops:16, drivers:4,  status:'Active'   },
  { id:6, name:'Route 41 — Marina Link',    depot:'East Station',   length:'28 km', stops:20, drivers:3,  status:'Inactive' },
];

const EMPTY_DEPOT = { name:'', code:'', city:'Dubai', manager:'', capacity:'30', phone:'', email:'' };
const EMPTY_ROUTE = { name:'', depot:'Central Depot', length:'', stops:'', status:'Active' };

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

function DepotModal({ depot, onClose, onSave }) {
  const [form, setForm] = useState(depot || EMPTY_DEPOT);
  const set = (k,v) => setForm(p=>({...p,[k]:v}));
  const isEdit = !!depot;

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:3000,
      background:'rgba(0,0,0,0.45)', backdropFilter:'blur(6px)',
      display:'flex', alignItems:'center', justifyContent:'center',
    }} onClick={onClose}>
      <div style={{
        background:'var(--bg2)', borderRadius:'var(--r3)',
        width:520, boxShadow:'var(--shadow-lg)', overflow:'hidden',
      }} onClick={e=>e.stopPropagation()}>
        <div style={{ padding:'20px 24px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ fontSize:16, fontWeight:800, color:'var(--text)' }}>
            {isEdit ? 'Edit Depot' : 'Add New Depot'}
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text3)' }}>
            <Icon name="X" size={18}/>
          </button>
        </div>
        <div style={{ padding:'20px 24px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {[
              { label:'Depot Name *', key:'name',     type:'text'   },
              { label:'Code *',       key:'code',     type:'text'   },
              { label:'City *',       key:'city',     type:'text'   },
              { label:'Manager *',    key:'manager',  type:'text'   },
              { label:'Capacity',     key:'capacity', type:'number' },
              { label:'Phone',        key:'phone',    type:'tel'    },
              { label:'Email',        key:'email',    type:'email'  },
            ].map(f=>(
              <div key={f.key} className="form-group" style={{ marginBottom:0 }}>
                <label className="form-label">{f.label}</label>
                <input className="form-input" type={f.type}
                  value={form[f.key]||''}
                  onChange={e=>set(f.key,e.target.value)}/>
              </div>
            ))}
            <div className="form-group" style={{ marginBottom:0 }}>
              <label className="form-label">Status</label>
              <select className="form-input" value={form.status||'Active'} onChange={e=>set('status',e.target.value)}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <div style={{ padding:'16px 24px', borderTop:'1px solid var(--border)', display:'flex', justifyContent:'flex-end', gap:8 }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>{
            if (!form.name||!form.code) return;
            onSave({ ...form, id:depot?.id||Date.now(), drivers:depot?.drivers||0, trainers:depot?.trainers||0, routes:depot?.routes||0, completion:depot?.completion||0, capacity:Number(form.capacity)||30 });
            onClose();
          }}>
            <Icon name="Check" size={13}/> {isEdit?'Save Changes':'Add Depot'}
          </button>
        </div>
      </div>
      </div>
  );
}

function RouteModal({ route, depots, onClose, onSave }) {
  const [form, setForm] = useState(route || EMPTY_ROUTE);
  const set = (k,v) => setForm(p=>({...p,[k]:v}));
  const isEdit = !!route;

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:3000,
      background:'rgba(0,0,0,0.45)', backdropFilter:'blur(6px)',
      display:'flex', alignItems:'center', justifyContent:'center',
    }} onClick={onClose}>
      <div style={{
        background:'var(--bg2)', borderRadius:'var(--r3)',
        width:480, boxShadow:'var(--shadow-lg)', overflow:'hidden',
      }} onClick={e=>e.stopPropagation()}>
        <div style={{ padding:'20px 24px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ fontSize:16, fontWeight:800, color:'var(--text)' }}>
            {isEdit ? 'Edit Route' : 'Add New Route'}
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text3)' }}>
            <Icon name="X" size={18}/>
          </button>
        </div>
        <div style={{ padding:'20px 24px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div className="form-group" style={{ marginBottom:0, gridColumn:'1/-1' }}>
              <label className="form-label">Route Name *</label>
              <input className="form-input" placeholder="e.g. Route 14 — Downtown Loop"
                value={form.name} onChange={e=>set('name',e.target.value)}/>
            </div>
            <div className="form-group" style={{ marginBottom:0 }}>
              <label className="form-label">Depot *</label>
              <select className="form-input" value={form.depot} onChange={e=>set('depot',e.target.value)}>
                {depots.map(d=><option key={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom:0 }}>
              <label className="form-label">Status</label>
              <select className="form-input" value={form.status} onChange={e=>set('status',e.target.value)}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom:0 }}>
              <label className="form-label">Length</label>
              <input className="form-input" placeholder="e.g. 24 km"
                value={form.length} onChange={e=>set('length',e.target.value)}/>
            </div>
            <div className="form-group" style={{ marginBottom:0 }}>
              <label className="form-label">Number of Stops</label>
              <input className="form-input" type="number" placeholder="e.g. 18"
                value={form.stops} onChange={e=>set('stops',e.target.value)}/>
            </div>
          </div>
        </div>
        <div style={{ padding:'16px 24px', borderTop:'1px solid var(--border)', display:'flex', justifyContent:'flex-end', gap:8 }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>{
            if (!form.name) return;
            onSave({ ...form, id:route?.id||Date.now(), stops:Number(form.stops)||0, drivers:route?.drivers||0 });
            onClose();
          }}>
            <Icon name="Check" size={13}/> {isEdit?'Save Changes':'Add Route'}
          </button>
        </div>
      </div>
      </div>
  );
}

export default function DepotsPage() {
  const [tab,          setTab]          = useState('depots');
  const [depots,       setDepots]       = useState(INITIAL_DEPOTS);
  const [routes,       setRoutes]       = useState(INITIAL_ROUTES);
  const [search,       setSearch]       = useState('');
  const [toast,        setToast]        = useState('');
  const [depotModal,   setDepotModal]   = useState(null); // null | 'new' | depot obj
  const [routeModal,   setRouteModal]   = useState(null);

  const showToast = (msg, type='green') => {
    setToast({ msg, type });
    setTimeout(()=>setToast(''), 3000);
  };

  // CRUD depots
  const saveDepot = (depot) => {
    setDepots(prev => prev.find(d=>d.id===depot.id)
      ? prev.map(d=>d.id===depot.id?depot:d)
      : [...prev, depot]
    );
    showToast(`✅ Depot "${depot.name}" saved`);
  };
  const deleteDepot = (id) => {
    const d = depots.find(x=>x.id===id);
    if (window.confirm(`Delete "${d.name}"? This cannot be undone.`)) {
      setDepots(prev=>prev.filter(x=>x.id!==id));
      showToast(`✅ Depot removed`);
    }
  };

  // CRUD routes
  const saveRoute = (route) => {
    setRoutes(prev => prev.find(r=>r.id===route.id)
      ? prev.map(r=>r.id===route.id?route:r)
      : [...prev, route]
    );
    showToast(`✅ Route "${route.name}" saved`);
  };
  const deleteRoute = (id) => {
    const r = routes.find(x=>x.id===id);
    if (window.confirm(`Delete "${r.name}"?`)) {
      setRoutes(prev=>prev.filter(x=>x.id!==id));
      showToast(`✅ Route removed`);
    }
  };

  const filteredDepots = depots.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.city.toLowerCase().includes(search.toLowerCase()) ||
    d.manager.toLowerCase().includes(search.toLowerCase())
  );
  const filteredRoutes = routes.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.depot.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade-in">

      {/* Modals */}
      {depotModal !== null && (
        <DepotModal
          depot={depotModal === 'new' ? null : depotModal}
          onClose={()=>setDepotModal(null)}
          onSave={saveDepot}
        />
      )}
      {routeModal !== null && (
        <RouteModal
          route={routeModal === 'new' ? null : routeModal}
          depots={depots}
          onClose={()=>setRouteModal(null)}
          onSave={saveRoute}
        />
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position:'fixed', top:20, right:20, zIndex:4000,
          background:'var(--green-dim)', border:'1px solid rgba(22,163,74,0.3)',
          borderRadius:'var(--r2)', padding:'12px 18px',
          fontSize:13, color:'var(--green)', fontWeight:600,
          boxShadow:'var(--shadow-lg)', display:'flex', alignItems:'center', gap:8,
        }}>
          <Icon name="Check" size={14} strokeWidth={2.5}/> {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>
            Depots & Routes
          </div>
          <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>
            Manage bus depots and training routes across all locations
          </div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <div className="tb-search">
            <Icon name="Search" size={13} color="var(--text3)"/>
            <input placeholder={`Search ${tab}...`}
              value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <button className="btn btn-primary"
            onClick={()=>tab==='depots'?setDepotModal('new'):setRouteModal('new')}>
            <Icon name="Plus" size={14}/> Add {tab==='depots'?'Depot':'Route'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {[
          { label:'Total Depots',   val:depots.length,                               color:'blue',  icon:'Building' },
          { label:'Active Depots',  val:depots.filter(d=>d.status==='Active').length, color:'green', icon:'Zap'      },
          { label:'Total Routes',   val:routes.length,                               color:'teal',  icon:'Map'      },
          { label:'Total Drivers',  val:depots.reduce((a,d)=>a+d.drivers,0),          color:'amber', icon:'Users'    },
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
        {[
          { key:'depots', icon:'Building', label:'Depots' },
          { key:'routes', icon:'Map',      label:'Routes' },
        ].map(t=>(
          <button key={t.key} className={`tab ${tab===t.key?'active':''}`}
            onClick={()=>{ setTab(t.key); setSearch(''); }}
            style={{ border:'none', background:'none', cursor:'pointer', fontFamily:'var(--font)', display:'flex', alignItems:'center', gap:6 }}>
            <Icon name={t.icon} size={13}/> {t.label}
          </button>
        ))}
      </div>

      {/* ── DEPOTS ──────────────────────────────── */}
      {tab === 'depots' && (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {filteredDepots.length === 0 ? (
            <div className="card empty-state">
              <div className="empty-icon">🏢</div>
              <div>No depots found</div>
            </div>
          ) : filteredDepots.map(d => (
            <div key={d.id} style={{
              background:'var(--bg2)', border:'1px solid var(--border)',
              borderRadius:'var(--r3)', padding:'18px 20px',
              boxShadow:'var(--shadow-sm)', transition:'all 0.15s',
              borderLeft:`4px solid ${d.status==='Active'?depotColor(d.completion):'var(--bg5)'}`,
            }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:14, marginBottom:14 }}>

                {/* Icon */}
                <div style={{
                  width:46, height:46, borderRadius:12, flexShrink:0,
                  background: d.status==='Active' ? 'var(--blue-dim)' : 'var(--bg4)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  border:`1.5px solid ${d.status==='Active'?'rgba(27,110,243,0.2)':'var(--border)'}`,
                }}>
                  <Icon name="Building" size={20} color={d.status==='Active'?'var(--blue)':'var(--text3)'}/>
                </div>

                {/* Info */}
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                    <span style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>{d.name}</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text3)', background:'var(--bg4)', padding:'2px 8px', borderRadius:5 }}>{d.code}</span>
                    <span className={`badge ${d.status==='Active'?'badge-green':'badge-gray'}`}>
                      <Icon name={d.status==='Active'?'Zap':'X'} size={9} strokeWidth={2.5}/> {d.status}
                    </span>
                  </div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
                    <span className="chip" style={{ fontSize:10 }}><Icon name="Map" size={9}/> {d.city}</span>
                    <span className="chip" style={{ fontSize:10 }}><Icon name="Users" size={9}/> {d.manager}</span>
                    {d.phone && <span className="chip" style={{ fontSize:10 }}><Icon name="Info" size={9}/> {d.phone}</span>}
                    {d.email && <span className="chip" style={{ fontSize:10 }}><Icon name="Mail" size={9}/> {d.email}</span>}
                  </div>

                  {/* Stats */}
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
                    {[
                      { label:'Drivers',  val:d.drivers,  color:'var(--blue)'  },
                      { label:'Trainers', val:d.trainers, color:'var(--teal)'  },
                      { label:'Routes',   val:d.routes,   color:'var(--amber)' },
                      { label:'Capacity', val:d.capacity, color:'var(--purple)'},
                    ].map(s=>(
                      <div key={s.label} style={{
                        background:'var(--bg3)', borderRadius:'var(--r)',
                        padding:'8px 10px', border:'1px solid var(--border)', textAlign:'center',
                      }}>
                        <div style={{ fontSize:17, fontWeight:800, color:s.color }}>{s.val}</div>
                        <div style={{ fontSize:10, color:'var(--text3)', fontWeight:600 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Completion + Actions */}
                <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:10, flexShrink:0 }}>
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:24, fontWeight:800, color:depotColor(d.completion) }}>
                      {d.completion}%
                    </div>
                    <div style={{ fontSize:10, color:'var(--text3)', fontWeight:600 }}>Training</div>
                  </div>
                  <div style={{ display:'flex', gap:6 }}>
                    <button className="btn btn-ghost btn-sm" onClick={()=>setDepotModal(d)}>
                      <Icon name="Edit" size={12}/> Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={()=>deleteDepot(d.id)}>
                      <Icon name="X" size={12}/>
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="prog-bar" style={{ height:6 }}>
                <div className={`prog-fill ${depotCls(d.completion)}`} style={{ width:`${d.completion}%` }}/>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── ROUTES ──────────────────────────────── */}
      {tab === 'routes' && (
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
              {filteredRoutes.length === 0 ? (
                <tr><td colSpan={7}>
                  <div className="empty-state"><div className="empty-icon">🗺️</div><div>No routes found</div></div>
                </td></tr>
              ) : filteredRoutes.map(r=>(
                <tr key={r.id}>
                  <td>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <div style={{ width:32, height:32, borderRadius:8, background:'var(--teal-dim)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <Icon name="Map" size={14} color="var(--teal)"/>
                      </div>
                      <span style={{ fontWeight:700, color:'var(--text)' }}>{r.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="chip" style={{ fontSize:10 }}>
                      <Icon name="Building" size={9}/> {r.depot}
                    </span>
                  </td>
                  <td><span style={{ fontFamily:'var(--font-mono)', fontSize:12 }}>{r.length}</span></td>
                  <td><span style={{ fontFamily:'var(--font-mono)', fontSize:12, fontWeight:600 }}>{r.stops}</span></td>
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
                    <div style={{ display:'flex', gap:6 }}>
                      <button className="btn btn-ghost btn-sm" onClick={()=>setRouteModal(r)}>
                        <Icon name="Edit" size={11}/> Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={()=>deleteRoute(r.id)}>
                        <Icon name="X" size={11}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}