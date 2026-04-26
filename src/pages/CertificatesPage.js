import React, { useState } from 'react';
import { COURSES, COURSE_PROGS } from '../data/mockData';
import Icon from '../components/Icons';

// ── Certificate generator ─────────────────────────────────────────
function generateCertificate(driver, category, score, date) {
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>Certificate — ${driver.name}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1122px;height:794px;background:#fff;overflow:hidden;font-family:'Crimson Text',serif}
  .cert{width:1122px;height:794px;position:relative;background:linear-gradient(135deg,#f8f9ff 0%,#ffffff 50%,#f0f4ff 100%);border:12px solid #002060}
  .cert-inner{position:absolute;inset:16px;border:2px solid #c9a84c}
  .corner{position:absolute;width:60px;height:60px}
  .tl{top:8px;left:8px;border-top:3px solid #c9a84c;border-left:3px solid #c9a84c}
  .tr{top:8px;right:8px;border-top:3px solid #c9a84c;border-right:3px solid #c9a84c}
  .bl{bottom:8px;left:8px;border-bottom:3px solid #c9a84c;border-left:3px solid #c9a84c}
  .br{bottom:8px;right:8px;border-bottom:3px solid #c9a84c;border-right:3px solid #c9a84c}
  .header{text-align:center;padding:36px 60px 0}
  .org{font-size:11px;font-weight:700;letter-spacing:4px;color:#002060;text-transform:uppercase;margin-bottom:6px;font-family:'Playfair Display',serif}
  .title{font-family:'Playfair Display',serif;font-size:48px;font-weight:900;color:#002060;line-height:1;margin-bottom:4px}
  .subtitle{font-family:'Playfair Display',serif;font-size:18px;color:#c9a84c;letter-spacing:3px;text-transform:uppercase;margin-bottom:20px}
  .divider{width:200px;height:2px;background:linear-gradient(to right,transparent,#c9a84c,transparent);margin:0 auto 20px}
  .presents{font-size:15px;color:#555;font-style:italic;margin-bottom:8px}
  .recipient{font-family:'Playfair Display',serif;font-size:36px;font-weight:700;color:#002060;border-bottom:2px solid #c9a84c;display:inline-block;padding:0 40px 4px;margin-bottom:16px}
  .body-text{font-size:14px;color:#444;line-height:1.8;max-width:700px;margin:0 auto 16px;text-align:center}
  .course-name{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:#002060;font-style:italic}
  .details{display:flex;justify-content:center;gap:48px;margin:16px 0 20px}
  .detail-item{text-align:center}
  .detail-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:3px}
  .detail-val{font-size:14px;font-weight:600;color:#002060}
  .footer{display:flex;justify-content:space-around;align-items:flex-end;padding:0 80px;position:absolute;bottom:44px;left:0;right:0}
  .sig-block{text-align:center}
  .sig-line{width:160px;height:1px;background:#002060;margin:0 auto 6px}
  .sig-name{font-size:12px;font-weight:600;color:#002060}
  .sig-title{font-size:10px;color:#888;letter-spacing:1px;text-transform:uppercase}
  .seal{width:80px;height:80px;border-radius:50%;border:3px solid #002060;display:flex;align-items:center;justify-content:center;background:rgba(0,32,96,0.05)}
  .seal-text{font-size:8px;font-weight:700;color:#002060;text-align:center;letter-spacing:1px;text-transform:uppercase;line-height:1.3}
  .watermark{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0.03;font-family:'Playfair Display',serif;font-size:120px;font-weight:900;color:#002060;transform:rotate(-30deg);pointer-events:none}
</style>
</head>
<body>
<div class="cert">
  <div class="cert-inner"></div>
  <div class="corner tl"></div><div class="corner tr"></div>
  <div class="corner bl"></div><div class="corner br"></div>
  <div class="watermark">CERTIFIED</div>
  <div class="header">
    <div class="org">Roads and Transport Authority · Dubai</div>
    <div class="title">Certificate</div>
    <div class="subtitle">of Completion</div>
    <div class="divider"></div>
    <div class="presents">This is to certify that</div>
    <div class="recipient">${driver.name}</div>
    <div class="body-text">
      has successfully completed all required training modules in
      <span class="course-name">${category}</span>
      and demonstrated the competency required to operate public transport vehicles in the Emirate of Dubai.
    </div>
    <div class="details">
      <div class="detail-item">
        <div class="detail-label">Employee ID</div>
        <div class="detail-val">${driver.emp || 'D-10421'}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Category</div>
        <div class="detail-val">${category}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Final Score</div>
        <div class="detail-val">${score}%</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Issue Date</div>
        <div class="detail-val">${date}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Valid Until</div>
        <div class="detail-val">${new Date(new Date(date).setFullYear(new Date(date).getFullYear()+1)).toISOString().slice(0,10)}</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="sig-block">
      <div class="sig-line"></div>
      <div class="sig-name">Training Director</div>
      <div class="sig-title">Roads & Transport Authority</div>
    </div>
    <div class="seal">
      <div class="seal-text">RTA<br/>CERTIFIED<br/>DUBAI</div>
    </div>
    <div class="sig-block">
      <div class="sig-line"></div>
      <div class="sig-name">Programme Coordinator</div>
      <div class="sig-title">Transit Training Division</div>
    </div>
  </div>
</div>
</body>
</html>`;

  const blob = new Blob([html], { type:'text/html' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `Certificate_${driver.name.replace(/\s+/g,'_')}_${category.replace(/\s+/g,'_')}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Category definitions ──────────────────────────────────────────
const CATEGORIES = [
  {
    id:       'pre-service',
    label:    'Public Bus — Pre Service',
    color:    'var(--blue)',
    dim:      'var(--blue-dim)',
    border:   'rgba(27,110,243,0.2)',
    icon:     'Bus',
    courseIds: [1, 5],
  },
  {
    id:       'in-service',
    label:    'Public Bus — In Service',
    color:    'var(--teal)',
    dim:      'var(--teal-dim)',
    border:   'rgba(8,145,178,0.2)',
    icon:     'Layers',
    courseIds: [2, 4, 6],
  },
  {
    id:       'school-bus',
    label:    'School Bus Training',
    color:    'var(--amber)',
    dim:      'var(--amber-dim)',
    border:   'rgba(217,119,6,0.2)',
    icon:     'Star',
    courseIds: [3],
  },
];

// ── Check if category is complete ─────────────────────────────────
function getCategoryStatus(cat, courseProgs) {
  const progs     = cat.courseIds.map(id => courseProgs[id] || 0);
  const avgProg   = Math.round(progs.reduce((a,b) => a+b, 0) / progs.length);
  const completed = progs.every(p => p === 100);
  const started   = progs.some(p => p > 0);
  return { avgProg, completed, started, progs };
}

// ── Admin/Trainer view — all drivers certs table ──────────────────
const ALL_ISSUED = [
  { name:'Marcus Okafor',   emp:'D-10421', avatar:'MO', category:'Public Bus — In Service',  score:91, issued:'2025-04-10', expires:'2026-04-10', status:'Active'  },
  { name:'James Whitfield', emp:'D-10423', avatar:'JW', category:'Public Bus — Pre Service', score:96, issued:'2025-03-15', expires:'2026-03-15', status:'Active'  },
  { name:'Rosa Gutierrez',  emp:'D-10426', avatar:'RG', category:'Public Bus — In Service',  score:98, issued:'2025-03-15', expires:'2026-03-15', status:'Active'  },
  { name:'Aisha Mensah',    emp:'D-10424', avatar:'AM', category:'School Bus Training',       score:88, issued:'2024-12-20', expires:'2025-12-20', status:'Overdue' },
  { name:'Chen Wei',        emp:'D-10425', avatar:'CW', category:'Public Bus — Pre Service', score:85, issued:'2025-04-10', expires:'2026-04-10', status:'Active'  },
];

export default function CertificatesPage({ portal, user }) {
  const [toast, setToast] = useState('');
  const isDriver = portal === 'driver';

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const today = new Date().toISOString().slice(0, 10);

  // ── DRIVER VIEW ───────────────────────────────────────────────
  if (isDriver) {
    const driverInfo = {
      name: user?.name || 'Marcus Okafor',
      emp:  user?.emp  || 'D-10421',
    };

    return (
      <div className="fade-in">

        {/* Toast */}
        {toast && (
          <div style={{
            position:'fixed', top:20, right:20, zIndex:2000,
            background:'var(--green-dim)', border:'1px solid rgba(22,163,74,0.3)',
            borderRadius:'var(--r2)', padding:'12px 18px',
            display:'flex', alignItems:'center', gap:8,
            fontSize:13, color:'var(--green)', fontWeight:600,
            boxShadow:'var(--shadow-lg)',
          }}>
            <Icon name="Check" size={14} strokeWidth={2.5}/> {toast}
          </div>
        )}

        {/* Header */}
        <div style={{ marginBottom:28 }}>
          <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px', marginBottom:4 }}>
            My Certificates
          </div>
          <div style={{ fontSize:13, color:'var(--text3)' }}>
            Complete all courses in a category to earn your certificate
          </div>
        </div>

        {/* How it works banner */}
        <div style={{
          background:'var(--brand-dim)', border:'1px solid rgba(27,110,243,0.15)',
          borderRadius:'var(--r3)', padding:'16px 20px',
          display:'flex', alignItems:'center', gap:16, marginBottom:28,
        }}>
          <Icon name="Info" size={16} color="var(--brand)"/>
          <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.55 }}>
            <strong style={{ color:'var(--text)' }}>How certificates work:</strong>{' '}
            Complete 100% of all courses in a training category →
            Your certificate is automatically generated and ready to download instantly.
          </div>
        </div>

        {/* 3 Category Certificate Cards */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {CATEGORIES.map(cat => {
            const { avgProg, completed, started, progs } = getCategoryStatus(cat, COURSE_PROGS);
            const catCourses = COURSES.filter(c => cat.courseIds.includes(c.id));

            return (
              <div key={cat.id} style={{
                background:'var(--bg2)',
                border:`1.5px solid ${completed ? cat.color + '44' : 'var(--border)'}`,
                borderRadius:'var(--r3)',
                overflow:'hidden',
                boxShadow: completed ? `0 4px 20px ${cat.color}18` : 'var(--shadow-sm)',
                transition:'all 0.2s',
              }}>

                {/* Card header */}
                <div style={{
                  padding:'20px 22px',
                  background: completed
                    ? `linear-gradient(135deg, ${cat.dim}, transparent)`
                    : 'transparent',
                  borderBottom:'1px solid var(--border)',
                  display:'flex', alignItems:'center', gap:16,
                }}>
                  {/* Icon */}
                  <div style={{
                    width:52, height:52, borderRadius:14, flexShrink:0,
                    background: completed ? cat.color : 'var(--bg4)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    boxShadow: completed ? `0 4px 14px ${cat.color}44` : 'none',
                    transition:'all 0.3s',
                  }}>
                    <Icon
                      name={completed ? 'Trophy' : cat.icon}
                      size={22}
                      color={completed ? '#fff' : 'var(--text3)'}
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:5 }}>
                      <span style={{ fontSize:15, fontWeight:800, color:'var(--text)', letterSpacing:'-0.3px' }}>
                        {cat.label}
                      </span>
                      {completed && (
                        <span style={{
                          display:'inline-flex', alignItems:'center', gap:4,
                          padding:'3px 10px', borderRadius:20,
                          background: cat.color, color:'#fff',
                          fontSize:10, fontWeight:700, letterSpacing:'0.3px',
                        }}>
                          <Icon name="Check" size={9} color="#fff" strokeWidth={3}/>
                          CERTIFIED
                        </span>
                      )}
                      {!completed && started && (
                        <span className="badge badge-amber">
                          <Icon name="Clock" size={9} strokeWidth={2.5}/> In Progress
                        </span>
                      )}
                      {!completed && !started && (
                        <span className="badge badge-gray">
                          <Icon name="Lock" size={9}/> Not Started
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize:12, color:'var(--text3)' }}>
                      {catCourses.length} courses required · {progs.filter(p=>p===100).length} of {progs.length} completed
                    </div>
                  </div>

                  {/* Progress ring + pct */}
                  <div style={{ textAlign:'center', flexShrink:0 }}>
                    <div style={{
                      fontFamily:'var(--font-mono)', fontSize:22, fontWeight:800,
                      color: completed ? cat.color : 'var(--text3)',
                    }}>{avgProg}%</div>
                    <div style={{ fontSize:10, color:'var(--text3)', fontWeight:600 }}>Complete</div>
                  </div>
                </div>

                {/* Course progress bars */}
                <div style={{ padding:'16px 22px' }}>
                  <div style={{ marginBottom:14 }}>
                    {catCourses.map((course, i) => {
                      const p = COURSE_PROGS[course.id] || 0;
                      return (
                        <div key={course.id} style={{ marginBottom:10 }}>
                          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5 }}>
                            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                              <div style={{
                                width:18, height:18, borderRadius:'50%',
                                background: p===100 ? 'var(--green)' : 'var(--bg4)',
                                display:'flex', alignItems:'center', justifyContent:'center',
                                flexShrink:0,
                              }}>
                                {p === 100
                                  ? <Icon name="Check" size={10} color="#fff" strokeWidth={2.5}/>
                                  : <span style={{ fontSize:8, fontWeight:700, color:'var(--text3)', fontFamily:'var(--font-mono)' }}>{i+1}</span>
                                }
                              </div>
                              <span style={{ fontSize:12.5, fontWeight:500, color: p===100 ? 'var(--text)' : 'var(--text2)' }}>
                                {course.title}
                              </span>
                            </div>
                            <span style={{
                              fontSize:11, fontWeight:700,
                              fontFamily:'var(--font-mono)',
                              color: p===100 ? 'var(--green)' : p > 0 ? 'var(--blue)' : 'var(--text3)',
                            }}>
                              {p}%
                            </span>
                          </div>
                          <div className="prog-bar" style={{ height:5 }}>
                            <div
                              className={`prog-fill ${p===100?'prog-green':p>0?'prog-blue':'prog-blue'}`}
                              style={{ width:`${p}%`, background: p===100 ? 'var(--green)' : cat.color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Overall progress bar */}
                  <div style={{ marginBottom:16 }}>
                    <div className="prog-bar" style={{ height:8 }}>
                      <div
                        className="prog-fill"
                        style={{
                          width:`${avgProg}%`,
                          background: completed ? 'var(--green)' : cat.color,
                          transition:'width 0.5s ease',
                        }}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  {completed ? (
                    <div style={{ display:'flex', gap:10 }}>
                      <button
                        className="btn btn-primary"
                        style={{ flex:1, background: cat.color, borderColor: cat.color, boxShadow:`0 4px 12px ${cat.color}44` }}
                        onClick={() => {
                          generateCertificate(driverInfo, cat.label, avgProg, today);
                          showToast(`🎉 Certificate downloaded for ${cat.label}!`);
                        }}
                      >
                        <Icon name="Download" size={14}/> Download Certificate
                      </button>
                      <button className="btn btn-ghost btn-sm">
                        <Icon name="Mail" size={13}/> Email Me
                      </button>
                    </div>
                  ) : (
                    <div style={{
                      padding:'12px 16px',
                      background:'var(--bg3)', borderRadius:'var(--r)',
                      border:'1px dashed var(--border2)',
                      display:'flex', alignItems:'center', gap:10,
                    }}>
                      <Icon name="Lock" size={14} color="var(--text3)"/>
                      <div>
                        <div style={{ fontSize:12, fontWeight:600, color:'var(--text2)' }}>
                          {started
                            ? `${progs.filter(p=>p===100).length} of ${progs.length} courses done — keep going!`
                            : 'Start your courses to earn this certificate'
                          }
                        </div>
                        <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>
                          Complete all {catCourses.length} courses to unlock your certificate
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── ADMIN / TRAINER VIEW ──────────────────────────────────────
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = ALL_ISSUED.filter(c => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.emp.toLowerCase().includes(search.toLowerCase())  ||
      c.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || c.status === filter;
    return matchSearch && matchFilter;
  });

  const totalActive = ALL_ISSUED.filter(c => c.status === 'Active').length;
  const totalOverdue= ALL_ISSUED.filter(c => c.status === 'Overdue').length;
  const avgScore    = Math.round(ALL_ISSUED.reduce((a,c) => a+c.score, 0) / ALL_ISSUED.length);

  return (
    <div className="fade-in">

      {toast && (
        <div style={{
          position:'fixed', top:20, right:20, zIndex:2000,
          background:'var(--green-dim)', border:'1px solid rgba(22,163,74,0.3)',
          borderRadius:'var(--r2)', padding:'12px 18px',
          display:'flex', alignItems:'center', gap:8,
          fontSize:13, color:'var(--green)', fontWeight:600,
          boxShadow:'var(--shadow-lg)',
        }}>
          <Icon name="Check" size={14} strokeWidth={2.5}/> {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb24">
        <div>
          <div style={{ fontSize:16, fontWeight:800, color:'var(--text)', letterSpacing:'-0.3px' }}>
            Issued Certificates
          </div>
          <div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>
            All auto-generated certificates across the platform
          </div>
        </div>
        <button className="btn btn-ghost btn-sm"
          onClick={() => {
            filtered.forEach((c,i) => setTimeout(() => generateCertificate(
              { name:c.name, emp:c.emp }, c.category, c.score, c.issued
            ), i*300));
            showToast(`Generating ${filtered.length} certificates...`);
          }}>
          <Icon name="Download" size={12}/> Export All
        </button>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {[
          { label:'Total Issued',  val:ALL_ISSUED.length, color:'blue',  icon:'Trophy' },
          { label:'Active',        val:totalActive,       color:'green', icon:'Check'  },
          { label:'Overdue',       val:totalOverdue,      color:'red',   icon:'Alert'  },
          { label:'Avg Score',     val:avgScore+'%',      color:'amber', icon:'Star'   },
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

      {/* Controls */}
      <div className="flex items-center justify-between mb16">
        <div className="flex items-center gap8">
          {['All','Active','Overdue'].map(f => (
            <button key={f}
              className={`btn btn-sm ${filter===f?'btn-primary':'btn-ghost'}`}
              onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
        <div className="tb-search">
          <Icon name="Search" size={13} color="var(--text3)"/>
          <input placeholder="Search by driver name..."
            value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
      </div>

      {/* Table */}
      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>Driver</th>
              <th>Category</th>
              <th>Score</th>
              <th>Issued</th>
              <th>Expires</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{
                      width:32, height:32, borderRadius:8, flexShrink:0,
                      background:'var(--blue-dim)', color:'var(--blue)',
                      border:'1px solid rgba(27,110,243,0.2)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:10, fontWeight:700, fontFamily:'var(--font-mono)',
                    }}>{c.avatar}</div>
                    <div>
                      <div style={{ fontWeight:700, fontSize:13, color:'var(--text)' }}>{c.name}</div>
                      <div style={{ fontSize:11, color:'var(--text3)', fontFamily:'var(--font-mono)' }}>{c.emp}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ fontSize:13, color:'var(--text2)' }}>{c.category}</span>
                </td>
                <td>
                  <span style={{
                    fontFamily:'var(--font-mono)', fontSize:13, fontWeight:700,
                    color: c.score >= 90 ? 'var(--green)' : c.score >= 80 ? 'var(--blue)' : 'var(--amber)',
                  }}>{c.score}%</span>
                </td>
                <td>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text2)' }}>{c.issued}</span>
                </td>
                <td>
                  <span style={{
                    fontFamily:'var(--font-mono)', fontSize:12,
                    color: c.status==='Overdue' ? 'var(--red)' : 'var(--text2)',
                    fontWeight: c.status==='Overdue' ? 700 : 400,
                  }}>{c.expires}</span>
                </td>
                <td>
                  <span className={`badge ${c.status==='Active'?'badge-green':'badge-red'}`}>
                    <Icon name={c.status==='Active'?'Check':'Alert'} size={9} strokeWidth={2.5}/>
                    {c.status}
                  </span>
                </td>
                <td>
                  <div style={{ display:'flex', gap:6 }}>
                    <button className="btn btn-ghost btn-sm"
                      onClick={() => {
                        generateCertificate({ name:c.name, emp:c.emp }, c.category, c.score, c.issued);
                        showToast(`Downloaded: ${c.name}`);
                      }}>
                      <Icon name="Download" size={11}/> PDF
                    </button>
                    <button className="btn btn-ghost btn-sm">
                      <Icon name="Mail" size={11}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}