import React, { useState, useRef } from 'react';
import Icon from '../components/Icons';

const CATEGORIES = [
  'Public Bus — Pre Service',
  'Public Bus — In Service',
  'School Bus Training',
];

const INITIAL_MEDIA = [
  { id:1, name:'intro_safety_brief.mp4',      type:'video', size:'245 MB', category:'Public Bus — Pre Service', uploaded:'2025-04-10', dur:'12:34', url:'', desc:'Introduction to basic safety procedures for new bus drivers.' },
  { id:2, name:'wet_weather_techniques.mp4',   type:'video', size:'312 MB', category:'Public Bus — Pre Service', uploaded:'2025-04-10', dur:'18:22', url:'', desc:'Techniques for safe driving in wet and adverse weather conditions.' },
  { id:3, name:'defensive_driving_guide.pdf',  type:'pdf',   size:'4.2 MB', category:'Public Bus — In Service',  uploaded:'2025-04-08', dur:'15 min read', url:'', desc:'Comprehensive guide to defensive driving for experienced drivers.' },
  { id:4, name:'child_safety_procedures.pdf',  type:'pdf',   size:'2.8 MB', category:'School Bus Training',      uploaded:'2025-04-05', dur:'10 min read', url:'', desc:'Child safety and emergency procedures for school bus drivers.' },
  { id:5, name:'emergency_procedures.mp4',     type:'video', size:'198 MB', category:'Public Bus — In Service',  uploaded:'2025-04-03', dur:'22:10', url:'', desc:'Emergency response procedures and protocols for bus drivers.' },
];

function VideoPreviewModal({ file, onClose }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:3000,
      background:'rgba(0,0,0,0.85)', backdropFilter:'blur(8px)',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
    }} onClick={onClose}>
      <div style={{
        background:'#0A0F1E', borderRadius:'var(--r3)',
        width:'80vw', maxWidth:860,
        boxShadow:'0 32px 80px rgba(0,0,0,0.6)',
        overflow:'hidden',
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{
          padding:'14px 20px', background:'rgba(255,255,255,0.05)',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          borderBottom:'1px solid rgba(255,255,255,0.1)',
        }}>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:'#fff' }}>{file.name}</div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.45)', marginTop:2 }}>
              {file.category} · {file.size} · {file.dur}
            </div>
          </div>
          <button onClick={onClose} style={{
            background:'rgba(255,255,255,0.1)', border:'none',
            borderRadius:8, padding:'6px 10px',
            color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', gap:5,
          }}>
            <Icon name="X" size={14} color="#fff"/> Close
          </button>
        </div>

        {/* Video player area */}
        <div style={{
          background:'linear-gradient(135deg, #0A0F1E 0%, #1A2744 50%, #0D1528 100%)',
          aspectRatio:'16/9', display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center', position:'relative',
          cursor:'pointer',
        }} onClick={() => setPlaying(p => !p)}>

          {/* DRM badge */}
          <div style={{
            position:'absolute', top:14, right:14,
            background:'rgba(0,0,0,0.6)', border:'1px solid rgba(255,255,255,0.1)',
            color:'rgba(255,255,255,0.5)', fontSize:9, fontFamily:'var(--font-mono)',
            padding:'4px 10px', borderRadius:6, backdropFilter:'blur(8px)',
            display:'flex', alignItems:'center', gap:5,
          }}>
            <Icon name="Shield" size={9} color="rgba(255,255,255,0.5)"/>
            HLS/DASH · Widevine DRM · Trainer Preview
          </div>

          {/* Bus icon */}
          <div style={{ fontSize:64, marginBottom:16, filter:'drop-shadow(0 4px 20px rgba(0,0,0,0.5))' }}>
            🚌
          </div>

          {/* Play button */}
          <div style={{
            width:60, height:60, borderRadius:'50%',
            background:'rgba(255,255,255,0.15)',
            border:'2px solid rgba(255,255,255,0.3)',
            display:'flex', alignItems:'center', justifyContent:'center',
            backdropFilter:'blur(8px)', marginBottom:16,
            transition:'all 0.2s',
          }}>
            <Icon name={playing?'Pause':'Play'} size={24} color="#fff" strokeWidth={2}/>
          </div>

          <div style={{ fontSize:14, color:'rgba(255,255,255,0.7)', fontWeight:600 }}>
            {playing ? 'Playing preview...' : 'Click to preview'}
          </div>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', marginTop:6 }}>
            {file.name}
          </div>
        </div>

        {/* Controls bar */}
        <div style={{
          background:'#050A14', padding:'12px 20px',
          display:'flex', alignItems:'center', gap:12,
        }}>
          <button onClick={() => setPlaying(p=>!p)} style={{
            background:'transparent', border:'none',
            color:'rgba(255,255,255,0.7)', cursor:'pointer', display:'flex',
          }}>
            <Icon name={playing?'Pause':'Play'} size={16} color="rgba(255,255,255,0.7)"/>
          </button>
          <span style={{ color:'rgba(255,255,255,0.4)', fontSize:11, fontFamily:'var(--font-mono)' }}>
            00:00
          </span>
          <div style={{ flex:1, height:4, background:'rgba(255,255,255,0.15)', borderRadius:10, overflow:'hidden' }}>
            <div style={{ height:'100%', width: playing ? '35%' : '0%', background:'var(--brand)', borderRadius:10, transition:'width 0.3s' }}/>
          </div>
          <span style={{ color:'rgba(255,255,255,0.4)', fontSize:11, fontFamily:'var(--font-mono)' }}>
            {file.dur}
          </span>
          <Icon name="Volume"   size={14} color="rgba(255,255,255,0.5)"/>
          <Icon name="Maximize" size={14} color="rgba(255,255,255,0.5)"/>
        </div>

        {/* Description */}
        {file.desc && (
          <div style={{ padding:'14px 20px', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', lineHeight:1.6 }}>
              {file.desc}
            </div>
          </div>
        )}
      </div>
      </div>
  );
}

function PdfPreviewModal({ file, onClose }) {
  return (
    <div style={{
      position:'fixed', inset:0, zIndex:3000,
      background:'rgba(0,0,0,0.85)', backdropFilter:'blur(8px)',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
    }} onClick={onClose}>
      <div style={{
        background:'var(--bg2)', borderRadius:'var(--r3)',
        width:'75vw', maxWidth:780, maxHeight:'85vh',
        boxShadow:'var(--shadow-lg)', overflow:'hidden',
        display:'flex', flexDirection:'column',
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{
          padding:'14px 20px', background:'var(--red-dim)',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          borderBottom:'1px solid var(--border)', flexShrink:0,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <Icon name="FileText" size={18} color="var(--red)"/>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>{file.name}</div>
              <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>
                {file.category} · {file.size} · {file.dur}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            <Icon name="X" size={13}/> Close
          </button>
        </div>

        {/* PDF preview area */}
        <div style={{
          flex:1, padding:'32px', overflow:'auto',
          background:'#f0f0f0', display:'flex', flexDirection:'column', alignItems:'center', gap:16,
        }}>
          {/* Simulated PDF pages */}
          {[1,2,3].map(page => (
            <div key={page} style={{
              width:'100%', maxWidth:560,
              background:'#fff', borderRadius:'var(--r)',
              padding:'40px 48px',
              boxShadow:'0 2px 12px rgba(0,0,0,0.15)',
              minHeight:320,
            }}>
              {page === 1 && (
                <>
                  <div style={{ textAlign:'center', marginBottom:24 }}>
                    <div style={{ fontSize:11, color:'#888', letterSpacing:2, marginBottom:8 }}>
                      ROADS AND TRANSPORT AUTHORITY · DUBAI
                    </div>
                    <div style={{ fontSize:22, fontWeight:800, color:'#002060', marginBottom:6 }}>
                      {file.name.replace('.pdf','').replace(/_/g,' ').toUpperCase()}
                    </div>
                    <div style={{ width:60, height:2, background:'#c9a84c', margin:'0 auto 16px' }}/>
                    <div style={{ fontSize:12, color:'#555' }}>{file.desc}</div>
                  </div>
                  <div style={{ borderTop:'1px solid #eee', paddingTop:20 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:'#002060', marginBottom:8 }}>1. Introduction</div>
                    <div style={{ fontSize:12, color:'#444', lineHeight:1.7 }}>
                      This document outlines the essential procedures and guidelines for {file.category.toLowerCase()} training. All drivers are required to read and understand this material before proceeding with practical assessments.
                    </div>
                  </div>
                </>
              )}
              {page === 2 && (
                <>
                  <div style={{ fontSize:13, fontWeight:700, color:'#002060', marginBottom:12 }}>2. Safety Requirements</div>
                  <div style={{ fontSize:12, color:'#444', lineHeight:1.7, marginBottom:16 }}>
                    All drivers must comply with RTA safety standards. Regular checks and maintenance procedures should be followed strictly according to the guidelines provided in this document.
                  </div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#002060', marginBottom:12 }}>3. Procedures</div>
                  <div style={{ fontSize:12, color:'#444', lineHeight:1.7 }}>
                    Standard operating procedures must be adhered to at all times. Any deviation from these procedures must be reported to the supervising trainer immediately.
                  </div>
                </>
              )}
              {page === 3 && (
                <>
                  <div style={{ fontSize:13, fontWeight:700, color:'#002060', marginBottom:12 }}>4. Assessment Criteria</div>
                  <div style={{ fontSize:12, color:'#444', lineHeight:1.7, marginBottom:16 }}>
                    Drivers will be assessed on their understanding of the material covered in this document. A minimum score of 80% is required to proceed to the practical assessment stage.
                  </div>
                  <div style={{ textAlign:'center', marginTop:32, paddingTop:20, borderTop:'1px solid #eee' }}>
                    <div style={{ fontSize:10, color:'#aaa' }}>Page {page} of 3 · RTA Training Division · Dubai</div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
  );
}

export default function MediaUploadPage() {
  const [media,    setMedia]    = useState(INITIAL_MEDIA);
  const [category, setCategory] = useState('All');
  const [type,     setType]     = useState('All');
  const [toast,    setToast]    = useState('');
  const [uploading,setUploading]= useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [preview,  setPreview]  = useState(null);
  const [editDesc, setEditDesc] = useState(null);
  const videoRef = useRef();
  const pdfRef   = useRef();

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(''), 3000); };

  const handleUpload = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    await new Promise(r => setTimeout(r, 1500));
    const newFiles = Array.from(files).map((f, i) => ({
      id:       Date.now() + i,
      name:     f.name,
      type:     f.type.includes('pdf') ? 'pdf' : 'video',
      size:     f.size > 1024*1024
        ? `${(f.size/1024/1024).toFixed(1)} MB`
        : `${Math.round(f.size/1024)} KB`,
      category: category === 'All' ? CATEGORIES[0] : category,
      uploaded: new Date().toISOString().slice(0,10),
      dur:      f.type.includes('pdf') ? 'PDF Document' : 'Video',
      url:      '',
      desc:     '',
    }));
    setMedia(prev => [...newFiles, ...prev]);
    setUploading(false);
    showToast(`✅ ${files.length} file(s) uploaded successfully`);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleUpload(e.dataTransfer.files);
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this file from the library?'))
      setMedia(prev => prev.filter(m => m.id !== id));
    showToast('✅ File removed');
  };

  const filtered = media.filter(m => {
    const matchCat  = category === 'All' || m.category === category;
    const matchType = type === 'All'     || m.type === type;
    return matchCat && matchType;
  });

  const totalVideos = media.filter(m => m.type==='video').length;
  const totalPDFs   = media.filter(m => m.type==='pdf').length;

  return (
    <div className="fade-in">

      {/* Modals */}
      {preview?.type === 'video' && <VideoPreviewModal file={preview} onClose={() => setPreview(null)}/>}
      {preview?.type === 'pdf'   && <PdfPreviewModal   file={preview} onClose={() => setPreview(null)}/>}

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
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>
            Media Library
          </div>
          <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>
            Upload and manage training videos and PDFs
          </div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => pdfRef.current.click()}>
            <Icon name="FileText" size={13}/> Upload PDF
          </button>
          <button className="btn btn-primary" onClick={() => videoRef.current.click()}>
            <Icon name="Upload" size={13}/> Upload Video
          </button>
          <input ref={videoRef} type="file" accept="video/*" multiple
            style={{ display:'none' }} onChange={e => handleUpload(e.target.files)}/>
          <input ref={pdfRef}   type="file" accept=".pdf"   multiple
            style={{ display:'none' }} onChange={e => handleUpload(e.target.files)}/>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {[
          { label:'Total Files', val:media.length,  color:'blue',  icon:'Layers'   },
          { label:'Videos',      val:totalVideos,   color:'teal',  icon:'Video'    },
          { label:'PDFs',        val:totalPDFs,     color:'red',   icon:'FileText' },
          { label:'Categories',  val:3,             color:'amber', icon:'Layers'   },
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

      {/* Drag & drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          border:`2px dashed ${dragOver ? 'var(--brand)' : 'var(--border2)'}`,
          borderRadius:'var(--r3)', padding:'32px',
          textAlign:'center', marginBottom:24,
          background: dragOver ? 'var(--brand-dim)' : 'var(--bg2)',
          transition:'all 0.2s', cursor:'pointer',
        }}
        onClick={() => videoRef.current.click()}
      >
        {uploading ? (
          <div>
            <div className="spinner" style={{
              margin:'0 auto 12px', borderColor:'rgba(27,110,243,0.2)',
              borderTopColor:'var(--brand)', width:32, height:32, borderWidth:3,
            }}/>
            <div style={{ fontSize:14, fontWeight:600, color:'var(--brand)' }}>Uploading...</div>
          </div>
        ) : (
          <>
            <div style={{
              width:48, height:48, borderRadius:14, margin:'0 auto 14px',
              background: dragOver ? 'var(--brand)' : 'var(--bg4)',
              display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s',
            }}>
              <Icon name="Upload" size={20} color={dragOver ? '#fff' : 'var(--text3)'}/>
            </div>
            <div style={{ fontSize:15, fontWeight:700, color:'var(--text)', marginBottom:6 }}>
              {dragOver ? 'Drop to upload!' : 'Drag & drop files here'}
            </div>
            <div style={{ fontSize:12, color:'var(--text3)', marginBottom:10 }}>
              MP4, MOV, AVI · PDF supported
            </div>
            <div style={{ display:'flex', justifyContent:'center', gap:8 }}>
              <span className="chip"><Icon name="Video" size={10}/> Max 2GB/video</span>
              <span className="chip"><Icon name="FileText" size={10}/> Max 100MB/PDF</span>
            </div>
          </>
        )}
      </div>

      {/* Category tabs + type filter */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
        <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
          {['All', ...CATEGORIES].map(cat => (
            <button key={cat}
              className={`btn btn-sm ${category===cat?'btn-primary':'btn-ghost'}`}
              onClick={() => setCategory(cat)}
              style={{ fontSize:11 }}>
              {cat === 'All' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
        <div style={{ display:'flex', gap:6 }}>
          {[
            { key:'All',   label:'All Types' },
            { key:'video', label:'Videos',   icon:'Video'    },
            { key:'pdf',   label:'PDFs',     icon:'FileText' },
          ].map(t => (
            <button key={t.key}
              className={`btn btn-sm ${type===t.key?'btn-primary':'btn-ghost'}`}
              onClick={() => setType(t.key)}>
              {t.icon && <Icon name={t.icon} size={11}/>} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Media grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
        {filtered.length === 0 ? (
          <div className="card empty-state" style={{ gridColumn:'1/-1' }}>
            <div className="empty-icon">📁</div>
            <div>No files found</div>
          </div>
        ) : filtered.map(m => (
          <div key={m.id} style={{
            background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'var(--r3)', overflow:'hidden',
            boxShadow:'var(--shadow-sm)', transition:'all 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow='var(--shadow-md)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow='var(--shadow-sm)'}
          >
            {/* Thumbnail */}
            <div style={{
              height:120, cursor:'pointer',
              background: m.type==='video'
                ? 'linear-gradient(135deg, #0A0F1E, #1A2744)'
                : 'linear-gradient(135deg, #FEF2F2, #FFF5F5)',
              display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center', gap:8,
              position:'relative',
            }} onClick={() => setPreview(m)}>

              {/* Play overlay for video */}
              {m.type === 'video' && (
                <>
                  <div style={{ fontSize:32 }}>🚌</div>
                  <div style={{
                    position:'absolute', inset:0,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    opacity:0, transition:'opacity 0.2s',
                    background:'rgba(0,0,0,0.4)',
                  }} className="play-overlay">
                    <div style={{
                      width:44, height:44, borderRadius:'50%',
                      background:'rgba(255,255,255,0.2)',
                      border:'2px solid rgba(255,255,255,0.6)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                    }}>
                      <Icon name="Play" size={18} color="#fff" strokeWidth={2}/>
                    </div>
                  </div>
                  <div style={{
                    position:'absolute', bottom:8, right:8,
                    background:'rgba(0,0,0,0.6)', color:'#fff',
                    fontSize:10, fontFamily:'var(--font-mono)',
                    padding:'2px 7px', borderRadius:4,
                  }}>{m.dur}</div>
                  <div style={{
                    position:'absolute', top:8, left:8,
                    background:'rgba(0,0,0,0.5)', border:'1px solid rgba(255,255,255,0.1)',
                    color:'rgba(255,255,255,0.7)', fontSize:8, fontFamily:'var(--font-mono)',
                    padding:'2px 7px', borderRadius:4, display:'flex', alignItems:'center', gap:4,
                  }}>
                    <Icon name="Shield" size={8} color="rgba(255,255,255,0.6)"/> DRM
                  </div>
                </>
              )}

              {/* PDF icon */}
              {m.type === 'pdf' && (
                <>
                  <Icon name="FileText" size={36} color="var(--red)"/>
                  <div style={{ fontSize:10, color:'var(--red)', fontWeight:700 }}>PDF Document</div>
                </>
              )}
            </div>

            {/* File info */}
            <div style={{ padding:'12px 14px' }}>
              <div style={{ fontSize:12.5, fontWeight:700, color:'var(--text)', marginBottom:5, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                {m.name}
              </div>
              <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:10 }}>
                <span className="chip" style={{ fontSize:10 }}>
                  <Icon name="Layers" size={9}/> {m.category.split('—')[1]?.trim() || m.category}
                </span>
                <span className="chip" style={{ fontSize:10 }}>
                  <Icon name="Database" size={9}/> {m.size}
                </span>
              </div>

              {/* Description */}
              {editDesc === m.id ? (
                <div style={{ marginBottom:10 }}>
                  <textarea
                    className="form-input"
                    style={{ fontSize:11, minHeight:60 }}
                    defaultValue={m.desc}
                    onBlur={e => {
                      setMedia(prev => prev.map(x => x.id===m.id ? { ...x, desc:e.target.value } : x));
                      setEditDesc(null);
                    }}
                    autoFocus
                  />
                </div>
              ) : (
                <div style={{
                  fontSize:11, color:'var(--text3)', marginBottom:10, lineHeight:1.5,
                  minHeight:32, cursor:'pointer',
                }} onClick={() => setEditDesc(m.id)}>
                  {m.desc || <span style={{ fontStyle:'italic' }}>Click to add description...</span>}
                </div>
              )}

              {/* Actions */}
              <div style={{ display:'flex', gap:6 }}>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ flex:1 }}
                  onClick={() => setPreview(m)}>
                  <Icon name={m.type==='video'?'Play':'Eye'} size={11}/>
                  {m.type==='video' ? 'Preview' : 'View PDF'}
                </button>
                <button className="btn btn-ghost btn-sm"
                  onClick={() => setEditDesc(m.id)}>
                  <Icon name="Edit" size={11}/>
                </button>
                <button className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(m.id)}>
                  <Icon name="X" size={11}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
  );
}