// Runtime-only initialization stamps; saves contain no cache metadata.
const stamps=new WeakMap();
export function initialized(s,key){let all=stamps.get(s);if(!all){all=new Map();stamps.set(s,all);}let old=all.get(key),next=[s.trainers,s.trainers.length,s.buildings,s.buildings.length];if(old&&old.every((v,i)=>v===next[i]))return true;all.set(key,next);return false;}
