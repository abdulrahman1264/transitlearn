import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import Icon from '../components/Icons';

const PORTAL_INFO = {
  admin:   { color:'var(--blue)',  dim:'var(--blue-dim)',  label:'Admin Portal',   icon:'Settings',      badge:'blue'  },
  trainer: { color:'var(--teal)',  dim:'var(--teal-dim)',  label:'Trainer Portal', icon:'GraduationCap', badge:'teal'  },
  driver:  { color:'var(--amber)', dim:'var(--amber-dim)', label:'Driver Portal',  icon:'Bus',           badge:'amber' },
};

const STATS = [
  { icon:'Users',  label:'Active Drivers',   val:'567', color:'var(--blue)'  },
  { icon:'Book',   label:'Training Courses', val:'6',   color:'var(--teal)'  },
  { icon:'Shield', label:'Compliance Rate',  val:'91%', color:'var(--green)' },
  { icon:'Trophy', label:'Certified Drivers',val:'284', color:'var(--amber)' },
];

export default function LoginPage({ onSuccess }) {
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [detected, setDetected] = useState(null);

  const handleUsernameChange = (val) => {
    setUsername(val);
    setError('');
    const lower = val.toLowerCase();
    if (lower === 'admin')        setDetected('admin');
    else if (lower === 'trainer') setDetected('trainer');
    else if (lower === 'driver')  setDetected('driver');
    else                          setDetected(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) { setError('Please enter your username and password'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 900));
    const portals = ['admin','trainer','driver'];
    let success = false;
    for (const p of portals) {
      const result = login(p, username, password);
      if (result.success) { success = true; onSuccess(); break; }
    }
    setLoading(false);
    if (!success) setError('Invalid username or password.');
  };

  const info = detected ? PORTAL_INFO[detected] : null;

  return (
    <div className="auth-root">

      {/* ── Left Panel ─────────────────────────── */}
      <div className="auth-left" style={{ width:460, minWidth:460 }}>

        {/* Logo */}
        <div className="auth-logo">
          <div className="auth-logo-mark">
            <Icon name="Bus" size={22} color="#fff" strokeWidth={2}/>
          </div>
          <div className="auth-logo-text">
            <strong>TransitLearn</strong>
            <span>Training Platform</span>
          </div>
        </div>

        {/* Dynamic portal badge */}
        <div style={{ minHeight:32, marginBottom:20 }}>
          {info ? (
            <div className={`auth-portal-badge ${info.badge}`}>
              <Icon name={info.icon} size={11} strokeWidth={2.5}/>
              {info.label} — Detected
            </div>
          ) : (
            <div className="auth-portal-badge blue" style={{ opacity:0.4 }}>
              <Icon name="Lock" size={11} strokeWidth={2.5}/>
              Enter credentials to detect role
            </div>
          )}
        </div>

        {/* Heading */}
        <div className="auth-heading" style={{ fontSize:24 }}>
          {info
            ? `Welcome back, ${detected === 'admin' ? 'Administrator' : detected === 'trainer' ? 'Trainer' : 'Driver'}`
            : 'Sign In'
          }
        </div>
        <div className="auth-sub">
          Use your assigned username and password to access your portal.
        </div>

        {/* ── Credentials Info Card ────────────── */}
        <div style={{
          background:'var(--bg3)',
          border:'1px solid var(--border)',
          borderRadius:'var(--r2)',
          padding:'14px 16px',
          marginBottom:24,
        }}>
          <div style={{
            fontSize:10, fontWeight:700, color:'var(--text3)',
            textTransform:'uppercase', letterSpacing:'0.6px',
            marginBottom:10, display:'flex', alignItems:'center', gap:6,
          }}>
            <Icon name="Key" size={10}/> Login Credentials
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {[
              { role:'Admin',   user:'Admin',   pass:'admin123',   color:'var(--blue)',  dim:'var(--blue-dim)',  av:'AU' },
              { role:'Trainer', user:'Trainer', pass:'trainer123', color:'var(--teal)',  dim:'var(--teal-dim)',  av:'EM' },
              { role:'Driver',  user:'Driver',  pass:'driver123',  color:'var(--amber)', dim:'var(--amber-dim)', av:'MO' },
            ].map(c => (
              <div key={c.role} style={{
                display:'flex', alignItems:'center', gap:10,
                padding:'8px 10px',
                background:'var(--bg2)',
                border:'1px solid var(--border)',
                borderRadius:'var(--r)',
              }}>
                <div style={{
                  width:28, height:28, borderRadius:8, flexShrink:0,
                  background:c.dim, color:c.color,
                  border:`1px solid ${c.color}33`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:9, fontWeight:700, fontFamily:'var(--font-mono)',
                }}>{c.av}</div>
                <div style={{ flex:1 }}>
                  <span style={{ fontSize:12, fontWeight:700, color:'var(--text)' }}>{c.role}</span>
                  <span style={{ fontSize:11, color:'var(--text3)', fontFamily:'var(--font-mono)', marginLeft:8 }}>
                    {c.user} · {c.pass}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Form ───────────────────────────────── */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error">
              <Icon name="Alert" size={14} color="var(--red)"/>
              {error}
            </div>
          )}

          {/* Username */}
          <div>
            <label className="form-label" style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
              <Icon name="Users" size={11}/> Username
            </label>
            <div className="auth-input-wrap">
              <div className="auth-input-icon">
                <Icon name="Users" size={14}/>
              </div>
              <input
                className={`auth-input ${error ? 'error' : ''}`}
                type="text"
                placeholder="Enter your username"
                value={username}
                autoComplete="off"
                onChange={e => handleUsernameChange(e.target.value)}
              />
              {info && (
                <div style={{
                  position:'absolute', right:10, top:'50%',
                  transform:'translateY(-50%)',
                  background:info.dim, color:info.color,
                  fontSize:9, fontWeight:700, padding:'2px 7px',
                  borderRadius:10, letterSpacing:'0.5px',
                  border:`1px solid ${info.color}22`,
                  fontFamily:'var(--font-mono)',
                  pointerEvents:'none',
                }}>
                  {detected?.toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="form-label" style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
              <Icon name="Lock" size={11}/> Password
            </label>
            <div className="auth-input-wrap">
              <div className="auth-input-icon">
                <Icon name="Lock" size={14}/>
              </div>
              <input
                className={`auth-input ${error ? 'error' : ''}`}
                type={showPass ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                style={{
                  position:'absolute', right:12, top:'50%',
                  transform:'translateY(-50%)', background:'none',
                  border:'none', cursor:'pointer', color:'var(--text3)',
                  display:'flex', padding:2,
                }}
              >
                <Icon name="Eye" size={14}/>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            className="auth-btn"
            type="submit"
            disabled={loading}
            style={{
              marginTop:4,
              background: detected === 'trainer' ? 'var(--teal)'
                        : detected === 'driver'  ? 'var(--amber)'
                        : 'var(--blue)',
              color: detected === 'driver' ? '#000' : '#fff',
              transition:'all 0.2s',
            }}
          >
            {loading
              ? <><div className="spinner" style={{ borderTopColor: detected === 'driver' ? '#000' : '#fff' }}/> Signing in...</>
              : <><Icon name="LogOut" size={15} strokeWidth={2}/>
                  {info
                    ? `Sign In as ${detected.charAt(0).toUpperCase() + detected.slice(1)}`
                    : 'Sign In'
                  }
                </>
            }
          </button>
        </form>

        {/* Footer */}
        <div style={{
          marginTop:20, paddingTop:16,
          borderTop:'1px solid var(--border)',
          display:'flex', alignItems:'center', gap:6,
          fontSize:11, color:'var(--text3)',
        }}>
          <Icon name="Shield" size={11}/>
          Your role is automatically detected from your credentials
        </div>
      </div>

      {/* ── Right Panel ──────────────────────────── */}
      <div className="auth-right" style={{
        background: detected === 'trainer'
          ? 'linear-gradient(135deg, var(--teal-dim) 0%, var(--bg) 60%, var(--bg3) 100%)'
          : detected === 'driver'
          ? 'linear-gradient(135deg, var(--amber-dim) 0%, var(--bg) 60%, var(--bg3) 100%)'
          : 'linear-gradient(135deg, var(--blue-dim) 0%, var(--bg) 60%, var(--bg3) 100%)',
        transition:'background 0.4s ease',
      }}>

        {/* BG circles */}
        <div style={{
          position:'absolute', width:420, height:420, borderRadius:'50%',
          background: info ? `${info.color}08` : 'rgba(29,111,242,0.06)',
          top:-120, right:-100, transition:'all 0.4s',
        }}/>
        <div style={{
          position:'absolute', width:260, height:260, borderRadius:'50%',
          background: info ? `${info.color}05` : 'rgba(29,111,242,0.04)',
          bottom:40, left:-60, transition:'all 0.4s',
        }}/>

        <div className="auth-right-inner">

          {/* Big icon */}
          <div style={{
            width:88, height:88, borderRadius:28,
            background: info ? info.dim : 'var(--blue-dim)',
            border:`2px solid ${info ? info.color : 'var(--blue)'}33`,
            display:'flex', alignItems:'center', justifyContent:'center',
            margin:'0 auto 20px',
            boxShadow:`0 12px 32px ${info ? info.color : 'var(--blue)'}22`,
            transition:'all 0.3s ease',
          }}>
            <Icon
              name={info ? info.icon : 'Bus'}
              size={40}
              color={info ? info.color : 'var(--blue)'}
              strokeWidth={1.5}
            />
          </div>

          {/* Title */}
          <div style={{
            fontFamily:'var(--font-head)', fontSize:22, fontWeight:800,
            color:'var(--text)', marginBottom:8, letterSpacing:'-0.5px',
          }}>
            {info ? info.label : 'TransitLearn Platform'}
          </div>

          {/* Description */}
          <div style={{
            fontSize:13, color:'var(--text2)',
            marginBottom:32, maxWidth:300, lineHeight:1.6,
          }}>
            {detected === 'admin'
              ? 'Full platform control — manage drivers, trainers, compliance and DRM keys.'
              : detected === 'trainer'
              ? 'Build courses, run BTW sessions and assess driver skills across your fleet.'
              : detected === 'driver'
              ? 'Access training courses, complete quizzes and track your compliance status.'
              : "Professional bus driver training platform for Dubai's transit network."
            }
          </div>

          {/* Stat cards */}
          <div style={{ display:'flex', flexDirection:'column', gap:10, alignItems:'center' }}>
            {STATS.map(s => (
              <div key={s.label} className="auth-stat-card" style={{ width:240 }}>
                <div style={{
                  width:36, height:36, borderRadius:10,
                  background:`${s.color}18`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <Icon name={s.icon} size={16} color={s.color}/>
                </div>
                <div>
                  <div style={{
                    fontFamily:'var(--font-head)', fontSize:20,
                    fontWeight:800, color:'var(--text)', lineHeight:1,
                  }}>{s.val}</div>
                  <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}