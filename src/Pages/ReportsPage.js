import React from 'react';
import Icon from '../components/Icons';

const REPORTS = [
  {
    id:1, icon:'Users', color:'blue',
    title:'Driver Compliance Report',
    desc:'Full compliance status for all drivers including license validity, training completion, and certification dates.',
    tags:['Compliance','Drivers','Monthly'],
  },
  {
    id:2, icon:'Book', color:'teal',
    title:'Training Completion Summary',
    desc:'Course-by-course breakdown of completion rates, average scores, and time-to-complete across all depots.',
    tags:['Training','Courses','Quarterly'],
  },
  {
    id:3, icon:'Car', color:'amber',
    title:'BTW Session Log',
    desc:'Behind-the-wheel session records including trainer assessments, skill scores, and route performance data.',
    tags:['BTW','Assessment','Monthly'],
  },
  {
    id:4, icon:'BarChart', color:'green',
    title:'Depot Performance Overview',
    desc:'Depot-by-depot comparison of training completion rates, overdue counts, and compliance percentages.',
    tags:['Depots','Performance','Weekly'],
  },
  {
    id:5, icon:'Shield', color:'purple',
    title:'DRM License Audit',
    desc:'Content access and DRM license usage report. Includes issued, active, and expired license counts per course.',
    tags:['DRM','Security','On-demand'],
  },
  {
    id:6, icon:'Audit', color:'red',
    title:'System Audit Export',
    desc:'Full exportable audit trail of all platform actions including user logins, content changes, and assignments.',
    tags:['Audit','Security','On-demand'],
  },
];

const COLOR_MAP = {
  blue:   { accent:'var(--blue)',   dim:'var(--blue-dim)'   },
  teal:   { accent:'var(--teal)',   dim:'var(--teal-dim)'   },
  amber:  { accent:'var(--amber)',  dim:'var(--amber-dim)'  },
  green:  { accent:'var(--green)',  dim:'var(--green-dim)'  },
  purple: { accent:'var(--purple)', dim:'var(--purple-dim)' },
  red:    { accent:'var(--red)',    dim:'var(--red-dim)'    },
};

export default function ReportsPage() {
  return (
    <div className="fade-in">

      {/* Header */}
      <div className="flex items-center justify-between mb24">
        <div>
          <div style={{ fontFamily:'var(--font-head)', fontSize:15, fontWeight:800, color:'var(--text)' }}>
            {REPORTS.length} report templates
          </div>
          <div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>
            Generate and export platform reports
          </div>
        </div>
        <div className="flex items-center gap8">
          <button className="btn btn-ghost btn-sm">
            <Icon name="Calendar" size={12}/> Schedule Reports
          </button>
          <button className="btn btn-primary btn-sm">
            <Icon name="Plus" size={12}/> Custom Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {[
          { label:'Reports Generated',  val:'142', color:'blue',  icon:'FileText' },
          { label:'This Month',         val:'28',  color:'teal',  icon:'BarChart' },
          { label:'Scheduled',          val:'4',   color:'amber', icon:'Calendar' },
          { label:'Last Export',        val:'2h',  color:'green', icon:'Download' },
        ].map(t => (
          <div key={t.label} style={{
            background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'var(--r2)', padding:'14px 16px',
            display:'flex', alignItems:'center', gap:12,
            boxShadow:'var(--shadow-sm)'
          }}>
            <div style={{
              width:36, height:36, borderRadius:10,
              background:`var(--${t.color}-dim)`,
              display:'flex', alignItems:'center', justifyContent:'center'
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

      {/* Report cards grid */}
      <div className="g2" style={{ gap:16 }}>
        {REPORTS.map(r => {
          const c = COLOR_MAP[r.color];
          return (
            <div key={r.id} className="card" style={{
              borderLeft:`3px solid ${c.accent}`,
              transition:'all 0.18s ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.transform = '';
              }}
            >
              <div className="flex items-center gap12 mb14">
                <div style={{
                  width:42, height:42, borderRadius:12,
                  background: c.dim,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flexShrink:0,
                  border:`1.5px solid ${c.accent}22`
                }}>
                  <Icon name={r.icon} size={19} color={c.accent}/>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'var(--font-head)', fontSize:14, fontWeight:800, color:'var(--text)', lineHeight:1.2 }}>
                    {r.title}
                  </div>
                </div>
              </div>

              <div style={{ fontSize:12.5, color:'var(--text2)', lineHeight:1.6, marginBottom:14 }}>
                {r.desc}
              </div>

              {/* Tags */}
              <div className="flex items-center gap6 mb16" style={{ flexWrap:'wrap' }}>
                {r.tags.map(t => (
                  <span key={t} className="chip" style={{ fontSize:10 }}>
                    <Icon name="Filter" size={9}/> {t}
                  </span>
                ))}
              </div>

              <hr className="separator" style={{ margin:'0 0 14px' }}/>

              {/* Actions */}
              <div className="flex items-center gap8">
                <button className="btn btn-primary btn-sm" style={{ flex:1 }}>
                  <Icon name="FileText" size={12}/> Generate PDF
                </button>
                <button className="btn btn-ghost btn-sm" style={{ flex:1 }}>
                  <Icon name="Download" size={12}/> Export CSV
                </button>
                <button className="btn btn-ghost btn-sm">
                  <Icon name="Calendar" size={12}/>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}