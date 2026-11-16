import React from 'react';
import {Character, Mood} from './Character';
import {camAt, Shot} from './camera';
import {bump, kf, lerp, prog} from './anim';
import {Badge, Bubble, Pill, Stage, Stamp} from './ui';
import {Campus} from './bg';
import {Ambulance, Crowd, Extra, Icon, Notes, Packet, Stretcher} from './parts';
import {act, AHO, FY, GRD, GRD2, gz, headC, LINES, PRA, S0, SUM, XA, XP, XS} from './data';

type SP = {t: number};

/* ───────── সিন ১: রাতের ক্যাম্পাস (Establishing) ───────── */
export const S1: React.FC<SP> = ({t}) => {
  const cam = camAt(t, 0, [
    {d: 6, from: [1700, 820, 0.8], to: [1500, 1100, 0.95]},
    {d: 5, from: [1500, 1100, 0.95], to: [1000, 1150, 1.0]},
    {d: 5.42, from: [1000, 1150, 1.0], to: [1100, 1180, 1.45], e: 'in', r: [0, -3]},
  ]);
  const red = prog(t, 11.5, 16.4);
  return (
    <Stage cam={cam} vig={0.5 + 0.3 * red} tint="#8a0f1e" tintA={0.28 * red} fade={1 - prog(t, 0, 0.7)}
      world={<><Campus t={t} lights={t > 13.3 ? 'red' : 'on'} /><Notes t={t} /><Crowd t={t} mode="cheer" lo={250} hi={1480} n={16} /></>}
      ui={<><Pill text="UIU ক্যাম্পাস · ওয়েলকাম কনসার্ট" t={t} a={0.5} b={6.2} /><Stamp text="সবচেয়ে ভয়ংকর রাত" x={540} y={1200} t={t} a={13.6} b={16.42} /></>} />
  );
};

/* ───────── সিন ২: তিন বন্ধু ───────── */
const SH2: Shot[] = [
  {d: 2.18, from: [1000, 1000, 0.95], to: [1000, 1000, 1.1]},
  {d: 3.2, from: [1000, 960, 1.9], to: [1000, 1000, 1.05], e: 'out'},
  {d: 6.66, from: [1000, 900, 2.0], to: [1000, 885, 2.5], e: 'lin'},
  {d: 2.74, from: [700, 900, 2.1], to: [700, 890, 2.4], e: 'lin'},
  {d: 2.8, from: [1300, 900, 2.0], to: [1300, 890, 2.3], e: 'lin'},
  {d: 3.8, from: [1000, 1000, 1.25], to: [1000, 1000, 1.3], e: 'lin'},
  {d: 3.34, from: [1000, 1000, 1.3], to: [1000, 1060, 0.95]},
];
const XM: Record<string, number> = {A: XA, S: XS, P: XP};

export const S2: React.FC<SP> = ({t}) => {
  const cam = camAt(t, 16.42, SH2);
  const ln = act(t), sp = ln?.who;
  const gzf = (me: string): [number, number] => {
    const f = headC(XM[me]);
    if (sp && sp !== me && XM[sp]) return gz(f, headC(XM[sp]));
    if (sp === me) return gz(f, headC(XM[me === 'S' ? (t < 25.2 ? 'A' : 'P') : 'S']));
    return me === 'S' ? [0.15, 0.35] : gz(f, headC(XS));
  };
  const laugh1 = t > 24.4 && t < 25.7, laugh2 = t > 37.8;
  const mS: Mood = laugh1 ? 'grin' : t < 28.46 ? 'happy' : t < 31.2 ? 'smug' : t < 34 ? 'happy' : t < 37.8 ? 'sad' : 'grin';
  const mA: Mood = laugh1 || laugh2 ? 'grin' : t >= 28.46 && t < 30.8 ? 'smug' : 'happy';
  const mP: Mood = t > 31.2 || laugh1 ? 'grin' : 'happy';
  return (
    <Stage cam={cam} vig={0.5}
      world={<>
        <Campus t={t} /><Notes t={t} /><Crowd t={t} mode="cheer" lo={1000} hi={1450} n={7} y0={1340} y1={1390} sc={0.7} />
        <Character look={AHO} x={XA} y={FY} s={S0} t={t} mood={mA} talk={sp === 'A'} gaze={gzf('A')} tremble={laugh1 || laugh2 ? 2 : 0} seed={1} />
        <Character look={PRA} x={XP} y={FY} s={S0} t={t} mood={mP} talk={sp === 'P'} gaze={gzf('P')} tremble={laugh1 || laugh2 || (t > 32.7 && t < 33.8) ? 2 : 0} seed={2} />
        <Character look={SUM} x={XS} y={FY} s={S0} t={t} mood={mS} talk={sp === 'S'} gaze={gzf('S')} pose={{aL: [18, 80]}} holdL={<Packet />} tremble={laugh1 || laugh2 ? 2.5 : 0} seed={3} />
        <Icon k="momo" x={XS - 150} y={FY - 640} t={t} at={17.3} until={19.3} />
        <Icon k="momo" x={XS - 190} y={FY - 700} s={1.2} t={t} at={36.2} until={37.9} />
      </>}
      ui={<>
        <Badge text="সুমাইয়া" color="#F4B400" x={XS} t={t} a={16.7} b={20.3} />
        <Badge text="অহনা" color="#2E9E5B" x={XA} t={t} a={20.1} b={21.75} />
        <Badge text="প্রভা" color="#E5484D" x={XP} t={t} a={20.9} b={21.78} />
        {LINES.filter((l) => l.a > 21 && l.b < 38.5).map((l) => <Bubble key={l.id} line={l} t={t} x={XM[l.who]} />)}
      </>} />
  );
};

/* ───────── সিন ৩: অ্যাম্বুলেন্স ও স্ট্রেচার ───────── */
export const S3: React.FC<SP> = ({t}) => {
  const cam = camAt(t, 41.14, [
    {d: 2.26, from: [1000, 1000, 1.05], to: [2900, 1000, 0.9], sh: 6},
    {d: 2.5, from: [2950, 1080, 0.9], to: [2950, 1120, 1.0]},
    {d: 4.1, from: [3150, 1100, 1.25], to: [2851, 1100, 1.25], e: 'lin', sh: 2},
    {d: 2.46, from: [2851, 1300, 2.5], to: [2672, 1300, 2.5], e: 'lin', sh: 3},
    {d: 2.36, from: [1000, 1010, 1.25], to: [1000, 970, 1.6]},
  ]);
  const ax = kf(t, [[43.3, 3500], [45.0, 2950]]);
  const pitch = t > 45 ? -2.2 * Math.exp(-(t - 45) * 6) * Math.cos((t - 45) * 20) : 0;
  const sx = lerp(3150, 2640, prog(t, 45.9, 52.9));
  const op = prog(t, 45.7, 46.1) * (1 - prog(t, 52.4, 52.95));
  const GS = 1.45;
  const m: Mood = t < 41.8 ? 'grin' : t < 51 ? 'neutral' : 'scared';
  const g: [number, number] = [1, -0.05];
  const carry = {aL: [10, 70], aR: [10, 70]} as any;
  return (
    <Stage cam={cam} vig={0.55}
      world={<>
        <Campus t={t} />
        <Ambulance x={ax} y={FY} t={t} pitch={pitch} />
        <Character look={AHO} x={XA} y={FY} s={S0} t={t} mood={m} gaze={g} tremble={t > 52.4 ? 1.2 : 0} seed={1} />
        <Character look={PRA} x={XP} y={FY} s={S0} t={t} mood={m} gaze={g} tremble={t > 52.4 ? 1.2 : 0} seed={2} />
        <Character look={SUM} x={XS} y={FY} s={S0} t={t} mood={m} gaze={g} pose={{aL: [18, 80]}} holdL={<Packet />} tremble={t > 52.4 ? 1.2 : 0} seed={3} />
        <Character look={GRD2} x={sx - 175} y={FY} s={GS} t={t} gait={1} pose={carry} opacity={op} seed={4} />
        <Character look={GRD} x={sx + 175} y={FY} s={GS} t={t} gait={1} pose={carry} opacity={op} seed={5} />
        <Stretcher x1={sx - 175} x2={sx + 175} y={FY - 199 * GS} t={t} op={op} />
        <Icon k="q" x={2950} y={1000} t={t} at={45.3} until={47.6} />
        <Icon k="ex" x={sx} y={1000} t={t} at={51} until={53} />
      </>} />
  );
};

/* ───────── সিন ৪: Warfaze কনসার্ট → বিকট চিৎকার ───────── */
export const S4: React.FC<SP> = ({t}) => {
  const beats = Array.from({length: 7}, (_, i) => 57.6 + i * 0.5);
  const c0 = camAt(t, 54.82, [
    {d: 2.78, from: [1900, 1000, 0.85], to: [1850, 950, 1.1], sh: 3, r: [-3, 0]},
    {d: 3.22, from: [1200, 1150, 0.9], to: [1150, 1080, 1.15], sh: 5},
    {d: 1.84, from: [1000, 1020, 1.3], to: [1000, 1010, 1.35], e: 'lin'},
    {d: 2.24, from: [1000, 1000, 1.35], to: [1000, 900, 1.85], e: 'in'},
  ]);
  const cam = {...c0, sy: c0.sy + bump(t, beats, 9)};
  const live = t < 60.82;
  const lights = live ? 'on' : t < 62.7 && Math.sin(t * 30) > 0.6 ? 'red' : 'off';
  const fr = (x: number, seed: number, look: any) => (
    <Character look={look} x={x} y={FY} s={S0} t={t} seed={seed}
      mood={live ? 'grin' : 'shock'} gaze={live ? [0, -0.3] : [1, -0.05]}
      pose={live ? {aL: [150 + 15 * Math.sin(t * 6 + seed), 10], aR: [150 + 15 * Math.sin(t * 6 + seed + 1), 10]} : undefined}
      dy={live ? -Math.abs(Math.sin(t * 6 + seed)) * 22 : 0} tremble={live ? 0 : 1.5} />
  );
  return (
    <Stage cam={cam} vig={live ? 0.5 : 0.75} flash={0.5 * (1 - prog(t, 60.82, 61.1)) * (t >= 60.82 ? 1 : 0)}
      world={<>
        <Campus t={t} lights={lights as any} banner="WARFAZE" />
        {live && <Notes t={t} />}
        {[1620, 1760, 1900, 2040].map((x, i) => <Extra key={x} x={x} y={1245} s={0.95} c={['#222', '#6a1b9a', '#b71c1c', '#004d40'][i]} t={t} seed={i} mode={live ? 'cheer' : 'stand'} />)}
        <Crowd t={t} mode={live ? 'cheer' : 'stand'} lo={300} hi={1500} n={14} />
        {fr(XA, 1, AHO)}{fr(XP, 2, PRA)}{fr(XS, 3, SUM)}
        <Icon k="ex" x={XA} y={FY - 700} s={1.2} t={t} at={63.6} until={64.9} />
      </>} />
  );
};
