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

// ── Inline question adder ─────────────────────────────────────────
function AddQuestionInline({ onAdd, accentColor }) {
  const [open,    setOpen]    = useState(false);
  const [q,       setQ]       = useState('');
  const [opts,    setOpts]    = useState(['','','','']);
  const [correct, setCorrect] = useState(0);

  const submit = () => {
    if (!q.trim() || opts.some(o => !o.trim())) return;
    onAdd({ q, opts, correct });
    setQ(''); setOpts(['','','','']); setCorrect(0); setOpen(false);
  };

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{
      width:'100%', padding:'10px',
      border:`2px dashed ${accentColor}44`,
      borderRadius:'var(--r)', background:`${accentColor}08`,
      color: accentColor, fontSize:13, fontWeight:600,
      cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6,
    }}>
      <Icon name="Plus" size={13} color={accentColor}/> Add Question
    </button>
  );

  return (
    <div style={{
      background:'var(--bg2)', borderRadius:'var(--r2)',
      padding:'14px', border:`1.5px solid ${accentColor}44`,
    }}>
      <div className="form-group">
        <label className="form-label">Question</label>
        <textarea className="form-input" style={{ minHeight:60 }}
          placeholder="Type your question..."
          value={q} onChange={e => setQ(e.target.value)}/>
      </div>
      <div className="form-group">
        <label className="form-label">Options (click circle = correct answer)</label>
        {opts.map((opt, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:7 }}>
            <div onClick={() => setCorrect(i)} style={{
              width:20, height:20, borderRadius:'50%', cursor:'pointer', flexShrink:0,
              border:`2px solid ${correct===i ? accentColor : 'var(--border2)'}`,
              background: correct===i ? accentColor : 'transparent',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all 0.13s',
            }}>
              {correct===i && <Icon name="Check" size={10} color="#fff" strokeWidth={3}/>}
            </div>
            <input className="form-input"
              placeholder={`Option ${i+1}${correct===i?' — Correct':''}`}
              value={opt}
              onChange={e => { const o=[...opts]; o[i]=e.target.value; setOpts(o); }}
            />
          </div>
        ))}
      </div>
      <div style={{ display:'flex', gap:8 }}>
        <button className="btn btn-primary btn-sm" onClick={submit}>
          <Icon name="Check" size={11}/> Add Question
        </button>
        <button className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Module Item ───────────────────────────────────────────────────
function ModuleItem({ mod, idx, onUpdate, onDelete, onMoveUp, isFirst }) {
  const [expanded, setExpanded] = useState(false);
  const fileRef                 = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onUpdate(idx, {
      ...mod,
      file:    file.name,
      fileUrl: url,
      fileObj: file,
      dur: mod.type === 'video'
        ? `${Math.round(file.size / 1024 / 1024 * 2)} min`
        : `${Math.ceil(file.size / 1024 / 100)} min read`,
    });
  };

  const typeConfig = {
    video: { color:'var(--blue)',  dim:'var(--blue-dim)',  icon:'Video',    label:'Video' },
    pdf:   { color:'var(--red)',   dim:'var(--red-dim)',   icon:'FileText', label:'PDF'   },
    quiz:  { color:'var(--amber)', dim:'var(--amber-dim)', icon:'Pencil',   label:'Quiz'  },
  };
  const tc = typeConfig[mod.type] || typeConfig.video;

  return (
    <div style={{
      background:'var(--bg2)', border:`1.5px solid ${expanded ? tc.color+'44' : 'var(--border)'}`,
      borderRadius:'var(--r2)', marginBottom:8, overflow:'hidden',
      transition:'all 0.15s',
      boxShadow: expanded ? `0 4px 16px ${tc.color}18` : 'none',
    }}>

      {/* ── Module header ─────────────────── */}
      <div style={{
        display:'flex', alignItems:'center', gap:12,
        padding:'11px 14px', cursor:'pointer',
        background: expanded ? `${tc.color}08` : 'transparent',
      }} onClick={() => setExpanded(e => !e)}>

        {/* Number */}
        <div style={{
          width:26, height:26, borderRadius:7, flexShrink:0,
          background: tc.dim, color: tc.color,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:11, fontWeight:700,
        }}>{idx+1}</div>

        {/* Type chip */}
        <div style={{
          display:'flex', alignItems:'center', gap:4,
          padding:'2px 8px', borderRadius:5,
          background: tc.dim, color: tc.color,
          fontSize:10, fontWeight:700, flexShrink:0,
        }}>
          <Icon name={tc.icon} size={10} strokeWidth={2.5}/> {tc.label}
        </div>

        {/* Title */}
        <span style={{ flex:1, fontSize:13.5, fontWeight:600, color:'var(--text)' }}>
          {mod.title || <span style={{ color:'var(--text3)', fontStyle:'italic' }}>Untitled module</span>}
        </span>

        {/* Status chips */}
        {mod.dur && (
          <span className="chip" style={{ fontSize:10, flexShrink:0 }}>
            <Icon name="Clock" size={9}/> {mod.dur}
          </span>
        )}
        {mod.type !== 'quiz' && (
          <span style={{
            fontSize:10, fontWeight:600, flexShrink:0,
            color: mod.file ? 'var(--green)' : 'var(--text3)',
            display:'flex', alignItems:'center', gap:3,
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

        {/* Controls */}
        <div style={{ display:'flex', gap:4, flexShrink:0 }} onClick={e => e.stopPropagation()}>
          <button disabled={isFirst} onClick={() => onMoveUp(idx)} style={{
            background:'none', border:'none',
            cursor: isFirst ? 'not-allowed' : 'pointer',
            color: isFirst ? 'var(--text4)' : 'var(--text3)', padding:3,
          }}>▲</button>
          <button onClick={() => onDelete(idx)} style={{
            background:'none', border:'none', cursor:'pointer', color:'var(--red)', padding:3,
          }}>
            <Icon name="X" size={13}/>
          </button>
        </div>

        <span style={{ color:'var(--text3)', fontSize:12, flexShrink:0 }}>
          {expanded ? '▲' : '▼'}
        </span>
      </div>

      {/* ── Expanded content ──────────────── */}
      {expanded && (
        <div style={{ borderTop:`1px solid ${tc.color}22` }}>

          {/* Module title + type selector */}
          <div style={{ padding:'16px 16px 0', display:'grid', gridTemplateColumns:'1fr auto', gap:12 }}>
            <div className="form-group" style={{ marginBottom:0 }}>
              <label className="form-label">Module Title</label>
              <input className="form-input"
                placeholder="e.g. Introduction to Safe Driving"
                value={mod.title}
                onChange={e => onUpdate(idx, { ...mod, title:e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Type</label>
              <div style={{ display:'flex', gap:5 }}>
                {['video','pdf','quiz'].map(t => {
                  const tc2 = typeConfig[t];
                  return (
                    <button key={t}
                      onClick={() => onUpdate(idx, { ...mod, type:t, file:null, fileUrl:null, questions:t==='quiz'?[]:(mod.questions||[]) })}
                      style={{
                        padding:'6px 10px', borderRadius:6,
                        border:`1.5px solid ${mod.type===t ? tc2.color : 'var(--border2)'}`,
                        background: mod.type===t ? tc2.dim : 'var(--bg3)',
                        cursor:'pointer', display:'flex', alignItems:'center', gap:4,
                        fontSize:11, fontWeight:600,
                        color: mod.type===t ? tc2.color : 'var(--text3)',
                      }}>
                      <Icon name={tc2.icon} size={12} color={mod.type===t ? tc2.color : 'var(--text3)'}/>
                      {tc2.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── VIDEO ─────────────────────── */}
          {mod.type === 'video' && (
            <div style={{ padding:'16px' }}>
              {/* Upload button */}
              <div className="form-group">
                <label className="form-label">Video File (MP4)</label>
                <div
                  onClick={() => fileRef.current.click()}
                  style={{
                    border:`2px dashed ${mod.file ? 'var(--green)' : 'var(--border2)'}`,
                    borderRadius:'var(--r2)', padding:'16px',
                    textAlign:'center', cursor:'pointer',
                    background: mod.file ? 'var(--green-dim)' : 'var(--bg3)',
                    transition:'all 0.15s',
                  }}
                >
                  {mod.file ? (
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
                      <Icon name="Check" size={16} color="var(--green)"/>
                      <span style={{ fontSize:13, fontWeight:600, color:'var(--green)' }}>{mod.file}</span>
                      <span style={{ fontSize:11, color:'var(--text3)' }}>· Click to replace</span>
                    </div>
                  ) : (
                    <div>
                      <Icon name="Upload" size={18} color="var(--text3)"/>
                      <div style={{ fontSize:13, fontWeight:600, color:'var(--text2)', marginTop:6 }}>
                        Click to upload MP4 video
                      </div>
                      <div style={{ fontSize:11, color:'var(--text3)', marginTop:4 }}>
                        MP4, MOV, AVI · Max 2GB
                      </div>
                    </div>
                  )}
                  <input ref={fileRef} type="file" accept="video/*"
                    style={{ display:'none' }} onChange={handleFile}/>
                </div>
              </div>

              {/* ── INLINE VIDEO PREVIEW ─── */}
              {mod.fileUrl && (
                <div>
                  <label className="form-label">
                    <Icon name="Play" size={11} color="var(--blue)"/> Live Preview
                  </label>
                  <div style={{
                    borderRadius:'var(--r2)', overflow:'hidden',
                    border:'1px solid var(--border)',
                    boxShadow:'var(--shadow)',
                  }}>
                    <video
                      src={mod.fileUrl}
                      controls
                      style={{ width:'100%', display:'block', maxHeight:320, background:'#000' }}
                    />
                  </div>
                  <div style={{ marginTop:6, fontSize:11, color:'var(--text3)', display:'flex', alignItems:'center', gap:5 }}>
                    <Icon name="Shield" size={11} color="var(--text3)"/>
                    Preview only — DRM encryption applied on publish
                  </div>
                </div>
              )}

              {/* Placeholder if no file */}
              {!mod.fileUrl && (
                <div style={{
                  background:'linear-gradient(135deg, #0A0F1E, #1A2744)',
                  borderRadius:'var(--r2)', aspectRatio:'16/9',
                  display:'flex', flexDirection:'column',
                  alignItems:'center', justifyContent:'center',
                  border:'1px solid rgba(255,255,255,0.05)',
                }}>
                  <div style={{ fontSize:40, marginBottom:10 }}>🚌</div>
                  <div style={{ fontSize:13, color:'rgba(255,255,255,0.5)', fontWeight:600 }}>
                    Upload a video to preview
                  </div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.3)', marginTop:4 }}>
                    MP4, MOV, AVI supported
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── PDF ───────────────────────── */}
          {mod.type === 'pdf' && (
            <div style={{ padding:'16px' }}>
              <div className="form-group">
                <label className="form-label">PDF Document</label>
                <div
                  onClick={() => fileRef.current.click()}
                  style={{
                    border:`2px dashed ${mod.file ? 'var(--green)' : 'var(--border2)'}`,
                    borderRadius:'var(--r2)', padding:'16px',
                    textAlign:'center', cursor:'pointer',
                    background: mod.file ? 'var(--green-dim)' : 'var(--bg3)',
                    transition:'all 0.15s',
                  }}
                >
                  {mod.file ? (
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
                      <Icon name="Check" size={16} color="var(--green)"/>
                      <span style={{ fontSize:13, fontWeight:600, color:'var(--green)' }}>{mod.file}</span>
                      <span style={{ fontSize:11, color:'var(--text3)' }}>· Click to replace</span>
                    </div>
                  ) : (
                    <div>
                      <Icon name="FileText" size={18} color="var(--text3)"/>
                      <div style={{ fontSize:13, fontWeight:600, color:'var(--text2)', marginTop:6 }}>
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

              {/* ── INLINE PDF PREVIEW ────── */}
              {mod.fileUrl && (
                <div>
                  <label className="form-label">
                    <Icon name="Eye" size={11} color="var(--red)"/> PDF Preview
                  </label>
                  <div style={{
                    borderRadius:'var(--r2)', overflow:'hidden',
                    border:'1px solid var(--border)', boxShadow:'var(--shadow)',
                    height:400,
                  }}>
                    <iframe
                      src={mod.fileUrl}
                      style={{ width:'100%', height:'100%', border:'none' }}
                      title={mod.title}
                    />
                  </div>
                </div>
              )}

              {/* Placeholder */}
              {!mod.fileUrl && (
                <div style={{
                  background:'#f0f0f0', borderRadius:'var(--r2)',
                  height:200, display:'flex', flexDirection:'column',
                  alignItems:'center', justifyContent:'center',
                  border:'1px solid var(--border)',
                }}>
                  <div style={{ background:'#fff', borderRadius:'var(--r2)', padding:'24px 32px', textAlign:'center', boxShadow:'0 2px 12px rgba(0,0,0,0.1)' }}>
                    <Icon name="FileText" size={32} color="var(--red)"/>
                    <div style={{ fontSize:13, fontWeight:600, color:'var(--text)', marginTop:10 }}>
                      Upload a PDF to preview
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── QUIZ ──────────────────────── */}
          {mod.type === 'quiz' && (
            <div style={{ padding:'16px' }}>
              <label className="form-label">
                <Icon name="Pencil" size={11} color="var(--amber)"/> Quiz Builder
                <span style={{ marginLeft:8, fontSize:11, color:'var(--text3)', fontWeight:400 }}>
                  {mod.questions?.length || 0} questions added
                </span>
              </label>

              {/* Existing questions preview */}
              {(mod.questions || []).map((q, qi) => (
                <div key={q.id||qi} style={{
                  background:'var(--bg3)', borderRadius:'var(--r)',
                  padding:'12px 14px', marginBottom:8,
                  border:'1px solid var(--border)',
                }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                    <div style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
                      <div style={{
                        width:20, height:20, borderRadius:5, background:'var(--amber)',
                        color:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:10, fontWeight:800, flexShrink:0,
                      }}>{qi+1}</div>
                      <span style={{ fontSize:13, fontWeight:600, color:'var(--text)', lineHeight:1.4 }}>{q.q}</span>
                    </div>
                    <button onClick={() => {
                      const qs = (mod.questions||[]).filter((_,i) => i!==qi);
                      onUpdate(idx, { ...mod, questions:qs });
                    }} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--red)', padding:2, flexShrink:0 }}>
                      <Icon name="X" size={12}/>
                    </button>
                  </div>
                  <div style={{ paddingLeft:28 }}>
                    {q.opts.map((opt, oi) => (
                      <div key={oi} style={{
                        display:'flex', alignItems:'center', gap:7, padding:'3px 0',
                        fontSize:12,
                        color: oi===q.correct ? 'var(--green)' : 'var(--text2)',
                        fontWeight: oi===q.correct ? 700 : 400,
                      }}>
                        <div style={{
                          width:14, height:14, borderRadius:'50%', flexShrink:0,
                          background: oi===q.correct ? 'var(--green)' : 'var(--bg4)',
                          display:'flex', alignItems:'center', justifyContent:'center',
                        }}>
                          {oi===q.correct && <Icon name="Check" size={8} color="#fff" strokeWidth={3}/>}
                        </div>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Add question inline */}
              <AddQuestionInline
                onAdd={(q) => {
                  const qs = [...(mod.questions||[]), { ...q, id:Date.now() }];
                  onUpdate(idx, { ...mod, questions:qs });
                }}
                accentColor="var(--amber)"
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

// ── Course Preview ────────────────────────────────────────────────
function CoursePreview({ course, onBack, onEdit }) {
  const [activeModule, setActiveModule] = useState(0);
  const mod = course.modules[activeModule];

  const typeColor = { video:'var(--blue)', pdf:'var(--red)', quiz:'var(--amber)' };
  const typeDim   = { video:'var(--blue-dim)', pdf:'var(--red-dim)', quiz:'var(--amber-dim)' };
  const typeIcon  = { video:'Video', pdf:'FileText', quiz:'Pencil' };

  return (
    <div className="fade-in">
      {/* Back bar */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <Icon name="ArrowLeft" size={13}/> Course Builder
        </button>
        <Icon name="ChevronRight" size={13} color="var(--text3)"/>
        <span style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>Preview: {course.title}</span>
        <span style={{ marginLeft:'auto', display:'flex', gap:8 }}>
          <span className={`badge ${STATUS_STYLES[course.status]?.cls || 'badge-gray'}`}>
            {course.status}
          </span>
          {(course.status === 'Draft' || course.status === 'Published') && (
            <button className="btn btn-primary btn-sm" onClick={() => onEdit(course)}>
              <Icon name="Edit" size={12}/> Edit Course
            </button>
          )}
        </span>
      </div>

      {/* Course header */}
      <div style={{
        background:'linear-gradient(135deg, var(--brand) 0%, #1458C8 100%)',
        borderRadius:'var(--r3)', padding:'24px 28px', marginBottom:20,
        position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', top:-30, right:-30, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,0.06)' }}/>
        <div style={{ position:'relative' }}>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.65)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:600 }}>
            {course.category}
          </div>
          <div style={{ fontSize:22, fontWeight:800, color:'#fff', letterSpacing:'-0.5px', marginBottom:8 }}>
            {course.title}
          </div>
          <div style={{ fontSize:13, color:'rgba(255,255,255,0.75)', marginBottom:16, maxWidth:500 }}>
            {course.description || `Comprehensive training course covering all essential ${course.category} content including videos, PDFs and assessments.`}
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <span style={{ background:'rgba(255,255,255,0.15)', color:'#fff', fontSize:11, fontWeight:600, padding:'4px 10px', borderRadius:6, display:'flex', alignItems:'center', gap:5 }}>
              <Icon name="Book" size={10} color="#fff"/> {course.modules.length} modules
            </span>
            <span style={{ background:'rgba(255,255,255,0.15)', color:'#fff', fontSize:11, fontWeight:600, padding:'4px 10px', borderRadius:6, display:'flex', alignItems:'center', gap:5 }}>
              <Icon name="Users" size={10} color="#fff"/> {course.enrolled} enrolled
            </span>
            <span style={{ background:'rgba(255,255,255,0.15)', color:'#fff', fontSize:11, fontWeight:600, padding:'4px 10px', borderRadius:6, display:'flex', alignItems:'center', gap:5 }}>
              <Icon name="Star" size={10} color="#fff"/> Pass: 80%
            </span>
          </div>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:20, alignItems:'start' }}>

        {/* Left — content viewer */}
        <div>
          {/* Active module view */}
          {mod && (
            <div style={{ marginBottom:16 }}>
              {mod.type === 'video' && (
                <div style={{
                  background:'linear-gradient(135deg, #0A0F1E, #1A2744)',
                  borderRadius:'var(--r3)', aspectRatio:'16/9',
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                  position:'relative', marginBottom:12,
                }}>
                  <div style={{ fontSize:56, marginBottom:12 }}>🚌</div>
                  <div style={{
                    width:56, height:56, borderRadius:'50%',
                    background:'rgba(255,255,255,0.15)',
                    border:'2px solid rgba(255,255,255,0.3)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    marginBottom:12,
                  }}>
                    <Icon name="Play" size={22} color="#fff" strokeWidth={2}/>
                  </div>
                  <div style={{ fontSize:14, color:'rgba(255,255,255,0.8)', fontWeight:600 }}>
                    {mod.title}
                  </div>
                  <div style={{ position:'absolute', top:12, right:12, background:'rgba(0,0,0,0.55)', color:'rgba(255,255,255,0.55)', fontSize:9, fontFamily:'var(--font-mono)', padding:'3px 8px', borderRadius:5, display:'flex', alignItems:'center', gap:4 }}>
                    <Icon name="Shield" size={9} color="rgba(255,255,255,0.5)"/> DRM Protected
                  </div>
                  {/* Controls */}
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'rgba(0,0,0,0.8)', padding:'10px 16px', display:'flex', alignItems:'center', gap:10 }}>
                    <Icon name="Play" size={14} color="rgba(255,255,255,0.7)"/>
                    <span style={{ color:'rgba(255,255,255,0.4)', fontSize:11, fontFamily:'var(--font-mono)' }}>00:00</span>
                    <div style={{ flex:1, height:3, background:'rgba(255,255,255,0.15)', borderRadius:10 }}/>
                    <span style={{ color:'rgba(255,255,255,0.4)', fontSize:11, fontFamily:'var(--font-mono)' }}>{mod.dur}</span>
                  </div>
                </div>
              )}

              {mod.type === 'pdf' && (
                <div style={{
                  background:'#f0f0f0', borderRadius:'var(--r3)',
                  padding:'32px', minHeight:300,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  marginBottom:12,
                }}>
                  <div style={{ background:'#fff', borderRadius:'var(--r2)', padding:'36px 48px', maxWidth:480, width:'100%', boxShadow:'0 4px 20px rgba(0,0,0,0.12)' }}>
                    <div style={{ textAlign:'center', marginBottom:20 }}>
                      <Icon name="FileText" size={36} color="var(--red)"/>
                      <div style={{ fontSize:16, fontWeight:800, color:'#002060', marginTop:10 }}>{mod.title}</div>
                      <div style={{ fontSize:11, color:'#888', marginTop:6 }}>{mod.dur}</div>
                    </div>
                    <div style={{ fontSize:12, color:'#444', lineHeight:1.7 }}>
                      This PDF document covers {mod.title.toLowerCase()} for {course.category} training. Read all sections carefully before attempting the quiz.
                    </div>
                  </div>
                </div>
              )}

              {mod.type === 'quiz' && (
                <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--r3)', padding:'24px', marginBottom:12 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                    <Icon name="Pencil" size={18} color="var(--amber)"/>
                    <div style={{ fontSize:15, fontWeight:700, color:'var(--text)' }}>{mod.title}</div>
                  </div>
                  {(mod.questions?.slice(0,2) || []).map((q, qi) => (
                    <div key={qi} style={{ marginBottom:16, padding:'14px', background:'var(--bg3)', borderRadius:'var(--r2)' }}>
                      <div style={{ fontSize:13, fontWeight:600, color:'var(--text)', marginBottom:10 }}>Q{qi+1}: {q.q}</div>
                      {q.opts.map((opt, oi) => (
                        <div key={oi} style={{ display:'flex', alignItems:'center', gap:8, padding:'6px', borderRadius:6, marginBottom:4, fontSize:12, color:'var(--text2)' }}>
                          <div style={{ width:16, height:16, borderRadius:'50%', border:'2px solid var(--border2)', flexShrink:0 }}/>
                          {opt}
                        </div>
                      ))}
                    </div>
                  ))}
                  {(mod.questions?.length || 0) > 2 && (
                    <div style={{ fontSize:12, color:'var(--text3)', textAlign:'center', marginTop:8 }}>
                      +{(mod.questions?.length||0)-2} more questions
                    </div>
                  )}
                  {(!mod.questions || mod.questions.length === 0) && (
                    <div style={{ textAlign:'center', padding:'20px', color:'var(--text3)', fontSize:12 }}>
                      No questions added yet
                    </div>
                  )}
                </div>
              )}

              {/* Module title bar */}
              <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', background:'var(--bg2)', borderRadius:'var(--r2)', border:'1px solid var(--border)' }}>
                <div style={{ width:32, height:32, borderRadius:8, background:typeDim[mod.type]||'var(--bg4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon name={typeIcon[mod.type]||'Book'} size={14} color={typeColor[mod.type]||'var(--text3)'}/>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{mod.title}</div>
                  <div style={{ fontSize:11, color:'var(--text3)' }}>{mod.type} · {mod.dur}</div>
                </div>
                <div style={{ display:'flex', gap:6 }}>
                  {activeModule > 0 && (
                    <button className="btn btn-ghost btn-sm" onClick={() => setActiveModule(i => i-1)}>
                      <Icon name="ArrowLeft" size={12}/> Prev
                    </button>
                  )}
                  {activeModule < course.modules.length-1 && (
                    <button className="btn btn-primary btn-sm" onClick={() => setActiveModule(i => i+1)}>
                      Next <Icon name="ChevronRight" size={12}/>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {course.modules.length === 0 && (
            <div className="empty-state card">
              <div className="empty-icon">📚</div>
              <div>No modules in this course yet</div>
            </div>
          )}
        </div>

        {/* Right — module list */}
        <div>
          <div className="card">
            <div style={{ fontWeight:700, fontSize:13, color:'var(--text)', marginBottom:14 }}>
              Course Contents
            </div>
            {course.modules.map((m, i) => (
              <div key={i}
                onClick={() => setActiveModule(i)}
                style={{
                  display:'flex', alignItems:'center', gap:10,
                  padding:'10px 10px', borderRadius:'var(--r)',
                  background: activeModule===i ? typeDim[m.type]||'var(--blue-dim)' : 'transparent',
                  border:`1px solid ${activeModule===i ? (typeColor[m.type]||'var(--brand)')+'33' : 'transparent'}`,
                  cursor:'pointer', marginBottom:5, transition:'all 0.13s',
                }}
              >
                <div style={{
                  width:28, height:28, borderRadius:7, flexShrink:0,
                  background: activeModule===i ? (typeColor[m.type]||'var(--brand)') : 'var(--bg4)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <Icon
                    name={typeIcon[m.type]||'Book'}
                    size={13}
                    color={activeModule===i ? '#fff' : 'var(--text3)'}
                  />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{
                    fontSize:12.5, fontWeight:activeModule===i?700:500,
                    color:activeModule===i?(typeColor[m.type]||'var(--brand)'):'var(--text)',
                    overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                  }}>
                    {m.title || `Module ${i+1}`}
                  </div>
                  <div style={{ fontSize:10, color:'var(--text3)' }}>{m.dur}</div>
                </div>
                <span style={{ fontSize:9, fontWeight:700, textTransform:'uppercase', color:typeColor[m.type]||'var(--text3)', flexShrink:0 }}>
                  {m.type}
                </span>
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
  const [courses,       setCourses]       = useState(INITIAL_COURSES);
  const [editing,       setEditing]       = useState(null);
  const [creating,      setCreating]      = useState(false);
  const [filter,        setFilter]        = useState('All');
  const [search,        setSearch]        = useState('');
  const [previewCourse, setPreviewCourse] = useState(null);

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

  if (creating)      return <CourseEditor course={null}    onSave={handleSave} onBack={()=>setCreating(false)}/>;
  if (editing)       return <CourseEditor course={editing} onSave={handleSave} onBack={()=>setEditing(null)}/>;
  if (previewCourse) return <CoursePreview course={previewCourse} onBack={()=>setPreviewCourse(null)} onEdit={c=>{setPreviewCourse(null);setEditing(c);}}/>;

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
          const st         = STATUS_STYLES[c.status] || STATUS_STYLES['Draft'];
          const videoCount = c.modules.filter(m => m.type==='video').length;
          const pdfCount   = c.modules.filter(m => m.type==='pdf').length;
          const quizCount  = c.modules.filter(m => m.type==='quiz').length;

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
              borderRadius:'var(--r3)',
              padding:'20px 22px',
              boxShadow:'var(--shadow-sm)',
              transition:'all 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow='var(--shadow-md)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow='var(--shadow-sm)'}
            >
              {/* Top row */}
              <div style={{ display:'flex', alignItems:'flex-start', gap:16, marginBottom:12 }}>

                {/* Icon */}
                <div style={{
                  width:48, height:48, borderRadius:12, flexShrink:0,
                  background: c.status==='Published'       ? 'var(--green-dim)'
                    : c.status==='Pending Approval'        ? 'var(--amber-dim)'
                    : c.status==='Rejected'                ? 'var(--red-dim)'
                    : 'var(--bg4)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  border:`1.5px solid ${
                    c.status==='Published'       ? 'rgba(22,163,74,0.2)'
                    : c.status==='Pending Approval' ? 'rgba(217,119,6,0.2)'
                    : c.status==='Rejected'      ? 'rgba(220,38,38,0.2)'
                    : 'var(--border)'
                  }`,
                }}>
                  <Icon name="Book" size={20} color={
                    c.status==='Published'       ? 'var(--green)'
                    : c.status==='Pending Approval' ? 'var(--amber)'
                    : c.status==='Rejected'      ? 'var(--red)'
                    : 'var(--text3)'
                  }/>
                </div>

                {/* Title + status + actions */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, marginBottom:6 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, minWidth:0 }}>
                      <span style={{ fontSize:15, fontWeight:800, color:'var(--text)', letterSpacing:'-0.3px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {c.title}
                      </span>
                      <span className={`badge ${st.cls}`} style={{ flexShrink:0 }}>
                        <Icon name={st.icon} size={9} strokeWidth={2.5}/> {c.status}
                      </span>
                    </div>

                    {/* Actions — NO analytics */}
                    <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                      <div style={{ display:'flex', gap:6 }}>
                        {(c.status === 'Published' || c.status === 'Pending Approval') && (
                          <button className="btn btn-ghost btn-sm" onClick={() => setPreviewCourse(c)}>
                            <Icon name="Eye" size={12}/> Preview
                          </button>
                        )}
                        <button className="btn btn-ghost btn-sm" onClick={() => setEditing(c)}>
                          <Icon name="Edit" size={12}/> Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            if (window.confirm(`Delete "${c.title}"?`))
                              setCourses(prev => prev.filter(x => x.id !== c.id));
                          }}>
                          <Icon name="X" size={12}/> Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div style={{ fontSize:12.5, color:'var(--text2)', lineHeight:1.55, marginBottom:10, maxWidth:680 }}>
                    {c.description || `This course covers essential ${c.category} training content for bus drivers. Includes ${c.modules.length} modules with videos, PDFs and assessments.`}
                  </div>

                  {/* Chips */}
                  <div style={{ display:'flex', gap:7, flexWrap:'wrap', alignItems:'center' }}>
                    <span className="chip" style={{ fontSize:10 }}>
                      <Icon name="Layers" size={9}/> {c.category}
                    </span>
                    <span className="chip" style={{ fontSize:10 }}>
                      <Icon name="Book" size={9}/> {c.modules.length} modules
                    </span>
                    {videoCount > 0 && (
                      <span className="chip" style={{ fontSize:10 }}>
                        <Icon name="Video" size={9}/> {videoCount} video{videoCount>1?'s':''}
                      </span>
                    )}
                    {pdfCount > 0 && (
                      <span className="chip" style={{ fontSize:10 }}>
                        <Icon name="FileText" size={9}/> {pdfCount} PDF{pdfCount>1?'s':''}
                      </span>
                    )}
                    {quizCount > 0 && (
                      <span className="chip" style={{ fontSize:10 }}>
                        <Icon name="Pencil" size={9}/> {quizCount} quiz{quizCount>1?'zes':''}
                      </span>
                    )}
                    {c.enrolled > 0 && (
                      <span className="chip" style={{ fontSize:10 }}>
                        <Icon name="Users" size={9}/> {c.enrolled} enrolled
                      </span>
                    )}
                    {c.status === 'Published' && c.approvedAt && (
                      <span style={{ fontSize:10, color:'var(--green)', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}>
                        <Icon name="Check" size={9} color="var(--green)" strokeWidth={2.5}/>
                        Approved {c.approvedAt}
                      </span>
                    )}
                    {c.status === 'Pending Approval' && (
                      <span style={{ fontSize:10, color:'var(--amber)', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}>
                        <Icon name="Clock" size={9} color="var(--amber)"/>
                        Awaiting admin review · Submitted {c.submittedAt}
                      </span>
                    )}
                    {c.status === 'Rejected' && (
                      <span style={{ fontSize:10, color:'var(--red)', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}>
                        <Icon name="X" size={9} color="var(--red)"/>
                        Rejected — please edit and resubmit
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Module preview bar */}
              {c.modules.length > 0 && (
                <div style={{
                  marginTop:12, paddingTop:12,
                  borderTop:'1px solid var(--border)',
                  display:'flex', gap:6, flexWrap:'wrap',
                }}>
                  {c.modules.map((mod, mi) => {
                    const modIcon  = mod.type==='video' ? 'Video' : mod.type==='pdf' ? 'FileText' : 'Pencil';
                    const modColor = mod.type==='video' ? 'var(--blue)' : mod.type==='pdf' ? 'var(--red)' : 'var(--amber)';
                    const modDim   = mod.type==='video' ? 'var(--blue-dim)' : mod.type==='pdf' ? 'var(--red-dim)' : 'var(--amber-dim)';
                    return (
                      <div key={mi} style={{
                        display:'flex', alignItems:'center', gap:5,
                        padding:'4px 10px', borderRadius:6,
                        background: modDim,
                        border:`1px solid ${modColor}22`,
                        fontSize:11, fontWeight:600, color: modColor,
                      }}>
                        <Icon name={modIcon} size={10} color={modColor}/>
                        {mod.title || `Module ${mi+1}`}
                        {mod.dur && (
                          <span style={{ fontSize:10, color:`${modColor}99`, fontWeight:400 }}>
                            · {mod.dur}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}