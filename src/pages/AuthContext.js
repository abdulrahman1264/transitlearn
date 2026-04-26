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

export function AuthProvider({ children }) {
  const [user,      setUser]      = useState(null);
  const [portal,    setPortal]    = useState(null);
  const [drivers,   setDrivers]   = useState(USERS.driver);

  const login = (portalId, email, password) => {
    const list  = portalId === 'driver'
      ? drivers
      : (USERS[portalId] || []);
    const found = list.find(u =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
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

    setDrivers(prev => [...prev, newDriver]);
    setUser(newDriver);
    setPortal('driver');
    return { success:true, driver:newDriver };
  };

  const logout = () => { setUser(null); setPortal(null); };

  return (
    <AuthContext.Provider value={{ user, portal, login, logout, register, drivers, BATCH_CODES }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }