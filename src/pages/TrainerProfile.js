import React, { useState } from 'react';
import Icon from '../components/Icons';

export default function TrainerProfile({ user }) {
  const [editing,  setEditing]  = useState(false);
  const [toast,    setToast]    = useState('');
  const [showPass, setShowPass] = useState(false);
  const [profile,  setProfile]  = useState({
    name:     user?.name     || 'Elena Marsh',
    email:    'elena@transitlearn.com',
    phone:    '+971 50 123 4567',
    depot:    'Central Training Centre',
    category: 'All Categories',
    bio:      'Senior trainer with 8 years experience in public bus driver training and BTW assessment.',
    joined:   '2024-03-15',
  });
  const [passwords, setPasswords] = useState({ current:'', newPass:'', confirm:'' });

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(''),3000); };

  const STATS = [
    { label:'Courses Created',   val:'12',  icon:'Book',     color:'blue'  },
    { label:'Drivers Assigned',  val:'4',   icon:'Users',    color:'teal'  },
    { label:'BTW Sessions',      val:'48',  icon:'Car',      color:'amber' },
    { label:'Avg Driver Score',  val:'84%', icon:'Star',     color:'green' },
  ];

  return (
    <div className="fade-in">

      {toast && (
        <div style={{
          position:'fixed', top:20, right:20, zIndex:2000,
          background: toast.startsWith('❌') ? 'var(--red-dim)' : 'var(--green-dim)',
          border:`1px solid ${toast.startsWith('❌')?'rgba(220,38,38,0.3)':'rgba(22,163,74,0.3)'}`,
          borderRadius:'var(--r2)', padding:'12px 18px',
          fontSize:13, fontWeight:600,
          color: toast.startsWith('❌') ? 'var(--red)' : 'var(--green)',
          boxShadow:'var(--shadow-lg)',
          display:'flex', alignItems:'center', gap:8,
        }}>
          <Icon name={toast.startsWith('❌')?'X':'Check'} size={14} strokeWidth={2.5}/>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:28 }}>
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>
            My Profile
          </div>
          <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>
            Manage your trainer account and preferences
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
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24, paddingBottom:20, borderBottom:'1px solid var(--border)' }}>
            <div style={{
              width:72, height:72, borderRadius:20, flexShrink:0,
              background:'var(--teal-dim)', color:'var(--teal)',
              border:'2px solid rgba(8,145,178,0.25)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:22, fontWeight:800, fontFamily:'var(--font-mono)',
              boxShadow:'0 4px 14px rgba(8,145,178,0.2)',
            }}>
              {profile.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <div style={{ fontSize:18, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>
                {profile.name}
              </div>
              <div style={{ fontSize:12, color:'var(--text3)', marginTop:4 }}>
                Senior Trainer · TransitLearn
              </div>
              <span className="badge badge-teal" style={{ marginTop:6 }}>
                <Icon name="GraduationCap" size={9} strokeWidth={2.5}/> Trainer Portal
              </span>
            </div>
          </div>

          {editing ? (
            <div>
              {[
                { label:'Full Name',   key:'name',     type:'text'  },
                { label:'Email',       key:'email',    type:'email' },
                { label:'Phone',       key:'phone',    type:'tel'   },
                { label:'Depot/Centre',key:'depot',    type:'text'  },
              ].map(f => (
                <div key={f.key} className="form-group">
                  <label className="form-label">{f.label}</label>
                  <input className="form-input" type={f.type}
                    value={profile[f.key]}
                    onChange={e => setProfile(p => ({ ...p, [f.key]:e.target.value }))}/>
                </div>
              ))}
              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea className="form-input" rows={3}
                  value={profile.bio}
                  onChange={e => setProfile(p => ({ ...p, bio:e.target.value }))}/>
              </div>
              <button className="btn btn-primary w100"
                onClick={() => { setEditing(false); showToast('✅ Profile updated successfully'); }}>
                <Icon name="Check" size={13}/> Save Changes
              </button>
            </div>
          ) : (
            <div>
              {[
                { label:'Email',        val:profile.email,    icon:'Mail'          },
                { label:'Phone',        val:profile.phone,    icon:'Info'          },
                { label:'Depot',        val:profile.depot,    icon:'Building'      },
                { label:'Category',     val:profile.category, icon:'Layers'        },
                { label:'Joined',       val:profile.joined,   icon:'Calendar'      },
              ].map(r => (
                <div key={r.label} className="kv-row">
                  <span className="kv-key" style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <Icon name={r.icon} size={11}/> {r.label}
                  </span>
                  <span className="kv-val" style={{ fontSize:12 }}>{r.val}</span>
                </div>
              ))}
              <div style={{ marginTop:14, padding:'12px', background:'var(--bg3)', borderRadius:'var(--r)', border:'1px solid var(--border)' }}>
                <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600, marginBottom:6 }}>Bio</div>
                <div style={{ fontSize:12.5, color:'var(--text2)', lineHeight:1.6 }}>{profile.bio}</div>
              </div>
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
              { label:'Current Password', key:'current',  ph:'••••••••' },
              { label:'New Password',     key:'newPass',  ph:'Min 8 characters' },
              { label:'Confirm Password', key:'confirm',  ph:'Repeat new password' },
            ].map(f => (
              <div key={f.key} className="form-group">
                <label className="form-label">{f.label}</label>
                <div style={{ position:'relative' }}>
                  <input className="form-input"
                    type={showPass ? 'text' : 'password'}
                    placeholder={f.ph}
                    value={passwords[f.key]}
                    onChange={e => setPasswords(p => ({ ...p, [f.key]:e.target.value }))}
                    style={{ paddingRight:36 }}
                  />
                  <button type="button" onClick={() => setShowPass(p=>!p)} style={{
                    position:'absolute', right:10, top:'50%', transform:'translateY(-50%)',
                    background:'none', border:'none', cursor:'pointer', color:'var(--text3)',
                  }}>
                    <Icon name="Eye" size={13}/>
                  </button>
                </div>
              </div>
            ))}
            <button className="btn btn-primary w100"
              onClick={() => {
                if (!passwords.current) { showToast('❌ Enter current password'); return; }
                if (passwords.newPass.length < 8) { showToast('❌ Min 8 characters'); return; }
                if (passwords.newPass !== passwords.confirm) { showToast('❌ Passwords do not match'); return; }
                setPasswords({ current:'', newPass:'', confirm:'' });
                showToast('✅ Password changed successfully');
              }}>
              <Icon name="Lock" size={13}/> Update Password
            </button>
          </div>

          {/* Activity log */}
          <div className="card">
            <div style={{ fontWeight:700, fontSize:13, color:'var(--text)', marginBottom:14 }}>
              Recent Activity
            </div>
            {[
              { action:'Course submitted for approval', time:'2 hours ago',  icon:'Book',    color:'blue'  },
              { action:'BTW session scored for Marcus', time:'Yesterday',     icon:'Car',     color:'teal'  },
              { action:'Quiz added to Pre-Service',     time:'2 days ago',   icon:'Pencil',  color:'amber' },
              { action:'Video uploaded to library',     time:'3 days ago',   icon:'Video',   color:'green' },
              { action:'Driver progress reviewed',      time:'1 week ago',   icon:'Users',   color:'blue'  },
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
      </div>
  );
}