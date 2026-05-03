import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const USERS = {
  admin: [
    { email:'Admin', password:'admin123', name:'Admin User', avatar:'AU', role:'Platform Administrator', emp:'ADMIN-001' },
  ],
  trainer: [
    { email:'Trainer', password:'trainer123', name:'Elena Marsh', avatar:'EM', role:'Senior Trainer', emp:'TR-001', categoryId:'pre-service', category:'Public Bus — Pre Service', batch:'Batch 153' },
  ],
  driver: [
    { email:'Driver', password:'driver123', name:'Marcus Okafor', avatar:'MO', role:'Bus Driver — Central', emp:'D-10421', categoryId:'pre-service', category:'Public Bus — Pre Service', batch:'Batch 153' },
  ],
};

export const BATCH_CODES = {
  'BATCH-153': { batch:'Batch 153', category:'Public Bus — Pre Service', categoryId:'pre-service', trainer:'Elena Marsh', depot:'Central' },
  'BATCH-154': { batch:'Batch 154', category:'Public Bus — In Service',  categoryId:'in-service',  trainer:'Tom Alvarez', depot:'North'   },
  'BATCH-155': { batch:'Batch 155', category:'School Bus Training',       categoryId:'school-bus',  trainer:'Elena Marsh', depot:'South'   },
};

const INITIAL_REGISTRATIONS = [
  { id:'r1', name:'Ahmed Al Mansouri', username:'ahmed.mansouri', avatar:'AM', role:'Bus Driver', category:'Public Bus — Pre Service', categoryId:'pre-service', batch:'Batch 153', batchCode:'BATCH-153', depot:'Central', trainer:'Elena Marsh', joinDate:'2026-04-20', phone:'971501234567', nationality:'UAE' },
  { id:'r2', name:'Priya Sundaram',    username:'priya.s',        avatar:'PS', role:'Bus Driver', category:'Public Bus — In Service',  categoryId:'in-service',  batch:'Batch 154', batchCode:'BATCH-154', depot:'North',   trainer:'Tom Alvarez',  joinDate:'2026-04-21', phone:'971509876543', nationality:'India' },
];

function loadFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch { return fallback; }
}

function saveToStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export function AuthProvider({ children }) {
  const [user,          setUser]          = useState(null);
  const [portal,        setPortal]        = useState(null);
  const [drivers,       setDrivers]       = useState(() => loadFromStorage('tl_drivers', USERS.driver));
  const [registrations, setRegistrations] = useState(() => loadFromStorage('tl_registrations', INITIAL_REGISTRATIONS));

  const login = (portalId, email, password) => {
    const list = portalId === 'driver' ? drivers : (USERS[portalId] || []);
    const found = list.find(u =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (found) {
      setUser({ ...found, portal: portalId });
      setPortal(portalId);
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  };

  const register = (batchCode, details) => {
    const batch = BATCH_CODES[batchCode.toUpperCase()];
    if (!batch) return { success:false, error:'Invalid batch code. Please check with your trainer.' };

    const existing = drivers.find(d => d.email.toLowerCase() === details.username.toLowerCase());
    if (existing) return { success:false, error:'Username already taken. Please choose another.' };

    const newDriver = {
      email:      details.username,
      password:   details.password,
      name:       details.name,
      avatar:     details.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase(),
      role:       `Bus Driver — ${batch.depot}`,
      emp:        `D-${Date.now().toString().slice(-5)}`,
      categoryId: batch.categoryId,
      category:   batch.category,
      batch:      batch.batch,
      depot:      batch.depot,
      trainer:    batch.trainer,
      portal:     'driver',
    };

    const newReg = {
      id:          'r' + Date.now(),
      name:        details.name,
      username:    details.username,
      avatar:      newDriver.avatar,
      role:        'Bus Driver',
      category:    batch.category,
      categoryId:  batch.categoryId,
      batch:       batch.batch,
      batchCode:   batchCode.toUpperCase(),
      depot:       batch.depot,
      trainer:     batch.trainer,
      joinDate:    new Date().toISOString().slice(0,10),
      phone:       details.phone || '',
      nationality: details.nationality || '',
    };

    const updatedDrivers = [...drivers, newDriver];
    const updatedRegs    = [...registrations, newReg];

    setDrivers(updatedDrivers);
    setRegistrations(updatedRegs);
    saveToStorage('tl_drivers', updatedDrivers);
    saveToStorage('tl_registrations', updatedRegs);

    setUser(newDriver);
    setPortal('driver');
    return { success:true, driver:newDriver, batch };
  };

  const logout = () => { setUser(null); setPortal(null); };

  // These are kept for compatibility but not needed since auto-enrolled
  const approveDriver = (id) => {
    const updated = registrations.map(r => r.id===id ? { ...r, status:'approved' } : r);
    setRegistrations(updated);
    saveToStorage('tl_registrations', updated);
  };

  const rejectDriver = (id) => {
    const updated = registrations.map(r => r.id===id ? { ...r, status:'rejected' } : r);
    setRegistrations(updated);
    saveToStorage('tl_registrations', updated);
  };

  return (
    <AuthContext.Provider value={{ user, portal, login, logout, register, drivers, registrations, approveDriver, rejectDriver, BATCH_CODES }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }