import React, { useState, useRef } from 'react';
import Icon from '../components/Icons';

const CATEGORIES = [
  'Public Bus — Pre Service',
  'Public Bus — In Service',
  'School Bus Training',
];

const INITIAL_MEDIA = [
  { id:1, name:'intro_safety_brief.mp4',        type:'video', size:'245 MB', category:'Public Bus — Pre Service', uploaded:'2025-04-10', status:'Active', dur:'12 min' },
  { id:2, name:'wet_weather_techniques.mp4',     type:'video', size:'312 MB', category:'Public Bus — Pre Service', uploaded:'2025-04-10', status:'Active', dur:'18 min' },
  { id:3, name:'defensive_driving_guide.pdf',    type:'pdf',   size:'4.2 MB', category:'Public Bus — In Service',  uploaded:'2025-04-08', status:'Active', dur:'15 min read' },
  { id:4, name:'child_safety_procedures.pdf',    type:'pdf',   size:'2.8 MB', category:'School Bus Training',      uploaded:'2025-04-05', status:'Active', dur:'10 min read' },
  { id:5, name:'emergency_procedures.mp4',       type:'video', size:'198 MB', category:'Public Bus — In Service',  uploaded:'2025-04-03', status:'Active', dur:'22 min' },
];

export default function MediaUploadPage() {
  const [media,    setMedia]    = useState(INITIAL_MEDIA);
  const [category, setCategory] = useState('All');
  const [type,     setType]     = useState('All');
  const [toast,    setToast]    = useState('');
  const [uploading,setUploading]= useState(false);
  const [dragOver, setDragOver] = useState(false);
  const videoRef = useRef();
  const pdfRef   = useRef();

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(''),3000); };

  const handleUpload = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    await new Promise(r => setTimeout(r, 1500));
    const newFiles = Array.from(files).map((f,i) => ({
      id:        Date.now() + i,
      name:      f.name,
      type:      f.type.includes('pdf') ? 'pdf' : 'video',
      size:      f.size > 1024*1024
        ? `${(f.size/1024/1024).toFixed(1)} MB`
        : `${Math.round(f.size/1024)} KB`,
      category:  category === 'All' ? CATEGORIES[0] : category,
      uploaded:  new Date().toISOString().slice(0,10),
      status:    'Active',
      dur:       f.type.includes('pdf') ? 'PDF Document' : 'Video',
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
    setMedia(prev => prev.filter(m => m.id !== id));
    showToast('✅ File removed');
  };

  const filtered = media.filter(m => {
    const matchCat  = category === 'All' || m.category === category;
    const matchType = type === 'All' || m.type === type;
    return matchCat && matchType;
  });

  const totalVideos = media.filter(m=>m.type==='video').length;
  const totalPDFs   = media.filter(m=>m.type==='pdf').length;
  const totalSize   = media.length * 87; // mock MB

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
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-0.4px' }}>
            Media Upload
          </div>
          <div style={{ fontSize:13, color:'var(--text3)', marginTop:2 }}>
            Upload videos and PDFs for your training courses
          </div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button className="btn btn-ghost btn-sm"
            onClick={() => pdfRef.current.click()}>
            <Icon name="FileText" size={13}/> Upload PDF
          </button>
          <button className="btn btn-primary"
            onClick={() => videoRef.current.click()}>
            <Icon name="Upload" size={13}/> Upload Video
          </button>
          <input ref={videoRef} type="file" accept="video/*" multiple
            style={{ display:'none' }} onChange={e=>handleUpload(e.target.files)}/>
          <input ref={pdfRef}   type="file" accept=".pdf"   multiple
            style={{ display:'none' }} onChange={e=>handleUpload(e.target.files)}/>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {[
          { label:'Total Files',   val:media.length,  color:'blue',  icon:'Layers'    },
          { label:'Videos',        val:totalVideos,   color:'teal',  icon:'Video'     },
          { label:'PDFs',          val:totalPDFs,     color:'red',   icon:'FileText'  },
          { label:'Storage Used',  val:`${totalSize}MB`, color:'amber', icon:'Database'},
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

      {/* Drag & Drop zone */}
      <div
        onDragOver={e=>{ e.preventDefault(); setDragOver(true); }}
        onDragLeave={()=>setDragOver(false)}
        onDrop={handleDrop}
        style={{
          border:`2px dashed ${dragOver ? 'var(--brand)' : 'var(--border2)'}`,
          borderRadius:'var(--r3)', padding:'36px',
          textAlign:'center', marginBottom:24,
          background: dragOver ? 'var(--brand-dim)' : 'var(--bg2)',
          transition:'all 0.2s', cursor:'pointer',
        }}
        onClick={() => videoRef.current.click()}
      >
        {uploading ? (
          <div>
            <div className="spinner" style={{
              margin:'0 auto 12px',
              borderColor:'rgba(27,110,243,0.2)',
              borderTopColor:'var(--brand)',
              width:32, height:32, borderWidth:3,
            }}/>
            <div style={{ fontSize:14, fontWeight:600, color:'var(--brand)' }}>
              Uploading files...
            </div>
          </div>
        ) : (
          <div>
            <div style={{
              width:52, height:52, borderRadius:16,
              background: dragOver ? 'var(--brand)' : 'var(--bg4)',
              display:'flex', alignItems:'center', justifyContent:'center',
              margin:'0 auto 14px', transition:'all 0.2s',
            }}>
              <Icon
                name="Upload" size={22}
                color={dragOver ? '#fff' : 'var(--text3)'}
              />
            </div>
            <div style={{ fontSize:15, fontWeight:700, color:'var(--text)', marginBottom:6 }}>
              {dragOver ? 'Drop files here!' : 'Drag & drop files here'}
            </div>
            <div style={{ fontSize:13, color:'var(--text3)', marginBottom:10 }}>
              or click to browse — MP4, MOV, AVI, PDF supported
            </div>
            <div style={{ display:'flex', justifyContent:'center', gap:8 }}>
              <span className="chip"><Icon name="Video" size={10}/> Max 2GB per video</span>
              <span className="chip"><Icon name="FileText" size={10}/> Max 100MB per PDF</span>
            </div>
          </div>
        )}
      </div>

      {/* Category tabs */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
        <div style={{ display:'flex', gap:6 }}>
          {['All', ...CATEGORIES].map(cat => (
            <button key={cat}
              className={`btn btn-sm ${category===cat?'btn-primary':'btn-ghost'}`}
              onClick={() => setCategory(cat)}
              style={{ fontSize:11 }}>
              {cat === 'All' ? 'All Files' : cat}
            </button>
          ))}
        </div>
        <div style={{ display:'flex', gap:6 }}>
          {['All','video','pdf'].map(t => (
            <button key={t}
              className={`btn btn-sm ${type===t?'btn-primary':'btn-ghost'}`}
              onClick={() => setType(t)}>
              {t === 'All'   ? 'All Types' :
               t === 'video' ? <><Icon name="Video"    size={11}/> Videos</> :
                               <><Icon name="FileText" size={11}/> PDFs</>
              }
            </button>
          ))}
        </div>
      </div>

      {/* Media table */}
      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>File</th>
              <th>Type</th>
              <th>Category</th>
              <th>Size</th>
              <th>Duration</th>
              <th>Uploaded</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="empty-state">
                    <div className="empty-icon">📁</div>
                    <div>No files uploaded yet</div>
                  </div>
                </td>
              </tr>
            ) : filtered.map(m => (
              <tr key={m.id}>
                <td>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{
                      width:36, height:36, borderRadius:8, flexShrink:0,
                      background: m.type==='video' ? 'var(--teal-dim)' : 'var(--red-dim)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      border:`1px solid ${m.type==='video'?'rgba(8,145,178,0.2)':'rgba(220,38,38,0.2)'}`,
                    }}>
                      <Icon
                        name={m.type==='video' ? 'Video' : 'FileText'}
                        size={15}
                        color={m.type==='video' ? 'var(--teal)' : 'var(--red)'}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:'var(--text)', maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {m.name}
                      </div>
                      <div style={{ fontSize:10, color:'var(--text3)', fontFamily:'var(--font-mono)' }}>
                        {m.size}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${m.type==='video'?'badge-teal':'badge-red'}`}>
                    <Icon name={m.type==='video'?'Video':'FileText'} size={9} strokeWidth={2.5}/>
                    {m.type === 'video' ? 'Video' : 'PDF'}
                  </span>
                </td>
                <td>
                  <span className="chip" style={{ fontSize:10 }}>
                    <Icon name="Layers" size={9}/> {m.category}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize:12, fontFamily:'var(--font-mono)', color:'var(--text2)' }}>
                    {m.size}
                  </span>
                </td>
                <td>
                  <span className="chip" style={{ fontSize:10 }}>
                    <Icon name="Clock" size={9}/> {m.dur}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize:12, fontFamily:'var(--font-mono)', color:'var(--text3)' }}>
                    {m.uploaded}
                  </span>
                </td>
                <td>
                  <div style={{ display:'flex', gap:6 }}>
                    <button className="btn btn-ghost btn-sm">
                      <Icon name="Eye" size={11}/>
                    </button>
                    <button className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(m.id)}>
                      <Icon name="X" size={11}/>
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