import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/mockData';
import CircleProgress from './CircleProgress';
import Icon from './Icons';

export default function QuizWidget() {
  const [qi,       setQi]       = useState(0);
  const [sel,      setSel]      = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score,    setScore]    = useState(0);
  const [done,     setDone]     = useState(false);

  const q      = QUIZ_QUESTIONS[qi];
  const total  = QUIZ_QUESTIONS.length;
  const pct    = Math.round((score / total) * 100);
  const passed = pct >= 80;

  const reset = () => { setQi(0); setSel(null); setRevealed(false); setScore(0); setDone(false); };

  const submit = () => {
    if (sel === null) return;
    if (sel === q.correct) setScore(s => s + 1);
    setRevealed(true);
  };

  const next = () => {
    if (qi + 1 >= total) { setDone(true); return; }
    setQi(i => i + 1);
    setSel(null);
    setRevealed(false);
  };

  if (done) return (
    <div className="fade-in" style={{ textAlign:'center', padding:'24px 0' }}>
      <CircleProgress pct={pct} color={passed ? 'var(--green)' : 'var(--red)'} size={90} />
      <div style={{ marginTop:16, fontFamily:'var(--font-head)', fontSize:20, fontWeight:800, color:'var(--text)' }}>
        {passed ? '🎉 Quiz Passed!' : '📚 Keep Studying'}
      </div>
      <div style={{ color:'var(--text2)', fontSize:13, marginTop:6 }}>
        {score} of {total} correct · {pct}%
      </div>
      <div style={{ marginTop:6 }}>
        <span className={`badge ${passed ? 'badge-green' : 'badge-red'}`}>
          <Icon name={passed ? 'Check' : 'X'} size={10} strokeWidth={2.5} />
          {passed ? 'PASSED' : 'FAILED'} · Threshold 80%
        </span>
      </div>
      <div style={{ marginTop:20, marginBottom:8 }}>
        <div className="prog-bar" style={{ height:8, maxWidth:280, margin:'0 auto' }}>
          <div className={`prog-fill ${passed ? 'prog-green' : 'prog-red'}`} style={{ width:`${pct}%` }} />
        </div>
      </div>
      <button className="btn btn-primary" style={{ marginTop:16 }} onClick={reset}>
        <Icon name="Refresh" size={14} /> Retake Quiz
      </button>
    </div>
  );

  const optClass = (i) => {
    if (!revealed) return sel === i ? 'selected' : '';
    if (i === q.correct) return 'correct';
    if (i === sel && sel !== q.correct) return 'wrong';
    return '';
  };

  return (
    <div className="fade-in">
      {/* Progress header */}
      <div className="flex items-center justify-between mb16">
        <span style={{ fontSize:12, color:'var(--text3)', fontWeight:600 }}>
          Question {qi + 1} of {total}
        </span>
        <div className="prog-bar" style={{ width:160, height:5 }}>
          <div className="prog-fill prog-blue" style={{ width:`${((qi)/total)*100}%` }} />
        </div>
        <span style={{ fontSize:12, color:'var(--text3)', fontFamily:'var(--font-mono)' }}>
          {score} pts
        </span>
      </div>

      <div className="quiz-question">{q.q}</div>

      {q.opts.map((opt, i) => (
        <div key={i}
          className={`quiz-option ${optClass(i)}`}
          onClick={() => !revealed && setSel(i)}>
          <div className="quiz-radio">
            {revealed && i === q.correct && <Icon name="Check" size={10} color="#fff" strokeWidth={3} />}
            {revealed && i === sel && sel !== q.correct && <Icon name="X" size={10} color="#fff" strokeWidth={3} />}
          </div>
          <span style={{ fontSize:13.5, lineHeight:1.45 }}>{opt}</span>
        </div>
      ))}

      <div className="flex justify-between items-center" style={{ marginTop:20 }}>
        {!revealed ? (
          <button className="btn btn-primary" onClick={submit} disabled={sel === null}>
            <Icon name="Check" size={14} /> Submit Answer
          </button>
        ) : (
          <div className="flex items-center gap8">
            <span className={`badge ${sel === q.correct ? 'badge-green' : 'badge-red'}`}>
              <Icon name={sel === q.correct ? 'Check' : 'X'} size={10} strokeWidth={2.5} />
              {sel === q.correct ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
        )}
        {revealed && (
          <button className="btn btn-ghost" onClick={next}>
            {qi + 1 >= total ? 'See Results' : 'Next Question'}
            <Icon name="ChevronRight" size={14} />
          </button>
        )}
      </div>
      </div>
  );
}