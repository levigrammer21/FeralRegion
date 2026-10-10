import assert from 'node:assert/strict';
import {Cloud,configureAuthStorage} from './cloud.js';
const quota=()=>new Error("Setting the value exceeded the quota. (auth/internal-error)");
for(let failures=0;failures<3;failures++){let calls=[];const api={indexedDBLocalPersistence:'db',browserSessionPersistence:'session',inMemoryPersistence:'memory',setPersistence:async(a,p)=>{calls.push(p);if(calls.length<=failures)throw quota();}};assert.equal(await configureAuthStorage(api,{}),['db','session','memory'][failures]);assert.equal(calls.length,failures+1);}
let c=new Cloud();c.init=async()=>{};c.auth={};let created=0,signed=0;c.authLib={inMemoryPersistence:'memory',setPersistence:async()=>{},createUserWithEmailAndPassword:async()=>{created++;throw quota();},signInWithEmailAndPassword:async()=>{signed++;return {user:{uid:'test'}};}};assert.equal((await c.email('test@example.com','password',true)).user.uid,'test');assert.equal(created,1);assert.equal(signed,1);assert.equal(c.temporaryLogin,true);
c.authLib.signInWithEmailAndPassword=async()=>{throw Object.assign(new Error('Invalid credentials'),{code:'auth/invalid-credential'});};await assert.rejects(()=>c.email('test@example.com','bad'),/Invalid credentials/);
console.log('Auth storage fallback, post-create quota recovery, and credential-error checks passed.');
