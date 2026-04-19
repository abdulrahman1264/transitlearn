import React from 'react';
import QuizWidget from '../components/QuizWidget';
import Icon from '../components/Icons';

export default function QuizPage() {
  return (
    <div className="fade-in">

      {/* Header */}
      <div className="flex items-center justify-between mb24">
        <div>
          <div style={{ fontFamily:'var(--font-head)', fontSize:15, fontWeight:800, color:'var(--text)' }}>
            Active Quiz
          </div>
          <div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>
            Complete all questions to earn your module certificate
          </div>
        </div>
        <span className="badge badge-amber">
          <Icon name="Clock" size={10} strokeWidth={2.5}/> In Progress
        </span>
      </div>

      <div className="g2-1" style={{ alignItems:'start' }}>

        {/* Quiz widget */}
        <div className="card">
          <div className="flex items-center gap10 mb16" style={{ paddingBottom:16, borderBottom:'1px solid var(--border)' }}>
            <div style={{
              width:38, height:38, borderRadius:10,
              background:'var(--amber-dim)', border:'1.5px solid rgba(245,158,11,0.25)',
              display:'flex', alignItems:'center', justifyContent:'center'
            }}>
              <Icon name="Pencil" size={17} color="var(--amber)"/>
            </div>
            <div>
              <div style={{ fontFamily:'var(--font-head)', fontSize:14, fontWeight:800, color:'var(--text)' }}>
                Knowledge Check — Module 2
              </div>
              <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>
                Defensive Driving Fundamentals
              </div>
            </div>
          </div>
          <QuizWidget/>
        </div>

        {/* Info panel */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

          {/* Quiz metadata */}
          <div className="card card-accent-blue">
            <div className="flex items-center gap8 mb14">
              <Icon name="Info" size={15} color="var(--blue)"/>
              <span style={{ fontWeight:700, fontSize:14, color:'var(--text)' }}>Quiz Details</span>
            </div>
            {[
              { key:'Module',     val:'Module 2 — Wet Weather',  icon:'Book'       },
              { key:'Questions',  val:'3 questions',             icon:'Pencil'     },
              { key:'Time Limit', val:'10 minutes',              icon:'Clock'      },
              { key:'Pass Mark',  val:'80% (3/3 recommended)',   icon:'Star'       },
              { key:'Attempts',   val:'Unlimited',               icon:'Refresh'    },
              { key:'Certificate',val:'On completion',           icon:'Trophy'     },
            ].map(r => (
              <div key={r.key} className="kv-row">
                <span className="kv-key flex items-center gap4">
                  <Icon name={r.icon} size={11}/> {r.key}
                </span>
                <span className="kv-val" style={{ fontSize:12 }}>{r.val}</span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="card card-accent-teal">
            <div className="flex items-center gap8 mb14">
              <Icon name="Zap" size={15} color="var(--teal)"/>
              <span style={{ fontWeight:700, fontSize:14, color:'var(--text)' }}>Instructions</span>
            </div>
            {[
              { icon:'Check',    text:'Read each question carefully before selecting your answer'  },
              { icon:'Eye',      text:'Only one answer is correct per question'                    },
              { icon:'Send',     text:'Click Submit Answer to confirm your selection'              },
              { icon:'Star',     text:'Score 80% or above to pass and unlock the next module'      },
              { icon:'Refresh',  text:'You may retake the quiz as many times as needed'            },
              { icon:'Shield',   text:'Your best score will be recorded in your training record'   },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap10"
                style={{ padding:'8px 0', borderBottom: i < 5 ? '1px solid var(--border)' : 'none' }}>
                <div style={{
                  width:26, height:26, borderRadius:8, flexShrink:0,
                  background:'var(--teal-dim)', border:'1px solid rgba(13,148,136,0.2)',
                  display:'flex', alignItems:'center', justifyContent:'center'
                }}>
                  <Icon name={item.icon} size={12} color="var(--teal)" strokeWidth={2}/>
                </div>
                <span style={{ fontSize:12.5, color:'var(--text2)', lineHeight:1.45 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Progress card */}
          <div className="card" style={{
            background:'var(--blue-dim)',
            border:'1px solid rgba(29,111,242,0.2)'
          }}>
            <div className="flex items-center gap8 mb10">
              <Icon name="BarChart" size={15} color="var(--blue)"/>
              <span style={{ fontWeight:700, fontSize:13, color:'var(--blue)' }}>Course Progress</span>
            </div>
            <div style={{ fontSize:12, color:'var(--text2)', marginBottom:10 }}>
              Completing this quiz unlocks <strong>Module 3: Night Driving & Visibility</strong>
            </div>
            <div className="prog-bar" style={{ height:7 }}>
              <div className="prog-fill prog-blue" style={{ width:'45%' }}/>
            </div>
            <div style={{ marginTop:6, fontSize:11, color:'var(--text3)', display:'flex', justifyContent:'space-between' }}>
              <span>2 of 6 modules complete</span>
              <span className="mono" style={{ fontWeight:700, color:'var(--blue)' }}>45%</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}