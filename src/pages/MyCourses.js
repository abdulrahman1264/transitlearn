import React, { useState } from 'react';
import { COURSES, COURSE_PROGS, COURSE_MODULES } from '../data/mockData';
import CircleProgress from '../components/CircleProgress';
import VideoPlayer from '../components/VideoPlayer';
import StatusBadge from '../components/StatusBadge';
import Icon from '../components/Icons';

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

const ASSIGNED = [1, 2, 3, 4, 5];

export default function MyCourses() {
  const [selected, setSelected] = useState(null);
  const courses = COURSES.filter(c => ASSIGNED.includes(c.id));

  if (selected) {
    const c   = selected;
    const p   = COURSE_PROGS[c.id] || 0;
    const done = COURSE_MODULES.filter(m => m.done).length;

    return (
      <div className="fade-in">

        {/* Back bar */}
        <div className="flex items-center gap12 mb24">
          <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>
            <Icon name="ArrowLeft" size={13} /> Back to Courses
          </button>
          <span style={{ color:'var(--text3)', fontSize:13 }}>›</span>
          <span style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{c.title}</span>
          <StatusBadge status={c.status} />
        </div>

        <div className="g2-1" style={{ alignItems:'start' }}>

          {/* Left — Video + Modules */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <VideoPlayer title={c.title} initialPct={p} />

            {/* Module list */}
            <div className="card">
              <div className="sec-head">
                <div>
                  <div className="sec-title">Course Modules</div>
                  <div className="sec-sub">{done} of {COURSE_MODULES.length} completed</div>
                </div>
                <span className="chip">
                  <Icon name="Clock" size={10} /> {c.dur} total
                </span>
              </div>

              {COURSE_MODULES.map((m, i) => {
                const isLocked  = !m.done && !m.active && i > 2;
                const isActive  = !!m.active;
                return (
                  <div key={i} style={{
                    display:'flex', alignItems:'center', gap:14,
                    padding:'13px 0',
                    borderBottom: i < COURSE_MODULES.length - 1 ? '1px solid var(--border)' : 'none',
                    opacity: isLocked ? 0.45 : 1,
                  }}>
                    {/* State indicator */}
                    <div style={{
                      width:32, height:32, borderRadius:'50%', flexShrink:0,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      background: m.done   ? 'var(--green-dim)'
                                : isActive ? 'var(--blue-dim)'
                                : 'var(--bg4)',
                      border: `1.5px solid ${
                        m.done   ? 'var(--green)'
                        : isActive ? 'var(--blue)'
                        : 'var(--border2)'
                      }`,
                    }}>
                      {m.done
                        ? <Icon name="Check"  size={13} color="var(--green)"  strokeWidth={2.5} />
                        : isActive
                        ? <Icon name="Play"   size={12} color="var(--blue)"   strokeWidth={2}   />
                        : isLocked
                        ? <Icon name="Lock"   size={12} color="var(--text3)"  strokeWidth={1.75}/>
                        : <span style={{ fontSize:11, color:'var(--text3)', fontFamily:'var(--font-mono)', fontWeight:700 }}>{i+1}</span>
                      }
                    </div>

                    {/* Info */}
                    <div style={{ flex:1 }}>
                      <div className="flex items-center gap8">
                        <span style={{
                          fontSize:13.5, fontWeight: isActive ? 700 : 600,
                          color: isActive ? 'var(--blue)' : m.done ? 'var(--text)' : 'var(--text2)'
                        }}>{m.title}</span>
                        {isActive && (
                          <span className="badge badge-blue">
                            <Icon name="Zap" size={9} strokeWidth={2.5}/> Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap8" style={{ marginTop:4 }}>
                        <span className="chip">
                          {m.type === 'video'
                            ? <><Icon name="Video"  size={10}/> Video</>
                            : <><Icon name="Pencil" size={10}/> Quiz</>
                          }
                        </span>
                        <span style={{ fontSize:11, color:'var(--text3)' }}>
                          <Icon name="Clock" size={10}/> {m.dur}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    {isActive && (
                      <button className="btn btn-primary btn-sm">
                        {m.type === 'video'
                          ? <><Icon name="Play"   size={12}/> Watch</>
                          : <><Icon name="Pencil" size={12}/> Start</>
                        }
                      </button>
                    )}
                    {m.done && (
                      <button className="btn btn-ghost btn-sm">
                        <Icon name="Refresh" size={12}/> Replay
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — Info cards */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

            {/* Progress card */}
            <div className="card card-accent-blue">
              <div className="sec-head">
                <div className="sec-title">Your Progress</div>
                <Icon name="BarChart" size={15} color="var(--text3)" />
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:16 }}>
                <CircleProgress pct={p} color={progColor(p)} size={80} />
                <div>
                  <div style={{ fontFamily:'var(--font-head)', fontSize:26, fontWeight:800, color:'var(--text)' }}>{p}%</div>
                  <div style={{ fontSize:12, color:'var(--text3)' }}>Overall completion</div>
                  <div style={{ marginTop:8 }}>
                    <StatusBadge status={p === 100 ? 'Completed' : 'In-Service'} />
                  </div>
                </div>
              </div>
              <div className="prog-bar" style={{ height:8, marginBottom:8 }}>
                <div className={`prog-fill ${progCls(p)}`} style={{ width:`${p}%` }} />
              </div>
              <div style={{ fontSize:12, color:'var(--text3)', textAlign:'right' }}>
                {done} of {COURSE_MODULES.length} modules complete
              </div>
            </div>

            {/* DRM Notice */}
            <div className="card card-accent-amber">
              <div className="flex items-center gap8 mb12">
                <Icon name="Shield" size={15} color="var(--amber)" />
                <span style={{ fontWeight:700, fontSize:13, color:'var(--text)' }}>DRM Protected Content</span>
              </div>
              <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.6 }}>
                This course uses Widevine DRM encryption. Videos are licensed to your account only and cannot be downloaded or shared.
              </div>
              <div style={{ marginTop:10 }}>
                <span className="chip"><Icon name="Lock" size={10}/> HLS / DASH Streaming</span>
                {' '}
                <span className="chip"><Icon name="Shield" size={10}/> Widevine L1</span>
              </div>
            </div>

            {/* Course Details */}
            <div className="card">
              <div className="sec-head">
                <div className="sec-title">Course Details</div>
              </div>
              {[
                { key:'Type',      val: c.type,                    icon:'Layers'    },
                { key:'Modules',   val: `${c.mods} modules`,       icon:'Book'      },
                { key:'Duration',  val: c.dur,                     icon:'Clock'     },
                { key:'Status',    val: c.status,                  icon:'Zap'       },
                { key:'Enrolled',  val: `${c.enrolled} drivers`,   icon:'Users'     },
                { key:'Due Date',  val: 'May 30, 2025',            icon:'Calendar'  },
              ].map(r => (
                <div key={r.key} className="kv-row">
                  <span className="kv-key flex items-center gap4">
                    <Icon name={r.icon} size={11} /> {r.key}
                  </span>
                  <span className="kv-val">{r.val}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ── Course Grid ────────────────────────────────────────────────
  return (
    <div className="fade-in">
      <div className="sec-head mb24">
        <div>
          <div className="sec-title">My Courses</div>
          <div className="sec-sub">{courses.length} courses assigned to you</div>
        </div>
        <div className="flex items-center gap8">
          <span className="chip"><Icon name="Filter" size={11}/> All Types</span>
          <button className="btn btn-ghost btn-sm">
            <Icon name="BarChart" size={12}/> My Progress
          </button>
        </div>
      </div>

      <div className="g3">
        {courses.map(c => {
          const p = COURSE_PROGS[c.id] || 0;
          return (
            <div key={c.id}
              className="card"
              onClick={() => setSelected(c)}
              style={{
                cursor:'pointer', transition:'all 0.18s ease',
                borderTop: `3px solid ${c.status === 'Published' ? 'var(--blue)' : 'var(--amber)'}`,
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
              {/* Top row */}
              <div className="flex items-center justify-between mb12">
                <StatusBadge status={c.status} />
                <CircleProgress pct={p} color={progColor(p)} size={44} />
              </div>

              {/* Title */}
              <div style={{
                fontFamily:'var(--font-head)', fontSize:15, fontWeight:800,
                color:'var(--text)', lineHeight:1.3, marginBottom:10
              }}>{c.title}</div>

              {/* Chips */}
              <div className="flex items-center gap8 mb12" style={{ flexWrap:'wrap' }}>
                <span className="chip"><Icon name="Layers" size={10}/> {c.type}</span>
                <span className="chip"><Icon name="Clock"  size={10}/> {c.dur}</span>
                <span className="chip"><Icon name="Book"   size={10}/> {c.mods} mods</span>
              </div>

              <hr className="separator" style={{ margin:'12px 0' }} />

              {/* Progress bar */}
              <div className="flex items-center justify-between mb8">
                <span style={{ fontSize:11, color:'var(--text3)', fontWeight:600 }}>Progress</span>
                <span style={{ fontSize:12, fontFamily:'var(--font-mono)', fontWeight:700, color: progColor(p) }}>{p}%</span>
              </div>
              <div className="prog-bar">
                <div className={`prog-fill ${progCls(p)}`} style={{ width:`${p}%` }} />
              </div>

              <button className="btn btn-primary w100" style={{ marginTop:14 }}>
                {p === 0   ? <><Icon name="Play"    size={13}/> Start Course</>
                : p === 100 ? <><Icon name="Refresh" size={13}/> Review</>
                :             <><Icon name="Play"    size={13}/> Continue</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}