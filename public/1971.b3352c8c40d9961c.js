"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1971],{1971:(S,C,d)=>{d.r(C),d.d(C,{EpargnesPageModule:()=>v});var c=d(6814),g=d(95),l=d(7027),A=d(9801),f=d(5861),x=d(3009),M=d(9825),e=d(6689),O=d(5423);let P=(()=>{var i;class m{constructor(t){this.storage=t}get(){var t=this;return(0,f.Z)(function*(){return yield t.storage.get(x.K.Epargnes)})()}getById(t){var n=this;return(0,f.Z)(function*(){return yield(yield n.get()).find(h=>h.id===t)})()}post(t){var n=this;return(0,f.Z)(function*(){yield n.storage.post(x.K.Epargnes,t)})()}delete(t){var n=this;return(0,f.Z)(function*(){yield n.storage.deleteDefinitivement(x.K.Epargnes,t)})()}put(t){var n=this;return(0,f.Z)(function*(){yield n.storage.put(x.K.Epargnes,t)})()}}return(i=m).\u0275fac=function(t){return new(t||i)(e.LFG(O.V))},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),m})();var F=d(6815),E=d(7039);function I(i,m){if(1&i){const u=e.EpF();e.TgZ(0,"ion-item-options",5)(1,"ion-item-option",6),e.NdJ("click",function(){e.CHM(u);const n=e.oxw().$implicit,y=e.oxw();return e.KtG(y.delete(n))}),e._uU(2," Supprimer "),e.qZA()()}}function T(i,m){if(1&i){const u=e.EpF();e.TgZ(0,"ion-item-sliding")(1,"ion-item",1),e.NdJ("click",function(){const y=e.CHM(u).$implicit,h=e.oxw();return e.KtG(h.put(y))}),e.TgZ(2,"ion-label")(3,"h3"),e._uU(4),e.TgZ(5,"span",2),e._uU(6),e.qZA(),e.TgZ(7,"ion-chip",3),e._uU(8),e.qZA()()()(),e.YNc(9,I,3,0,"ion-item-options",4),e.qZA()}if(2&i){const u=m.$implicit,t=e.oxw();e.xp6(1),e.Q6J("disabled","Retrait"==u.type),e.xp6(3),e.AsE(" ",t.formatDate(u.date).toLocaleDateString()," : ",u.type," "),e.xp6(2),e.Oqu(u.description),e.xp6(2),e.hij("",u.montant," xpf"),e.xp6(1),e.Q6J("ngIf","Epargne"==u.type)}}let r=(()=>{var i;class m{constructor(t,n,y,h){this.epargnesservice=t,this.utility=n,this.apportsservice=y,this.alertController=h,this.epargnes=[],this.apports=[],this.epargneEtApport=[]}ngOnInit(){}get(){var t=this;return(0,f.Z)(function*(){return yield t.epargnesservice.get()})()}refresh(){var t=this;return(0,f.Z)(function*(){const n=yield t.get();t.epargnes=n;const y=yield t.getApport();t.apports=y,yield t.cumuleEpargneApport()})()}getApport(){var t=this;return(0,f.Z)(function*(){return yield t.apportsservice.get()})()}cumuleEpargneApport(){var t=this;return(0,f.Z)(function*(){t.epargnes.map(n=>{t.epargneEtApport.push({date:n.createdOn,type:"Epargne",montant:n.epargne,description:n.commentaire,EpargneApportid:n.id})}),t.apports.map(n=>{t.epargneEtApport.push({date:n.createdOn,type:"Retrait",montant:-1*n.apport,description:n.commentaire,EpargneApportid:n.id})})})()}put(t){var n=this;return(0,f.Z)(function*(){var h;yield(yield n.alertController.create({cssClass:"my-custom-class",header:"Modifier l'\xe9pargne",inputs:[{type:"number",name:"montant",value:t.montant},{type:"textarea",name:"commentaire",value:t.description}],buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Valider",handler:(h=(0,f.Z)(function*(_){const b=yield n.epargnesservice.getById(t.EpargneApportid);console.log(b),b.modifiedOn=new Date,b.userid=(yield n.utility.getConnexionInfo()).utilisateurId,b.epargne=_.montant,b.commentaire=_.description,yield n.epargnesservice.put(b),yield n.refresh()}),function(b){return h.apply(this,arguments)})}]})).present()})()}formatDate(t){return this.utility.detecteDate(t)}delete(t){var n=this;return(0,f.Z)(function*(){const y=yield n.epargnesservice.getById(t.EpargneApportid);yield n.epargnesservice.delete(y),n.refresh()})()}modifierDate(t){var n=this;return(0,f.Z)(function*(){var h;yield(yield n.alertController.create({cssClass:"my-custom-class",header:"Modifier la date",inputs:[{type:"date",name:"date"}],buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Valider",handler:(h=(0,f.Z)(function*(_){t.createdOn=new Date(_.date),yield n.epargnesservice.put(t),yield n.refresh()}),function(b){return h.apply(this,arguments)})}]})).present()})()}closeEpargne(t){var n=this;return(0,f.Z)(function*(){t.check=!t.check,yield n.epargnesservice.put(t),yield n.refresh()})()}}return(i=m).\u0275fac=function(t){return new(t||i)(e.Y36(P),e.Y36(F.t),e.Y36(E.P),e.Y36(l.Br))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-epargnes-list"]],inputs:{epargneEtApport:"epargneEtApport"},decls:2,vars:1,consts:[[4,"ngFor","ngForOf"],["button","","detail","true",3,"disabled","click"],[1,"masquer-mode-mobile"],["color","success","slot","end"],["side","start",4,"ngIf"],["side","start"],[2,"background","rgb(156, 46, 46)",3,"click"]],template:function(t,n){1&t&&(e.TgZ(0,"ion-list"),e.YNc(1,T,10,6,"ion-item-sliding",0),e.qZA()),2&t&&(e.xp6(1),e.Q6J("ngForOf",n.epargneEtApport))},dependencies:[c.sg,c.O5,l.hM,l.Ie,l.u8,l.IK,l.td,l.Q$,l.q_],styles:["@media screen and (max-width: 500px){.masquer-mode-mobile[_ngcontent-%COMP%]{display:none}}@media screen and (min-width: 500px){.masquer-mode-web[_ngcontent-%COMP%]{display:none}}"]}),m})();function s(i,m){if(1&i){const u=e.EpF();e.TgZ(0,"ion-fab",13),e.NdJ("click",function(){e.CHM(u);const n=e.oxw();return e.KtG(n.post())}),e.TgZ(1,"ion-fab-button",14),e._UZ(2,"ion-icon",8),e.qZA()()}}function o(i,m){if(1&i&&e._UZ(0,"app-epargnes-list",15),2&i){const u=e.oxw();e.Q6J("epargneEtApport",u.epargneEtApport)}}const p=[{path:"",component:(()=>{var i;class m{constructor(t,n,y,h,_){this.epargnessservice=t,this.utility=n,this.apportsservice=y,this.storageService=h,this.alertController=_,this.epargnes=[],this.apports=[],this.epargneEtApport=[],this.listeOn=!1}ngOnInit(){var t=this;return(0,f.Z)(function*(){yield t.refresh()})()}get(){var t=this;return(0,f.Z)(function*(){return yield t.epargnessservice.get()})()}getApport(){var t=this;return(0,f.Z)(function*(){return yield t.apportsservice.get()})()}refresh(){var t=this;return(0,f.Z)(function*(){const n=yield t.get();t.epargnes=n;const y=yield t.getApport();t.apports=y,yield t.cumuleEpargneApport(),t.setMontantEpargneSurInfoConnexion()})()}cumuleEpargneApport(){var t=this;return(0,f.Z)(function*(){t.epargnes.map(n=>{t.epargneEtApport.push({date:n.createdOn,type:"Epargne",montant:n.epargne,description:n.commentaire,EpargneApportid:n.id})}),t.apports.map(n=>{t.epargneEtApport.push({date:n.createdOn,type:"Retrait",montant:-1*n.apport,description:n.commentaire,EpargneApportid:n.id})})})()}calculeEpargneRestant(){var t=0;return this.epargneEtApport.map(n=>{t+=Number(n.montant)}),t}setMontantEpargneSurInfoConnexion(){var t=this;return(0,f.Z)(function*(){const n=yield t.utility.getConnexionInfo();n.epargne=t.calculeEpargneRestant(),t.utility.putConnexionInfo(n)})()}post(){var t=this;return(0,f.Z)(function*(){var y;yield(yield t.alertController.create({cssClass:"my-custom-class",header:"Faite une epargne",inputs:[{type:"number",name:"epargne",placeholder:"Montant"},{type:"textarea",name:"commentaire",placeholder:"Description"}],buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Valider",handler:(y=(0,f.Z)(function*(h){h.id=Date.now(),h.createdOn=new Date,h.check=!1,h.isFirebase=!1,h.firebaseMethod=M.f.POST,h.userid=(yield t.utility.getConnexionInfo()).utilisateurId,yield t.epargnessservice.post(h),yield t.refresh(),t.setListeOn()}),function(_){return y.apply(this,arguments)})}]})).present()})()}handleRefresh(t){this.storageService.synchroniser(x.K.Epargnes).then(()=>{t.target.complete(),this.utility.popUp("Synchronisation des epargnes termin\xe9es")})}setListeOn(){this.listeOn=!this.listeOn}}return(i=m).\u0275fac=function(t){return new(t||i)(e.Y36(P),e.Y36(F.t),e.Y36(E.P),e.Y36(O.V),e.Y36(l.Br))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-epargnes"]],decls:20,vars:9,consts:[[3,"translucent"],["slot","start"],[3,"fullscreen"],["slot","fixed",3,"pullFactor","pullMin","pullMax","ionRefresh"],[2,"text-align","center"],[1,"masquer-mode-mobile",3,"epargneEtApport"],["slot","fixed","horizontal","end","vertical","bottom",1,"masquer-mode-mobile",3,"click"],["size","small"],["name","add"],["slot","fixed","horizontal","center","vertical","center","class","masquer-mode-web",3,"click",4,"ngIf"],["slot","fixed","horizontal","end","vertical","bottom",1,"masquer-mode-web",3,"click"],["name","list-circle-outline"],["class","masquer-mode-web",3,"epargneEtApport",4,"ngIf"],["slot","fixed","horizontal","center","vertical","center",1,"masquer-mode-web",3,"click"],["size","large"],[1,"masquer-mode-web",3,"epargneEtApport"]],template:function(t,n){1&t&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e._UZ(3,"ion-menu-button"),e.qZA(),e.TgZ(4,"ion-title"),e._uU(5,"Gestion de l'\xe9pargne"),e.qZA()()(),e.TgZ(6,"ion-content",2)(7,"ion-refresher",3),e.NdJ("ionRefresh",function(h){return n.handleRefresh(h)}),e._UZ(8,"ion-refresher-content"),e.qZA(),e.TgZ(9,"h1",4),e._uU(10),e.qZA(),e._UZ(11,"app-epargnes-list",5),e.TgZ(12,"ion-fab",6),e.NdJ("click",function(){return n.post()}),e.TgZ(13,"ion-fab-button",7),e._UZ(14,"ion-icon",8),e.qZA()(),e.YNc(15,s,3,0,"ion-fab",9),e.TgZ(16,"ion-fab",10),e.NdJ("click",function(){return n.setListeOn()}),e.TgZ(17,"ion-fab-button",7),e._UZ(18,"ion-icon",11),e.qZA()(),e.YNc(19,o,1,1,"app-epargnes-list",12),e.qZA()),2&t&&(e.Q6J("translucent",!0),e.xp6(6),e.Q6J("fullscreen",!0),e.xp6(1),e.Q6J("pullFactor",.5)("pullMin",100)("pullMax",200),e.xp6(3),e.hij("restant : ",n.calculeEpargneRestant().toLocaleString()," XPF"),e.xp6(1),e.Q6J("epargneEtApport",n.epargneEtApport),e.xp6(4),e.Q6J("ngIf",!n.listeOn),e.xp6(4),e.Q6J("ngIf",n.listeOn))},dependencies:[c.O5,l.Sm,l.W2,l.IJ,l.W4,l.Gu,l.gu,l.fG,l.nJ,l.Wo,l.wd,l.sr,r],styles:["@media screen and (max-width: 500px){.masquer-mode-mobile[_ngcontent-%COMP%]{display:none}}@media screen and (min-width: 500px){.masquer-mode-web[_ngcontent-%COMP%]{display:none}}"]}),m})()}];let Z=(()=>{var i;class m{}return(i=m).\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[A.Bz.forChild(p),A.Bz]}),m})(),v=(()=>{var i;class m{}return(i=m).\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[c.ez,g.u5,l.Pc,Z]}),m})()},9825:(S,C,d)=>{d.d(C,{f:()=>c});var c=function(g){return g.POST="POST",g.PUT="PUT",g.DELETE="DELETE",g}(c||{})},5423:(S,C,d)=>{d.d(C,{V:()=>F});var c=d(5861),g=d(3009),l=d(9825),A=d(6689),f=d(2014),x=d(2386),M=d(9392),e=d(3182),O=d(553);let P=(()=>{var E;class I{constructor(r){this.firestore=r}post(r,s,o){return(0,c.Z)(function*(){const a=(0,e.ZF)(O.N.firebaseConfig),p=(0,M.ad)(a);yield(0,x.pl)((0,x.JU)(p,r,o),s)})()}getAll(r){var s=this;return(0,c.Z)(function*(){const o=yield(0,x.hJ)(s.firestore,r);return(0,x.BS)(o)})()}put(r,s,o){var a=this;return(0,c.Z)(function*(){const p=(0,x.JU)(a.firestore,r+"/"+s);return(0,x.r7)(p,o)})()}delete(r,s,o){var a=this;return(0,c.Z)(function*(){const p=(0,x.JU)(a.firestore,r+"/"+s);return(0,x.oe)(p)})()}}return(E=I).\u0275fac=function(r){return new(r||E)(A.LFG(x.gg))},E.\u0275prov=A.Yz7({token:E,factory:E.\u0275fac,providedIn:"root"}),I})(),F=(()=>{var E;class I{constructor(r,s){this.storage=r,this.firestore=s}postAll(r,s){var o=this;return(0,c.Z)(function*(){(yield o.getConnexionInfo()).isOnline&&(yield(yield s.filter(Z=>!Z.isFirebase)).map(function(){var Z=(0,c.Z)(function*(v){v.isFirebase=!0,yield o.firestore.post(r,v,v.id.toString())});return function(v){return Z.apply(this,arguments)}}())),yield o.storage.set(r,s)})()}post(r,s){var o=this;return(0,c.Z)(function*(){var a=yield o.getAll(r);s.id=Number(new Date),s.createdOn=new Date,s.modifiedOn=null,s.deletedOn=null,s.isFirebase=!1,a.push(s),yield o.postAll(r,a)})()}get(r){var s=this;return(0,c.Z)(function*(){return yield(yield s.storage.get(r)).filter(a=>""===a.deletedOn||null===a.deletedOn||void 0!==a.deletedOn)})()}getAll(r){var s=this;return(0,c.Z)(function*(){return yield s.storage.get(r)})()}getIndex(r,s){var o=this;return(0,c.Z)(function*(){return yield(yield o.getAll(r)).findIndex(p=>p.id===s)})()}put(r,s){var o=this;return(0,c.Z)(function*(){const a=yield o.getAll(r),p=yield o.getIndex(r,s.id);a[p]=s,a[p].modifiedOn=new Date,(yield o.getConnexionInfo()).isOnline?yield o.firestore.put(r,s.id.toString(),s):a[p].isFirebase&&(a[p].firebaseMethod=l.f.PUT),yield o.postAll(r,a)})()}delete(r,s){var o=this;return(0,c.Z)(function*(){const a=yield o.getAll(r),p=yield o.getIndex(r,s.id);a[p].deletedOn=new Date,a[p].firebaseMethod=l.f.DELETE,yield o.postAll(r,a),(yield o.getConnexionInfo()).isOnline&&(yield o.firestore.put(r,s.id.toString(),s))})()}deleteDefinitivement(r,s){var o=this;return(0,c.Z)(function*(){const a=yield o.getAll(r),p=yield o.getIndex(r,s.id);(yield o.getConnexionInfo()).isOnline?(a.splice(p,1),yield o.firestore.delete(r,s.id.toString(),s)):a[p].isFirebase?(a[p].firebaseMethod=l.f.DELETE,a[p].deletedOn=new Date):a.splice(p,1),yield o.postAll(r,a)})()}synchroniserAvecFirestore(){var r=this;return(0,c.Z)(function*(){(yield r.getConnexionInfo()).isOnline?(yield r.synchroniser(g.K.Utilisateurs),yield r.synchroniser(g.K.Articles),yield r.synchroniser(g.K.Courses),yield r.synchroniser(g.K.Familles),yield r.synchroniser(g.K.CourseDetails),yield r.synchroniser(g.K.Memos),yield r.synchroniser(g.K.HistoriquePrix),yield r.synchroniser(g.K.Depenses),yield r.synchroniser(g.K.Apports),yield r.synchroniser(g.K.Epargnes),yield r.synchroniser(g.K.Magasins),yield r.synchroniser(g.K.Plats),yield r.synchroniser(g.K.PlatDetails),yield r.synchroniser(g.K.Groupes),yield r.synchroniser(g.K.Menus)):alert("Le mode onLine est d\xe9sactiv\xe9")})()}synchroniser(r){var s=this;return(0,c.Z)(function*(){if((yield s.getConnexionInfo()).isOnline){const a=yield s.storage.get(r),p=yield a.filter(v=>!v.isFirebase);p.length>0&&p.map(function(){var v=(0,c.Z)(function*(i){i.isFirebase=!0,yield s.firestore.post(r,i,i.id.toString())});return function(i){return v.apply(this,arguments)}}());const Z=yield a.filter(v=>v.firebaseMethod===l.f.DELETE||v.firebaseMethod===l.f.PUT);Z.length>0&&Z.map(function(){var v=(0,c.Z)(function*(i){i.firebaseMethod===l.f.PUT&&(yield s.put(r,i)),i.firebaseMethod===l.f.DELETE&&(yield s.deleteDefinitivement(r,i))});return function(i){return v.apply(this,arguments)}}()),(yield s.firestore.getAll(r)).subscribe(v=>{s.storage.set(r,v)})}else alert("Le mode onLine est d\xe9sactiv\xe9")})()}set(r,s){var o=this;return(0,c.Z)(function*(){yield o.storage.set(r,s)})()}getConnexionInfo(){var r=this;return(0,c.Z)(function*(){return yield r.storage.get(g.K.InfoConnexion)})()}}return(E=I).\u0275fac=function(r){return new(r||E)(A.LFG(f.K),A.LFG(P))},E.\u0275prov=A.Yz7({token:E,factory:E.\u0275fac,providedIn:"root"}),I})()}}]);