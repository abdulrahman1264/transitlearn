import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const USERS = {
  admin: [
    { username:'Admin', password:'admin123', name:'Admin User', avatar:'AU', role:'Platform Administrator' },
  ],
  trainer: [
    { username:'Trainer', password:'trainer123', name:'Elena Marsh', avatar:'EM', role:'Senior Trainer' },
    { username:'Tom',     password:'trainer123', name:'Tom Alvarez', avatar:'TA', role:'BTW Trainer' },
  ],
  driver: [
    { username:'Driver', password:'driver123', name:'Marcus Okafor', avatar:'MO', role:'Bus Driver — Central', category:'public-pre', batch:'Batch 153' },
  ],
};

export const BATCH_CODES = {
  'BATCH-153': { category:'public-pre',  label:'Public Bus — Pre Service', trainer:'Elena Marsh', depot:'Central Depot',  batch:'Batch 153' },
  'BATCH-154': { category:'public-in',   label:'Public Bus — In Service',  trainer:'Tom Alvarez', depot:'North Terminal', batch:'Batch 154' },
  'BATCH-155': { category:'school-bus',  label:'School Bus Training',      trainer:'Elena Marsh', depot:'South Hub',      batch:'Batch 155' },
};

const INITIAL_REGISTRATIONS = [
  { id:'r1', name:'Ahmed Al Mansouri', username:'ahmed.mansouri', password:'driver123', avatar:'AM', role:'Bus Driver', category:'public-pre', batch:'Batch 153', batchCode:'BATCH-153', depot:'Central Depot', trainer:'Elena Marsh', joinDate:'2026-04-20', status:'pending', phone:'971501234567', nationality:'UAE' },
  { id:'r2', name:'Priya Sundaram',    username:'priya.s',        password:'driver123', avatar:'PS', role:'Bus Driver', category:'public-in',  batch:'Batch 154', batchCode:'BATCH-154', depot:'North Terminal', trainer:'Tom Alvarez',  joinDate:'2026-04-21', status:'pending', phone:'971509876543', nationality:'India' },
  { id:'r3', name:'James Whitfield',   username:'james.w',        password:'driver123', avatar:'JW', role:'Bus Driver', category:'school-bus', batch:'Batch 155', batchCode:'BATCH-155', depot:'South Hub',      trainer:'Elena Marsh', joinDate:'2026-04-22', status:'approved', phone:'971551234567', nationality:'UK' },
];

export function AuthProvider({ children }) {
  const [user,          setUser]          = useState(null);
  const [portal,        setPortal]        = useState(null);
  const [registrations, setRegistrations] = useState(INITIAL_REGISTRATIONS);
  const [drivers,       setDrivers]       = useState(USERS.driver);

  const login = (portalId, username, password) => {
    const list = USERS[portalId] || [];
    const found = list.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
    if (found) {
      setUser({ ...found, portal: portalId });
      setPortal(portalId);
      return { success: true };
    }
    // Also check approved registered drivers
    if (portalId === 'driver') {
      const reg = registrations.find(r => r.username.toLowerCase() === username.toLowerCase() && r.password === password && r.status === 'approved');
      if (reg) {
        setUser({ ...reg, portal: 'driver' });
        setPortal('driver');
        return { success: true };
      }
    }
    return { success: false, error: 'Invalid username or password' };
  };

  const register = (batchCode, details) => {
    const batch = BATCH_CODES[batchCode.toUpperCase()];
    if (!batch) return { success: false, error: 'Invalid batch code. Please check with your supervisor.' };
    const newReg = {
      id: 'r' + Date.now(),
      ...details,
      avatar: details.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase(),
      role: 'Bus Driver',
      category: batch.category,
      batch: batch.batch,
      batchCode: batchCode.toUpperCase(),
      depot: batch.depot,
      trainer: batch.trainer,
      joinDate: new Date().toISOString().slice(0,10),
      status: 'pending',
    };
    setRegistrations(prev => [...prev, newReg]);
    return { success: true, batch };
  };

  const approveDriver = (id) => {
    setRegistrations(prev => prev.map(r => r.id===id ? { ...r, status:'approved' } : r));
  };

  const rejectDriver = (id) => {
    setRegistrations(prev => prev.map(r => r.id===id ? { ...r, status:'rejected' } : r));
  };

  const logout = () => { setUser(null); setPortal(null); };

  return (
    <AuthContext.Provider value={{ user, portal, login, logout, register, registrations, approveDriver, rejectDriver, drivers }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }