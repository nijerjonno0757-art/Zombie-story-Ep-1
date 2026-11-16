import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame} from 'remotion';
import {FPS} from './data';
import {Captions} from './ui';
import {S1, S2, S3, S4} from './scenes1';
import {S5, S6, S7, S8} from './scenes2';

const SC: [number, number, React.FC<{t: number}>][] = [
  [0, 16.42, S1], [16.42, 41.14, S2], [41.14, 54.82, S3], [54.82, 64.9, S4],
  [64.9, 82.04, S5], [82.04, 89.76, S6], [89.76, 99.28, S7], [99.28, 120, S8],
];

export const Main: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Audio src={staticFile('voice.mp3')} />
      {SC.map(([a, b, Sc], i) => (t >= a && t < b ? <Sc key={i} t={t} /> : null))}
      <Captions t={t} />
    </AbsoluteFill>
  );
};
