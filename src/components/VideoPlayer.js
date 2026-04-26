import React, { useState, useEffect, useRef } from 'react';
import Icon from './Icons';

export default function VideoPlayer({ title = 'Training Video', initialPct = 0 }) {
  const [playing, setPlaying] = useState(false);
  const [pct, setPct]         = useState(initialPct);
  const intervalRef           = useRef(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setPct(p => {
          if (p >= 100) { setPlaying(false); return 100; }
          return p + 0.5;
        });
      }, 300);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  const totalSec  = 18 * 60;
  const elapsed   = Math.floor((pct / 100) * totalSec);
  const remaining = totalSec - elapsed;
  const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  return (
    <div className="video-player">
      <div className="video-bg" onClick={() => setPlaying(p => !p)}>
        <div className="drm-badge">
          <Icon name="Shield" size={9} color="rgba(255,255,255,0.6)" /> HLS/DASH · Widevine DRM
        </div>

        <div className="video-bus">🚌</div>

        <div className="video-play-btn">
          {playing
            ? <Icon name="Pause" size={22} color="#fff" strokeWidth={2} />
            : <Icon name="Play"  size={22} color="#fff" strokeWidth={2} />
          }
        </div>

        <div className="video-title">{title}</div>
      </div>

      <div className="video-controls">
        <button className="vc-btn" onClick={() => setPlaying(p => !p)}>
          {playing
            ? <Icon name="Pause"  size={14} color="rgba(255,255,255,0.8)" />
            : <Icon name="Play"   size={14} color="rgba(255,255,255,0.8)" />
          }
        </button>

        <span className="vc-time">{fmt(elapsed)}</span>

        <div className="vc-prog">
          <div className="vc-fill" style={{ width: `${pct}%` }} />
        </div>

        <span className="vc-time">−{fmt(remaining)}</span>

        <button className="vc-btn" title="Volume">
          <Icon name="Volume"   size={14} color="rgba(255,255,255,0.6)" />
        </button>
        <button className="vc-btn" title="Fullscreen">
          <Icon name="Maximize" size={14} color="rgba(255,255,255,0.6)" />
        </button>
      </div>
      </div>
  );
}