import React, { useState, useRef } from 'react';
import { TRAINING_CATEGORIES, CSV_COLUMNS, SAMPLE_BATCH_DRIVERS } from '../data/mockData';
import Icon from '../components/Icons';

function generateCertificate(driver, category) {
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
    <div class="recipient">${driver.name}</div>
    <div class="body-text">
      has successfully completed the required training programme in
      <span class="course-name">${category.label}</span>
      and demonstrated the competency required to operate public transport vehicles in the Emirate of Dubai.
    </div>
    <div class="details">
      <div class="detail-item"><div class="detail-label">RTA ID</div><div class="detail-val">${driver.rtaId}</div></div>
      <div class="detail-item"><div class="detail-label">License No.</div><div class="detail-val">${driver.licNo}</div></div>
      <div class="detail-item"><div class="detail-label">Training Batch</div><div class="detail-val">${driver.batch}</div></div>
      <div class="detail-item"><div class="detail-label">Date of Joining</div><div class="detail-val">${driver.joinDate}</div></div>
      <div class="detail-item"><div class="detail-label">Company</div><div class="detail-val">${driver.company}</div></div>
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
  a.download = `Certificate_${driver.name.replace(/\s+/g,'_')}_${driver.batch}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

function DriverRow({ driver, idx, onChange, onDelete, onCert }) {
  const [editing, setEditing] = useState(false);
  const [local,   setLocal]   = useState({ ...driver });
  const save = () => { onChange(idx, local); setEditing(false); };
  const cellStyle = { padding:'8px 10px', borderBottom:'1px solid var(--border)', fontSize:12, color:'var(--text2)', whiteSpace:'nowrap' };
  const inputStyle = { width:'100%', padding:'4px 6px', border:'1px solid var(--blue)', borderRadius:4, fontSize:11, background:'var(--bg)', color:'var(--text)', fontFamily:'var(--font-mono)', outline:'none' };
  const FIELDS = ['rtaId','licNo','name','nationality','dob','issued','expired','place','traffic','contact','age','company','roadTest','interview','joinDate','batch','graduation'];
  return (
    <tr>
      <td style={{ ...cellStyle, color:'var(--text3)', fontFamily:'var(--font-mono)', textAlign:'center' }}>{driver.sl}</td>
      {editing ? (
        FIELDS.map(f => (
          <td key={f} style={cellStyle}>
            <input style={inputStyle} value={local[f]||''} onChange={e=>setLocal(p=>({...p,[f]:e.target.value}))}/>
          </td>
        ))
      ) : (
        FIELDS.map(f => (
          <td key={f} style={{ ...cellStyle, fontFamily:['rtaId','licNo','traffic','contact','age'].includes(f)?'var(--font-mono)':'inherit' }}>
            {driver[f] || <span style={{ color:'var(--text3)' }}>—</span>}
          </td>
        ))
      )}
      <td style={{ ...cellStyle, whiteSpace:'nowrap' }}>
        <div style={{ display:'flex', gap:4 }}>
          {editing ? (
            <>
              <button onClick={save} style={{ padding:'3px 8px', background:'var(--green-dim)', color:'var(--green)', border:'1px solid rgba(22,163,74,0.25)', borderRadius:4, cursor:'pointer', fontSize:11, fontWeight:600 }}>
                <Icon name="Check" size={10}/> Save
              </button>
              <button onClick={()=>setEditing(false)} style={{ padding:'3px 8px', background:'var(--bg4)', color:'var(--text3)', border:'1px solid var(--border)', borderRadius:4, cursor:'pointer', fontSize:11 }}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={()=>setEditing(true)} style={{ padding:'3px 8px', background:'var(--blue-dim)', color:'var(--blue)', border:'1px solid rgba(29,111,242,0.2)', borderRadius:4, cursor:'pointer', fontSize:11 }}>
                <Icon name="Edit" size={10}/>
              </button>
              <button onClick={()=>onCert(driver)} style={{ padding:'3px 8px', background:'var(--amber-dim)', color:'var(--amber)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:4, cursor:'pointer', fontSize:11, fontWeight:600 }}>
                <Icon name="Trophy" size={10}/> Cert
              </button>
              <button onClick={()=>onDelete(idx)} style={{ padding:'3px 8px', background:'var(--red-dim)', color:'var(--red)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:4, cursor:'pointer', fontSize:11 }}>
                <Icon name="X" size={10}/>
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

function DriverTable({ category, onBack }) {
  const [drivers, setDrivers] = useState(SAMPLE_BATCH_DRIVERS.map(d=>({...d})));
  const [search,  setSearch]  = useState('');
  const [certMsg, setCertMsg] = useState('');
  const [newRow,  setNewRow]  = useState(false);
  const [blank,   setBlank]   = useState({ sl:'',rtaId:'',licNo:'',name:'',nationality:'',dob:'',issued:'',expired:'',place:'',traffic:'',contact:'',age:'',company:'',roadTest:'',interview:'',joinDate:'',batch:'',graduation:'' });
  const fileRef = useRef();

  const filtered = drivers.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.rtaId.includes(search) ||
    d.licNo.includes(search) ||
    d.company.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (idx, updated) => {
    const orig = filtered[idx];
    const gi = drivers.findIndex(d => d.sl === orig.sl);
    setDrivers(prev => { const cp=[...prev]; cp[gi]=updated; return cp; });
  };

  const handleDelete = (idx) => {
    const orig = filtered[idx];
    if (window.confirm(`Remove ${orig.name}?`))
      setDrivers(prev => prev.filter(d => d.sl !== orig.sl));
  };

  const handleCert = (driver) => {
    generateCertificate(driver, category);
    setCertMsg(`✅ Certificate generated for ${driver.name}`);
    setTimeout(()=>setCertMsg(''), 3000);
  };

  const handleAddRow = () => {
    const newSl = drivers.length > 0 ? Math.max(...drivers.map(d=>Number(d.sl)||0))+1 : 1;
    setDrivers(prev => [...prev, { ...blank, sl:newSl }]);
    setNewRow(false);
  };

  const handleCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text  = ev.target.result;
      const lines = text.split(/\r?\n/).filter(l=>l.trim());
      if (lines.length < 2) return;
      const parseRow = (line) => {
        const result=[]; let cur='', inQ=false;
        for (let i=0;i<line.length;i++) {
          const ch=line[i];
          if (ch==='"'){inQ=!inQ;}
          else if (ch===','&&!inQ){result.push(cur.trim());cur='';}
          else{cur+=ch;}
        }
        result.push(cur.trim()); return result;
      };
      const headers = parseRow(lines[0]);
      const fieldMap = { 'SL':'sl','RTA ID':'rtaId','License No.':'licNo','Name as per Driving License':'name','Nationality':'nationality','Date of Birth':'dob','Date of Issued':'issued','Date of Expired':'expired','Place of issue':'place','Traffic File':'traffic','Contact':'contact','Age':'age','Company':'company','Date of Road test':'roadTest','Interview':'interview','Date of Join Training':'joinDate','Training Batch':'batch','Date of Graduation':'graduation' };
      const imported = lines.slice(1).map(line => {
        const vals=parseRow(line); const obj={};
        headers.forEach((h,i)=>{ const key=fieldMap[h.trim()]||h.trim(); obj[key]=(vals[i]||'').replace(/^"|"$/g,'').trim(); });
        return obj;
      }).filter(d=>d.name&&d.name.length>0);
      if (imported.length>0) { setDrivers(imported); setCertMsg(`✅ Imported ${imported.length} drivers`); setTimeout(()=>setCertMsg(''),3000); }
    };
    reader.readAsText(file);
    e.target.value='';
  };

  const handleExport = () => {
    const fieldOrder=['sl','rtaId','licNo','name','nationality','dob','issued','expired','place','traffic','contact','age','company','roadTest','interview','joinDate','batch','graduation'];
    const rows = drivers.map(d=>fieldOrder.map(f=>`"${d[f]||''}"`).join(','));
    const csv  = [CSV_COLUMNS.join(','), ...rows].join('\n');
    const blob = new Blob([csv],{type:'text/csv'});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href=url; a.download=`${category.short.replace(/\s+/g,'_')}_Drivers.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const colorMap = { blue:'var(--blue)', teal:'var(--teal)', amber:'var(--amber)' };
  const dimMap   = { blue:'var(--blue-dim)', teal:'var(--teal-dim)', amber:'var(--amber-dim)' };

  return (
    <div className="fade-in">
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <Icon name="ArrowLeft" size={13}/> Back
        </button>
        <span style={{ color:'var(--text3)' }}>›</span>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'4px 12px', borderRadius:20, fontSize:11, fontWeight:700, background:dimMap[category.color], color:colorMap[category.color], border:`1px solid ${colorMap[category.color]}33` }}>
          <Icon name={category.icon} size={12} strokeWidth={2.5}/> {category.label}
        </div>
        <span style={{ fontSize:12, color:'var(--text3)' }}>{drivers.length} drivers</span>
      </div>

      {certMsg && (
        <div style={{ background:'var(--green-dim)', border:'1px solid rgba(22,163,74,0.3)', borderRadius:'var(--r2)', padding:'12px 16px', marginBottom:16, display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--green)', fontWeight:600 }}>
          <Icon name="Trophy" size={14}/> {certMsg}
        </div>
      )}

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div className="tb-search">
            <Icon name="Search" size={13} color="var(--text3)"/>
            <input placeholder="Search drivers..." value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <span style={{ fontSize:12, color:'var(--text3)' }}>Showing {filtered.length} of {drivers.length}</span>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button className="btn btn-ghost btn-sm" onClick={()=>fileRef.current.click()}>
            <Icon name="Upload" size={12}/> Import CSV
          </button>
          <input ref={fileRef} type="file" accept=".csv" style={{display:'none'}} onChange={handleCSV}/>
          <button className="btn btn-ghost btn-sm" onClick={handleExport}>
            <Icon name="Download" size={12}/> Export CSV
          </button>
          <button className="btn btn-ghost btn-sm" onClick={()=>{ drivers.forEach((d,i)=>setTimeout(()=>generateCertificate(d,category),i*300)); setCertMsg(`✅ Generating ${drivers.length} certificates...`); setTimeout(()=>setCertMsg(''),4000); }} style={{ color:'var(--amber)' }}>
            <Icon name="Trophy" size={12}/> All Certs
          </button>
          <button className="btn btn-primary btn-sm" onClick={()=>setNewRow(true)}>
            <Icon name="Plus" size={12}/> Add Driver
          </button>
        </div>
      </div>

      {newRow && (
        <div className="card mb16" style={{ background:'var(--blue-dim)', border:'1px solid rgba(29,111,242,0.2)', marginBottom:16 }}>
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
            {filtered.length === 0 ? (
              <tr><td colSpan={19} style={{ textAlign:'center', padding:40, color:'var(--text3)' }}>No drivers found</td></tr>
            ) : filtered.map((d,i)=>(
              <DriverRow key={d.sl||i} driver={d} idx={i} onChange={handleChange} onDelete={handleDelete} onCert={handleCert} category={category}/>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop:16, display:'flex', gap:12 }}>
        {[
          { label:'Total Drivers', val:drivers.length, color:'blue' },
          { label:'Graduated', val:drivers.filter(d=>d.graduation).length, color:'green' },
          { label:'In Training', val:drivers.filter(d=>!d.graduation).length, color:'amber' },
          { label:'Companies', val:[...new Set(drivers.map(d=>d.company))].filter(Boolean).length, color:'teal' },
        ].map(s=>(
          <div key={s.label} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--r2)', padding:'12px 16px', display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:8, background:`var(--${s.color}-dim)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon name="Users" size={14} color={`var(--${s.color})`}/>
            </div>
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

export default function AdminDashboard({ onView }) {
  const [selectedCat, setSelectedCat] = useState(null);
  const [activeTab,   setActiveTab]   = useState('overview');

  if (selectedCat) {
    return <DriverTable category={selectedCat} onBack={()=>setSelectedCat(null)}/>;
  }

  return (
    <div className="fade-in">

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom:24 }}>
        {[
          { key:'overview',   icon:'Home',     label:'Overview'   },
          { key:'categories', icon:'Layers',   label:'Categories' },
          { key:'analytics',  icon:'BarChart', label:'Analytics'  },
        ].map(t=>(
          <button key={t.key} className={`tab ${activeTab===t.key?'active':''}`}
            onClick={()=>setActiveTab(t.key)}
            style={{ border:'none', background:'none', cursor:'pointer', fontFamily:'var(--font)', display:'flex', alignItems:'center', gap:6 }}>
            <Icon name={t.icon} size={13}/> {t.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {activeTab === 'overview' && (
        <div className="fade-in">
          <div style={{ background:'linear-gradient(135deg, var(--blue) 0%, #1560d4 100%)', borderRadius:'var(--r2)', padding:'24px 28px', marginBottom:28, display:'flex', alignItems:'center', gap:20, boxShadow:'0 8px 24px rgba(27,110,243,0.3)' }}>
            <div style={{ width:56, height:56, borderRadius:16, background:'rgba(255,255,255,0.15)', border:'2px solid rgba(255,255,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Icon name="Bus" size={26} color="#fff" strokeWidth={1.75}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:20, fontWeight:800, color:'#fff', letterSpacing:'-0.5px' }}>TransitLearn — Admin Dashboard</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.75)', marginTop:4 }}>Manage drivers, courses and compliance across all training categories</div>
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

          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {[
              { label:'Total Drivers',    val:'567', delta:'+12 this month', up:true,  color:'blue',  icon:'Users'  },
              { label:'Compliance Rate',  val:'91%', delta:'+3% vs last qtr',up:true,  color:'green', icon:'Shield' },
              { label:'Overdue Training', val:'23',  delta:'Need action',    up:false, color:'red',   icon:'Alert'  },
              { label:'BTW Hours YTD',    val:'847', delta:'+124 this month',up:true,  color:'teal',  icon:'Clock'  },
            ].map(t=>(
              <div key={t.label} className={`stat-tile ${t.color}`}>
                <div className="stat-icon"><Icon name={t.icon} size={18} color={`var(--${t.color})`} strokeWidth={1.75}/></div>
                <div className="stat-label">{t.label}</div>
                <div className="stat-val">{t.val}</div>
                <div className="stat-delta">
                  <span className={t.up?'up':'down'}>
                    <Icon name={t.up?'BarChart':'Alert'} size={11} strokeWidth={2.5}/> {t.delta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CATEGORIES ── */}
      {activeTab === 'categories' && (
        <div className="fade-in">
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:15, fontWeight:800, color:'var(--text)', letterSpacing:'-0.3px' }}>Training Categories</div>
            <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>Select a category to view and manage drivers</div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
            {TRAINING_CATEGORIES.map(cat => {
              const colorMap = { blue:'var(--blue)', teal:'var(--teal)', amber:'var(--amber)' };
              const dimMap   = { blue:'var(--blue-dim)', teal:'var(--teal-dim)', amber:'var(--amber-dim)' };
              const c = colorMap[cat.color];
              const d = dimMap[cat.color];
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

      {/* ── ANALYTICS ── */}
      {activeTab === 'analytics' && (
        <div className="fade-in">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 }}>
            {[
              { label:'Total Completions', val:'847', delta:'+12%', up:true,  color:'blue',  icon:'Trophy' },
              { label:'Overall Pass Rate', val:'91%', delta:'+3%',  up:true,  color:'green', icon:'Shield' },
              { label:'Active Trainees',   val:'108', delta:'+8',   up:true,  color:'teal',  icon:'Users'  },
              { label:'Avg Score',         val:'83%', delta:'-1%',  up:false, color:'amber', icon:'Star'   },
            ].map(t=>(
              <div key={t.label} className={`stat-tile ${t.color}`}>
                <div className="stat-icon"><Icon name={t.icon} size={18} color={`var(--${t.color})`}/></div>
                <div className="stat-label">{t.label}</div>
                <div className="stat-val">{t.val}</div>
                <div className="stat-delta"><span className={t.up?'up':'down'}>{t.delta} vs last period</span></div>
              </div>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:24 }}>
            <div className="card">
              <div className="sec-head"><div><div className="sec-title">Completion by Category</div><div className="sec-sub">Training completion rates</div></div></div>
              {[
                { label:'Public Bus — Pre Service', pct:89, drivers:284, color:'var(--blue)'  },
                { label:'Public Bus — In Service',  pct:94, drivers:196, color:'var(--teal)'  },
                { label:'School Bus Training',      pct:82, drivers:87,  color:'var(--amber)' },
              ].map(c=>(
                <div key={c.label} style={{ marginBottom:16 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                    <span style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{c.label}</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:13, fontWeight:700, color:c.color }}>{c.pct}%</span>
                  </div>
                  <div className="prog-bar" style={{ height:8 }}>
                    <div className="prog-fill" style={{ width:`${c.pct}%`, background:c.color }}/>
                  </div>
                  <div style={{ fontSize:11, color:'var(--text3)', marginTop:4 }}>{c.drivers} drivers enrolled</div>
                </div>
              ))}
            </div>

            <div className="card">
              <div className="sec-head"><div><div className="sec-title">Depot Performance</div><div className="sec-sub">Training completion by depot</div></div></div>
              {[
                { name:'Central Depot',  pct:94, drivers:48 },
                { name:'North Terminal', pct:78, drivers:32 },
                { name:'South Hub',      pct:61, drivers:27 },
                { name:'East Station',   pct:85, drivers:19 },
                { name:'West Garage',    pct:91, drivers:41 },
              ].map(d=>{
                const color = d.pct>=90?'var(--green)':d.pct>=75?'var(--amber)':'var(--red)';
                return (
                  <div key={d.name} style={{ marginBottom:12 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                        <div style={{ width:7, height:7, borderRadius:'50%', background:color }}/>
                        <span style={{ fontSize:12.5, fontWeight:600, color:'var(--text)' }}>{d.name}</span>
                        <span className="chip" style={{ fontSize:9 }}>{d.drivers} drivers</span>
                      </div>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:12, fontWeight:700, color }}>{d.pct}%</span>
                    </div>
                    <div className="prog-bar" style={{ height:5 }}>
                      <div className="prog-fill" style={{ width:`${d.pct}%`, background:color }}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <div className="sec-head"><div><div className="sec-title">Monthly Completions</div><div className="sec-sub">Training sessions per month</div></div></div>
            <div style={{ display:'flex', alignItems:'flex-end', gap:6, height:100, marginBottom:8 }}>
              {[42,58,61,74,68,83,79,91,88,95,87,102].map((v,i)=>(
                <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                  <div style={{ width:'100%', height:Math.max(6,(v/102)*100), background:i===11?'var(--blue)':'var(--blue-dim)', borderRadius:'4px 4px 0 0' }}/>
                  <span style={{ fontSize:9, color:'var(--text3)', fontWeight:600 }}>
                    {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginTop:16 }}>
              {[
                { label:'YTD Completions', val:'847', color:'var(--blue)'  },
                { label:'Avg per Month',   val:'70.6',color:'var(--teal)'  },
                { label:'Best Month',      val:'102', color:'var(--green)' },
                { label:'Pass Rate',       val:'91%', color:'var(--amber)' },
              ].map(s=>(
                <div key={s.label} style={{ background:'var(--bg3)', borderRadius:'var(--r2)', padding:'12px 14px', border:'1px solid var(--border)' }}>
                  <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600, marginBottom:4 }}>{s.label}</div>
                  <div style={{ fontSize:22, fontWeight:800, color:s.color }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}