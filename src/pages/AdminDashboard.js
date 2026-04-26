import React, { useState, useRef } from 'react';
import { useAuth } from '../auth/AuthContext';
import { TRAINING_CATEGORIES, CSV_COLUMNS, SAMPLE_BATCH_DRIVERS } from '../data/mockData';
import Icon from '../components/Icons';

// ── Certificate Generator ─────────────────────────────────────────
function generateCertificate(driver, category) {
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
<title>Certificate — ${driver.name}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Crimson+Text:ital,wght@0,400;1,400&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1122px;height:794px;background:#fff;overflow:hidden;font-family:'Crimson Text',serif}
  .cert{width:1122px;height:794px;position:relative;background:linear-gradient(135deg,#f8f9ff,#fff,#f0f4ff);border:12px solid #002060}
  .ci{position:absolute;inset:16px;border:2px solid #c9a84c}
  .corner{position:absolute;width:60px;height:60px}
  .tl{top:8px;left:8px;border-top:3px solid #c9a84c;border-left:3px solid #c9a84c}
  .tr{top:8px;right:8px;border-top:3px solid #c9a84c;border-right:3px solid #c9a84c}
  .bl{bottom:8px;left:8px;border-bottom:3px solid #c9a84c;border-left:3px solid #c9a84c}
  .br{bottom:8px;right:8px;border-bottom:3px solid #c9a84c;border-right:3px solid #c9a84c}
  .header{text-align:center;padding:36px 60px 0}
  .org{font-family:'Playfair Display',serif;font-size:11px;font-weight:700;letter-spacing:4px;color:#002060;text-transform:uppercase;margin-bottom:6px}
  .title{font-family:'Playfair Display',serif;font-size:48px;font-weight:900;color:#002060;line-height:1;margin-bottom:4px}
  .sub{font-family:'Playfair Display',serif;font-size:18px;color:#c9a84c;letter-spacing:3px;text-transform:uppercase;margin-bottom:20px}
  .div{width:200px;height:2px;background:linear-gradient(to right,transparent,#c9a84c,transparent);margin:0 auto 20px}
  .pre{font-size:15px;color:#555;font-style:italic;margin-bottom:8px}
  .name{font-family:'Playfair Display',serif;font-size:36px;font-weight:700;color:#002060;border-bottom:2px solid #c9a84c;display:inline-block;padding:0 40px 4px;margin-bottom:16px}
  .body{font-size:14px;color:#444;line-height:1.8;max-width:700px;margin:0 auto 16px;text-align:center}
  .cn{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:#002060;font-style:italic}
  .details{display:flex;justify-content:center;gap:48px;margin:16px 0 20px}
  .di{text-align:center}
  .dl{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:3px}
  .dv{font-size:14px;font-weight:600;color:#002060}
  .footer{display:flex;justify-content:space-around;align-items:flex-end;padding:0 80px;position:absolute;bottom:44px;left:0;right:0}
  .sb{text-align:center}
  .sl{width:160px;height:1px;background:#002060;margin:0 auto 6px}
  .sn{font-size:12px;font-weight:600;color:#002060}
  .st{font-size:10px;color:#888;letter-spacing:1px;text-transform:uppercase}
  .seal{width:80px;height:80px;border-radius:50%;border:3px solid #002060;display:flex;align-items:center;justify-content:center;background:rgba(0,32,96,0.05)}
  .wm{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0.03;font-family:'Playfair Display',serif;font-size:120px;font-weight:900;color:#002060;transform:rotate(-30deg);pointer-events:none}
</style></head><body>
<div class="cert"><div class="ci"></div>
<div class="corner tl"></div><div class="corner tr"></div><div class="corner bl"></div><div class="corner br"></div>
<div class="wm">CERTIFIED</div>
<div class="header">
  <div class="org">Roads and Transport Authority · Dubai</div>
  <div class="title">Certificate</div><div class="sub">of Completion</div>
  <div class="div"></div>
  <div class="pre">This is to certify that</div>
  <div class="name">${driver.name}</div>
  <div class="body">has successfully completed the required training programme in <span class="cn">${category.label}</span> and demonstrated the competency required to operate public transport vehicles in the Emirate of Dubai.</div>
  <div class="details">
    <div class="di"><div class="dl">RTA ID</div><div class="dv">${driver.rtaId||'—'}</div></div>
    <div class="di"><div class="dl">License No.</div><div class="dv">${driver.licNo||'—'}</div></div>
    <div class="di"><div class="dl">Batch</div><div class="dv">${driver.batch||'—'}</div></div>
    <div class="di"><div class="dl">Company</div><div class="dv">${driver.company||'—'}</div></div>
  </div>
</div>
<div class="footer">
  <div class="sb"><div class="sl"></div><div class="sn">Training Director</div><div class="st">Roads & Transport Authority</div></div>
  <div class="seal"><div style="font-size:8px;font-weight:700;color:#002060;text-align:center;line-height:1.3">RTA<br/>CERTIFIED<br/>DUBAI</div></div>
  <div class="sb"><div class="sl"></div><div class="sn">Programme Coordinator</div><div class="st">Transit Training Division</div></div>
</div></div></body></html>`;
  const blob=new Blob([html],{type:'text/html'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download=`Certificate_${driver.name.replace(/\s+/g,'_')}.html`; a.click();
  URL.revokeObjectURL(url);
}

// ── Video Progress Data ───────────────────────────────────────────
const VIDEO_PROGRESS = [
  { videoId:1, title:'Introduction & Safety Brief',    dur:'12 min', watchers:[
    { name:'Marcus Okafor',  avatar:'MO', progress:100, watchedAt:'2026-04-20' },
    { name:'Priya Sundaram', avatar:'PS', progress:75,  watchedAt:'2026-04-21' },
    { name:'Chen Wei',       avatar:'CW', progress:100, watchedAt:'2026-04-19' },
    { name:'Rosa Gutierrez', avatar:'RG', progress:45,  watchedAt:'2026-04-22' },
  ]},
  { videoId:2, title:'Wet Weather Driving Techniques', dur:'18 min', watchers:[
    { name:'Marcus Okafor',  avatar:'MO', progress:100, watchedAt:'2026-04-21' },
    { name:'Chen Wei',       avatar:'CW', progress:60,  watchedAt:'2026-04-22' },
  ]},
  { videoId:3, title:'Defensive Driving Fundamentals', dur:'22 min', watchers:[
    { name:'Rosa Gutierrez', avatar:'RG', progress:100, watchedAt:'2026-04-20' },
    { name:'Priya Sundaram', avatar:'PS', progress:30,  watchedAt:'2026-04-23' },
    { name:'James Whitfield',avatar:'JW', progress:100, watchedAt:'2026-04-18' },
  ]},
  { videoId:4, title:'Emergency Procedures',           dur:'15 min', watchers:[
    { name:'James Whitfield',avatar:'JW', progress:100, watchedAt:'2026-04-19' },
  ]},
];

const RECENT_ACTIVITY = [
  { type:'video',    driver:'Marcus Okafor',  avatar:'MO', action:'Completed video',   detail:'Introduction & Safety Brief',    time:'2 hours ago',  color:'blue'  },
  { type:'quiz',     driver:'Priya Sundaram', avatar:'PS', action:'Passed quiz',        detail:'Knowledge Check — Module 2',     time:'4 hours ago',  color:'green' },
  { type:'register', driver:'Ahmed Al Mansouri',avatar:'AM', action:'Registered',      detail:'Public Bus Pre-Service · BATCH-153', time:'5 hours ago', color:'teal' },
  { type:'video',    driver:'Chen Wei',       avatar:'CW', action:'Started video',      detail:'Wet Weather Driving Techniques', time:'6 hours ago',  color:'blue'  },
  { type:'cert',     driver:'James Whitfield',avatar:'JW', action:'Certificate issued', detail:'Public Bus — Pre Service',       time:'1 day ago',    color:'amber' },
  { type:'register', driver:'Priya Sundaram', avatar:'PS', action:'Registered',         detail:'Public Bus In-Service · BATCH-154', time:'2 days ago', color:'teal' },
];

// ── Driver Table Row ──────────────────────────────────────────────
function DriverRow({ driver, idx, onChange, onDelete, onCert }) {
  const [editing, setEditing] = useState(false);
  const [local,   setLocal]   = useState({ ...driver });
  const save = () => { onChange(idx, local); setEditing(false); };
  const cell = { padding:'8px 10px', borderBottom:'1px solid var(--border)', fontSize:12, color:'var(--text2)', whiteSpace:'nowrap' };
  const inp  = { width:'100%', padding:'4px 6px', border:'1px solid var(--blue)', borderRadius:4, fontSize:11, background:'var(--bg)', color:'var(--text)', fontFamily:'var(--font-mono)', outline:'none' };
  const FIELDS = ['rtaId','licNo','name','nationality','dob','issued','expired','place','traffic','contact','age','company','roadTest','interview','joinDate','batch','graduation'];
  return (
    <tr>
      <td style={{ ...cell, color:'var(--text3)', fontFamily:'var(--font-mono)', textAlign:'center' }}>{driver.sl}</td>
      {editing
        ? FIELDS.map(f=><td key={f} style={cell}><input style={inp} value={local[f]||''} onChange={e=>setLocal(p=>({...p,[f]:e.target.value}))}/></td>)
        : FIELDS.map(f=><td key={f} style={{ ...cell, fontFamily:['rtaId','licNo','traffic','contact','age'].includes(f)?'var(--font-mono)':'inherit' }}>{driver[f]||<span style={{color:'var(--text3)'}}>—</span>}</td>)
      }
      <td style={{ ...cell, whiteSpace:'nowrap' }}>
        <div style={{ display:'flex', gap:4 }}>
          {editing ? (
            <>
              <button onClick={save} style={{ padding:'3px 8px', background:'var(--green-dim)', color:'var(--green)', border:'1px solid rgba(22,163,74,0.25)', borderRadius:4, cursor:'pointer', fontSize:11, fontWeight:600 }}><Icon name="Check" size={10}/> Save</button>
              <button onClick={()=>setEditing(false)} style={{ padding:'3px 8px', background:'var(--bg4)', color:'var(--text3)', border:'1px solid var(--border)', borderRadius:4, cursor:'pointer', fontSize:11 }}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={()=>setEditing(true)} style={{ padding:'3px 8px', background:'var(--blue-dim)', color:'var(--blue)', border:'1px solid rgba(29,111,242,0.2)', borderRadius:4, cursor:'pointer', fontSize:11 }}><Icon name="Edit" size={10}/></button>
              <button onClick={()=>onCert(driver)} style={{ padding:'3px 8px', background:'var(--amber-dim)', color:'var(--amber)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:4, cursor:'pointer', fontSize:11, fontWeight:600 }}><Icon name="Trophy" size={10}/> Cert</button>
              <button onClick={()=>onDelete(idx)} style={{ padding:'3px 8px', background:'var(--red-dim)', color:'var(--red)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:4, cursor:'pointer', fontSize:11 }}><Icon name="X" size={10}/></button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

// ── Driver Table ──────────────────────────────────────────────────
function DriverTable({ category, onBack }) {
  const [drivers, setDrivers] = useState(SAMPLE_BATCH_DRIVERS.map(d=>({...d})));
  const [search,  setSearch]  = useState('');
  const [msg,     setMsg]     = useState('');
  const [newRow,  setNewRow]  = useState(false);
  const [blank,   setBlank]   = useState({ sl:'',rtaId:'',licNo:'',name:'',nationality:'',dob:'',issued:'',expired:'',place:'',traffic:'',contact:'',age:'',company:'',roadTest:'',interview:'',joinDate:'',batch:'',graduation:'' });
  const fileRef = useRef();
  const colorMap = { blue:'var(--blue)', teal:'var(--teal)', amber:'var(--amber)' };
  const dimMap   = { blue:'var(--blue-dim)', teal:'var(--teal-dim)', amber:'var(--amber-dim)' };

  const filtered = drivers.filter(d=>
    d.name.toLowerCase().includes(search.toLowerCase())||d.rtaId.includes(search)||d.licNo.includes(search)||d.company.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (idx, updated) => {
    const gi = drivers.findIndex(d=>d.sl===filtered[idx].sl);
    setDrivers(prev=>{ const cp=[...prev]; cp[gi]=updated; return cp; });
  };
  const handleDelete = (idx) => {
    if (window.confirm(`Remove ${filtered[idx].name}?`))
      setDrivers(prev=>prev.filter(d=>d.sl!==filtered[idx].sl));
  };
  const handleCert = (driver) => { generateCertificate(driver, category); setMsg(`✅ Certificate generated for ${driver.name}`); setTimeout(()=>setMsg(''),3000); };
  const handleAddRow = () => {
    const sl = drivers.length>0?Math.max(...drivers.map(d=>Number(d.sl)||0))+1:1;
    setDrivers(prev=>[...prev,{...blank,sl}]); setNewRow(false);
  };
  const handleCSV = (e) => {
    const file=e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=(ev)=>{
      const lines=ev.target.result.split(/\r?\n/).filter(l=>l.trim());
      if(lines.length<2) return;
      const parseRow=(line)=>{ const r=[]; let c='',q=false; for(const ch of line){ if(ch==='"'){q=!q;}else if(ch===','&&!q){r.push(c.trim());c='';}else{c+=ch;} } r.push(c.trim()); return r; };
      const headers=parseRow(lines[0]);
      const fm={'SL':'sl','RTA ID':'rtaId','License No.':'licNo','Name as per Driving License':'name','Nationality':'nationality','Date of Birth':'dob','Date of Issued':'issued','Date of Expired':'expired','Place of issue':'place','Traffic File':'traffic','Contact':'contact','Age':'age','Company':'company','Date of Road test':'roadTest','Interview':'interview','Date of Join Training':'joinDate','Training Batch':'batch','Date of Graduation':'graduation'};
      const imported=lines.slice(1).map(line=>{ const vals=parseRow(line); const obj={}; headers.forEach((h,i)=>{ obj[fm[h.trim()]||h.trim()]=(vals[i]||'').replace(/^"|"$/g,'').trim(); }); return obj; }).filter(d=>d.name&&d.name.length>0);
      if(imported.length>0){ setDrivers(imported); setMsg(`✅ Imported ${imported.length} drivers`); setTimeout(()=>setMsg(''),3000); }
    };
    reader.readAsText(file); e.target.value='';
  };
  const handleExport = () => {
    const fo=['sl','rtaId','licNo','name','nationality','dob','issued','expired','place','traffic','contact','age','company','roadTest','interview','joinDate','batch','graduation'];
    const csv=[CSV_COLUMNS.join(','),...drivers.map(d=>fo.map(f=>`"${d[f]||''}"`).join(','))].join('\n');
    const blob=new Blob([csv],{type:'text/csv'}); const url=URL.createObjectURL(blob);
    const a=document.createElement('a'); a.href=url; a.download=`${category.short.replace(/\s+/g,'_')}_Drivers.csv`; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="fade-in">
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
        <button className="btn btn-ghost btn-sm" onClick={onBack}><Icon name="ArrowLeft" size={13}/> Back</button>
        <span style={{ color:'var(--text3)' }}>›</span>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'4px 12px', borderRadius:20, fontSize:11, fontWeight:700, background:dimMap[category.color], color:colorMap[category.color], border:`1px solid ${colorMap[category.color]}33` }}>
          <Icon name={category.icon} size={12} strokeWidth={2.5}/> {category.label}
        </div>
        <span style={{ fontSize:12, color:'var(--text3)' }}>{drivers.length} drivers</span>
      </div>

      {msg && <div style={{ background:'var(--green-dim)', border:'1px solid rgba(22,163,74,0.3)', borderRadius:'var(--r2)', padding:'12px 16px', marginBottom:16, display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--green)', fontWeight:600 }}><Icon name="Trophy" size={14}/> {msg}</div>}

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div className="tb-search"><Icon name="Search" size={13} color="var(--text3)"/><input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
          <span style={{ fontSize:12, color:'var(--text3)' }}>Showing {filtered.length} of {drivers.length}</span>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button className="btn btn-ghost btn-sm" onClick={()=>fileRef.current.click()}><Icon name="Upload" size={12}/> Import CSV</button>
          <input ref={fileRef} type="file" accept=".csv" style={{display:'none'}} onChange={handleCSV}/>
          <button className="btn btn-ghost btn-sm" onClick={handleExport}><Icon name="Download" size={12}/> Export CSV</button>
          <button className="btn btn-ghost btn-sm" onClick={()=>{ drivers.forEach((d,i)=>setTimeout(()=>generateCertificate(d,category),i*300)); setMsg(`✅ Generating ${drivers.length} certificates...`); setTimeout(()=>setMsg(''),4000); }} style={{color:'var(--amber)'}}><Icon name="Trophy" size={12}/> All Certs</button>
          <button className="btn btn-primary btn-sm" onClick={()=>setNewRow(true)}><Icon name="Plus" size={12}/> Add Driver</button>
        </div>
      </div>

      {newRow && (
        <div className="card" style={{ background:'var(--blue-dim)', border:'1px solid rgba(29,111,242,0.2)', marginBottom:16 }}>
          <div style={{ fontWeight:700, fontSize:13, color:'var(--blue)', marginBottom:12 }}>Add New Driver</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
            {[['RTA ID','rtaId'],['License No.','licNo'],['Full Name','name'],['Nationality','nationality'],['Date of Birth','dob'],['Company','company'],['Training Batch','batch'],['Join Date','joinDate']].map(([label,field])=>(
              <div key={field}>
                <div className="form-label">{label}</div>
                <input className="form-input" placeholder={label} value={blank[field]} onChange={e=>setBlank(p=>({...p,[field]:e.target.value}))}/>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:8, marginTop:12 }}>
            <button className="btn btn-primary btn-sm" onClick={handleAddRow}><Icon name="Check" size={12}/> Add to List</button>
            <button className="btn btn-ghost btn-sm" onClick={()=>setNewRow(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ overflowX:'auto', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--r2)', boxShadow:'var(--shadow-sm)' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', minWidth:1400 }}>
          <thead>
            <tr style={{ background:'var(--bg3)' }}>
              {['#','RTA ID','License No.','Full Name','Nationality','DOB','Issued','Expired','Place','Traffic','Contact','Age','Company','Road Test','Interview','Join Date','Batch','Graduation','Actions'].map(h=>(
                <th key={h} style={{ padding:'10px', textAlign:'left', fontSize:10, fontWeight:700, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.5px', borderBottom:'1px solid var(--border)', whiteSpace:'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length===0
              ? <tr><td colSpan={19} style={{ textAlign:'center', padding:40, color:'var(--text3)' }}>No drivers found</td></tr>
              : filtered.map((d,i)=><DriverRow key={d.sl||i} driver={d} idx={i} onChange={handleChange} onDelete={handleDelete} onCert={handleCert}/>)
            }
          </tbody>
        </table>
      </div>

      <div style={{ marginTop:16, display:'flex', gap:12 }}>
        {[{label:'Total',val:drivers.length,color:'blue'},{label:'Graduated',val:drivers.filter(d=>d.graduation).length,color:'green'},{label:'In Training',val:drivers.filter(d=>!d.graduation).length,color:'amber'},{label:'Companies',val:[...new Set(drivers.map(d=>d.company))].filter(Boolean).length,color:'teal'}].map(s=>(
          <div key={s.label} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--r2)', padding:'12px 16px', display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:8, background:`var(--${s.color}-dim)`, display:'flex', alignItems:'center', justifyContent:'center' }}><Icon name="Users" size={14} color={`var(--${s.color})`}/></div>
            <div>
              <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', lineHeight:1 }}>{s.val}</div>
              <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── New Registrations Panel ───────────────────────────────────────
function NewRegistrations({ registrations, onApprove, onReject }) {
  const pending  = registrations.filter(r=>r.status==='pending');
  const approved = registrations.filter(r=>r.status==='approved');
  const rejected = registrations.filter(r=>r.status==='rejected');
  const [filter, setFilter] = useState('pending');
  const shown = registrations.filter(r=>r.status===filter);

  const catColor = { 'public-pre':'blue', 'public-in':'teal', 'school-bus':'amber' };
  const catLabel = { 'public-pre':'Pre-Service', 'public-in':'In-Service', 'school-bus':'School Bus' };

  return (
    <div className="fade-in">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>New Registrations</div>
          <div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>Drivers who self-registered with a batch code</div>
        </div>
        {pending.length > 0 && (
          <div style={{ background:'var(--amber-dim)', border:'1px solid rgba(217,119,6,0.2)', borderRadius:'var(--r2)', padding:'10px 16px', display:'flex', alignItems:'center', gap:8 }}>
            <Icon name="Alert" size={14} color="var(--amber)"/>
            <span style={{ fontSize:13, fontWeight:700, color:'var(--amber)' }}>{pending.length} pending approval</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:20 }}>
        {[{label:'Pending',val:pending.length,color:'amber',icon:'Clock'},{label:'Approved',val:approved.length,color:'green',icon:'Check'},{label:'Rejected',val:rejected.length,color:'red',icon:'X'}].map(t=>(
          <div key={t.label} onClick={()=>setFilter(t.label.toLowerCase())}
            style={{ background:'var(--bg2)', border:`1px solid ${filter===t.label.toLowerCase()?`var(--${t.color})`:'var(--border)'}`, borderRadius:'var(--r2)', padding:'14px 16px', display:'flex', alignItems:'center', gap:12, boxShadow:'var(--shadow-sm)', cursor:'pointer', transition:'all 0.15s' }}>
            <div style={{ width:36, height:36, borderRadius:10, background:`var(--${t.color}-dim)`, display:'flex', alignItems:'center', justifyContent:'center' }}><Icon name={t.icon} size={16} color={`var(--${t.color})`}/></div>
            <div>
              <div style={{ fontSize:22, fontWeight:800, color:'var(--text)', lineHeight:1 }}>{t.val}</div>
              <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600, marginTop:2 }}>{t.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* List */}
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {shown.length === 0 ? (
          <div className="card" style={{ textAlign:'center', padding:40, color:'var(--text3)' }}>
            <div style={{ fontSize:32, marginBottom:8 }}>📋</div>
            <div>No {filter} registrations</div>
          </div>
        ) : shown.map(r => {
          const cc = catColor[r.category] || 'blue';
          const cl = catLabel[r.category] || r.category;
          return (
            <div key={r.id} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderLeft:`4px solid var(--${cc})`, borderRadius:'var(--r3)', padding:'16px 20px', boxShadow:'var(--shadow-sm)', display:'flex', alignItems:'center', gap:16 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:`var(--${cc}-dim)`, color:`var(--${cc})`, border:`1.5px solid var(--${cc})33`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, fontFamily:'var(--font-mono)', flexShrink:0 }}>{r.avatar}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:5 }}>
                  <span style={{ fontSize:14, fontWeight:800, color:'var(--text)' }}>{r.name}</span>
                  <span className={`badge badge-${cc}`}>{cl}</span>
                  <span className={`badge ${r.status==='pending'?'badge-amber':r.status==='approved'?'badge-green':'badge-red'}`}>
                    {r.status.charAt(0).toUpperCase()+r.status.slice(1)}
                  </span>
                </div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <span className="chip" style={{ fontSize:10 }}><Icon name="Users" size={9}/> {r.username}</span>
                  <span className="chip" style={{ fontSize:10 }}><Icon name="Layers" size={9}/> {r.batch}</span>
                  <span className="chip" style={{ fontSize:10 }}><Icon name="Building" size={9}/> {r.depot}</span>
                  <span className="chip" style={{ fontSize:10 }}><Icon name="GraduationCap" size={9}/> {r.trainer}</span>
                  {r.phone && <span className="chip" style={{ fontSize:10 }}><Icon name="Mail" size={9}/> {r.phone}</span>}
                  {r.nationality && <span className="chip" style={{ fontSize:10 }}>{r.nationality}</span>}
                  <span style={{ fontSize:11, color:'var(--text3)', display:'flex', alignItems:'center', gap:4 }}><Icon name="Calendar" size={10}/> {r.joinDate}</span>
                </div>
              </div>
              {r.status === 'pending' && (
                <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                  <button onClick={()=>onApprove(r.id)} className="btn btn-sm" style={{ background:'var(--green-dim)', color:'var(--green)', border:'1px solid rgba(22,163,74,0.25)', fontWeight:700 }}><Icon name="Check" size={12}/> Approve</button>
                  <button onClick={()=>onReject(r.id)} className="btn btn-danger btn-sm"><Icon name="X" size={12}/> Reject</button>
                </div>
              )}
              {r.status === 'approved' && <span className="badge badge-green"><Icon name="Check" size={10} strokeWidth={2.5}/> Approved</span>}
              {r.status === 'rejected' && <span className="badge badge-red"><Icon name="X" size={10} strokeWidth={2.5}/> Rejected</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Admin Dashboard ──────────────────────────────────────────
export default function AdminDashboard({ onView }) {
  const { registrations, approveDriver, rejectDriver } = useAuth();
  const [selectedCat, setSelectedCat] = useState(null);
  const [activeTab,   setActiveTab]   = useState('overview');
  const [expandedVideo, setExpandedVideo] = useState(null);

  const pendingCount = registrations.filter(r=>r.status==='pending').length;

  if (selectedCat) {
    return <DriverTable category={selectedCat} onBack={()=>setSelectedCat(null)}/>;
  }

  return (
    <div className="fade-in">

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom:24 }}>
        {[
          { key:'overview',      icon:'Home',      label:'Overview'           },
          { key:'video-progress',icon:'Video',     label:'Video Progress'     },
          { key:'categories',    icon:'Layers',    label:'Categories'         },
          { key:'registrations', icon:'UserCheck', label:'New Registrations', badge: pendingCount },
        ].map(t=>(
          <button key={t.key} className={`tab ${activeTab===t.key?'active':''}`}
            onClick={()=>setActiveTab(t.key)}
            style={{ border:'none', background:'none', cursor:'pointer', fontFamily:'var(--font)', display:'flex', alignItems:'center', gap:6 }}>
            <Icon name={t.icon} size={13}/> {t.label}
            {t.badge > 0 && <span style={{ background:'var(--amber)', color:'#fff', fontSize:10, fontWeight:700, padding:'1px 6px', borderRadius:10 }}>{t.badge}</span>}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {activeTab === 'overview' && (
        <div className="fade-in">

          {/* Welcome banner */}
          <div style={{ background:'linear-gradient(135deg, var(--blue) 0%, #1560d4 100%)', borderRadius:'var(--r2)', padding:'24px 28px', marginBottom:24, display:'flex', alignItems:'center', gap:20, boxShadow:'0 8px 24px rgba(27,110,243,0.3)' }}>
            <div style={{ width:56, height:56, borderRadius:16, background:'rgba(255,255,255,0.15)', border:'2px solid rgba(255,255,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Icon name="Bus" size={26} color="#fff" strokeWidth={1.75}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:20, fontWeight:800, color:'#fff', letterSpacing:'-0.5px' }}>TransitLearn — Admin Dashboard</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.75)', marginTop:4 }}>Full oversight of drivers, training progress and compliance across all categories</div>
            </div>
            <div style={{ display:'flex', gap:20, flexShrink:0 }}>
              {[{val:'567',label:'Total Drivers'},{val:'Batch 153',label:'Active Batch'},{val:'91%',label:'Pass Rate'}].map(s=>(
                <div key={s.label} style={{ textAlign:'center' }}>
                  <div style={{ fontSize:22, fontWeight:800, color:'#fff', lineHeight:1 }}>{s.val}</div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.65)', fontWeight:600, letterSpacing:'0.5px', textTransform:'uppercase', marginTop:3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* KPI tiles */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 }}>
            {[
              { label:'Total Drivers',    val:'567', delta:'+12 this month', up:true,  color:'blue',  icon:'Users'  },
              { label:'Compliance Rate',  val:'91%', delta:'+3% vs last qtr',up:true,  color:'green', icon:'Shield' },
              { label:'Overdue Training', val:'23',  delta:'Need action',    up:false, color:'red',   icon:'Alert'  },
              { label:'New Registrations',val:pendingCount, delta:'Pending approval', up:true, color:'amber', icon:'UserCheck' },
            ].map(t=>(
              <div key={t.label} className={`stat-tile ${t.color}`} style={{ cursor: t.label==='New Registrations'?'pointer':'' }}
                onClick={()=>{ if(t.label==='New Registrations') setActiveTab('registrations'); }}>
                <div className="stat-icon"><Icon name={t.icon} size={18} color={`var(--${t.color})`} strokeWidth={1.75}/></div>
                <div className="stat-label">{t.label}</div>
                <div className="stat-val">{t.val}</div>
                <div className="stat-delta"><span className={t.up?'up':'down'}><Icon name={t.up?'BarChart':'Alert'} size={11} strokeWidth={2.5}/> {t.delta}</span></div>
              </div>
            ))}
          </div>

          {/* Category cards + Recent Activity */}
          <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:20 }}>

            {/* Category cards */}
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:'var(--text)', marginBottom:14 }}>Training Categories</div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {TRAINING_CATEGORIES.map(cat=>{
                  const cm={blue:'var(--blue)',teal:'var(--teal)',amber:'var(--amber)'};
                  const dm={blue:'var(--blue-dim)',teal:'var(--teal-dim)',amber:'var(--amber-dim)'};
                  const c=cm[cat.color]; const d=dm[cat.color];
                  return (
                    <div key={cat.id} onClick={()=>{ setSelectedCat(cat); }}
                      style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderLeft:`4px solid ${c}`, borderRadius:'var(--r2)', padding:'16px 18px', cursor:'pointer', transition:'all 0.15s', display:'flex', alignItems:'center', gap:14, boxShadow:'var(--shadow-sm)' }}
                      onMouseEnter={e=>{ e.currentTarget.style.boxShadow='var(--shadow-md)'; e.currentTarget.style.transform='translateX(4px)'; }}
                      onMouseLeave={e=>{ e.currentTarget.style.boxShadow='var(--shadow-sm)'; e.currentTarget.style.transform=''; }}
                    >
                      <div style={{ width:44, height:44, borderRadius:12, background:d, border:`1.5px solid ${c}33`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <Icon name={cat.icon} size={20} color={c} strokeWidth={1.75}/>
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13.5, fontWeight:800, color:'var(--text)', marginBottom:4 }}>{cat.label}</div>
                        <div style={{ display:'flex', gap:8 }}>
                          {[{label:'Active',val:cat.active},{label:'Enrolled',val:cat.count},{label:'Graduated',val:cat.graduated}].map(s=>(
                            <span key={s.label} style={{ fontSize:11, color:'var(--text3)' }}><span style={{ fontWeight:700, color:c }}>{s.val}</span> {s.label}</span>
                          ))}
                        </div>
                      </div>
                      <Icon name="ChevronRight" size={14} color="var(--text3)"/>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:'var(--text)', marginBottom:14 }}>Recent Activity</div>
              <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--r2)', overflow:'hidden', boxShadow:'var(--shadow-sm)' }}>
                {RECENT_ACTIVITY.map((a,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', borderBottom: i<RECENT_ACTIVITY.length-1?'1px solid var(--border)':'none' }}>
                    <div style={{ width:34, height:34, borderRadius:9, flexShrink:0, background:`var(--${a.color}-dim)`, color:`var(--${a.color})`, border:`1px solid var(--${a.color})33`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, fontFamily:'var(--font-mono)' }}>{a.avatar}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12.5, fontWeight:600, color:'var(--text)', display:'flex', alignItems:'center', gap:6 }}>
                        {a.driver}
                        <span style={{ fontSize:11, color:`var(--${a.color})`, fontWeight:600 }}>{a.action}</span>
                      </div>
                      <div style={{ fontSize:11, color:'var(--text3)', marginTop:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{a.detail}</div>
                    </div>
                    <div style={{ fontSize:10, color:'var(--text4)', whiteSpace:'nowrap' }}>{a.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── VIDEO PROGRESS ── */}
      {activeTab === 'video-progress' && (
        <div className="fade-in">
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>Video Watch Progress</div>
            <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>See which drivers have watched each training video and their completion percentage</div>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {VIDEO_PROGRESS.map(video=>{
              const avgPct = Math.round(video.watchers.reduce((a,w)=>a+w.progress,0)/video.watchers.length);
              const completed = video.watchers.filter(w=>w.progress===100).length;
              const isExpanded = expandedVideo === video.videoId;
              return (
                <div key={video.videoId} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--r2)', overflow:'hidden', boxShadow:'var(--shadow-sm)' }}>
                  {/* Video header */}
                  <div style={{ padding:'16px 20px', display:'flex', alignItems:'center', gap:14, cursor:'pointer', borderBottom: isExpanded?'1px solid var(--border)':'none' }}
                    onClick={()=>setExpandedVideo(isExpanded?null:video.videoId)}>
                    <div style={{ width:44, height:44, borderRadius:12, background:'var(--blue-dim)', border:'1.5px solid rgba(27,110,243,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <Icon name="Video" size={18} color="var(--blue)"/>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14, fontWeight:700, color:'var(--text)', marginBottom:4 }}>{video.title}</div>
                      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                        <span className="chip" style={{ fontSize:10 }}><Icon name="Clock" size={9}/> {video.dur}</span>
                        <span className="chip" style={{ fontSize:10 }}><Icon name="Users" size={9}/> {video.watchers.length} watched</span>
                        <span className="chip" style={{ fontSize:10 }}><Icon name="Check" size={9}/> {completed} completed</span>
                      </div>
                    </div>
                    <div style={{ textAlign:'right', marginRight:12 }}>
                      <div style={{ fontSize:22, fontWeight:800, color: avgPct>=80?'var(--green)':avgPct>=50?'var(--amber)':'var(--red)', lineHeight:1 }}>{avgPct}%</div>
                      <div style={{ fontSize:10, color:'var(--text3)', fontWeight:600, marginTop:2 }}>Avg Progress</div>
                    </div>
                    <div style={{ width:28, height:28, borderRadius:'50%', background:'var(--bg3)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <Icon name={isExpanded?'X':'ChevronRight'} size={13} color="var(--text3)"/>
                    </div>
                  </div>

                  {/* Expanded driver list */}
                  {isExpanded && (
                    <div style={{ padding:'14px 20px' }}>
                      <div style={{ fontSize:11, fontWeight:700, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:12 }}>
                        Driver Progress Details
                      </div>
                      {video.watchers.map((w,i)=>(
                        <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom: i<video.watchers.length-1?'1px solid var(--border)':'none' }}>
                          <div style={{ width:32, height:32, borderRadius:8, background: w.progress===100?'var(--green-dim)':'var(--blue-dim)', color: w.progress===100?'var(--green)':'var(--blue)', border:`1px solid ${w.progress===100?'rgba(22,163,74,0.2)':'rgba(27,110,243,0.2)'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, fontFamily:'var(--font-mono)', flexShrink:0 }}>{w.avatar}</div>
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:13, fontWeight:600, color:'var(--text)', marginBottom:5 }}>{w.name}</div>
                            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                              <div className="prog-bar" style={{ flex:1, height:6 }}>
                                <div className="prog-fill" style={{ width:`${w.progress}%`, background: w.progress===100?'var(--green)':w.progress>=50?'var(--blue)':'var(--amber)' }}/>
                              </div>
                              <span style={{ fontFamily:'var(--font-mono)', fontSize:12, fontWeight:700, color: w.progress===100?'var(--green)':w.progress>=50?'var(--blue)':'var(--amber)', minWidth:36 }}>{w.progress}%</span>
                            </div>
                          </div>
                          <div style={{ textAlign:'right' }}>
                            {w.progress===100 ? (
                              <span className="badge badge-green"><Icon name="Check" size={10} strokeWidth={2.5}/> Completed</span>
                            ) : (
                              <span className="badge badge-amber"><Icon name="Clock" size={10}/> In Progress</span>
                            )}
                            <div style={{ fontSize:10, color:'var(--text3)', marginTop:4 }}>{w.watchedAt}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── CATEGORIES ── */}
      {activeTab === 'categories' && (
        <div className="fade-in">
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>Training Categories</div>
            <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>Click a category to open the full driver management table</div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
            {TRAINING_CATEGORIES.map(cat=>{
              const cm={blue:'var(--blue)',teal:'var(--teal)',amber:'var(--amber)'};
              const dm={blue:'var(--blue-dim)',teal:'var(--teal-dim)',amber:'var(--amber-dim)'};
              const c=cm[cat.color]; const d=dm[cat.color];
              return (
                <div key={cat.id} onClick={()=>setSelectedCat(cat)}
                  style={{ background:'var(--bg2)', border:'1.5px solid var(--border)', borderRadius:'var(--r3)', padding:'28px 24px', cursor:'pointer', transition:'all 0.2s', boxShadow:'var(--shadow-sm)', position:'relative', overflow:'hidden' }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--shadow-lg)'; e.currentTarget.style.borderColor=c; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='var(--shadow-sm)'; e.currentTarget.style.borderColor='var(--border)'; }}
                >
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:c, borderRadius:'var(--r3) var(--r3) 0 0' }}/>
                  <div style={{ width:56, height:56, borderRadius:16, background:d, border:`1.5px solid ${c}33`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
                    <Icon name={cat.icon} size={24} color={c} strokeWidth={1.75}/>
                  </div>
                  <div style={{ fontSize:17, fontWeight:800, color:'var(--text)', marginBottom:6, lineHeight:1.2 }}>{cat.label}</div>
                  <div style={{ fontSize:12.5, color:'var(--text2)', lineHeight:1.55, marginBottom:20 }}>{cat.desc}</div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:20 }}>
                    {[{label:'Active',val:cat.active},{label:'This Batch',val:cat.count},{label:'Graduated',val:cat.graduated}].map(s=>(
                      <div key={s.label} style={{ background:'var(--bg3)', borderRadius:'var(--r)', padding:'10px 8px', textAlign:'center', border:'1px solid var(--border)' }}>
                        <div style={{ fontSize:20, fontWeight:800, color:c, lineHeight:1 }}>{s.val}</div>
                        <div style={{ fontSize:10, color:'var(--text3)', fontWeight:600, marginTop:3, textTransform:'uppercase' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ width:'100%', padding:'11px', background:d, border:`1px solid ${c}33`, borderRadius:'var(--r)', fontSize:13, fontWeight:700, color:c, textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                    <Icon name="Users" size={14}/> Manage Drivers <Icon name="ChevronRight" size={13}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── NEW REGISTRATIONS ── */}
      {activeTab === 'registrations' && (
        <NewRegistrations registrations={registrations} onApprove={approveDriver} onReject={rejectDriver}/>
      )}

    </div>
  );
}