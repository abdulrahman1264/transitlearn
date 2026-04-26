import React, { useState, useRef } from 'react';
import Icon from '../components/Icons';

// ── Mock initial courses ──────────────────────────────────────────
const INITIAL_COURSES = [
  {
    id:1, title:'Pre-Service Orientation', category:'Public Bus — Pre Service',
    status:'Published', enrolled:12, modules:[
      { id:1, title:'Introduction & Safety Brief',    type:'video', dur:'12 min', file:null, done:false },
      { id:2, title:'Wet Weather Driving Techniques', type:'video', dur:'18 min', file:null, done:false },
      { id:3, title:'Knowledge Check — Module 1',     type:'quiz',  dur:'10 min', file:null, done:false, questions:[] },
    ],
    createdAt:'2025-01-10', submittedAt:'2025-01-15', approvedAt:'2025-01-16',
  },
  {
    id:2, title:'Defensive Driving Fundamentals', category:'Public Bus — In Service',
    status:'Published', enrolled:48, modules:[
      { id:1, title:'Defensive Techniques Overview', type:'video', dur:'20 min', file:null, done:false },
      { id:2, title:'Assessment',                    type:'quiz',  dur:'15 min', file:null, done:false, questions:[] },
    ],
    createdAt:'2025-02-01', submittedAt:'2025-02-05', approvedAt:'2025-02-06',
  },
  {
    id:3, title:'Route Navigation & GPS Systems', category:'Public Bus — Pre Service',
    status:'Pending Approval', enrolled:0, modules:[],
    createdAt:'2025-04-01', submittedAt:'2025-04-10', approvedAt:null,
  },
  {
    id:4, title:'Child Safety Procedures',        category:'School Bus Training',
    status:'Draft', enrolled:0, modules:[],
    createdAt:'2025-04-20', submittedAt:null, approvedAt:null,
  },
];

const CATEGORIES = [
  'Public Bus — Pre Service',
  'Public Bus — In Service',
  'School Bus Training',
];

const STATUS_STYLES = {
  'Published':        { cls:'badge-green',  icon:'Check'  },
  'Pending Approval': { cls:'badge-amber',  icon:'Clock'  },
  'Draft':            { cls:'badge-gray',   icon:'Edit'   },
  'Rejected':         { cls:'badge-red',    icon:'X'      },
};

// ── Quiz Builder ──────────────────────────────────────────────────
function QuizBuilder({ questions, onChange }) {
  const [newQ, setNewQ] = useState({ q:'', opts:['','','',''], correct:0 });

  const addQuestion = () => {
    if (!newQ.q.trim()) return;
    onChange([...questions, { ...newQ, id: Date.now() }]);
    setNewQ({ q:'', opts:['','','',''], correct:0 });
  };

  const removeQ = (idx) => onChange(questions.filter((_,i) => i !== idx));

  return (
    <div>
      {/* Existing questions */}
      {questions.map((q, qi) => (
        <div key={q.id || qi} style={{
          background:'var(--bg3)', borderRadius:'var(--r2)',
          padding:'14px', marginBottom:10,
          border:'1px solid var(--border)',
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
            <span style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>Q{qi+1}: {q.q}</span>
            <button onClick={() => removeQ(qi)} style={{
              background:'none', border:'none', cursor:'pointer', color:'var(--red)',
            }}>
              <Icon name="X" size={14}/>
            </button>
          </div>
          {q.opts.map((opt, oi) => (
            <div key={oi} style={{
              fontSize:12, color: oi===q.correct ? 'var(--green)' : 'var(--text2)',
              padding:'3px 0', display:'flex', alignItems:'center', gap:6,
            }}>
              <Icon
                name={oi===q.correct ? 'Check' : 'ChevronRight'}
                size={11}
                color={oi===q.correct ? 'var(--green)' : 'var(--text3)'}
              />
              {opt}
            </div>
          ))}
        </div>
      ))}

      {/* Add new question */}
      <div style={{
        background:'var(--bg2)', borderRadius:'var(--r2)',
        padding:'16px', border:'1.5px dashed var(--border2)',
      }}>
        <div style={{ fontSize:12, fontWeight:700, color:'var(--text2)', marginBottom:10 }}>
          Add Question
        </div>
        <div className="form-group">
          <input className="form-input" placeholder="Question text..."
            value={newQ.q} onChange={e => setNewQ(p => ({ ...p, q:e.target.value }))}/>
        </div>
        {newQ.opts.map((opt, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:7 }}>
            <input
              type="radio" name="correct"
              checked={newQ.correct === i}
              onChange={() => setNewQ(p => ({ ...p, correct:i }))}
              style={{ cursor:'pointer' }}
            />
            <input className="form-input" placeholder={`Option ${i+1}${i===0?' (mark correct)':''}`}
              value={opt}
              onChange={e => {
                const opts = [...newQ.opts];
                opts[i] = e.target.value;
                setNewQ(p => ({ ...p, opts }));
              }}
            />
          </div>
        ))}
        <div style={{ fontSize:11, color:'var(--text3)', marginBottom:10 }}>
          Select the radio button next to the correct answer
        </div>
        <button className="btn btn-primary btn-sm" onClick={addQuestion}>
          <Icon name="Plus" size={12}/> Add Question
        </button>
      </div>
    </div>
  );
}

// ── Module Item ───────────────────────────────────────────────────
function ModuleItem({ mod, idx, onUpdate, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) {
  const [expanded, setExpanded]   = useState(false);
  const fileRef                   = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onUpdate(idx, {
      ...mod,
      file: file.name,
      dur:  mod.type === 'video'
        ? `${Math.round(file.size / 1024 / 1024 * 2)} min`
        : `${Math.ceil(file.size / 1024 / 100)} min read`,
    });
  };

  const typeConfig = {
    video: { color:'var(--blue)',   dim:'var(--blue-dim)',   icon:'Video',    label:'Video'    },
    pdf:   { color:'var(--red)',    dim:'var(--red-dim)',    icon:'FileText', label:'PDF'      },
    quiz:  { color:'var(--amber)',  dim:'var(--amber-dim)',  icon:'Pencil',   label:'Quiz'     },
  };
  const tc = typeConfig[mod.type] || typeConfig.video;

  return (
    <div style={{
      background:'var(--bg2)', border:'1.5px solid var(--border)',
      borderRadius:'var(--r2)', marginBottom:8, overflow:'hidden',
      transition:'all 0.15s',
    }}>
      {/* Module header */}
      <div style={{
        display:'flex', alignItems:'center', gap:12,
        padding:'12px 14px', cursor:'pointer',
      }} onClick={() => setExpanded(e => !e)}>

        {/* Drag handle / number */}
        <div style={{
          width:26, height:26, borderRadius:7, flexShrink:0,
          background: tc.dim, color: tc.color,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:11, fontWeight:700, fontFamily:'var(--font-mono)',
        }}>{idx+1}</div>

        {/* Type badge */}
        <div style={{
          display:'flex', alignItems:'center', gap:5,
          padding:'3px 9px', borderRadius:6,
          background: tc.dim, color: tc.color,
          fontSize:10, fontWeight:700, flexShrink:0,
        }}>
          <Icon name={tc.icon} size={10} strokeWidth={2.5}/> {tc.label}
        </div>

        {/* Title */}
        <span style={{ flex:1, fontSize:13.5, fontWeight:600, color:'var(--text)' }}>
          {mod.title || <span style={{ color:'var(--text3)' }}>Untitled module</span>}
        </span>

        {/* Duration */}
        {mod.dur && (
          <span className="chip" style={{ fontSize:10, flexShrink:0 }}>
            <Icon name="Clock" size={9}/> {mod.dur}
          </span>
        )}

        {/* File status */}
        {mod.type !== 'quiz' && (
          <span style={{
            fontSize:10, fontWeight:600, flexShrink:0,
            color: mod.file ? 'var(--green)' : 'var(--text3)',
          }}>
            {mod.file
              ? <><Icon name="Check" size={10} color="var(--green)" strokeWidth={2.5}/> Uploaded</>
              : 'No file'
            }
          </span>
        )}
        {mod.type === 'quiz' && (
          <span style={{ fontSize:10, fontWeight:600, color:'var(--amber)', flexShrink:0 }}>
            {mod.questions?.length || 0} questions
          </span>
        )}

        {/* Move + Delete */}
        <div style={{ display:'flex', gap:4, flexShrink:0 }} onClick={e => e.stopPropagation()}>
          <button disabled={isFirst} onClick={() => onMoveUp(idx)} style={{
            background:'none', border:'none', cursor: isFirst?'not-allowed':'pointer',
            color: isFirst ? 'var(--text4)' : 'var(--text3)', padding:3,
          }}>
            <Icon name="BarChart" size={12}/>
          </button>
          <button onClick={() => onDelete(idx)} style={{
            background:'none', border:'none', cursor:'pointer', color:'var(--red)', padding:3,
          }}>
            <Icon name="X" size={13}/>
          </button>
        </div>

        <Icon name={expanded?'X':'ChevronRight'} size={13} color="var(--text3)"/>
      </div>

      {/* Expanded editor */}
      {expanded && (
        <div style={{
          padding:'14px 16px', borderTop:'1px solid var(--border)',
          background:'var(--bg3)',
        }}>
          {/* Title input */}
          <div className="form-group">
            <label className="form-label">Module Title</label>
            <input className="form-input" placeholder="e.g. Introduction to Safe Driving"
              value={mod.title}
              onChange={e => onUpdate(idx, { ...mod, title:e.target.value })}
            />
          </div>

          {/* Type selector */}
          <div className="form-group">
            <label className="form-label">Content Type</label>
            <div style={{ display:'flex', gap:8 }}>
              {['video','pdf','quiz'].map(t => {
                const tc2 = typeConfig[t];
                return (
                  <button key={t} onClick={() => onUpdate(idx, { ...mod, type:t, file:null, questions:t==='quiz'?[]:(mod.questions||[]) })}
                    style={{
                      flex:1, padding:'9px 8px', borderRadius:'var(--r)',
                      border:`1.5px solid ${mod.type===t ? tc2.color : 'var(--border2)'}`,
                      background: mod.type===t ? tc2.dim : 'var(--bg2)',
                      cursor:'pointer', display:'flex', flexDirection:'column',
                      alignItems:'center', gap:5, transition:'all 0.13s',
                    }}>
                    <Icon name={tc2.icon} size={16} color={mod.type===t ? tc2.color : 'var(--text3)'}/>
                    <span style={{ fontSize:11, fontWeight:700, color:mod.type===t ? tc2.color : 'var(--text3)' }}>
                      {tc2.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Video upload */}
          {mod.type === 'video' && (
            <div>
              <label className="form-label">Video File (MP4)</label>
              <div
                onClick={() => fileRef.current.click()}
                style={{
                  border:`2px dashed ${mod.file ? 'var(--green)' : 'var(--border2)'}`,
                  borderRadius:'var(--r2)', padding:'20px',
                  textAlign:'center', cursor:'pointer',
                  background: mod.file ? 'var(--green-dim)' : 'var(--bg2)',
                  transition:'all 0.15s',
                }}
              >
                {mod.file ? (
                  <div>
                    <Icon name="Check" size={20} color="var(--green)"/>
                    <div style={{ fontSize:13, fontWeight:700, color:'var(--green)', marginTop:6 }}>
                      {mod.file}
                    </div>
                    <div style={{ fontSize:11, color:'var(--text3)', marginTop:4 }}>
                      Click to replace
                    </div>
                  </div>
                ) : (
                  <div>
                    <Icon name="Upload" size={20} color="var(--text3)"/>
                    <div style={{ fontSize:13, fontWeight:600, color:'var(--text2)', marginTop:8 }}>
                      Click to upload MP4 video
                    </div>
                    <div style={{ fontSize:11, color:'var(--text3)', marginTop:4 }}>
                      Supports MP4, MOV, AVI · Max 2GB
                    </div>
                  </div>
                )}
                <input ref={fileRef} type="file" accept="video/*"
                  style={{ display:'none' }} onChange={handleFile}/>
              </div>
            </div>
          )}

          {/* PDF upload */}
          {mod.type === 'pdf' && (
            <div>
              <label className="form-label">PDF Document</label>
              <div
                onClick={() => fileRef.current.click()}
                style={{
                  border:`2px dashed ${mod.file ? 'var(--green)' : 'var(--border2)'}`,
                  borderRadius:'var(--r2)', padding:'20px',
                  textAlign:'center', cursor:'pointer',
                  background: mod.file ? 'var(--green-dim)' : 'var(--bg2)',
                  transition:'all 0.15s',
                }}
              >
                {mod.file ? (
                  <div>
                    <Icon name="Check" size={20} color="var(--green)"/>
                    <div style={{ fontSize:13, fontWeight:700, color:'var(--green)', marginTop:6 }}>
                      {mod.file}
                    </div>
                    <div style={{ fontSize:11, color:'var(--text3)', marginTop:4 }}>
                      Click to replace
                    </div>
                  </div>
                ) : (
                  <div>
                    <Icon name="FileText" size={20} color="var(--text3)"/>
                    <div style={{ fontSize:13, fontWeight:600, color:'var(--text2)', marginTop:8 }}>
                      Click to upload PDF
                    </div>
                    <div style={{ fontSize:11, color:'var(--text3)', marginTop:4 }}>
                      PDF only · Max 100MB
                    </div>
                  </div>
                )}
                <input ref={fileRef} type="file" accept=".pdf"
                  style={{ display:'none' }} onChange={handleFile}/>
              </div>
            </div>
          )}

          {/* Quiz builder */}
          {mod.type === 'quiz' && (
            <div>
              <label className="form-label">Quiz Questions ({mod.questions?.length || 0} added)</label>
              <QuizBuilder
                questions={mod.questions || []}
                onChange={qs => onUpdate(idx, { ...mod, questions:qs })}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Course Editor ─────────────────────────────────────────────────
function CourseEditor({ course, onSave, onBack }) {
  const [title,    setTitle]    = useState(course?.title    || '');
  const [category, setCategory] = useState(course?.category || CATEGORIES[0]);
  const [modules,  setModules]  = useState(course?.modules  || []);
  const [toast,    setToast]    = useState('');
  const [saving,   setSaving]   = useState(false);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(''), 3000); };

  const addModule = (type) => {
    setModules(prev => [...prev, {
      id: Date.now(), title:'', type,
      file:null, dur:'', done:false,
      questions: type==='quiz' ? [] : undefined,
    }]);
  };

  const updateModule = (idx, updated) => {
    setModules(prev => { const cp=[...prev]; cp[idx]=updated; return cp; });
  };

  const deleteModule = (idx) => {
    if (window.confirm('Remove this module?'))
      setModules(prev => prev.filter((_,i) => i!==idx));
  };

  const moveUp = (idx) => {
    if (idx===0) return;
    setModules(prev => {
      const cp=[...prev];
      [cp[idx-1],cp[idx]] = [cp[idx],cp[idx-1]];
      return cp;
    });
  };

  const handleSave = async (submitForApproval = false) => {
    if (!title.trim()) { showToast('❌ Please add a course title'); return; }
    if (modules.length === 0) { showToast('❌ Add at least one module'); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    onSave({
      ...course,
      id:          course?.id || Date.now(),
      title,
      category,
      modules,
      status:      submitForApproval ? 'Pending Approval' : 'Draft',
      submittedAt: submitForApproval ? new Date().toISOString().slice(0,10) : null,
      enrolled:    course?.enrolled || 0,
      createdAt:   course?.createdAt || new Date().toISOString().slice(0,10),
    });
    showToast(submitForApproval ? '✅ Submitted for admin approval!' : '✅ Draft saved!');
    setSaving(false);
    setTimeout(() => onBack(), 1200);
  };

  const totalMods   = modules.length;
  const uploadedMods= modules.filter(m => m.type!=='quiz' ? m.file : (m.questions?.length||0)>0).length;
  const isReady     = title.trim() && modules.length > 0 && uploadedMods === totalMods;

  return (
    <div className="fade-in">

      {/* Toast */}
      {toast && (
        <div style={{
          position:'fixed', top:20, right:20, zIndex:2000,
          background: toast.startsWith('❌') ? 'var(--red-dim)' : 'var(--green-dim)',
          border:`1px solid ${toast.startsWith('❌') ? 'rgba(220,38,38,0.3)' : 'rgba(22,163,74,0.3)'}`,
          borderRadius:'var(--r2)', padding:'12px 18px',
          display:'flex', alignItems:'center', gap:8,
          fontSize:13, fontWeight:600,
          color: toast.startsWith('❌') ? 'var(--red)' : 'var(--green)',
          boxShadow:'var(--shadow-lg)',
        }}>
          {toast}
        </div>
      )}

      {/* Back + header */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <Icon name="ArrowLeft" size={13}/> Back
        </button>
        <Icon name="ChevronRight" size={13} color="var(--text3)"/>
        <span style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>
          {course ? 'Edit Course' : 'New Course'}
        </span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:20, alignItems:'start' }}>

        {/* ── Left: Editor ───────────────────── */}
        <div>

          {/* Course info */}
          <div className="card mb16">
            <div style={{ fontWeight:700, fontSize:14, color:'var(--text)', marginBottom:16 }}>
              Course Information
            </div>
            <div className="form-group">
              <label className="form-label">Course Title *</label>
              <input className="form-input" placeholder="e.g. Advanced Defensive Driving"
                value={title} onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className="form-group" style={{ marginBottom:0 }}>
              <label className="form-label">Training Category *</label>
              <select className="form-input" value={category} onChange={e => setCategory(e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Modules */}
          <div className="card">
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <div>
                <div style={{ fontWeight:700, fontSize:14, color:'var(--text)' }}>
                  Course Modules
                </div>
                <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>
                  {totalMods} modules · {uploadedMods} ready
                </div>
              </div>

              {/* Add module buttons */}
              <div style={{ display:'flex', gap:6 }}>
                {[
                  { type:'video', icon:'Video',    label:'Add Video', color:'var(--blue)'  },
                  { type:'pdf',   icon:'FileText', label:'Add PDF',   color:'var(--red)'   },
                  { type:'quiz',  icon:'Pencil',   label:'Add Quiz',  color:'var(--amber)' },
                ].map(b => (
                  <button key={b.type} onClick={() => addModule(b.type)} style={{
                    display:'flex', alignItems:'center', gap:5,
                    padding:'6px 12px', borderRadius:'var(--r)',
                    border:`1px solid ${b.color}33`,
                    background:`${b.color}11`,
                    color: b.color, fontSize:12, fontWeight:600,
                    cursor:'pointer', transition:'all 0.13s',
                  }}>
                    <Icon name={b.icon} size={12} color={b.color}/> {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Module list */}
            {modules.length === 0 ? (
              <div style={{
                textAlign:'center', padding:'40px 20px',
                border:'2px dashed var(--border2)', borderRadius:'var(--r2)',
                color:'var(--text3)',
              }}>
                <Icon name="Layers" size={32} color="var(--text4)"/>
                <div style={{ fontSize:14, fontWeight:600, marginTop:12, marginBottom:6 }}>
                  No modules yet
                </div>
                <div style={{ fontSize:12 }}>
                  Add videos, PDFs or quizzes using the buttons above
                </div>
              </div>
            ) : (
              modules.map((mod, idx) => (
                <ModuleItem
                  key={mod.id || idx}
                  mod={mod}
                  idx={idx}
                  onUpdate={updateModule}
                  onDelete={deleteModule}
                  onMoveUp={moveUp}
                  isFirst={idx===0}
                  isLast={idx===modules.length-1}
                />
              ))
            )}
          </div>
        </div>

        {/* ── Right: Sidebar ─────────────────── */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>

          {/* Publish panel */}
          <div className="card" style={{ borderTop:'3px solid var(--brand)' }}>
            <div style={{ fontWeight:700, fontSize:13, color:'var(--text)', marginBottom:14 }}>
              Course Status
            </div>

            {/* Checklist */}
            {[
              { label:'Course title added',         done: !!title.trim()            },
              { label:'Category selected',          done: !!category                },
              { label:'At least 1 module added',    done: modules.length > 0        },
              { label:'All modules have content',   done: uploadedMods === totalMods && totalMods > 0 },
            ].map(item => (
              <div key={item.label} style={{
                display:'flex', alignItems:'center', gap:8,
                padding:'6px 0', borderBottom:'1px solid var(--border)',
                fontSize:12,
              }}>
                <div style={{
                  width:18, height:18, borderRadius:'50%', flexShrink:0,
                  background: item.done ? 'var(--green)' : 'var(--bg4)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <Icon
                    name={item.done ? 'Check' : 'X'}
                    size={9}
                    color={item.done ? '#fff' : 'var(--text3)'}
                    strokeWidth={2.5}
                  />
                </div>
                <span style={{ color: item.done ? 'var(--text)' : 'var(--text3)' }}>
                  {item.label}
                </span>
              </div>
            ))}

            <div style={{ marginTop:14, display:'flex', flexDirection:'column', gap:8 }}>
              <button
                className="btn btn-primary w100"
                disabled={!isReady || saving}
                onClick={() => handleSave(true)}
              >
                {saving
                  ? <><div className="spinner"/> Submitting...</>
                  : <><Icon name="Send" size={13}/> Submit for Approval</>
                }
              </button>
              <button
                className="btn btn-ghost w100"
                disabled={saving}
                onClick={() => handleSave(false)}
              >
                <Icon name="FileText" size={13}/> Save as Draft
              </button>
            </div>

            {!isReady && (
              <div style={{ marginTop:10, fontSize:11, color:'var(--text3)', textAlign:'center' }}>
                Complete all checklist items to submit
              </div>
            )}
          </div>

          {/* Course summary */}
          <div className="card">
            <div style={{ fontWeight:700, fontSize:13, color:'var(--text)', marginBottom:12 }}>
              Summary
            </div>
            {[
              { label:'Category', val: category || '—',             icon:'Layers'   },
              { label:'Modules',  val: `${totalMods}`,              icon:'Book'     },
              { label:'Videos',   val: `${modules.filter(m=>m.type==='video').length}`, icon:'Video' },
              { label:'PDFs',     val: `${modules.filter(m=>m.type==='pdf').length}`,   icon:'FileText' },
              { label:'Quizzes',  val: `${modules.filter(m=>m.type==='quiz').length}`,  icon:'Pencil' },
            ].map(r => (
              <div key={r.label} className="kv-row">
                <span className="kv-key" style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <Icon name={r.icon} size={11}/> {r.label}
                </span>
                <span className="kv-val" style={{ fontSize:12 }}>{r.val}</span>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div style={{
            background:'var(--blue-dim)', border:'1px solid rgba(27,110,243,0.15)',
            borderRadius:'var(--r2)', padding:'14px 16px',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:8 }}>
              <Icon name="Info" size={13} color="var(--brand)"/>
              <span style={{ fontSize:12, fontWeight:700, color:'var(--brand)' }}>Tips</span>
            </div>
            {[
              'Add videos before PDFs for better flow',
              'End each section with a quiz',
              'Keep videos under 20 minutes',
              'Admin will review before publishing',
            ].map(tip => (
              <div key={tip} style={{
                fontSize:11, color:'var(--text2)', marginBottom:4,
                display:'flex', alignItems:'flex-start', gap:6,
              }}>
                <Icon name="ChevronRight" size={10} color="var(--brand)"/>
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main CoursesPage ──────────────────────────────────────────────
export default function CoursesPage() {
  const [courses,  setCourses]  = useState(INITIAL_COURSES);
  const [editing,  setEditing]  = useState(null);
  const [creating, setCreating] = useState(false);
  const [filter,   setFilter]   = useState('All');
  const [search,   setSearch]   = useState('');

  const handleSave = (course) => {
    setCourses(prev => {
      const exists = prev.find(c => c.id === course.id);
      return exists
        ? prev.map(c => c.id===course.id ? course : c)
        : [...prev, course];
    });
    setEditing(null);
    setCreating(false);
  };

  if (creating)         return <CourseEditor course={null}    onSave={handleSave} onBack={()=>setCreating(false)}/>;
  if (editing)          return <CourseEditor course={editing} onSave={handleSave} onBack={()=>setEditing(null)}/>;

  const FILTERS = ['All','Draft','Pending Approval','Published'];
  const filtered = courses.filter(c => {
    const matchFilter = filter==='All' || c.status===filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                        c.category.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="fade-in">

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>
            Course Builder
          </div>
          <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>
            Create and manage training courses — submit to admin for approval
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setCreating(true)}>
          <Icon name="Plus" size={14}/> New Course
        </button>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {[
          { label:'Total Courses',    val:courses.length,                                    color:'blue',  icon:'Book'   },
          { label:'Published',        val:courses.filter(c=>c.status==='Published').length,  color:'green', icon:'Check'  },
          { label:'Pending Approval', val:courses.filter(c=>c.status==='Pending Approval').length, color:'amber', icon:'Clock' },
          { label:'Drafts',           val:courses.filter(c=>c.status==='Draft').length,      color:'teal',  icon:'Edit'   },
        ].map(t => (
          <div key={t.label} style={{
            background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'var(--r2)', padding:'14px 16px',
            display:'flex', alignItems:'center', gap:12, boxShadow:'var(--shadow-sm)',
          }}>
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
          {FILTERS.map(f => (
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

      {/* Course cards */}
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {filtered.length === 0 ? (
          <div className="empty-state card">
            <div className="empty-icon">📚</div>
            <div>No courses found</div>
          </div>
        ) : filtered.map(c => {
          const st = STATUS_STYLES[c.status] || STATUS_STYLES['Draft'];
          const videoCount = c.modules.filter(m=>m.type==='video').length;
          const pdfCount   = c.modules.filter(m=>m.type==='pdf').length;
          const quizCount  = c.modules.filter(m=>m.type==='quiz').length;

          return (
            <div key={c.id} style={{
              background:'var(--bg2)', border:'1px solid var(--border)',
              borderRadius:'var(--r3)', padding:'18px 20px',
              boxShadow:'var(--shadow-sm)', display:'flex',
              alignItems:'center', gap:18, transition:'all 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow='var(--shadow-md)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow='var(--shadow-sm)'}
            >
              {/* Icon */}
              <div style={{
                width:48, height:48, borderRadius:12, flexShrink:0,
                background: c.status==='Published' ? 'var(--green-dim)'
                  : c.status==='Pending Approval'  ? 'var(--amber-dim)'
                  : 'var(--bg4)',
                display:'flex', alignItems:'center', justifyContent:'center',
                border:`1.5px solid ${
                  c.status==='Published' ? 'rgba(22,163,74,0.2)'
                  : c.status==='Pending Approval' ? 'rgba(217,119,6,0.2)'
                  : 'var(--border)'
                }`,
              }}>
                <Icon
                  name="Book"
                  size={20}
                  color={
                    c.status==='Published' ? 'var(--green)'
                    : c.status==='Pending Approval' ? 'var(--amber)'
                    : 'var(--text3)'
                  }
                />
              </div>

              {/* Info */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                  <span style={{ fontSize:14.5, fontWeight:800, color:'var(--text)', letterSpacing:'-0.2px' }}>
                    {c.title}
                  </span>
                  <span className={`badge ${st.cls}`}>
                    <Icon name={st.icon} size={9} strokeWidth={2.5}/> {c.status}
                  </span>
                </div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <span className="chip"><Icon name="Layers" size={10}/> {c.category}</span>
                  <span className="chip"><Icon name="Book"   size={10}/> {c.modules.length} modules</span>
                  {videoCount>0 && <span className="chip"><Icon name="Video"    size={10}/> {videoCount} videos</span>}
                  {pdfCount>0   && <span className="chip"><Icon name="FileText" size={10}/> {pdfCount} PDFs</span>}
                  {quizCount>0  && <span className="chip"><Icon name="Pencil"   size={10}/> {quizCount} quizzes</span>}
                  {c.enrolled>0 && <span className="chip"><Icon name="Users"    size={10}/> {c.enrolled} enrolled</span>}
                </div>
              </div>

              {/* Status info */}
              <div style={{ textAlign:'right', flexShrink:0 }}>
                {c.status === 'Pending Approval' && (
                  <div style={{ fontSize:11, color:'var(--amber)', fontWeight:600, marginBottom:4 }}>
                    <Icon name="Clock" size={10}/> Awaiting admin review
                  </div>
                )}
                {c.status === 'Published' && (
                  <div style={{ fontSize:11, color:'var(--green)', fontWeight:600, marginBottom:4 }}>
                    <Icon name="Zap" size={10}/> Live · {c.enrolled} enrolled
                  </div>
                )}
                {c.approvedAt && (
                  <div style={{ fontSize:10, color:'var(--text3)' }}>
                    Approved {c.approvedAt}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                {c.status === 'Draft' && (
                  <button className="btn btn-primary btn-sm" onClick={() => setEditing(c)}>
                    <Icon name="Edit" size={12}/> Edit
                  </button>
                )}
                {c.status === 'Pending Approval' && (
                  <button className="btn btn-ghost btn-sm" onClick={() => setEditing(c)}>
                    <Icon name="Eye" size={12}/> View
                  </button>
                )}
                {c.status === 'Published' && (
                  <button className="btn btn-ghost btn-sm">
                    <Icon name="BarChart" size={12}/> Analytics
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}