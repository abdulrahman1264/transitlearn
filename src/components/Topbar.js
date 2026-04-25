import React from 'react';
import { TOPBAR_TITLES } from '../data/mockData';
import Icon from './Icons';

const PORTAL_COLOR = {
  admin:'blue', trainer:'teal', driver:'amber',
};
const PORTAL_LABEL = {
  admin:'ADMIN PORTAL', trainer:'TRAINER PORTAL', driver:'DRIVER PORTAL',
};

export default function Topbar({ portal, view, user, onLogout }) {
  const title = TOPBAR_TITLES[view] || view;
  const color = PORTAL_COLOR[portal] || 'blue';

  return (
    <header className="topbar">
      <div className="tb-title">{title}</div>

      <span className={`tb-badge ${color}`}>
        {PORTAL_LABEL[portal]}
      </span>

      <div className="tb-search">
        <Icon name="Search" size={13} color="var(--text4)"/>
        <input placeholder="Search..."/>
      </div>

      <button className="tb-icon-btn" title="Notifications">
        <Icon name="Bell" size={15}/>
      </button>

      <button className="tb-icon-btn" title="Help">
        <Icon name="Info" size={15}/>
      </button>

      <div className={`tb-avatar ${color}`} title={user?.name}>
        {user?.avatar || 'U'}
      </div>
    </header>
  );
}