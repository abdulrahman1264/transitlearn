import React, { useState } from 'react';
import { SYSTEM_USERS, DRIVERS, BATCHES } from '../data/mockData';
import Icon from '../components/Icons';
import StatusBadge from '../components/StatusBadge';

const ROLE_CONFIG = {
  admin:   { color:'var(--blue)',  dim:'var(--blue-dim)',  label:'Admin',   icon:'Settings'      },
  trainer: { color:'var(--teal)',  dim:'var(--teal-dim)',  label:'Trainer', icon:'GraduationCap' },
  driver:  { color:'var(--amber)', dim:'var(--amber-dim)', label:'Driver',  icon:'Bus'           },
};

const TABS = ['All Users','Admins','Trainers','Drivers'];

// ── Create User Modal ─────────────────────────────────────────────
function CreateUserModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name:'', username:'', email:'', role:'driver',
    password:'', batch:'', status:'Active',
  });
  const [err, setErr] = useState('');

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = () => {
    if (!form.name || !form.username || !form.email || !form.password) {
      setErr('Please fill in all required fields'); return;
    }
    onSave({ ...form, id: Date.now(), avatar: form.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase(), color: form.role === 'admin' ? 'blue' : form.role === 'trainer' ? 'teal' : 'amber', assignedDrivers:[], joined: new Date().toISOString().slice(0,10) });
    onClose();
  };

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.4)',
      display:'flex', alignItems:'center', justifyContent:'center',
      zIndex:1000, backdropFilter:'blur(4px)',
    }}>
      <div style={{
        background:'var(--bg2)', border:'1px solid var(--border)',
        borderRadius:'var(--r3)', padding:28, width:520,
        boxShadow:'var(--shadow-lg)', animation:'fadeSlide 0.2s ease',
      }}>
        {/* Header */}
        <div className="flex items-center justify-between mb24">
          <div>
            <div style={{ fontFamily:'var(--font-head)', fontSize:17, fontWeight:800, color:'var(--text)' }}>
              Create New User
            </div>
            <div style={{ fontSize:12, color:'var(--text3)', marginTop:3 }}>
              Add a new admin, trainer or driver account
            </div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text3)', display:'flex' }}>
            <Icon name="X" size={18}/>
          </button>
        </div>

        {err && (
          <div className="auth-error" style={{ marginBottom:16 }}>
            <Icon name="Alert" size={13} color="var(--red)"/> {err}
          </div>
        )}

        {/* Role selector */}
        <div className="form-group">
          <label className="form-label">Role *</label>
          <div style={{ display:'flex', gap:8 }}>
            {['admin','trainer','driver'].map(r => {
              const cfg = ROLE_CONFIG[r];
              return (
                <button key={r} onClick={()=>set('role',r)} style={{
                  flex:1, padding:'10px 8px', borderRadius:'var(--r2)',
                  border:`1.5px solid ${form.role===r ? cfg.color : 'var(--border2)'}`,
                  background: form.role===r ? cfg.dim : 'var(--bg3)',
                  cursor:'pointer', transition:'all 0.15s',
                  display:'flex', flexDirection:'column', alignItems:'center', gap:6,
                }}>
                  <Icon name={cfg.icon} size={16} color={form.role===r ? cfg.color : 'var(--text3)'}/>
                  <span style={{ fontSize:12, fontWeight:700, color: form.role===r ? cfg.color : 'var(--text3)' }}>
                    {cfg.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form fields */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input className="form-input" placeholder="e.g. John Smith"
              value={form.name} onChange={e=>set('name',e.target.value)}/>
          </div>
          <div className="form-group">
            <label className="form-label">Username *</label>
            <input className="form-input" placeholder="e.g. john123"
              value={form.username} onChange={e=>set('username',e.target.value)}/>
          </div>
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input className="form-input" type="email" placeholder="john@transitlearn.com"
              value={form.email} onChange={e=>set('email',e.target.value)}/>
          </div>
          <div className="form-group">
            <label className="form-label">Password *</label>
            <input className="form-input" type="password" placeholder="Min 6 characters"
              value={form.password} onChange={e=>set('password',e.target.value)}/>
          </div>
          {(form.role === 'driver' || form.role === 'trainer') && (
            <div className="form-group">
              <label className="form-label">Training Batch</label>
              <select className="form-input" value={form.batch} onChange={e=>set('batch',e.target.value)}>
                <option value="">Select batch...</option>
                {BATCHES.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
              </select>
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-input" value={form.status} onChange={e=>set('status',e.target.value)}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between" style={{ marginTop:8 }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>
            <Icon name="Check" size={14}/> Create User
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Assign Modal ─────────────────────────────────────────────────
function AssignModal({ user, allUsers, onClose, onSave }) {
  const trainers = allUsers.filter(u => u.role === 'trainer');
  const drivers  = allUsers.filter(u => u.role === 'driver');

  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [selectedBatch,   setSelectedBatch]   = useState(user.batch || '');

  const toggleDriver = (id) => {
    setSelectedDrivers(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.4)',
      display:'flex', alignItems:'center', justifyContent:'center',
      zIndex:1000, backdropFilter:'blur(4px)',
    }}>
      <div style={{
        background:'var(--bg2)', border:'1px solid var(--border)',
        borderRadius:'var(--r3)', padding:28, width:560,
        boxShadow:'var(--shadow-lg)', maxHeight:'80vh', overflowY:'auto',
      }}>
        <div className="flex items-center justify-between mb24">
          <div>
            <div style={{ fontFamily:'var(--font-head)', fontSize:17, fontWeight:800, color:'var(--text)' }}>
              Assignments — {user.name}
            </div>
            <div style={{ fontSize:12, color:'var(--text3)', marginTop:3 }}>
              Manage trainer and batch assignments
            </div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text3)', display:'flex' }}>
            <Icon name="X" size={18}/>
          </button>
        </div>

        {/* Batch Assignment */}
        <div className="form-group">
          <label className="form-label">
            <Icon name="Layers" size={11}/> Training Batch
          </label>
          <select className="form-input" value={selectedBatch} onChange={e=>setSelectedBatch(e.target.value)}>
            <option value="">No batch assigned</option>
            {BATCHES.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
          </select>
        </div>

        {/* Assign to Trainer (for drivers) */}
        {user.role === 'driver' && (
          <div className="form-group">
            <label className="form-label">
              <Icon name="GraduationCap" size={11}/> Assign to Trainer
            </label>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {trainers.map(t => (
                <label key={t.id} style={{
                  display:'flex', alignItems:'center', gap:10,
                  padding:'10px 12px', borderRadius:'var(--r2)',
                  border:`1.5px solid ${selectedTrainer===t.id ? 'var(--teal)' : 'var(--border)'}`,
                  background: selectedTrainer===t.id ? 'var(--teal-dim)' : 'var(--bg3)',
                  cursor:'pointer', transition:'all 0.15s',
                }}>
                  <input type="radio" name="trainer" style={{ display:'none' }}
                    checked={selectedTrainer===t.id}
                    onChange={()=>setSelectedTrainer(t.id)}/>
                  <div style={{
                    width:32, height:32, borderRadius:9,
                    background:'var(--teal-dim)', color:'var(--teal)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:10, fontWeight:700, fontFamily:'var(--font-mono)',
                    border:'1px solid rgba(13,148,136,0.2)', flexShrink:0,
                  }}>{t.avatar}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{t.name}</div>
                    <div style={{ fontSize:11, color:'var(--text3)' }}>{t.batch || 'No batch'}</div>
                  </div>
                  {selectedTrainer===t.id && (
                    <Icon name="Check" size={14} color="var(--teal)" strokeWidth={2.5}/>
                  )}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Assign Drivers (for trainers) */}
        {user.role === 'trainer' && (
          <div className="form-group">
            <label className="form-label">
              <Icon name="Users" size={11}/> Assign Drivers ({selectedDrivers.length} selected)
            </label>
            <div style={{ maxHeight:240, overflowY:'auto', display:'flex', flexDirection:'column', gap:5 }}>
              {drivers.map(d => (
                <label key={d.id} style={{
                  display:'flex', alignItems:'center', gap:10,
                  padding:'9px 12px', borderRadius:'var(--r)',
                  border:`1.5px solid ${selectedDrivers.includes(d.id) ? 'var(--blue)' : 'var(--border)'}`,
                  background: selectedDrivers.includes(d.id) ? 'var(--blue-dim)' : 'var(--bg3)',
                  cursor:'pointer', transition:'all 0.15s',
                }}>
                  <input type="checkbox" style={{ display:'none' }}
                    checked={selectedDrivers.includes(d.id)}
                    onChange={()=>toggleDriver(d.id)}/>
                  <div style={{
                    width:28, height:28, borderRadius:8,
                    background:'var(--amber-dim)', color:'var(--amber)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:9, fontWeight:700, fontFamily:'var(--font-mono)',
                    border:'1px solid rgba(245,158,11,0.2)', flexShrink:0,
                  }}>{d.avatar}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12.5, fontWeight:600, color:'var(--text)' }}>{d.name}</div>
                    <div style={{ fontSize:11, color:'var(--text3)', fontFamily:'var(--font-mono)' }}>{d.username}</div>
                  </div>
                  <div style={{
                    width:18, height:18, borderRadius:4, flexShrink:0,
                    border:`2px solid ${selectedDrivers.includes(d.id) ? 'var(--blue)' : 'var(--border2)'}`,
                    background: selectedDrivers.includes(d.id) ? 'var(--blue)' : 'transparent',
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    {selectedDrivers.includes(d.id) && <Icon name="Check" size={10} color="#fff" strokeWidth={3}/>}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between" style={{ marginTop:16 }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => {
            onSave(user.id, { batch: selectedBatch, assignedDrivers: selectedDrivers, assignedTrainer: selectedTrainer });
            onClose();
          }}>
            <Icon name="Check" size={14}/> Save Assignments
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function UserMgmtPage() {
  const [users,      setUsers]      = useState(SYSTEM_USERS);
  const [tab,        setTab]        = useState('All Users');
  const [search,     setSearch]     = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [assignUser, setAssignUser] = useState(null);
  const [toast,      setToast]      = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(''), 3000); };

  const filtered = users.filter(u => {
    const matchTab =
      tab === 'All Users' ? true :
      tab === 'Admins'    ? u.role === 'admin'   :
      tab === 'Trainers'  ? u.role === 'trainer' :
      tab === 'Drivers'   ? u.role === 'driver'  : true;
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleCreate = (newUser) => {
    setUsers(prev => [...prev, newUser]);
    showToast(`✅ User "${newUser.name}" created successfully`);
  };

  const handleToggleStatus = (id) => {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
    ));
    showToast('✅ User status updated');
  };

  const handleDelete = (id) => {
    const u = users.find(x => x.id === id);
    if (window.confirm(`Delete user "${u.name}"?`)) {
      setUsers(prev => prev.filter(x => x.id !== id));
      showToast(`✅ User "${u.name}" deleted`);
    }
  };

  const handleAssignSave = (userId, data) => {
    setUsers(prev => prev.map(u =>
      u.id === userId ? { ...u, ...data } : u
    ));
    showToast('✅ Assignments saved successfully');
  };

  // Summary counts
  const counts = {
    total:    users.length,
    admins:   users.filter(u=>u.role==='admin').length,
    trainers: users.filter(u=>u.role==='trainer').length,
    drivers:  users.filter(u=>u.role==='driver').length,
    active:   users.filter(u=>u.status==='Active').length,
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

      {/* Modals */}
      {showCreate && <CreateUserModal onClose={()=>setShowCreate(false)} onSave={handleCreate}/>}
      {assignUser && <AssignModal user={assignUser} allUsers={users} onClose={()=>setAssignUser(null)} onSave={handleAssignSave}/>}

      {/* Header */}
      <div className="flex items-center justify-between mb24">
        <div>
          <div style={{ fontFamily:'var(--font-head)', fontSize:15, fontWeight:800, color:'var(--text)' }}>
            User Management
          </div>
          <div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>
            Manage accounts, roles, assignments and access control
          </div>
        </div>
        <button className="btn btn-primary" onClick={()=>setShowCreate(true)}>
          <Icon name="Plus" size={14}/> Create User
        </button>
      </div>

      {/* Summary tiles */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12, marginBottom:24 }}>
        {[
          { label:'Total Users',  val:counts.total,    color:'blue',  icon:'Users'        },
          { label:'Admins',       val:counts.admins,   color:'blue',  icon:'Settings'     },
          { label:'Trainers',     val:counts.trainers, color:'teal',  icon:'GraduationCap'},
          { label:'Drivers',      val:counts.drivers,  color:'amber', icon:'Bus'          },
          { label:'Active',       val:counts.active,   color:'green', icon:'Zap'          },
        ].map(t => (
          <div key={t.label} style={{
            background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'var(--r2)', padding:'14px 16px',
            display:'flex', alignItems:'center', gap:12,
            boxShadow:'var(--shadow-sm)',
          }}>
            <div style={{
              width:36, height:36, borderRadius:10,
              background:`var(--${t.color}-dim)`,
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <Icon name={t.icon} size={16} color={`var(--${t.color})`}/>
            </div>
            <div>
              <div style={{ fontSize:22, fontFamily:'var(--font-head)', fontWeight:800, color:'var(--text)', lineHeight:1 }}>{t.val}</div>
              <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600, marginTop:2 }}>{t.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs + Search */}
      <div className="flex items-center justify-between mb16">
        <div className="tabs" style={{ marginBottom:0, borderBottom:'none' }}>
          {TABS.map(t => (
            <button key={t}
              className={`tab ${tab===t?'active':''}`}
              onClick={()=>setTab(t)}
              style={{ border:'none', background:'none', cursor:'pointer' }}
            >{t}</button>
          ))}
        </div>
        <div className="tb-search">
          <Icon name="Search" size={13} color="var(--text3)"/>
          <input placeholder="Search users..."
            value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
      </div>

      {/* Users Table */}
      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Batch</th>
              <th>Assigned</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9}>
                <div className="empty-state">
                  <div className="empty-icon">👤</div>
                  <div>No users found</div>
                </div>
              </td></tr>
            ) : filtered.map(u => {
              const cfg = ROLE_CONFIG[u.role];
              return (
                <tr key={u.id}>
                  <td>
                    <div className="flex items-center gap8">
                      <div style={{
                        width:34, height:34, borderRadius:10, flexShrink:0,
                        background:`var(--${u.color}-dim)`,
                        color:`var(--${u.color})`,
                        border:`1.5px solid var(--${u.color})33`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:10, fontWeight:700, fontFamily:'var(--font-mono)',
                      }}>{u.avatar}</div>
                      <div>
                        <div style={{ fontWeight:700, fontSize:13, color:'var(--text)' }}>{u.name}</div>
                        <div style={{ fontSize:11, color:'var(--text3)' }}>ID #{u.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text2)' }}>
                      {u.username}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap4">
                      <Icon name="Mail" size={11} color="var(--text3)"/>
                      <span style={{ fontSize:12, color:'var(--text2)' }}>{u.email}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{
                      display:'inline-flex', alignItems:'center', gap:5,
                      padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:700,
                      background:cfg.dim, color:cfg.color,
                      border:`1px solid ${cfg.color}22`,
                    }}>
                      <Icon name={cfg.icon} size={10} strokeWidth={2.5}/>
                      {cfg.label}
                    </span>
                  </td>
                  <td>
                    {u.batch
                      ? <span className="chip"><Icon name="Layers" size={10}/> {u.batch}</span>
                      : <span style={{ color:'var(--text3)', fontSize:12 }}>—</span>
                    }
                  </td>
                  <td>
                    {u.role === 'trainer' && u.assignedDrivers?.length > 0
                      ? <span className="badge badge-blue">
                          <Icon name="Users" size={10}/> {u.assignedDrivers.length} drivers
                        </span>
                      : u.role === 'driver' && u.assignedTrainer
                      ? <span className="badge badge-teal">
                          <Icon name="GraduationCap" size={10}/> Assigned
                        </span>
                      : <span style={{ color:'var(--text3)', fontSize:12 }}>—</span>
                    }
                  </td>
                  <td>
                    <span className={`badge ${u.status==='Active' ? 'badge-green' : 'badge-gray'}`}>
                      <Icon name={u.status==='Active' ? 'Zap' : 'X'} size={10} strokeWidth={2.5}/>
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize:12, color:'var(--text3)', fontFamily:'var(--font-mono)' }}>
                      {u.joined}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap4">
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={()=>setAssignUser(u)}
                        title="Manage assignments"
                      >
                        <Icon name="ClipBoard" size={12}/> Assign
                      </button>
                      <button
                        className="btn btn-sm"
                        onClick={()=>handleToggleStatus(u.id)}
                        style={{
                          background: u.status==='Active' ? 'var(--red-dim)' : 'var(--green-dim)',
                          color:      u.status==='Active' ? 'var(--red)'     : 'var(--green)',
                          border:     u.status==='Active' ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(22,163,74,0.2)',
                        }}
                        title={u.status==='Active' ? 'Deactivate' : 'Activate'}
                      >
                        <Icon name={u.status==='Active' ? 'X' : 'Check'} size={12}/>
                      </button>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={()=>handleDelete(u.id)}
                        title="Delete user"
                        style={{ color:'var(--red)' }}
                      >
                        <Icon name="X" size={12}/>
                      </button>
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