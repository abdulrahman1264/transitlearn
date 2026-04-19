import React from 'react';

export default function MiniBarChart({ data = [], color = 'var(--blue)' }) {
  const max = Math.max(...data, 1);
  return (
    <div className="mini-chart">
      {data.map((v, i) => {
        const isLast = i === data.length - 1;
        const h = Math.max(4, (v / max) * 60);
        return (
          <div key={i} className="bar" style={{
            height: h,
            background: isLast ? color : color.replace(')', ', 0.3)').replace('var(', 'rgba(').replace('--blue', '29,111,242'),
            opacity: isLast ? 1 : 0.35,
            backgroundColor: isLast ? color : undefined,
          }} title={`${v}`} />
        );
      })}
    </div>
  );
}