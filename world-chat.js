// Local NPC dialogue. Its own random stream never changes combat or trainer decisions.
const LIMIT=120;
export function ensureChat(s){
 s.settings??={};
 s.settings.chatCollapsed=s.settings.chatCollapsed!==false;
 if(!s.chat||typeof s.chat!=='object'||Array.isArray(s.chat))s.chat={};
 const c=s.chat;
 c.messages=(Array.isArray(c.messages)?c.messages:[]).filter(m=>m&&Number.isFinite(m.seq)&&Number.isFinite(m.time)&&typeof m.text==='string'&&typeof m.name==='string').slice(-LIMIT).map(m=>({...m,text:m.text.slice(0,360),name:m.name.slice(0,60)}));
 c.serial=Math.max(Number.isFinite(c.serial)?c.serial:0,...c.messages.map(m=>m.seq));
 c.seed=Number.isFinite(c.seed)?c.seed>>>0:((s.seed^0x7fab1234)>>>0)||19;
 c.next=Number.isFinite(c.next)?c.next:s.time+35;
 c.pending=Array.isArray(c.pending)?c.pending.filter(p=>p&&Number.isFinite(p.at)&&typeof p.text==='string'&&typeof p.trainerId==='string').slice(-6).map(p=>({...p,text:p.text.slice(0,360)})):[];
 s.settings.chatRead=Number.isFinite(s.settings.chatRead)?Math.min(c.serial,s.settings.chatRead):c.serial;
 return c;
}
function rng(c){c.seed=(Math.imul(1664525,c.seed)+1013904223)>>>0;return c.seed/4294967296;}
function pick(c,a){return a[Math.floor(rng(c)*a.length)];}
function post(s,name,text,kind='banter',trainerId=null,eventId=null){const c=s.chat;let m={seq:++c.serial,time:s.time,name,text,kind,trainerId,eventId};c.messages.push(m);if(c.messages.length>LIMIT)c.messages.splice(0,c.messages.length-LIMIT);return m;}
function reply(s,t,text){if(s.chat.pending.length<6)s.chat.pending.push({at:s.time+4,trainerId:t.id,text});}
export function chatEvent(s,e){if(!s.chat)ensureChat(s);let t=s.trainers.find(t=>t.id===e.trainerId),c=s.chat,text=e.text,name='Region bulletin';
 if(t){name=t.name;let rest=text.startsWith(t.name+' ')?text.slice(t.name.length+1):text;
 const starters={arrival:'Just arrived! Where do I pick up my first Feral?',starter:'My first partner! '+rest,catch:'I '+rest,badge:'I '+rest,gym:'Time for a gym battle. '+rest,evolution:'Team update: '+rest,elite:rest,tournament:rest};text=starters[e.kind]||rest;
 }
 post(s,name,text,e.kind,t?.id||null,e.id);
 if(t&&['arrival','starter','catch','badge','evolution','elite'].includes(e.kind)){
  let others=s.trainers.filter(v=>v.id!==t.id);if(others.length){let other=pick(c,others),responses={arrival:['Welcome! The lab is a good first stop.','Welcome! Watch out for the tall grass. It watches back.'],starter:['That is a great first partner.','First rule: snacks are shared. Your Feral will enforce it.'],catch:e.text.includes('SHINY')?['A shiny?! Okay, I am officially jealous.','One in a hundred and you found it. Incredible!']:['Nice catch! Save an orb for the next one.','Your collection is getting serious.'],badge:['Congratulations! That badge was earned.','Save me a spot in the victory photo!'],evolution:['Your partner just got a serious upgrade.','Same friend, much bigger food bill.'],elite:['That League ladder is getting interesting!','Looks like we have a new trainer to beat.']};reply(s,other,pick(c,responses[e.kind]));}
 }
}
const jokes=[
 ['My Feral ate my route map.','At least one of you knows the route now.'],
 ['Why did the Gravahound cross the path?','Because somebody said “walkies.”'],
 ['I practiced my victory pose today.','Excellent. Now practice the victory part.'],
 ['My partner is carrying the team.','Does that include carrying your backpack?'],
 ['The grass moved. I am sure of it.','That is either a Feral or a very confident breeze.'],
 ['I packed enough snacks for six Ferals.','So you packed enough for one Gravahound?'],
 ['My binding orb missed. Again.','Have you considered throwing it toward the Feral?'],
 ['Do champions still have to buy their own lunch?','Become champion and report back. Important research.'],
 ['I am naming my next Feral “Tax Deduction.”','The supply shop is going to have questions.'],
 ['My team held a meeting without me.','Let me guess: more snacks, fewer battles?'],
 ['I found a shortcut!','If it goes through tall grass, that is an encounter with directions.'],
 ['I told my Feral to use strategy. It took a nap.','Resource conservation. Advanced strategy.'],
 ['I am undefeated in imaginary battles.','The imaginary Elite Four must be terrified.'],
 ['I brought a spare orb for good luck.','Bring five more for actual catching.'],
 ['Someone should open a Feral daycare.','The Gravahounds would call it a chew toy buffet.'],
 ['Training is going well. My legs are sore.','Your Feral knows it is supposed to do the battling, right?'],
 ['Today feels like a shiny day.','Every day feels like a shiny day until the grass says otherwise.'],
 ['My partner has mastered the dramatic entrance.','Now we just need to work on the graceful exit.']
];
export function chatTick(s){if(!s.chat)ensureChat(s);let c=s.chat;
 for(let p of c.pending.filter(p=>p.at<=s.time)){let t=s.trainers.find(t=>t.id===p.trainerId);if(t)post(s,t.name,p.text,'banter',t.id);}c.pending=c.pending.filter(p=>p.at>s.time);
 if(s.time<c.next)return;c.next=s.time+45+rng(c)*30;
 let available=s.trainers.filter(t=>!['battle','starter'].includes(t.state));if(!available.length)return;let t=pick(c,available),other=pick(c,available.filter(v=>v.id!==t.id)),pair=pick(c,jokes);
 // Ground some conversations in the speaker's actual team and current ambitions.
 if(rng(c)<.45){let f=t.team?.[0],goal=t.mindset,area=s.areas?.find(a=>a.open);if(t.state==='heal')pair=['Healing break. My team has earned it.','A fresh team beats a rushed team.'];else if(t.state==='shop')pair=['Restocking orbs. My wallet noticed.','An orb in the bag is better than a Feral that got away.'];else if(goal==='collect')pair=[`Still working on my collection${area?' around '+area.name:''}.`,'One new species at a time. You will get there.'];else if(goal==='money')pair=['A little training, a little gold. That is the plan.','Remember to budget for healing and orbs.'];else if(goal==='best')pair=[`Training for my next badge. I have ${t.badges.length} so far.`,'The League is a long road. Keep at it.'];else if(f)pair=[`${f.species} and I are training together. Level ${f.level} and counting!`,'That partnership is going places.'];}
 post(s,t.name,pair[0],'banter',t.id);if(other)reply(s,other,pair[1]);
}
export function chatUnread(s){return Math.min(99,s.chat.messages.filter(m=>m.seq>(s.settings.chatRead||0)).length);}
