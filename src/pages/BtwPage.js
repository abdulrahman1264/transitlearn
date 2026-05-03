import React, { useState } from 'react';
import { BTW_SESSIONS, BTW_SKILLS } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import CircleProgress from '../components/CircleProgress';
import Icon from '../components/Icons';

function scoreColor(s) {
  if (s >= 80) return 'var(--green)';
  if (s >= 70) return 'var(--amber)';
  return 'var(--red)';
}
function scoreCls(s) {
  if (s >= 80) return 'badge-green';
  if (s >= 70) return 'badge-amber';
  return 'badge-red';
}

function BtwScorer({ session, onBack }) {
  const [ratings, setRatings] = useState(
    Object.fromEntries(BTW_SKILLS.map(s => [s, 0]))
  );
  const [notes,   setNotes]   = useState('');
  const [saved,   setSaved]   = useState(false);

  const filled   = Object.values(ratings).filter(v => v > 0).length;
  const avgScore = filled > 0
    ? Math.round((Object.values(ratings).reduce((a,b)=>a+b,0) / (BTW_SKILLS.length * 5)) * 100)
    : 0;

  const dotColor = (skill, dot) => {
    const r = ratings[skill];
    if (dot > r) return '';
    if (r >= 4) return 'high';
    if (r >= 3) return 'mid';
    return 'low';
  };

  if (saved) return (
    <div className="fade-in" style={{ textAlign:'center', padding:'60px 20px' }}>
      <div style={{ fontSize:56, marginBottom:16 }}>✅</div>
      <div style={{ fontFamily:'var(--font-head)', fontSize:22, fontWeight:800, color:'var(--text)', marginBottom:8 }}>
        Session Submitted!
      </div>
      <div style={{ color:'var(--text2)', fontSize:13, marginBottom:24 }}>
        BTW evaluation for <strong>{session.driver}</strong> has been saved and signed.
      </div>
      <div style={{ display:'flex', justifyContent:'center', gap:12 }}>
        <span className="badge badge-green" style={{ fontSize:13, padding:'6px 14px' }}>
          <Icon name="Check" size={12} strokeWidth={2.5}/> Overall Score: {avgScore}%
        </span>
      </div>
      <button className="btn btn-ghost" style={{ marginTop:24 }} onClick={onBack}>
        <Icon name="ArrowLeft" size={13}/> Back to Sessions
      </button>
    </div>
  );

  return (
    <div className="fade-in">
      <div className="flex items-center gap12 mb24">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <Icon name="ArrowLeft" size={13}/> Back
        </button>
        <span style={{ color:'var(--text3)' }}>›</span>
        <span style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>
          Evaluate: {session.driver}
        </span>
      </div>

      <div className="g2-1" style={{ alignItems:'start' }}>

        {/* Scorer */}
        <div className="card">
          <div className="sec-head mb16">
            <div>
              <div className="sec-title">Skill Assessment</div>
              <div className="sec-sub">Rate each skill from 1 (poor) to 5 (excellent)</div>
            </div>
            <CircleProgress
              pct={avgScore}
              color={avgScore >= 80 ? 'var(--green)' : avgScore >= 70 ? 'var(--amber)' : 'var(--red)'}
              size={52}
            />
          </div>

          {BTW_SKILLS.map(skill => (
            <div key={skill} className="skill-row">
              <span className="skill-name">{skill}</span>
              <div className="skill-dots">
                {[1,2,3,4,5].map(dot => (
                  <div
                    key={dot}
                    className={`skill-dot ${dot <= ratings[skill] ? `filled ${dotColor(skill,dot)}` : ''}`}
                    onClick={() => setRatings(r => ({ ...r, [skill]: dot }))}
                    title={`${dot}/5`}
                  />
                ))}
              </div>
              <span style={{
                fontFamily:'var(--font-mono)', fontSize:12, fontWeight:700, width:24, textAlign:'right',
                color: ratings[skill] === 0 ? 'var(--text3)'
                  : ratings[skill] >= 4 ? 'var(--green)'
                  : ratings[skill] >= 3 ? 'var(--amber)' : 'var(--red)'
              }}>
                {ratings[skill] > 0 ? `${ratings[skill]}/5` : '—'}
              </span>
            </div>
          ))}

          <div className="form-group" style={{ marginTop:20 }}>
            <label className="form-label">
              <Icon name="Edit" size={11}/> Trainer Notes
            </label>
            <textarea
              className="form-input"
              placeholder="Add observations, areas for improvement, commendations..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex items-center justify-between" style={{ marginTop:16 }}>
            <span style={{ fontSize:12, color:'var(--text3)' }}>
              {filled} of {BTW_SKILLS.length} skills rated
            </span>
            <button
              className="btn btn-primary"
              disabled={filled < BTW_SKILLS.length}
              onClick={() => setSaved(true)}
            >
              <Icon name="Check" size={14}/> Submit & Sign
            </button>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

          {/* Session info */}
          <div className="card card-accent-blue">
            <div className="flex items-center gap8 mb14">
              <Icon name="Car" size={15} color="var(--blue)"/>
              <span style={{ fontWeight:700, fontSize:14, color:'var(--text)' }}>Session Info</span>
            </div>
            {[
              { key:'Driver',   val: session.driver,  icon:'Users'         },
              { key:'Trainer',  val: session.trainer, icon:'GraduationCap' },
              { key:'Date',     val: session.date,    icon:'Calendar'      },
              { key:'Route',    val: session.route,   icon:'Map'           },
              { key:'Duration', val: `${session.dur} min`, icon:'Clock'   },
            ].map(r => (
              <div key={r.key} className="kv-row">
                <span className="kv-key flex items-center gap4">
                  <Icon name={r.icon} size={11}/> {r.key}
                </span>
                <span className="kv-val" style={{ fontSize:12 }}>{r.val}</span>
              </div>
            ))}
          </div>

          {/* Scoring guide */}
          <div className="card">
            <div className="flex items-center gap8 mb14">
              <Icon name="Info" size={15} color="var(--text3)"/>
              <span style={{ fontWeight:700, fontSize:14, color:'var(--text)' }}>Scoring Guide</span>
            </div>
            {[
              { dot:'high', score:'5 — Excellent',   desc:'Exceeds standard consistently'    },
              { dot:'high', score:'4 — Good',         desc:'Meets standard with confidence'   },
              { dot:'mid',  score:'3 — Satisfactory', desc:'Meets minimum standard'           },
              { dot:'mid',  score:'2 — Developing',   desc:'Below standard, needs coaching'   },
              { dot:'low',  score:'1 — Unsatisfactory',desc:'Fails to meet standard'          },
            ].map(g => (
              <div key={g.score} className="flex items-center gap10"
                style={{ padding:'7px 0', borderBottom:'1px solid var(--border)' }}>
                <div className={`skill-dot filled ${g.dot}`} style={{ flexShrink:0 }}/>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:'var(--text)' }}>{g.score}</div>
                  <div style={{ fontSize:11, color:'var(--text3)' }}>{g.desc}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop:12, padding:'10px', background:'var(--green-dim)', borderRadius:'var(--r)', border:'1px solid rgba(22,163,74,0.2)' }}>
              <div style={{ fontSize:11, color:'var(--green)', fontWeight:600 }}>
                <Icon name="Check" size={11} strokeWidth={2.5}/> Pass threshold: 80% overall
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>
  );
}

export default function BtwPage({ portal, user }) {
  const [selected, setSelected] = useState(null);
  const isTrainer = portal === 'trainer';
  const isDriver  = portal === 'driver';
  const driverName = user?.name || 'Marcus Okafor';

  // Driver only sees their own sessions
  const sessions = isDriver
    ? BTW_SESSIONS.filter(s => s.driver === driverName)
    : BTW_SESSIONS;
  const isDriver  = portal === 'driver';

  // Driver only sees their own sessions
  const sessions = isDriver
    ? BTW_SESSIONS.filter(s => s.driver === 'Marcus Okafor')
    : BTW_SESSIONS;

  if (selected && isTrainer) {
    return <BtwScorer session={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="fade-in">

      {/* Header */}
      <div className="flex items-center justify-between mb24">
        <div>
          <div style={{ fontFamily:'var(--font-head)', fontSize:15, fontWeight:800, color:'var(--text)' }}>
            {BTW_SESSIONS.length} sessions
          </div>
          <div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>
            {isTrainer ? 'Manage and evaluate BTW sessions' : 'Your behind-the-wheel training log'}
          </div>
        </div>
        {isTrainer && (
          <button className="btn btn-primary">
            <Icon name="Plus" size={14}/> New Session
          </button>
        )}
      </div>

      {/* Summary */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {[
          { label:'Total Sessions', val: sessions.length,                                          color:'blue',  icon:'Car'         },
          { label:'Completed',      val: sessions.filter(s=>s.status==='Completed').length,        color:'green', icon:'Check'       },
          { label:'Pending',        val: sessions.filter(s=>s.status==='Pending Sign-off').length, color:'amber', icon:'Clock'       },
          { label:'Avg Score',      val: sessions.length > 0 ? Math.round(sessions.reduce((a,s)=>a+s.score,0)/sessions.length)+'%' : '0%', color:'teal', icon:'BarChart' },
        ].map(t => (
          <div key={t.label} style={{
            background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'var(--r2)', padding:'14px 16px',
            display:'flex', alignItems:'center', gap:12,
            boxShadow:'var(--shadow-sm)'
          }}>
            <div style={{
              width:36, height:36, borderRadius:10,
              background:`var(--${t.color}-dim)`,
              display:'flex', alignItems:'center', justifyContent:'center'
            }}>
              <Icon name={t.icon} size={16} color={`var(--${t.color})`} />
            </div>
            <div>
              <div style={{ fontSize:22, fontFamily:'var(--font-head)', fontWeight:800, color:'var(--text)', lineHeight:1 }}>{t.val}</div>
              <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600, marginTop:2 }}>{t.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Sessions table */}
      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>Driver</th>
              <th>Trainer</th>
              <th>Date</th>
              <th>Route</th>
              <th>Duration</th>
              <th>Score</th>
              <th>Status</th>
              {isTrainer && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {sessions.map(s => (
              <tr key={s.id}>
                <td>
                  <div className="flex items-center gap8">
                    <div className="avatar-sm">
                      {s.driver.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <span style={{ fontWeight:600, color:'var(--text)' }}>{s.driver}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap6">
                    <Icon name="GraduationCap" size={12} color="var(--text3)"/>
                    <span>{s.trainer}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap4">
                    <Icon name="Calendar" size={11} color="var(--text3)"/>
                    <span className="mono" style={{ fontSize:12 }}>{s.date}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap4">
                    <Icon name="Map" size={11} color="var(--text3)"/>
                    <span style={{ fontSize:12 }}>{s.route}</span>
                  </div>
                </td>
                <td>
                  <span className="chip">
                    <Icon name="Clock" size={10}/> {s.dur} min
                  </span>
                </td>
                <td>
                  <span className={`badge ${scoreCls(s.score)}`}>
                    <Icon name="Star" size={10} strokeWidth={2}/>
                    {s.score}%
                  </span>
                </td>
                <td><StatusBadge status={s.status} /></td>
                {isTrainer && (
                  <td>
                    {s.status === 'Draft' ? (
                      <button className="btn btn-primary btn-sm" onClick={() => setSelected(s)}>
                        <Icon name="Edit" size={12}/> Evaluate
                      </button>
                    ) : (
                      <button className="btn btn-ghost btn-sm" onClick={() => setSelected(s)}>
                        <Icon name="Eye" size={12}/> View
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
  );
}