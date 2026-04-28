import React, { useState, useRef } from 'react';
import Icon from '../components/Icons';

const BATCHES = [
  { id:'Batch 153', label:'Batch 153 — Apr 2026', category:'public-pre',  catLabel:'Public Bus — Pre Service', color:'blue'  },
  { id:'Batch 154', label:'Batch 154 — Apr 2026', category:'public-in',   catLabel:'Public Bus — In Service',  color:'teal'  },
  { id:'Batch 155', label:'Batch 155 — May 2026', category:'school-bus',  catLabel:'School Bus Training',      color:'amber' },
];

const TRAINERS = [
  { id:1, name:'Elena Marsh', specialty:'Pre-Service & School Bus' },
  { id:2, name:'Tom Alvarez', specialty:'In-Service & BTW'         },
];

const SAMPLE_CSV = `Name,RTA ID,License No.,Nationality,DOB,Contact,Company,Batch
Ahmed Al Mansouri,90454,216815,UAE,1-Jan-1998,971554759730,Reach,Batch 153
Priya Sundaram,90377,4062382,India,15-Sep-1992,971542425821,Reach,Batch 154
Khalid Hassan,90149,3929152,UAE,30-Jun-1981,971718412702,Expert Plus,Batch 153
Ravi Kumar,90289,63662858,India,10-Mar-1994,971547078736,Expert Plus,Batch 155`;

export default function BatchAssignPage() {
  const [step,         setStep]         = useState(1); // 1=upload, 2=preview, 3=assign, 4=done
  const [drivers,      setDrivers]      = useState([]);
  const [selectedBatch,setSelectedBatch]= useState('');
  const [selectedTrainer,setSelectedTrainer] = useState('');
  const [importing,    setImporting]    = useState(false);
  const [progress,     setProgress]     = useState(0);
  const [errors,       setErrors]       = useState([]);
  const [dragOver,     setDragOver]     = useState(false);
  const fileRef = useRef();

  const parseCSV = (text) => {
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) return [];
    const parseRow = (line) => {
      const result = []; let cur = '', inQ = false;
      for (const ch of line) {
        if (ch === '"') { inQ = !inQ; }
        else if (ch === ',' && !inQ) { result.push(cur.trim()); cur = ''; }
        else { cur += ch; }
      }
      result.push(cur.trim()); return result;
    };
    const headers = parseRow(lines[0]);
    return lines.slice(1).map((line, i) => {
      const vals = parseRow(line);
      const obj = { _row: i + 2 };
      headers.forEach((h, hi) => { obj[h.trim()] = (vals[hi] || '').replace(/^"|"$/g, '').trim(); });
      return obj;
    }).filter(d => d['Name'] && d['Name'].length > 0);
  };

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const parsed = parseCSV(ev.target.result);
      const errs = [];
      parsed.forEach(d => {
        if (!d['Name'])    errs.push(`Row ${d._row}: Missing Name`);
        if (!d['RTA ID'])  errs.push(`Row ${d._row}: Missing RTA ID`);
      });
      setErrors(errs);
      setDrivers(parsed);
      setStep(2);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) handleFile(file);
  };

  const handleImport = async () => {
    if (!selectedBatch || !selectedTrainer) return;
    setImporting(true); setStep(3);
    for (let i = 0; i <= 100; i += 2) {
      await new Promise(r => setTimeout(r, 30));
      setProgress(i);
    }
    setImporting(false); setStep(4);
  };

  const handleSampleDownload = () => {
    const blob = new Blob([SAMPLE_CSV], { type:'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'sample_drivers.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const batch   = BATCHES.find(b => b.id === selectedBatch);
  const trainer = TRAINERS.find(t => t.name === selectedTrainer);
  const colorMap = { blue:'var(--blue)', teal:'var(--teal)', amber:'var(--amber)' };
  const dimMap   = { blue:'var(--blue-dim)', teal:'var(--teal-dim)', amber:'var(--amber-dim)' };

  return (
    <div className="fade-in">

      {/* Header */}
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>
          Bulk Driver Import
        </div>
        <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>
          Import thousands of drivers via CSV and assign them to a batch and trainer instantly
        </div>
      </div>

      {/* Step indicator */}
      <div style={{ display:'flex', alignItems:'center', gap:0, marginBottom:32 }}>
        {[
          { n:1, label:'Upload CSV'      },
          { n:2, label:'Preview Data'    },
          { n:3, label:'Assign & Import' },
          { n:4, label:'Done'            },
        ].map((s, i) => (
          <React.Fragment key={s.n}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{
                width:32, height:32, borderRadius:'50%', flexShrink:0,
                background: step >= s.n ? 'var(--blue)' : 'var(--bg4)',
                color: step >= s.n ? '#fff' : 'var(--text3)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:13, fontWeight:800, transition:'all 0.3s',
                boxShadow: step === s.n ? '0 0 0 4px rgba(27,110,243,0.2)' : 'none',
              }}>
                {step > s.n ? <Icon name="Check" size={14} color="#fff" strokeWidth={2.5}/> : s.n}
              </div>
              <span style={{ fontSize:12, fontWeight: step===s.n ? 700 : 500, color: step>=s.n ? 'var(--text)' : 'var(--text3)', whiteSpace:'nowrap' }}>
                {s.label}
              </span>
            </div>
            {i < 3 && (
              <div style={{ flex:1, height:2, background: step > s.n ? 'var(--blue)' : 'var(--border)', margin:'0 12px', transition:'background 0.3s', minWidth:40 }}/>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* ── STEP 1: Upload ── */}
      {step === 1 && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:20 }}>
          <div>
            {/* Drop zone */}
            <div
              onDragOver={e=>{ e.preventDefault(); setDragOver(true); }}
              onDragLeave={()=>setDragOver(false)}
              onDrop={handleDrop}
              onClick={()=>fileRef.current.click()}
              style={{
                border:`2px dashed ${dragOver ? 'var(--blue)' : 'var(--border2)'}`,
                borderRadius:'var(--r3)', padding:'60px 40px',
                textAlign:'center', cursor:'pointer',
                background: dragOver ? 'var(--blue-dim)' : 'var(--bg2)',
                transition:'all 0.2s',
              }}
            >
              <div style={{ fontSize:56, marginBottom:16 }}>📂</div>
              <div style={{ fontSize:18, fontWeight:800, color:'var(--text)', marginBottom:8 }}>
                {dragOver ? 'Drop your CSV here!' : 'Upload Drivers CSV'}
              </div>
              <div style={{ fontSize:13, color:'var(--text3)', marginBottom:20 }}>
                Drag & drop or click to browse · Supports up to 10,000+ drivers
              </div>
              <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
                <div style={{ padding:'10px 24px', background:'var(--blue)', color:'#fff', borderRadius:'var(--r2)', fontSize:13, fontWeight:700, display:'flex', alignItems:'center', gap:8 }}>
                  <Icon name="Upload" size={14} color="#fff"/> Choose CSV File
                </div>
              </div>
              <input ref={fileRef} type="file" accept=".csv" style={{ display:'none' }}
                onChange={e=>handleFile(e.target.files[0])}/>
            </div>

            {/* Required columns */}
            <div className="card" style={{ marginTop:16 }}>
              <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:12 }}>
                <Icon name="Info" size={13} color="var(--blue)"/> Required CSV Columns
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
                {['Name','RTA ID','License No.','Nationality','DOB','Contact','Company','Batch'].map(col=>(
                  <div key={col} style={{ background:'var(--bg3)', borderRadius:'var(--r)', padding:'8px 10px', fontSize:11, fontWeight:600, color:'var(--text2)', fontFamily:'var(--font-mono)', border:'1px solid var(--border)' }}>
                    {col}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div className="card" style={{ borderTop:'3px solid var(--green)' }}>
              <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:12 }}>
                <Icon name="Download" size={13} color="var(--green)"/> Sample CSV Template
              </div>
              <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.6, marginBottom:14 }}>
                Download our sample CSV template with the correct column format and sample data.
              </div>
              <button onClick={handleSampleDownload} className="btn btn-sm w100" style={{ background:'var(--green)', color:'#fff', border:'none', justifyContent:'center' }}>
                <Icon name="Download" size={12}/> Download Sample CSV
              </button>
            </div>

            <div className="card">
              <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:12 }}>💡 Tips</div>
              {[
                'Save your Excel file as CSV (comma separated)',
                'First row must be the column headers',
                'Name and RTA ID columns are required',
                'Up to 10,000+ drivers supported',
                'Duplicate RTA IDs will be skipped',
              ].map((tip,i)=>(
                <div key={i} style={{ display:'flex', gap:8, marginBottom:6, fontSize:12, color:'var(--text2)' }}>
                  <Icon name="Check" size={11} color="var(--green)" strokeWidth={2.5}/>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 2: Preview ── */}
      {step === 2 && (
        <div>
          {/* Summary bar */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 }}>
            {[
              { label:'Total Rows',    val:drivers.length,                                         color:'blue'  },
              { label:'Valid Drivers', val:drivers.length - errors.length,                         color:'green' },
              { label:'Errors',        val:errors.length,                                           color:'red'   },
              { label:'Ready to Import', val:errors.length===0?'✓ Yes':'Fix errors first',         color: errors.length===0?'green':'amber' },
            ].map(s=>(
              <div key={s.label} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--r2)', padding:'14px 16px', boxShadow:'var(--shadow-sm)' }}>
                <div style={{ fontSize:22, fontWeight:800, color:`var(--${s.color})`, lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600, marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div style={{ background:'var(--red-dim)', border:'1px solid rgba(220,38,38,0.2)', borderRadius:'var(--r2)', padding:'14px 16px', marginBottom:16 }}>
              <div style={{ fontSize:13, fontWeight:700, color:'var(--red)', marginBottom:8 }}>
                <Icon name="Alert" size={13}/> {errors.length} errors found — fix your CSV and re-upload
              </div>
              {errors.slice(0,5).map((e,i)=>(
                <div key={i} style={{ fontSize:12, color:'var(--red)', marginBottom:3 }}>• {e}</div>
              ))}
              {errors.length > 5 && <div style={{ fontSize:11, color:'var(--red)', opacity:0.7 }}>...and {errors.length-5} more</div>}
            </div>
          )}

          {/* Data preview table */}
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--r2)', overflow:'hidden', marginBottom:16 }}>
            <div style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>
                Preview — showing first {Math.min(10, drivers.length)} of {drivers.length} rows
              </span>
              <button className="btn btn-ghost btn-sm" onClick={()=>{ setDrivers([]); setStep(1); }}>
                <Icon name="Upload" size={12}/> Re-upload
              </button>
            </div>
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                  <tr style={{ background:'var(--bg3)' }}>
                    {['#','Name','RTA ID','License No.','Nationality','Company','Batch'].map(h=>(
                      <th key={h} style={{ padding:'8px 12px', textAlign:'left', fontSize:10, fontWeight:700, color:'var(--text3)', textTransform:'uppercase', borderBottom:'1px solid var(--border)', whiteSpace:'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {drivers.slice(0,10).map((d,i)=>(
                    <tr key={i} style={{ borderBottom:'1px solid var(--border)', background: i%2===0?'var(--bg2)':'var(--bg)' }}>
                      <td style={{ padding:'8px 12px', fontSize:11, color:'var(--text3)', fontFamily:'var(--font-mono)' }}>{i+1}</td>
                      <td style={{ padding:'8px 12px', fontSize:12, fontWeight:600, color:'var(--text)' }}>{d['Name']}</td>
                      <td style={{ padding:'8px 12px', fontSize:11, color:'var(--text2)', fontFamily:'var(--font-mono)' }}>{d['RTA ID']}</td>
                      <td style={{ padding:'8px 12px', fontSize:11, color:'var(--text2)', fontFamily:'var(--font-mono)' }}>{d['License No.']}</td>
                      <td style={{ padding:'8px 12px', fontSize:11, color:'var(--text2)' }}>{d['Nationality']}</td>
                      <td style={{ padding:'8px 12px', fontSize:11, color:'var(--text2)' }}>{d['Company']}</td>
                      <td style={{ padding:'8px 12px', fontSize:11 }}>
                        <span className="badge badge-blue" style={{ fontSize:9 }}>{d['Batch']||'—'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {drivers.length > 10 && (
              <div style={{ padding:'10px 16px', background:'var(--bg3)', borderTop:'1px solid var(--border)', fontSize:11, color:'var(--text3)', textAlign:'center' }}>
                ...and {drivers.length - 10} more rows
              </div>
            )}
          </div>

          {/* Batch + Trainer assignment */}
          <div className="card" style={{ marginBottom:16 }}>
            <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:16 }}>
              Assign Batch & Trainer to All Imported Drivers
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div>
                <label className="form-label"><Icon name="Layers" size={11}/> Training Batch *</label>
                <select className="form-input" value={selectedBatch} onChange={e=>setSelectedBatch(e.target.value)}>
                  <option value="">Select batch...</option>
                  {BATCHES.map(b=>(
                    <option key={b.id} value={b.id}>{b.label} — {b.catLabel}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label"><Icon name="GraduationCap" size={11}/> Assign Trainer *</label>
                <select className="form-input" value={selectedTrainer} onChange={e=>setSelectedTrainer(e.target.value)}>
                  <option value="">Select trainer...</option>
                  {TRAINERS.map(t=>(
                    <option key={t.id} value={t.name}>{t.name} — {t.specialty}</option>
                  ))}
                </select>
              </div>
            </div>

            {batch && trainer && (
              <div style={{ marginTop:14, background: dimMap[batch.color]||'var(--blue-dim)', border:`1px solid ${colorMap[batch.color]||'var(--blue)'}22`, borderRadius:'var(--r2)', padding:'12px 16px', display:'flex', gap:24, alignItems:'center' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <Icon name="Layers" size={14} color={colorMap[batch.color]||'var(--blue)'}/>
                  <div>
                    <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600 }}>Batch</div>
                    <div style={{ fontSize:13, fontWeight:700, color:colorMap[batch.color]||'var(--blue)' }}>{batch.id}</div>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <Icon name="GraduationCap" size={14} color="var(--teal)"/>
                  <div>
                    <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600 }}>Trainer</div>
                    <div style={{ fontSize:13, fontWeight:700, color:'var(--teal)' }}>{trainer.name}</div>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <Icon name="Users" size={14} color="var(--green)"/>
                  <div>
                    <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600 }}>Drivers</div>
                    <div style={{ fontSize:13, fontWeight:700, color:'var(--green)' }}>{drivers.length} to import</div>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <Icon name="Book" size={14} color="var(--blue)"/>
                  <div>
                    <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600 }}>Category</div>
                    <div style={{ fontSize:13, fontWeight:700, color:'var(--blue)' }}>{batch.catLabel}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ display:'flex', gap:10 }}>
            <button className="btn btn-primary" disabled={!selectedBatch || !selectedTrainer || errors.length > 0} onClick={handleImport} style={{ flex:1, justifyContent:'center', padding:'12px' }}>
              <Icon name="Upload" size={14}/> Import {drivers.length} Drivers
            </button>
            <button className="btn btn-ghost" onClick={()=>{ setStep(1); setDrivers([]); }}>
              <Icon name="ArrowLeft" size={13}/> Back
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Importing ── */}
      {step === 3 && (
        <div style={{ textAlign:'center', padding:'60px 40px' }}>
          <div style={{ fontSize:56, marginBottom:20 }}>⚙️</div>
          <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', marginBottom:8 }}>
            Importing {drivers.length} drivers...
          </div>
          <div style={{ fontSize:13, color:'var(--text3)', marginBottom:32 }}>
            Assigning to {selectedBatch} · {selectedTrainer}
          </div>
          <div style={{ maxWidth:400, margin:'0 auto', marginBottom:16 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
              <span style={{ fontSize:12, color:'var(--text3)' }}>Progress</span>
              <span style={{ fontSize:12, fontWeight:700, color:'var(--blue)' }}>{progress}%</span>
            </div>
            <div className="prog-bar" style={{ height:10 }}>
              <div className="prog-fill" style={{ width:`${progress}%`, transition:'width 0.1s' }}/>
            </div>
            <div style={{ fontSize:11, color:'var(--text3)', marginTop:8 }}>
              Processing {Math.round((progress/100)*drivers.length)} of {drivers.length} drivers
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 4: Done ── */}
      {step === 4 && (
        <div style={{ textAlign:'center', padding:'60px 40px' }}>
          <div style={{ width:80, height:80, borderRadius:'50%', background:'var(--green-dim)', border:'2px solid var(--green)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px' }}>
            <Icon name="Check" size={36} color="var(--green)" strokeWidth={2}/>
          </div>
          <div style={{ fontSize:24, fontWeight:800, color:'var(--text)', marginBottom:8 }}>
            Import Complete!
          </div>
          <div style={{ fontSize:14, color:'var(--text2)', marginBottom:32, lineHeight:1.6 }}>
            <strong>{drivers.length} drivers</strong> have been imported and assigned to<br/>
            <strong>{selectedBatch}</strong> with trainer <strong>{selectedTrainer}</strong>.<br/>
            Drivers can now log in and access their training courses.
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, maxWidth:400, margin:'0 auto 32px' }}>
            {[
              { label:'Imported',    val:drivers.length,              color:'green' },
              { label:'Batch',       val:selectedBatch,               color:'blue'  },
              { label:'Trainer',     val:selectedTrainer.split(' ')[0], color:'teal' },
            ].map(s=>(
              <div key={s.label} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--r2)', padding:'14px 10px', textAlign:'center' }}>
                <div style={{ fontSize:20, fontWeight:800, color:`var(--${s.color})`, lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600, marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
            <button className="btn btn-primary" onClick={()=>{ setStep(1); setDrivers([]); setSelectedBatch(''); setSelectedTrainer(''); setProgress(0); }}>
              <Icon name="Upload" size={13}/> Import More Drivers
            </button>
          </div>
        </div>
      )}
    </div>
  );
}