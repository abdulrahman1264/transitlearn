import React, { useState } from 'react';
import Icon from '../components/Icons';

const TRAINERS = [
  { id:1, name:'Elena Marsh', avatar:'EM', specialty:'Pre-Service & School Bus', active:true  },
  { id:2, name:'Tom Alvarez', avatar:'TA', specialty:'In-Service & BTW',         active:true  },
  { id:3, name:'Sara Ahmed',  avatar:'SA', specialty:'All Categories',           active:false },
];

const BATCHES = [
  { id:'Batch 153', label:'Batch 153 — Apr 2026', category:'public-pre',  catLabel:'Public Bus — Pre Service', color:'blue',  start:'2026-04-06', end:'2026-06-30', capacity:50 },
  { id:'Batch 154', label:'Batch 154 — Apr 2026', category:'public-in',   catLabel:'Public Bus — In Service',  color:'teal',  start:'2026-04-10', end:'2026-07-10', capacity:40 },
  { id:'Batch 155', label:'Batch 155 — May 2026', category:'school-bus',  catLabel:'School Bus Training',      color:'amber', start:'2026-05-01', end:'2026-07-31', capacity:30 },
];

const UNASSIGNED_DRIVERS = [
  { id:10, name:'Ahmed Al Mansouri', avatar:'AA', nationality:'UAE',      joinDate:'2026-04-20', batchCode:'BATCH-153', category:'public-pre'  },
  { id:11, name:'Priya Sundaram',    avatar:'PS', nationality:'India',    joinDate:'2026-04-21', batchCode:'BATCH-154', category:'public-in'   },
  { id:12, name:'Khalid Hassan',     avatar:'KH', nationality:'UAE',      joinDate:'2026-04-22', batchCode:'BATCH-153', category:'public-pre'  },
  { id:13, name:'Ravi Kumar',        avatar:'RK', nationality:'India',    joinDate:'2026-04-23', batchCode:'BATCH-155', category:'school-bus'  },
  { id:14, name:'James Obi',         avatar:'JO', nationality:'Nigeria',  joinDate:'2026-04-23', batchCode:'BATCH-154', category:'public-in'   },
];

const COLOR_MAP = { blue:'var(--blue)', teal:'var(--teal)', amber:'var(--amber)' };
const DIM_MAP   = { blue:'var(--blue-dim)', teal:'var(--teal-dim)', amber:'var(--amber-dim)' };

export default function BatchAssignPage() {
  const [assignments, setAssignments] = useState(
    // Pre-assign each driver to a trainer based on batch
    UNASSIGNED_DRIVERS.reduce((acc, d) => {
      acc[d.id] = { trainer: null, batch: d.batchCode.replace('BATCH-','Batch ') };
      return acc;
    }, {})
  );
  const [saved,  setSaved]  = useState({});
  const [toast,  setToast]  = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(''),3000); };

  const handleAssign = (driverId, field, value) => {
    setAssignments(prev => ({ ...prev, [driverId]: { ...prev[driverId], [field]: value } }));
    setSaved(prev => ({ ...prev, [driverId]: false }));
  };

  const handleSave = (driver) => {
    const a = assignments[driver.id];
    if (!a.trainer || !a.batch) { showToast('❌ Please select both trainer and batch'); return; }
    setSaved(prev => ({ ...prev, [driver.id]: true }));
    showToast(`✅ ${driver.name} assigned to ${a.trainer} · ${a.batch}`);
  };

  const handleSaveAll = () => {
    const allComplete = UNASSIGNED_DRIVERS.every(d => assignments[d.id]?.trainer && assignments[d.id]?.batch);
    if (!allComplete) { showToast('❌ Please assign all drivers first'); return; }
    const newSaved = {};
    UNASSIGNED_DRIVERS.forEach(d => { newSaved[d.id] = true; });
    setSaved(newSaved);
    showToast(`✅ All ${UNASSIGNED_DRIVERS.length} drivers assigned successfully!`);
  };

  const assignedCount = UNASSIGNED_DRIVERS.filter(d => saved[d.id]).length;

  return (
    <div className="fade-in">

      {/* Toast */}
      {toast && (
        <div style={{ position:'fixed', top:20, right:20, zIndex:4000, background: toast.startsWith('❌')?'var(--red-dim)':'var(--green-dim)', border:`1px solid ${toast.startsWith('❌')?'rgba(220,38,38,0.3)':'rgba(22,163,74,0.3)'}`, borderRadius:'var(--r2)', padding:'12px 18px', fontSize:13, fontWeight:600, color:toast.startsWith('❌')?'var(--red)':'var(--green)', boxShadow:'var(--shadow-lg)', display:'flex', alignItems:'center', gap:8 }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>
            Batch & Trainer Assignment
          </div>
          <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>
            Assign approved drivers to a trainer and training batch
          </div>
        </div>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <span style={{ fontSize:12, color:'var(--text3)' }}>
            {assignedCount} of {UNASSIGNED_DRIVERS.length} assigned
          </span>
          <button className="btn btn-primary" onClick={handleSaveAll}>
            <Icon name="Check" size={14}/> Save All Assignments
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom:24 }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
          <span style={{ fontSize:12, fontWeight:600, color:'var(--text2)' }}>Assignment Progress</span>
          <span style={{ fontSize:12, fontWeight:700, color:'var(--blue)' }}>{assignedCount}/{UNASSIGNED_DRIVERS.length}</span>
        </div>
        <div className="prog-bar" style={{ height:8 }}>
          <div className="prog-fill prog-blue" style={{ width:`${UNASSIGNED_DRIVERS.length>0?(assignedCount/UNASSIGNED_DRIVERS.length)*100:0}%` }}/>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:20, alignItems:'start' }}>

        {/* Left — driver assignment cards */}
        <div>
          <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:14 }}>
            Drivers Awaiting Assignment ({UNASSIGNED_DRIVERS.length})
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {UNASSIGNED_DRIVERS.map(driver => {
              const a   = assignments[driver.id] || {};
              const isSaved = saved[driver.id];
              const batch = BATCHES.find(b => b.id === a.batch);
              const cc  = batch ? batch.color : 'blue';

              return (
                <div key={driver.id} style={{
                  background:'var(--bg2)',
                  border:`1px solid ${isSaved ? 'rgba(22,163,74,0.3)' : 'var(--border)'}`,
                  borderLeft:`4px solid ${isSaved ? 'var(--green)' : batch ? COLOR_MAP[cc] : 'var(--bg5)'}`,
                  borderRadius:'var(--r3)',
                  padding:'18px 20px',
                  boxShadow:'var(--shadow-sm)',
                  transition:'all 0.15s',
                }}>
                  {/* Driver info row */}
                  <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
                    <div style={{ width:44, height:44, borderRadius:12, flexShrink:0, background: isSaved?'var(--green-dim)':batch?DIM_MAP[cc]:'var(--bg4)', color: isSaved?'var(--green)':batch?COLOR_MAP[cc]:'var(--text3)', border:`1.5px solid ${isSaved?'rgba(22,163,74,0.2)':batch?COLOR_MAP[cc]+'33':'var(--border)'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, fontFamily:'var(--font-mono)' }}>
                      {driver.avatar}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                        <span style={{ fontSize:14.5, fontWeight:800, color:'var(--text)' }}>{driver.name}</span>
                        {isSaved && <span className="badge badge-green"><Icon name="Check" size={9} strokeWidth={2.5}/> Assigned</span>}
                      </div>
                      <div style={{ display:'flex', gap:8 }}>
                        <span className="chip" style={{ fontSize:10 }}>{driver.nationality}</span>
                        <span className="chip" style={{ fontSize:10 }}><Icon name="Key" size={9}/> {driver.batchCode}</span>
                        <span className="chip" style={{ fontSize:10 }}><Icon name="Calendar" size={9}/> {driver.joinDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Assignment selectors */}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14 }}>
                    {/* Trainer */}
                    <div>
                      <label className="form-label" style={{ display:'flex', alignItems:'center', gap:5 }}>
                        <Icon name="GraduationCap" size={11}/> Assign Trainer *
                      </label>
                      <select className="form-input" value={a.trainer||''} onChange={e=>handleAssign(driver.id,'trainer',e.target.value)} disabled={isSaved}>
                        <option value="">Select trainer...</option>
                        {TRAINERS.filter(t=>t.active).map(t=>(
                          <option key={t.id} value={t.name}>{t.name}</option>
                        ))}
                      </select>
                    </div>
                    {/* Batch */}
                    <div>
                      <label className="form-label" style={{ display:'flex', alignItems:'center', gap:5 }}>
                        <Icon name="Layers" size={11}/> Assign Batch *
                      </label>
                      <select className="form-input" value={a.batch||''} onChange={e=>handleAssign(driver.id,'batch',e.target.value)} disabled={isSaved}>
                        <option value="">Select batch...</option>
                        {BATCHES.map(b=>(
                          <option key={b.id} value={b.id}>{b.label} — {b.catLabel}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Batch info preview */}
                  {batch && (
                    <div style={{ background:DIM_MAP[batch.color], border:`1px solid ${COLOR_MAP[batch.color]}22`, borderRadius:'var(--r)', padding:'10px 14px', marginBottom:12, display:'flex', gap:16 }}>
                      {[
                        { icon:'Layers',   label:'Category', val:batch.catLabel },
                        { icon:'Calendar', label:'Start',    val:batch.start    },
                        { icon:'Clock',    label:'End',      val:batch.end      },
                        { icon:'Users',    label:'Capacity', val:batch.capacity },
                      ].map(s=>(
                        <div key={s.label}>
                          <div style={{ fontSize:9, fontWeight:700, color:`${COLOR_MAP[batch.color]}99`, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:2 }}>{s.label}</div>
                          <div style={{ fontSize:11, fontWeight:600, color:COLOR_MAP[batch.color] }}>{s.val}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Trainer info preview */}
                  {a.trainer && (
                    <div style={{ display:'flex', alignItems:'center', gap:10, background:'var(--teal-dim)', border:'1px solid rgba(8,145,178,0.2)', borderRadius:'var(--r)', padding:'10px 14px', marginBottom:12 }}>
                      <div style={{ width:30, height:30, borderRadius:8, background:'var(--teal-dim)', color:'var(--teal)', border:'1px solid rgba(8,145,178,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, fontFamily:'var(--font-mono)' }}>
                        {TRAINERS.find(t=>t.name===a.trainer)?.avatar||'??'}
                      </div>
                      <div>
                        <div style={{ fontSize:12, fontWeight:700, color:'var(--teal)' }}>{a.trainer}</div>
                        <div style={{ fontSize:10, color:'var(--text3)' }}>{TRAINERS.find(t=>t.name===a.trainer)?.specialty}</div>
                      </div>
                    </div>
                  )}

                  {/* Save button */}
                  {!isSaved && (
                    <button onClick={()=>handleSave(driver)} className="btn btn-primary btn-sm" style={{ width:'100%', justifyContent:'center' }}>
                      <Icon name="Check" size={12}/> Confirm Assignment
                    </button>
                  )}
                  {isSaved && (
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'8px', background:'var(--green-dim)', borderRadius:'var(--r)', border:'1px solid rgba(22,163,74,0.2)' }}>
                      <Icon name="Check" size={13} color="var(--green)" strokeWidth={2.5}/>
                      <span style={{ fontSize:12, fontWeight:700, color:'var(--green)' }}>
                        Assigned to {a.trainer} · {a.batch}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — trainers overview */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>

          {/* Trainers */}
          <div className="card">
            <div style={{ fontSize:13, fontWeight:800, color:'var(--text)', marginBottom:14 }}>
              Available Trainers
            </div>
            {TRAINERS.map(t=>(
              <div key={t.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:'1px solid var(--border)' }}>
                <div style={{ width:36, height:36, borderRadius:9, background:t.active?'var(--teal-dim)':'var(--bg4)', color:t.active?'var(--teal)':'var(--text3)', border:`1px solid ${t.active?'rgba(8,145,178,0.2)':'var(--border)'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, fontFamily:'var(--font-mono)', flexShrink:0 }}>
                  {t.avatar}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{t.name}</div>
                  <div style={{ fontSize:10, color:'var(--text3)', marginTop:1 }}>{t.specialty}</div>
                </div>
                <span className={t.active?'badge badge-green':'badge badge-gray'}>
                  {t.active?'Active':'Inactive'}
                </span>
              </div>
            ))}
          </div>

          {/* Batches */}
          <div className="card">
            <div style={{ fontSize:13, fontWeight:800, color:'var(--text)', marginBottom:14 }}>
              Active Batches
            </div>
            {BATCHES.map(b=>(
              <div key={b.id} style={{ padding:'12px', background:DIM_MAP[b.color], border:`1px solid ${COLOR_MAP[b.color]}22`, borderRadius:'var(--r2)', marginBottom:10 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:COLOR_MAP[b.color] }}>{b.id}</div>
                  <span style={{ fontSize:10, fontWeight:600, color:COLOR_MAP[b.color] }}>{b.capacity} capacity</span>
                </div>
                <div style={{ fontSize:11, color:'var(--text2)', marginBottom:4 }}>{b.catLabel}</div>
                <div style={{ fontSize:10, color:'var(--text3)' }}>{b.start} → {b.end}</div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div style={{ background:'var(--blue-dim)', border:'1px solid rgba(27,110,243,0.15)', borderRadius:'var(--r2)', padding:'14px 16px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:10 }}>
              <Icon name="Info" size={13} color="var(--blue)"/>
              <span style={{ fontSize:12, fontWeight:700, color:'var(--blue)' }}>How it works</span>
            </div>
            {[
              'Driver registers with batch code',
              'Admin approves in New Registrations',
              'Admin assigns trainer + batch here',
              'Driver logs in and sees their courses',
              'Trainer can see their assigned drivers',
            ].map((tip,i)=>(
              <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, marginBottom:5 }}>
                <div style={{ width:16, height:16, borderRadius:'50%', background:'var(--blue)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:800, flexShrink:0, marginTop:1 }}>{i+1}</div>
                <span style={{ fontSize:11, color:'var(--text2)', lineHeight:1.4 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}