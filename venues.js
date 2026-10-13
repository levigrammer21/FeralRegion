import {BUILDINGS,clamp} from './data.js';
import {TILE,door,canPlace,invalidate,idx} from './world.js';
export const VENUE_TYPES=['arena','league'];
export const legacyVenue=b=>VENUE_TYPES.includes(b.type)&&b.w===5&&b.h===4;
export const validVenueSize=b=>b.w===BUILDINGS[b.type]?.width&&b.h===BUILDINGS[b.type]?.height||legacyVenue(b);
export const builtInSeats=b=>b.type==='league'?(legacyVenue(b)?16:48):b.type==='arena'?(legacyVenue(b)?16:32):0;
export function venuePoint(b,u,v){return {x:b.x+b.w*u-.5,y:b.y+b.h*v-.65};}
export function thronePoint(b,rank){return venuePoint(b,.22+(3-rank)*.185,.235);}
export function fighterPoint(b,side){return venuePoint(b,side==='a'?.27:.73,.84);}
export function venueBattlePoint(b){return {x:b.x+b.w*.5-.5,y:b.y+b.h*(b.type==='arena'?.50:.66)-1.8};}
export function ensureVenue(b,time=0){if(!VENUE_TYPES.includes(b.type))return;b.venueStyle??='stadium';if(b.type==='league'){b.audience??={spectators:0,visitors:0,ticketRevenue:0,nextAt:time,fee:3};}}
export function tryExpandVenue(s,b){
 if(!legacyVenue(b)||s.challenge&&b.type==='league'||s.trainers.some(t=>t.venueReturn?.venueId===b.id&&t.venueReturn.startedAt+t.venueReturn.duration>s.time)||s.tournaments?.some(e=>e.rules.arenaId===b.id&&['registration','running'].includes(e.status)))return false;
 let d=BUILDINGS[b.type],p=door(b),x=p.x-Math.floor(d.width/2),y=p.y-d.height;
 let areaTiles=new Set((s.areas||[]).flatMap(a=>a.cells));for(let yy=y;yy<y+d.height;yy++)for(let xx=x;xx<x+d.width;xx++)if(areaTiles.has(idx(xx,yy)))return false;
 if(canPlace(s,b.type,x,y,b.id))return false;Object.assign(b,{x,y,w:d.width,h:d.height});invalidate(s);return true;
}
export function upgradeVenues(s){for(let b of s.buildings){ensureVenue(b,s.time);if(legacyVenue(b))tryExpandVenue(s,b);}}
function along(points,k){let lengths=points.slice(1).map((p,i)=>Math.hypot(p.x-points[i].x,p.y-points[i].y)),total=lengths.reduce((a,b)=>a+b,0),distance=total*k;for(let i=0;i<lengths.length;i++){if(distance<=lengths[i]||i===lengths.length-1){let t=lengths[i]?distance/lengths[i]:1;return {x:points[i].x+(points[i+1].x-points[i].x)*t,y:points[i].y+(points[i+1].y-points[i].y)*t};}distance-=lengths[i];}return points.at(-1);}
export function displayedTrainer(s,t,now=s.time){
 let tournament=s.battles.find(b=>!b.done&&b.type==='tournament'&&[b.a.id,b.b.id].includes(t.id)),arena=tournament&&battleVenue(s,tournament);if(arena)return {...fighterPoint(arena,tournament.a.id===t.id?'a':'b'),scale:Math.min(1,arena.w/10,arena.h/8),venueActor:true,venueId:arena.id};
 let hall=s.buildings.find(b=>b.type==='league'),scale=hall?Math.min(1,hall.w/12,hall.h/10):1;if(!hall||t.tournamentId)return {x:t.x,y:t.y,scale:1};
 let returning=t.venueReturn;if(returning&&returning.venueId===hall.id&&now<returning.startedAt+returning.duration){let end=returning.rank==null?{x:t.x,y:t.y}:thronePoint(hall,returning.rank),start=fighterPoint(hall,returning.side),middle=venuePoint(hall,returning.rank==null?.5:.56,returning.rank==null?.94:.39);return {...along([start,middle,end],clamp((now-returning.startedAt)/returning.duration,0,1)),scale,walking:true,venueActor:true};}
 let c=s.challenge,motion=c?.presentation;if(c?.trainerId===t.id&&['climbing','battle'].includes(t.state))return {...fighterPoint(hall,'a'),scale,venueActor:true};
 if(motion?.defenderId===t.id&&['entrance','battle'].includes(motion.phase)&&s.elites.includes(t.id)){
  if(motion.phase==='entrance'){let start=thronePoint(hall,motion.rank),middle=venuePoint(hall,.5,.38),end=fighterPoint(hall,'b');return {...along([start,middle,end],clamp((now-motion.startedAt)/motion.duration,0,1)),scale,walking:true,venueActor:true};}
  return {...fighterPoint(hall,'b'),scale,venueActor:true};
 }
 let live=s.battles.find(b=>!b.done&&b.type==='elite'&&[b.a.id,b.b.id].includes(t.id));if(live)return {...fighterPoint(hall,live.a.id===t.id?'a':'b'),scale,venueActor:true};let rank=s.elites.indexOf(t.id);if(rank>=0&&t.state==='elite')return {...thronePoint(hall,rank),scale,seated:true,rank,venueActor:true};return {x:t.x,y:t.y,scale:1};
}
export function returnToThrone(s,t,rank){let hall=s.buildings.find(b=>b.type==='league'),c=s.challenge;if(hall&&c?.presentation?.phase==='battle'&&[c.trainerId,c.presentation.defenderId].includes(t.id)){t.venueReturn={venueId:hall.id,side:c.trainerId===t.id?'a':'b',rank,startedAt:s.time,duration:4};}}
export function leagueAudienceTick(s,capacity,earn){let hall=s.buildings.find(b=>b.type==='league');if(!hall)return;ensureVenue(hall,s.time);let q=hall.audience;if(s.time<q.nextAt)return;q.nextAt=s.time+5;let active=!!s.challenge;q.spectators=Math.min(q.spectators,capacity);if(active&&q.spectators<capacity){let count=Math.min(3,capacity-q.spectators);q.spectators+=count;q.visitors+=count;q.ticketRevenue+=count*q.fee;if(q.fee)earn(s,count*q.fee,hall,'Elite spectator tickets');}else if(!active)q.spectators=Math.max(0,q.spectators-3);}
export function validateVenues(s){for(let b of s.buildings){ensureVenue(b,s.time);if(b.type==='league'){let q=b.audience;if(['spectators','visitors','ticketRevenue','nextAt','fee'].some(k=>!Number.isFinite(q[k])||q[k]<0)||!Number.isInteger(q.fee)||q.fee>15||q.spectators>2400)throw Error('Invalid Elite stadium crowd.');}}if(s.challenge?.presentation){let p=s.challenge.presentation;if(!['entrance','battle','between'].includes(p.phase)||!s.trainers.some(t=>t.id===p.defenderId)||!Number.isInteger(p.rank)||p.rank<0||p.rank>3||!Number.isFinite(p.startedAt)||!Number.isFinite(p.duration)||p.duration<0)throw Error('Invalid stadium entrance.');}for(let t of s.trainers)if(t.venueReturn){let p=t.venueReturn;if(!s.buildings.some(b=>b.id===p.venueId&&b.type==='league')||!['a','b'].includes(p.side)||p.rank!==null&&(!Number.isInteger(p.rank)||p.rank<0||p.rank>3)||!Number.isFinite(p.startedAt)||p.startedAt<0||!Number.isFinite(p.duration)||p.duration<0||p.duration>10)throw Error('Invalid stadium return.');}}

export function battleVenue(s,b){return s.buildings.find(v=>v.id===b.venueId)|| (b.type==='elite'?s.buildings.find(v=>v.type==='league'):b.type==='tournament'?s.buildings.find(v=>v.id===b.target):null);}
export function battleLocation(s,b){let venue=battleVenue(s,b);return venue?venueBattlePoint(venue):b;}

export function venueCamera(b,width,height){return {x:(b.x+b.w/2)*TILE,y:(b.y+b.h/2+.5)*TILE,zoom:clamp(Math.min((width-40)/((b.w+2)*TILE),(height-120)/((b.h+3)*TILE)),.45,2.6)};}
