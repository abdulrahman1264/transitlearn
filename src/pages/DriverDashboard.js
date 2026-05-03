import React, { useState } from 'react';
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
  const courses  = COURSES.filter(c => ASSIGNED.includes(c.id));
  const name     = 'Marcus';
  const hour     = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const totalMods  = courses.length * 6;
  const doneMods   = 5;
  const overallPct = Math.round(
    courses.reduce((a,c) => a + (COURSE_PROGS[c.id]||0), 0) / courses.length
  );

  return (
    <div className="fade-in">

      {/* ── Hero Welcome Banner ───────────────── */}
      <div style={{
        background:'linear-gradient(135deg, var(--brand) 0%, #1458C8 60%, #0D3E9A 100%)',
        borderRadius:'var(--r4)', padding:'28px 32px',
        marginBottom:28, position:'relative', overflow:'hidden',
        boxShadow:'0 8px 32px rgba(27,110,243,0.35)',
      }}>
        {/* BG decoration */}
        <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,0.06)' }}/>
        <div style={{ position:'absolute', bottom:-60, right:120, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,0.04)' }}/>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative' }}>
          <div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.7)', fontWeight:500, marginBottom:4 }}>
              {greeting} 👋
            </div>
            <div style={{ fontFamily:'var(--font)', fontSize:22, fontWeight:800, color:'#fff', letterSpacing:'-0.5px', marginBottom:6 }}>
              Welcome back, {name}!
            </div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.75)', marginBottom:20 }}>
              Continue your training journey — you're making great progress!
            </div>
            <div style={{ display:'flex', gap:12 }}>
              <button onClick={() => onView('mycourses')} style={{
                padding:'9px 20px', background:'#fff', color:'var(--brand)',
                border:'none', borderRadius:'var(--r)', fontWeight:700,
                fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:6,
                boxShadow:'0 2px 8px rgba(0,0,0,0.15)',
              }}>
                <Icon name="Play" size={13} color="var(--brand)" strokeWidth={2.5}/> Continue Learning
              </button>
              <button onClick={() => onView('quiz')} style={{
                padding:'9px 20px', background:'rgba(255,255,255,0.15)',
                color:'#fff', border:'1.5px solid rgba(255,255,255,0.3)',
                borderRadius:'var(--r)', fontWeight:600,
                fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:6,
                backdropFilter:'blur(8px)',
              }}>
                <Icon name="Pencil" size={13} color="#fff" strokeWidth={2}/> Take Quiz
              </button>
            </div>
          </div>

          {/* Progress ring */}
          <div style={{ textAlign:'center', flexShrink:0 }}>
            <CircleProgress pct={overallPct} color="#fff" size={90}/>
            <div style={{ color:'rgba(255,255,255,0.8)', fontSize:11, fontWeight:600, marginTop:6 }}>
              Overall Progress
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Stats ───────────────────────── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:28 }}>
        {[
          { label:'Courses Assigned', val:'4',    sub:'2 in progress',    icon:'Book',     color:'blue'  },
          { label:'Hours Learned',    val:'14.5', sub:'Target: 20 hrs',   icon:'Clock',    color:'teal'  },
          { label:'Quiz Score',       val:'87%',  sub:'Above average',    icon:'Star',     color:'green' },
          { label:'Certificates',     val:'1',    sub:'1 pending',        icon:'Trophy',   color:'amber' },
        ].map(t => (
          <div key={t.label} style={{
            background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'var(--r3)', padding:'16px 18px',
            boxShadow:'var(--shadow-sm)', display:'flex', alignItems:'center', gap:14,
          }}>
            <div style={{
              width:42, height:42, borderRadius:12, flexShrink:0,
              background:`var(--${t.color}-dim)`,
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <Icon name={t.icon} size={19} color={`var(--${t.color})`}/>
            </div>
            <div>
              <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.4px' }}>
                {t.label}
              </div>
              <div style={{ fontSize:22, fontWeight:800, color:'var(--text)', lineHeight:1.1, margin:'2px 0' }}>
                {t.val}
              </div>
              <div style={{ fontSize:11, color:'var(--text3)' }}>{t.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:20 }}>

        {/* ── My Courses ────────────────────── */}
        <div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
            <div>
              <div className="sec-title">My Courses</div>
              <div className="sec-sub">Pick up where you left off</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={()=>onView('mycourses')}>
              View All <Icon name="ChevronRight" size={13}/>
            </button>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {courses.slice(0,2).map(c => {
              const p = COURSE_PROGS[c.id] || 0;
              const overdue = c.id === 6;
              return (
                <div key={c.id} onClick={()=>onView('mycourses')} style={{
                  background:'var(--bg2)', border:`1.5px solid ${overdue?'rgba(220,38,38,0.2)':'var(--border)'}`,
                  borderRadius:'var(--r3)', padding:'16px',
                  cursor:'pointer', transition:'all 0.15s',
                  display:'flex', alignItems:'center', gap:14,
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.boxShadow='var(--shadow-md)'; e.currentTarget.style.transform='translateY(-1px)'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.boxShadow=''; e.currentTarget.style.transform=''; }}
                >
                  {/* Course icon */}
                  <div style={{
                    width:48, height:48, borderRadius:12, flexShrink:0,
                    background: p === 100 ? 'var(--green-dim)' : overdue ? 'var(--red-dim)' : 'var(--blue-dim)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    border:`1.5px solid ${p===100?'rgba(22,163,74,0.2)':overdue?'rgba(220,38,38,0.2)':'rgba(27,110,243,0.15)'}`,
                  }}>
                    <Icon
                      name={p===100?'Check':'Book'}
                      size={20}
                      color={p===100?'var(--green)':overdue?'var(--red)':'var(--blue)'}
                    />
                  </div>

                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5 }}>
                      <span style={{ fontSize:13.5, fontWeight:700, color:'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {c.title}
                      </span>
                      {overdue && (
                        <span className="badge badge-red" style={{ flexShrink:0 }}>
                          <Icon name="Alert" size={9} strokeWidth={2.5}/> Overdue
                        </span>
                      )}
                      {p === 100 && (
                        <span className="badge badge-green" style={{ flexShrink:0 }}>
                          <Icon name="Check" size={9} strokeWidth={2.5}/> Complete
                        </span>
                      )}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                      <span className="chip"><Icon name="Clock" size={9}/> {c.dur}</span>
                      <span className="chip"><Icon name="Layers" size={9}/> {c.mods} modules</span>
                      <span className="chip"><Icon name="Layers" size={9}/> {c.type}</span>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <div className="prog-bar" style={{ flex:1 }}>
                        <div className={`prog-fill ${progCls(p)}`} style={{ width:`${p}%` }}/>
                      </div>
                      <span style={{ fontSize:12, fontWeight:700, color:progColor(p), fontFamily:'var(--font-mono)', flexShrink:0 }}>
                        {p}%
                      </span>
                    </div>
                  </div>

                  <div style={{ flexShrink:0 }}>
                    <div style={{
                      width:34, height:34, borderRadius:8,
                      background:'var(--brand-dim)', border:'1px solid rgba(27,110,243,0.15)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                    }}>
                      <Icon name={p===0?'Play':p===100?'Refresh':'ChevronRight'} size={15} color="var(--brand)"/>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right Column ─────────────────── */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

          {/* Compliance status */}
          <div style={{
            background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'var(--r3)', padding:'20px',
            boxShadow:'var(--shadow-sm)',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
              <div style={{
                width:32, height:32, borderRadius:8, background:'var(--green-dim)',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <Icon name="Shield" size={15} color="var(--green)"/>
              </div>
              <div>
                <div style={{ fontSize:13.5, fontWeight:700, color:'var(--text)' }}>Compliance Status</div>
                <div style={{ fontSize:11, color:'var(--text3)' }}>3 of 5 complete</div>
              </div>
            </div>
            {[
              { label:'License Valid',         done:true  },
              { label:'Medical Certificate',   done:true  },
              { label:'Annual Refresher',      done:false },
              { label:'DBS Check',             done:true  },
              { label:'BTW Sign-off',          done:false },
            ].map(item => (
              <div key={item.label} style={{
                display:'flex', alignItems:'center', gap:10,
                padding:'7px 0', borderBottom:'1px solid var(--border)',
              }}>
                <div style={{
                  width:20, height:20, borderRadius:'50%', flexShrink:0,
                  background: item.done ? 'var(--green)' : 'var(--bg4)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <Icon name={item.done?'Check':'X'} size={10} color={item.done?'#fff':'var(--text3)'} strokeWidth={2.5}/>
                </div>
                <span style={{ fontSize:12.5, flex:1, color:item.done?'var(--text)':'var(--text3)' }}>
                  {item.label}
                </span>
                {!item.done && (
                  <span className="badge badge-amber" style={{ fontSize:10 }}>
                    Action
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Next BTW Session */}
          <div style={{
            background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'var(--r3)', padding:'20px',
            boxShadow:'var(--shadow-sm)',
            borderTop:'3px solid var(--brand)',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
              <div style={{ width:32, height:32, borderRadius:8, background:'var(--blue-dim)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon name="Car" size={15} color="var(--blue)"/>
              </div>
              <div>
                <div style={{ fontSize:13.5, fontWeight:700, color:'var(--text)' }}>Next BTW Session</div>
                <div style={{ fontSize:11, color:'var(--text3)' }}>Upcoming schedule</div>
              </div>
            </div>
            <div style={{
              background:'var(--brand-dim)', borderRadius:'var(--r)', padding:'10px 12px', marginBottom:12,
              border:'1px solid rgba(27,110,243,0.15)',
            }}>
              <div style={{ fontSize:13, fontWeight:700, color:'var(--brand)' }}>Route 14 — Downtown Loop</div>
              <div style={{ fontSize:11, color:'var(--text3)', marginTop:3, display:'flex', alignItems:'center', gap:4 }}>
                <Icon name="Calendar" size={10}/> April 22, 2025 · 09:00 AM
              </div>
            </div>
            {[
              { icon:'GraduationCap', label:'Trainer',  val:'Elena Marsh' },
              { icon:'Clock',         label:'Duration', val:'2 hours'     },
            ].map(r => (
              <div key={r.label} className="kv-row">
                <span className="kv-key flex items-center gap4">
                  <Icon name={r.icon} size={11}/> {r.label}
                </span>
                <span className="kv-val">{r.val}</span>
              </div>
            ))}
          </div>

          {/* Quiz pending */}
          <div style={{
            background:'linear-gradient(135deg, #FFF7ED, #FFFBEB)',
            border:'1.5px solid rgba(217,119,6,0.2)',
            borderRadius:'var(--r3)', padding:'20px',
            boxShadow:'var(--shadow-sm)',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
              <div style={{ width:32, height:32, borderRadius:8, background:'var(--amber-dim)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon name="Pencil" size={15} color="var(--amber)"/>
              </div>
              <div>
                <div style={{ fontSize:13.5, fontWeight:700, color:'var(--text)' }}>Quiz Pending</div>
                <span className="badge badge-amber" style={{ fontSize:10 }}>Action Required</span>
              </div>
            </div>
            <div style={{ fontSize:13, color:'var(--text2)', marginBottom:12, lineHeight:1.5 }}>
              <strong style={{ color:'var(--text)' }}>Knowledge Check — Module 2</strong>
              <br/>Wet Weather Driving Techniques
            </div>
            <div style={{ display:'flex', gap:8, marginBottom:12 }}>
              <span className="chip"><Icon name="Clock" size={9}/> 10 min</span>
              <span className="chip"><Icon name="Star"  size={9}/> 3 questions</span>
              <span className="chip"><Icon name="Shield" size={9}/> Pass: 80%</span>
            </div>
            <button className="btn btn-primary w100" onClick={()=>onView('quiz')}
              style={{ background:'var(--amber)', boxShadow:'none', borderColor:'var(--amber)' }}>
              <Icon name="Pencil" size={13}/> Start Quiz Now
            </button>
          </div>

        </div>
      </div>
      </div>
  );
}