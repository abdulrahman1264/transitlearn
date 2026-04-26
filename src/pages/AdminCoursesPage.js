import React, { useState } from 'react';
import Icon from '../components/Icons';

const PENDING_COURSES = [
  {
    id:3, title:'Route Navigation & GPS Systems',
    category:'Public Bus — Pre Service',
    trainer:'Elena Marsh', trainerAvatar:'EM',
    submitted:'2025-04-10', status:'Pending Approval',
    modules:[
      { title:'GPS Basics', type:'video', dur:'15 min', file:'gps_basics.mp4' },
      { title:'Route Planning Guide', type:'pdf', dur:'10 min read', file:'route_planning.pdf' },
      { title:'Navigation Assessment', type:'quiz', dur:'10 min', questions:[
        { q:'What does GPS stand for?', opts:['Global Positioning System','General Purpose Software','Ground Positioning Satellite','Global Processing System'], correct:0 },
        { q:'When should you check your route?', opts:['During driving','Before starting','After completing','Never'], correct:1 },
      ]},
    ],
    description:'Comprehensive guide to route navigation and GPS systems for bus drivers operating in Dubai.',
  },
  {
    id:5, title:'Night Driving Safety',
    category:'Public Bus — In Service',
    trainer:'Tom Alvarez', trainerAvatar:'TA',
    submitted:'2025-04-12', status:'Pending Approval',
    modules:[
      { title:'Night Vision Techniques', type:'video', dur:'20 min', file:'night_driving.mp4' },
      { title:'Night Safety Quiz', type:'quiz', dur:'10 min', questions:[
        { q:'What is the most important factor in night driving?', opts:['Speed','Visibility','Music','Temperature'], correct:1 },
      ]},
    ],
    description:'Essential safety procedures and techniques for driving in low-light and night conditions.',
  },
];

const ALL_COURSES = [
  ...PENDING_COURSES,
  { id:1, title:'Pre-Service Orientation',        category:'Public Bus — Pre Service', trainer:'Elena Marsh', trainerAvatar:'EM', submitted:'2025-01-15', status:'Published',  modules:[], description:'Core orientation for new bus drivers.' },
  { id:2, title:'Defensive Driving Fundamentals', category:'Public Bus — In Service',  trainer:'Elena Marsh', trainerAvatar:'EM', submitted:'2025-02-05', status:'Published',  modules:[], description:'Defensive driving techniques for experienced drivers.' },
  { id:4, title:'Child Safety Procedures',         category:'School Bus Training',      trainer:'Tom Alvarez', trainerAvatar:'TA', submitted:null,         status:'Draft',      modules:[], description:'Child safety for school bus drivers.' },
];

const STATUS_STYLES = {
  'Published':        { cls:'badge-green',  icon:'Check'  },
  'Pending Approval': { cls:'badge-amber',  icon:'Clock'  },
  'Draft':            { cls:'badge-gray',   icon:'Edit'   },
  'Rejected':         { cls:'badge-red',    icon:'X'      },
  'Approved':         { cls:'badge-green',  icon:'Check'  },
};

function CourseReviewModal({ course, onClose, onApprove, onReject }) {
  const [activeModule, setActiveModule] = useState(0);
  const [rejectNote,   setRejectNote]   = useState('');
  const [showReject,   setShowReject]   = useState(false);
  const mod = course.modules[activeModule];

  const typeColor = { video:'var(--blue)', pdf:'var(--red)', quiz:'var(--amber)' };
  const typeDim   = { video:'var(--blue-dim)', pdf:'var(--red-dim)', quiz:'var(--amber-dim)' };
  const typeIcon  = { video:'Video', pdf:'FileText', pptx:'Layers', quiz:'Pencil' };
  const typeColor2 = { video:'var(--blue)', pdf:'var(--red)', pptx:'var(--purple)', quiz:'var(--amber)' };
  const typeDim2   = { video:'var(--blue-dim)', pdf:'var(--red-dim)', pptx:'var(--purple-dim)', quiz:'var(--amber-dim)' };

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:3000,
      background:'rgba(0,0,0,0.5)', backdropFilter:'blur(6px)',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:24,
    }} onClick={onClose}>
      <div style={{
        background:'var(--bg2)', borderRadius:'var(--r3)',
        width:'90vw', maxWidth:1000, maxHeight:'90vh',
        overflow:'auto', boxShadow:'var(--shadow-lg)',
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{
          padding:'20px 24px', borderBottom:'1px solid var(--border)',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          position:'sticky', top:0, background:'var(--bg2)', zIndex:1,
        }}>
          <div>
            <div style={{ fontSize:17, fontWeight:800, color:'var(--text)', letterSpacing:'-0.3px' }}>
              Review Course
            </div>
            <div style={{ fontSize:12, color:'var(--text3)', marginTop:3 }}>
              Submitted by {course.trainer} · {course.submitted}
            </div>
          </div>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <button onClick={onClose} className="btn btn-ghost btn-sm">
              <Icon name="X" size={13}/> Close
            </button>
          </div>
        </div>

        {/* Course banner */}
        <div style={{
          background:'linear-gradient(135deg, var(--brand) 0%, #1458C8 100%)',
          padding:'20px 24px',
        }}>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.65)', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.5px' }}>
            {course.category}
          </div>
          <div style={{ fontSize:20, fontWeight:800, color:'#fff', marginBottom:6 }}>
            {course.title}
          </div>
          <div style={{ fontSize:13, color:'rgba(255,255,255,0.75)', marginBottom:14 }}>
            {course.description}
          </div>
          <div style={{ display:'flex', gap:10 }}>
            {[
              { icon:'Book',   label:`${course.modules.length} modules` },
              { icon:'Video',  label:`${course.modules.filter(m=>m.type==='video').length} videos` },
              { icon:'FileText',label:`${course.modules.filter(m=>m.type==='pdf').length} PDFs` },
              { icon:'Pencil', label:`${course.modules.filter(m=>m.type==='quiz').length} quizzes` },
            ].map(s => (
              <span key={s.label} style={{
                background:'rgba(255,255,255,0.15)', color:'#fff',
                fontSize:11, fontWeight:600, padding:'4px 10px',
                borderRadius:6, display:'flex', alignItems:'center', gap:5,
              }}>
                <Icon name={s.icon} size={10} color="#fff"/> {s.label}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:0 }}>

          {/* Left — module viewer */}
          <div style={{ padding:24, borderRight:'1px solid var(--border)' }}>
            {mod ? (
              <>
                {/* Video module */}
                {mod.type === 'video' && (
                  <div style={{
                    background:'linear-gradient(135deg, #0A0F1E, #1A2744)',
                    borderRadius:'var(--r2)', aspectRatio:'16/9',
                    display:'flex', flexDirection:'column',
                    alignItems:'center', justifyContent:'center',
                    marginBottom:16, position:'relative',
                  }}>
                    <div style={{ fontSize:48, marginBottom:10 }}>🚌</div>
                    <div style={{
                      width:52, height:52, borderRadius:'50%',
                      background:'rgba(255,255,255,0.15)',
                      border:'2px solid rgba(255,255,255,0.3)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      marginBottom:12,
                    }}>
                      <Icon name="Play" size={20} color="#fff" strokeWidth={2}/>
                    </div>
                    <div style={{ fontSize:14, color:'rgba(255,255,255,0.8)', fontWeight:600 }}>{mod.title}</div>
                    <div style={{ position:'absolute', top:10, right:10, background:'rgba(0,0,0,0.55)', color:'rgba(255,255,255,0.55)', fontSize:9, fontFamily:'var(--font-mono)', padding:'3px 8px', borderRadius:5 }}>
                      {mod.file} · {mod.dur}
                    </div>
                    <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'rgba(0,0,0,0.8)', padding:'10px 16px', display:'flex', gap:10, alignItems:'center' }}>
                      <Icon name="Play" size={13} color="rgba(255,255,255,0.6)"/>
                      <div style={{ flex:1, height:3, background:'rgba(255,255,255,0.15)', borderRadius:10 }}/>
                      <span style={{ fontSize:11, color:'rgba(255,255,255,0.4)', fontFamily:'var(--font-mono)' }}>{mod.dur}</span>
                    </div>
                  </div>
                )}

                {/* PDF module */}
                {mod.type === 'pdf' && (
                  <div style={{
                    background:'#f0f0f0', borderRadius:'var(--r2)',
                    padding:'32px', display:'flex', alignItems:'center',
                    justifyContent:'center', marginBottom:16, minHeight:200,
                  }}>
                    <div style={{
                      background:'#fff', borderRadius:'var(--r)', padding:'28px 36px',
                      maxWidth:400, width:'100%', boxShadow:'0 2px 12px rgba(0,0,0,0.1)',
                      textAlign:'center',
                    }}>
                      <Icon name="FileText" size={32} color="var(--red)"/>
                      <div style={{ fontSize:15, fontWeight:800, color:'#002060', marginTop:10 }}>{mod.title}</div>
                      <div style={{ fontSize:11, color:'#888', marginTop:6 }}>{mod.file} · {mod.dur}</div>
                      <div style={{ fontSize:12, color:'#555', marginTop:12, lineHeight:1.6 }}>
                        PDF document ready for review. Click to open full document.
                      </div>
                    </div>
                  </div>
                )}

                {/* Quiz module */}
                {mod.type === 'quiz' && (
                  <div style={{
                    background:'var(--bg3)', borderRadius:'var(--r2)',
                    padding:'20px', marginBottom:16,
                    border:'1px solid var(--border)',
                  }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
                      <Icon name="Pencil" size={16} color="var(--amber)"/>
                      <span style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>{mod.title}</span>
                      <span className="badge badge-amber">{mod.questions?.length || 0} questions</span>
                    </div>
                    {(mod.questions || []).map((q, qi) => (
                      <div key={qi} style={{
                        background:'var(--bg2)', borderRadius:'var(--r)',
                        padding:'14px', marginBottom:10, border:'1px solid var(--border)',
                      }}>
                        <div style={{ fontSize:13, fontWeight:600, color:'var(--text)', marginBottom:10 }}>
                          Q{qi+1}: {q.q}
                        </div>
                        {q.opts.map((opt, oi) => (
                          <div key={oi} style={{
                            display:'flex', alignItems:'center', gap:8,
                            padding:'6px 8px', borderRadius:6, marginBottom:4,
                            background: oi===q.correct ? 'var(--green-dim)' : 'transparent',
                            border:`1px solid ${oi===q.correct ? 'rgba(22,163,74,0.2)' : 'transparent'}`,
                          }}>
                            <div style={{
                              width:16, height:16, borderRadius:'50%', flexShrink:0,
                              background: oi===q.correct ? 'var(--green)' : 'var(--bg4)',
                              display:'flex', alignItems:'center', justifyContent:'center',
                            }}>
                              {oi===q.correct && <Icon name="Check" size={9} color="#fff" strokeWidth={3}/>}
                            </div>
                            <span style={{ fontSize:12, color: oi===q.correct ? 'var(--green)' : 'var(--text2)', fontWeight: oi===q.correct ? 700 : 400 }}>
                              {opt}
                            </span>
                            {oi===q.correct && (
                              <span style={{ fontSize:10, color:'var(--green)', fontWeight:600, marginLeft:'auto' }}>✓ Correct</span>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {/* Nav */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <button className="btn btn-ghost btn-sm"
                    disabled={activeModule===0}
                    onClick={() => setActiveModule(i => i-1)}>
                    <Icon name="ArrowLeft" size={12}/> Previous
                  </button>
                  <span style={{ fontSize:12, color:'var(--text3)' }}>
                    {activeModule+1} of {course.modules.length}
                  </span>
                  <button className="btn btn-primary btn-sm"
                    disabled={activeModule===course.modules.length-1}
                    onClick={() => setActiveModule(i => i+1)}>
                    Next <Icon name="ChevronRight" size={12}/>
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📚</div>
                <div>No modules to review</div>
              </div>
            )}
          </div>

          {/* Right — module list + actions */}
          <div style={{ padding:20, display:'flex', flexDirection:'column', gap:14 }}>

            {/* Module list */}
            <div>
              <div style={{ fontSize:12, fontWeight:700, color:'var(--text)', marginBottom:10 }}>
                Modules ({course.modules.length})
              </div>
              {course.modules.map((m, i) => (
                <div key={i}
                  onClick={() => setActiveModule(i)}
                  style={{
                    display:'flex', alignItems:'center', gap:9, padding:'9px 10px',
                    borderRadius:'var(--r)', cursor:'pointer', marginBottom:5,
                    background: activeModule===i ? typeDim[m.type] : 'var(--bg3)',
                    border:`1px solid ${activeModule===i ? typeColor[m.type]+'33' : 'var(--border)'}`,
                    transition:'all 0.13s',
                  }}>
                  <div style={{
                    width:26, height:26, borderRadius:7, flexShrink:0,
                    background: activeModule===i ? typeColor[m.type] : 'var(--bg4)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    <Icon name={typeIcon[m.type]||'Book'} size={12}
                      color={activeModule===i ? '#fff' : 'var(--text3)'}/>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, fontWeight:600, color: activeModule===i ? typeColor[m.type] : 'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {m.title}
                    </div>
                    <div style={{ fontSize:10, color:'var(--text3)' }}>{m.type} · {m.dur}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trainer info */}
            <div style={{ padding:'12px', background:'var(--bg3)', borderRadius:'var(--r2)', border:'1px solid var(--border)' }}>
              <div style={{ fontSize:11, fontWeight:700, color:'var(--text3)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.5px' }}>
                Submitted By
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{
                  width:34, height:34, borderRadius:9, flexShrink:0,
                  background:'var(--teal-dim)', color:'var(--teal)',
                  border:'1px solid rgba(8,145,178,0.2)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:11, fontWeight:700, fontFamily:'var(--font-mono)',
                }}>{course.trainerAvatar}</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{course.trainer}</div>
                  <div style={{ fontSize:11, color:'var(--text3)' }}>Submitted {course.submitted}</div>
                </div>
              </div>
            </div>

            {/* Reject note */}
            {showReject && (
              <div>
                <label className="form-label">Rejection Reason *</label>
                <textarea className="form-input" rows={3}
                  placeholder="Explain why this course needs changes..."
                  value={rejectNote}
                  onChange={e => setRejectNote(e.target.value)}/>
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:'auto' }}>
              {!showReject ? (
                <>
                  <button
                    className="btn btn-primary w100"
                    style={{ background:'var(--green)', borderColor:'var(--green)', boxShadow:'0 4px 12px rgba(22,163,74,0.3)' }}
                    onClick={() => { onApprove(course.id); onClose(); }}>
                    <Icon name="Check" size={14}/> Approve & Publish
                  </button>
                  <button
                    className="btn btn-danger w100"
                    onClick={() => setShowReject(true)}>
                    <Icon name="X" size={14}/> Reject Course
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-danger w100"
                    disabled={!rejectNote.trim()}
                    onClick={() => { onReject(course.id, rejectNote); onClose(); }}>
                    <Icon name="Send" size={14}/> Send Rejection
                  </button>
                  <button className="btn btn-ghost w100" onClick={() => setShowReject(false)}>
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminCoursesPage() {
  const [courses,    setCourses]    = useState(ALL_COURSES);
  const [reviewing,  setReviewing]  = useState(null);
  const [filter,     setFilter]     = useState('Pending Approval');
  const [search,     setSearch]     = useState('');
  const [toast,      setToast]      = useState('');

  const showToast = (msg, type='green') => {
    setToast({ msg, type });
    setTimeout(() => setToast(''), 3500);
  };

  const handleApprove = (id) => {
    setCourses(prev => prev.map(c =>
      c.id===id ? { ...c, status:'Published', approvedAt:new Date().toISOString().slice(0,10) } : c
    ));
    showToast('✅ Course approved and published to drivers!', 'green');
  };

  const handleReject = (id, note) => {
    setCourses(prev => prev.map(c =>
      c.id===id ? { ...c, status:'Rejected', rejectNote:note } : c
    ));
    showToast('❌ Course rejected — trainer has been notified', 'red');
  };

  const pending   = courses.filter(c => c.status === 'Pending Approval');
  const published = courses.filter(c => c.status === 'Published');
  const rejected  = courses.filter(c => c.status === 'Rejected');

  const filtered = courses.filter(c => {
    const matchFilter = filter==='All' || c.status===filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                        c.category.toLowerCase().includes(search.toLowerCase()) ||
                        c.trainer.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="fade-in">

      {/* Toast */}
      {toast && (
        <div style={{
          position:'fixed', top:20, right:20, zIndex:4000,
          background: toast.type==='green' ? 'var(--green-dim)' : 'var(--red-dim)',
          border:`1px solid ${toast.type==='green'?'rgba(22,163,74,0.3)':'rgba(220,38,38,0.3)'}`,
          borderRadius:'var(--r2)', padding:'12px 18px',
          fontSize:13, fontWeight:600,
          color: toast.type==='green' ? 'var(--green)' : 'var(--red)',
          boxShadow:'var(--shadow-lg)',
          display:'flex', alignItems:'center', gap:8,
        }}>
          {toast.msg}
        </div>
      )}

      {/* Review modal */}
      {reviewing && (
        <CourseReviewModal
          course={reviewing}
          onClose={() => setReviewing(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>
            Course Approvals
          </div>
          <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>
            Review and approve trainer-submitted courses before publishing to drivers
          </div>
        </div>
        {pending.length > 0 && (
          <div style={{
            background:'var(--amber-dim)', border:'1px solid rgba(217,119,6,0.2)',
            borderRadius:'var(--r2)', padding:'10px 16px',
            display:'flex', alignItems:'center', gap:8,
          }}>
            <Icon name="Alert" size={14} color="var(--amber)"/>
            <span style={{ fontSize:13, fontWeight:700, color:'var(--amber)' }}>
              {pending.length} course{pending.length>1?'s':''} awaiting review
            </span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {[
          { label:'Total Courses',    val:courses.length,  color:'blue',  icon:'Book'   },
          { label:'Published',        val:published.length,color:'green', icon:'Check'  },
          { label:'Pending Review',   val:pending.length,  color:'amber', icon:'Clock'  },
          { label:'Rejected',         val:rejected.length, color:'red',   icon:'X'      },
        ].map(t => (
          <div key={t.label} style={{
            background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'var(--r2)', padding:'14px 16px',
            display:'flex', alignItems:'center', gap:12, boxShadow:'var(--shadow-sm)',
            cursor:'pointer',
          }} onClick={() => setFilter(t.label === 'Total Courses' ? 'All' : t.label)}>
            <div style={{ width:36, height:36, borderRadius:10, background:`var(--${t.color}-dim)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon name={t.icon} size={16} color={`var(--${t.color})`}/>
            </div>
            <div>
              <div style={{ fontSize:22, fontWeight:800, color:'var(--text)', lineHeight:1 }}>{t.val}</div>
              <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600, marginTop:2 }}>{t.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter + Search */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
        <div style={{ display:'flex', gap:6 }}>
          {['All','Pending Approval','Published','Rejected'].map(f => (
            <button key={f}
              className={`btn btn-sm ${filter===f?'btn-primary':'btn-ghost'}`}
              onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
        <div className="tb-search">
          <Icon name="Search" size={13} color="var(--text3)"/>
          <input placeholder="Search courses..."
            value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
      </div>

      {/* Course list */}
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {filtered.length === 0 ? (
          <div className="card empty-state">
            <div className="empty-icon">📚</div>
            <div>No courses found</div>
          </div>
        ) : filtered.map(c => {
          const st = STATUS_STYLES[c.status] || STATUS_STYLES['Draft'];
          return (
            <div key={c.id} style={{
              background:'var(--bg2)',
              border:`1px solid var(--border)`,
              borderLeft:`4px solid ${
                c.status==='Published'       ? 'var(--green)'
                : c.status==='Pending Approval' ? 'var(--amber)'
                : c.status==='Rejected'      ? 'var(--red)'
                : 'var(--bg5)'
              }`,
              borderRadius:'var(--r3)', padding:'18px 20px',
              boxShadow:'var(--shadow-sm)', transition:'all 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow='var(--shadow-md)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow='var(--shadow-sm)'}
            >
              <div style={{ display:'flex', alignItems:'center', gap:14 }}>

                {/* Icon */}
                <div style={{
                  width:46, height:46, borderRadius:12, flexShrink:0,
                  background: c.status==='Published' ? 'var(--green-dim)' : c.status==='Pending Approval' ? 'var(--amber-dim)' : c.status==='Rejected' ? 'var(--red-dim)' : 'var(--bg4)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  border:`1.5px solid ${c.status==='Published'?'rgba(22,163,74,0.2)':c.status==='Pending Approval'?'rgba(217,119,6,0.2)':c.status==='Rejected'?'rgba(220,38,38,0.2)':'var(--border)'}`,
                }}>
                  <Icon name="Book" size={19} color={c.status==='Published'?'var(--green)':c.status==='Pending Approval'?'var(--amber)':c.status==='Rejected'?'var(--red)':'var(--text3)'}/>
                </div>

                {/* Info */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:5 }}>
                    <span style={{ fontSize:14.5, fontWeight:800, color:'var(--text)', letterSpacing:'-0.2px' }}>
                      {c.title}
                    </span>
                    <span className={`badge ${st.cls}`}>
                      <Icon name={st.icon} size={9} strokeWidth={2.5}/> {c.status}
                    </span>
                  </div>
                  <div style={{ fontSize:12, color:'var(--text2)', marginBottom:7 }}>
                    {c.description}
                  </div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
                    <span className="chip" style={{ fontSize:10 }}>
                      <Icon name="Layers" size={9}/> {c.category}
                    </span>
                    <span className="chip" style={{ fontSize:10 }}>
                      <Icon name="Book" size={9}/> {c.modules.length} modules
                    </span>
                    <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                      <div style={{
                        width:22, height:22, borderRadius:6,
                        background:'var(--teal-dim)', color:'var(--teal)',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:9, fontWeight:700, fontFamily:'var(--font-mono)',
                      }}>{c.trainerAvatar}</div>
                      <span style={{ fontSize:12, color:'var(--text2)' }}>{c.trainer}</span>
                    </div>
                    {c.submitted && (
                      <span style={{ fontSize:11, color:'var(--text3)', display:'flex', alignItems:'center', gap:4 }}>
                        <Icon name="Calendar" size={10}/> {c.submitted}
                      </span>
                    )}
                    {c.status === 'Rejected' && c.rejectNote && (
                      <span style={{ fontSize:11, color:'var(--red)', fontWeight:500 }}>
                        Reason: {c.rejectNote}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                  {c.status === 'Pending Approval' && (
                    <>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ background:'var(--green)', borderColor:'var(--green)' }}
                        onClick={() => handleApprove(c.id)}>
                        <Icon name="Check" size={12}/> Approve
                      </button>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setReviewing(c)}>
                        <Icon name="Eye" size={12}/> Review
                      </button>
                    </>
                  )}
                  {c.status === 'Published' && (
                    <button className="btn btn-ghost btn-sm" onClick={() => setReviewing(c)}>
                      <Icon name="Eye" size={12}/> View
                    </button>
                  )}
                  {c.status === 'Rejected' && (
                    <span style={{ fontSize:11, color:'var(--red)', display:'flex', alignItems:'center', gap:4 }}>
                      <Icon name="X" size={11} color="var(--red)"/> Rejected
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}