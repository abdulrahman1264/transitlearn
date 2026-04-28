import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import Icon from '../components/Icons';

const catColor = { 'public-pre':'blue', 'public-in':'teal', 'school-bus':'amber' };
const catLabel = { 'public-pre':'Pre-Service', 'public-in':'In-Service', 'school-bus':'School Bus' };

export default function RegistrationsPage() {
  const { registrations } = useAuth();
  const [filter,  setFilter]  = useState('all');
  const [search,  setSearch]  = useState('');
  const [sortBy,  setSortBy]  = useState('date');

  // Auto-enrolled — no approval needed
  const allDrivers = registrations.map(r => ({ ...r, status:'enrolled' }));

  const shown = allDrivers.filter(r => {
    const matchFilter = filter === 'all' ||
      (filter === 'pre-service'  && r.category === 'public-pre') ||
      (filter === 'in-service'   && r.category === 'public-in')  ||
      (filter === 'school-bus'   && r.category === 'school-bus');
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.username?.toLowerCase().includes(search.toLowerCase()) ||
      r.batch?.toLowerCase().includes(search.toLowerCase()) ||
      r.batchCode?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  }).sort((a, b) => sortBy === 'date'
    ? new Date(b.joinDate) - new Date(a.joinDate)
    : a.name.localeCompare(b.name)
  );

  const preCount    = allDrivers.filter(r => r.category === 'public-pre').length;
  const inCount     = allDrivers.filter(r => r.category === 'public-in').length;
  const schoolCount = allDrivers.filter(r => r.category === 'school-bus').length;

  return (
    <div className="fade-in">

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>
            Driver Enrollment
          </div>
          <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>
            Drivers who registered with a batch code — automatically enrolled in their training course
          </div>
        </div>
        <div style={{ background:'var(--green-dim)', border:'1px solid rgba(22,163,74,0.2)', borderRadius:'var(--r2)', padding:'10px 16px', display:'flex', alignItems:'center', gap:8 }}>
          <Icon name="Check" size={14} color="var(--green)"/>
          <span style={{ fontSize:13, fontWeight:700, color:'var(--green)' }}>
            {allDrivers.length} drivers auto-enrolled
          </span>
        </div>
      </div>

      {/* How it works banner */}
      <div style={{ background:'linear-gradient(135deg,var(--blue-dim),var(--bg2))', border:'1px solid rgba(27,110,243,0.15)', borderRadius:'var(--r2)', padding:'16px 20px', marginBottom:24, display:'flex', alignItems:'center', gap:20 }}>
        <Icon name="Info" size={20} color="var(--blue)"/>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:4 }}>How Driver Enrollment Works</div>
          <div style={{ display:'flex', gap:24 }}>
            {[
              { step:'1', text:'Driver registers with batch code' },
              { step:'2', text:'System auto-assigns trainer + depot' },
              { step:'3', text:'Driver instantly accesses their courses' },
              { step:'4', text:'Admin tracks progress here' },
            ].map(s=>(
              <div key={s.step} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:20, height:20, borderRadius:'50%', background:'var(--blue)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800, flexShrink:0 }}>{s.step}</div>
                <span style={{ fontSize:12, color:'var(--text2)' }}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
        {[
          { label:'Total Enrolled', val:allDrivers.length, color:'blue',  icon:'Users',  key:'all'         },
          { label:'Pre-Service',    val:preCount,          color:'blue',  icon:'Bus',    key:'pre-service'  },
          { label:'In-Service',     val:inCount,           color:'teal',  icon:'Layers', key:'in-service'   },
          { label:'School Bus',     val:schoolCount,       color:'amber', icon:'Star',   key:'school-bus'   },
        ].map(t=>(
          <div key={t.label} onClick={()=>setFilter(t.key)}
            style={{ background:'var(--bg2)', border:`2px solid ${filter===t.key?`var(--${t.color})`:'var(--border)'}`, borderRadius:'var(--r2)', padding:'16px 20px', display:'flex', alignItems:'center', gap:14, boxShadow:'var(--shadow-sm)', cursor:'pointer', transition:'all 0.15s' }}>
            <div style={{ width:44, height:44, borderRadius:12, background:`var(--${t.color}-dim)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon name={t.icon} size={20} color={`var(--${t.color})`}/>
            </div>
            <div>
              <div style={{ fontSize:28, fontWeight:800, color:'var(--text)', lineHeight:1 }}>{t.val}</div>
              <div style={{ fontSize:12, color:'var(--text3)', fontWeight:600, marginTop:3 }}>{t.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + sort */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
        <div style={{ fontSize:13, fontWeight:600, color:'var(--text2)' }}>
          Showing <strong>{shown.length}</strong> drivers
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <select className="form-input" style={{ width:'auto', fontSize:12, padding:'6px 10px' }}
            value={sortBy} onChange={e=>setSortBy(e.target.value)}>
            <option value="date">Sort: Newest First</option>
            <option value="name">Sort: Name A-Z</option>
          </select>
          <div className="tb-search">
            <Icon name="Search" size={13} color="var(--text3)"/>
            <input placeholder="Search by name, username, batch..."
              value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
        </div>
      </div>

      {/* Driver list */}
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {shown.length === 0 ? (
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--r2)', padding:'48px', textAlign:'center', color:'var(--text3)' }}>
            <div style={{ fontSize:36, marginBottom:10 }}>👤</div>
            <div style={{ fontSize:14, fontWeight:600 }}>No drivers found</div>
          </div>
        ) : shown.map(r => {
          const cc = catColor[r.category] || 'blue';
          const cl = catLabel[r.category] || r.category;
          return (
            <div key={r.id} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderLeft:`4px solid var(--${cc})`, borderRadius:'var(--r3)', padding:'16px 20px', boxShadow:'var(--shadow-sm)', display:'flex', alignItems:'center', gap:16 }}>
              <div style={{ width:44, height:44, borderRadius:12, flexShrink:0, background:`var(--${cc}-dim)`, color:`var(--${cc})`, border:`1.5px solid var(--${cc})33`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, fontFamily:'var(--font-mono)' }}>
                {r.avatar}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                  <span style={{ fontSize:14, fontWeight:800, color:'var(--text)' }}>{r.name}</span>
                  <span className={`badge badge-${cc}`}>{cl}</span>
                  <span className="badge badge-green">
                    <Icon name="Check" size={9} strokeWidth={2.5}/> Enrolled
                  </span>
                </div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <span className="chip" style={{ fontSize:10 }}><Icon name="Users" size={9}/> @{r.username}</span>
                  <span className="chip" style={{ fontSize:10 }}><Icon name="Layers" size={9}/> {r.batch}</span>
                  <span className="chip" style={{ fontSize:10 }}><Icon name="Key" size={9}/> {r.batchCode}</span>
                  <span className="chip" style={{ fontSize:10 }}><Icon name="Building" size={9}/> {r.depot}</span>
                  <span className="chip" style={{ fontSize:10 }}><Icon name="GraduationCap" size={9}/> {r.trainer}</span>
                  {r.phone && <span className="chip" style={{ fontSize:10 }}><Icon name="Mail" size={9}/> {r.phone}</span>}
                  {r.nationality && <span className="chip" style={{ fontSize:10 }}>{r.nationality}</span>}
                  <span style={{ fontSize:11, color:'var(--text3)', display:'flex', alignItems:'center', gap:4 }}>
                    <Icon name="Calendar" size={10}/> {r.joinDate}
                  </span>
                </div>
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontSize:11, color:'var(--text3)', marginBottom:4 }}>Course Access</div>
                <div style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 12px', background:'var(--green-dim)', border:'1px solid rgba(22,163,74,0.2)', borderRadius:'var(--r)' }}>
                  <Icon name="Check" size={12} color="var(--green)" strokeWidth={2.5}/>
                  <span style={{ fontSize:12, fontWeight:700, color:'var(--green)' }}>Active</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}