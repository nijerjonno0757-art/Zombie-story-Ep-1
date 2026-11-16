import React from 'react';
import {hsh} from './anim';

export type Mood = 'neutral' | 'happy' | 'grin' | 'sad' | 'scared' | 'angry' | 'shock' | 'smug' | 'zombie';
export type Look = {
  name: string; skin: string; hair: string;
  style: 'long' | 'curly' | 'hijab' | 'cap' | 'messy';
  kind: 'kurti' | 'tee' | 'hoodie' | 'uniform' | 'torn' | 'jacket';
  top: string; bottom: string; shoe?: string; hijab?: string; cap?: string;
  glasses?: boolean; mustache?: boolean; bag?: boolean; blood?: boolean;
  nameplate?: boolean; idcard?: boolean; long?: boolean; build?: number;
  eye?: string; pupil?: string; rings?: boolean;
};
/** [upperArm, elbow] degrees. aL = screen-left arm, aR = screen-right arm. upper + = raise outward, elbow + = bend inward */
export type Pose = {aL?: [number, number]; aR?: [number, number]};
export type CharProps = {
  look: Look; x: number; y: number; s?: number; flip?: boolean; t: number; mood?: Mood; talk?: boolean;
  gaze?: [number, number]; pose?: Pose; gait?: 0 | 1 | 2; tremble?: number;
  hold?: React.ReactNode; holdL?: React.ReactNode; opacity?: number; lean?: number; tilt?: number;
  dy?: number; seed?: number; tears?: boolean; gest?: boolean; rot?: number;
};

const INK = '#222222';
export const sw: any = {stroke: INK, strokeWidth: 2.5, vectorEffect: 'non-scaling-stroke', strokeLinejoin: 'round', strokeLinecap: 'round'};
export const shade = (c: string, k: number) => {
  const n = parseInt(c.slice(1), 16);
  const f = (v: number) => Math.max(0, Math.min(255, Math.round(v * k)));
  return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`;
};

// [innerDy, outerDy, baseDy, leftExtra, rightExtra]
const BROW: Record<Mood, number[]> = {
  neutral: [0, 0, 0, 0, 0], happy: [-3, -2, -4, 0, 0], grin: [-4, -3, -5, 0, 0], sad: [-9, 4, 0, 0, 0],
  scared: [-11, -5, -8, 0, 0], angry: [9, -4, 0, 0, 0], shock: [-13, -13, -10, 0, 0],
  smug: [-2, -2, -3, -8, 3], zombie: [8, -3, 2, 0, 0],
};
const CURL: [number, number, number][] = [[-70, -440, 30], [-78, -408, 26], [-62, -482, 30], [-30, -506, 32], [8, -512, 32], [44, -502, 32], [72, -472, 30], [80, -436, 28], [84, -404, 24], [-76, -378, 22], [78, -378, 22]];

const Arm = ({side, a, sleeve, fore, skin, children}: {side: 'L' | 'R'; a: [number, number]; sleeve: string; fore: string; skin: string; children?: React.ReactNode}) => {
  const sg = side === 'L' ? 1 : -1;
  return (
    <g transform={`translate(${-sg * 72},-325) rotate(${sg * a[0]})`}>
      <rect x={-14} y={-8} width={28} height={93} rx={14} fill={sleeve} {...sw} />
      <g transform={`translate(0,82) rotate(${-sg * a[1]})`}>
        <rect x={-12} y={-6} width={24} height={84} rx={12} fill={fore} {...sw} />
        <circle cx={0} cy={84} r={15} fill={skin} {...sw} />
        <g transform="translate(0,84)">{children}</g>
      </g>
    </g>
  );
};

const Leg = ({x, rot, ty, fill, shoe}: {x: number; rot: number; ty: number; fill: string; shoe: string}) => (
  <g transform={`translate(${x},${-170 + ty}) rotate(${rot})`}>
    <rect x={-15} y={-6} width={30} height={160} rx={15} fill={fill} {...sw} />
    <ellipse cx={x > 0 ? 5 : -5} cy={156} rx={25} ry={12} fill={shoe} {...sw} />
  </g>
);

const Torso = ({l, bw}: {l: Look; bw: number}) => {
  const W = 124 * bw, h = W / 2;
  const dark = shade(l.top, 0.78);
  let body: React.ReactNode;
  if (l.kind === 'kurti') {
    body = <g><path d="M-62,-328 Q-62,-345 -40,-345 L40,-345 Q62,-345 62,-328 L74,-88 Q0,-66 -74,-88 Z" fill={l.top} {...sw} /><path d="M-72,-102 Q0,-80 72,-102" fill="none" stroke={shade(l.top, 0.7)} strokeWidth={6} /><path d="M-18,-345 Q0,-318 18,-345" fill={l.skin} {...sw} /></g>;
  } else if (l.kind === 'torn') {
    body = <g><path d={`M${-h},-345 L${h},-345 L${h},-168 L${h - 14},-156 L${h - 26},-172 L${h - 40},-153 L${h - 54},-170 L${-h + 52},-152 L${-h + 38},-170 L${-h + 24},-154 L${-h + 12},-170 L${-h},-160 Z`} fill={l.top} {...sw} /><path d="M-20,-330 L6,-290 L-8,-262 L-34,-300 Z" fill={l.skin} {...sw} /><path d="M-14,-318 L2,-290 L-10,-272 L-24,-296 Z" fill="#8f1a1a" /><path d="M-16,-345 Q0,-322 16,-345" fill={l.skin} {...sw} /></g>;
  } else {
    body = <rect x={-h} y={-345} width={W} height={180} rx={36} fill={l.top} {...sw} />;
  }
  return (
    <g>
      {l.kind === 'hoodie' && <path d="M-52,-352 Q0,-318 52,-352 L58,-332 Q0,-296 -58,-332 Z" fill={dark} {...sw} />}
      {body}
      {l.kind === 'tee' && <path d="M-22,-345 Q0,-320 22,-345" fill={l.skin} {...sw} />}
      {l.kind === 'hoodie' && <g><rect x={-40} y={-232} width={80} height={44} rx={14} fill={dark} {...sw} /><path d="M-12,-330 L-12,-288 M12,-330 L12,-288" stroke="#f4f4f4" strokeWidth={4} /></g>}
      {l.kind === 'uniform' && <g>
        <path d="M-22,-345 L0,-308 L-34,-338 Z M22,-345 L0,-308 L34,-338 Z" fill="#cfd8f5" {...sw} />
        <rect x={-h} y={-196} width={W} height={16} fill="#111" {...sw} /><rect x={-9} y={-198} width={18} height={20} rx={3} fill="#d4af37" {...sw} />
        {l.nameplate && <rect x={14} y={-302} width={38} height={15} rx={2} fill="#fff" {...sw} />}
      </g>}
      {l.kind === 'jacket' && <g><rect x={-22} y={-345} width={44} height={178} fill="#6a6a72" {...sw} /><path d="M0,-345 L0,-168" stroke="#999" strokeWidth={3} /><path d="M-24,-345 L-6,-312 L-34,-340 Z M24,-345 L6,-312 L34,-340 Z" fill="#101010" {...sw} /></g>}
      {l.bag && <g><path d="M-52,-345 L58,-206" stroke="#8b5a2b" strokeWidth={9} fill="none" /><rect x={42} y={-226} width={46} height={38} rx={9} fill="#8b5a2b" {...sw} /></g>}
      {l.blood && <g fill="#b3201f"><path d="M-34,-300 q10,-14 24,-2 q-4,18 4,34 q-20,10 -30,-32z" /><circle cx={30} cy={-250} r={8} /><circle cx={42} cy={-272} r={5} /><circle cx={-44} cy={-230} r={6} /></g>}
      {l.idcard && <g transform="rotate(0,0,-345)"><path d="M-14,-348 L-8,-300 M14,-348 L8,-300" stroke="#e8e8e8" strokeWidth={3} /></g>}
    </g>
  );
};

const HairBack = ({l}: {l: Look}) => {
  if (l.style === 'long') return <path d="M-72,-430 Q-82,-505 0,-508 Q82,-505 72,-430 L80,-332 Q60,-316 42,-334 L-42,-334 Q-60,-316 -80,-332 Z" fill={l.hair} {...sw} />;
  if (l.style === 'hijab') return <path d="M0,-518 Q-100,-512 -96,-420 Q-92,-378 -112,-326 L112,-326 Q92,-378 96,-420 Q100,-512 0,-518 Z" fill={l.hijab} {...sw} />;
  if (l.style === 'curly') return <g fill={l.hair}>{CURL.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} {...sw} />)}</g>;
  return null;
};
const HairFront = ({l}: {l: Look}) => {
  if (l.style === 'long') return <path d="M-66,-440 Q-50,-505 0,-500 Q50,-505 66,-440 Q40,-472 0,-462 Q-40,-472 -66,-440 Z" fill={l.hair} {...sw} />;
  if (l.style === 'curly') return <g fill={l.hair}>{[[-36, -488, 18], [0, -496, 20], [36, -488, 18]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} {...sw} />)}</g>;
  if (l.style === 'hijab') return <g><path d="M-70,-405 Q-60,-345 0,-340 Q60,-345 70,-405 L96,-420 Q92,-378 112,-326 L-112,-326 Q-92,-378 -96,-420 Z" fill={l.hijab} {...sw} /><path d="M-68,-438 Q-58,-498 0,-500 Q58,-498 68,-438 Q40,-464 0,-466 Q-40,-464 -68,-438 Z" fill={shade(l.hijab || '#cccccc', 0.9)} {...sw} /></g>;
  if (l.style === 'cap') return <g><path d="M-70,-466 Q-74,-530 0,-532 Q74,-530 70,-466 Z" fill={l.cap} {...sw} /><path d="M-78,-466 Q0,-446 78,-466 L74,-456 Q0,-436 -74,-456 Z" fill={shade(l.cap || '#222222', 0.85)} {...sw} /><circle cx={0} cy={-500} r={7} fill="#d4af37" {...sw} /></g>;
  return <path d="M-68,-440 L-62,-500 L-44,-478 L-34,-520 L-14,-490 L0,-528 L14,-490 L34,-520 L44,-478 L62,-500 L68,-440 Q40,-475 0,-470 Q-40,-475 -68,-440Z" fill={l.hair} {...sw} />;
};

const Mouth = ({mood, shape, mustache}: {mood: Mood; shape: number; mustache?: boolean}) => {
  const dark = '#6b1d1d', y = mustache ? 6 : 0;
  return (
    <g transform={`translate(0,${y})`}>
      {shape === 1 ? <ellipse cx={0} cy={-388} rx={10} ry={8} fill={dark} {...sw} />
        : shape === 2 ? <g><ellipse cx={0} cy={-386} rx={16} ry={17} fill={dark} {...sw} /><ellipse cx={0} cy={-377} rx={9} ry={6} fill="#e57373" /></g>
        : mood === 'happy' || mood === 'smug' ? <path d={mood === 'smug' ? 'M-18,-390 Q4,-376 24,-398' : 'M-22,-396 Q0,-374 22,-396'} fill="none" {...sw} />
        : mood === 'grin' ? <g><path d="M-26,-398 Q0,-366 26,-398 Z" fill={dark} {...sw} /><path d="M-18,-396 L18,-396 L16,-389 L-16,-389 Z" fill="#fff" /></g>
        : mood === 'sad' ? <path d="M-18,-384 Q0,-402 18,-384" fill="none" {...sw} />
        : mood === 'scared' ? <path d="M-18,-388 Q-9,-398 0,-388 Q9,-378 18,-388 Q9,-366 -9,-368 Z" fill={dark} {...sw} />
        : mood === 'shock' ? <ellipse cx={0} cy={-384} rx={14} ry={20} fill={dark} {...sw} />
        : mood === 'angry' ? <path d="M-22,-382 L-10,-394 L10,-394 L22,-382 Z" fill="#fff" {...sw} />
        : mood === 'zombie' ? <g><path d="M-22,-394 L-10,-380 L2,-396 L14,-380 L26,-394 L22,-368 L-18,-368 Z" fill="#4a1010" {...sw} /><path d="M-14,-390 L-8,-382 L-2,-390 M8,-390 L14,-382 L20,-390" fill="none" stroke="#e8e0c8" strokeWidth={3} /></g>
        : <path d="M-14,-388 L14,-388" fill="none" {...sw} />}
    </g>
  );
};

export const Character: React.FC<CharProps> = (p) => {
  const {look: l, x, y, s = 1, flip = false, t, mood = 'neutral', talk = false, gaze = [0, 0], pose, gait = 0, tremble = 0, hold, holdL, opacity = 1, lean = 0, tilt = 0, dy = 0, seed = 0, tears = false, gest = true, rot = 0} = p;
  if (opacity <= 0.01) return null;
  const ph = t * Math.PI * 2 * (gait === 2 ? 2.6 : 1.7) + seed;
  const gl = flip ? -gaze[0] : gaze[0], gv = gaze[1];
  let bob = Math.sin(t * 2.6 + seed) * 3, sway = 0;
  if (gait === 1) { bob = -Math.abs(Math.sin(ph)) * 5; sway = Math.sin(ph) * 2.5; }
  if (gait === 2) { bob = -Math.abs(Math.sin(ph)) * 14; sway = Math.sin(ph) * 3; }
  const trx = tremble ? Math.sin(t * 71 + seed) * tremble : 0, tr_y = tremble ? Math.cos(t * 83) * tremble * 0.6 : 0;
  const bw = look_bw(l);

  let aL: [number, number] = pose?.aL || [7 + Math.sin(t * 1.9 + seed) * 2, 6];
  let aR: [number, number] = pose?.aR || [7 + Math.sin(t * 1.7 + seed) * 2, 6];
  if (gait === 1 && !pose?.aL) { aL = [10 + 12 * Math.sin(ph), 10]; aR = pose?.aR || [10 - 12 * Math.sin(ph), 10]; }
  if (gait === 2 && !pose?.aL) { aL = [35 + 25 * Math.sin(ph), 75]; aR = pose?.aR || [35 - 25 * Math.sin(ph), 75]; }
  if (talk && gest && !pose?.aR && gait === 0) aR = [28 + 14 * Math.sin(t * 3.3 + seed), 55 + 30 * Math.sin(t * 4.1)];

  const lift = (k: number) => (gait ? Math.max(0, Math.sin(ph + k)) * (gait === 2 ? 44 : 16) : 0);
  const lr = (k: number) => (gait ? Math.sin(ph + k) * (gait === 2 ? 10 : 6) : 0);

  const blink = (t + seed * 1.7) % 3.4 < 0.13;
  const shape = talk ? (() => { const r = hsh(Math.floor(t * 11 + seed * 5)); return r < 0.22 ? 0 : r < 0.62 ? 1 : 2; })() : 0;
  const hb = talk ? Math.sin(t * 9) * 1.5 : 0;
  const hr = tilt + gl * 5 + (talk ? Math.sin(t * 6 + seed) * 1.5 : 0);
  const b = BROW[mood] || BROW.neutral;
  const by = -458 + b[2] + (l.style === 'cap' ? 9 : 0);
  const eyeW = l.eye || '#ffffff', pup = l.pupil || '#2b1b12';
  const pr = mood === 'shock' ? 5 : mood === 'scared' ? 6 : l.pupil ? 6 : 8;
  const ery = mood === 'shock' ? 20 : mood === 'angry' ? 14 : 17;
  const brow = (e: number) => `M${e * 42},${by + b[1] + (e < 0 ? b[3] : b[4])} L${e * 9},${by + b[0] + (e < 0 ? b[3] : b[4])}`;

  return (
    <g opacity={opacity} transform={`translate(${x + trx},${y + bob + tr_y + dy}) rotate(${lean + sway + rot}) scale(${flip ? -s : s},${s})`}>
      <Leg x={-28} rot={-lr(0)} ty={-lift(0)} fill={l.bottom} shoe={l.shoe || '#333333'} />
      <Leg x={28} rot={lr(Math.PI)} ty={-lift(Math.PI)} fill={l.bottom} shoe={l.shoe || '#333333'} />
      <rect x={-15} y={-372} width={30} height={36} fill={l.skin} {...sw} />
      <Torso l={l} bw={bw} />
      {(() => {
        const longS = l.long || l.kind === 'hoodie' || l.kind === 'jacket' || l.kind === 'uniform';
        const fore = longS ? l.top : l.skin;
        return (<>
          <Arm side="L" a={aL} sleeve={l.top} fore={fore} skin={l.skin}>{holdL}</Arm>
          <Arm side="R" a={aR} sleeve={l.top} fore={fore} skin={l.skin}>{hold}</Arm>
        </>);
      })()}
      {l.idcard && <g transform={`rotate(${Math.sin(t * 2) * 4},0,-350)`}><g transform="translate(0,-300) scale(1.6)"><rect x={-20} y={0} width={40} height={56} rx={4} fill="#fff" {...sw} /><rect x={-20} y={0} width={40} height={15} rx={4} fill="#f26b21" {...sw} /><text x={0} y={12} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">UIU</text><circle cx={0} cy={28} r={8} fill="#cfcfcf" /><text x={0} y={50} textAnchor="middle" fontSize={6.5} fontWeight={700} fill="#222">STUDENT ID</text></g></g>}
      <g transform={`translate(${gl * 4},${hb}) rotate(${hr},0,-360)`}>
        <HairBack l={l} />
        <circle cx={-64} cy={-422} r={12} fill={l.skin} {...sw} /><circle cx={64} cy={-422} r={12} fill={l.skin} {...sw} />
        <ellipse cx={0} cy={-425} rx={66} ry={70} fill={l.skin} {...sw} />
        <g transform={`translate(${gl * 5},${gv * 3})`}>
          {mood !== 'zombie' && <><circle cx={-40} cy={-402} r={9} fill="#ff8a8a" opacity={0.28} /><circle cx={40} cy={-402} r={9} fill="#ff8a8a" opacity={0.28} /></>}
          {l.rings && <><ellipse cx={-25} cy={-414} rx={18} ry={8} fill="#3c2c3c" opacity={0.35} /><ellipse cx={25} cy={-414} rx={18} ry={8} fill="#3c2c3c" opacity={0.35} /></>}
          {[-1, 1].map((e) => (
            <g key={e} transform={`translate(${e * 25},-432)`}>
              {mood === 'grin' ? <path d="M-14,2 Q0,-16 14,2" fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
                : <g transform={`scale(1,${blink ? 0.1 : 1})`}>
                  <ellipse rx={15} ry={ery} fill={eyeW} {...sw} />
                  <circle cx={gl * 7} cy={gv * 5} r={pr} fill={pup} />
                  {!l.pupil && <circle cx={gl * 7 + 2.5} cy={gv * 5 - 2.5} r={2.2} fill="#fff" />}
                </g>}
            </g>
          ))}
          {[-1, 1].map((e) => <path key={e} d={brow(e)} stroke={INK} strokeWidth={6.5} strokeLinecap="round" fill="none" />)}
          {l.glasses && <g><circle cx={-25} cy={-432} r={23} fill="rgba(255,255,255,0.18)" {...sw} /><circle cx={25} cy={-432} r={23} fill="rgba(255,255,255,0.18)" {...sw} /><path d="M-48,-432 L-64,-428 M48,-432 L64,-428" fill="none" {...sw} /></g>}
          <path d="M-3,-412 Q2,-403 7,-408" fill="none" {...sw} />
          <Mouth mood={mood} shape={shape} mustache={l.mustache} />
          {l.mustache && <path d="M-28,-400 Q-14,-414 0,-402 Q14,-414 28,-400 Q14,-390 0,-396 Q-14,-390 -28,-400 Z" fill={l.hair} {...sw} />}
          {l.blood && <path d="M-34,-470 Q-30,-450 -37,-440" fill="none" stroke="#b3201f" strokeWidth={5} strokeLinecap="round" />}
          {l.blood && mood === 'zombie' && <path d="M-18,-380 Q-4,-362 -2,-348 Q8,-362 20,-382 Z" fill="#9e1c1c" />}
          {tears && mood === 'sad' && [-1, 1].map((e) => <ellipse key={e} cx={e * 30} cy={-410 + ((t * 70 + e * 20) % 48)} rx={5} ry={9} fill="#7fd0ff" stroke={INK} strokeWidth={1.5} />)}
        </g>
        <HairFront l={l} />
      </g>
    </g>
  );
};

function look_bw(l: Look) { return l.build || 1; }
