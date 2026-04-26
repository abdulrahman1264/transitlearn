import React, { useState } from 'react';
import Icon from '../components/Icons';

const DRIVERS = [
  { id:1, name:'Marcus Okafor',   avatar:'MO', batch:'Batch 153', category:'Pre-Service'  },
  { id:2, name:'Priya Sundaram',  avatar:'PS', batch:'Batch 154', category:'In-Service'   },
  { id:3, name:'James Whitfield', avatar:'JW', batch:'Batch 153', category:'Pre-Service'  },
  { id:4, name:'Aisha Mensah',    avatar:'AM', batch:'Batch 155', category:'School Bus'   },
  { id:5, name:'Chen Wei',        avatar:'CW', batch:'Batch 153', category:'Pre-Service'  },
  { id:6, name:'Rosa Gutierrez',  avatar:'RG', batch:'Batch 154', category:'In-Service'   },
  { id:7, name:'Ahmed Al Mansouri',avatar:'AA',batch:'Batch 153', category:'Pre-Service'  },
  { id:8, name:'Tom Hassan',      avatar:'TH', batch:'Batch 154', category:'In-Service'   },
];

const VIDEOS = [
  { id:1, title:'Introduction & Safety Brief',    course:'Pre-Service Orientation',        dur:'12 min' },
  { id:2, title:'Wet Weather Driving Techniques', course:'Defensive Driving',              dur:'18 min' },
  { id:3, title:'Defensive Techniques Overview',  course:'Defensive Driving',              dur:'20 min' },
  { id:4, title:'Emergency Procedures',           course:'Emergency Procedures & Safety',  dur:'15 min' },
  { id:5, title:'Night Driving & Visibility',     course:'Defensive Driving',              dur:'22 min' },
  { id:6, title:'Route Navigation Basics',        course:'Route Navigation & GPS',         dur:'14 min' },
];

// Mock progress matrix: driverId → videoId → progress %
const PROGRESS_MATRIX = {
  1: { 1:100, 2:100, 3:75,  4:45,  5:0,   6:0   },
  2: { 1:100, 2:60,  3:0,   4:0,   5:0,   6:0   },
  3: { 1:100, 2:100, 3:100, 4:100, 5:80,  6:30  },
  4: { 1:100, 2:100, 3:40,  4:0,   5:0,   6:0   },
  5: { 1:50,  2:0,   3:0,   4:0,   5:0,   6:0   },
  6: { 1:100, 2:100, 3:100, 4:75,  5:60,  6:100 },
  7: { 1:100, 2:30,  3:0,   4:0,   5:0,   6:0   },
  8: { 1:100, 2:100, 3:90,  4:50,  5:0,   6:0   },
};

function ProgressCell({ pct }) {
  if (pct === undefined || pct === 0) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:32, height:32, borderRadius:8, background:'var(--bg4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:10, color:'var(--text4)', fontWeight:600 }}>—</span>
        </div>
      </div>
    );
  }
  const color = pct === 100 ? 'var(--green)' : pct >= 50 ? 'var(--blue)' : 'var(--amber)';
  const bg    = pct === 100 ? 'var(--green-dim)' : pct >= 50 ? 'var(--blue-dim)' : 'var(--amber-dim)';
  const border= pct === 100 ? 'rgba(22,163,74,0.25)' : pct >= 50 ? 'rgba(27,110,243,0.25)' : 'rgba(217,119,6,0.25)';
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div title={`${pct}% watched`} style={{
        width:42, height:32, borderRadius:8,
        background:bg, border:`1px solid ${border}`,
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        {pct === 100 ? (
          <Icon name="Check" size={13} color="var(--green)" strokeWidth={2.5}/>
        ) : (
          <span style={{ fontSize:11, fontWeight:700, color, fontFamily:'var(--font-mono)' }}>{pct}%</span>
        )}
      </div>
    </div>
  );
}

export default function VideoMatrixPage() {
  const [batchFilter,    setBatchFilter]    = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [hoveredDriver,  setHoveredDriver]  = useState(null);
  const [hoveredVideo,   setHoveredVideo]   = useState(null);

  const batches    = ['All', ...new Set(DRIVERS.map(d=>d.batch))];
  const categories = ['All', ...new Set(DRIVERS.map(d=>d.category))];

  const filteredDrivers = DRIVERS.filter(d => {
    const matchBatch    = batchFilter    === 'All' || d.batch    === batchFilter;
    const matchCategory = categoryFilter === 'All' || d.category === categoryFilter;
    return matchBatch && matchCategory;
  });

  // Stats
  const totalCells     = filteredDrivers.length * VIDEOS.length;
  const completedCells = filteredDrivers.reduce((acc, d) =>
    acc + VIDEOS.filter(v => (PROGRESS_MATRIX[d.id]?.[v.id]||0) === 100).length, 0);
  const startedCells   = filteredDrivers.reduce((acc, d) =>
    acc + VIDEOS.filter(v => (PROGRESS_MATRIX[d.id]?.[v.id]||0) > 0 && (PROGRESS_MATRIX[d.id]?.[v.id]||0) < 100).length, 0);
  const notStarted     = totalCells - completedCells - startedCells;

  // Per-driver completion
  const driverCompletion = (driver) => {
    const total    = VIDEOS.length;
    const done     = VIDEOS.filter(v => (PROGRESS_MATRIX[driver.id]?.[v.id]||0) === 100).length;
    const started  = VIDEOS.filter(v => { const p=(PROGRESS_MATRIX[driver.id]?.[v.id]||0); return p>0&&p<100; }).length;
    return { total, done, started, pct: Math.round((done/total)*100) };
  };

  // Per-video completion
  const videoCompletion = (video) => {
    const total   = filteredDrivers.length;
    const done    = filteredDrivers.filter(d => (PROGRESS_MATRIX[d.id]?.[video.id]||0)===100).length;
    const started = filteredDrivers.filter(d => { const p=(PROGRESS_MATRIX[d.id]?.[video.id]||0); return p>0&&p<100; }).length;
    return { total, done, started, pct: Math.round((done/total)*100) };
  };

  return (
    <div className="fade-in">

      {/* Header */}
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>
          Video Watch Analytics
        </div>
        <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>
          Full matrix — every driver vs every training video
        </div>
      </div>

      {/* Summary tiles */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
        {[
          { label:'Fully Completed', val:completedCells, color:'green', icon:'Check',   sub:'video completions' },
          { label:'In Progress',     val:startedCells,   color:'blue',  icon:'Clock',   sub:'partially watched' },
          { label:'Not Started',     val:notStarted,     color:'red',   icon:'X',       sub:'not yet watched'   },
          { label:'Completion Rate', val:`${totalCells>0?Math.round((completedCells/totalCells)*100):0}%`, color:'amber', icon:'BarChart', sub:'overall' },
        ].map(t=>(
          <div key={t.label} className={`stat-tile ${t.color}`}>
            <div className="stat-icon"><Icon name={t.icon} size={18} color={`var(--${t.color})`}/></div>
            <div className="stat-label">{t.label}</div>
            <div className="stat-val">{t.val}</div>
            <div className="stat-delta"><span className="neutral">{t.sub}</span></div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:12, marginBottom:20, alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontSize:12, fontWeight:600, color:'var(--text3)' }}>Batch:</span>
          {batches.map(b=>(
            <button key={b} className={`btn btn-sm ${batchFilter===b?'btn-primary':'btn-ghost'}`}
              onClick={()=>setBatchFilter(b)}>{b}</button>
          ))}
        </div>
        <div style={{ width:1, height:24, background:'var(--border)' }}/>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontSize:12, fontWeight:600, color:'var(--text3)' }}>Category:</span>
          {categories.map(c=>(
            <button key={c} className={`btn btn-sm ${categoryFilter===c?'btn-primary':'btn-ghost'}`}
              onClick={()=>setCategoryFilter(c)}>{c}</button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display:'flex', gap:16, marginBottom:16, alignItems:'center' }}>
        <span style={{ fontSize:11, color:'var(--text3)', fontWeight:600 }}>Legend:</span>
        {[
          { color:'var(--green)', bg:'var(--green-dim)', label:'Completed (100%)' },
          { color:'var(--blue)',  bg:'var(--blue-dim)',  label:'In Progress' },
          { color:'var(--amber)', bg:'var(--amber-dim)', label:'Started (<50%)' },
          { color:'var(--text4)', bg:'var(--bg4)',       label:'Not Watched' },
        ].map(l=>(
          <div key={l.label} style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:24, height:18, borderRadius:5, background:l.bg, border:`1px solid ${l.color}33` }}/>
            <span style={{ fontSize:11, color:'var(--text2)' }}>{l.label}</span>
          </div>
        ))}
      </div>

      {/* Matrix table */}
      <div style={{ overflowX:'auto', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--r3)', boxShadow:'var(--shadow-sm)' }}>
        <table style={{ borderCollapse:'collapse', width:'100%' }}>
          <thead>
            <tr style={{ background:'var(--bg3)' }}>
              {/* Driver column header */}
              <th style={{ padding:'12px 16px', textAlign:'left', fontSize:11, fontWeight:700, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.5px', borderBottom:'1px solid var(--border)', borderRight:'2px solid var(--border)', whiteSpace:'nowrap', minWidth:180, position:'sticky', left:0, background:'var(--bg3)', zIndex:2 }}>
                Driver
              </th>
              {/* Video column headers */}
              {VIDEOS.map(v => {
                const vc = videoCompletion(v);
                return (
                  <th key={v.id}
                    style={{
                      padding:'8px 6px', textAlign:'center', fontSize:10, fontWeight:700,
                      color: hoveredVideo===v.id ? 'var(--blue)' : 'var(--text3)',
                      textTransform:'uppercase', letterSpacing:'0.3px',
                      borderBottom:'1px solid var(--border)',
                      borderRight:'1px solid var(--border)',
                      minWidth:80, maxWidth:100,
                      background: hoveredVideo===v.id ? 'var(--blue-dim)' : 'var(--bg3)',
                      transition:'all 0.13s',
                      cursor:'default',
                    }}
                    onMouseEnter={()=>setHoveredVideo(v.id)}
                    onMouseLeave={()=>setHoveredVideo(null)}
                  >
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                      <div style={{ width:28, height:28, borderRadius:7, background: hoveredVideo===v.id?'var(--blue)':'var(--bg4)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto' }}>
                        <Icon name="Video" size={12} color={hoveredVideo===v.id?'#fff':'var(--text3)'}/>
                      </div>
                      <div style={{ lineHeight:1.3, maxWidth:80, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontSize:9 }} title={v.title}>
                        {v.title.length > 14 ? v.title.slice(0,14)+'…' : v.title}
                      </div>
                      <div style={{ fontSize:9, color:'var(--text4)', fontWeight:400 }}>{v.dur}</div>
                      {/* Per-video completion bar */}
                      <div style={{ width:40, height:4, background:'var(--bg4)', borderRadius:10, overflow:'hidden', marginTop:2 }}>
                        <div style={{ width:`${vc.pct}%`, height:'100%', background: vc.pct===100?'var(--green)':vc.pct>=50?'var(--blue)':'var(--amber)', borderRadius:10 }}/>
                      </div>
                      <div style={{ fontSize:9, fontWeight:700, color: vc.pct===100?'var(--green)':vc.pct>=50?'var(--blue)':'var(--amber)' }}>
                        {vc.done}/{vc.total}
                      </div>
                    </div>
                  </th>
                );
              })}
              {/* Overall column */}
              <th style={{ padding:'8px 12px', textAlign:'center', fontSize:10, fontWeight:700, color:'var(--text3)', textTransform:'uppercase', borderBottom:'1px solid var(--border)', borderLeft:'2px solid var(--border)', minWidth:80, background:'var(--bg3)' }}>
                Overall
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map((driver, di) => {
              const dc = driverCompletion(driver);
              const rowBg = hoveredDriver===driver.id ? 'var(--bg3)' : di%2===0 ? 'var(--bg2)' : 'var(--bg)';
              return (
                <tr key={driver.id}
                  onMouseEnter={()=>setHoveredDriver(driver.id)}
                  onMouseLeave={()=>setHoveredDriver(null)}
                  style={{ background:rowBg, transition:'background 0.1s' }}>

                  {/* Driver cell */}
                  <td style={{ padding:'10px 16px', borderBottom:'1px solid var(--border)', borderRight:'2px solid var(--border)', position:'sticky', left:0, background:rowBg, zIndex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:34, height:34, borderRadius:9, flexShrink:0,
                        background: dc.pct===100?'var(--green-dim)':dc.pct>=50?'var(--blue-dim)':'var(--amber-dim)',
                        color: dc.pct===100?'var(--green)':dc.pct>=50?'var(--blue)':'var(--amber)',
                        border:`1px solid ${dc.pct===100?'rgba(22,163,74,0.2)':dc.pct>=50?'rgba(27,110,243,0.2)':'rgba(217,119,6,0.2)'}`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:10, fontWeight:700, fontFamily:'var(--font-mono)',
                      }}>{driver.avatar}</div>
                      <div>
                        <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', whiteSpace:'nowrap' }}>{driver.name}</div>
                        <div style={{ display:'flex', gap:5, marginTop:2 }}>
                          <span style={{ fontSize:10, color:'var(--text3)' }}>{driver.batch}</span>
                          <span style={{ fontSize:10, color:'var(--text4)' }}>·</span>
                          <span style={{ fontSize:10, color:'var(--text3)' }}>{driver.category}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Progress cells */}
                  {VIDEOS.map(v => (
                    <td key={v.id} style={{
                      padding:'8px 4px',
                      borderBottom:'1px solid var(--border)',
                      borderRight:'1px solid var(--border)',
                      background: hoveredVideo===v.id ? 'rgba(27,110,243,0.05)' : 'transparent',
                    }}>
                      <ProgressCell pct={PROGRESS_MATRIX[driver.id]?.[v.id]||0}/>
                    </td>
                  ))}

                  {/* Overall completion */}
                  <td style={{ padding:'10px 12px', borderBottom:'1px solid var(--border)', borderLeft:'2px solid var(--border)', textAlign:'center' }}>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                      <div style={{ fontSize:15, fontWeight:800, color: dc.pct===100?'var(--green)':dc.pct>=50?'var(--blue)':'var(--red)', lineHeight:1 }}>
                        {dc.pct}%
                      </div>
                      <div style={{ width:50, height:5, background:'var(--bg4)', borderRadius:10, overflow:'hidden' }}>
                        <div style={{ width:`${dc.pct}%`, height:'100%', background: dc.pct===100?'var(--green)':dc.pct>=50?'var(--blue)':'var(--red)', borderRadius:10 }}/>
                      </div>
                      <div style={{ fontSize:9, color:'var(--text3)', fontWeight:600 }}>{dc.done}/{dc.total} videos</div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom per-video summary */}
      <div style={{ marginTop:20 }}>
        <div style={{ fontSize:14, fontWeight:800, color:'var(--text)', marginBottom:14 }}>Video Completion Summary</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
          {VIDEOS.map(v => {
            const vc = videoCompletion(v);
            return (
              <div key={v.id} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--r2)', padding:'14px 16px', boxShadow:'var(--shadow-sm)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                  <div style={{ width:36, height:36, borderRadius:9, background:'var(--blue-dim)', border:'1px solid rgba(27,110,243,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon name="Video" size={15} color="var(--blue)"/>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12.5, fontWeight:700, color:'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{v.title}</div>
                    <div style={{ fontSize:10, color:'var(--text3)', marginTop:1 }}>{v.course} · {v.dur}</div>
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:10 }}>
                  {[
                    { label:'Completed', val:vc.done,    color:'var(--green)' },
                    { label:'In Progress',val:vc.started, color:'var(--blue)'  },
                    { label:'Not Started',val:vc.total-vc.done-vc.started, color:'var(--text3)' },
                  ].map(s=>(
                    <div key={s.label} style={{ textAlign:'center', background:'var(--bg3)', borderRadius:'var(--r)', padding:'8px 4px' }}>
                      <div style={{ fontSize:18, fontWeight:800, color:s.color, lineHeight:1 }}>{s.val}</div>
                      <div style={{ fontSize:9, color:'var(--text3)', fontWeight:600, marginTop:2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="prog-bar" style={{ height:6 }}>
                  <div className="prog-fill" style={{ width:`${vc.pct}%`, background: vc.pct===100?'var(--green)':vc.pct>=50?'var(--blue)':'var(--amber)' }}/>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
                  <span style={{ fontSize:10, color:'var(--text3)' }}>{vc.done} of {vc.total} drivers completed</span>
                  <span style={{ fontSize:10, fontWeight:700, color: vc.pct===100?'var(--green)':vc.pct>=50?'var(--blue)':'var(--amber)' }}>{vc.pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}