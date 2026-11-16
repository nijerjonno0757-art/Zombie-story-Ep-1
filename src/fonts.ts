import {staticFile, continueRender, delayRender} from 'remotion';
export const fontFamily = 'Hind Siliguri';
const h = delayRender('font');
const faces = ['bengali', 'latin'].flatMap((s) => [500, 700].map((w) => new FontFace(fontFamily, `url(${staticFile(`hind-siliguri-${s}-${w}-normal.woff2`)})`, {weight: String(w), unicodeRange: s === 'latin' ? 'U+0000-00FF,U+2000-206F' : 'U+0980-09FF,U+200C-200D,U+0964-0965,U+25CC'})));
Promise.all(faces.map((f) => f.load().then((l) => document.fonts.add(l)))).then(() => continueRender(h)).catch(() => continueRender(h));
