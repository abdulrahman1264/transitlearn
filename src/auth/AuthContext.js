import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const USERS = {
  admin: [
    { email:'Admin',   password:'admin123',   name:'Admin User',   avatar:'AU', role:'Platform Administrator' },
  ],
  trainer: [
    { email:'Trainer', password:'trainer123', name:'Elena Marsh',  avatar:'EM', role:'Senior Trainer'         },
  ],
  driver: [
    {
      email:    'Driver',
      password: 'driver123',
      name:     'Marcus Okafor',
      avatar:   'MO',
      role:     'Bus Driver — Central',
      emp:      'D-10421',
      category: 'Public Bus — Pre Service',
      categoryId:'pre-service',
      batch:    'Batch 153',
      depot:    'Central',
    },
  ],
};

export function AuthProvider({ children }) {
  const [user,   setUser]   = useState(null);
  const [portal, setPortal] = useState(null);

  const login = (portalId, email, password) => {
    const list  = USERS[portalId] || [];
    const found = list.find(u => u.email === email && u.password === password);
    if (found) {
      setUser({ ...found, portal: portalId });
      setPortal(portalId);
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  };

  const logout = () => { setUser(null); setPortal(null); };

  return (
    <AuthContext.Provider value={{ user, portal, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }