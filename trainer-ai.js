import {SPECIES,MOVES,TYPES,effectiveness,clamp,defaultMoves} from './data.js';
import {stats,random} from './battle.js';
import {trainerPreference} from './collection.js';
import {connected,door,reachableAreaIds,habitatGroups,candidates,dist} from './world.js';
import {serviceOpen} from './businesses.js';

// Every preference serves the same ambition. This memory is saved with the trainer.
export const AMBITION_VERSION=1;
export const LEAGUE_COOLDOWN=5*240;
export const GYM_REMATCH_COOLDOWN=7*240;
export const gymWinPrize=(gym,rematch=false)=>rematch?35+gym.order*15:35+gym.order*10;
export const RISK={Bold:{level:.82,ratio:.34,health:.65,heal:.38,retry:65},Strategist:{level:.87,ratio:.40,health:.73,heal:.48,retry:80},Collector:{level:.88,ratio:.39,health:.72,heal:.48,retry:80},Wanderer:{level:.86,ratio:.37,health:.68,heal:.43,retry:70},Patient:{level:.96,ratio:.48,health:.82,heal:.60,retry:95}};
export const riskProfile=t=>RISK[t.trait]||RISK.Bold;
export const leadLevel=t=>Math.max(1,...t.team.map(f=>f.level));
export const teamHealth=t=>t.team.reduce((n,f)=>n+Math.min(stats(f).hp,f.hp),0)/Math.max(1,t.team.reduce((n,f)=>n+stats(f).hp,0));
export function ensureAmbition(s,t){
 t.leagueReadyAt??=0;t.gymRematches??={};for(let order of t.badges){if(!t.gymRematches[order]){let gym=s.buildings.find(b=>b.type==='gym'&&b.order===order),last=gym?.gymStats?.recent?.find(v=>v.trainerId===t.id&&v.trainerWon)?.time??s.time;t.gymRematches[order]={readyAt:Math.max(0,last+GYM_REMATCH_COOLDOWN),lastAt:last,wins:0,losses:0};}} if(!t.ai){t.ai={version:AMBITION_VERSION,objective:'gym',targetKey:null,targetRank:null,reason:'Working toward Champion',areaId:null,areaUntil:0,lastProgress:s.time,lastBadgeCount:t.badges.length,lastRank:s.elites.indexOf(t.id),nextSideAt:s.time+45,lastChallengeAt:0,attempts:[],setbacks:[],opponentTypes:[],savingsTarget:80,supplyPlan:{orbs:4,tonics:2}};t.cooldown=Math.min(t.cooldown||0,s.time+120);t.rankRetry=Math.min(t.rankRetry||0,s.time+120);}
 t.ai.savingsTarget??=80;t.ai.supplyPlan??={orbs:4,tonics:2};return t.ai;
}
export function ambitionTarget(s,t){
 ensureAmbition(s,t);let rank=s.elites.indexOf(t.id),order=Array.from({length:8},(_,i)=>i+1).find(n=>!t.badges.includes(n));
 if(order){let gym=s.buildings.find(b=>b.type==='gym'&&b.order===order);return {kind:gym?'gym':'waiting',key:'gym:'+order,label:gym?gym.name:'Gym '+order+' to be built',gym,building:gym,team:gym?.team||[],rank:null,order};}
 let hall=s.buildings.find(b=>b.type==='league');if(!hall)return {kind:'waiting',key:'league-missing',label:'the Elite Four hall to be built',team:[],rank:null};
 if(rank>=0)return {kind:'defend',key:'defend:'+rank,label:rank===0?'defend the Champion title':'defend the #'+(rank+1)+' seat',building:hall,team:[],rank,opponent:null};
 let targetRank=3,opponent=s.trainers.find(q=>q.id===s.elites[targetRank]);return {kind:'elite',key:'elite:'+(opponent?.id||'vacant-'+targetRank),label:opponent?'#'+(targetRank+1)+' '+opponent.name:'the vacant #'+(targetRank+1)+' seat',building:hall,team:opponent?.team||[],rank:targetRank,opponent};
}
export function matchup(f,opponents){if(!opponents.length)return 1;let moves=f.moves?.length?f.moves:defaultMoves(f.species,f.level);return opponents.reduce((n,o)=>n+Math.max(...moves.map(k=>effectiveness(MOVES[k]?.type||SPECIES[f.species].type,SPECIES[o.species].type))),0)/opponents.length;}
export function feralPower(f){let a=stats(f),moves=f.moves?.length?f.moves:defaultMoves(f.species,f.level),power=Math.max(30,...moves.map(k=>MOVES[k]?.power||0));return (a.hp+a.attack*2+a.defense)*(0.8+power/250);}
export function teamPower(team,opponents=[]){return team.reduce((n,f)=>n+feralPower(f)*clamp(.8+matchup(f,opponents)*.2,.85,1.15),0);}
export function challengeMemory(t,key){return t.ai?.attempts.find(v=>v.key===key)||null;}
export function partySignature(t){return t.team.map(f=>f.id+':'+f.species+':'+f.level+':'+f.moves.join(',')).join('|');}
export function assessChallenge(s,t,target=ambitionTarget(s,t)){
 let ai=ensureAmbition(s,t),profile=riskProfile(t),memory=challengeMemory(t,target.key),level=Math.max(1,...target.team.map(f=>f.level)),losses=memory?.losses||0,stale=s.time-ai.lastProgress>=360;
 let required=Math.max(1,Math.min(75,Math.ceil(level*profile.level)+Math.min(5,Math.floor(losses/2))-(stale&&losses===0?1:0))),ratio=target.team.length?teamPower(t.team,target.team)/Math.max(1,teamPower(target.team,t.team)):Infinity;
 let near=leadLevel(t)>=required&&(ratio>=profile.ratio||stale&&ratio>=profile.ratio*.85),healthy=teamHealth(t)>=profile.health,at=target.kind==='gym'?t.cooldown:Math.max(t.rankRetry||0,t.leagueReadyAt||0),trained=!memory||memory.lastWon||leadLevel(t)>memory.level||t.explorations>=memory.explorations+2||partySignature(t)!==memory.party;
 let route=!!target.building&&connected(s,t,door(target.building)),ready=['gym','elite'].includes(target.kind)&&near&&healthy&&s.time>=(at||0)&&trained&&route,reasons=[];
 if(target.kind==='waiting')reasons.push('Waiting for '+target.label+'. Training and side interests continue.');
 if(!near)reasons.push(`Preparing for ${target.label}: leading Feral needs about Lv ${required}; team strength ${Math.round(ratio*100)}% of the opponent.`);
 if(!healthy)reasons.push('Recover the team before the next challenge.');
 if(s.time<(at||0))reasons.push(target.kind==='elite'&&t.leagueReadyAt>s.time?`Elite Four run cooldown: ${((t.leagueReadyAt-s.time)/240).toFixed(1)} game-days remaining. Training continues.`:`Training break: ${Math.ceil(at-s.time)} game-seconds remaining.`);
 if(!trained)reasons.push('After the last loss, gain a level, improve the party, or complete two training encounters before retrying.');
 if(target.building&&!route)reasons.push('No reachable route to '+target.building.name+'.');
 if(ready)reasons.push('Competitive enough to try '+target.label+'. A win is not guaranteed.');
 return {target,required,ratio,near,healthy,trained,route,ready,reasons,losses};
}
export function updateAmbition(s,t,target=ambitionTarget(s,t)){
 let ai=ensureAmbition(s,t),rank=s.elites.indexOf(t.id);if(ai.lastBadgeCount!==t.badges.length||rank>=0&&(ai.lastRank<0||rank<ai.lastRank)){ai.lastProgress=s.time;ai.areaUntil=0;}ai.lastBadgeCount=t.badges.length;ai.lastRank=rank;
 if(ai.targetKey!==target.key){ai.areaId=null;ai.areaUntil=0;}ai.targetKey=target.key;ai.targetRank=target.rank;ai.objective=target.kind;ai.opponentTypes=[...new Set(target.team.map(f=>SPECIES[f.species].type))];ai.savingsTarget=trainerPreference(t)==='money'?Math.max(150,(target.building?.fee||0)*3+48):Math.max(40,(target.building?.fee||0)+24);return target;
}
export function noteChallenge(s,t,target,won){
 let ai=ensureAmbition(s,t),memory=challengeMemory(t,target.key);if(!memory){memory={key:target.key,wins:0,losses:0,lastAt:0,lastWon:false,level:1,explorations:0,party:''};ai.attempts.push(memory);}memory[won?'wins':'losses']++;Object.assign(memory,{lastAt:s.time,lastWon:won,level:leadLevel(t),explorations:t.explorations,party:partySignature(t)});ai.attempts=ai.attempts.slice(-16);ai.lastChallengeAt=s.time;ai.areaUntil=0;ai.nextSideAt=s.time+120;
 let delay=won?45:riskProfile(t).retry+Math.min(120,memory.losses*20);if(target.kind==='gym')t.cooldown=s.time+delay;else t.rankRetry=s.time+delay;
 ai.reason=won?'Won '+target.label+'. Pushing toward the next challenge.':'Lost to '+target.label+'. Improve the party and train before the next attempt.';
}
export function noteWildResult(s,t,areaId,won){if(!areaId)return;let ai=ensureAmbition(s,t),v=ai.setbacks.find(v=>v.areaId===areaId);if(!v){v={areaId,losses:0,lastAt:0};ai.setbacks.push(v);}v.losses=won?Math.max(0,v.losses-1):Math.min(5,v.losses+1);v.lastAt=s.time;ai.setbacks=ai.setbacks.slice(-12);if(!won)ai.areaUntil=0;}
export function prepareParty(t,target){
 if(t.manualTeam||t.battleId||t.tournamentId)return false;
 let lead=leadLevel(t),before=t.team.map(f=>f.id).join('|'),chosen=[],types=new Set(),pool=[...t.team,...t.storage].filter(f=>f.id!==t.craft?.helperId).map(f=>({f,type:SPECIES[f.species].type,score:feralPower(f)*(.65+.35*Math.min(1,f.level/lead))*clamp(.65+matchup(f,target.team)*.35,.75,1.3)}));
 // Compute matchup scores once, then use six linear selections instead of repeated sorts.
 while(chosen.length<6&&pool.length){let best=0,bestScore=-Infinity;for(let i=0;i<pool.length;i++){let score=pool[i].score+(types.has(pool[i].type)?0:12);if(score>bestScore){best=i;bestScore=score;}}let entry=pool.splice(best,1)[0];chosen.push(entry.f);types.add(entry.type);}
 let changed=before!==chosen.map(f=>f.id).join('|');if(changed){t.team=chosen;t.storage=[...pool.map(v=>v.f),...t.storage.filter(f=>f.id===t.craft?.helperId)];}return changed;
}
export function trainingArea(s,t,target=ambitionTarget(s,t)){
 let ai=ensureAmbition(s,t),reachable=reachableAreaIds(s,t),lead=leadLevel(t),preference=trainerPreference(t),known=new Set([...t.team,...t.storage].map(f=>f.species)),counterNeeded=target.team.length&&t.team.every(f=>matchup(f,target.team)<1.15),goalLevel=Math.min(75,Math.max(lead+1,Math.min(lead+3,Math.max(1,...target.team.map(f=>f.level))))),available=habitatGroups(s).filter(g=>reachable.has(g.area.id)&&g.area.requiredBadges<=t.badges.length&&g.area.min<=lead+4&&candidates(s,g.area.biome,g.area).length);
 let scored=available.map(g=>{let a=g.area,list=candidates(s,a.biome,a),mid=(a.min+a.max)/2,over=Math.max(0,a.max-lead-6-Math.min(t.trait==='Patient'?3:6,Math.max(0,t.team.length-1))),under=Math.max(0,lead-a.max+2),memory=ai.setbacks.find(v=>v.areaId===a.id),danger=(memory?.losses||0)*(s.time-(memory?.lastAt||0)<240?12:3),missing=list.filter(f=>!known.has(f.name)).length,goodCounters=list.filter(f=>target.team.some(o=>effectiveness(f.type,SPECIES[o.species].type)>1)).length,marker=g.spots[Math.floor(g.spots.length/2)],travel=dist(t,marker),quest=t.quests?.medium,questBonus=quest?.code==='twoZones'&&quest.zones.includes(a.id)&&(quest.zoneWins[quest.zones.indexOf(a.id)]||0)<5?2:0;
 // Level/risk dominate; collection and quest bonuses are bounded secondary preferences.
 let score=40-Math.abs(mid-goalLevel)*3-under*4-over*2-danger-travel*.07+Math.min(4,missing)*(preference==='collect'?1.3:.25)+(counterNeeded?Math.min(3,goodCounters)*2:0)+questBonus+(t.trait==='Wanderer'&&!t.visitedAreas.includes(a.id)?2:0);
 return {group:g,score};}).sort((a,b)=>b.score-a.score);
 if(!scored.length)return null;let best=scored[0],old=scored.find(v=>v.group.area.id===ai.areaId);if(old&&s.time<ai.areaUntil&&old.score>=best.score-6)best=old;
 if(ai.areaId!==best.group.area.id||s.time>=ai.areaUntil){ai.areaId=best.group.area.id;ai.areaUntil=s.time+120;}let g=best.group,spot=g.spots[Math.floor(random(s)*g.spots.length)];for(let i=0;i<4;i++){let candidate=g.spots[Math.floor(random(s)*g.spots.length)];if(dist(t,candidate)<dist(t,spot))spot=candidate;}
 ai.reason=(target.kind==='waiting'?'Keep improving while waiting for '+target.label:'Training toward '+target.label)+' in '+g.area.name+(counterNeeded?' and looking for useful counters.':'.');return {area:g.area,spot,score:best.score};
}
export function affordableShop(s,t,needsOrbs,needsTonics){return s.buildings.filter(b=>b.type==='shop'&&serviceOpen(b)&&connected(s,t,door(b))&&((needsOrbs&&b.stock?.orbs>0&&t.money>=b.fee)||(needsTonics&&b.stock?.tonics>0&&t.money>=24))).sort((a,b)=>(dist(t,door(a))*.3+a.fee)-(dist(t,door(b))*.3+b.fee))[0]||null;}
export function needsSupplies(t){let preference=trainerPreference(t),minimum=t.team.length<3?2:preference==='collect'?2:1,ai=t.ai;let plan={orbs:preference==='money'?(t.team.length<3?3:2):preference==='collect'?6:4,tonics:preference==='money'||preference==='collect'?1:2};if(ai)ai.supplyPlan=plan;return {orbs:t.orbs<minimum,tonics:t.potions<1&&(preference!=='money'||t.money>=48)};}
export function shouldSocialize(s,t,assessment){let ai=ensureAmbition(s,t);return !assessment.ready&&s.time>=ai.nextSideAt&&s.time-ai.lastChallengeAt>45;}

export function noteGymRematch(s,t,gym,won){ensureAmbition(s,t);if(!t.badges.includes(gym.order))return;let q=t.gymRematches[gym.order]??={readyAt:0,lastAt:0,wins:0,losses:0};q.readyAt=s.time+GYM_REMATCH_COOLDOWN;q.lastAt=s.time;q[won?'wins':'losses']++;t.gymRematchAt=Math.min(...Object.values(t.gymRematches).map(v=>v.readyAt));}
export function rematchReady(s,t,gym){ensureAmbition(s,t);return t.badges.includes(gym.order)&&s.time>=(t.gymRematches[gym.order]?.readyAt??Infinity);}
export function selectGymRematch(s,t){return s.buildings.filter(g=>g.type==='gym'&&rematchReady(s,t,g)&&assessChallenge(s,t,{kind:'gym',key:'rematch:'+g.order,label:g.name,building:g,team:g.team,rank:null}).ready).sort((a,b)=>(gymWinPrize(b,true)-dist(t,door(b))*.2)-(gymWinPrize(a,true)-dist(t,door(a))*.2))[0]||null;}
export function validateAmbitions(s){for(let t of s.trainers){if(t.leagueReadyAt!=null&&(!Number.isFinite(t.leagueReadyAt)||t.leagueReadyAt<0))throw Error('Invalid Elite Four cooldown.');let ai=ensureAmbition(s,t);if(!t.gymRematches||typeof t.gymRematches!=='object'||Array.isArray(t.gymRematches)||Object.keys(t.gymRematches).some(k=>! /^[1-8]$/.test(k)))throw Error('Invalid gym rematch schedule.');for(let q of Object.values(t.gymRematches)){if(!q||['readyAt','lastAt','wins','losses'].some(k=>!Number.isFinite(q[k])||q[k]<0)||!Number.isInteger(q.wins)||!Number.isInteger(q.losses))throw Error('Invalid gym rematch record.');}if(ai.version!==AMBITION_VERSION||!['gym','elite','defend','waiting'].includes(ai.objective)||ai.targetKey!==null&&typeof ai.targetKey!=='string'||typeof ai.reason!=='string'||ai.reason.length>400||ai.targetRank!==null&&(!Number.isInteger(ai.targetRank)||ai.targetRank<0||ai.targetRank>3)||ai.areaId!==null&&typeof ai.areaId!=='string'||!Array.isArray(ai.attempts)||ai.attempts.length>16||!Array.isArray(ai.setbacks)||ai.setbacks.length>12||!Array.isArray(ai.opponentTypes)||ai.opponentTypes.some(v=>!TYPES[v]))throw Error('Invalid trainer ambition.');for(let k of ['areaUntil','lastProgress','lastBadgeCount','nextSideAt','lastChallengeAt','savingsTarget'])if(!Number.isFinite(ai[k])||ai[k]<0)throw Error('Invalid trainer plan.');if(!ai.supplyPlan||!Number.isInteger(ai.supplyPlan.orbs)||ai.supplyPlan.orbs<0||ai.supplyPlan.orbs>6||!Number.isInteger(ai.supplyPlan.tonics)||ai.supplyPlan.tonics<0||ai.supplyPlan.tonics>3)throw Error('Invalid supply budget.');if(!Number.isInteger(ai.lastRank)||ai.lastRank< -1||ai.lastRank>3)throw Error('Invalid trainer rank memory.');for(let m of ai.attempts){if(typeof m.key!=='string'||typeof m.lastWon!=='boolean'||typeof m.party!=='string'||m.party.length>6000||['wins','losses','lastAt','level','explorations'].some(k=>!Number.isFinite(m[k])||m[k]<0))throw Error('Invalid challenge memory.');}for(let m of ai.setbacks)if(typeof m.areaId!=='string'||!Number.isInteger(m.losses)||m.losses<0||m.losses>5||!Number.isFinite(m.lastAt)||m.lastAt<0)throw Error('Invalid training memory.');}}

export {trainerPreference} from './collection.js';
