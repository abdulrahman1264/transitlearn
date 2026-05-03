import React, { useState } from 'react';
import Icon from '../components/Icons';
import StatusBadge from '../components/StatusBadge';

const INITIAL_KEYS = [
  { id:1, keyId:'WV-2025-001', course:'Defensive Driving Fundamentals', system:'Widevine',  created:'2025-01-15', expires:'2026-01-15', status:'Active',  licenses:284, maxLic:500, description:'Widevine L1 key for defensive driving video content' },
  { id:2, keyId:'WV-2025-002', course:'Emergency Procedures & Safety',  system:'Widevine',  created:'2025-02-01', expires:'2026-02-01', status:'Active',  licenses:196, maxLic:300, description:'Widevine L1 key for emergency procedures content'     },
  { id:3, keyId:'PR-2025-001', course:'Pre-Service Orientation',        system:'PlayReady', created:'2025-03-10', expires:'2026-03-10', status:'Active',  licenses:48,  maxLic:100, description:'PlayReady key for pre-service orientation videos'     },
  { id:4, keyId:'WV-2024-009', course:'Annual Compliance Refresh',      system:'Widevine',  created:'2024-06-01', expires:'2025-06-01', status:'Revoked', licenses:0,   maxLic:200, description:'Expired Widevine key — replaced with new version'     },
  { id:5, keyId:'FP-2025-001', course:'Child Safety Procedures',        system:'FairPlay',  created:'2025-04-01', expires:'2026-04-01', status:'Active',  licenses:24,  maxLic:80,  description:'FairPlay key for school bus training content'         },
];

const SYSTEMS = ['Widevine', 'PlayReady', 'FairPlay'];

const SYSTEM_CONFIG = {
  Widevine:  { color:'var(--blue)',   dim:'var(--blue-dim)',   icon:'Shield'  },
  PlayReady: { color:'var(--purple)', dim:'var(--purple-dim)', icon:'Lock'    },
  FairPlay:  { color:'var(--teal)',   dim:'var(--teal-dim)',   icon:'Key'     },
};

function KeyModal({ keyData, onClose, onSave }) {
  const isEdit = !!keyData;
  const [form, setForm] = useState(keyData || {
    keyId:'', course:'', system:'Widevine', expires:'', maxLic:'100', description:'',
  });
  const set = (k,v) => setForm(p=>({...p,[k]:v}));

  const generateKeyId = () => {
    const sys = form.system==='Widevine'?'WV':form.system==='PlayReady'?'PR':'FP';
    const year = new Date().getFullYear();
    const num  = String(Math.floor(Math.random()*900)+100);
    set('keyId', `${sys}-${year}-${num}`);
  };

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:3000,
      background:'rgba(0,0,0,0.45)', backdropFilter:'blur(6px)',
      display:'flex', alignItems:'center', justifyContent:'center',
    }} onClick={onClose}>
      <div style={{
        background:'var(--bg2)', borderRadius:'var(--r3)',
        width:540, boxShadow:'var(--shadow-lg)', overflow:'hidden',
      }} onClick={e=>e.stopPropagation()}>
        <div style={{ padding:'20px 24px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ fontSize:16, fontWeight:800, color:'var(--text)' }}>
            {isEdit ? 'Edit DRM Key' : 'Create New DRM Key'}
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text3)' }}>
            <Icon name="X" size={18}/>
          </button>
        </div>

        <div style={{ padding:'20px 24px' }}>
          {/* DRM System */}
          <div className="form-group">
            <label className="form-label">DRM System *</label>
            <div style={{ display:'flex', gap:8 }}>
              {SYSTEMS.map(s => {
                const cfg = SYSTEM_CONFIG[s];
                return (
                  <button key={s} onClick={()=>set('system',s)} style={{
                    flex:1, padding:'10px 8px', borderRadius:'var(--r)',
                    border:`1.5px solid ${form.system===s?cfg.color:'var(--border2)'}`,
                    background: form.system===s ? cfg.dim : 'var(--bg3)',
                    cursor:'pointer', display:'flex', flexDirection:'column',
                    alignItems:'center', gap:5, transition:'all 0.13s',
                  }}>
                    <Icon name={cfg.icon} size={16} color={form.system===s?cfg.color:'var(--text3)'}/>
                    <span style={{ fontSize:11, fontWeight:700, color:form.system===s?cfg.color:'var(--text3)' }}>{s}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:8 }}>
            <div className="form-group">
              <label className="form-label">Key ID *</label>
              <input className="form-input" placeholder="e.g. WV-2025-001"
                value={form.keyId} onChange={e=>set('keyId',e.target.value)}/>
            </div>
            <div style={{ display:'flex', alignItems:'flex-end', paddingBottom:14 }}>
              <button className="btn btn-ghost btn-sm" onClick={generateKeyId}>
                <Icon name="Refresh" size={12}/> Generate
              </button>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div className="form-group" style={{ marginBottom:0, gridColumn:'1/-1' }}>
              <label className="form-label">Course Name *</label>
              <input className="form-input" placeholder="Course this key protects"
                value={form.course} onChange={e=>set('course',e.target.value)}/>
            </div>
            <div className="form-group" style={{ marginBottom:0 }}>
              <label className="form-label">Expiry Date *</label>
              <input className="form-input" type="date"
                value={form.expires} onChange={e=>set('expires',e.target.value)}/>
            </div>
            <div className="form-group" style={{ marginBottom:0 }}>
              <label className="form-label">Max Licenses</label>
              <input className="form-input" type="number"
                value={form.maxLic} onChange={e=>set('maxLic',e.target.value)}/>
            </div>
            <div className="form-group" style={{ marginBottom:0, gridColumn:'1/-1' }}>
              <label className="form-label">Description</label>
              <textarea className="form-input" rows={2} placeholder="Brief description of this key..."
                value={form.description} onChange={e=>set('description',e.target.value)}/>
            </div>
          </div>
        </div>

        <div style={{ padding:'16px 24px', borderTop:'1px solid var(--border)', display:'flex', justifyContent:'flex-end', gap:8 }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>{
            if (!form.keyId||!form.course||!form.expires) return;
            onSave({
              ...form,
              id:     keyData?.id || Date.now(),
              created: keyData?.created || new Date().toISOString().slice(0,10),
              status:  keyData?.status  || 'Active',
              licenses:keyData?.licenses|| 0,
              maxLic:  Number(form.maxLic)||100,
            });
            onClose();
          }}>
            <Icon name="Check" size={13}/> {isEdit?'Save Changes':'Create Key'}
          </button>
        </div>
      </div>
      </div>
  );
}

export default function DrmPage() {
  const [keys,      setKeys]      = useState(INITIAL_KEYS);
  const [modal,     setModal]     = useState(null); // null | 'new' | key obj
  const [search,    setSearch]    = useState('');
  const [filter,    setFilter]    = useState('All');
  const [toast,     setToast]     = useState('');
  const [revoking,  setRevoking]  = useState(null);

  const showToast = (msg, type='green') => {
    setToast({ msg, type });
    setTimeout(()=>setToast(''), 3000);
  };

  const saveKey = (key) => {
    setKeys(prev => prev.find(k=>k.id===key.id)
      ? prev.map(k=>k.id===key.id?key:k)
      : [...prev, key]
    );
    showToast(`✅ DRM key "${key.keyId}" saved`);
  };

  const revokeKey = (id) => {
    setKeys(prev=>prev.map(k=>k.id===id?{...k,status:'Revoked',licenses:0}:k));
    setRevoking(null);
    showToast('✅ Key revoked successfully');
  };

  const deleteKey = (id) => {
    const k = keys.find(x=>x.id===id);
    if (window.confirm(`Delete key "${k.keyId}"? This cannot be undone.`)) {
      setKeys(prev=>prev.filter(x=>x.id!==id));
      showToast('✅ Key deleted');
    }
  };

  const rotateKey = (key) => {
    const sys = key.system==='Widevine'?'WV':key.system==='PlayReady'?'PR':'FP';
    const year = new Date().getFullYear();
    const num  = String(Math.floor(Math.random()*900)+100);
    const newKey = {
      ...key,
      id:      Date.now(),
      keyId:   `${sys}-${year}-${num}`,
      created: new Date().toISOString().slice(0,10),
      expires: new Date(new Date().setFullYear(new Date().getFullYear()+1)).toISOString().slice(0,10),
      status:  'Active',
      licenses:0,
    };
    setKeys(prev=>[...prev.map(k=>k.id===key.id?{...k,status:'Revoked',licenses:0}:k), newKey]);
    showToast(`✅ Key rotated — new key ${newKey.keyId} created`);
  };

  const filtered = keys.filter(k => {
    const matchSearch = k.keyId.toLowerCase().includes(search.toLowerCase()) ||
                        k.course.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter==='All' || k.status===filter || k.system===filter;
    return matchSearch && matchFilter;
  });

  const active  = keys.filter(k=>k.status==='Active').length;
  const revoked = keys.filter(k=>k.status==='Revoked').length;
  const totalLic= keys.reduce((a,k)=>a+k.licenses,0);

  const SYSTEM_CONFIG2 = { Widevine:'var(--blue)', PlayReady:'var(--purple)', FairPlay:'var(--teal)' };

  return (
    <div className="fade-in">

      {/* Modal */}
      {modal !== null && (
        <KeyModal
          keyData={modal==='new'?null:modal}
          onClose={()=>setModal(null)}
          onSave={saveKey}
        />
      )}

      {/* Revoke confirm */}
      {revoking && (
        <div style={{
          position:'fixed', inset:0, zIndex:3000,
          background:'rgba(0,0,0,0.45)', backdropFilter:'blur(6px)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <div style={{
            background:'var(--bg2)', borderRadius:'var(--r3)',
            width:420, padding:28, boxShadow:'var(--shadow-lg)',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:'var(--red-dim)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon name="Alert" size={20} color="var(--red)"/>
              </div>
              <div>
                <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>Revoke DRM Key</div>
                <div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>This will immediately disable all licenses</div>
              </div>
            </div>
            <div style={{ background:'var(--red-dim)', borderRadius:'var(--r)', padding:'12px 14px', marginBottom:20, border:'1px solid rgba(220,38,38,0.2)' }}>
              <div style={{ fontSize:13, fontWeight:700, color:'var(--red)', fontFamily:'var(--font-mono)' }}>{revoking.keyId}</div>
              <div style={{ fontSize:12, color:'var(--text2)', marginTop:3 }}>{revoking.course} · {revoking.licenses} active licenses</div>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button className="btn btn-ghost" style={{ flex:1 }} onClick={()=>setRevoking(null)}>Cancel</button>
              <button className="btn btn-danger" style={{ flex:1 }} onClick={()=>revokeKey(revoking.id)}>
                <Icon name="X" size={13}/> Revoke Key
              </button>
            </div>
          </div>
        </div>
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
            DRM Key Management
          </div>
          <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>
            Manage content encryption keys for protected training videos
          </div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <div className="tb-search">
            <Icon name="Search" size={13} color="var(--text3)"/>
            <input placeholder="Search keys..."
              value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <button className="btn btn-primary" onClick={()=>setModal('new')}>
            <Icon name="Plus" size={14}/> New Key
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div style={{
        background:'var(--blue-dim)', border:'1px solid rgba(27,110,243,0.2)',
        borderRadius:'var(--r2)', padding:'14px 18px',
        display:'flex', alignItems:'center', gap:14, marginBottom:24,
      }}>
        <Icon name="Shield" size={20} color="var(--brand)"/>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:700, color:'var(--brand)' }}>
            Content DRM Protection Active
          </div>
          <div style={{ fontSize:12, color:'var(--text2)', marginTop:2 }}>
            All video content is encrypted using industry-standard DRM systems.
            Widevine L1 (Android/Chrome), PlayReady (Windows), FairPlay (Apple).
            Licenses are bound to authenticated sessions and expire automatically.
          </div>
        </div>
        <div style={{ display:'flex', gap:8, flexShrink:0 }}>
          <span className="chip" style={{ fontSize:10 }}><Icon name="Shield" size={9}/> Widevine L1</span>
          <span className="chip" style={{ fontSize:10 }}><Icon name="Lock" size={9}/> PlayReady</span>
          <span className="chip" style={{ fontSize:10 }}><Icon name="Key" size={9}/> FairPlay</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {[
          { label:'Total Keys',       val:keys.length, color:'blue',  icon:'Key'      },
          { label:'Active Keys',      val:active,       color:'green', icon:'Shield'   },
          { label:'Revoked Keys',     val:revoked,      color:'red',   icon:'X'        },
          { label:'Total Licenses',   val:totalLic,     color:'teal',  icon:'Users'    },
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

      {/* Filter */}
      <div style={{ display:'flex', gap:6, marginBottom:16, flexWrap:'wrap' }}>
        {['All','Active','Revoked','Widevine','PlayReady','FairPlay'].map(f=>(
          <button key={f} className={`btn btn-sm ${filter===f?'btn-primary':'btn-ghost'}`}
            onClick={()=>setFilter(f)}>{f}</button>
        ))}
      </div>

      {/* Keys table */}
      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>Key ID</th>
              <th>Course</th>
              <th>DRM System</th>
              <th>Created</th>
              <th>Expires</th>
              <th>Licenses</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8}>
                <div className="empty-state"><div className="empty-icon">🔑</div><div>No keys found</div></div>
              </td></tr>
            ) : filtered.map(k=>{
              const cfg = SYSTEM_CONFIG[k.system] || SYSTEM_CONFIG.Widevine;
              const licPct = Math.min(100, Math.round((k.licenses/k.maxLic)*100));
              const isExpired = new Date(k.expires) < new Date();
              return (
                <tr key={k.id}>
                  <td>
                    <span style={{
                      fontFamily:'var(--font-mono)', fontSize:12, fontWeight:700,
                      color: k.status==='Active'?'var(--blue)':'var(--text3)',
                      background: k.status==='Active'?'var(--blue-dim)':'var(--bg4)',
                      padding:'3px 8px', borderRadius:'var(--r)',
                      border:`1px solid ${k.status==='Active'?'rgba(27,110,243,0.15)':'var(--border)'}`,
                    }}>{k.keyId}</span>
                  </td>
                  <td>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{k.course}</div>
                      {k.description && (
                        <div style={{ fontSize:10, color:'var(--text3)', marginTop:2, maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                          {k.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <span style={{
                      display:'inline-flex', alignItems:'center', gap:5,
                      padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:700,
                      background:cfg.dim, color:cfg.color,
                      border:`1px solid ${cfg.color}22`,
                    }}>
                      <Icon name={cfg.icon} size={10} strokeWidth={2.5}/>{k.system}
                    </span>
                  </td>
                  <td><span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text3)' }}>{k.created}</span></td>
                  <td>
                    <span style={{
                      fontFamily:'var(--font-mono)', fontSize:12,
                      color: isExpired?'var(--red)':k.status==='Revoked'?'var(--text3)':'var(--text2)',
                      fontWeight: isExpired?700:400,
                    }}>
                      {isExpired && <Icon name="Alert" size={11} color="var(--red)"/>} {k.expires}
                    </span>
                  </td>
                  <td>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <div style={{ width:60, height:5, background:'var(--bg4)', borderRadius:10, overflow:'hidden' }}>
                        <div style={{ height:'100%', background:k.status==='Active'?'var(--blue)':'var(--bg5)', width:`${licPct}%`, borderRadius:10 }}/>
                      </div>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:12, fontWeight:700, color:'var(--text)' }}>
                        {k.licenses}/{k.maxLic}
                      </span>
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={k.status}/>
                  </td>
                  <td>
                    <div style={{ display:'flex', gap:5 }}>
                      <button className="btn btn-ghost btn-sm" onClick={()=>setModal(k)}>
                        <Icon name="Edit" size={11}/>
                      </button>
                      {k.status==='Active' && (
                        <>
                          <button className="btn btn-ghost btn-sm" onClick={()=>rotateKey(k)}
                            title="Rotate key — creates new key and revokes this one">
                            <Icon name="Refresh" size={11}/>
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={()=>setRevoking(k)}>
                            <Icon name="X" size={11}/>
                          </button>
                        </>
                      )}
                      {k.status==='Revoked' && (
                        <button className="btn btn-danger btn-sm" onClick={()=>deleteKey(k.id)}>
                          <Icon name="X" size={11}/>
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
  );
}