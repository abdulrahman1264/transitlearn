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
  const { login, register } = useAuth();
  const [tab, setTab] = useState('login'); // 'login' | 'register'

  // Login state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [detected, setDetected] = useState(null);

  // Register state
  const [regBatchCode, setRegBatchCode] = useState('');
  const [regName,      setRegName]      = useState('');
  const [regUsername,  setRegUsername]  = useState('');
  const [regPassword,  setRegPassword]  = useState('');
  const [regConfirm,   setRegConfirm]   = useState('');
  const [regRtaId,     setRegRtaId]     = useState('');
  const [regError,     setRegError]     = useState('');
  const [regLoading,   setRegLoading]   = useState(false);
  const [regSuccess,   setRegSuccess]   = useState(false);
  const [batchInfo,    setBatchInfo]    = useState(null);
  const [showRegPass,  setShowRegPass]  = useState(false);

  const { BATCH_CODES } = useAuth();

  const handleUsernameChange = (val) => {
    setUsername(val);
    setError('');
    const lower = val.toLowerCase();
    if (lower === 'admin')        setDetected('admin');
    else if (lower === 'trainer') setDetected('trainer');
    else if (lower === 'driver')  setDetected('driver');
    else                          setDetected(null);
  };

  const handleBatchCodeCheck = (code) => {
    setRegBatchCode(code);
    const info = BATCH_CODES[code.toUpperCase()];
    setBatchInfo(info || null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) { setError('Please enter your username and password'); return; }
    setLoading(true); setError('');
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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regBatchCode) { setRegError('Please enter your batch code'); return; }
    if (!batchInfo)    { setRegError('Invalid batch code'); return; }
    if (!regName)      { setRegError('Please enter your full name'); return; }
    if (!regUsername)  { setRegError('Please choose a username'); return; }
    if (!regRtaId)     { setRegError('Please enter your RTA ID'); return; }
    if (regPassword.length < 6) { setRegError('Password must be at least 6 characters'); return; }
    if (regPassword !== regConfirm) { setRegError('Passwords do not match'); return; }

    setRegLoading(true); setRegError('');
    await new Promise(r => setTimeout(r, 1200));

    const result = register(regBatchCode, {
      username: regUsername,
      password: regPassword,
      name:     regName,
      rtaId:    regRtaId,
    });

    setRegLoading(false);
    if (result.success) {
      setRegSuccess(true);
      setTimeout(() => onSuccess(), 1500);
    } else {
      setRegError(result.error);
    }
  };

  const info = detected ? PORTAL_INFO[detected] : null;

  return (
    <div className="auth-root">

      {/* ── Left Panel ─────────────────────────── */}
      <div className="auth-left" style={{ width:480, minWidth:480 }}>

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

        {/* Tab switcher */}
        <div style={{
          display:'flex', background:'var(--bg3)',
          borderRadius:'var(--r2)', padding:4,
          marginBottom:24, border:'1px solid var(--border)',
        }}>
          {[
            { key:'login',    label:'Sign In',   icon:'LogOut' },
            { key:'register', label:'Register',  icon:'Plus'   },
          ].map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setError(''); setRegError(''); }}
              style={{
                flex:1, padding:'9px', borderRadius:'var(--r)',
                border:'none', cursor:'pointer',
                background: tab===t.key ? 'var(--bg2)' : 'transparent',
                color: tab===t.key ? 'var(--text)' : 'var(--text3)',
                fontWeight: tab===t.key ? 700 : 500,
                fontSize:13, fontFamily:'var(--font)',
                boxShadow: tab===t.key ? 'var(--shadow-sm)' : 'none',
                transition:'all 0.15s',
                display:'flex', alignItems:'center', justifyContent:'center', gap:6,
              }}>
              <Icon name={t.icon} size={13} color={tab===t.key?'var(--brand)':'var(--text3)'}/>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── LOGIN TAB ─────────────────────────── */}
        {tab === 'login' && (
          <>
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

            <div className="auth-heading" style={{ fontSize:22 }}>
              {info
                ? `Welcome back, ${detected==='admin'?'Administrator':detected==='trainer'?'Trainer':'Driver'}`
                : 'Sign In'
              }
            </div>
            <div className="auth-sub">
              Use your username and password to access your portal.
            </div>

            {/* Credentials hint */}
            <div className="demo-users" style={{ marginBottom:24 }}>
              <div className="demo-label">
                <Icon name="Key" size={10}/> Demo Credentials
              </div>
              {[
                { role:'Admin',   user:'Admin',   pass:'admin123',   color:'var(--blue)',  dim:'var(--blue-dim)',  av:'AU' },
                { role:'Trainer', user:'Trainer', pass:'trainer123', color:'var(--teal)',  dim:'var(--teal-dim)',  av:'EM' },
                { role:'Driver',  user:'Driver',  pass:'driver123',  color:'var(--amber)', dim:'var(--amber-dim)', av:'MO' },
              ].map(c => (
                <div key={c.role} style={{
                  display:'flex', alignItems:'center', gap:10,
                  padding:'8px 10px', background:'var(--bg2)',
                  border:'1px solid var(--border)', borderRadius:'var(--r)',
                  marginBottom:5,
                }}>
                  <div style={{
                    width:26, height:26, borderRadius:7, flexShrink:0,
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

            <form className="auth-form" onSubmit={handleLogin}>
              {error && (
                <div className="auth-error">
                  <Icon name="Alert" size={14} color="var(--red)"/> {error}
                </div>
              )}
              <div>
                <label className="form-label">Username</label>
                <div className="auth-input-wrap">
                  <div className="auth-input-icon"><Icon name="Users" size={14}/></div>
                  <input className={`auth-input ${error?'error':''}`}
                    type="text" placeholder="Enter username"
                    value={username} autoComplete="off"
                    onChange={e => handleUsernameChange(e.target.value)}/>
                  {info && (
                    <div style={{
                      position:'absolute', right:10, top:'50%', transform:'translateY(-50%)',
                      background:info.dim, color:info.color, fontSize:9, fontWeight:700,
                      padding:'2px 7px', borderRadius:10, border:`1px solid ${info.color}22`,
                      fontFamily:'var(--font-mono)', pointerEvents:'none',
                    }}>{detected?.toUpperCase()}</div>
                  )}
                </div>
              </div>
              <div>
                <label className="form-label">Password</label>
                <div className="auth-input-wrap">
                  <div className="auth-input-icon"><Icon name="Lock" size={14}/></div>
                  <input className={`auth-input ${error?'error':''}`}
                    type={showPass?'text':'password'} placeholder="Enter password"
                    value={password}
                    onChange={e=>{ setPassword(e.target.value); setError(''); }}/>
                  <button type="button" onClick={()=>setShowPass(p=>!p)} style={{
                    position:'absolute', right:12, top:'50%', transform:'translateY(-50%)',
                    background:'none', border:'none', cursor:'pointer', color:'var(--text3)', display:'flex', padding:2,
                  }}>
                    <Icon name="Eye" size={14}/>
                  </button>
                </div>
              </div>
              <button className="auth-btn" type="submit" disabled={loading}
                style={{
                  background: detected==='trainer'?'var(--teal)':detected==='driver'?'var(--amber)':'var(--blue)',
                  color: detected==='driver'?'#000':'#fff',
                }}>
                {loading
                  ? <><div className="spinner" style={{borderTopColor:detected==='driver'?'#000':'#fff'}}/> Signing in...</>
                  : <><Icon name="LogOut" size={15} strokeWidth={2}/>
                      {info ? `Sign In as ${detected?.charAt(0).toUpperCase()+detected?.slice(1)}` : 'Sign In'}
                    </>
                }
              </button>
            </form>

            <div style={{
              marginTop:16, paddingTop:14, borderTop:'1px solid var(--border)',
              fontSize:12, color:'var(--text3)', display:'flex', alignItems:'center', gap:6,
            }}>
              <Icon name="Shield" size={11}/>
              Your role is automatically detected · Drivers can
              <button onClick={()=>setTab('register')} style={{
                background:'none', border:'none', color:'var(--brand)',
                cursor:'pointer', fontWeight:700, fontSize:12, padding:0,
              }}>register here</button>
            </div>
          </>
        )}

        {/* ── REGISTER TAB ──────────────────────── */}
        {tab === 'register' && (
          <>
            {regSuccess ? (
              <div style={{ textAlign:'center', padding:'40px 0' }}>
                <div style={{ fontSize:56, marginBottom:16 }}>🎉</div>
                <div style={{ fontSize:18, fontWeight:800, color:'var(--text)', marginBottom:8 }}>
                  Registration Successful!
                </div>
                <div style={{ fontSize:13, color:'var(--text3)', marginBottom:16 }}>
                  Welcome to TransitLearn! Redirecting to your dashboard...
                </div>
                <div className="spinner" style={{
                  margin:'0 auto', borderColor:'var(--brand-dim)',
                  borderTopColor:'var(--brand)', width:28, height:28, borderWidth:3,
                }}/>
              </div>
            ) : (
              <>
                <div className="auth-portal-badge amber">
                  <Icon name="Bus" size={11} strokeWidth={2.5}/>
                  Driver Self-Registration
                </div>

                <div className="auth-heading" style={{ fontSize:20 }}>
                  Create your account
                </div>
                <div className="auth-sub">
                  Enter your batch code from your trainer to get started.
                </div>

                <form className="auth-form" onSubmit={handleRegister}>
                  {regError && (
                    <div className="auth-error">
                      <Icon name="Alert" size={14} color="var(--red)"/> {regError}
                    </div>
                  )}

                  {/* Batch code */}
                  <div>
                    <label className="form-label">
                      <Icon name="Key" size={11}/> Batch Code *
                    </label>
                    <div className="auth-input-wrap">
                      <div className="auth-input-icon"><Icon name="Key" size={14}/></div>
                      <input className="auth-input"
                        type="text" placeholder="e.g. BATCH-153"
                        value={regBatchCode}
                        style={{ textTransform:'uppercase' }}
                        onChange={e => handleBatchCodeCheck(e.target.value)}/>
                      {batchInfo && (
                        <div style={{
                          position:'absolute', right:10, top:'50%', transform:'translateY(-50%)',
                          background:'var(--green-dim)', color:'var(--green)',
                          fontSize:9, fontWeight:700, padding:'2px 7px', borderRadius:10,
                          display:'flex', alignItems:'center', gap:3,
                        }}>
                          <Icon name="Check" size={9} color="var(--green)" strokeWidth={3}/> Valid
                        </div>
                      )}
                    </div>

                    {/* Batch info card */}
                    {batchInfo && (
                      <div style={{
                        marginTop:8, padding:'10px 12px',
                        background:'var(--green-dim)', borderRadius:'var(--r)',
                        border:'1px solid rgba(22,163,74,0.2)',
                      }}>
                        <div style={{ fontSize:11, fontWeight:700, color:'var(--green)', marginBottom:4 }}>
                          <Icon name="Check" size={11} strokeWidth={2.5}/> Batch Found!
                        </div>
                        <div style={{ fontSize:11, color:'var(--text2)', display:'flex', flexDirection:'column', gap:2 }}>
                          <span><strong>Batch:</strong> {batchInfo.batch}</span>
                          <span><strong>Category:</strong> {batchInfo.category}</span>
                          <span><strong>Trainer:</strong> {batchInfo.trainer}</span>
                          <span><strong>Depot:</strong> {batchInfo.depot}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Personal details */}
                  <div>
                    <label className="form-label">Full Name *</label>
                    <div className="auth-input-wrap">
                      <div className="auth-input-icon"><Icon name="Users" size={14}/></div>
                      <input className="auth-input" type="text"
                        placeholder="As per driving license"
                        value={regName} onChange={e=>setRegName(e.target.value)}/>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">RTA ID *</label>
                    <div className="auth-input-wrap">
                      <div className="auth-input-icon"><Icon name="Key" size={14}/></div>
                      <input className="auth-input" type="text"
                        placeholder="e.g. 90454"
                        value={regRtaId} onChange={e=>setRegRtaId(e.target.value)}/>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Choose Username *</label>
                    <div className="auth-input-wrap">
                      <div className="auth-input-icon"><Icon name="Users" size={14}/></div>
                      <input className="auth-input" type="text"
                        placeholder="e.g. marcus.okafor"
                        value={regUsername}
                        onChange={e=>{ setRegUsername(e.target.value); setRegError(''); }}/>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Password *</label>
                    <div className="auth-input-wrap">
                      <div className="auth-input-icon"><Icon name="Lock" size={14}/></div>
                      <input className="auth-input"
                        type={showRegPass?'text':'password'}
                        placeholder="Min 6 characters"
                        value={regPassword} onChange={e=>setRegPassword(e.target.value)}/>
                      <button type="button" onClick={()=>setShowRegPass(p=>!p)} style={{
                        position:'absolute', right:12, top:'50%', transform:'translateY(-50%)',
                        background:'none', border:'none', cursor:'pointer', color:'var(--text3)', display:'flex', padding:2,
                      }}>
                        <Icon name="Eye" size={14}/>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Confirm Password *</label>
                    <div className="auth-input-wrap">
                      <div className="auth-input-icon"><Icon name="Lock" size={14}/></div>
                      <input className="auth-input"
                        type="password" placeholder="Repeat password"
                        value={regConfirm} onChange={e=>setRegConfirm(e.target.value)}/>
                    </div>
                  </div>

                  <button className="auth-btn amber" type="submit" disabled={regLoading||!batchInfo}
                    style={{ color:'#fff' }}>
                    {regLoading
                      ? <><div className="spinner" style={{borderTopColor:'#fff'}}/> Registering...</>
                      : <><Icon name="Check" size={15} strokeWidth={2}/> Create Account</>
                    }
                  </button>
                </form>

                <div style={{
                  marginTop:14, paddingTop:14, borderTop:'1px solid var(--border)',
                  fontSize:12, color:'var(--text3)', display:'flex', alignItems:'center', gap:6,
                }}>
                  Already have an account?
                  <button onClick={()=>setTab('login')} style={{
                    background:'none', border:'none', color:'var(--brand)',
                    cursor:'pointer', fontWeight:700, fontSize:12, padding:0,
                  }}>Sign in here</button>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* ── Right Panel ──────────────────────────── */}
      <div className="auth-right" style={{
        background: tab==='register'
          ? 'linear-gradient(135deg, var(--amber-dim) 0%, var(--bg) 60%, var(--bg3) 100%)'
          : detected==='trainer' ? 'linear-gradient(135deg, var(--teal-dim) 0%, var(--bg) 60%, var(--bg3) 100%)'
          : detected==='driver'  ? 'linear-gradient(135deg, var(--amber-dim) 0%, var(--bg) 60%, var(--bg3) 100%)'
          : 'linear-gradient(135deg, var(--blue-dim) 0%, var(--bg) 60%, var(--bg3) 100%)',
        transition:'background 0.4s ease',
      }}>
        <div style={{ position:'absolute', width:420, height:420, borderRadius:'50%', background:'rgba(27,110,243,0.06)', top:-120, right:-100 }}/>
        <div style={{ position:'absolute', width:260, height:260, borderRadius:'50%', background:'rgba(27,110,243,0.04)', bottom:40, left:-60 }}/>

        <div className="auth-right-inner">
          <div style={{
            width:88, height:88, borderRadius:28, margin:'0 auto 20px',
            background: tab==='register' ? 'var(--amber-dim)' : info ? info.dim : 'var(--blue-dim)',
            border:`2px solid ${tab==='register'?'var(--amber)':info?info.color:'var(--blue)'}33`,
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:`0 12px 32px ${tab==='register'?'var(--amber)':info?info.color:'var(--blue)'}22`,
            transition:'all 0.3s',
          }}>
            <Icon
              name={tab==='register' ? 'Plus' : info ? info.icon : 'Bus'}
              size={40}
              color={tab==='register' ? 'var(--amber)' : info ? info.color : 'var(--blue)'}
              strokeWidth={1.5}
            />
          </div>

          <div style={{ fontFamily:'var(--font)', fontSize:22, fontWeight:800, color:'var(--text)', marginBottom:8, letterSpacing:'-0.5px' }}>
            {tab==='register' ? 'Driver Registration'
              : info ? info.label : 'TransitLearn Platform'
            }
          </div>

          <div style={{ fontSize:13, color:'var(--text2)', marginBottom:32, maxWidth:300, lineHeight:1.6 }}>
            {tab==='register'
              ? 'Get your batch code from your trainer and create your account in minutes.'
              : detected==='admin'   ? 'Full platform control — manage drivers, trainers, compliance and DRM keys.'
              : detected==='trainer' ? 'Build courses, run BTW sessions and assess driver skills.'
              : detected==='driver'  ? 'Access training courses, complete quizzes and track your progress.'
              : "Professional bus driver training platform for Dubai's transit network."
            }
          </div>

          {/* How registration works */}
          {tab==='register' && (
            <div style={{ textAlign:'left', maxWidth:280 }}>
              <div style={{ fontSize:12, fontWeight:700, color:'var(--text)', marginBottom:12 }}>
                How it works:
              </div>
              {[
                { icon:'Key',     text:'Get batch code from your trainer' },
                { icon:'Users',   text:'Enter your personal details'      },
                { icon:'Lock',    text:'Choose a username and password'   },
                { icon:'Check',   text:'Instant access to your courses'   },
              ].map((s,i) => (
                <div key={i} style={{
                  display:'flex', alignItems:'center', gap:10, marginBottom:10,
                  padding:'8px 12px', background:'var(--bg2)',
                  borderRadius:'var(--r)', border:'1px solid var(--border)',
                }}>
                  <div style={{
                    width:28, height:28, borderRadius:8, flexShrink:0,
                    background:'var(--amber-dim)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    <Icon name={s.icon} size={13} color="var(--amber)"/>
                  </div>
                  <span style={{ fontSize:12, color:'var(--text2)' }}>{s.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Stats */}
          {tab==='login' && (
            <div style={{ display:'flex', flexDirection:'column', gap:10, alignItems:'center' }}>
              {STATS.map(s => (
                <div key={s.label} className="auth-stat-card" style={{ width:240 }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:`${s.color}18`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon name={s.icon} size={16} color={s.color}/>
                  </div>
                  <div>
                    <div style={{ fontFamily:'var(--font)', fontSize:20, fontWeight:800, color:'var(--text)', lineHeight:1 }}>{s.val}</div>
                    <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
  );
}