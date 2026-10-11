let promptEvent=null,updateReady=false,workerError='',started=false;
const listeners=new Set();
function announce(message){for(const notify of listeners)notify(message);}
// Display mode describes this window; it cannot prove an app exists on the device.
export const installed=()=>!!(window.matchMedia?.('(display-mode: standalone)')?.matches||navigator.standalone);
export const canPromptInstall=()=>!!promptEvent;
export function installDescription(){return promptEvent?'Your browser is ready to show the installation prompt':installed()?'Currently running in an app-style window. Installation status is not confirmed.':'Open installation help or install from your browser menu';}
export const hasAppUpdate=()=>updateReady;
export const installationError=()=>workerError;
export function setupInstall(notify){if(typeof notify==='function')listeners.add(notify);if(started)return;started=true;
 // Preserve Chrome's own install promotion. Do not cancel beforeinstallprompt.
 window.addEventListener('beforeinstallprompt',e=>{promptEvent=e;announce('Feral Regions is ready to install. Use your browser’s install button or Account.');});
 window.addEventListener('appinstalled',()=>{promptEvent=null;announce('Your browser accepted the installation request. Check your home screen when it finishes.');});
 if('serviceWorker' in navigator){let controlled=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(controlled){updateReady=true;announce('An update is ready. Save and reload from Account.');}controlled=true;});navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(r=>r.update()).catch(()=>{workerError='App caching could not start. Check your connection and reopen the HTTPS GitHub Pages address.';});}
}
export async function installApp(){if(promptEvent){let event=promptEvent;promptEvent=null;try{await event.prompt();let result=await event.userChoice;return result.outcome==='accepted'?'Installation requested. Your browser will finish adding Feral Regions to your device.':'Installation dismissed. You can try again from your browser menu.';}catch{workerError='Your browser could not show the installation prompt. Open the game directly in Chrome or Samsung Internet and use its menu.';return workerError;}}return 'No installation prompt is available in this window. Open Installation help for the browser steps. This does not mean the app is installed.';}
export function gameInstallURL(){return new URL('./',window.location.href).href;}
