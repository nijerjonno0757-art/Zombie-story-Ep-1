import {Easing} from 'remotion';
import {lerp, prog} from './anim';

export type Cam = {cx: number; cy: number; z: number; r: number; sx: number; sy: number};
/** d = duration(s), from/to = [centerX, centerY, zoom], sh = handheld shake px, r = rotation range */
export type Shot = {d: number; from: [number, number, number]; to: [number, number, number]; e?: 'io' | 'in' | 'out' | 'lin'; sh?: number; r?: [number, number]};

const EA = {
  io: Easing.bezier(0.45, 0, 0.25, 1),
  in: Easing.bezier(0.5, 0, 1, 1),
  out: Easing.bezier(0, 0, 0.3, 1),
  lin: (x: number) => x,
};

export const camAt = (t: number, t0: number, shots: Shot[]): Cam & {i: number; lt: number} => {
  let a = t0;
  for (let i = 0; i < shots.length; i++) {
    const s = shots[i];
    if (t < a + s.d || i === shots.length - 1) {
      const p = EA[s.e || 'io'](prog(t, a, a + s.d));
      const z = s.from[2] * Math.pow(s.to[2] / s.from[2], p);
      const sh = s.sh || 0;
      return {
        cx: lerp(s.from[0], s.to[0], p), cy: lerp(s.from[1], s.to[1], p), z,
        r: s.r ? lerp(s.r[0], s.r[1], p) : 0,
        sx: sh * (Math.sin(t * 17.3) + Math.sin(t * 9.1 + 1)) * 0.5,
        sy: sh * (Math.sin(t * 13.7 + 2) + Math.sin(t * 7.3)) * 0.5,
        i, lt: t - a,
      };
    }
    a += s.d;
  }
  return {cx: 0, cy: 0, z: 1, r: 0, sx: 0, sy: 0, i: 0, lt: 0};
};
