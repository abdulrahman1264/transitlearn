import React from 'react';
import { DRIVERS } from '../data/mockData';
import CircleProgress from '../components/CircleProgress';
import MiniBarChart from '../components/MiniBarChart';
import StatusBadge from '../components/StatusBadge';
import Icon from '../components/Icons';

const DEPOTS = [
  { name:'Central Depot', pct:94, drivers:48 },
  { name:'North Terminal', pct:78, drivers:32 },
  { name:'South Hub',     pct:61, drivers:27 },
  { name:'East Station',  pct:85, drivers:19 },
  { name:'West Garage',   pct:91, drivers:41 },
];

const MONTHLY = [42, 58, 61, 74, 68, 83, 79, 91, 88, 95, 87, 102];
const MONTHS  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function depotColor(p) {
  if (p >= 90) return 'var(--green)';
  if (p >= 80) return 'var(--amber)';
  return 'var(--red)';
}

function depotProgCls(p) {
  if (p >= 90) return 'prog-green';
  if (p >= 80) return 'prog-amber';
  return 'prog-red';
}

export default function AdminDashboard({ onView }) {
  const atRisk = DRIVERS.filter(d => d.comp !== 'OK');

  return (
    <div className="fade-in">

      {/* Stat Tiles */}
      <div className="stat-grid">
        {[
          { label:'Total Drivers',    val:'284',  delta:'+12 this month', up:true,  color:'blue',  icon:'Users'   },
          { label:'Compliance Rate',  val:'91%',  delta:'+3% vs last qtr', up:true, color:'green', icon:'Shield'  },
          { label:'Overdue Training', val:'23',   delta:'↑ 5 need action', up:false, color:'red',  icon:'Alert'   },
          { label:'BTW Hours (YTD)',  val:'847',  delta:'+124 this month', up:true, color:'teal',  icon:'Clock'   },
        ].map(t => (
          <div key={t.label} className={`stat-tile ${t.color}`}>
            <div className="stat-icon">
              <Icon name={t.icon} size={18} color={`var(--${t.color})`} strokeWidth={1.75} />
            </div>
            <div className="stat-label">{t.label}</div>
            <div className="stat-val">{t.val}</div>
            <div className="stat-delta">
              <span className={t.up ? 'up' : 'down'}>
                <Icon name={t.up ? 'BarChart' : 'Alert'} size={11} strokeWidth={2.5} />
                {t.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Two-column middle */}
      <div className="g2 mb24">

        {/* Depot Completion */}
        <div className="card">
          <div className="sec-head">
            <div>
              <div className="sec-title">Depot Completion Rates</div>
              <div className="sec-sub">Training completion by location</div>
            </div>
            <Icon name="Building" size={16} color="var(--text3)" />
          </div>

          {DEPOTS.map(d => (
            <div key={d.name} style={{ marginBottom:16 }}>
              <div className="flex items-center justify-between mb8">
                <div className="flex items-center gap8">
                  <div style={{
                    width:7, height:7, borderRadius:'50%',
                    background: depotColor(d.pct), flexShrink:0
                  }}/>
                  <span style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{d.name}</span>
                  <span className="chip"><Icon name="Users" size={10}/> {d.drivers}</span>
                </div>
                <span style={{
                  fontFamily:'var(--font-mono)', fontSize:13, fontWeight:700,
                  color: depotColor(d.pct)
                }}>{d.pct}%</span>
              </div>
              <div className="prog-bar">
                <div className={`prog-fill ${depotProgCls(d.pct)}`} style={{ width:`${d.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Chart */}
        <div className="card">
          <div className="sec-head">
            <div>
              <div className="sec-title">Monthly Completions</div>
              <div className="sec-sub">Training sessions completed</div>
            </div>
            <Icon name="BarChart" size={16} color="var(--text3)" />
          </div>

          {/* Chart */}
          <div style={{ marginBottom:8 }}>
            <div style={{ display:'flex', alignItems:'flex-end', gap:5, height:80 }}>
              {MONTHLY.map((v, i) => {
                const max = Math.max(...MONTHLY);
                const h = Math.max(6, (v / max) * 80);
                const isLast = i === MONTHLY.length - 1;
                return (
                  <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                    <div style={{
                      width:'100%', height:h,
                      background: isLast ? 'var(--blue)' : 'var(--blue-dim)',
                      borderRadius:'4px 4px 0 0',
                      border: isLast ? '1.5px solid rgba(29,111,242,0.4)' : 'none',
                      transition:'all 0.3s'
                    }} title={`${MONTHS[i]}: ${v}`} />
                  </div>
                );
              })}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
              {['J','F','M','A','M','J','J','A','S','O','N','D'].map((m,i) => (
                <span key={i} style={{ flex:1, textAlign:'center', fontSize:9, color:'var(--text3)', fontWeight:600 }}>{m}</span>
              ))}
            </div>
          </div>

          <hr className="separator" />

          {/* YTD Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {[
              { label:'YTD Completions', val:'847', color:'var(--blue)'  },
              { label:'Avg per Month',   val:'70.6', color:'var(--teal)' },
              { label:'Best Month',      val:'102',  color:'var(--green)'},
              { label:'Pass Rate',       val:'94%',  color:'var(--amber)'},
            ].map(s => (
              <div key={s.label} style={{
                background:'var(--bg3)', borderRadius:'var(--r2)',
                padding:'12px 14px', border:'1px solid var(--border)'
              }}>
                <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600, marginBottom:4 }}>{s.label}</div>
                <div style={{ fontFamily:'var(--font-head)', fontSize:22, fontWeight:800, color:s.color }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* At-Risk Drivers */}
      <div className="card">
        <div className="sec-head">
          <div>
            <div className="sec-title flex items-center gap8">
              <Icon name="Alert" size={15} color="var(--red)" />
              Drivers Requiring Attention
            </div>
            <div className="sec-sub">{atRisk.length} drivers with compliance issues</div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => onView('drivers')}>
            View All Drivers <Icon name="ChevronRight" size={13} />
          </button>
        </div>

        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>Driver</th>
                <th>Depot</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Compliance</th>
                <th>License Exp.</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {atRisk.map(d => {
                const progColor = d.prog === 100 ? 'var(--green)' : d.prog < 40 ? 'var(--red)' : 'var(--amber)';
                const progCls   = d.prog === 100 ? 'prog-green'  : d.prog < 40 ? 'prog-red'   : 'prog-amber';
                return (
                  <tr key={d.id}>
                    <td>
                      <div className="flex items-center gap8">
                        <div className="avatar-sm">
                          {d.name.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <div>
                          <div style={{ fontWeight:600, color:'var(--text)', fontSize:13 }}>{d.name}</div>
                          <div style={{ fontSize:11, color:'var(--text3)', fontFamily:'var(--font-mono)' }}>{d.emp}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="chip">
                        <Icon name="Building" size={10} /> {d.depot}
                      </span>
                    </td>
                    <td><StatusBadge status={d.status} /></td>
                    <td>
                      <div className="flex items-center gap8">
                        <div className="prog-bar" style={{ width:80 }}>
                          <div className={`prog-fill ${progCls}`} style={{ width:`${d.prog}%` }} />
                        </div>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color: progColor, fontWeight:700 }}>
                          {d.prog}%
                        </span>
                      </div>
                    </td>
                    <td><StatusBadge status={d.comp} /></td>
                    <td>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text2)' }}>{d.lic}</span>
                    </td>
                    <td>
                      <button className="btn btn-danger btn-sm">
                        <Icon name="Mail" size={12} /> Notify
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}