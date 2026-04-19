import React from 'react';
import { TOPBAR_TITLES, PORTALS } from '../data/mockData';
import Icon from './Icons';

export default function Topbar({ portal, view }) {
  const p = PORTALS.find(x => x.id === portal);
  const title = TOPBAR_TITLES[view] || view;

  return (
    <header className="topbar">
      <div className="tb-title">{title}</div>
      <span className={`tb-badge ${p?.badgeCls || 'blue'}`}>{p?.badge}</span>

      <div className="tb-search">
        <Icon name="Search" size={13} color="var(--text3)" />
        <input placeholder="Search..." />
      </div>

      <button className="tb-icon-btn" title="Notifications">
        <Icon name="Bell" size={15} />
      </button>

      <button className="tb-icon-btn" title="Help">
        <Icon name="Info" size={15} />
      </button>

      <div className={`tb-avatar ${p?.color === 'amber' ? 'amber' : ''}`}>
        {p?.avatar}
      </div>
    </header>
  );
}