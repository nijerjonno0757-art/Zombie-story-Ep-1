import {Easing} from 'remotion';
export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
export const prog = (t: number, a: number, b: number) => clamp((t - a) / (b - a), 0, 1);
export const ease = Easing.bezier(0.45, 0, 0.2, 1);
export const ep = (t: number, a: number, b: number) => ease(prog(t, a, b));
export const hsh = (n: number) => { const v = Math.sin(n * 12.9898) * 43758.5453; return v - Math.floor(v); };
/** keyframes in seconds: kf(t, [[t0,v0],[t1,v1],...]) with smooth easing */
export const kf = (t: number, k: [number, number][]) => {
  if (t <= k[0][0]) return k[0][1];
  for (let i = 1; i < k.length; i++) {
    if (t <= k[i][0]) return lerp(k[i - 1][1], k[i][1], ease(prog(t, k[i - 1][0], k[i][0])));
  }
  return k[k.length - 1][1];
};
export const pop = (t: number, a: number, d = 0.4) => Easing.out(Easing.back(1.9))(prog(t, a, a + d));
/** decaying impulse shake at given times */
export const bump = (t: number, times: number[], amp: number, dur = 0.4) => {
  let v = 0;
  for (const k of times) { const d = t - k; if (d >= 0 && d < dur) v += amp * Math.exp(-d * 9) * Math.sin(d * 70); }
  return v;
};
export const flick = (t: number, seed = 0) => { const v = Math.sin(t * 37 + seed) * Math.sin(t * 23.3 + seed * 2); return v > 0.7 ? 0.2 : 1; };
