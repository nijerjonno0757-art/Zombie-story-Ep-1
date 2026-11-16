import React from 'react';
import {Composition} from 'remotion';
import {Main} from './Main';
import {W, H, FPS, TOTAL} from './data';

export const Root: React.FC = () => (
  <Composition id="Main" component={Main} durationInFrames={TOTAL} fps={FPS} width={W} height={H} />
);
