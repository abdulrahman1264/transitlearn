import React, { useState } from 'react';
import Icon from '../components/Icons';
import CircleProgress from '../components/CircleProgress';

const MONTHLY_DATA = {
  'Public Bus — Pre Service': [12,18,22,28,24,31,35,29,38,42,39,48],
  'Public Bus — In Service':  [8,12,15,18,14,20,22,19,24,28,25,36],
  'School Bus Training':      [4,6,8,10,9,12,14,11,15,18,16,24],
};
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const DEPOT_STATS = [
  { name:'Central Depot', pre:94, inService:88, school:76, drivers:48 },
  { name:'North Terminal', pre:78, inService:82, school:91, drivers:32 },
  { name:'South Hub',     pre:61, inService:74, school:68, drivers:27 },
  { name:'East Station',  pre:85, inService:79, school:83, drivers:19 },
  { name:'West Garage',   pre:91, inService:95, school:72, drivers:41 },
];

const TOP_DRIVERS = [
  { name:'Rosa Gutierrez',  score:98, batch:'Batch 153', category:'In-Service',  avatar:'RG' },
  { name:'James Whitfield', score:96, batch:'Batch 152', category:'Pre-Service', avatar:'JW' },
  { name:'Marcus Okafor',   score:91, batch:'Batch 153', category:'In-Service',  avatar:'MO' },
  { name:'Aisha Mensah',    score:88, batch:'Batch 153', category:'School Bus',  avatar:'AM' },
  { name:'Chen Wei',        score:85, batch:'Batch 153', category:'Pre-Service', avatar:'CW' },
];

function BarChart({ data, color, height=80 }) {
  const max = Math.max(...data, 1);
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:4, height }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
          <div style={{
            width:'100%',
            height: Math.max(4, (v/max)*height),
            background: i === data.length-1 ? color : `${color}44`,
            borderRadius:'3px 3px 0 0',
            transition:'all 0.3s',
          }}/>
          <span style={{ fontSize:8, color:'var(--text3)', fontWeight:600 }}>
            {MONTHS[i].charAt(0)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const [period,   setPeriod]   = useState('This Year');
  const [category, setCategory] = useState('All Categories');

  const totalCompleted = Object.values(MONTHLY_DATA).flat().reduce((a,b)=>a+b,0);

  return (
    <div className="fade-in">

      {/* Header */}
      <div className="flex items-center justify-between mb24">
        <div>
          <div style={{ fontFamily:'var(--font-head)', fontSize:15, fontWeight:800, color:'var(--text)' }}>
            Analytics & Insights
          </div>
          <div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>
            Training performance across all categories and depots
          </div>
        </div>
        <div className="flex items-center gap8">
          <select className="form-input" style={{ width:'auto', fontSize:12, padding:'6px 12px' }}
            value={period} onChange={e=>setPeriod(e.target.value)}>
            {['This Week','This Month','This Quarter','This Year'].map(p=>(
              <option key={p}>{p}</option>
            ))}
          </select>
          <button className="btn btn-ghost btn-sm">
            <Icon name="Download" size={12}/> Export
          </button>
        </div>
      </div>

      {/* KPI tiles */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 }}>
        {[
          { label:'Total Completions', val:'847',  delta:'+12%', up:true,  color:'blue',  icon:'Trophy'   },
          { label:'Overall Pass Rate', val:'91%',  delta:'+3%',  up:true,  color:'green', icon:'Shield'   },
          { label:'Active Trainees',   val:'108',  delta:'+8',   up:true,  color:'teal',  icon:'Users'    },
          { label:'Avg Score',         val:'83%',  delta:'-1%',  up:false, color:'amber', icon:'Star'     },
        ].map(t => (
          <div key={t.label} className={`stat-tile ${t.color}`}>
            <div className="stat-icon">
              <Icon name={t.icon} size={18} color={`var(--${t.color})`}/>
            </div>
            <div className="stat-label">{t.label}</div>
            <div className="stat-val">{t.val}</div>
            <div className="stat-delta">
              <span className={t.up?'up':'down'}>
                <Icon name={t.up?'BarChart':'Alert'} size={11} strokeWidth={2.5}/>
                {t.delta} vs last period
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="g2 mb24">

        {/* Monthly completions by category */}
        <div className="card">
          <div className="sec-head">
            <div>
              <div className="sec-title">Monthly Completions by Category</div>
              <div className="sec-sub">Training sessions completed per month</div>
            </div>
            <Icon name="BarChart" size={15} color="var(--text3)"/>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            {[
              { label:'Public Bus — Pre Service', color:'var(--blue)',  data:MONTHLY_DATA['Public Bus — Pre Service'] },
              { label:'Public Bus — In Service',  color:'var(--teal)',  data:MONTHLY_DATA['Public Bus — In Service']  },
              { label:'School Bus Training',      color:'var(--amber)', data:MONTHLY_DATA['School Bus Training']      },
            ].map(c => (
              <div key={c.label}>
                <div className="flex items-center justify-between mb8">
                  <div className="flex items-center gap6">
                    <div style={{ width:10, height:10, borderRadius:2, background:c.color }}/>
                    <span style={{ fontSize:12, fontWeight:600, color:'var(--text)' }}>{c.label}</span>
                  </div>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:12, fontWeight:700, color:c.color }}>
                    {c.data.reduce((a,b)=>a+b,0)} total
                  </span>
                </div>
                <BarChart data={c.data} color={c.color} height={60}/>
              </div>
            ))}
          </div>
        </div>

        {/* Category breakdown */}
        <div className="card">
          <div className="sec-head">
            <div>
              <div className="sec-title">Category Breakdown</div>
              <div className="sec-sub">Completion rate per training type</div>
            </div>
            <Icon name="Layers" size={15} color="var(--text3)"/>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            {[
              { label:'Public Bus — Pre Service', pct:89, drivers:284, color:'var(--blue)'  },
              { label:'Public Bus — In Service',  pct:94, drivers:196, color:'var(--teal)'  },
              { label:'School Bus Training',      pct:82, drivers:87,  color:'var(--amber)' },
            ].map(c => (
              <div key={c.label} style={{
                display:'flex', alignItems:'center', gap:16,
                padding:'14px', background:'var(--bg3)',
                borderRadius:'var(--r2)', border:'1px solid var(--border)',
              }}>
                <CircleProgress pct={c.pct} color={c.color} size={56}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:4 }}>
                    {c.label}
                  </div>
                  <div className="flex items-center gap8">
                    <span className="chip"><Icon name="Users" size={10}/> {c.drivers} drivers</span>
                    <span style={{ fontSize:11, color:'var(--text3)' }}>Pass rate: {c.pct}%</span>
                  </div>
                  <div className="prog-bar" style={{ marginTop:8 }}>
                    <div className="prog-fill prog-blue" style={{ width:`${c.pct}%`,
                      background:c.color }}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Depot performance table */}
      <div className="card mb24">
        <div className="sec-head">
          <div>
            <div className="sec-title">Depot Performance</div>
            <div className="sec-sub">Completion rates by depot and category</div>
          </div>
          <Icon name="Building" size={15} color="var(--text3)"/>
        </div>
        <div className="tbl-wrap" style={{ border:'none', boxShadow:'none' }}>
          <table>
            <thead>
              <tr>
                <th>Depot</th>
                <th>Drivers</th>
                <th>Pre-Service</th>
                <th>In-Service</th>
                <th>School Bus</th>
                <th>Overall</th>
              </tr>
            </thead>
            <tbody>
              {DEPOT_STATS.map(d => {
                const overall = Math.round((d.pre + d.inService + d.school) / 3);
                const overallColor = overall >= 90 ? 'var(--green)' : overall >= 80 ? 'var(--amber)' : 'var(--red)';
                const pctBadge = (v) => {
                  const cls = v >= 90 ? 'badge-green' : v >= 80 ? 'badge-amber' : 'badge-red';
                  return <span className={`badge ${cls}`}>{v}%</span>;
                };
                return (
                  <tr key={d.name}>
                    <td>
                      <div className="flex items-center gap8">
                        <Icon name="Building" size={12} color="var(--text3)"/>
                        <span style={{ fontWeight:600, color:'var(--text)' }}>{d.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="chip"><Icon name="Users" size={10}/> {d.drivers}</span>
                    </td>
                    <td>{pctBadge(d.pre)}</td>
                    <td>{pctBadge(d.inService)}</td>
                    <td>{pctBadge(d.school)}</td>
                    <td>
                      <div className="flex items-center gap8">
                        <div className="prog-bar" style={{ width:80 }}>
                          <div className="prog-fill" style={{
                            width:`${overall}%`,
                            background: overallColor,
                          }}/>
                        </div>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:12, fontWeight:700, color:overallColor }}>
                          {overall}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top drivers */}
      <div className="card">
        <div className="sec-head">
          <div>
            <div className="sec-title">Top Performing Drivers</div>
            <div className="sec-sub">Highest scores this period</div>
          </div>
          <Icon name="Trophy" size={15} color="var(--text3)"/>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {TOP_DRIVERS.map((d, i) => (
            <div key={d.name} style={{
              display:'flex', alignItems:'center', gap:14,
              padding:'12px 14px', background:'var(--bg3)',
              borderRadius:'var(--r2)', border:'1px solid var(--border)',
            }}>
              <div style={{
                width:28, height:28, borderRadius:8, flexShrink:0,
                background: i === 0 ? 'var(--amber-dim)' : i === 1 ? 'var(--bg4)' : 'var(--bg4)',
                color: i === 0 ? 'var(--amber)' : 'var(--text3)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:'var(--font-mono)', fontSize:12, fontWeight:800,
                border:`1px solid ${i===0?'rgba(245,158,11,0.3)':'var(--border)'}`,
              }}>#{i+1}</div>
              <div className="avatar-sm">{d.avatar}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{d.name}</div>
                <div className="flex items-center gap6" style={{ marginTop:3 }}>
                  <span className="chip" style={{ fontSize:10 }}>{d.batch}</span>
                  <span className="chip" style={{ fontSize:10 }}>{d.category}</span>
                </div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{
                  fontFamily:'var(--font-head)', fontSize:20, fontWeight:800,
                  color: d.score >= 95 ? 'var(--green)' : d.score >= 85 ? 'var(--blue)' : 'var(--amber)',
                }}>{d.score}%</div>
                <div style={{ fontSize:10, color:'var(--text3)' }}>Overall Score</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )} {/* end overview tab */}
    </div>
  );
}