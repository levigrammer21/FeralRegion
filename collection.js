import {SPECIES,TYPES} from './data.js';
export const variantKey=f=>f.species+(f.shiny?'|shiny':'|normal');
export const roster=t=>[...t.team,...t.storage];
export const ownsVariant=(t,f)=>roster(t).some(q=>variantKey(q)===variantKey(f));
// Secondary interests never replace the shared Champion ambition.
export function trainerGoal(t){return 'best';}
export function trainerPreference(t){if(t.mindset==='collect')return 'collect';if(t.mindset==='money')return 'money';if(t.mindset==='best')return 'reputation';return t.trait==='Collector'||t.trait==='Wanderer'?'collect':t.trait==='Patient'?'money':t.trait==='Bold'?'reputation':'balanced';}
export function wantsCatch(t,f){if(ownsVariant(t,f))return false;if(f.shiny)return true;let preference=trainerPreference(t);if(preference==='collect'||t.team.length<3)return true;let type=SPECIES[f.species].type,counter=t.ai?.opponentTypes?.some(v=>TYPES[type]?.strong.includes(v)),newType=t.team.every(q=>SPECIES[q.species].type!==type),lead=Math.max(1,...t.team.map(q=>q.level));return f.level>Math.min(...t.team.map(q=>q.level))||t.team.length<6&&f.level>=lead*.6||counter&&newType&&f.level>=lead*.6;}
export function recordDex(t){t.dex??=[];let keys=new Set(t.dex);for(let f of roster(t))keys.add(variantKey(f));t.dex=[...keys];}
export function swapActive(t,incomingId,outgoingId){if(t.tournamentId||t.battleId||['battle','climbing','gymwait','queued','elite'].includes(t.state))throw Error('Teams cannot change during tournaments, battles, League duty or challenge queues.');let incoming=t.storage.find(f=>f.id===incomingId);if(!incoming)throw Error('Choose a reserve Feral.');if(t.team.length<6){t.storage=t.storage.filter(f=>f.id!==incoming.id);t.team.push(incoming);}else{let i=t.team.findIndex(f=>f.id===outgoingId);if(i<0)throw Error('Choose the active Feral to replace.');let outgoing=t.team[i];t.team[i]=incoming;t.storage=t.storage.filter(f=>f.id!==incoming.id);t.storage.push(outgoing);}t.manualTeam=true;}
export const collectionSize=()=>Object.keys(SPECIES).length*2;
