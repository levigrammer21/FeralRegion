import {TILE} from './world.js';
import {builtInSeats,legacyVenue} from './venues.js';
const bases=new Map(),rect=(c,x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(x,y,w,h);};
const ellipse=(c,x,y,rx,ry,col)=>{c.fillStyle=col;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();};
const ranks=['#1','#2','#3','#4'],rankColors=['#ebcb74','#8d85c6','#72a6bb','#799c7b'];
function flag(c,x,y,col){rect(c,x,y,2,23,'#cfc2a0');rect(c,x+2,y+2,14,13,col);c.fillStyle=col;c.beginPath();c.moveTo(x+2,y+15);c.lineTo(x+9,y+20);c.lineTo(x+16,y+15);c.fill();rect(c,x+7,y+5,4,7,'#f7e5b7');}
function court(c,x,y,w,h,col='#85a4a1'){
 rect(c,x-4,y-4,w+8,h+8,'#3b545e');rect(c,x-2,y-2,w+4,h+4,'#d6cbb3');rect(c,x,y,w,h,col);rect(c,x,y,w/2,h,'#99b7ad');rect(c,x+w/2,y,w/2,h,'#7496a2');
 c.strokeStyle='#eef0dc';c.lineWidth=2;c.strokeRect(x+5,y+5,w-10,h-10);c.beginPath();c.moveTo(x+w/2,y+5);c.lineTo(x+w/2,y+h-5);c.stroke();c.beginPath();c.arc(x+w/2,y+h/2,Math.min(w,h)*.22,0,Math.PI*2);c.stroke();
 ellipse(c,x+w*.25,y+h*.5,w*.11,h*.18,'#edeee341');ellipse(c,x+w*.75,y+h*.5,w*.11,h*.18,'#edeee341');
 c.strokeStyle='#edeee3';c.beginPath();c.ellipse(x+w*.25,y+h*.5,w*.11,h*.18,0,0,Math.PI*2);c.ellipse(x+w*.75,y+h*.5,w*.11,h*.18,0,0,Math.PI*2);c.stroke();
 c.fillStyle='#f2dfb2';c.beginPath();c.moveTo(x+w/2,y+h/2-9);c.lineTo(x+w/2+8,y+h/2);c.lineTo(x+w/2,y+h/2+9);c.lineTo(x+w/2-8,y+h/2);c.fill();
}
function grandLeague(c){
 ellipse(c,146,133,145,114,'#17353145');rect(c,2,8,284,225,'#495464');rect(c,6,5,276,224,'#a1a5a4');rect(c,10,9,268,216,'#d4d1bb');
 // Fortress corners, gilded cornices, and a four-throne raised balcony.
 for(let x of [5,262]){rect(c,x,0,21,91,'#646f7a');rect(c,x+3,6,15,82,'#b5b9ac');rect(c,x-3,0,27,8,'#e2d4ad');rect(c,x+5,16,11,29,'#405261');rect(c,x+7,18,7,23,'#86adb6');rect(c,x+4,70,13,7,'#ddc184');}
 rect(c,27,4,234,17,'#3b4759');rect(c,28,4,232,2,'#e4c57b');c.fillStyle='#f6dea3';c.textAlign='center';c.font='bold 10px monospace';c.fillText('E L I T E   F O U R',144,17);
 rect(c,28,23,232,58,'#707689');rect(c,30,25,228,53,'#8a8b9b');rect(c,30,78,228,9,'#4b5664');rect(c,29,77,230,3,'#e5cf99');
 for(let rank=3;rank>=0;rank--){let x=(.22+(3-rank)*.185)*288,col=rankColors[rank];rect(c,x-17,31,34,40,'#424b60');rect(c,x-14,27,28,44,col);rect(c,x-11,32,22,29,'#4b425c');rect(c,x-11,61,22,8,'#a89b83');rect(c,x-17,53,6,16,col);rect(c,x+11,53,6,16,col);rect(c,x-11,68,4,8,'#64595b');rect(c,x+7,68,4,8,'#64595b');if(rank===0){c.fillStyle='#ffe3a2';c.beginPath();c.moveTo(x-10,27);c.lineTo(x-12,19);c.lineTo(x-4,24);c.lineTo(x,16);c.lineTo(x+4,24);c.lineTo(x+12,19);c.lineTo(x+10,27);c.fill();}c.fillStyle='#ffebba';c.font='bold 7px monospace';c.fillText(ranks[rank],x,75);}
 for(let i=0;i<6;i++){let y=87+i*4;rect(c,130-i,y,28+i*2,4,i%2?'#aaa995':'#d7d2b5');}rect(c,138,89,12,24,'#82749b');
 // Audience bleachers: 24 seats on each side, separate from the rank balcony.
 for(let side of [0,1]){let x=side?244:13;rect(c,x-3,108,36,100,'#4c5867');for(let row=0;row<8;row++){rect(c,x,112+row*12,30,8,'#817e76');rect(c,x,112+row*12,30,2,'#d1bc90');for(let col=0;col<3;col++)rect(c,x+2+col*10,115+row*12,6,5,'#617784');}}
 court(c,61,118,166,91);rect(c,127,211,34,29,'#45475b');rect(c,132,212,24,28,'#998aac');for(let y=214;y<238;y+=5)rect(c,126,y,36,1,'#d4c2a1');
 for(let [x,y]of [[49,104],[233,104],[49,211],[233,211]]){rect(c,x-2,y-5,5,18,'#5b6269');rect(c,x-5,y-8,11,5,'#d2ad6e');ellipse(c,x,y-12,4,6,'#efbb68');ellipse(c,x,y-14,2,3,'#fff2b3');}
 flag(c,31,88,'#6b83a4');flag(c,254,88,'#926c9a');rect(c,64,218,42,10,'#435360');rect(c,183,218,42,10,'#435360');c.font='bold 6px monospace';c.fillStyle='#ece3c2';c.fillText('CHALLENGER',85,225);c.fillText('DEFENDER',204,225);
}
function colosseum(c){
 ellipse(c,123,103,117,87,'#18373145');ellipse(c,120,94,118,91,'#817969');ellipse(c,120,91,113,87,'#c6baa0');ellipse(c,120,87,106,79,'#8c8778');ellipse(c,120,85,98,70,'#d7c8a5');
 // Tiered, cutaway Roman stone bowl with individually recessed arches.
 for(let row=0;row<3;row++){c.strokeStyle=row%2?'#ac9b7c':'#ebd9ae';c.lineWidth=4;c.beginPath();c.ellipse(120,86,98-row*8,69-row*7,0,0,Math.PI*2);c.stroke();}
 for(let i=0;i<24;i++){let a=i/24*Math.PI*2,x=120+Math.cos(a)*108,y=90+Math.sin(a)*78;if(y>155&&Math.abs(x-120)<35)continue;rect(c,x-5,y-8,10,15,'#8a7d64');ellipse(c,x,y-7,5,5,'#716b59');rect(c,x-3,y-6,6,12,'#444c4a');rect(c,x-6,y+6,12,2,'#e2cc9e');}
 ellipse(c,120,94,75,48,'#5e756b');ellipse(c,120,94,69,43,'#c5c49b');court(c,62,62,116,66);
 // Front entry: low wall preserves sightlines into the full battle court.
 ellipse(c,120,171,75,12,'#ad9a79');rect(c,71,160,98,15,'#b7a17c');for(let x=75;x<166;x+=11)rect(c,x,160,2,14,'#dec99b');rect(c,107,160,26,30,'#877d69');ellipse(c,120,160,13,12,'#877d69');rect(c,112,161,16,30,'#364946');ellipse(c,120,161,8,8,'#364946');rect(c,106,183,28,5,'#d5c3a0');rect(c,99,188,42,4,'#e2d1ac');
 for(let [x,y,col]of [[35,48,'#a26772'],[200,48,'#668fa5'],[41,141,'#b99a65'],[192,141,'#876e9f']])flag(c,x,y,col);
 rect(c,77,9,86,15,'#4d5653');rect(c,78,9,84,2,'#d8bc7e');c.font='bold 8px monospace';c.fillStyle='#f6dfaa';c.textAlign='center';c.fillText('COLOSSEUM',120,20);
}
function cachedBase(b){let key=b.type+':'+b.w+':'+b.h;if(bases.has(key))return bases.get(key);let w=b.w*TILE,h=b.h*TILE,cv=document.createElement('canvas');cv.width=w+12;cv.height=h+12;let c=cv.getContext('2d');c.translate(6,6);c.scale(w/(b.type==='league'?288:240),h/(b.type==='league'?240:192));(b.type==='league'?grandLeague:colosseum)(c);bases.set(key,cv);return cv;}
export function drawVenue(c,b,s,ui,trainerSprite){let x=b.x*TILE,y=b.y*TILE,w=b.w*TILE,h=b.h*TILE;c.drawImage(cachedBase(b),x-6,y-6);
 let count=b.type==='league'?b.audience?.spectators||0:s.tournaments?.find(e=>e.status==='running'&&e.rules.arenaId===b.id)?.spectators||0;count=Math.min(count,builtInSeats(b));
 c.save();c.translate(x,y);c.scale(w/(b.type==='league'?288:240),h/(b.type==='league'?240:192));
 for(let i=0;i<count;i++){let px,py;if(b.type==='league'){let side=Math.floor(i/24),n=i%24;px=(side?247:16)+(n%3)*10;py=120+Math.floor(n/3)*12;}else{let tier=Math.floor(i/16),angle=(i%16)/16*Math.PI*2;px=120+Math.cos(angle)*(86+tier*9);py=86+Math.sin(angle)*(57+tier*8);}trainerSprite(c,{state:'idle',x:i,color:['#cfa683','#8fabc1','#ac92b3','#9baa79','#c8b171'][i%5]},px,py,s.time,.32);}
 if(b.type==='league'&&b.id){for(let rank=0;rank<4;rank++){let t=s.trainers.find(t=>t.id===s.elites[rank]),px=(.22+(3-rank)*.185)*288;c.font='6px monospace';c.fillStyle=t?'#fff0c6':'#c9c4ac';c.textAlign='center';c.fillText(t?t.name:'VACANT',px,85,45);}}
 c.restore();if(ui.selectedBuilding===b.id){c.strokeStyle='#ffe6a3';c.lineWidth=2;c.strokeRect(x-2,y-2,w+4,h+4);}c.font='bold 9px monospace';let title=b.name,tw=Math.max(95,Math.min(w+30,c.measureText(title).width+18));c.font='bold 9px monospace';c.textAlign='center';rect(c,x+w/2-tw/2,y+h+4,tw,14,'#233c40ed');c.fillStyle='#fff0c7';c.fillText(title,x+w/2,y+h+14,tw-8);
}
export function stadiumBackdrop(c,w,h,type,rankSeats=[],target=3){let league=type==='elite',sky=c.createLinearGradient(0,0,0,h);sky.addColorStop(0,league?'#26364d':'#7b9ca1');sky.addColorStop(1,league?'#6c7891':'#d9c89e');c.fillStyle=sky;c.fillRect(0,0,w,h);
 for(let row=0;row<4;row++){let yy=h*(.17+row*.055);rect(c,0,yy,w,h*.048,row%2?'#79817d':'#a5a795');for(let i=0;i<Math.ceil(w/13);i++){let x=i*13+row%2*6;ellipse(c,x,yy+h*.021,2.5,3,['#dbb98a','#9baec3','#b8a0c5','#d1bf8b'][i%4]);rect(c,x-3,yy+h*.03,6,h*.018,'#485c69');}}
 if(league){for(let i=0;i<4;i++){let x=w*(.19+i*.205),rank=3-i;rect(c,x-w*.036,h*.055,w*.072,h*.15,rankColors[rank]);rect(c,x-w*.027,h*.069,w*.054,h*.10,'#3f3f56');if(rankSeats[rank]&&rank!==target){ellipse(c,x,h*.095,4,4,'#e0ba91');rect(c,x-5,h*.113,10,7,rankSeats[rank].color||'#94a4b5');}c.font='bold '+Math.max(8,w*.018)+'px monospace';c.textAlign='center';c.fillStyle=rank===target?'#fff0ab':'#d4d2c0';c.fillText(ranks[rank],x,h*.2);}}
 else{for(let i=0;i<7;i++){let x=w*(i+.5)/7;rect(c,x-8,h*.05,16,h*.09,'#ccc5aa');ellipse(c,x,h*.065,6,6,'#647875');rect(c,x-6,h*.065,12,h*.06,'#647875');}}
 c.fillStyle=league?'#92aaa4':'#c9c79f';c.beginPath();c.moveTo(w*.06,h*.45);c.lineTo(w*.94,h*.45);c.lineTo(w*1.1,h);c.lineTo(-w*.1,h);c.closePath();c.fill();c.strokeStyle='#edf0db';c.lineWidth=2;c.beginPath();c.moveTo(w*.1,h*.48);c.lineTo(w*.9,h*.48);c.lineTo(w*.99,h*.95);c.lineTo(w*.01,h*.95);c.closePath();c.stroke();c.beginPath();c.moveTo(w*.5,h*.46);c.lineTo(w*.5,h);c.stroke();c.beginPath();c.ellipse(w*.5,h*.71,w*.12,h*.1,0,0,Math.PI*2);c.stroke();rect(c,w*.36,h*.28,w*.28,h*.06,'#263e4dcc');c.font='bold '+Math.max(8,w*.02)+'px monospace';c.fillStyle='#f5dfa5';c.textAlign='center';c.fillText(league?'ELITE FOUR':'TOURNAMENT',w*.5,h*.324);
}
