import React, { useState } from 'react';
import Icon from '../components/Icons';

export default function AdminProfile({ user }) {
  const [editing,  setEditing]  = useState(false);
  const [toast,    setToast]    = useState('');
  const [showPass, setShowPass] = useState(false);
  const [profile,  setProfile]  = useState({
    name:  user?.name  || 'Admin User',
    email: 'admin@transitlearn.com',
    phone: '+971 4 123 4567',
    role:  'Platform Administrator',
    org:   'Roads & Transport Authority, Dubai',
    joined:'2024-01-01',
  });
  const [passwords, setPasswords] = useState({ current:'', newPass:'', confirm:'' });

  const showToast = (msg, type='green') => {
    setToast({ msg, type });
    setTimeout(() => setToast(''), 3000);
  };

  const STATS = [
    { label:'Total Drivers',   val:'567', icon:'Users',    color:'blue'  },
    { label:'Active Trainers', val:'3',   icon:'GraduationCap', color:'teal'  },
    { label:'Courses Live',    val:'2',   icon:'Book',     color:'green' },
    { label:'Pending Reviews', val:'2',   icon:'Clock',    color:'amber' },
  ];

  return (
    <div className="fade-in">

      {/* Toast */}
      {toast && (
        <div style={{
          position:'fixed', top:20, right:20, zIndex:2000,
          background: toast.type==='green' ? 'var(--green-dim)' : 'var(--red-dim)',
          border:`1px solid ${toast.type==='green'?'rgba(22,163,74,0.3)':'rgba(220,38,38,0.3)'}`,
          borderRadius:'var(--r2)', padding:'12px 18px',
          fontSize:13, fontWeight:600,
          color: toast.type==='green' ? 'var(--green)' : 'var(--red)',
          boxShadow:'var(--shadow-lg)',
          display:'flex', alignItems:'center', gap:8,
        }}>
          <Icon name={toast.type==='green'?'Check':'X'} size={14} strokeWidth={2.5}/>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:28 }}>
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>
            Admin Profile
          </div>
          <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>
            Manage your administrator account
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setEditing(!editing)}>
          <Icon name={editing?'X':'Edit'} size={13}/>
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {STATS.map(t => (
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

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>

        {/* Profile card */}
        <div className="card">
          <div style={{
            display:'flex', alignItems:'center', gap:16, marginBottom:22,
            paddingBottom:18, borderBottom:'1px solid var(--border)',
          }}>
            <div style={{
              width:72, height:72, borderRadius:20, flexShrink:0,
              background:'var(--blue-dim)', color:'var(--blue)',
              border:'2px solid rgba(27,110,243,0.25)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:22, fontWeight:800, fontFamily:'var(--font-mono)',
              boxShadow:'0 4px 14px rgba(27,110,243,0.2)',
            }}>
              {profile.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <div style={{ fontSize:18, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>
                {profile.name}
              </div>
              <div style={{ fontSize:12, color:'var(--text3)', marginTop:4 }}>
                {profile.role}
              </div>
              <span className="badge badge-blue" style={{ marginTop:6 }}>
                <Icon name="Settings" size={9} strokeWidth={2.5}/> Admin Portal
              </span>
            </div>
          </div>

          {editing ? (
            <div>
              {[
                { label:'Full Name', key:'name',  type:'text'  },
                { label:'Email',     key:'email', type:'email' },
                { label:'Phone',     key:'phone', type:'tel'   },
                { label:'Organisation', key:'org',type:'text'  },
              ].map(f => (
                <div key={f.key} className="form-group">
                  <label className="form-label">{f.label}</label>
                  <input className="form-input" type={f.type}
                    value={profile[f.key]}
                    onChange={e => setProfile(p => ({ ...p, [f.key]:e.target.value }))}/>
                </div>
              ))}
              <button className="btn btn-primary w100"
                onClick={() => { setEditing(false); showToast('✅ Profile updated successfully'); }}>
                <Icon name="Check" size={13}/> Save Changes
              </button>
            </div>
          ) : (
            <div>
              {[
                { label:'Email',        val:profile.email, icon:'Mail'     },
                { label:'Phone',        val:profile.phone, icon:'Info'     },
                { label:'Organisation', val:profile.org,   icon:'Building' },
                { label:'Role',         val:profile.role,  icon:'Settings' },
                { label:'Joined',       val:profile.joined,icon:'Calendar' },
              ].map(r => (
                <div key={r.label} className="kv-row">
                  <span className="kv-key" style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <Icon name={r.icon} size={11}/> {r.label}
                  </span>
                  <span className="kv-val" style={{ fontSize:12 }}>{r.val}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

          {/* Change password */}
          <div className="card card-accent-blue">
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
              <Icon name="Lock" size={15} color="var(--brand)"/>
              <span style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>Change Password</span>
            </div>
            {[
              { label:'Current Password', key:'current', ph:'••••••••'        },
              { label:'New Password',     key:'newPass', ph:'Min 8 characters' },
              { label:'Confirm Password', key:'confirm', ph:'Repeat password'  },
            ].map(f => (
              <div key={f.key} className="form-group">
                <label className="form-label">{f.label}</label>
                <div style={{ position:'relative' }}>
                  <input className="form-input"
                    type={showPass?'text':'password'}
                    placeholder={f.ph}
                    value={passwords[f.key]}
                    onChange={e => setPasswords(p => ({ ...p, [f.key]:e.target.value }))}
                    style={{ paddingRight:36 }}/>
                  <button type="button" onClick={()=>setShowPass(p=>!p)} style={{
                    position:'absolute', right:10, top:'50%', transform:'translateY(-50%)',
                    background:'none', border:'none', cursor:'pointer', color:'var(--text3)',
                  }}>
                    <Icon name="Eye" size={13}/>
                  </button>
                </div>
              </div>
            ))}
            <button className="btn btn-primary w100" onClick={() => {
              if (!passwords.current) { showToast('Enter current password','red'); return; }
              if (passwords.newPass.length < 8) { showToast('Min 8 characters','red'); return; }
              if (passwords.newPass !== passwords.confirm) { showToast('Passwords do not match','red'); return; }
              setPasswords({ current:'', newPass:'', confirm:'' });
              showToast('✅ Password changed successfully');
            }}>
              <Icon name="Lock" size={13}/> Update Password
            </button>
          </div>

          {/* Batch codes */}
          <div className="card">
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
              <Icon name="Key" size={15} color="var(--amber)"/>
              <span style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>Active Batch Codes</span>
            </div>
            <div style={{ fontSize:11, color:'var(--text3)', marginBottom:12 }}>
              Share these codes with drivers for self-registration
            </div>
            {[
              { code:'BATCH-153', cat:'Public Bus — Pre Service', active:true  },
              { code:'BATCH-154', cat:'Public Bus — In Service',  active:true  },
              { code:'BATCH-155', cat:'School Bus Training',      active:true  },
            ].map(b => (
              <div key={b.code} style={{
                display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'9px 12px', background:'var(--bg3)',
                borderRadius:'var(--r)', border:'1px solid var(--border)',
                marginBottom:7,
              }}>
                <div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:13, fontWeight:700, color:'var(--brand)' }}>
                    {b.code}
                  </div>
                  <div style={{ fontSize:10, color:'var(--text3)', marginTop:2 }}>{b.cat}</div>
                </div>
                <div style={{ display:'flex', gap:6 }}>
                  <button className="btn btn-ghost btn-sm"
                    onClick={() => { navigator.clipboard.writeText(b.code); showToast(`✅ ${b.code} copied!`); }}>
                    <Icon name="Link" size={11}/> Copy
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Recent activity */}
          <div className="card">
            <div style={{ fontWeight:700, fontSize:13, color:'var(--text)', marginBottom:14 }}>
              Recent Activity
            </div>
            {[
              { action:'Course approved for publishing',   time:'2h ago',   icon:'Check',   color:'green' },
              { action:'New driver registered via BATCH-153', time:'3h ago', icon:'Users',  color:'blue'  },
              { action:'Batch 154 created',               time:'Yesterday', icon:'Layers',  color:'teal'  },
              { action:'DRM key rotated',                 time:'2 days ago',icon:'Key',     color:'amber' },
              { action:'System settings updated',         time:'3 days ago',icon:'Settings',color:'blue'  },
            ].map((a, i) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:10,
                padding:'8px 0', borderBottom: i<4 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{
                  width:28, height:28, borderRadius:8, flexShrink:0,
                  background:`var(--${a.color}-dim)`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <Icon name={a.icon} size={13} color={`var(--${a.color})`}/>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12.5, color:'var(--text)', fontWeight:500 }}>{a.action}</div>
                  <div style={{ fontSize:10, color:'var(--text3)', marginTop:2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )} {/* end overview tab */}
    </div>
  );
}