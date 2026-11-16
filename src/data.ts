import {Look} from './Character';
import {clamp} from './anim';

export const W = 1080, H = 1920, FPS = 30, TOTAL = 3424;
export const S0 = 1.55, FY = 1500;
export const XA = 700, XS = 1000, XP = 1300;

export const SUM: Look = {name: 'সুমাইয়া', skin: '#F3C9A0', hair: '#1B1B1B', style: 'long', kind: 'kurti', top: '#F7E27A', bottom: '#2F5FA8', shoe: '#f2f2f2', bag: true};
export const AHO: Look = {name: 'অহনা', skin: '#EDBF98', hair: '#222222', style: 'hijab', hijab: '#EDE3CC', kind: 'tee', top: '#1F5B3A', bottom: '#1E1E1E', shoe: '#444444', glasses: true, long: true};
export const PRA: Look = {name: 'প্রভা', skin: '#D9A373', hair: '#2A1B14', style: 'curly', kind: 'hoodie', top: '#D63A3A', bottom: '#7B7F86', shoe: '#eeeeee'};
export const GRD: Look = {name: 'গার্ড', skin: '#D9A57A', hair: '#222222', style: 'cap', cap: '#162A5C', kind: 'uniform', top: '#1F3A7A', bottom: '#17275A', shoe: '#111111', mustache: true, nameplate: true, build: 1.15};
export const GRD_B: Look = {...GRD, blood: true};
export const GRD2: Look = {...GRD, skin: '#C48E63', mustache: false, build: 1};
export const ZB1: Look = {name: 'জম্বি', skin: '#A9C79B', hair: '#3A2E2A', style: 'messy', kind: 'torn', top: '#EDEDE6', bottom: '#6E6E6E', shoe: '#2a2a2a', blood: true, eye: '#e8d4cc', pupil: '#a01818', rings: true};
export const ZB2: Look = {name: 'জম্বি-২', skin: '#B9CBC4', hair: '#222222', style: 'messy', kind: 'jacket', top: '#1B1B1B', bottom: '#2D4A7A', shoe: '#222222', idcard: true, eye: '#eef2f0', pupil: '#bcc7c3', rings: true};

export type Line = {id: string; who: 'S' | 'A' | 'P' | 'G'; a: number; b: number; text: string};
export const LINES: Line[] = [
  {id: 's1', who: 'S', a: 21.8, b: 28.46, text: 'তোরা কনসার্ট দেখ। আমি আগে মোমো শেষ করি। জীবনে আনন্দের চেয়ে মোমো বেশি গুরুত্বপূর্ণ!'},
  {id: 'a1', who: 'A', a: 28.46, b: 30.9, text: 'তোর মাথায় সবসময় শুধু খাবার ঘোরে?'},
  {id: 'p1', who: 'P', a: 31.2, b: 37.8, text: 'ওকে কিছু বলিস না। ওর কাছে পৃথিবী ধ্বংস হলেও শেষ চিন্তা হবে, মোমোটা কে খাবে!'},
  {id: 'g1', who: 'G', a: 72.96, b: 75.18, text: 'দৌড়ান! সবাই দৌড়ান!'},
  {id: 's2', who: 'S', a: 85.6, b: 86.98, text: 'আমার মোমো!'},
  {id: 'a2', who: 'A', a: 86.98, b: 89.76, text: 'মোমো পরে খাস! আগে দৌড়া!'},
];
export const act = (t: number) => LINES.find((l) => t >= l.a && t < l.b);

// Bottom captions: only where NO bubble / stamp is on screen. *word* = highlighted keyword
export const CAPS: {a: number; b: number; text: string}[] = [
  {a: 0.16, b: 1.9, text: 'নতুনদের বরণ করে নিতে'}, {a: 1.9, b: 3.7, text: 'আজ *UIU ক্যাম্পাসে* আয়োজন'},
  {a: 3.7, b: 5.92, text: 'হয়েছে এক বিশাল *কনসার্ট*'}, {a: 5.92, b: 8.4, text: 'চারদিকে *আনন্দ*, উচ্ছ্বাস আর'},
  {a: 8.4, b: 10.32, text: 'হাজারো মানুষের ভিড়'}, {a: 10.32, b: 11.7, text: 'কিন্তু *কেউ জানত না*'},
  {a: 11.88, b: 13.52, text: 'এই রাতটাই হতে যাচ্ছে'},
  {a: 16.42, b: 18.54, text: '*সুমাইয়া* হাতে *মোমোর প্যাকেট*'}, {a: 18.54, b: 19.5, text: 'নিয়ে দাঁড়িয়ে আছে'},
  {a: 19.5, b: 21.78, text: 'আর তার দুপাশে *অহনা* আর *প্রভা*'},
  {a: 38.74, b: 41.14, text: 'তিনজন একসাথে *হেসে ওঠে*'},
  {a: 41.14, b: 43.38, text: '*ঠিক তখনই* স্টেজের পেছনে'}, {a: 43.38, b: 44.9, text: 'একটা *রহস্যময় অ্যাম্বুলেন্স*'},
  {a: 44.9, b: 45.9, text: 'এসে থামে'}, {a: 45.9, b: 47.46, text: 'দুজন *সিকিউরিটি গার্ড*'},
  {a: 47.46, b: 50.0, text: '*স্ট্রেচার* নিয়ে ভেতরে ঢোকে'}, {a: 50.0, b: 52.46, text: 'স্ট্রেচারে শুয়ে থাকা মানুষটার'},
  {a: 52.46, b: 54.82, text: 'শরীর *অস্বাভাবিকভাবে কাঁপছে*'},
  {a: 54.82, b: 56.14, text: 'একটু পরেই *Warfaze*'}, {a: 56.14, b: 57.6, text: 'পারফরম্যান্স শুরু হয়'},
  {a: 57.6, b: 58.94, text: 'আর দর্শকদের *চিৎকারে*'}, {a: 58.94, b: 60.82, text: 'পুরো ক্যাম্পাস *কেঁপে ওঠে*'},
  {a: 60.82, b: 62.66, text: '*হঠাৎ* স্টেজের পেছন থেকে'}, {a: 62.66, b: 64.9, text: 'একটা *বিকট চিৎকার* ভেসে আসে'},
  {a: 64.9, b: 66.14, text: 'একজন *সিকিউরিটি গার্ড*'}, {a: 66.14, b: 68.52, text: '*রক্তাক্ত* অবস্থায় বেরিয়ে আসে'},
  {a: 68.52, b: 71.22, text: 'আর তার ঠিক পেছনেই *ছুটে আসে*'}, {a: 71.22, b: 72.94, text: 'এক ভয়ংকর *জম্বি*!'},
  {a: 75.18, b: 76.68, text: 'কয়েক সেকেন্ডের মধ্যেই'}, {a: 76.68, b: 78.22, text: '*জম্বি* একজন শিক্ষার্থীর ওপর'},
  {a: 78.22, b: 79.32, text: '*ঝাঁপিয়ে পড়ে*'}, {a: 79.32, b: 82.04, text: 'মুহূর্তে চারদিকে *আতঙ্ক* ছড়িয়ে যায়'},
  {a: 82.04, b: 83.54, text: 'সুমাইয়ার হাত থেকে'}, {a: 83.54, b: 85.6, text: '*মোমোর প্যাকেট* মাটিতে পড়ে যায়'},
  {a: 89.76, b: 91.14, text: 'তিনজন *প্রাণপণে দৌড়ে*'}, {a: 91.14, b: 92.66, text: 'একটা *ভবনের* ভেতরে ঢুকে পড়ে'},
  {a: 92.66, b: 94.62, text: 'আর প্রভা *কাঁপা হাতে*'}, {a: 94.62, b: 96.3, text: '*দরজাটা বন্ধ* করে দেয়'},
  {a: 96.3, b: 97.88, text: 'বাইরে তখনও *শত শত*'}, {a: 97.88, b: 99.28, text: '*মানুষের চিৎকার*'},
  {a: 99.28, b: 101.44, text: '*হঠাৎ* করিডোরের অন্ধকার থেকে'}, {a: 101.44, b: 102.32, text: 'একটা *জম্বি*'},
  {a: 102.32, b: 104.32, text: 'ধীরে ধীরে *বেরিয়ে আসে*'}, {a: 104.32, b: 106.74, text: 'ক্যামেরা ধীরে ধীরে *জম্বির মুখের*'},
  {a: 106.74, b: 108.3, text: 'দিকে এগিয়ে যায়'}, {a: 108.3, b: 110.08, text: 'আর *তখনই দেখা যায়* তার'},
  {a: 110.08, b: 111.92, text: 'গলায় ঝুলছে *একটা*'},
];

export const headTop = (x: number, s = S0, fy = FY) => ({x, y: fy - 500 * s});
export const headC = (x: number, s = S0, fy = FY) => ({x, y: fy - 425 * s});
export const gz = (f: {x: number; y: number}, to: {x: number; y: number}): [number, number] => [clamp((to.x - f.x) / 260, -1, 1), clamp((to.y - f.y) / 300, -1, 1)];
