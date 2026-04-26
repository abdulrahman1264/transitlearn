import React, { useState } from 'react';
import Icon from '../components/Icons';
import StatusBadge from '../components/StatusBadge';

const CERTS = [
  { id:1, driver:'Marcus Okafor',   avatar:'MO', batch:'Batch 153', category:'Public Bus — In Service',  issued:'2025-04-10', expires:'2026-04-10', score:91, status:'Active',  rtaId:'90454', licNo:'216815'   },
  { id:2, driver:'James Whitfield', avatar:'JW', batch:'Batch 152', category:'Public Bus — Pre Service', issued:'2025-03-15', expires:'2026-03-15', score:96, status:'Active',  rtaId:'90149', licNo:'3929152'  },
  { id:3, driver:'Rosa Gutierrez',  avatar:'RG', batch:'Batch 152', category:'Public Bus — In Service',  issued:'2025-03-15', expires:'2026-03-15', score:98, status:'Active',  rtaId:'90342', licNo:'3764243'  },
  { id:4, driver:'Aisha Mensah',    avatar:'AM', batch:'Batch 151', category:'School Bus Training',      issued:'2024-12-20', expires:'2025-12-20', score:88, status:'Overdue', rtaId:'90343', licNo:'1530126'  },
  { id:5, driver:'Chen Wei',        avatar:'CW', batch:'Batch 153', category:'Public Bus — Pre Service', issued:'2025-04-10', expires:'2026-04-10', score:85, status:'Active',  rtaId:'90324', licNo:'3956510'  },
];

function generateCertificate(cert) {
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>Certificate — ${cert.driver}</title>
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
  .org{font-family:'Playfair Display',serif;font-size:11px;font-weight:700;letter-spacing:4px;color:#002060;text-transform:uppercase;margin-bottom:6px}
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
    <div class="recipient">${cert.driver}</div>
    <div class="body-text">
      has successfully completed the required training programme in
      <span class="course-name">${cert.category}</span>
      and demonstrated the competency required to operate public transport vehicles in the Emirate of Dubai.
    </div>
    <div class="details">
      <div class="detail-item"><div class="detail-label">RTA ID</div><div class="detail-val">${cert.rtaId}</div></div>
      <div class="detail-item"><div class="detail-label">License No.</div><div class="detail-val">${cert.licNo}</div></div>
      <div class="detail-item"><div class="detail-label">Training Batch</div><div class="detail-val">${cert.batch}</div></div>
      <div class="detail-item"><div class="detail-label">Score</div><div class="detail-val">${cert.score}%</div></div>
      <div class="detail-item"><div class="detail-label">Issued</div><div class="detail-val">${cert.issued}</div></div>
    </div>
  </div>
  <div class="footer">
    <div class="sig-block">
      <div class="sig-line"></div>
      <div class="sig-name">Training Director</div>
      <div class="sig-title">Roads & Transport Authority</div>
    </div>
    <div class="seal"><div class="seal-text">RTA<br/>CERTIFIED<br/>DUBAI</div></div>
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
  a.download = `Certificate_${cert.driver.replace(/\s+/g,'_')}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function CertificatesPage({ portal }) {
  const [search,  setSearch]  = useState('');
  const isDriver = portal === 'driver';

  // Driver only sees their own certificate
  const ALL_CERTS = isDriver
    ? CERTS.filter(c => c.driver === 'Marcus Okafor')
    : CERTS;
  const [filter,  setFilter]  = useState('All');
  const [toast,   setToast]   = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(''),3000); };

  const filtered = CERTS.filter(c => {
    const matchSearch =
      c.driver.toLowerCase().includes(search.toLowerCase()) ||
      c.batch.toLowerCase().includes(search.toLowerCase()) ||
      c.rtaId.includes(search);
    const matchFilter = filter === 'All' || c.status === filter;
    return matchSearch && matchFilter;
  });

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
          <div style={{ fontFamily:'var(--font-head)', fontSize:15, fontWeight:800, color:'var(--text)' }}>
            Certificates
          </div>
          <div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>
            View, download and manage all issued training certificates
          </div>
        </div>
        <div className="flex items-center gap8">
          <button className="btn btn-ghost btn-sm"
            onClick={()=>{ filtered.forEach((c,i)=>setTimeout(()=>generateCertificate(c),i*300)); showToast(`Generating ${filtered.length} certificates...`); }}>
            <Icon name="Download" size={12}/> Download All
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {[
          { label:'Total Issued',  val:MY_CERTS.length,                                   color:'blue',  icon:'Trophy'  },
          { label:'Active',        val:MY_CERTS.filter(c=>c.status==='Active').length,     color:'green', icon:'Check'   },
          { label:'Overdue',       val:MY_CERTS.filter(c=>c.status==='Overdue').length,    color:'red',   icon:'Alert'   },
          { label:'Avg Score',     val:MY_CERTS.length > 0 ? Math.round(MY_CERTS.reduce((a,c)=>a+c.score,0)/MY_CERTS.length)+'%' : '0%', color:'amber', icon:'Star' },
        ].map(t=>(
          <div key={t.label} style={{
            background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'var(--r2)', padding:'14px 16px',
            display:'flex', alignItems:'center', gap:12, boxShadow:'var(--shadow-sm)',
          }}>
            <div style={{ width:36, height:36, borderRadius:10, background:`var(--${t.color}-dim)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon name={t.icon} size={16} color={`var(--${t.color})`}/>
            </div>
            <div>
              <div style={{ fontSize:22, fontFamily:'var(--font-head)', fontWeight:800, color:'var(--text)', lineHeight:1 }}>{t.val}</div>
              <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600, marginTop:2 }}>{t.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb16">
        <div className="flex items-center gap8">
          {['All','Active','Overdue'].map(f=>(
            <button key={f}
              className={`btn btn-sm ${filter===f?'btn-primary':'btn-ghost'}`}
              onClick={()=>setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
        <div className="tb-search">
          <Icon name="Search" size={13} color="var(--text3)"/>
          <input placeholder="Search certificates..."
            value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
      </div>

      {/* Certificates grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14 }}>
        {filtered.map(cert => (
          <div key={cert.id} className="card" style={{
            borderTop:`3px solid ${cert.status==='Active'?'var(--blue)':'var(--red)'}`,
          }}>
            <div className="flex items-center justify-between mb14">
              <div className="flex items-center gap10">
                <div style={{
                  width:40, height:40, borderRadius:12, flexShrink:0,
                  background: cert.status==='Active' ? 'var(--blue-dim)' : 'var(--red-dim)',
                  border:`1.5px solid ${cert.status==='Active'?'rgba(29,111,242,0.2)':'rgba(239,68,68,0.2)'}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:11, fontWeight:700, fontFamily:'var(--font-mono)',
                  color: cert.status==='Active' ? 'var(--blue)' : 'var(--red)',
                }}>{cert.avatar}</div>
                <div>
                  <div style={{ fontFamily:'var(--font-head)', fontSize:14, fontWeight:800, color:'var(--text)' }}>
                    {cert.driver}
                  </div>
                  <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>{cert.category}</div>
                </div>
              </div>
              <StatusBadge status={cert.status}/>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:14 }}>
              {[
                { label:'RTA ID',  val:cert.rtaId,   icon:'Key'      },
                { label:'Batch',   val:cert.batch,   icon:'Layers'   },
                { label:'Score',   val:`${cert.score}%`, icon:'Star' },
              ].map(r=>(
                <div key={r.label} style={{
                  background:'var(--bg3)', borderRadius:'var(--r)',
                  padding:'8px 10px', border:'1px solid var(--border)',
                }}>
                  <div style={{ fontSize:10, color:'var(--text3)', fontWeight:600, marginBottom:3 }}>
                    <Icon name={r.icon} size={9}/> {r.label}
                  </div>
                  <div style={{ fontSize:12, fontWeight:700, color:'var(--text)', fontFamily:'var(--font-mono)' }}>
                    {r.val}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between" style={{
              padding:'10px 12px', background:'var(--bg3)',
              borderRadius:'var(--r)', border:'1px solid var(--border)',
              marginBottom:14,
            }}>
              <div className="flex items-center gap6">
                <Icon name="Calendar" size={11} color="var(--text3)"/>
                <span style={{ fontSize:11, color:'var(--text3)' }}>Issued: </span>
                <span style={{ fontSize:11, fontWeight:600, color:'var(--text)', fontFamily:'var(--font-mono)' }}>{cert.issued}</span>
              </div>
              <div className="flex items-center gap6">
                <Icon name="Clock" size={11} color={cert.status==='Overdue'?'var(--red)':'var(--text3)'}/>
                <span style={{ fontSize:11, color:'var(--text3)' }}>Expires: </span>
                <span style={{ fontSize:11, fontWeight:600, color:cert.status==='Overdue'?'var(--red)':'var(--text)', fontFamily:'var(--font-mono)' }}>
                  {cert.expires}
                </span>
              </div>
            </div>

            <div className="flex items-center gap8">
              <button className="btn btn-primary btn-sm" style={{ flex:1 }}
                onClick={()=>{ generateCertificate(cert); showToast(`Certificate downloaded for ${cert.driver}`); }}>
                <Icon name="Download" size={12}/> Download Certificate
              </button>
              <button className="btn btn-ghost btn-sm">
                <Icon name="Mail" size={12}/> Email
              </button>
              <button className="btn btn-ghost btn-sm">
                <Icon name="Eye" size={12}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}