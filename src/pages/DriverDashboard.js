import React from 'react';
import { COURSES, COURSE_PROGS } from '../data/mockData';
import CircleProgress from '../components/CircleProgress';
import Icon from '../components/Icons';

const ASSIGNED = [1, 2, 3, 6];

function progColor(p) {
  if (p === 100) return 'var(--green)';
  if (p < 30)    return 'var(--red)';
  return 'var(--blue)';
}
function progCls(p) {
  if (p === 100) return 'prog-green';
  if (p < 30)    return 'prog-red';
  return 'prog-blue';
}

export default function DriverDashboard({ onView }) {
  const courses = COURSES.filter(c => ASSIGNED.includes(c.id));

  return (
    <div className="fade-in">

      {/* Stat Tiles */}
      <div className="stat-grid">
        {[
          { label:'Courses Assigned', val:'4',    delta:'2 in progress',   up:true,  color:'blue',  icon:'Book'    },
          { label:'Completion Rate',  val:'67%',  delta:'+5% this week',   up:true,  color:'teal',  icon:'BarChart' },
          { label:'BTW Hours',        val:'14.5', delta:'Target: 20 hrs',  up:true,  color:'amber', icon:'Car'     },
          { label:'Overdue',          val:'1',    delta:'Action required',  up:false, color:'red',   icon:'Alert'   },
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

      <div className="g2-1">

        {/* Assigned Courses */}
        <div className="card">
          <div className="sec-head">
            <div>
              <div className="sec-title">Assigned Courses</div>
              <div className="sec-sub">Your active training modules</div>
            </div>
            <Icon name="Book" size={16} color="var(--text3)" />
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {courses.map(c => {
              const p       = COURSE_PROGS[c.id] || 0;
              const overdue = c.id === 6;
              return (
                <div key={c.id} style={{
                  padding:'14px 16px',
                  background:'var(--bg3)',
                  border:`1px solid ${overdue ? 'rgba(239,68,68,0.25)' : 'var(--border)'}`,
                  borderRadius:'var(--r2)',
                  display:'flex', alignItems:'center', gap:14
                }}>
                  <CircleProgress pct={p} color={progColor(p)} size={52} />
                  <div style={{ flex:1 }}>
                    <div className="flex items-center justify-between mb8">
                      <span style={{ fontWeight:700, fontSize:13.5, color:'var(--text)' }}>{c.title}</span>
                      {overdue && (
                        <span className="badge badge-red">
                          <Icon name="Alert" size={10} strokeWidth={2.5} /> Overdue
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap8 mb8">
                      <span className="chip"><Icon name="Clock" size={10} /> {c.dur}</span>
                      <span className="chip"><Icon name="Layers" size={10} /> {c.mods} modules</span>
                    </div>
                    <div className="prog-bar">
                      <div className={`prog-fill ${progCls(p)}`} style={{ width:`${p}%` }} />
                    </div>
                    <div style={{ marginTop:4, fontSize:11, color:'var(--text3)' }}>
                      Due: <span style={{ color: overdue ? 'var(--red)' : 'var(--text2)', fontWeight:600 }}>
                        {overdue ? 'Mar 31, 2025 — OVERDUE' : 'May 30, 2025'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

          {/* Next BTW */}
          <div className="card card-accent-blue">
            <div className="flex items-center gap8 mb12">
              <Icon name="Car" size={15} color="var(--blue)" />
              <span style={{ fontWeight:700, fontSize:14, color:'var(--text)' }}>Next BTW Session</span>
            </div>
            <div style={{ background:'var(--blue-dim)', borderRadius:'var(--r2)', padding:'12px 14px', marginBottom:12 }}>
              <div style={{ fontFamily:'var(--font-head)', fontSize:16, fontWeight:800, color:'var(--blue)' }}>
                Route 14 — Downtown Loop
              </div>
              <div style={{ fontSize:12, color:'var(--text2)', marginTop:4 }}>
                <Icon name="Calendar" size={11} /> April 22, 2025 · 09:00 AM
              </div>
            </div>
            {[
              { icon:'GraduationCap', label:'Trainer', val:'Elena Marsh'  },
              { icon:'Clock',         label:'Duration', val:'2 hours'      },
              { icon:'Map',           label:'Route',    val:'Route 14'     },
            ].map(r => (
              <div key={r.label} className="kv-row">
                <span className="kv-key flex items-center gap4">
                  <Icon name={r.icon} size={11} /> {r.label}
                </span>
                <span className="kv-val">{r.val}</span>
              </div>
            ))}
          </div>

          {/* Quiz Pending */}
          <div className="card card-accent-amber">
            <div className="flex items-center gap8 mb12">
              <Icon name="Pencil" size={15} color="var(--amber)" />
              <span style={{ fontWeight:700, fontSize:14, color:'var(--text)' }}>Quiz Pending</span>
            </div>
            <div style={{ fontSize:13, color:'var(--text2)', marginBottom:14, lineHeight:1.5 }}>
              <strong style={{ color:'var(--text)' }}>Knowledge Check — Module 2</strong>
              <br/>Wet Weather Driving Techniques
            </div>
            <div className="flex items-center gap8 mb12">
              <span className="chip"><Icon name="Clock" size={10}/> 10 min</span>
              <span className="chip"><Icon name="Star"  size={10}/> 3 questions</span>
              <span className="badge badge-amber">
                <Icon name="Alert" size={10} strokeWidth={2.5}/> Pending
              </span>
            </div>
            <button className="btn btn-primary w100" onClick={() => onView('quiz')}>
              <Icon name="Pencil" size={14}/> Start Quiz
            </button>
          </div>

          {/* Compliance */}
          <div className="card card-accent-green">
            <div className="flex items-center gap8 mb12">
              <Icon name="Shield" size={15} color="var(--green)" />
              <span style={{ fontWeight:700, fontSize:14, color:'var(--text)' }}>Compliance Status</span>
            </div>
            {[
              { label:'License Valid',       done:true  },
              { label:'Medical Certificate', done:true  },
              { label:'Annual Refresher',    done:false },
              { label:'DBS Check',           done:true  },
              { label:'BTW Sign-off',        done:false },
            ].map(item => (
              <div key={item.label} className="flex items-center gap8"
                style={{ padding:'7px 0', borderBottom:'1px solid var(--border)' }}>
                <div style={{
                  width:18, height:18, borderRadius:'50%', flexShrink:0,
                  background: item.done ? 'var(--green-dim)' : 'var(--red-dim)',
                  border:`1.5px solid ${item.done ? 'var(--green)' : 'var(--red)'}`,
                  display:'flex', alignItems:'center', justifyContent:'center'
                }}>
                  <Icon
                    name={item.done ? 'Check' : 'X'}
                    size={9}
                    color={item.done ? 'var(--green)' : 'var(--red)'}
                    strokeWidth={3}
                  />
                </div>
                <span style={{ fontSize:13, color: item.done ? 'var(--text)' : 'var(--text2)' }}>
                  {item.label}
                </span>
                {!item.done && (
                  <span className="badge badge-red" style={{ marginLeft:'auto' }}>
                    <Icon name="Alert" size={9} strokeWidth={2.5}/> Action
                  </span>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}