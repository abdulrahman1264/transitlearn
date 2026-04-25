import React, { useState } from 'react';
import Icon from '../components/Icons';

const TABS = ['General','Security','Notifications','Appearance','Batches','Integrations'];

export default function SettingsPage() {
  const [tab,       setTab]       = useState('General');
  const [toast,     setToast]     = useState('');
  const [settings,  setSettings]  = useState({
    platformName:  'TransitLearn',
    orgName:       'Roads & Transport Authority',
    timezone:      'Asia/Dubai',
    language:      'English',
    dateFormat:    'DD/MM/YYYY',
    maxBatchSize:  '50',
    passThreshold: '80',
    sessionTimeout:'30',
    emailNotifs:   true,
    smsNotifs:     false,
    autoReminders: true,
    reminderDays:  '3',
    certExpiry:    '365',
    theme:         'light',
    accentColor:   'blue',
    logoUrl:       '',
    currentPass:   '',
    newPass:       '',
    confirmPass:   '',
  });

  const [batches, setBatches] = useState([
    { id:1, name:'Batch 153', start:'2026-04-06', end:'2026-06-30', category:'Public Bus — Pre Service', capacity:50, enrolled:10, status:'Active'   },
    { id:2, name:'Batch 152', start:'2026-01-10', end:'2026-03-30', category:'Public Bus — In Service',  capacity:40, enrolled:36, status:'Completed' },
    { id:3, name:'Batch 151', start:'2025-10-01', end:'2025-12-20', category:'School Bus Training',      capacity:30, enrolled:24, status:'Completed' },
  ]);
  const [showNewBatch, setShowNewBatch] = useState(false);
  const [newBatch, setNewBatch] = useState({
    name:'', start:'', end:'', category:'Public Bus — Pre Service', capacity:'50'
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const set = (k, v) => setSettings(p => ({ ...p, [k]: v }));

  const handleSave = () => showToast('✅ Settings saved successfully');

  const handleAddBatch = () => {
    if (!newBatch.name || !newBatch.start || !newBatch.end) return;
    setBatches(prev => [...prev, {
      id: Date.now(), ...newBatch,
      capacity: Number(newBatch.capacity),
      enrolled: 0, status:'Active',
    }]);
    setNewBatch({ name:'', start:'', end:'', category:'Public Bus — Pre Service', capacity:'50' });
    setShowNewBatch(false);
    showToast('✅ New batch created');
  };

  const handleDeleteBatch = (id) => {
    setBatches(prev => prev.filter(b => b.id !== id));
    showToast('✅ Batch deleted');
  };

  const cardStyle = {
    background:'var(--bg2)', border:'1px solid var(--border)',
    borderRadius:'var(--r2)', padding:'22px 24px',
    boxShadow:'var(--shadow-sm)', marginBottom:16,
  };

  const sectionTitle = (title, desc, icon) => (
    <div className="flex items-center gap12" style={{ marginBottom:18, paddingBottom:14, borderBottom:'1px solid var(--border)' }}>
      <div style={{
        width:36, height:36, borderRadius:10,
        background:'var(--blue-dim)', border:'1px solid rgba(29,111,242,0.2)',
        display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
      }}>
        <Icon name={icon} size={16} color="var(--blue)"/>
      </div>
      <div>
        <div style={{ fontFamily:'var(--font-head)', fontSize:14, fontWeight:800, color:'var(--text)' }}>{title}</div>
        <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>{desc}</div>
      </div>
    </div>
  );

  const renderGeneral = () => (
    <div>
      <div style={cardStyle}>
        {sectionTitle('Platform Information', 'Basic platform configuration', 'Settings')}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          {[
            { label:'Platform Name',    key:'platformName',  type:'text'   },
            { label:'Organisation Name',key:'orgName',       type:'text'   },
            { label:'Timezone',         key:'timezone',      type:'select', opts:['Asia/Dubai','Asia/Riyadh','Europe/London','America/New_York'] },
            { label:'Language',         key:'language',      type:'select', opts:['English','Arabic','Urdu','Hindi'] },
            { label:'Date Format',      key:'dateFormat',    type:'select', opts:['DD/MM/YYYY','MM/DD/YYYY','YYYY-MM-DD'] },
            { label:'Session Timeout (min)', key:'sessionTimeout', type:'number' },
          ].map(f => (
            <div key={f.key} className="form-group">
              <label className="form-label">{f.label}</label>
              {f.type === 'select' ? (
                <select className="form-input" value={settings[f.key]} onChange={e=>set(f.key,e.target.value)}>
                  {f.opts.map(o => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input className="form-input" type={f.type} value={settings[f.key]}
                  onChange={e=>set(f.key,e.target.value)}/>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={cardStyle}>
        {sectionTitle('Training Configuration', 'Default training parameters', 'Book')}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16 }}>
          {[
            { label:'Max Batch Size',        key:'maxBatchSize'  },
            { label:'Pass Threshold (%)',     key:'passThreshold' },
            { label:'Certificate Validity (days)', key:'certExpiry'  },
          ].map(f => (
            <div key={f.key} className="form-group">
              <label className="form-label">{f.label}</label>
              <input className="form-input" type="number" value={settings[f.key]}
                onChange={e=>set(f.key,e.target.value)}/>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span style={{ fontSize:12, color:'var(--text3)' }}>
          <Icon name="Info" size={11}/> Changes apply immediately to all users
        </span>
        <button className="btn btn-primary" onClick={handleSave}>
          <Icon name="Check" size={14}/> Save Changes
        </button>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div>
      <div style={cardStyle}>
        {sectionTitle('Change Password', 'Update your admin password', 'Lock')}
        <div style={{ maxWidth:420, display:'flex', flexDirection:'column', gap:14 }}>
          {[
            { label:'Current Password', key:'currentPass' },
            { label:'New Password',     key:'newPass'     },
            { label:'Confirm Password', key:'confirmPass' },
          ].map(f => (
            <div key={f.key} className="form-group">
              <label className="form-label">{f.label}</label>
              <input className="form-input" type="password"
                placeholder="••••••••"
                value={settings[f.key]}
                onChange={e=>set(f.key,e.target.value)}/>
            </div>
          ))}
          <button className="btn btn-primary" style={{ alignSelf:'flex-start' }}
            onClick={()=>{
              if (settings.newPass !== settings.confirmPass) { showToast('❌ Passwords do not match'); return; }
              if (settings.newPass.length < 6) { showToast('❌ Password must be at least 6 characters'); return; }
              showToast('✅ Password changed successfully');
              set('currentPass',''); set('newPass',''); set('confirmPass','');
            }}>
            <Icon name="Lock" size={14}/> Update Password
          </button>
        </div>
      </div>

      <div style={cardStyle}>
        {sectionTitle('Security Policies', 'Platform security settings', 'Shield')}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {[
            { label:'Two-Factor Authentication',  desc:'Require 2FA for admin accounts',     key:'twoFactor',    val:false },
            { label:'IP Restriction',              desc:'Limit access to specific IP ranges', key:'ipRestrict',   val:false },
            { label:'Audit Log Retention (90 days)', desc:'Keep logs for compliance',        key:'auditRetain',  val:true  },
            { label:'Force Password Reset',        desc:'Require reset every 90 days',       key:'forceReset',   val:false },
          ].map(s => (
            <div key={s.key} style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'12px 16px', background:'var(--bg3)',
              borderRadius:'var(--r)', border:'1px solid var(--border)',
            }}>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{s.label}</div>
                <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>{s.desc}</div>
              </div>
              <div style={{
                width:42, height:24, borderRadius:12,
                background: s.val ? 'var(--blue)' : 'var(--bg4)',
                border:`1px solid ${s.val ? 'var(--blue)' : 'var(--border2)'}`,
                cursor:'pointer', position:'relative', transition:'all 0.2s',
              }}>
                <div style={{
                  position:'absolute', top:2,
                  left: s.val ? 20 : 2,
                  width:18, height:18, borderRadius:'50%',
                  background:'#fff', boxShadow:'0 1px 4px rgba(0,0,0,0.2)',
                  transition:'left 0.2s',
                }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div style={cardStyle}>
      {sectionTitle('Notification Settings', 'Configure alerts and reminders', 'Bell')}
      <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:20 }}>
        {[
          { label:'Email Notifications',   desc:'Send email alerts for key events',        key:'emailNotifs'  },
          { label:'SMS Notifications',     desc:'Send SMS alerts to drivers and trainers', key:'smsNotifs'    },
          { label:'Auto Reminders',        desc:'Remind drivers of upcoming deadlines',    key:'autoReminders'},
        ].map(s => (
          <div key={s.key} style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'12px 16px', background:'var(--bg3)',
            borderRadius:'var(--r)', border:'1px solid var(--border)',
          }}>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{s.label}</div>
              <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>{s.desc}</div>
            </div>
            <div
              onClick={() => set(s.key, !settings[s.key])}
              style={{
                width:42, height:24, borderRadius:12,
                background: settings[s.key] ? 'var(--blue)' : 'var(--bg4)',
                border:`1px solid ${settings[s.key] ? 'var(--blue)' : 'var(--border2)'}`,
                cursor:'pointer', position:'relative', transition:'all 0.2s', flexShrink:0,
              }}>
              <div style={{
                position:'absolute', top:2,
                left: settings[s.key] ? 20 : 2,
                width:18, height:18, borderRadius:'50%',
                background:'#fff', boxShadow:'0 1px 4px rgba(0,0,0,0.2)',
                transition:'left 0.2s',
              }}/>
            </div>
          </div>
        ))}
      </div>
      <div className="form-group" style={{ maxWidth:300 }}>
        <label className="form-label">Reminder Days Before Deadline</label>
        <input className="form-input" type="number" value={settings.reminderDays}
          onChange={e=>set('reminderDays',e.target.value)}/>
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        <Icon name="Check" size={14}/> Save Notification Settings
      </button>
    </div>
  );

  const renderAppearance = () => (
    <div style={cardStyle}>
      {sectionTitle('Appearance', 'Customize platform look and feel', 'Star')}
      <div style={{ marginBottom:20 }}>
        <label className="form-label">Accent Color</label>
        <div style={{ display:'flex', gap:10, marginTop:8 }}>
          {[
            { key:'blue',   color:'var(--blue)'   },
            { key:'teal',   color:'var(--teal)'   },
            { key:'green',  color:'var(--green)'  },
            { key:'amber',  color:'var(--amber)'  },
            { key:'purple', color:'var(--purple)' },
          ].map(c => (
            <div key={c.key}
              onClick={() => set('accentColor', c.key)}
              style={{
                width:36, height:36, borderRadius:'50%',
                background: c.color, cursor:'pointer',
                border: settings.accentColor === c.key
                  ? `3px solid var(--text)`
                  : '3px solid transparent',
                boxShadow: settings.accentColor === c.key ? '0 0 0 2px white, 0 0 0 4px var(--text)' : 'none',
                transition:'all 0.15s',
              }}/>
          ))}
        </div>
      </div>
      <div className="form-group" style={{ maxWidth:400 }}>
        <label className="form-label">Organisation Logo URL</label>
        <input className="form-input" type="url" placeholder="https://..."
          value={settings.logoUrl} onChange={e=>set('logoUrl',e.target.value)}/>
      </div>
      <div style={{
        background:'var(--bg3)', border:'1px solid var(--border)',
        borderRadius:'var(--r2)', padding:'16px', marginBottom:16,
        display:'flex', alignItems:'center', gap:12,
      }}>
        <Icon name="Info" size={14} color="var(--blue)"/>
        <span style={{ fontSize:12, color:'var(--text2)' }}>
          Theme changes will apply to all users on the platform after saving.
        </span>
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        <Icon name="Check" size={14}/> Save Appearance
      </button>
    </div>
  );

  const renderBatches = () => (
    <div>
      <div className="flex items-center justify-between mb16">
        <div style={{ fontSize:13, color:'var(--text3)' }}>
          {batches.length} training batches
        </div>
        <button className="btn btn-primary btn-sm" onClick={()=>setShowNewBatch(true)}>
          <Icon name="Plus" size={12}/> New Batch
        </button>
      </div>

      {showNewBatch && (
        <div style={{ ...cardStyle, background:'var(--blue-dim)', border:'1px solid rgba(29,111,242,0.2)', marginBottom:16 }}>
          <div style={{ fontFamily:'var(--font-head)', fontSize:14, fontWeight:800, color:'var(--blue)', marginBottom:14 }}>
            <Icon name="Plus" size={13}/> Create New Batch
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div className="form-group">
              <label className="form-label">Batch Name</label>
              <input className="form-input" placeholder="e.g. Batch 154"
                value={newBatch.name} onChange={e=>setNewBatch(p=>({...p,name:e.target.value}))}/>
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-input" value={newBatch.category}
                onChange={e=>setNewBatch(p=>({...p,category:e.target.value}))}>
                <option>Public Bus — Pre Service</option>
                <option>Public Bus — In Service</option>
                <option>School Bus Training</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input className="form-input" type="date"
                value={newBatch.start} onChange={e=>setNewBatch(p=>({...p,start:e.target.value}))}/>
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input className="form-input" type="date"
                value={newBatch.end} onChange={e=>setNewBatch(p=>({...p,end:e.target.value}))}/>
            </div>
            <div className="form-group">
              <label className="form-label">Max Capacity</label>
              <input className="form-input" type="number"
                value={newBatch.capacity} onChange={e=>setNewBatch(p=>({...p,capacity:e.target.value}))}/>
            </div>
          </div>
          <div className="flex gap8">
            <button className="btn btn-primary btn-sm" onClick={handleAddBatch}>
              <Icon name="Check" size={12}/> Create Batch
            </button>
            <button className="btn btn-ghost btn-sm" onClick={()=>setShowNewBatch(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {batches.map(b => {
          const pct = Math.round((b.enrolled / b.capacity) * 100);
          const isActive = b.status === 'Active';
          return (
            <div key={b.id} style={cardStyle}>
              <div className="flex items-center justify-between mb12">
                <div className="flex items-center gap12">
                  <div style={{
                    width:40, height:40, borderRadius:10,
                    background: isActive ? 'var(--blue-dim)' : 'var(--bg3)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    border:`1px solid ${isActive ? 'rgba(29,111,242,0.2)' : 'var(--border)'}`,
                  }}>
                    <Icon name="Layers" size={16} color={isActive ? 'var(--blue)' : 'var(--text3)'}/>
                  </div>
                  <div>
                    <div style={{ fontFamily:'var(--font-head)', fontSize:14, fontWeight:800, color:'var(--text)' }}>
                      {b.name}
                    </div>
                    <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>{b.category}</div>
                  </div>
                </div>
                <div className="flex items-center gap8">
                  <span className={`badge ${isActive ? 'badge-green' : 'badge-gray'}`}>
                    <Icon name={isActive ? 'Zap' : 'Check'} size={10} strokeWidth={2.5}/>
                    {b.status}
                  </span>
                  <button className="btn btn-ghost btn-sm" onClick={()=>handleDeleteBatch(b.id)}>
                    <Icon name="X" size={11}/>
                  </button>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:12 }}>
                {[
                  { label:'Start',    val:b.start,        icon:'Calendar' },
                  { label:'End',      val:b.end,          icon:'Calendar' },
                  { label:'Enrolled', val:`${b.enrolled}/${b.capacity}`, icon:'Users' },
                  { label:'Fill Rate',val:`${pct}%`,      icon:'BarChart' },
                ].map(s => (
                  <div key={s.label} style={{
                    background:'var(--bg3)', borderRadius:'var(--r)',
                    padding:'8px 12px', border:'1px solid var(--border)',
                  }}>
                    <div style={{ fontSize:10, color:'var(--text3)', fontWeight:600, marginBottom:3 }}>
                      <Icon name={s.icon} size={9}/> {s.label}
                    </div>
                    <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', fontFamily:'var(--font-mono)' }}>
                      {s.val}
                    </div>
                  </div>
                ))}
              </div>
              <div className="prog-bar">
                <div className={`prog-fill ${pct >= 90 ? 'prog-red' : pct >= 70 ? 'prog-amber' : 'prog-blue'}`}
                  style={{ width:`${pct}%` }}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div style={cardStyle}>
      {sectionTitle('Integrations', 'Connect external services', 'Link')}
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {[
          { name:'RTA Database',    desc:'Roads & Transport Authority live data sync', status:'Connected',    color:'green', icon:'Database'  },
          { name:'SMS Gateway',     desc:'Twilio SMS for driver notifications',        status:'Disconnected', color:'red',   icon:'Send'      },
          { name:'Email Service',   desc:'SendGrid transactional email',               status:'Connected',    color:'green', icon:'Mail'      },
          { name:'Cloud Storage',   desc:'AWS S3 for video and document storage',      status:'Disconnected', color:'red',   icon:'Upload'    },
          { name:'Analytics',       desc:'Google Analytics platform tracking',         status:'Disconnected', color:'red',   icon:'BarChart'  },
        ].map(s => (
          <div key={s.name} style={{
            display:'flex', alignItems:'center', gap:14,
            padding:'14px 16px', background:'var(--bg3)',
            borderRadius:'var(--r2)', border:'1px solid var(--border)',
          }}>
            <div style={{
              width:40, height:40, borderRadius:10, flexShrink:0,
              background:`var(--${s.color}-dim)`,
              display:'flex', alignItems:'center', justifyContent:'center',
              border:`1px solid var(--${s.color})33`,
            }}>
              <Icon name={s.icon} size={16} color={`var(--${s.color})`}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{s.name}</div>
              <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>{s.desc}</div>
            </div>
            <span className={`badge badge-${s.color}`}>
              <Icon name={s.status==='Connected'?'Check':'X'} size={10} strokeWidth={2.5}/>
              {s.status}
            </span>
            <button className={`btn btn-sm ${s.status==='Connected'?'btn-ghost':'btn-primary'}`}>
              {s.status==='Connected' ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    if (tab === 'General')       return renderGeneral();
    if (tab === 'Security')      return renderSecurity();
    if (tab === 'Notifications') return renderNotifications();
    if (tab === 'Appearance')    return renderAppearance();
    if (tab === 'Batches')       return renderBatches();
    if (tab === 'Integrations')  return renderIntegrations();
  };

  return (
    <div className="fade-in">
      {/* Toast */}
      {toast && (
        <div style={{
          position:'fixed', top:20, right:20, zIndex:2000,
          background:'var(--green-dim)', border:'1px solid rgba(22,163,74,0.3)',
          borderRadius:'var(--r2)', padding:'12px 18px',
          display:'flex', alignItems:'center', gap:8,
          fontSize:13, color:'var(--green)', fontWeight:600,
          boxShadow:'var(--shadow-lg)', animation:'fadeSlide 0.2s ease',
        }}>
          <Icon name="Check" size={14} strokeWidth={2.5}/> {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb24">
        <div>
          <div style={{ fontFamily:'var(--font-head)', fontSize:15, fontWeight:800, color:'var(--text)' }}>
            System Settings
          </div>
          <div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>
            Configure platform behaviour, security and integrations
          </div>
        </div>
        <span className="badge badge-green">
          <Icon name="Zap" size={10} strokeWidth={2.5}/> Platform Online
        </span>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom:24 }}>
        {TABS.map(t => (
          <button key={t}
            className={`tab ${tab===t?'active':''}`}
            onClick={()=>setTab(t)}
            style={{ border:'none', background:'none', cursor:'pointer', fontFamily:'var(--font-body)' }}
          >{t}</button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
}