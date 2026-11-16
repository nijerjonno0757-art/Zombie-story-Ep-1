import React from 'react';
import {hsh, prog} from './anim';

export const Campus: React.FC<{t: number; lights?: 'on' | 'red' | 'off'; banner?: string}> = ({t, lights = 'on', banner = 'FRESHERS WELCOME'}) => {
  const stars = Array.from({length: 46}, (_, i) => ({x: -800 + hsh(i) * 4600, y: -300 + hsh(i + 50) * 1000, r: 1.5 + hsh(i + 9) * 2.5}));
  const col = ['#ffd166', '#ef476f', '#06d6a0', '#118ab2', '#f78c6b'];
  const bc = ['#ff5fa2', '#5fd1ff', '#fff27a', '#7dff9a', '#ff5fa2'];
  const lx = [1530, 1670, 1810, 1950, 2090];
  return (
    <g>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#070b26" /><stop offset="0.6" stopColor="#2a2262" /><stop offset="1" stopColor="#6a3f86" /></linearGradient>
        <linearGradient id="scr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d6249f" /><stop offset="1" stopColor="#285aeb" /></linearGradient>
      </defs>
      <rect x={-1600} y={-900} width={6000} height={2400} fill="url(#sky)" />
      {stars.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={0.45 + 0.45 * Math.sin(t * 2 + i)} />)}
      <circle cx={480} cy={260} r={100} fill="#f6f0d8" /><circle cx={450} cy={235} r={18} fill="#e2dbbd" /><circle cx={520} cy={290} r={12} fill="#e2dbbd" />
      {/* UIU building */}
      <rect x={-300} y={700} width={1650} height={800} fill="#1a2050" stroke="#0e1230" strokeWidth={4} />
      <rect x={200} y={560} width={720} height={150} fill="#222a60" stroke="#0e1230" strokeWidth={4} />
      {Array.from({length: 4 * 15}, (_, k) => { const c = k % 15, r = Math.floor(k / 15); return <rect key={k} x={-250 + c * 100} y={745 + r * 175} width={50} height={64} rx={4} fill={hsh(k * 3.1) > 0.4 ? '#ffd76a' : '#26306e'} opacity={0.9} />; })}
      <rect x={300} y={590} width={520} height={86} rx={10} fill="#0f1438" stroke="#ffb703" strokeWidth={4} />
      <text x={560} y={658} textAnchor="middle" fontSize={78} fontWeight={700} fill="#ffb703">UIU</text>
      <rect x={470} y={1330} width={190} height={170} fill="#0e1230" /><rect x={485} y={1345} width={75} height={155} fill="#ffe9a0" opacity={0.8} /><rect x={570} y={1345} width={75} height={155} fill="#ffe9a0" opacity={0.8} />
      <rect x={-1600} y={1440} width={6000} height={800} fill="#262b52" /><rect x={-1600} y={1440} width={6000} height={22} fill="#3a4078" />
      {[120, 1380].map((x) => <g key={x}><rect x={x - 6} y={1010} width={12} height={440} fill="#14172e" /><circle cx={x} cy={1000} r={60} fill="#ffe9a0" opacity={0.25} /><circle cx={x} cy={1000} r={20} fill="#fff6c8" /></g>)}
      <path d="M-100,900 Q675,1140 1450,900" fill="none" stroke="#111" strokeWidth={4} />
      {Array.from({length: 22}, (_, i) => { const u = i / 21; return <circle key={i} cx={-100 + 1550 * u} cy={900 + 2 * u * (1 - u) * 240} r={13} fill={col[i % 5]} opacity={0.6 + 0.4 * Math.sin(t * 4 + i)} />; })}
      {/* stage */}
      <rect x={1450} y={1240} width={700} height={230} fill="#2a2a44" stroke="#111" strokeWidth={4} /><rect x={1450} y={1240} width={700} height={16} fill="#5a5a8a" />
      <rect x={1520} y={780} width={560} height={420} fill="url(#scr)" stroke="#111" strokeWidth={5} />
      <text x={1800} y={1010} textAnchor="middle" fontSize={banner.length > 8 ? 76 : 110} fontWeight={700} fill="#fff">{banner}</text>
      <rect x={1460} y={712} width={680} height={26} fill="#444" />
      {lights !== 'off' && lx.map((x, i) => { const a = Math.sin(t * 1.3 + i * 1.7) * 0.5; const c = lights === 'red' ? '#ff2030' : bc[i]; const k = lights === 'red' ? 0.3 * (0.6 + 0.4 * Math.sin(t * 9 + i)) : 0.28; return <polygon key={i} points={`${x - 14},750 ${x + 14},750 ${x + 14 + Math.tan(a) * 750 + 170},1500 ${x - 14 + Math.tan(a) * 750 - 170},1500`} fill={c} opacity={k} />; })}
      {lx.map((x, i) => <circle key={i} cx={x} cy={750} r={17} fill={lights === 'off' ? '#333' : lights === 'red' ? '#ff2030' : bc[i]} stroke="#111" strokeWidth={3} />)}
      {/* backstage tent */}
      <path d="M2180,1500 L2180,1100 L2560,900 L2940,1100 L2940,1500 Z" fill="#2f3447" stroke="#111" strokeWidth={4} />
      <path d="M2370,1000 L2370,1500 M2750,1000 L2750,1500" stroke="#3d4560" strokeWidth={10} />
      <rect x={2480} y={1250} width={160} height={250} fill="#0b0d1a" /><rect x={2476} y={1244} width={168} height={12} fill="#555" />
      <rect x={2300} y={1180} width={120} height={50} rx={6} fill="#d63a3a" opacity={0.0} />
    </g>
  );
};

export const Hall: React.FC<{t: number; door: number; shift?: number; fl?: number; shadows?: boolean}> = ({t, door, shift = 0, fl = 1, shadows = false}) => (
  <g>
    <rect x={-1000} y={-600} width={4800} height={2200} fill="#3a3340" />
    <rect x={-1000} y={-600} width={4800} height={560} fill="#2a2430" />
    <rect x={-1000} y={1450} width={4800} height={900} fill="#2a2530" />
    {Array.from({length: 14}, (_, i) => <path key={i} d={`M${-1000 + i * 340},1450 L${-1300 + i * 520},2300`} stroke="#352f3b" strokeWidth={4} />)}
    <rect x={-1000} y={1430} width={4800} height={24} fill="#1d1922" />
    {/* ceiling lights */}
    {[700, 1500, 2300].map((x, i) => <g key={x}><rect x={x - 120} y={-20} width={240} height={26} rx={6} fill="#ddd" opacity={fl} /><polygon points={`${x - 120},6 ${x + 120},6 ${x + 330},1450 ${x - 330},1450`} fill="#ffe8b0" opacity={0.07 * fl} /></g>)}
    {/* door */}
    <rect x={276} y={836} width={308} height={664} fill="#1d1a22" stroke="#111" strokeWidth={6} />
    <rect x={290} y={850} width={280} height={650} fill="#7a2a2a" /><rect x={290} y={850} width={280} height={650} fill="#ff5030" opacity={0.18 + 0.1 * Math.sin(t * 10)} />
    {[0, 1, 2].map((i) => <ellipse key={i} cx={340 + i * 80 + Math.sin(t * 6 + i) * 20} cy={1250} rx={30} ry={110} fill="#2a0a0a" opacity={0.5 * (1 - door)} />)}
    <g transform={`translate(${shift},0)`}>
      <rect x={300} y={860} width={260 * door} height={640} fill="#8a5a3a" stroke="#222" strokeWidth={5} />
      {door > 0.5 && <g><rect x={340} y={940} width={180} height={150} rx={8} fill="#c98a6a" stroke="#222" strokeWidth={4} />{shadows && [0, 1, 2].map((i) => <ellipse key={i} cx={380 + i * 55 + Math.sin(t * 9 + i * 2) * 12} cy={1040 + Math.sin(t * 7 + i) * 8} rx={24} ry={42} fill="#2a0a0a" opacity={0.75} />)}<circle cx={300 + 260 * door - 30} cy={1230} r={13} fill="#d4af37" stroke="#222" strokeWidth={3} /></g>}
    </g>
    {/* furniture */}
    <rect x={1250} y={800} width={320} height={220} rx={10} fill="#6b4f3a" stroke="#222" strokeWidth={5} /><rect x={1275} y={825} width={270} height={170} fill="#d8cdb8" /><path d="M1295,860 L1480,860 M1295,900 L1520,900 M1295,940 L1440,940" stroke="#8a8068" strokeWidth={6} />
    <circle cx={1900} cy={760} r={80} fill="#eee" stroke="#222" strokeWidth={6} /><path d="M1900,760 L1900,710 M1900,760 L1940,780" stroke="#222" strokeWidth={6} strokeLinecap="round" />
    <rect x={1700} y={1330} width={480} height={26} rx={8} fill="#6b4f3a" stroke="#222" strokeWidth={4} /><rect x={1730} y={1356} width={20} height={94} fill="#6b4f3a" /><rect x={2130} y={1356} width={20} height={94} fill="#6b4f3a" />
  </g>
);

export const Corridor: React.FC<{t: number; fl: number}> = ({t, fl}) => {
  const fr = (k: number) => ({l: 1200 - 1200 * k, r: 1200 + 1200 * k, t: 820 - 820 * k, b: 820 + 1100 * k});
  const F = fr(0.1);
  const wallQ = (side: -1 | 1, k1: number, k2: number) => {
    const A = fr(k1), B = fr(k2), x = (q: ReturnType<typeof fr>) => (side < 0 ? q.l : q.r);
    const top = (q: ReturnType<typeof fr>) => q.b - (q.b - q.t) * 0.62;
    return `${x(A)},${top(A)} ${x(B)},${top(B)} ${x(B)},${B.b} ${x(A)},${A.b}`;
  };
  return (
    <g>
      <rect x={-600} y={-400} width={3600} height={2800} fill="#05060c" />
      <polygon points={`0,0 2400,0 ${F.r},${F.t} ${F.l},${F.t}`} fill="#10131f" />
      <polygon points={`0,1920 2400,1920 ${F.r},${F.b} ${F.l},${F.b}`} fill="#171c2c" />
      <polygon points={`0,0 0,1920 ${F.l},${F.b} ${F.l},${F.t}`} fill="#1b2136" />
      <polygon points={`2400,0 2400,1920 ${F.r},${F.b} ${F.r},${F.t}`} fill="#171b2e" />
      <rect x={F.l} y={F.t} width={F.r - F.l} height={F.b - F.t} fill="#04050a" />
      <rect x={1180} y={F.t + 6} width={40} height={14} fill="#2fe08a" opacity={0.5 + 0.5 * Math.sin(t * 5)} />
      {[0.9, 0.7, 0.52, 0.38, 0.27].map((k) => <line key={k} x1={fr(k).l} y1={fr(k).b} x2={fr(k).r} y2={fr(k).b} stroke="#0d101c" strokeWidth={6 * k + 1} />)}
      {([[-1, 0.92, 0.72], [-1, 0.62, 0.46], [-1, 0.38, 0.28], [1, 0.84, 0.66], [1, 0.56, 0.42], [1, 0.34, 0.25]] as [-1 | 1, number, number][]).map(([sd, a, b], i) => <polygon key={i} points={wallQ(sd, a, b)} fill="#232a44" stroke="#0a0d18" strokeWidth={4} />)}
      {[0.72, 0.5, 0.32].map((k, i) => { const q = fr(k), f = fl * (i === 1 ? (Math.sin(t * 31) > 0.2 ? 1 : 0.15) : 1); return <g key={k}><rect x={1200 - 190 * k} y={q.t + 4} width={380 * k} height={22 * k + 4} fill="#e8f2ff" opacity={f} /><ellipse cx={1200} cy={q.b} rx={560 * k} ry={70 * k} fill="#cfe4ff" opacity={0.1 * f} /></g>; })}
    </g>
  );
};
