import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import Icon from '../components/Icons';

const PORTAL_INFO = {
  admin:   { color:'var(--blue)',  dim:'var(--blue-dim)',  label:'Admin Portal',   icon:'Settings', badge:'blue'  },
  trainer: { color:'var(--teal)',  dim:'var(--teal-dim)',  label:'Trainer Portal', icon:'GraduationCap', badge:'teal' },
  driver:  { color:'var(--amber)', dim:'var(--amber-dim)', label:'Driver Portal',  icon:'Bus',      badge:'amber' },
};

export default function LoginPage({ onSuccess }) {
  const { login, register } = useAuth();
  const [tab,      setTab]      = useState('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [detected, setDetected] = useState(null);
  const [regSuccess, setRegSuccess] = useState(null);

  // Register form
  const [regName,      setRegName]      = useState('');
  const [regUsername,  setRegUsername]  = useState('');
  const [regPassword,  setRegPassword]  = useState('');
  const [regPhone,     setRegPhone]     = useState('');
  const [regNat,       setRegNat]       = useState('');
  const [batchCode,    setBatchCode]    = useState('');

  const handleUsernameChange = (val) => {
    setUsername(val);
    setError('');
    const lower = val.toLowerCase();
    if (lower === 'admin')        setDetected('admin');
    else if (lower === 'trainer' || lower === 'tom') setDetected('trainer');
    else if (lower === 'driver')  setDetected('driver');
    else                          setDetected(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) { setError('Please enter username and password'); return; }
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 800));
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
    if (!regName || !regUsername || !regPassword || !batchCode) { setError('Please fill all required fields'); return; }
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 800));
    const result = register(batchCode, { name:regName, username:regUsername, password:regPassword, phone:regPhone, nationality:regNat });
    setLoading(false);
    if (result.success) {
      setRegSuccess(result.batch);
    } else {
      setError(result.error);
    }
  };

  const info = detected ? PORTAL_INFO[detected] : null;

  return (
    <div className="auth-root" style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'var(--bg)' }}>

      {/* Left Panel */}
      <div className="auth-left" style={{ width:'100%', maxWidth:440, background:'var(--bg2)', borderRadius:'var(--r3)', boxShadow:'var(--shadow-lg)', padding:'32px', border:'1px solid var(--border)' }}>

        <div className="auth-logo">
          <div className="auth-logo-mark">
            <Icon name="Bus" size={22} color="#fff" strokeWidth={2}/>
          </div>
          <div className="auth-logo-text">
            <strong>TransitLearn</strong>
            <span>Training Platform</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:4, marginBottom:28, background:'var(--bg3)', borderRadius:'var(--r2)', padding:4 }}>
          {[{key:'signin',label:'Sign In'},{key:'register',label:'Register as Driver'}].map(t=>(
            <button key={t.key} onClick={()=>{ setTab(t.key); setError(''); setRegSuccess(null); }}
              style={{
                flex:1, padding:'8px', borderRadius:'var(--r)', border:'none', cursor:'pointer',
                background: tab===t.key ? 'var(--bg2)' : 'transparent',
                color: tab===t.key ? 'var(--text)' : 'var(--text3)',
                fontWeight: tab===t.key ? 700 : 500, fontSize:13, fontFamily:'var(--font)',
                boxShadow: tab===t.key ? 'var(--shadow-sm)' : 'none',
                transition:'all 0.15s',
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Sign In */}
        {tab === 'signin' && (
          <>
            <div style={{ minHeight:32, marginBottom:16 }}>
              {info ? (
                <div className={`auth-portal-badge ${info.badge}`}>
                  <Icon name={info.icon} size={11} strokeWidth={2.5}/> {info.label} — Detected
                </div>
              ) : (
                <div className="auth-portal-badge blue" style={{ opacity:0.4 }}>
                  <Icon name="Lock" size={11} strokeWidth={2.5}/> Enter credentials to detect role
                </div>
              )}
            </div>

            <div className="auth-heading" style={{ fontSize:22 }}>
              {info ? `Welcome back, ${detected==='admin'?'Administrator':detected==='trainer'?'Trainer':'Driver'}` : 'Sign In'}
            </div>
            <div className="auth-sub">Use your assigned username and password to access your portal.</div>

            <form className="auth-form" onSubmit={handleSubmit}>
              {error && <div className="auth-error"><Icon name="Alert" size={14} color="var(--red)"/>{error}</div>}
              <div>
                <label className="form-label">Username</label>
                <div className="auth-input-wrap">
                  <div className="auth-input-icon"><Icon name="Users" size={14}/></div>
                  <input className={`auth-input ${error?'error':''}`} type="text" placeholder="Enter your username"
                    value={username} autoComplete="off" onChange={e=>handleUsernameChange(e.target.value)}/>
                  {info && (
                    <div style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', background:info.dim, color:info.color, fontSize:9, fontWeight:700, padding:'2px 7px', borderRadius:10, border:`1px solid ${info.color}22`, fontFamily:'var(--font-mono)', pointerEvents:'none' }}>
                      {detected?.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="form-label">Password</label>
                <div className="auth-input-wrap">
                  <div className="auth-input-icon"><Icon name="Lock" size={14}/></div>
                  <input className={`auth-input ${error?'error':''}`} type={showPass?'text':'password'} placeholder="Enter your password"
                    value={password} onChange={e=>{setPassword(e.target.value);setError('');}}/>
                  <button type="button" onClick={()=>setShowPass(p=>!p)}
                    style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'var(--text3)', display:'flex', padding:2 }}>
                    <Icon name="Eye" size={14}/>
                  </button>
                </div>
              </div>
              <button className="auth-btn" type="submit" disabled={loading}
                style={{ background: detected==='trainer'?'var(--teal)':detected==='driver'?'var(--amber)':'var(--blue)', color: detected==='driver'?'#fff':'#fff' }}>
                {loading ? <><div className="spinner"/> Signing in...</> : <><Icon name="LogOut" size={15} strokeWidth={2}/> {info?`Sign In as ${detected.charAt(0).toUpperCase()+detected.slice(1)}`:'Sign In'}</>}
              </button>
            </form>
          </>
        )}

        {/* Register */}
        {tab === 'register' && (
          <>
            {regSuccess ? (
              <div style={{ textAlign:'center', padding:'32px 0' }}>
                <div style={{ width:72, height:72, borderRadius:'50%', background:'var(--green-dim)', border:'2px solid var(--green)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
                  <Icon name="Check" size={32} color="var(--green)" strokeWidth={2}/>
                </div>
                <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', marginBottom:8 }}>Registration Submitted!</div>
                <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.6, marginBottom:20 }}>
                  Your registration for <strong>{regSuccess.label}</strong> has been submitted.<br/>
                  You'll be assigned to <strong>{regSuccess.trainer}</strong> at <strong>{regSuccess.depot}</strong>.<br/><br/>
                  Once approved by Admin, you can sign in with your username and password.
                </div>
                <div style={{ background:'var(--blue-dim)', border:'1px solid rgba(27,110,243,0.2)', borderRadius:'var(--r2)', padding:'12px 16px', marginBottom:20 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:'var(--blue)', marginBottom:4 }}>Batch: {regSuccess.batch}</div>
                  <div style={{ fontSize:11, color:'var(--text2)' }}>Your account is pending admin approval</div>
                </div>
                <button className="btn btn-ghost" onClick={()=>{ setTab('signin'); setRegSuccess(null); setRegName(''); setRegUsername(''); setRegPassword(''); setBatchCode(''); }}>
                  Back to Sign In
                </button>
              </div>
            ) : (
              <>
                <div className="auth-heading" style={{ fontSize:22 }}>Driver Registration</div>
                <div className="auth-sub">Register with your training batch code provided by your supervisor.</div>
                <form className="auth-form" onSubmit={handleRegister}>
                  {error && <div className="auth-error"><Icon name="Alert" size={14} color="var(--red)"/>{error}</div>}

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input className="form-input" placeholder="As per license" value={regName} onChange={e=>setRegName(e.target.value)}/>
                    </div>
                    <div>
                      <label className="form-label">Username *</label>
                      <input className="form-input" placeholder="Choose a username" value={regUsername} onChange={e=>setRegUsername(e.target.value)}/>
                    </div>
                    <div>
                      <label className="form-label">Password *</label>
                      <input className="form-input" type="password" placeholder="Min 6 characters" value={regPassword} onChange={e=>setRegPassword(e.target.value)}/>
                    </div>
                    <div>
                      <label className="form-label">Phone Number</label>
                      <input className="form-input" placeholder="971XXXXXXXXX" value={regPhone} onChange={e=>setRegPhone(e.target.value)}/>
                    </div>
                    <div>
                      <label className="form-label">Nationality</label>
                      <input className="form-input" placeholder="e.g. Pakistan" value={regNat} onChange={e=>setRegNat(e.target.value)}/>
                    </div>
                    <div>
                      <label className="form-label">Batch Code *</label>
                      <input className="form-input" placeholder="e.g. BATCH-153" value={batchCode}
                        onChange={e=>{ setBatchCode(e.target.value.toUpperCase()); setError(''); }}
                        style={{ fontFamily:'var(--font-mono)', textTransform:'uppercase' }}/>
                    </div>
                  </div>

                  <div style={{ background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:'var(--r)', padding:'10px 12px', fontSize:11, color:'var(--text3)' }}>
                    <Icon name="Info" size={11}/> Valid batch codes: <span style={{ fontFamily:'var(--font-mono)', color:'var(--blue)' }}>BATCH-153</span>, <span style={{ fontFamily:'var(--font-mono)', color:'var(--teal)' }}>BATCH-154</span>, <span style={{ fontFamily:'var(--font-mono)', color:'var(--amber)' }}>BATCH-155</span>
                  </div>

                  <button className="auth-btn" type="submit" disabled={loading}>
                    {loading ? <><div className="spinner"/> Submitting...</> : <><Icon name="UserCheck" size={15}/> Submit Registration</>}
                  </button>
                </form>
              </>
            )}
          </>
        )}
      </div>

      </div>
  );
}