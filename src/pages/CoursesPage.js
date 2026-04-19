import React from 'react';
import { COURSES } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import Icon from '../components/Icons';

export default function CoursesPage() {
  return (
    <div className="fade-in">

      {/* Header */}
      <div className="flex items-center justify-between mb24">
        <div>
          <div style={{ fontFamily:'var(--font-head)', fontSize:15, fontWeight:800, color:'var(--text)' }}>
            {COURSES.length} courses
          </div>
          <div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>
            Manage and publish training content
          </div>
        </div>
        <div className="flex items-center gap8">
          <button className="btn btn-ghost btn-sm">
            <Icon name="Filter" size={12}/> Filter
          </button>
          <button className="btn btn-primary">
            <Icon name="Plus" size={14}/> New Course
          </button>
        </div>
      </div>

      {/* Summary row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {[
          { label:'Total Courses',   val: COURSES.length,                                   color:'blue',  icon:'Book'    },
          { label:'Published',       val: COURSES.filter(c=>c.status==='Published').length, color:'green', icon:'Zap'     },
          { label:'Draft',           val: COURSES.filter(c=>c.status==='Draft').length,     color:'amber', icon:'Edit'    },
          { label:'Total Enrolled',  val: COURSES.reduce((a,c)=>a+c.enrolled,0),            color:'teal',  icon:'Users'   },
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

      {/* Course cards */}
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {COURSES.map(c => {
          const isPublished = c.status === 'Published';
          return (
            <div key={c.id} className={`card ${isPublished ? 'card-accent-blue' : 'card-accent-amber'}`}
              style={{ display:'flex', alignItems:'center', gap:20 }}>

              {/* Icon block */}
              <div style={{
                width:48, height:48, borderRadius:12, flexShrink:0,
                background: isPublished ? 'var(--blue-dim)' : 'var(--amber-dim)',
                display:'flex', alignItems:'center', justifyContent:'center',
                border:`1.5px solid ${isPublished ? 'rgba(29,111,242,0.2)' : 'rgba(245,158,11,0.2)'}`
              }}>
                <Icon name="Book" size={20} color={isPublished ? 'var(--blue)' : 'var(--amber)'} />
              </div>

              {/* Main info */}
              <div style={{ flex:1 }}>
                <div className="flex items-center gap8 mb8">
                  <span style={{ fontFamily:'var(--font-head)', fontSize:15, fontWeight:800, color:'var(--text)' }}>
                    {c.title}
                  </span>
                  <StatusBadge status={c.status} />
                </div>
                <div className="flex items-center gap8" style={{ flexWrap:'wrap' }}>
                  <span className="chip"><Icon name="Layers"  size={10}/> {c.type}</span>
                  <span className="chip"><Icon name="Clock"   size={10}/> {c.dur}</span>
                  <span className="chip"><Icon name="Book"    size={10}/> {c.mods} modules</span>
                  <span className="chip"><Icon name="Users"   size={10}/> {c.enrolled} enrolled</span>
                </div>
              </div>

              {/* Enrolled stat */}
              <div style={{ textAlign:'center', padding:'0 20px', borderLeft:'1px solid var(--border)' }}>
                <div style={{
                  fontFamily:'var(--font-head)', fontSize:26, fontWeight:800,
                  color: isPublished ? 'var(--blue)' : 'var(--amber)'
                }}>{c.enrolled}</div>
                <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600 }}>Enrolled</div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap8" style={{ flexShrink:0 }}>
                <button className="btn btn-ghost btn-sm">
                  <Icon name="Edit" size={12}/> Edit
                </button>
                {!isPublished && (
                  <button className="btn btn-primary btn-sm">
                    <Icon name="Zap" size={12}/> Publish
                  </button>
                )}
                {isPublished && (
                  <button className="btn btn-ghost btn-sm">
                    <Icon name="Analytics" size={12}/> Analytics
                  </button>
                )}
                <button className="btn btn-ghost btn-sm">
                  <Icon name="ExternalLink" size={12}/>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}