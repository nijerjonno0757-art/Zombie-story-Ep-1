import React from 'react';
import {sw} from './Character';
import {hsh, pop, prog} from './anim';

const ICON: Record<string, React.ReactNode> = {
  momo: <g><path d="M-50,18 Q-52,-38 0,-44 Q52,-38 50,18 Q0,36 -50,18Z" fill="#FFF3DC" {...sw} /><path d="M-30,-30 Q-26,-6 -22,16 M-10,-40 L-8,22 M12,-40 Q10,-6 8,22 M32,-30 Q28,-6 24,16" fill="none" stroke="#c9a46a" strokeWidth={3} /><path d="M-20,-58 Q-10,-70 -20,-84 M10,-58 Q20,-70 10,-84" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" opacity={0.7} /></g>,
  q: <g><circle r={46} fill="#FFD84D" {...sw} /><text y={24} textAnchor="middle" fontSize={70} fontWeight={700} fill="#222">?</text></g>,
  ex: <g><circle r={46} fill="#e63946" {...sw} /><text y={24} textAnchor="middle" fontSize={70} fontWeight={700} fill="#fff">!</text></g>,
  warn: <g><path d="M0,-52 L52,38 L-52,38 Z" fill="#FFD84D" {...sw} /><text y={28} textAnchor="middle" fontSize={56} fontWeight={700} fill="#222">!</text></g>,
  note: <g><ellipse cx={-10} cy={28} rx={20} ry={14} fill="#ff7ac6" {...sw} /><path d="M8,28 L8,-44 Q34,-34 30,-8" fill="none" stroke="#222" strokeWidth={6} strokeLinecap="round" /></g>,
  heart: <g><path d="M0,34 C-62,-8 -42,-52 0,-22 C42,-52 62,-8 0,34Z" fill="#e63946" {...sw} /><path d="M2,-22 L-10,0 L6,10 L-6,30" fill="none" stroke="#fff" strokeWidth={5} /></g>,
  splat: <g fill="#a4161a"><path d="M0,-40 L14,-18 L40,-26 L28,-2 L46,18 L20,18 L10,42 L-4,20 L-30,34 L-22,8 L-46,-6 L-20,-14 L-30,-38 Z" /><circle cx={56} cy={-30} r={7} /><circle cx={-54} cy={30} r={6} /></g>,
  lock: <g><path d="M-22,-8 L-22,-30 Q0,-56 22,-30 L22,-8" fill="none" stroke="#222" strokeWidth={8} /><rect x={-34} y={-10} width={68} height={52} rx={10} fill="#ffcc00" {...sw} /><circle cy={14} r={7} fill="#222" /></g>,
};

export const Icon: React.FC<{k: string; x: number; y: number; s?: number; t: number; at: number; until?: number; float?: boolean; rot?: number}> = ({k, x, y, s = 1, t, at, until = 1e9, float = true, rot = 0}) => {
  const sc = pop(t, at) * (1 - prog(t, until - 0.25, until)) * s;
  if (sc <= 0.01) return null;
  return <g transform={`translate(${x},${y + (float ? Math.sin((t - at) * 3) * 8 : 0)}) rotate(${rot}) scale(${sc})`}>{ICON[k]}</g>;
};

export const Notes: React.FC<{t: number; x?: number; y?: number}> = ({t, x = 1800, y = 760}) => (
  <g>{[0, 1, 2, 3].map((i) => {
    const p = (t * 0.35 + i / 4) % 1;
    return <g key={i} opacity={Math.sin(p * Math.PI)} transform={`translate(${x - 200 + i * 150 + Math.sin(p * 6 + i) * 30},${y - p * 520}) scale(.8) rotate(${Math.sin(p * 5) * 14})`}>{ICON.note}</g>;
  })}</g>
);

export const Packet: React.FC<{s?: number}> = ({s = 1}) => (
  <g transform={`translate(0,8) scale(${s})`}>
    <path d="M-14,-6 Q0,-36 14,-6" fill="none" stroke="#222" strokeWidth={4} />
    <ellipse cx={-14} cy={4} rx={13} ry={10} fill="#FFF3DC" {...sw} /><ellipse cx={12} cy={2} rx={13} ry={10} fill="#FFF3DC" {...sw} />
    <path d="M-36,4 L36,4 L28,52 L-28,52 Z" fill="#e8433b" {...sw} /><path d="M-30,24 L30,24" stroke="#fff" strokeWidth={5} />
  </g>
);

type EP = {x: number; y: number; s?: number; c: string; hair?: string; skin?: string; mode?: 'stand' | 'cheer' | 'run' | 'panic'; t: number; seed?: number; rot?: number; dy?: number; op?: number};
export const Extra: React.FC<EP> = ({x, y, s = 1, c, hair = '#2a2a2a', skin = '#e2b48c', mode = 'stand', t, seed = 0, rot = 0, dy = 0, op = 1}) => {
  const ph = t * (mode === 'run' ? 10 : mode === 'cheer' ? 6 : 2) + seed * 2.3;
  const arm = (sg: number) => (mode === 'cheer' ? 150 + 25 * Math.sin(ph + sg) : mode === 'run' ? 60 + 40 * Math.sin(ph + (sg > 0 ? 0 : Math.PI)) : mode === 'panic' ? 160 + 10 * Math.sin(ph * 3) : 8 + 3 * Math.sin(ph));
  const hop = mode === 'cheer' ? -Math.abs(Math.sin(ph)) * 18 : mode === 'run' ? -Math.abs(Math.sin(ph)) * 12 : 0;
  const lg = mode === 'run' ? Math.sin(ph) * 26 : 0;
  return (
    <g opacity={op} transform={`translate(${x},${y + dy + hop}) scale(${s}) rotate(${rot},0,-130)`}>
      <g transform={`rotate(${lg},-18,-115)`}><rect x={-30} y={-115} width={24} height={112} rx={12} fill="#2b2f45" {...sw} /></g>
      <g transform={`rotate(${-lg},18,-115)`}><rect x={6} y={-115} width={24} height={112} rx={12} fill="#2b2f45" {...sw} /></g>
      {[1, -1].map((sg) => <g key={sg} transform={`translate(${sg * 44},-232) rotate(${-sg * arm(sg)})`}><rect x={-11} y={-6} width={22} height={96} rx={11} fill={skin} {...sw} /></g>)}
      <rect x={-42} y={-250} width={84} height={140} rx={34} fill={c} {...sw} />
      <circle cx={0} cy={-290} r={36} fill={skin} {...sw} />
      <path d="M-36,-292 A36,36 0 0 1 36,-292 Q0,-318 -36,-292 Z" fill={hair} {...sw} />
      <circle cx={-13} cy={-286} r={3.5} fill="#222" /><circle cx={13} cy={-286} r={3.5} fill="#222" />
      {mode === 'cheer' || mode === 'panic' ? <ellipse cx={0} cy={-270} rx={9} ry={mode === 'panic' ? 11 : 7} fill="#6b1d1d" {...sw} /> : <path d="M-9,-270 L9,-270" stroke="#222" strokeWidth={3} />}
    </g>
  );
};

const PAL = ['#e76f51', '#2a9d8f', '#e9c46a', '#9b5de5', '#f15bb5', '#4cc9f0', '#90be6d', '#f8961e'];
const SK = ['#e2b48c', '#c68642', '#f1c27d', '#8d5524'];
export const Crowd: React.FC<{t: number; mode: 'stand' | 'cheer' | 'run' | 'panic'; lo: number; hi: number; n: number; y0?: number; y1?: number; sc?: number; flee?: number; seed?: number}> = ({t, mode, lo, hi, n, y0 = 1385, y1 = 1470, sc = 0.95, flee, seed = 0}) => (
  <g>{Array.from({length: n}, (_, i) => ({i, y: y0 + hsh(i + 7 + seed) * (y1 - y0)})).sort((a, b) => a.y - b.y).map(({i, y}) => {
    const x0 = lo + ((hi - lo) * i) / n + hsh(i + seed) * 70;
    const fl = flee !== undefined && t > flee;
    const x = fl ? x0 - (t - flee) * (200 + hsh(i) * 120) : x0;
    return <Extra key={i} x={x} y={y} s={sc * (0.85 + (y - y0) / (y1 - y0 + 1) * 0.3)} c={PAL[i % 8]} skin={SK[i % 4]} hair={i % 3 ? '#1b1b1b' : '#5a3a22'} mode={fl ? 'run' : mode} t={t} seed={i + seed} />;
  })}</g>
);

export const Ambulance: React.FC<{x: number; y: number; t: number; pitch?: number}> = ({x, y, t, pitch = 0}) => {
  const a = Math.sin(t * 14) > 0;
  return (
    <g transform={`translate(${x},${y}) rotate(${pitch},0,0)`}>
      <ellipse cx={0} cy={4} rx={230} ry={16} fill="#000" opacity={0.35} />
      <rect x={-130} y={-250} width={330} height={210} rx={18} fill="#f4f6fa" {...sw} />
      <path d="M-130,-190 L-130,-40 L-230,-40 L-230,-130 Q-228,-150 -205,-156 L-170,-190 Z" fill="#f4f6fa" {...sw} />
      <path d="M-196,-150 L-168,-182 L-138,-182 L-138,-150 Z" fill="#9ad7ff" {...sw} />
      <rect x={-130} y={-120} width={330} height={26} fill="#e63946" {...sw} />
      <rect x={30} y={-228} width={70} height={20} fill="#e63946" /><rect x={55} y={-253} width={20} height={70} fill="#e63946" />
      <rect x={-210} y={-272} width={44} height={20} rx={6} fill={a ? '#ff2a3a' : '#7a1a22'} {...sw} /><rect x={-160} y={-272} width={44} height={20} rx={6} fill={a ? '#1a2a7a' : '#3a7aff'} {...sw} />
      <circle cx={a ? -188 : -138} cy={-262} r={80} fill={a ? '#ff2a3a' : '#3a7aff'} opacity={0.22} />
      <circle cx={-150} cy={-30} r={40} fill="#2b2b2b" {...sw} /><circle cx={120} cy={-30} r={40} fill="#2b2b2b" {...sw} /><circle cx={-150} cy={-30} r={16} fill="#aaa" /><circle cx={120} cy={-30} r={16} fill="#aaa" />
      <path d="M200,-240 L200,-50" stroke="#222" strokeWidth={3} />
    </g>
  );
};

export const Stretcher: React.FC<{x1: number; x2: number; y: number; t: number; op?: number}> = ({x1, x2, y, t, op = 1}) => (
  <g opacity={op}>
    <rect x={x1 - 14} y={y - 8} width={x2 - x1 + 28} height={16} rx={8} fill="#8a8f99" {...sw} />
    <g transform={`translate(${Math.sin(t * 61) * 2.5},${Math.cos(t * 73) * 1.5})`}>
      <rect x={x1 + 40} y={y - 48} width={x2 - x1 - 60} height={42} rx={21} fill="#e9eef3" {...sw} />
      <circle cx={x1 + 52} cy={y - 54} r={32} fill="#9db89a" {...sw} />
      <path d={`M${x1 + 40},${y - 60} l12,3 M${x1 + 62},${y - 60} l12,-3`} stroke="#222" strokeWidth={3} />
      <g transform={`translate(${(x1 + x2) / 2},${y - 6}) rotate(${Math.sin(t * 50) * 9})`}>
        <rect x={-10} y={0} width={20} height={76} rx={10} fill="#9db89a" {...sw} /><circle cy={80} r={14} fill="#9db89a" {...sw} />
      </g>
    </g>
  </g>
);
