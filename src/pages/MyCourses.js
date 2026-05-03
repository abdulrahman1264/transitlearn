import React, { useState } from 'react';
import { COURSES, COURSE_PROGS, COURSE_MODULES } from '../data/mockData';
import CircleProgress from '../components/CircleProgress';
import VideoPlayer from '../components/VideoPlayer';
import StatusBadge from '../components/StatusBadge';
import Icon from '../components/Icons';

const ASSIGNED = [1, 2, 3, 4, 5];

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

const CATEGORY_COLORS = {
  'Pre-Service': { color:'var(--blue)',   dim:'var(--blue-dim)'   },
  'In-Service':  { color:'var(--teal)',   dim:'var(--teal-dim)'   },
  'Both':        { color:'var(--purple)', dim:'var(--purple-dim)' },
};

export default function MyCourses() {
  const [selected, setSelected] = useState(null);
  const [activeModule, setActiveModule] = useState(2);
  const courses = COURSES.filter(c => ASSIGNED.includes(c.id));

  // ── Course Detail View ─────────────────────────────────────────
  if (selected) {
    const c    = selected;
    const p    = COURSE_PROGS[c.id] || 0;
    const done = COURSE_MODULES.filter(m => m.done).length;
    const cat  = CATEGORY_COLORS[c.type] || CATEGORY_COLORS['Pre-Service'];

    return (
      <div className="fade-in">

        {/* Back bar */}
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
          <button className="btn btn-ghost btn-sm" onClick={()=>setSelected(null)}>
            <Icon name="ArrowLeft" size={13}/> My Courses
          </button>
          <Icon name="ChevronRight" size={13} color="var(--text3)"/>
          <span style={{ fontSize:13, fontWeight:600, color:'var(--text)', maxWidth:300, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {c.title}
          </span>
          <StatusBadge status={c.status}/>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:20, alignItems:'start' }}>

          {/* ── Left: Video + Modules ────────── */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

            {/* Video player */}
            <VideoPlayer title={c.title} initialPct={p}/>

            {/* Course info bar */}
            <div style={{
              background:'var(--bg2)', border:'1px solid var(--border)',
              borderRadius:'var(--r3)', padding:'14px 18px',
              display:'flex', alignItems:'center', gap:16,
              boxShadow:'var(--shadow-sm)',
            }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:800, color:'var(--text)', letterSpacing:'-0.3px' }}>
                  {c.title}
                </div>
                <div style={{ display:'flex', gap:8, marginTop:6, flexWrap:'wrap' }}>
                  <span className="chip"><Icon name="Layers" size={9}/> {c.type}</span>
                  <span className="chip"><Icon name="Clock"  size={9}/> {c.dur}</span>
                  <span className="chip"><Icon name="Book"   size={9}/> {c.mods} modules</span>
                  <span className="chip"><Icon name="Users"  size={9}/> {c.enrolled} enrolled</span>
                </div>
              </div>
              <CircleProgress pct={p} color={progColor(p)} size={52}/>
            </div>

            {/* Module list */}
            <div style={{
              background:'var(--bg2)', border:'1px solid var(--border)',
              borderRadius:'var(--r3)', overflow:'hidden',
              boxShadow:'var(--shadow-sm)',
            }}>
              {/* Header */}
              <div style={{
                padding:'16px 18px', borderBottom:'1px solid var(--border)',
                display:'flex', alignItems:'center', justifyContent:'space-between',
              }}>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>Course Content</div>
                  <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>
                    {done} of {COURSE_MODULES.length} modules completed
                  </div>
                </div>
                <div className="prog-bar" style={{ width:120 }}>
                  <div className={`prog-fill ${progCls(p)}`} style={{ width:`${p}%` }}/>
                </div>
              </div>

              {/* Modules */}
              {COURSE_MODULES.map((m, i) => {
                const isActive  = i === activeModule;
                const isLocked  = !m.done && !m.active && i > 3;

                return (
                  <div
                    key={i}
                    onClick={() => !isLocked && setActiveModule(i)}
                    style={{
                      display:'flex', alignItems:'center', gap:14,
                      padding:'14px 18px',
                      borderBottom: i < COURSE_MODULES.length-1 ? '1px solid var(--border)' : 'none',
                      background: isActive ? 'var(--brand-dim)' : 'transparent',
                      cursor: isLocked ? 'not-allowed' : 'pointer',
                      opacity: isLocked ? 0.45 : 1,
                      transition:'background 0.13s',
                    }}
                  >
                    {/* Step indicator */}
                    <div style={{
                      width:36, height:36, borderRadius:10, flexShrink:0,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      background: m.done ? 'var(--green)'
                        : isActive ? 'var(--brand)'
                        : 'var(--bg4)',
                      border: `2px solid ${m.done ? 'var(--green)' : isActive ? 'var(--brand)' : 'var(--border2)'}`,
                    }}>
                      {m.done
                        ? <Icon name="Check"  size={14} color="#fff" strokeWidth={2.5}/>
                        : isLocked
                        ? <Icon name="Lock"   size={13} color="var(--text3)"/>
                        : isActive
                        ? <Icon name="Play"   size={13} color="#fff" strokeWidth={2}/>
                        : <span style={{ fontSize:12, fontWeight:700, color:'var(--text3)', fontFamily:'var(--font-mono)' }}>{i+1}</span>
                      }
                    </div>

                    {/* Info */}
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                        <span style={{
                          fontSize:13.5, fontWeight: isActive ? 700 : 600,
                          color: isActive ? 'var(--brand)' : m.done ? 'var(--text)' : 'var(--text2)',
                        }}>{m.title}</span>
                        {isActive && (
                          <span className="badge badge-blue" style={{ fontSize:9 }}>
                            <Icon name="Zap" size={9} strokeWidth={2.5}/> Now Playing
                          </span>
                        )}
                      </div>
                      <div style={{ display:'flex', gap:6 }}>
                        <span className="chip" style={{ fontSize:10 }}>
                          {m.type === 'video'
                            ? <><Icon name="Video" size={9}/> Video</>
                            : <><Icon name="Pencil" size={9}/> Quiz</>
                          }
                        </span>
                        <span className="chip" style={{ fontSize:10 }}>
                          <Icon name="Clock" size={9}/> {m.dur}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    {m.done && !isActive && (
                      <span className="badge badge-green" style={{ fontSize:10 }}>Done</span>
                    )}
                    {isActive && (
                      <button className="btn btn-primary btn-sm">
                        {m.type === 'video'
                          ? <><Icon name="Play"   size={11}/> Watch</>
                          : <><Icon name="Pencil" size={11}/> Start</>
                        }
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right: Info cards ───────────── */}
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>

            {/* Progress card */}
            <div style={{
              background:'var(--bg2)', border:'1px solid var(--border)',
              borderRadius:'var(--r3)', padding:'20px',
              boxShadow:'var(--shadow-sm)',
              borderTop:`3px solid ${progColor(p)}`,
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
                <CircleProgress pct={p} color={progColor(p)} size={72}/>
                <div>
                  <div style={{ fontSize:26, fontWeight:800, color:'var(--text)', lineHeight:1 }}>{p}%</div>
                  <div style={{ fontSize:12, color:'var(--text3)', marginTop:3 }}>Course Progress</div>
                  <StatusBadge status={p===100?'Completed':'In-Service'}/>
                </div>
              </div>
              <div className="prog-bar" style={{ height:8, marginBottom:8 }}>
                <div className={`prog-fill ${progCls(p)}`} style={{ width:`${p}%` }}/>
              </div>
              <div style={{ fontSize:11, color:'var(--text3)', textAlign:'right' }}>
                {done} of {COURSE_MODULES.length} modules complete
              </div>
            </div>

            {/* Course details */}
            <div style={{
              background:'var(--bg2)', border:'1px solid var(--border)',
              borderRadius:'var(--r3)', padding:'18px',
              boxShadow:'var(--shadow-sm)',
            }}>
              <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:14 }}>
                Course Details
              </div>
              {[
                { key:'Category',  val:c.type,              icon:'Layers'   },
                { key:'Modules',   val:`${c.mods} modules`, icon:'Book'     },
                { key:'Duration',  val:c.dur,               icon:'Clock'    },
                { key:'Status',    val:c.status,            icon:'Zap'      },
                { key:'Enrolled',  val:`${c.enrolled}`,     icon:'Users'    },
                { key:'Due Date',  val:'May 30, 2025',      icon:'Calendar' },
              ].map(r => (
                <div key={r.key} className="kv-row">
                  <span className="kv-key" style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <Icon name={r.icon} size={11}/> {r.key}
                  </span>
                  <span className="kv-val" style={{ fontSize:12 }}>{r.val}</span>
                </div>
              ))}
            </div>

            {/* DRM notice */}
            <div style={{
              background:'var(--amber-dim)', border:'1px solid rgba(217,119,6,0.2)',
              borderRadius:'var(--r3)', padding:'14px 16px',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:7 }}>
                <Icon name="Shield" size={13} color="var(--amber)"/>
                <span style={{ fontSize:12, fontWeight:700, color:'var(--amber)' }}>DRM Protected</span>
              </div>
              <div style={{ fontSize:11.5, color:'var(--text2)', lineHeight:1.55 }}>
                Videos are encrypted and licensed to your account only. Cannot be downloaded or shared.
              </div>
              <div style={{ display:'flex', gap:6, marginTop:8 }}>
                <span className="chip" style={{ fontSize:10 }}><Icon name="Lock" size={9}/> Widevine L1</span>
                <span className="chip" style={{ fontSize:10 }}><Icon name="Shield" size={9}/> HLS/DASH</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ── Course Grid ──────────────────────────────────────────────────
  const completed   = courses.filter(c => (COURSE_PROGS[c.id]||0) === 100).length;
  const inProgress  = courses.filter(c => { const p = COURSE_PROGS[c.id]||0; return p > 0 && p < 100; }).length;
  const notStarted  = courses.filter(c => (COURSE_PROGS[c.id]||0) === 0).length;

  return (
    <div className="fade-in">

      {/* Header */}
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px', marginBottom:4 }}>
          My Learning
        </div>
        <div style={{ fontSize:13, color:'var(--text3)' }}>
          {courses.length} courses assigned to you
        </div>
      </div>

      {/* Progress summary */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:28 }}>
        {[
          { label:'Total Courses',  val:courses.length, color:'blue',  icon:'Book'    },
          { label:'In Progress',    val:inProgress,     color:'amber', icon:'Play'    },
          { label:'Completed',      val:completed,      color:'green', icon:'Check'   },
          { label:'Not Started',    val:notStarted,     color:'red',   icon:'Clock'   },
        ].map(t => (
          <div key={t.label} style={{
            background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'var(--r2)', padding:'14px 16px',
            display:'flex', alignItems:'center', gap:12,
            boxShadow:'var(--shadow-sm)',
          }}>
            <div style={{
              width:36, height:36, borderRadius:10,
              background:`var(--${t.color}-dim)`,
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <Icon name={t.icon} size={15} color={`var(--${t.color})`}/>
            </div>
            <div>
              <div style={{ fontSize:22, fontWeight:800, color:'var(--text)', lineHeight:1 }}>{t.val}</div>
              <div style={{ fontSize:10, color:'var(--text3)', fontWeight:600, marginTop:2 }}>{t.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Course cards — Udemy style */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        {courses.map(c => {
          const p   = COURSE_PROGS[c.id] || 0;
          const cat = CATEGORY_COLORS[c.type] || CATEGORY_COLORS['Pre-Service'];
          return (
            <div
              key={c.id}
              onClick={() => setSelected(c)}
              style={{
                background:'var(--bg2)', border:'1px solid var(--border)',
                borderRadius:'var(--r3)', overflow:'hidden',
                cursor:'pointer', transition:'all 0.18s ease',
                boxShadow:'var(--shadow-sm)',
              }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='var(--shadow-md)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='var(--shadow-sm)'; }}
            >
              {/* Course thumbnail */}
              <div style={{
                height:110, position:'relative',
                background:`linear-gradient(135deg, ${cat.dim}, ${cat.color}22)`,
                display:'flex', alignItems:'center', justifyContent:'center',
                borderBottom:'1px solid var(--border)',
              }}>
                <div style={{
                  width:52, height:52, borderRadius:14,
                  background:'rgba(255,255,255,0.9)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  boxShadow:'0 4px 12px rgba(0,0,0,0.10)',
                }}>
                  <Icon name="Book" size={24} color={cat.color}/>
                </div>

                {/* Status overlay */}
                <div style={{ position:'absolute', top:10, right:10 }}>
                  <StatusBadge status={c.status}/>
                </div>

                {p === 100 && (
                  <div style={{
                    position:'absolute', top:10, left:10,
                    width:28, height:28, borderRadius:'50%',
                    background:'var(--green)', display:'flex',
                    alignItems:'center', justifyContent:'center',
                    boxShadow:'0 2px 8px rgba(22,163,74,0.4)',
                  }}>
                    <Icon name="Check" size={13} color="#fff" strokeWidth={2.5}/>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div style={{ padding:'16px' }}>
                <div style={{ fontSize:13.5, fontWeight:700, color:'var(--text)', lineHeight:1.3, marginBottom:8 }}>
                  {c.title}
                </div>

                <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:12 }}>
                  <span className="chip" style={{ fontSize:10 }}><Icon name="Clock" size={9}/> {c.dur}</span>
                  <span className="chip" style={{ fontSize:10 }}><Icon name="Book"  size={9}/> {c.mods} mods</span>
                  <span style={{
                    display:'inline-flex', alignItems:'center', gap:3,
                    padding:'2px 7px', borderRadius:5, fontSize:10, fontWeight:600,
                    background:cat.dim, color:cat.color,
                  }}>{c.type}</span>
                </div>

                {/* Progress */}
                <div style={{ marginBottom:12 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5 }}>
                    <span style={{ fontSize:11, color:'var(--text3)', fontWeight:500 }}>
                      {p === 0 ? 'Not started' : p === 100 ? 'Completed!' : 'In progress'}
                    </span>
                    <span style={{ fontSize:12, fontWeight:700, color:progColor(p), fontFamily:'var(--font-mono)' }}>
                      {p}%
                    </span>
                  </div>
                  <div className="prog-bar" style={{ height:5 }}>
                    <div className={`prog-fill ${progCls(p)}`} style={{ width:`${p}%` }}/>
                  </div>
                </div>

                {/* CTA button */}
                <button style={{
                  width:'100%', padding:'9px',
                  background: p === 100 ? 'var(--green-dim)' : p === 0 ? 'var(--brand)' : 'var(--brand)',
                  color: p === 100 ? 'var(--green)' : '#fff',
                  border: p === 100 ? '1px solid rgba(22,163,74,0.2)' : 'none',
                  borderRadius:'var(--r)', fontSize:13, fontWeight:700,
                  cursor:'pointer', display:'flex', alignItems:'center',
                  justifyContent:'center', gap:6, transition:'all 0.13s',
                  boxShadow: p === 100 ? 'none' : 'var(--shadow-brand)',
                }}>
                  {p === 0
                    ? <><Icon name="Play"    size={13} color="#fff" strokeWidth={2}/> Start Course</>
                    : p === 100
                    ? <><Icon name="Refresh" size={13} color="var(--green)"/> Review</>
                    : <><Icon name="Play"    size={13} color="#fff" strokeWidth={2}/> Continue</>
                  }
                </button>
              </div>
            </div>
          );
        })}
      </div>
      </div>
  );
}