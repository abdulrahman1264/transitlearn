import React from 'react';
import Icon from './Icons';

const MAP = {
  'Completed':        { cls:'badge-green',  icon:'Check',   label:'Completed'        },
  'Published':        { cls:'badge-blue',   icon:'Zap',     label:'Published'        },
  'Draft':            { cls:'badge-gray',   icon:'Edit',    label:'Draft'            },
  'In-Service':       { cls:'badge-blue',   icon:'Bus',     label:'In-Service'       },
  'Pre-Service':      { cls:'badge-teal',   icon:'Star',    label:'Pre-Service'      },
  'Both':             { cls:'badge-purple', icon:'Layers',  label:'Both'             },
  'OK':               { cls:'badge-green',  icon:'Check',   label:'OK'               },
  'At Risk':          { cls:'badge-amber',  icon:'Alert',   label:'At Risk'          },
  'Overdue':          { cls:'badge-red',    icon:'Clock',   label:'Overdue'          },
  'Pending Sign-off': { cls:'badge-amber',  icon:'Clock',   label:'Pending Sign-off' },
  'Active':           { cls:'badge-green',  icon:'Zap',     label:'Active'           },
  'Revoked':          { cls:'badge-red',    icon:'X',       label:'Revoked'          },
};

export default function StatusBadge({ status }) {
  const cfg = MAP[status] || { cls:'badge-gray', icon:'Info', label: status };
  return (
    <span className={`badge ${cfg.cls}`}>
      <Icon name={cfg.icon} size={10} strokeWidth={2.5} />
      {cfg.label}
    </span>
  );
}