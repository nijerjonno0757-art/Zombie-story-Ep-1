import React from 'react';
import {Character, Mood} from './Character';
import {camAt} from './camera';
import {bump, flick, kf, lerp, prog} from './anim';
import {Bubble, Stage, Stamp} from './ui';
import {Campus, Corridor, Hall} from './bg';
import {Crowd, Extra, Icon, Packet} from './parts';
import {act, AHO, FY, GRD_B, gz, headC, LINES, PRA, S0, SUM, XA, XP, XS, ZB1, ZB2} from './data';

type SP = {t: number};
const RIGHT: [number, number] = [1, -0.05];

/* ───────── সিন ৫: গার্ড ও জম্বি ───────── */
export const S5: React.FC<SP> = ({t}) => {
  const cam = camAt(t, 64.9, [
    {d: 1.7, from: [2600, 1050, 1.2], to: [2500, 1050, 1.25], sh: 5},
    {d: 1.92, from: [2410, 1100, 1.5], to: [2110, 1100, 1.5], e: 'lin', sh: 4},
    {d: 2.7, from: [2300, 1050, 1.2], to: [2020, 1050, 1.15], sh: 3},
    {d: 1.72, from: [2030, 880, 2.8], to: [1990, 880, 3.2], sh: 5},
    {d: 2.24, from: [1795, 880, 2.4], to: [1795, 870, 2.7], sh: 4},
    {d: 2.22, from: [1850, 1050, 1.0], to: [1780, 1050, 1.1], sh: 3},
    {d: 2.1, from: [1800, 1100, 1.7], to: [1780, 1090, 1.9], sh: 2},
    {d: 2.54, from: [1350, 1000, 1.1], to: [1300, 1000, 0.8], sh: 8},
  ]);
  const gx = kf(t, [[64.9, 2590], [68.5, 2100], [72, 1810], [72.9, 1800], [75.2, 1760], [82, 1250]]);
  const shout = t >= 72 && t < 75.2;
  const lp = prog(t, 78.2, 79.0);
  const zx = t < 78.2 ? kf(t, [[67.4, 2620], [69, 2450], [72, 2060], [72.9, 2020], [75.2, 1960], [77.8, 1880], [78.2, 1860]]) : lerp(1860, 1720, lp);
  const leap = t >= 78.2 && t < 79.0;
  const sRot = kf(t, [[78.9, 0], [79.3, 80]]), sDy = kf(t, [[78.9, 0], [79.3, 95]]);
  const g1 = LINES.find((l) => l.id === 'g1')!;
  const fl = t >= 78.9 && t < 79.1 ? 0.7 : 0;
  const trio = (x: number, seed: number, look: any, extra?: any) => <Character look={look} x={x} y={FY} s={S0} t={t} mood="scared" gaze={RIGHT} tremble={1.5} seed={seed} {...extra} />;
  return (
    <Stage cam={cam} vig={0.65} tint="#8a0f1e" tintA={0.12 + 0.25 * prog(t, 78.5, 82)} flash={fl}
      world={<>
        <Campus t={t} lights={t < 68 ? 'off' : 'red'} banner="WARFAZE" />
        <Crowd t={t} mode={t > 71 ? 'panic' : 'stand'} lo={300} hi={1500} n={14} flee={79.3} />
        {trio(XA, 1, AHO)}{trio(XP, 2, PRA)}{trio(XS, 3, SUM, {pose: {aL: [18, 80]}, holdL: <Packet />})}
        <Extra x={1700} y={FY} s={1.1} c="#4b7bec" t={t} mode="stand" rot={sRot} dy={sDy} />
        <Character look={GRD_B} x={gx} y={FY} s={S0} t={t} mood={shout ? 'shock' : 'scared'} talk={shout} gait={shout ? 0 : 2} lean={shout ? 8 : 0}
          gaze={[-0.7, 0]} pose={shout ? {aL: [70, 20], aR: [70, 20]} : undefined} tremble={shout ? 1.5 : 0} seed={4} />
        <Character look={ZB1} x={zx} y={FY} s={S0} t={t} mood="zombie" opacity={prog(t, 67.3, 67.5)} gait={t < 77.8 ? 2 : 0} lean={leap ? -30 : t >= 79 ? -28 : -12}
          dy={leap ? -170 * Math.sin(Math.PI * lp) : 0} gaze={[-1, 0]} tremble={0.8} seed={5} tilt={-6}
          pose={leap ? {aL: [120, 10], aR: [120, 10]} : {aL: [55, 30], aR: [55, 30]}} />
        <Icon k="splat" x={1700} y={1400} s={1.3} t={t} at={79.1} float={false} />
        {[[1500, 1000], [1300, 950], [1950, 980]].map(([x, y], i) => <Icon key={i} k="ex" x={x} y={y} t={t} at={79.5 + i * 0.25} until={82.04} />)}
        <Icon k="warn" x={1800} y={FY - 800} t={t} at={72.2} until={73.4} />
      </>}
      ui={<Bubble line={g1} t={t} x={gx} />} />
  );
};

/* ───────── সিন ৬: মোমোর প্যাকেট পড়ে যায় ───────── */
export const S6: React.FC<SP> = ({t}) => {
  const c0 = camAt(t, 82.04, [
    {d: 1.86, from: [1000, 1020, 1.5], to: [1000, 1010, 1.6], e: 'lin', sh: 2},
    {d: 1.7, from: [990, 1250, 2.0], to: [990, 1420, 2.4], sh: 2},
    {d: 1.38, from: [1000, 880, 2.4], to: [1000, 870, 2.7], e: 'lin', sh: 3},
    {d: 2.78, from: [700, 880, 2.2], to: [720, 880, 2.5], e: 'lin', sh: 5},
  ]);
  const cam = {...c0, sx: c0.sx + bump(t, [84.75], 8)};
  const sp = act(t)?.who;
  const dropped = t >= 83.95;
  const p1 = prog(t, 83.95, 84.75), p2 = prog(t, 84.75, 85.2);
  const px = lerp(963, t < 84.75 ? 950 : 930, t < 84.75 ? p1 : p2);
  const py = t < 84.75 ? lerp(1182, 1470, p1 * p1) : 1470 - 70 * Math.sin(Math.PI * p2);
  const pr = t < 84.75 ? lerp(0, 200, p1) : lerp(200, 250, p2);
  const pk: [number, number] = gz(headC(XS), {x: 950, y: 1470});
  const mS: Mood = t < 83.9 ? 'scared' : t < 85.6 ? 'shock' : 'sad';
  const a1 = kf(t, [[83.9, 18], [84.4, 38]]), a2 = kf(t, [[83.9, 80], [84.4, 25]]);
  const ahoTalk = t >= 86.98;
  return (
    <Stage cam={cam} vig={0.65} tint="#8a0f1e" tintA={0.3}
      world={<>
        <Campus t={t} lights="red" banner="WARFAZE" />
        <Crowd t={t} mode="run" lo={1500} hi={2300} n={10} y0={1340} y1={1390} sc={0.7} flee={82} seed={4} />
        <Character look={AHO} x={XA} y={FY} s={S0} t={t} mood={ahoTalk ? 'angry' : 'scared'} talk={sp === 'A'} gaze={ahoTalk ? gz(headC(XA), headC(XS)) : RIGHT}
          pose={ahoTalk ? {aR: [95, 10]} : undefined} tremble={1.5} seed={1} />
        <Character look={PRA} x={XP} y={FY} s={S0} t={t} mood="scared" gaze={RIGHT} tremble={1.5} seed={2} />
        <Character look={SUM} x={XS} y={FY} s={S0} t={t} mood={mS} talk={sp === 'S'} tears={t >= 85.6} gaze={t < 83.9 ? RIGHT : pk}
          pose={{aL: [a1, a2]}} holdL={dropped ? undefined : <Packet />} tremble={t < 83.9 ? 1.5 : 2} seed={3} />
        {dropped && <g transform={`translate(${px},${py}) rotate(${pr})`}><Packet s={1.2} /></g>}
        {[-90, -30, 40, 100, 160].map((ox, i) => {
          const p = prog(t, 84.75, 85.4);
          return <Icon key={i} k="momo" x={950 + ox * p} y={1470 - 90 * Math.sin(Math.PI * p) * (1 + i * 0.1)} s={0.5} t={t} at={84.75} float={false} rot={p * 120 * (i % 2 ? 1 : -1)} />;
        })}
      </>}
      ui={<>{LINES.filter((l) => l.id === 's2' || l.id === 'a2').map((l) => <Bubble key={l.id} line={l} t={t} x={l.who === 'S' ? XS : XA} />)}</>} />
  );
};

/* ───────── সিন ৭: ভবনের ভেতর, দরজা বন্ধ ───────── */
export const S7: React.FC<SP> = ({t}) => {
  const knocks = [96.7, 97.3, 97.7, 98.3, 98.6];
  const c0 = camAt(t, 89.76, [
    {d: 2.9, from: [650, 1050, 1.2], to: [900, 1050, 1.1], sh: 3},
    {d: 1.64, from: [640, 880, 2.3], to: [640, 870, 2.5], e: 'lin', sh: 2},
    {d: 2.0, from: [555, 1200, 3.2], to: [560, 1200, 3.4], e: 'lin', sh: 3},
    {d: 2.98, from: [900, 1000, 1.15], to: [1000, 1000, 0.95], sh: 2},
  ]);
  const cam = {...c0, sx: c0.sx + bump(t, [95.65, ...knocks], 10)};
  const xa = kf(t, [[89.76, 420], [92.2, 1180]]), xs = kf(t, [[90.3, 420], [92.4, 930]]), xp = kf(t, [[90.8, 420], [92.2, 640]]);
  const vis = (x: number, from: number) => (t < from ? 0 : Math.min(1, Math.max(0, (x - 390) / 90)));
  const run = t < 92.3;
  const door = kf(t, [[94.5, 0.12], [95.65, 1]]);
  const fl = (t < 96 ? 1 : flick(t, 2.3)) * (1 - prog(t, 98.8, 99.2));
  const jit = t > 93 && t < 95 ? Math.sin(t * 60) * 3 : 0;
  const pPose = !run ? {aL: [
    kf(t, [[92.8, 10], [94.4, 88], [94.5, 88], [95.7, 32], [96.3, 32], [97, 10]]) + jit,
    kf(t, [[92.8, 10], [94.4, 8], [94.5, 8], [95.7, 68], [96.3, 68], [97, 10]]),
  ] as [number, number]} : undefined;
  const door_g: [number, number] = [-1, -0.05];
  const ch = (look: any, x: number, from: number, seed: number, extra?: any) => (
    <Character look={look} x={x} y={FY} s={S0} t={t} mood="scared" opacity={vis(x, from)} gait={run ? 2 : 0}
      gaze={run ? [0.8, 0] : door_g} tremble={run ? 0 : 1} seed={seed} {...extra} />
  );
  return (
    <Stage cam={cam} vig={0.7} tint="#000" tintA={0.25 + 0.6 * prog(t, 98.6, 99.28) + (1 - fl) * 0.3}
      world={<>
        <Hall t={t} door={door} shift={bump(t, [95.65, ...knocks], 6)} fl={fl} shadows={t > 96.4} />
        {ch(AHO, xa, 89.76, 1)}{ch(SUM, xs, 90.3, 3)}{ch(PRA, xp, 90.8, 2, {pose: pPose, gaze: run ? [0.8, 0] : [-1, -0.1], tremble: run ? 0 : 1.6})}
        <Icon k="lock" x={650} y={1130} s={0.9} t={t} at={95.7} until={96.8} />
        {knocks.map((k, i) => <Icon key={k} k="ex" x={470 + (i % 3) * 70} y={760 + (i % 2) * 90} t={t} at={k} until={k + 0.7} />)}
      </>} />
  );
};

/* ───────── সিন ৮: করিডোরের জম্বি ও UIU আইডি কার্ড ───────── */
export const S8: React.FC<SP> = ({t}) => {
  const cam = camAt(t, 99.28, [
    {d: 2.16, from: [1200, 950, 0.9], to: [1200, 930, 1.0]},
    {d: 2.88, from: [1200, 930, 1.1], to: [1200, 1000, 1.5]},
    {d: 3.98, from: [1200, 1000, 1.5], to: [1200, 1190, 2.4]},
    {d: 1.8, from: [1200, 1185, 3.2], to: [1200, 1180, 3.9], e: 'lin', sh: 1.5},
    {d: 1.9, from: [1200, 1180, 3.9], to: [1200, 1405, 5.2]},
    {d: 2.13, from: [1200, 1405, 5.2], to: [1200, 1405, 5.6], e: 'lin'},
  ]);
  const k = kf(t, [[101.44, 0.12], [104.32, 0.3], [108.0, 0.84]]);
  const fl = flick(t, 1.1);
  const pulse = t >= 111.92 && t < 112.2 ? 0.35 * (1 - prog(t, 111.92, 112.2)) : 0;
  return (
    <Stage cam={cam} vig={0.85} tint="#06141c" tintA={0.25} flash={pulse} fade={prog(t, 113.2, 114.1)}
      world={<>
        <Corridor t={t} fl={fl} />
        <Character look={ZB2} x={1200} y={820 + 1100 * k} s={1.55 * k} t={t} mood="zombie" opacity={prog(t, 101.44, 102.4)}
          gait={t < 107.8 ? 1 : 0} tilt={7 * Math.sin(t * 1.5) - 4} lean={2} tremble={0.6} gaze={[0, 0]} pose={{aL: [22, 8], aR: [60, 25]}} seed={6} />
      </>}
      ui={<Stamp text="UIU স্টুডেন্ট আইডি কার্ড" x={540} y={1500} t={t} a={111.92} rot={-5} size={64} />} />
  );
};
