import {SPECIES,MOVES,effectiveness} from './data.js';
// Select from the existing active party; never exchange reserves during a battle.
export function bestCombatant(team,opponent,stats,{training=false,manual=false}={}){
 let living=team.map((f,i)=>({f,i})).filter(v=>v.f.hp>0);if(!living.length)return 0;if(manual||!opponent)return living[0].i;
 let leading=Math.max(...living.map(v=>v.f.level)),enemy=stats(opponent),type=SPECIES[opponent.species].type;
 let scores=living.map(({f,i})=>{let a=stats(f),moves=f.moves.filter(k=>MOVES[k]),attack=Math.max(30,...moves.map(k=>(MOVES[k].power||0)*effectiveness(MOVES[k].type,type)*(MOVES[k].type===SPECIES[f.species].type?1.2:1))),score=(5+f.level*.9)*attack*a.attack/Math.max(1,enemy.defense)*(0.5+0.5*f.hp/a.hp);
 let danger=Math.max(.7,effectiveness(SPECIES[opponent.species].type,SPECIES[f.species].type));score/=Math.sqrt(danger);return {i,f,score};});let strongest=Math.max(...scores.map(v=>v.score));for(let v of scores)if(training&&v.f.level<=leading-2&&v.f.hp/stats(v.f).hp>.7&&v.score>=strongest*.65)v.score*=1.3;scores.sort((a,b)=>b.score-a.score);return scores[0].i;
}
