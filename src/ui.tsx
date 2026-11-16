import React, {createContext, useContext} from 'react';
import {AbsoluteFill} from 'remotion';
import {Cam} from './camera';
import {clamp, ep, pop, prog} from './anim';
import {CAPS, H, Line, W} from './data';
import {fontFamily} from './fonts';

const CamCtx = createContext<Cam>({cx: 540, cy: 960, z: 1, r: 0, sx: 0, sy: 0});
export const useCam = () => useContext(CamCtx);
export const proj = (c: Cam, x: number, y: number) => ({x: 540 + c.sx + (x - c.cx) * c.z, y: 960 + c.sy + (y - c.cy) * c.z});

export const Stage: React.FC<{cam: Cam; world: React.ReactNode; ui?: React.ReactNode; vig?: number; tint?: string; tintA?: number; flash?: number; fade?: number}> = ({cam, world, ui, vig = 0.55, tint = '#000', tintA = 0, flash = 0, fade = 0}) => (
  <CamCtx.Provider value={cam}>
    <AbsoluteFill style={{background: '#05060f', fontFamily}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', left: 0, top: 0}}>
        <g transform={`translate(${540 + cam.sx},${960 + cam.sy}) rotate(${cam.r}) scale(${cam.z}) translate(${-cam.cx},${-cam.cy})`}>{world}</g>
        <defs>
          <radialGradient id="vg" cx="0.5" cy="0.5" r="0.75">
            <stop offset="0.55" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity={vig} />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#vg)" />
        {tintA > 0 && <rect width={W} height={H} fill={tint} opacity={tintA} />}
        {flash > 0 && <rect width={W} height={H} fill="#fff" opacity={flash} />}
      </svg>
      {ui}
      {fade > 0 && <AbsoluteFill style={{background: '#000', opacity: fade}} />}
    </AbsoluteFill>
  </CamCtx.Provider>
);

export const Bubble: React.FC<{line: Line; t: number; x: number; s?: number; fy?: number}> = ({line, t, x, s = 1.55, fy = 1500}) => {
  const cam = useCam();
  if (t < line.a || t > line.b + 0.2) return null;
  const hp = proj(cam, x, fy - 500 * s);
  const Wb = line.text.length > 45 ? 880 : line.text.length > 22 ? 700 : 560;
  const cx = clamp(hp.x, Wb / 2 + 30, W - Wb / 2 - 30);
  const ay = clamp(hp.y - 30, 430, 1640);
  const tx = clamp(hp.x - cx, -Wb / 2 + 70, Wb / 2 - 70);
  const words = line.text.split(' ');
  const n = Math.max(1, Math.ceil(words.length * prog(t, line.a, line.a + (line.b - line.a) * 0.8)));
  const p = pop(t, line.a, 0.28) * (1 - prog(t, line.b, line.b + 0.2));
  return (
    <div style={{position: 'absolute', left: cx - Wb / 2, bottom: H - ay, width: Wb, background: '#fff', border: '4px solid #222', borderRadius: 44, padding: '22px 30px', boxSizing: 'border-box', fontFamily, fontWeight: 700, fontSize: 54, lineHeight: 1.28, color: '#222', textAlign: 'center', transform: `scale(${p})`, transformOrigin: `${Wb / 2 + tx}px 100%`}}>
      <span>{words.slice(0, n).join(' ')}</span>
      <span style={{opacity: 0}}>{n < words.length ? ' ' + words.slice(n).join(' ') : ''}</span>
      <svg width={48} height={40} style={{position: 'absolute', left: Wb / 2 + tx - 24 - 4, bottom: -38, overflow: 'visible'}}>
        <path d="M2,0 L24,38 L46,0" fill="#fff" stroke="#222" strokeWidth={4} strokeLinejoin="round" />
        <rect x={6} y={-6} width={36} height={8} fill="#fff" />
      </svg>
    </div>
  );
};

export const Badge: React.FC<{text: string; color: string; x: number; t: number; a: number; b: number; s?: number; fy?: number}> = ({text, color, x, t, a, b, s = 1.55, fy = 1500}) => {
  const cam = useCam();
  const p = pop(t, a, 0.35) * (1 - prog(t, b - 0.2, b));
  if (p <= 0.01) return null;
  const hp = proj(cam, x, fy - 500 * s);
  return <div style={{position: 'absolute', left: clamp(hp.x, 150, W - 150), top: clamp(hp.y - 40, 260, 1700), transform: `translate(-50%,-100%) scale(${p})`, background: color, border: '4px solid #222', borderRadius: 60, padding: '4px 30px', fontFamily, fontWeight: 700, fontSize: 48, color: '#fff', textShadow: '0 2px 0 rgba(0,0,0,.35)', whiteSpace: 'nowrap'}}>{text}</div>;
};

export const Pill: React.FC<{text: string; t: number; a: number; b: number}> = ({text, t, a, b}) => {
  const p = ep(t, a, a + 0.5) * (1 - prog(t, b - 0.4, b));
  if (p <= 0.01) return null;
  return <div style={{position: 'absolute', top: 150 - (1 - p) * 90, left: '50%', transform: 'translateX(-50%)', opacity: p, background: 'rgba(15,18,50,.82)', color: '#fff', border: '3px solid #ffd166', borderRadius: 50, padding: '10px 36px', fontFamily, fontWeight: 700, fontSize: 40, whiteSpace: 'nowrap'}}>{text}</div>;
};

export const Stamp: React.FC<{text: string; x: number; y: number; t: number; a: number; b?: number; rot?: number; col?: string; size?: number}> = ({text, x, y, t, a, b = 1e9, rot = -6, col = '#c1121f', size = 78}) => {
  const p = pop(t, a, 0.35) * (1 - prog(t, b - 0.25, b));
  if (p <= 0.01) return null;
  const sh = t - a < 0.3 ? Math.sin((t - a) * 90) * 5 : 0;
  return <div style={{position: 'absolute', left: x + sh, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${p})`, background: col, color: '#fff', border: '8px solid #fff', outline: `6px solid ${col}`, borderRadius: 18, padding: '10px 40px', fontFamily, fontWeight: 700, fontSize: size, textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,.5)', whiteSpace: 'nowrap'}}>{text}</div>;
};

export const Captions: React.FC<{t: number}> = ({t}) => {
  const c = CAPS.find((q) => t >= q.a && t < q.b);
  if (!c) return null;
  const k = prog(t, c.a, c.a + 0.22), o = 1 - prog(t, c.b - 0.12, c.b);
  const parts = c.text.split('*');
  return (
    <div style={{position: 'absolute', left: 50, right: 50, bottom: 330, textAlign: 'center', fontFamily, fontWeight: 700, fontSize: 58, lineHeight: 1.2, color: '#fff', textShadow: '0 4px 0 #000, 0 0 22px rgba(0,0,0,.8), 3px 3px 0 #000, -3px -3px 0 #000', opacity: k * o, transform: `translateY(${(1 - k) * 28}px) scale(${0.94 + 0.06 * k})`}}>
      {parts.map((s, i) => <span key={i} style={i % 2 ? {color: '#FFD84D'} : undefined}>{s}</span>)}
    </div>
  );
};
