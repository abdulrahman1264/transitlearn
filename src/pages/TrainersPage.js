import React, { useState } from 'react';
import Icon from '../components/Icons';

const TRAINERS = [
  { id:1, name:'Elena Marsh',  avatar:'EM', email:'elena@transitlearn.com',  phone:'+971 50 123 4567', category:'Public Bus — Pre Service', depot:'Central', drivers:4, courses:3, btw:24, joined:'2024-03-15', status:'Active',   rating:4.8 },
  { id:2, name:'Tom Alvarez',  avatar:'TA', email:'tom@transitlearn.com',    phone:'+971 55 234 5678', category:'Public Bus — In Service',  depot:'North',   drivers:2, courses:2, btw:18, joined:'2024-03-15', status:'Active',   rating:4.6 },
  { id:3, name:'Sara Ahmed',   avatar:'SA', email:'sara@transitlearn.com',   phone:'+971 52 345 6789', category:'School Bus Training',      depot:'South',   drivers:0, courses:1, btw:8,  joined:'2024-06-01', status:'Active',   rating:4.9 },
  { id:4, name:'James Cooper', avatar:'JC', email:'james@transitlearn.com',  phone:'+971 56 456 7890', category:'Public Bus — Pre Service', depot:'East',    drivers:0, courses:0, btw:0,  joined:'2025-01-10', status:'Inactive', rating:0   },
];

function TrainerDetail({ trainer, onBack }) {
  return (
    <div className="fade-in">
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <Icon name="ArrowLeft" size={13}/> Trainers
        </button>
        <Icon name="ChevronRight" size={13} color="var(--text3)"/>
        <span style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{trainer.name}</span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>

        {/* Profile */}
        <div className="card">
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20, paddingBottom:16, borderBottom:'1px solid var(--border)' }}>
            <div style={{
              width:64, height:64, borderRadius:18, flexShrink:0,
              background:'var(--teal-dim)', color:'var(--teal)',
              border:'2px solid rgba(8,145,178,0.25)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:20, fontWeight:800, fontFamily:'var(--font-mono)',
            }}>{trainer.avatar}</div>
            <div>
              <div style={{ fontSize:18, fontWeight:800, color:'var(--text)' }}>{trainer.name}</div>
              <div style={{ fontSize:12, color:'var(--text3)', marginTop:4 }}>{trainer.category}</div>
              <span className={`badge ${trainer.status==='Active'?'badge-green':'badge-gray'}`} style={{ marginTop:6 }}>
                <Icon name={trainer.status==='Active'?'Zap':'X'} size={9} strokeWidth={2.5}/>
                {trainer.status}
              </span>
            </div>
          </div>
          {[
            { label:'Email',    val:trainer.email,    icon:'Mail'     },
            { label:'Phone',    val:trainer.phone,    icon:'Info'     },
            { label:'Depot',    val:trainer.depot,    icon:'Building' },
            { label:'Category', val:trainer.category, icon:'Layers'   },
            { label:'Joined',   val:trainer.joined,   icon:'Calendar' },
            { label:'Rating',   val:`${trainer.rating}/5.0`, icon:'Star' },
          ].map(r => (
            <div key={r.label} className="kv-row">
              <span className="kv-key" style={{ display:'flex', alignItems:'center', gap:5 }}>
                <Icon name={r.icon} size={11}/> {r.label}
              </span>
              <span className="kv-val" style={{ fontSize:12 }}>{r.val}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {[
              { label:'Assigned Drivers', val:trainer.drivers, icon:'Users',   color:'blue'  },
              { label:'Courses Created',  val:trainer.courses, icon:'Book',    color:'teal'  },
              { label:'BTW Sessions',     val:trainer.btw,     icon:'Car',     color:'amber' },
              { label:'Rating',           val:trainer.rating||'—', icon:'Star',color:'green' },
            ].map(t => (
              <div key={t.label} style={{
                background:'var(--bg2)', border:'1px solid var(--border)',
                borderRadius:'var(--r2)', padding:'14px 16px',
                display:'flex', alignItems:'center', gap:12,
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

          {/* Actions */}
          <div className="card">
            <div style={{ fontWeight:700, fontSize:13, color:'var(--text)', marginBottom:14 }}>Quick Actions</div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              <button className="btn btn-primary w100">
                <Icon name="Mail" size={13}/> Send Message
              </button>
              <button className="btn btn-ghost w100">
                <Icon name="Users" size={13}/> View Assigned Drivers
              </button>
              <button className="btn btn-ghost w100">
                <Icon name="Book" size={13}/> View Courses
              </button>
              <button className="btn btn-danger w100">
                <Icon name="X" size={13}/> Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrainersPage() {
  const [selected, setSelected] = useState(null);
  const [search,   setSearch]   = useState('');
  const [filter,   setFilter]   = useState('All');
  const [showAdd,  setShowAdd]  = useState(false);
  const [trainers, setTrainers] = useState(TRAINERS);
  const [newT,     setNewT]     = useState({ name:'', email:'', phone:'', category:'Public Bus — Pre Service', depot:'Central' });
  const [toast,    setToast]    = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(''),3000); };

  if (selected) return <TrainerDetail trainer={selected} onBack={()=>setSelected(null)}/>;

  const filtered = trainers.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                        t.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter==='All' || t.status===filter;
    return matchSearch && matchFilter;
  });

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
            Trainer Management
          </div>
          <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>
            Manage trainers, assignments and performance
          </div>
        </div>
        <button className="btn btn-primary" onClick={()=>setShowAdd(true)}>
          <Icon name="Plus" size={14}/> Add Trainer
        </button>
      </div>

      {/* Add trainer form */}
      {showAdd && (
        <div className="card mb24" style={{ borderTop:'3px solid var(--brand)' }}>
          <div style={{ fontWeight:700, fontSize:14, color:'var(--text)', marginBottom:16 }}>
            Add New Trainer
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
            {[
              { label:'Full Name',  key:'name',     type:'text'  },
              { label:'Email',      key:'email',    type:'email' },
              { label:'Phone',      key:'phone',    type:'tel'   },
            ].map(f => (
              <div key={f.key} className="form-group" style={{ marginBottom:0 }}>
                <label className="form-label">{f.label}</label>
                <input className="form-input" type={f.type}
                  value={newT[f.key]}
                  onChange={e=>setNewT(p=>({...p,[f.key]:e.target.value}))}/>
              </div>
            ))}
            <div className="form-group" style={{ marginBottom:0 }}>
              <label className="form-label">Category</label>
              <select className="form-input" value={newT.category}
                onChange={e=>setNewT(p=>({...p,category:e.target.value}))}>
                <option>Public Bus — Pre Service</option>
                <option>Public Bus — In Service</option>
                <option>School Bus Training</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom:0 }}>
              <label className="form-label">Depot</label>
              <select className="form-input" value={newT.depot}
                onChange={e=>setNewT(p=>({...p,depot:e.target.value}))}>
                {['Central','North','South','East','West'].map(d=><option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display:'flex', gap:8, marginTop:14 }}>
            <button className="btn btn-primary" onClick={()=>{
              if (!newT.name||!newT.email) return;
              setTrainers(prev=>[...prev,{ id:Date.now(), ...newT, avatar:newT.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase(), drivers:0, courses:0, btw:0, joined:new Date().toISOString().slice(0,10), status:'Active', rating:0 }]);
              setNewT({ name:'', email:'', phone:'', category:'Public Bus — Pre Service', depot:'Central' });
              setShowAdd(false);
              showToast('✅ Trainer added successfully');
            }}>
              <Icon name="Check" size={12}/> Add Trainer
            </button>
            <button className="btn btn-ghost" onClick={()=>setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {[
          { label:'Total Trainers', val:trainers.length,                              color:'blue',  icon:'GraduationCap' },
          { label:'Active',         val:trainers.filter(t=>t.status==='Active').length, color:'green', icon:'Zap'           },
          { label:'Total Drivers',  val:trainers.reduce((a,t)=>a+t.drivers,0),        color:'teal',  icon:'Users'         },
          { label:'BTW Sessions',   val:trainers.reduce((a,t)=>a+t.btw,0),            color:'amber', icon:'Car'           },
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

      {/* Filter + Search */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
        <div style={{ display:'flex', gap:6 }}>
          {['All','Active','Inactive'].map(f=>(
            <button key={f} className={`btn btn-sm ${filter===f?'btn-primary':'btn-ghost'}`}
              onClick={()=>setFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="tb-search">
          <Icon name="Search" size={13} color="var(--text3)"/>
          <input placeholder="Search trainers..."
            value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
      </div>

      {/* Trainer cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14 }}>
        {filtered.map(t => (
          <div key={t.id} style={{
            background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'var(--r3)', padding:'18px 20px',
            boxShadow:'var(--shadow-sm)', transition:'all 0.15s',
            cursor:'pointer',
          }}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow='var(--shadow-md)';e.currentTarget.style.transform='translateY(-1px)';}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow='var(--shadow-sm)';e.currentTarget.style.transform='';}}
            onClick={()=>setSelected(t)}
          >
            <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:14 }}>
              <div style={{
                width:48, height:48, borderRadius:14, flexShrink:0,
                background:'var(--teal-dim)', color:'var(--teal)',
                border:'1.5px solid rgba(8,145,178,0.2)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:15, fontWeight:800, fontFamily:'var(--font-mono)',
              }}>{t.avatar}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                  <span style={{ fontSize:14.5, fontWeight:800, color:'var(--text)' }}>{t.name}</span>
                  <span className={`badge ${t.status==='Active'?'badge-green':'badge-gray'}`}>
                    {t.status}
                  </span>
                </div>
                <div style={{ fontSize:11, color:'var(--text3)' }}>{t.email}</div>
              </div>
              <Icon name="ChevronRight" size={16} color="var(--text3)"/>
            </div>

            <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:14 }}>
              <span className="chip" style={{ fontSize:10 }}><Icon name="Layers" size={9}/> {t.category}</span>
              <span className="chip" style={{ fontSize:10 }}><Icon name="Building" size={9}/> {t.depot}</span>
              <span className="chip" style={{ fontSize:10 }}><Icon name="Calendar" size={9}/> {t.joined}</span>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
              {[
                { label:'Drivers', val:t.drivers, color:'var(--blue)'  },
                { label:'Courses', val:t.courses, color:'var(--teal)'  },
                { label:'BTW',     val:t.btw,     color:'var(--amber)' },
              ].map(s=>(
                <div key={s.label} style={{
                  textAlign:'center', padding:'8px',
                  background:'var(--bg3)', borderRadius:'var(--r)',
                  border:'1px solid var(--border)',
                }}>
                  <div style={{ fontSize:18, fontWeight:800, color:s.color }}>{s.val}</div>
                  <div style={{ fontSize:10, color:'var(--text3)', fontWeight:600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}