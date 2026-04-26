import React, { useState } from 'react';
import Icon from '../components/Icons';

const CATEGORIES = [
  { id:'pre',    label:'Public Bus — Pre Service', color:'var(--blue)',  dim:'var(--blue-dim)'  },
  { id:'in',     label:'Public Bus — In Service',  color:'var(--teal)',  dim:'var(--teal-dim)'  },
  { id:'school', label:'School Bus Training',      color:'var(--amber)', dim:'var(--amber-dim)' },
];

const INITIAL_QUIZZES = {
  pre: [
    {
      id:1, title:'Introduction & Safety Check', source:'intro_safety_brief.mp4',
      sourceType:'video', questions:[
        { id:1, q:'What is the first thing a driver should check before starting the bus?', opts:['Fuel level','Mirrors and lights','Passenger count','Route map'], correct:1 },
        { id:2, q:'When approaching a bus stop, you should signal at least how many meters before?', opts:['10 meters','50 meters','100 meters','200 meters'], correct:2 },
        { id:3, q:'What does a flashing amber light on the dashboard indicate?', opts:['Engine failure','Low fuel','Door open warning','Battery issue'], correct:2 },
      ],
    },
    {
      id:2, title:'Wet Weather Driving Assessment', source:'wet_weather_techniques.mp4',
      sourceType:'video', questions:[
        { id:1, q:'In wet weather, stopping distance should be at least how much longer?', opts:['Same','1.5× longer','Twice as long','3× longer'], correct:2 },
        { id:2, q:'When driving in heavy rain, you should?', opts:['Speed up to get through faster','Reduce speed and increase following distance','Use hazard lights always','Avoid using brakes'], correct:1 },
      ],
    },
  ],
  in: [
    {
      id:3, title:'Defensive Driving Assessment', source:'defensive_driving_guide.pdf',
      sourceType:'pdf', questions:[
        { id:1, q:'Defensive driving primarily focuses on?', opts:['Driving fast','Anticipating hazards','Following other drivers','Ignoring road signs'], correct:1 },
        { id:2, q:'The two-second rule refers to?', opts:['Speed limit','Following distance','Signal timing','Break time'], correct:1 },
        { id:3, q:'When a passenger is being difficult, you should?', opts:['Argue back','Ignore them','Stay calm and follow protocol','Stop the bus immediately'], correct:2 },
      ],
    },
  ],
  school: [
    {
      id:4, title:'Child Safety Procedures Quiz', source:'child_safety_procedures.pdf',
      sourceType:'pdf', questions:[
        { id:1, q:'Before moving the bus, a school bus driver must?', opts:['Check mirrors only','Count all children aboard','Sound the horn','Open all windows'], correct:1 },
        { id:2, q:'A child is crossing in front of the bus. You should?', opts:['Proceed slowly','Wait until fully clear','Sound the horn','Open door immediately'], correct:1 },
      ],
    },
  ],
};

const EMPTY_QUESTION = { q:'', opts:['','','',''], correct:0 };

function QuizEditor({ quiz, categoryColor, onSave, onBack }) {
  const [title,     setTitle]     = useState(quiz?.title     || '');
  const [source,    setSource]    = useState(quiz?.source    || '');
  const [sourceType,setSourceType]= useState(quiz?.sourceType|| 'video');
  const [questions, setQuestions] = useState(quiz?.questions || []);
  const [newQ,      setNewQ]      = useState({ ...EMPTY_QUESTION });
  const [toast,     setToast]     = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(''),2500); };

  const addQuestion = () => {
    if (!newQ.q.trim() || newQ.opts.some(o => !o.trim())) {
      showToast('❌ Fill in question and all options'); return;
    }
    setQuestions(prev => [...prev, { ...newQ, id:Date.now() }]);
    setNewQ({ ...EMPTY_QUESTION });
    showToast('✅ Question added');
  };

  const removeQ = (idx) => setQuestions(prev => prev.filter((_,i) => i!==idx));

  return (
    <div className="fade-in">
      {toast && (
        <div style={{
          position:'fixed', top:20, right:20, zIndex:2000,
          background: toast.startsWith('❌') ? 'var(--red-dim)' : 'var(--green-dim)',
          border:`1px solid ${toast.startsWith('❌')?'rgba(220,38,38,0.3)':'rgba(22,163,74,0.3)'}`,
          borderRadius:'var(--r2)', padding:'11px 16px',
          fontSize:13, fontWeight:600,
          color: toast.startsWith('❌') ? 'var(--red)' : 'var(--green)',
          boxShadow:'var(--shadow-lg)',
        }}>{toast}</div>
      )}

      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <Icon name="ArrowLeft" size={13}/> Quiz Bank
        </button>
        <Icon name="ChevronRight" size={13} color="var(--text3)"/>
        <span style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>
          {quiz ? 'Edit Quiz' : 'New Quiz'}
        </span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:20, alignItems:'start' }}>

        {/* Left */}
        <div>
          {/* Quiz info */}
          <div className="card mb16">
            <div style={{ fontWeight:700, fontSize:14, color:'var(--text)', marginBottom:16 }}>Quiz Details</div>
            <div className="form-group">
              <label className="form-label">Quiz Title</label>
              <input className="form-input" placeholder="e.g. Module 1 Assessment"
                value={title} onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className="form-group">
              <label className="form-label">Source Type</label>
              <div style={{ display:'flex', gap:8, marginBottom:12 }}>
                {[
                  { key:'video', icon:'Video',    label:'From Video' },
                  { key:'pdf',   icon:'FileText', label:'From PDF'   },
                  { key:'manual',icon:'Pencil',   label:'Manual'     },
                ].map(t => (
                  <button key={t.key} onClick={() => setSourceType(t.key)} style={{
                    flex:1, padding:'9px 8px', borderRadius:'var(--r)',
                    border:`1.5px solid ${sourceType===t.key?categoryColor:'var(--border2)'}`,
                    background: sourceType===t.key ? `${categoryColor}15` : 'var(--bg3)',
                    cursor:'pointer', display:'flex', flexDirection:'column',
                    alignItems:'center', gap:5, transition:'all 0.13s',
                  }}>
                    <Icon name={t.icon} size={15} color={sourceType===t.key?categoryColor:'var(--text3)'}/>
                    <span style={{ fontSize:11, fontWeight:600, color:sourceType===t.key?categoryColor:'var(--text3)' }}>
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            {sourceType !== 'manual' && (
              <div className="form-group" style={{ marginBottom:0 }}>
                <label className="form-label">
                  Linked {sourceType === 'video' ? 'Video' : 'PDF'} File
                </label>
                <input className="form-input"
                  placeholder={sourceType==='video' ? 'e.g. intro_safety_brief.mp4' : 'e.g. safety_guide.pdf'}
                  value={source} onChange={e => setSource(e.target.value)}/>
                {sourceType === 'pdf' && (
                  <div style={{ marginTop:8, padding:'10px 12px', background:'var(--blue-dim)', borderRadius:'var(--r)', border:'1px solid rgba(27,110,243,0.15)' }}>
                    <div style={{ fontSize:11, color:'var(--brand)', fontWeight:600, marginBottom:4 }}>
                      <Icon name="Info" size={11}/> PDF Auto-suggest
                    </div>
                    <div style={{ fontSize:11, color:'var(--text2)' }}>
                      When linked to a PDF, the system can auto-suggest questions based on the document content. Add your PDF filename above and questions will be suggested below.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Existing questions */}
          <div className="card mb16">
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <div style={{ fontWeight:700, fontSize:14, color:'var(--text)' }}>
                Questions ({questions.length})
              </div>
              {questions.length > 0 && (
                <span className="badge badge-green">
                  <Icon name="Check" size={9} strokeWidth={2.5}/> {questions.length} questions ready
                </span>
              )}
            </div>

            {questions.length === 0 ? (
              <div style={{
                textAlign:'center', padding:'28px', border:'2px dashed var(--border2)',
                borderRadius:'var(--r2)', color:'var(--text3)',
              }}>
                <Icon name="Pencil" size={28} color="var(--text4)"/>
                <div style={{ fontSize:13, fontWeight:600, marginTop:10 }}>No questions yet</div>
                <div style={{ fontSize:11, marginTop:4 }}>Add questions below</div>
              </div>
            ) : questions.map((q, qi) => (
              <div key={q.id || qi} style={{
                background:'var(--bg3)', borderRadius:'var(--r2)',
                padding:'14px 16px', marginBottom:10,
                border:'1px solid var(--border)',
              }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                  <div style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
                    <div style={{
                      width:22, height:22, borderRadius:6, flexShrink:0,
                      background: categoryColor, color:'#fff',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:11, fontWeight:700,
                    }}>{qi+1}</div>
                    <span style={{ fontSize:13, fontWeight:600, color:'var(--text)', lineHeight:1.4 }}>
                      {q.q}
                    </span>
                  </div>
                  <button onClick={() => removeQ(qi)} style={{
                    background:'none', border:'none', cursor:'pointer', color:'var(--red)',
                    flexShrink:0, padding:2,
                  }}>
                    <Icon name="X" size={13}/>
                  </button>
                </div>
                <div style={{ paddingLeft:30 }}>
                  {q.opts.map((opt, oi) => (
                    <div key={oi} style={{
                      display:'flex', alignItems:'center', gap:8,
                      padding:'4px 0', fontSize:12,
                      color: oi===q.correct ? 'var(--green)' : 'var(--text2)',
                      fontWeight: oi===q.correct ? 700 : 400,
                    }}>
                      <div style={{
                        width:16, height:16, borderRadius:'50%', flexShrink:0,
                        background: oi===q.correct ? 'var(--green)' : 'var(--bg4)',
                        display:'flex', alignItems:'center', justifyContent:'center',
                      }}>
                        {oi===q.correct && <Icon name="Check" size={9} color="#fff" strokeWidth={3}/>}
                      </div>
                      {opt}
                      {oi===q.correct && (
                        <span style={{ fontSize:10, color:'var(--green)', fontWeight:600 }}>✓ Correct</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Add question form */}
          <div className="card" style={{ borderTop:`3px solid ${categoryColor}` }}>
            <div style={{ fontWeight:700, fontSize:14, color:'var(--text)', marginBottom:16 }}>
              Add New Question
            </div>
            <div className="form-group">
              <label className="form-label">Question *</label>
              <textarea className="form-input" placeholder="Type your question here..."
                style={{ minHeight:70 }}
                value={newQ.q}
                onChange={e => setNewQ(p => ({ ...p, q:e.target.value }))}/>
            </div>
            <div className="form-group">
              <label className="form-label">Answer Options * (select the correct one)</label>
              {newQ.opts.map((opt, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                  <div
                    onClick={() => setNewQ(p => ({ ...p, correct:i }))}
                    style={{
                      width:20, height:20, borderRadius:'50%', flexShrink:0, cursor:'pointer',
                      border:`2px solid ${newQ.correct===i ? categoryColor : 'var(--border2)'}`,
                      background: newQ.correct===i ? categoryColor : 'transparent',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      transition:'all 0.13s',
                    }}
                  >
                    {newQ.correct===i && <Icon name="Check" size={10} color="#fff" strokeWidth={3}/>}
                  </div>
                  <input className="form-input"
                    placeholder={`Option ${i+1}${newQ.correct===i?' — Correct answer':''}`}
                    value={opt}
                    onChange={e => {
                      const opts = [...newQ.opts];
                      opts[i] = e.target.value;
                      setNewQ(p => ({ ...p, opts }));
                    }}
                  />
                </div>
              ))}
              <div style={{ fontSize:11, color:'var(--text3)', marginTop:4 }}>
                Click the circle to mark the correct answer
              </div>
            </div>
            <button className="btn btn-primary" onClick={addQuestion}>
              <Icon name="Plus" size={13}/> Add Question
            </button>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div className="card">
            <div style={{ fontWeight:700, fontSize:13, color:'var(--text)', marginBottom:14 }}>
              Quiz Summary
            </div>
            {[
              { label:'Questions',   val:`${questions.length}`,                           icon:'Pencil'   },
              { label:'Source',      val:sourceType==='manual'?'Manual':'From file',       icon:'Link'     },
              { label:'Linked file', val:source||'—',                                     icon:'FileText' },
              { label:'Pass mark',   val:'80%',                                           icon:'Star'     },
            ].map(r => (
              <div key={r.label} className="kv-row">
                <span className="kv-key" style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <Icon name={r.icon} size={11}/> {r.label}
                </span>
                <span className="kv-val" style={{ fontSize:11, maxWidth:140, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                  {r.val}
                </span>
              </div>
            ))}
            <div style={{ marginTop:14 }}>
              <button
                className="btn btn-primary w100"
                disabled={!title || questions.length === 0}
                onClick={() => { onSave({ ...quiz, id:quiz?.id||Date.now(), title, source, sourceType, questions }); onBack(); }}
              >
                <Icon name="Check" size={13}/> Save Quiz
              </button>
            </div>
          </div>

          {/* PDF auto-suggest panel */}
          {sourceType === 'pdf' && source && (
            <div style={{
              background:'var(--amber-dim)', border:'1px solid rgba(217,119,6,0.2)',
              borderRadius:'var(--r2)', padding:'14px',
            }}>
              <div style={{ fontSize:12, fontWeight:700, color:'var(--amber)', marginBottom:10 }}>
                <Icon name="Zap" size={12}/> PDF Auto-Suggest
              </div>
              <div style={{ fontSize:11, color:'var(--text2)', marginBottom:12, lineHeight:1.5 }}>
                Based on <strong>{source}</strong>, here are suggested questions:
              </div>
              {[
                'What is the main purpose of this training document?',
                'Which safety procedure is described in section 2?',
                'What action should be taken in an emergency situation?',
              ].map((sq, i) => (
                <div key={i} style={{
                  display:'flex', alignItems:'flex-start', gap:8,
                  padding:'8px 10px', background:'var(--bg2)',
                  borderRadius:'var(--r)', marginBottom:6,
                  border:'1px solid var(--border)', cursor:'pointer',
                  transition:'all 0.13s',
                }}
                  onClick={() => setNewQ(p => ({ ...p, q:sq }))}
                  onMouseEnter={e => e.currentTarget.style.borderColor='var(--amber)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
                >
                  <Icon name="Plus" size={12} color="var(--amber)"/>
                  <span style={{ fontSize:11, color:'var(--text2)', lineHeight:1.4 }}>{sq}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function QuizBankPage() {
  const [quizzes,  setQuizzes]  = useState(INITIAL_QUIZZES);
  const [activeCat,setActiveCat]= useState('pre');
  const [editing,  setEditing]  = useState(null);
  const [creating, setCreating] = useState(false);

  const cat = CATEGORIES.find(c => c.id === activeCat);

  const handleSave = (quiz) => {
    setQuizzes(prev => ({
      ...prev,
      [activeCat]: prev[activeCat].find(q => q.id===quiz.id)
        ? prev[activeCat].map(q => q.id===quiz.id ? quiz : q)
        : [...prev[activeCat], quiz],
    }));
    setEditing(null);
    setCreating(false);
  };

  if (creating) return <QuizEditor quiz={null}      categoryColor={cat.color} onSave={handleSave} onBack={()=>setCreating(false)}/>;
  if (editing)  return <QuizEditor quiz={editing}   categoryColor={cat.color} onSave={handleSave} onBack={()=>setEditing(null)}/>;

  const currentQuizzes = quizzes[activeCat] || [];
  const totalQ = currentQuizzes.reduce((a,q) => a+q.questions.length, 0);

  return (
    <div className="fade-in">

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>
            Quiz Bank
          </div>
          <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>
            Create and manage quizzes by training category
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setCreating(true)}>
          <Icon name="Plus" size={14}/> New Quiz
        </button>
      </div>

      {/* Category tabs */}
      <div style={{ display:'flex', gap:10, marginBottom:24 }}>
        {CATEGORIES.map(cat => {
          const count = (quizzes[cat.id]||[]).length;
          const isActive = activeCat === cat.id;
          return (
            <div key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              style={{
                flex:1, padding:'16px 20px', borderRadius:'var(--r3)',
                border:`2px solid ${isActive ? cat.color : 'var(--border)'}`,
                background: isActive ? cat.dim : 'var(--bg2)',
                cursor:'pointer', transition:'all 0.15s',
                boxShadow: isActive ? `0 4px 16px ${cat.color}22` : 'var(--shadow-sm)',
              }}
            >
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
                <span style={{ fontSize:13, fontWeight:800, color: isActive ? cat.color : 'var(--text)', letterSpacing:'-0.2px' }}>
                  {cat.label}
                </span>
                <span style={{
                  background: isActive ? cat.color : 'var(--bg4)',
                  color: isActive ? '#fff' : 'var(--text3)',
                  fontSize:11, fontWeight:700, padding:'2px 8px',
                  borderRadius:10, fontFamily:'var(--font-mono)',
                }}>{count}</span>
              </div>
              <div style={{ fontSize:11, color: isActive ? cat.color : 'var(--text3)' }}>
                {(quizzes[cat.id]||[]).reduce((a,q)=>a+q.questions.length,0)} questions total
              </div>
            </div>
          );
        })}
      </div>

      {/* Quiz list */}
      {currentQuizzes.length === 0 ? (
        <div className="card empty-state">
          <div className="empty-icon">✏️</div>
          <div style={{ marginBottom:12 }}>No quizzes for {cat.label} yet</div>
          <button className="btn btn-primary btn-sm" onClick={() => setCreating(true)}>
            <Icon name="Plus" size={12}/> Create First Quiz
          </button>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {currentQuizzes.map(quiz => (
            <div key={quiz.id} style={{
              background:'var(--bg2)', border:'1px solid var(--border)',
              borderRadius:'var(--r3)', padding:'18px 20px',
              display:'flex', alignItems:'center', gap:16,
              boxShadow:'var(--shadow-sm)', transition:'all 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow='var(--shadow-md)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow='var(--shadow-sm)'}
            >
              {/* Quiz icon */}
              <div style={{
                width:48, height:48, borderRadius:12, flexShrink:0,
                background:cat.dim, border:`1.5px solid ${cat.color}33`,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <Icon name="Pencil" size={20} color={cat.color}/>
              </div>

              {/* Info */}
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14.5, fontWeight:800, color:'var(--text)', marginBottom:6 }}>
                  {quiz.title}
                </div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <span className="chip" style={{ fontSize:10 }}>
                    <Icon name="Pencil" size={9}/> {quiz.questions.length} questions
                  </span>
                  {quiz.source && (
                    <span className="chip" style={{ fontSize:10 }}>
                      <Icon name={quiz.sourceType==='pdf'?'FileText':'Video'} size={9}/>
                      {quiz.sourceType === 'pdf' ? 'From PDF' : 'From Video'}: {quiz.source}
                    </span>
                  )}
                  <span className="chip" style={{ fontSize:10 }}>
                    <Icon name="Star" size={9}/> Pass: 80%
                  </span>
                </div>
              </div>

              {/* Question count */}
              <div style={{ textAlign:'center', flexShrink:0 }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:24, fontWeight:800, color:cat.color }}>
                  {quiz.questions.length}
                </div>
                <div style={{ fontSize:10, color:'var(--text3)', fontWeight:600 }}>Questions</div>
              </div>

              {/* Actions */}
              <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                <button className="btn btn-primary btn-sm" onClick={() => setEditing(quiz)}>
                  <Icon name="Edit" size={12}/> Edit
                </button>
                <button className="btn btn-ghost btn-sm"
                  onClick={() => {
                    setQuizzes(prev => ({
                      ...prev,
                      [activeCat]: prev[activeCat].filter(q => q.id!==quiz.id),
                    }));
                  }}>
                  <Icon name="X" size={12}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}