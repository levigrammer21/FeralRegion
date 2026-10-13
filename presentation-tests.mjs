import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {newState,addTrainer,journal} from './simulation.js';
import {Renderer} from './render.js';
import {idx,areaMarker,TILE} from './world.js';
import {feral,startBattle} from './battle.js';
import {chatTick} from './world-chat.js';
import {serialize,validateState} from './save.js';
const require=createRequire(import.meta.url),{createCanvas}=require('@napi-rs/canvas');
globalThis.document={createElement:()=>createCanvas(1,1)};globalThis.devicePixelRatio=1;
let s=newState();s.areas=[{id:'layer',name:'Layer route',biome:'meadow',cells:[idx(20,20)],open:true,min:1,max:3,species:['Mossprig'],requiredBadges:0}];let t=addTrainer(s,{name:'LayerTrainer',species:'Cinderkit'}),p=areaMarker(s.areas[0]);t.x=p.x;t.y=p.y;t.state='battle';s.battles=[startBattle(s,{a:t,b:{name:'Wild',team:[feral(s,'Mossprig',1)]},type:'wild',x:t.x,y:t.y})];let cv=createCanvas(600,500);cv.getBoundingClientRect=()=>({width:600,height:500});let renderer=new Renderer(cv),calls=[],c=renderer.c,original=c.fillText.bind(c);c.fillText=(text,...args)=>{calls.push(text);return original(text,...args);};renderer.camera={x:p.x*TILE,y:p.y*TILE,zoom:2};renderer.draw(s,{selectedTrainer:t.id},1);let sign=calls.findIndex(v=>v.startsWith('Layer route'));assert(sign>=0);assert(calls.indexOf('LayerTrainer')>sign);assert(calls.indexOf('WILD')>sign,'Battle drawing must follow route sign drawing');
let html=readFileSync('index.html','utf8'),header=html.match(/<header id="top">([\s\S]*?)<\/header>/)[1];for(let id of ['deviceSaveStatus','money','population','clock','accountButton'])assert(header.includes('id="'+id+'"'));assert.equal((html.match(/id="deviceSaveStatus"/g)||[]).length,1);
// A milestone starts a complete conversation with multiple speakers and persists future replies.
s=newState();s.buildings=[(await import('./world.js')).makeBuilding('lab',4,4)];let a=addTrainer(s,{name:'Evan',species:'Cinderkit'}),b=addTrainer(s,{name:'Reid',species:'Mossprig'});s.chat.pending=[];let seed=s.seed;journal(s,'Evan caught SHINY Gravahound!','catch',a.id);let thread=s.chat.messages.at(-1).thread;assert(s.chat.pending.filter(p=>p.thread===thread).length>=5);let copy=validateState(serialize(s));assert.equal(copy.chat.pending.length,s.chat.pending.length);for(let i=0;i<30;i++){copy.time++;chatTick(copy);}let conversation=copy.chat.messages.filter(m=>m.thread===thread);assert(conversation.length>=6);assert(new Set(conversation.map(m=>m.trainerId)).size>=2);assert(conversation.some(m=>m.mood==='excited'));assert.equal(copy.seed,seed);let dates=conversation.map(m=>m.time);assert(dates.every((v,i)=>i===0||v>=dates[i-1]));
console.log('Presentation: live canvas layering, consolidated header, extended emotional conversations and saved replies passed.');
