"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4428],{2957:(z,Z,g)=>{g.d(Z,{G:()=>D});const D={FRONT:"front",BACK:"back"}},2726:(z,Z,g)=>{g.d(Z,{Uw:()=>l,fo:()=>K});var i=g(5861);typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"&&global;var I=function(r){return r.Unimplemented="UNIMPLEMENTED",r.Unavailable="UNAVAILABLE",r}(I||{});class B extends Error{constructor(e,t,a){super(e),this.message=e,this.code=t,this.data=a}}const m=r=>{var e,t,a,d,s;const y=r.CapacitorCustomPlatform||null,c=r.Capacitor||{},C=c.Plugins=c.Plugins||{},p=r.CapacitorPlatforms,H=(null===(e=null==p?void 0:p.currentPlatform)||void 0===e?void 0:e.getPlatform)||(()=>null!==y?y.name:(r=>{var e,t;return null!=r&&r.androidBridge?"android":null!==(t=null===(e=null==r?void 0:r.webkit)||void 0===e?void 0:e.messageHandlers)&&void 0!==t&&t.bridge?"ios":"web"})(r)),ce=(null===(t=null==p?void 0:p.currentPlatform)||void 0===t?void 0:t.isNativePlatform)||(()=>"web"!==H()),ue=(null===(a=null==p?void 0:p.currentPlatform)||void 0===a?void 0:a.isPluginAvailable)||(P=>{const E=N.get(P);return!!(null!=E&&E.platforms.has(H())||te(P))}),te=(null===(d=null==p?void 0:p.currentPlatform)||void 0===d?void 0:d.getPluginHeader)||(P=>{var E;return null===(E=c.PluginHeaders)||void 0===E?void 0:E.find(V=>V.name===P)}),N=new Map,ye=(null===(s=null==p?void 0:p.currentPlatform)||void 0===s?void 0:s.registerPlugin)||((P,E={})=>{const V=N.get(P);if(V)return console.warn(`Capacitor plugin "${P}" already registered. Cannot register plugins twice.`),V.proxy;const j=H(),X=te(P);let $;const me=function(){var w=(0,i.Z)(function*(){return!$&&j in E?$=$="function"==typeof E[j]?yield E[j]():E[j]:null!==y&&!$&&"web"in E&&($=$="function"==typeof E.web?yield E.web():E.web),$});return function(){return w.apply(this,arguments)}}(),q=w=>{let S;const M=(...k)=>{const R=me().then(F=>{const W=((w,S)=>{var M,k;if(!X){if(w)return null===(k=w[S])||void 0===k?void 0:k.bind(w);throw new B(`"${P}" plugin is not implemented on ${j}`,I.Unimplemented)}{const R=null==X?void 0:X.methods.find(F=>S===F.name);if(R)return"promise"===R.rtype?F=>c.nativePromise(P,S.toString(),F):(F,W)=>c.nativeCallback(P,S.toString(),F,W);if(w)return null===(M=w[S])||void 0===M?void 0:M.bind(w)}})(F,w);if(W){const Y=W(...k);return S=null==Y?void 0:Y.remove,Y}throw new B(`"${P}.${w}()" is not implemented on ${j}`,I.Unimplemented)});return"addListener"===w&&(R.remove=(0,i.Z)(function*(){return S()})),R};return M.toString=()=>`${w.toString()}() { [capacitor code] }`,Object.defineProperty(M,"name",{value:w,writable:!1,configurable:!1}),M},ne=q("addListener"),re=q("removeListener"),Pe=(w,S)=>{const M=ne({eventName:w},S),k=function(){var F=(0,i.Z)(function*(){const W=yield M;re({eventName:w,callbackId:W},S)});return function(){return F.apply(this,arguments)}}(),R=new Promise(F=>M.then(()=>F({remove:k})));return R.remove=(0,i.Z)(function*(){console.warn("Using addListener() without 'await' is deprecated."),yield k()}),R},ee=new Proxy({},{get(w,S){switch(S){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return X?Pe:ne;case"removeListener":return re;default:return q(S)}}});return C[P]=ee,N.set(P,{name:P,proxy:ee,platforms:new Set([...Object.keys(E),...X?[j]:[]])}),ee});return c.convertFileSrc||(c.convertFileSrc=P=>P),c.getPlatform=H,c.handleError=P=>r.console.error(P),c.isNativePlatform=ce,c.isPluginAvailable=ue,c.pluginMethodNoop=(P,E,V)=>Promise.reject(`${V} does not have an implementation of "${E}".`),c.registerPlugin=ye,c.Exception=B,c.DEBUG=!!c.DEBUG,c.isLoggingEnabled=!!c.isLoggingEnabled,c.platform=c.getPlatform(),c.isNative=c.isNativePlatform(),c},A=(r=>r.Capacitor=m(r))(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),K=A.registerPlugin;class l{constructor(e){this.listeners={},this.windowListeners={},e&&(console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=e)}addListener(e,t){var a=this;this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t);const s=this.windowListeners[e];s&&!s.registered&&this.addWindowListener(s);const y=function(){var C=(0,i.Z)(function*(){return a.removeListener(e,t)});return function(){return C.apply(this,arguments)}}(),c=Promise.resolve({remove:y});return Object.defineProperty(c,"remove",{value:(C=(0,i.Z)(function*(){console.warn("Using addListener() without 'await' is deprecated."),yield y()}),function(){return C.apply(this,arguments)})}),c;var C}removeAllListeners(){var e=this;return(0,i.Z)(function*(){e.listeners={};for(const t in e.windowListeners)e.removeWindowListener(e.windowListeners[t]);e.windowListeners={}})()}notifyListeners(e,t){const a=this.listeners[e];a&&a.forEach(d=>d(t))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:a=>{this.notifyListeners(t,a)}}}unimplemented(e="not implemented"){return new A.Exception(e,I.Unimplemented)}unavailable(e="not available"){return new A.Exception(e,I.Unavailable)}removeListener(e,t){var a=this;return(0,i.Z)(function*(){const d=a.listeners[e];if(!d)return;const s=d.indexOf(t);a.listeners[e].splice(s,1),a.listeners[e].length||a.removeWindowListener(a.windowListeners[e])})()}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}}const h=r=>encodeURIComponent(r).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),T=r=>r.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class O extends l{getCookies(){return(0,i.Z)(function*(){const e=document.cookie,t={};return e.split(";").forEach(a=>{if(a.length<=0)return;let[d,s]=a.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");d=T(d).trim(),s=T(s).trim(),t[d]=s}),t})()}setCookie(e){return(0,i.Z)(function*(){try{const t=h(e.key),a=h(e.value),d=`; expires=${(e.expires||"").replace("expires=","")}`,s=(e.path||"/").replace("path=",""),y=null!=e.url&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${a||""}${d}; path=${s}; ${y};`}catch(t){return Promise.reject(t)}})()}deleteCookie(e){return(0,i.Z)(function*(){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}})()}clearCookies(){return(0,i.Z)(function*(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${(new Date).toUTCString()};path=/`)}catch(e){return Promise.reject(e)}})()}clearAllCookies(){var e=this;return(0,i.Z)(function*(){try{yield e.clearCookies()}catch(t){return Promise.reject(t)}})()}}K("CapacitorCookies",{web:()=>new O});const ie=function(){var r=(0,i.Z)(function*(e){return new Promise((t,a)=>{const d=new FileReader;d.onload=()=>{const s=d.result;t(s.indexOf(",")>=0?s.split(",")[1]:s)},d.onerror=s=>a(s),d.readAsDataURL(e)})});return function(t){return r.apply(this,arguments)}}();class le extends l{request(e){return(0,i.Z)(function*(){const t=((r,e={})=>{const t=Object.assign({method:r.method||"GET",headers:r.headers},e),d=((r={})=>{const e=Object.keys(r);return Object.keys(r).map(d=>d.toLocaleLowerCase()).reduce((d,s,y)=>(d[s]=r[e[y]],d),{})})(r.headers)["content-type"]||"";if("string"==typeof r.data)t.body=r.data;else if(d.includes("application/x-www-form-urlencoded")){const s=new URLSearchParams;for(const[y,c]of Object.entries(r.data||{}))s.set(y,c);t.body=s.toString()}else if(d.includes("multipart/form-data")){const s=new FormData;if(r.data instanceof FormData)r.data.forEach((c,C)=>{s.append(C,c)});else for(const c of Object.keys(r.data))s.append(c,r.data[c]);t.body=s;const y=new Headers(t.headers);y.delete("content-type"),t.headers=y}else(d.includes("application/json")||"object"==typeof r.data)&&(t.body=JSON.stringify(r.data));return t})(e,e.webFetchExtra),a=((r,e=!0)=>r?Object.entries(r).reduce((a,d)=>{const[s,y]=d;let c,C;return Array.isArray(y)?(C="",y.forEach(p=>{c=e?encodeURIComponent(p):p,C+=`${s}=${c}&`}),C.slice(0,-1)):(c=e?encodeURIComponent(y):y,C=`${s}=${c}`),`${a}&${C}`},"").substr(1):null)(e.params,e.shouldEncodeUrlParams),d=a?`${e.url}?${a}`:e.url,s=yield fetch(d,t),y=s.headers.get("content-type")||"";let C,p,{responseType:c="text"}=s.ok?e:{};switch(y.includes("application/json")&&(c="json"),c){case"arraybuffer":case"blob":p=yield s.blob(),C=yield ie(p);break;case"json":C=yield s.json();break;default:C=yield s.text()}const J={};return s.headers.forEach((H,Q)=>{J[Q]=H}),{data:C,headers:J,status:s.status,url:s.url}})()}get(e){var t=this;return(0,i.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"GET"}))})()}post(e){var t=this;return(0,i.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"POST"}))})()}put(e){var t=this;return(0,i.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"PUT"}))})()}patch(e){var t=this;return(0,i.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"PATCH"}))})()}delete(e){var t=this;return(0,i.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"DELETE"}))})()}}K("CapacitorHttp",{web:()=>new le})},9825:(z,Z,g)=>{g.d(Z,{f:()=>i});var i=function(v){return v.POST="POST",v.PUT="PUT",v.DELETE="DELETE",v}(i||{})},5512:(z,Z,g)=>{g.d(Z,{J:()=>x});var i=g(5861),v=g(3009),D=g(6689),L=g(5423),G=g(6815);let x=(()=>{var b;class I{constructor(u,m){this.storage=u,this.utility=m}get(){var u=this;return(0,i.Z)(function*(){return u.orderByFamille(yield u.storage.get(v.K.Articles))})()}post(u){var m=this;return(0,i.Z)(function*(){yield m.storage.post(v.K.Articles,u)})()}put(u){var m=this;return(0,i.Z)(function*(){yield m.storage.put(v.K.Articles,u)})()}delete(u){var m=this;return(0,i.Z)(function*(){yield m.storage.delete(v.K.Articles,u)})()}deleteDefinitivement(u){var m=this;return(0,i.Z)(function*(){yield m.storage.deleteDefinitivement(v.K.Articles,u)})()}getArticleById(u){var m=this;return(0,i.Z)(function*(){return(yield m.get()).filter(A=>A.id==u)})()}getArticleByCodeBarre(u){var m=this;return(0,i.Z)(function*(){return(yield m.get()).filter(A=>A.codeBarre==u)})()}orderByFamille(u){return u.sort((m,_)=>m.familleId<_.familleId?-1:1)}}return(b=I).\u0275fac=function(u){return new(u||b)(D.LFG(L.V),D.LFG(G.t))},b.\u0275prov=D.Yz7({token:b,factory:b.\u0275fac,providedIn:"root"}),I})()},1934:(z,Z,g)=>{g.d(Z,{k:()=>x});var i=g(5861),v=g(2726);g(2957);const L=(0,v.fo)("BarcodeScanner",{web:()=>g.e(7606).then(g.bind(g,7606)).then(b=>new b.BarcodeScannerWeb)});var G=g(6689);let x=(()=>{var b;class I{constructor(){}checkPermission(){return(0,i.Z)(function*(){try{return!!(yield L.checkPermission({force:!0})).granted}catch(u){return u}})()}STEP1EnableCameraReturnVisility(){var u=this;return(0,i.Z)(function*(){var m;return(yield u.checkPermission())?(yield L.hideBackground(),null===(m=document.querySelector("body"))||void 0===m||m.classList.add("scanner-active"),"hidden"):""})()}STEP2ScanneBarCodeAndReturnContent(){return(0,i.Z)(function*(){return(yield L.startScan()).content})()}STEP3disableCameraReturnVisility(){var u;return L.showBackground(),L.stopScan(),null===(u=document.querySelector("body"))||void 0===u||u.classList.remove("scanner-active"),""}}return(b=I).\u0275fac=function(u){return new(u||b)},b.\u0275prov=G.Yz7({token:b,factory:b.\u0275fac,providedIn:"root"}),I})()},5423:(z,Z,g)=>{g.d(Z,{V:()=>m});var i=g(5861),v=g(3009),D=g(9825),L=g(6689),G=g(2014),x=g(2386),b=g(9392),I=g(3182),B=g(553);let u=(()=>{var _;class A{constructor(n){this.firestore=n}post(n,o,l){return(0,i.Z)(function*(){const f=(0,I.ZF)(B.N.firebaseConfig),h=(0,b.ad)(f);yield(0,x.pl)((0,x.JU)(h,n,l),o)})()}getAll(n){var o=this;return(0,i.Z)(function*(){const l=yield(0,x.hJ)(o.firestore,n);return(0,x.BS)(l)})()}put(n,o,l){var f=this;return(0,i.Z)(function*(){const h=(0,x.JU)(f.firestore,n+"/"+o);return(0,x.r7)(h,l)})()}delete(n,o,l){var f=this;return(0,i.Z)(function*(){const h=(0,x.JU)(f.firestore,n+"/"+o);return(0,x.oe)(h)})()}}return(_=A).\u0275fac=function(n){return new(n||_)(L.LFG(x.gg))},_.\u0275prov=L.Yz7({token:_,factory:_.\u0275fac,providedIn:"root"}),A})(),m=(()=>{var _;class A{constructor(n,o){this.storage=n,this.firestore=o}postAll(n,o){var l=this;return(0,i.Z)(function*(){(yield l.getConnexionInfo()).isOnline&&(yield(yield o.filter(T=>!T.isFirebase)).map(function(){var T=(0,i.Z)(function*(O){O.isFirebase=!0,yield l.firestore.post(n,O,O.id.toString())});return function(O){return T.apply(this,arguments)}}())),yield l.storage.set(n,o)})()}post(n,o){var l=this;return(0,i.Z)(function*(){var f=yield l.getAll(n);o.id=Number(new Date),o.createdOn=new Date,o.modifiedOn=null,o.deletedOn=null,o.isFirebase=!1,f.push(o),yield l.postAll(n,f)})()}get(n){var o=this;return(0,i.Z)(function*(){return yield(yield o.storage.get(n)).filter(f=>""===f.deletedOn||null===f.deletedOn||void 0!==f.deletedOn)})()}getAll(n){var o=this;return(0,i.Z)(function*(){return yield o.storage.get(n)})()}getIndex(n,o){var l=this;return(0,i.Z)(function*(){return yield(yield l.getAll(n)).findIndex(h=>h.id===o)})()}put(n,o){var l=this;return(0,i.Z)(function*(){const f=yield l.getAll(n),h=yield l.getIndex(n,o.id);f[h]=o,f[h].modifiedOn=new Date,(yield l.getConnexionInfo()).isOnline?yield l.firestore.put(n,o.id.toString(),o):f[h].isFirebase&&(f[h].firebaseMethod=D.f.PUT),yield l.postAll(n,f)})()}delete(n,o){var l=this;return(0,i.Z)(function*(){const f=yield l.getAll(n),h=yield l.getIndex(n,o.id);f[h].deletedOn=new Date,f[h].firebaseMethod=D.f.DELETE,yield l.postAll(n,f),(yield l.getConnexionInfo()).isOnline&&(yield l.firestore.put(n,o.id.toString(),o))})()}deleteDefinitivement(n,o){var l=this;return(0,i.Z)(function*(){const f=yield l.getAll(n),h=yield l.getIndex(n,o.id);(yield l.getConnexionInfo()).isOnline?(f.splice(h,1),yield l.firestore.delete(n,o.id.toString(),o)):f[h].isFirebase?(f[h].firebaseMethod=D.f.DELETE,f[h].deletedOn=new Date):f.splice(h,1),yield l.postAll(n,f)})()}synchroniserAvecFirestore(){var n=this;return(0,i.Z)(function*(){(yield n.getConnexionInfo()).isOnline?(yield n.synchroniser(v.K.Utilisateurs),yield n.synchroniser(v.K.Articles),yield n.synchroniser(v.K.Courses),yield n.synchroniser(v.K.Familles),yield n.synchroniser(v.K.CourseDetails),yield n.synchroniser(v.K.Memos),yield n.synchroniser(v.K.HistoriquePrix),yield n.synchroniser(v.K.Depenses),yield n.synchroniser(v.K.Magasins),yield n.synchroniser(v.K.Plats),yield n.synchroniser(v.K.PlatDetails),yield n.synchroniser(v.K.Groupes),yield n.synchroniser(v.K.Menus)):alert("Le mode onLine est d\xe9sactiv\xe9")})()}synchroniser(n){var o=this;return(0,i.Z)(function*(){if((yield o.getConnexionInfo()).isOnline){const f=yield o.storage.get(n),h=yield f.filter(O=>!O.isFirebase);h.length>0&&h.map(function(){var O=(0,i.Z)(function*(U){U.isFirebase=!0,yield o.firestore.post(n,U,U.id.toString())});return function(U){return O.apply(this,arguments)}}());const T=yield f.filter(O=>O.firebaseMethod===D.f.DELETE||O.firebaseMethod===D.f.PUT);T.length>0&&T.map(function(){var O=(0,i.Z)(function*(U){U.firebaseMethod===D.f.PUT&&(yield o.put(n,U)),U.firebaseMethod===D.f.DELETE&&(yield o.deleteDefinitivement(n,U))});return function(U){return O.apply(this,arguments)}}()),(yield o.firestore.getAll(n)).subscribe(O=>{o.storage.set(n,O)})}else alert("Le mode onLine est d\xe9sactiv\xe9")})()}set(n,o){var l=this;return(0,i.Z)(function*(){yield l.storage.set(n,o)})()}getConnexionInfo(){var n=this;return(0,i.Z)(function*(){return yield n.storage.get(v.K.InfoConnexion)})()}}return(_=A).\u0275fac=function(n){return new(n||_)(L.LFG(G.K),L.LFG(u))},_.\u0275prov=L.Yz7({token:_,factory:_.\u0275fac,providedIn:"root"}),A})()}}]);