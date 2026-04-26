import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import Icon from '../components/Icons';

const catColor = { 'public-pre':'blue', 'public-in':'teal', 'school-bus':'amber' };
const catLabel = { 'public-pre':'Pre-Service', 'public-in':'In-Service', 'school-bus':'School Bus' };

export default function RegistrationsPage() {
  const { registrations, approveDriver, rejectDriver } = useAuth();
  const [filter,  setFilter]  = useState('pending');
  const [search,  setSearch]  = useState('');
  const [toast,   setToast]   = useState('');

  const showToast = (msg, type='green') => {
    setToast({ msg, type });
    setTimeout(() => setToast(''), 3000);
  };

  const handleApprove = (id, name) => {
    approveDriver(id);
    showToast(`✅ ${name} approved — can now log in`);
  };

  const handleReject = (id, name) => {
    rejectDriver(id);
    showToast(`❌ ${name} rejected`, 'red');
  };

  const pending  = registrations.filter(r => r.status === 'pending');
  const approved = registrations.filter(r => r.status === 'approved');
  const rejected = registrations.filter(r => r.status === 'rejected');

  const shown = registrations.filter(r => {
    const matchFilter = r.status === filter;
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.username?.toLowerCase().includes(search.toLowerCase()) ||
      r.batch?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="fade-in">

      {/* Toast */}
      {toast && (
        <div style={{
          position:'fixed', top:20, right:20, zIndex:4000,
          background: toast.type==='green' ? 'var(--green-dim)' : 'var(--red-dim)',
          border:`1px solid ${toast.type==='green'?'rgba(22,163,74,0.3)':'rgba(220,38,38,0.3)'}`,
          borderRadius:'var(--r2)', padding:'12px 18px',
          fontSize:13, fontWeight:600,
          color: toast.type==='green' ? 'var(--green)' : 'var(--red)',
          boxShadow:'var(--shadow-lg)',
          display:'flex', alignItems:'center', gap:8,
        }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>
            New Driver Registrations
          </div>
          <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>
            Drivers who self-registered with a batch code — approve to grant access
          </div>
        </div>
        {pending.length > 0 && (
          <div style={{ background:'var(--amber-dim)', border:'1px solid rgba(217,119,6,0.2)', borderRadius:'var(--r2)', padding:'10px 16px', display:'flex', alignItems:'center', gap:8 }}>
            <Icon name="Alert" size={14} color="var(--amber)"/>
            <span style={{ fontSize:13, fontWeight:700, color:'var(--amber)' }}>
              {pending.length} pending approval
            </span>
          </div>
        )}
      </div>

      {/* Stat tiles */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:24 }}>
        {[
          { label:'Pending',  val:pending.length,  color:'amber', icon:'Clock', key:'pending'  },
          { label:'Approved', val:approved.length, color:'green', icon:'Check', key:'approved' },
          { label:'Rejected', val:rejected.length, color:'red',   icon:'X',     key:'rejected' },
        ].map(t=>(
          <div key={t.label} onClick={()=>setFilter(t.key)}
            style={{
              background:'var(--bg2)',
              border:`2px solid ${filter===t.key ? `var(--${t.color})` : 'var(--border)'}`,
              borderRadius:'var(--r2)', padding:'16px 20px',
              display:'flex', alignItems:'center', gap:14,
              boxShadow: filter===t.key ? `0 4px 16px var(--${t.color}-dim)` : 'var(--shadow-sm)',
              cursor:'pointer', transition:'all 0.15s',
            }}>
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

      {/* Search */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
        <div style={{ fontSize:13, fontWeight:600, color:'var(--text2)' }}>
          Showing <strong>{shown.length}</strong> {filter} registrations
        </div>
        <div className="tb-search">
          <Icon name="Search" size={13} color="var(--text3)"/>
          <input placeholder="Search by name, username or batch..."
            value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
      </div>

      {/* List */}
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {shown.length === 0 ? (
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--r2)', padding:'48px', textAlign:'center', color:'var(--text3)' }}>
            <div style={{ fontSize:36, marginBottom:10 }}>📋</div>
            <div style={{ fontSize:14, fontWeight:600 }}>No {filter} registrations</div>
            <div style={{ fontSize:12, marginTop:4 }}>
              {filter==='pending' ? 'All caught up! No drivers waiting for approval.' : `No ${filter} drivers yet.`}
            </div>
          </div>
        ) : shown.map(r => {
          const cc = catColor[r.category] || 'blue';
          const cl = catLabel[r.category] || r.category;
          return (
            <div key={r.id} style={{
              background:'var(--bg2)',
              border:'1px solid var(--border)',
              borderLeft:`4px solid var(--${cc})`,
              borderRadius:'var(--r3)',
              padding:'18px 20px',
              boxShadow:'var(--shadow-sm)',
              transition:'box-shadow 0.15s',
            }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow='var(--shadow-md)'}
              onMouseLeave={e=>e.currentTarget.style.boxShadow='var(--shadow-sm)'}
            >
              <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                {/* Avatar */}
                <div style={{
                  width:48, height:48, borderRadius:14, flexShrink:0,
                  background:`var(--${cc}-dim)`,
                  color:`var(--${cc})`,
                  border:`1.5px solid var(--${cc})33`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:14, fontWeight:700, fontFamily:'var(--font-mono)',
                }}>{r.avatar}</div>

                {/* Info */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                    <span style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>{r.name}</span>
                    <span className={`badge badge-${cc}`}>{cl}</span>
                    <span className={`badge ${r.status==='pending'?'badge-amber':r.status==='approved'?'badge-green':'badge-red'}`}>
                      <Icon name={r.status==='pending'?'Clock':r.status==='approved'?'Check':'X'} size={9} strokeWidth={2.5}/>
                      {r.status.charAt(0).toUpperCase()+r.status.slice(1)}
                    </span>
                  </div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
                    <span className="chip" style={{ fontSize:10 }}>
                      <Icon name="Users" size={9}/> @{r.username}
                    </span>
                    <span className="chip" style={{ fontSize:10 }}>
                      <Icon name="Layers" size={9}/> {r.batch}
                    </span>
                    <span className="chip" style={{ fontSize:10 }}>
                      <Icon name="Key" size={9}/> {r.batchCode}
                    </span>
                    <span className="chip" style={{ fontSize:10 }}>
                      <Icon name="Building" size={9}/> {r.depot}
                    </span>
                    <span className="chip" style={{ fontSize:10 }}>
                      <Icon name="GraduationCap" size={9}/> {r.trainer}
                    </span>
                    {r.phone && (
                      <span className="chip" style={{ fontSize:10 }}>
                        <Icon name="Mail" size={9}/> {r.phone}
                      </span>
                    )}
                    {r.nationality && (
                      <span className="chip" style={{ fontSize:10 }}>{r.nationality}</span>
                    )}
                    <span style={{ fontSize:11, color:'var(--text3)', display:'flex', alignItems:'center', gap:4 }}>
                      <Icon name="Calendar" size={10}/> Registered {r.joinDate}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                {r.status === 'pending' && (
                  <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                    <button
                      onClick={()=>handleApprove(r.id, r.name)}
                      style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 16px', borderRadius:'var(--r)', border:'none', background:'var(--green)', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', boxShadow:'0 2px 8px rgba(22,163,74,0.3)', transition:'all 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-1px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform=''}
                    >
                      <Icon name="Check" size={13}/> Approve
                    </button>
                    <button
                      onClick={()=>handleReject(r.id, r.name)}
                      style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 16px', borderRadius:'var(--r)', border:'1px solid rgba(220,38,38,0.3)', background:'var(--red-dim)', color:'var(--red)', fontSize:13, fontWeight:700, cursor:'pointer', transition:'all 0.15s' }}
                    >
                      <Icon name="X" size={13}/> Reject
                    </button>
                  </div>
                )}
                {r.status === 'approved' && (
                  <div style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:'var(--r)', background:'var(--green-dim)', border:'1px solid rgba(22,163,74,0.2)' }}>
                    <Icon name="Check" size={14} color="var(--green)" strokeWidth={2.5}/>
                    <span style={{ fontSize:12, fontWeight:700, color:'var(--green)' }}>Access Granted</span>
                  </div>
                )}
                {r.status === 'rejected' && (
                  <div style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:'var(--r)', background:'var(--red-dim)', border:'1px solid rgba(220,38,38,0.2)' }}>
                    <Icon name="X" size={14} color="var(--red)"/>
                    <span style={{ fontSize:12, fontWeight:700, color:'var(--red)' }}>Rejected</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}