"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6840],{6840:(b,v,a)=>{a.r(v),a.d(v,{SettingsPageModule:()=>t});var c=a(6814),g=a(95),d=a(7027),m=a(9801),h=a(5861),y=a(3009),e=a(6689),C=a(6815),S=a(5423),x=a(202);function P(n,s){if(1&n&&(e.TgZ(0,"p"),e._uU(1),e.qZA()),2&n){const l=e.oxw();e.xp6(1),e.hij("",l.magasinParDefaut," est actuellement le magasin par d\xe9faut")}}const Z=[{path:"",component:(()=>{var n;class s{constructor(i,o,r,u){this.alertController=i,this.utility=o,this.storage=r,this.magasinService=u,this.magasinParDefaut="",this.isOnline=!0,this.isCourseRapide=!0,this.montantBudget=1e4}ngOnInit(){var i=this;return(0,h.Z)(function*(){yield i.refresh()})()}refresh(){var i=this;return(0,h.Z)(function*(){var o;const r=yield i.utility.getConnexionInfo();i.connexionInfo=r,i.isOnline=r.isOnline,i.isCourseRapide=r.isCourseRapide,i.montantBudget=r.budget,i.magasinParDefaut=void 0===(null===(o=r.magasinParDefaut)||void 0===o?void 0:o.libelle)?"1":r.magasinParDefaut.libelle})()}setmagasinParDefaut(){var i=this;return(0,h.Z)(function*(){const o=yield i.magasinService.get(),r=[];var p;o.map(p=>{r.push({type:"radio",label:p.libelle,value:p,checked:i.magasinParDefaut===p.libelle})}),yield(yield i.alertController.create({cssClass:"my-custom-class",header:"Magasin par d\xe9faut",inputs:r,buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Valider",handler:(p=(0,h.Z)(function*(T){const I=yield i.utility.getConnexionInfo();I.magasinParDefaut=T,i.magasinParDefaut=T.libelle,yield i.storage.set(y.K.InfoConnexion,I)}),function(I){return p.apply(this,arguments)})}]})).present().then(()=>{document.querySelector("ion-alert input").focus()})})()}synchroniser(){var i=this;return(0,h.Z)(function*(){yield i.storage.synchroniserAvecFirestore().then((0,h.Z)(function*(){yield i.utility.popUp("Synchronisation termin\xe9e")}))})()}setModeOnline(i){var o=this;return(0,h.Z)(function*(){const r=i.detail.checked,u=yield o.utility.getConnexionInfo();u.isOnline=r,yield o.utility.putConnexionInfo(u),yield o.refresh()})()}setModeCourseRapide(i){var o=this;return(0,h.Z)(function*(){const r=i.detail.checked,u=yield o.utility.getConnexionInfo();u.isCourseRapide=r,yield o.utility.putConnexionInfo(u),yield o.refresh()})()}consoleLog(i){var o=this;return(0,h.Z)(function*(){const r=yield o.storage.get(i);console.log(r)})()}updateBudget(){var i=this;return(0,h.Z)(function*(){const o=yield i.utility.getConnexionInfo();var u;yield(yield i.alertController.create({cssClass:"my-custom-class",header:"Magasin par d\xe9faut",inputs:[{type:"number",name:"budget",placeholder:o.budget.toString()}],buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Valider",handler:(u=(0,h.Z)(function*(p){o.budget=""===p.budget?o.budget:p.budget,yield i.storage.set(y.K.InfoConnexion,o),yield i.refresh()}),function(T){return u.apply(this,arguments)})}]})).present().then(()=>{document.querySelector("ion-alert input").focus()})})()}}return(n=s).\u0275fac=function(i){return new(i||n)(e.Y36(d.Br),e.Y36(C.t),e.Y36(S.V),e.Y36(x.t))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-settings"]],decls:86,vars:6,consts:[[3,"translucent"],["slot","start"],[3,"fullscreen"],["button","","detail","true",3,"click"],[3,"checked","ionChange"],[4,"ngIf"],["button","","detail","true","routerLink","/historique-prix"],["button","","detail","true","routerLink","/utilisateur-liste"],["button","","detail","true","routerLink","/utilisateur-groupes"]],template:function(i,o){1&i&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e._UZ(3,"ion-menu-button"),e.qZA(),e.TgZ(4,"ion-title"),e._uU(5,"Param\xe8tres g\xe9n\xe9raux"),e.qZA()()(),e.TgZ(6,"ion-content",2)(7,"ion-item-group")(8,"ion-item-divider")(9,"ion-label"),e._uU(10,"Synchronisation"),e.qZA()(),e.TgZ(11,"ion-item",3),e.NdJ("click",function(){return o.synchroniser()}),e.TgZ(12,"ion-label")(13,"h3"),e._uU(14,"Synchroniser avec firebase"),e.qZA()()(),e.TgZ(15,"ion-item")(16,"ion-toggle",4),e.NdJ("ionChange",function(u){return o.setModeOnline(u)}),e._uU(17,"Mode Online"),e.qZA()()(),e.TgZ(18,"ion-item-group")(19,"ion-item-divider")(20,"ion-label"),e._uU(21,"G\xe9n\xe9ral"),e.qZA()(),e.TgZ(22,"ion-item",3),e.NdJ("click",function(){return o.setmagasinParDefaut()}),e.TgZ(23,"ion-label")(24,"h3"),e._uU(25,"Magasin par d\xe9faut"),e.qZA(),e.YNc(26,P,2,1,"p",5),e.qZA()(),e.TgZ(27,"ion-item")(28,"ion-toggle",4),e.NdJ("ionChange",function(u){return o.setModeCourseRapide(u)}),e._uU(29,"Mode course rapide"),e.qZA()()(),e.TgZ(30,"ion-item-group")(31,"ion-item-divider")(32,"ion-label"),e._uU(33,"Statistiques"),e.qZA()(),e.TgZ(34,"ion-item",6)(35,"ion-label")(36,"h3"),e._uU(37,"Historique des prix"),e.qZA()()(),e.TgZ(38,"ion-item",3),e.NdJ("click",function(){return o.updateBudget()}),e.TgZ(39,"ion-label")(40,"h3"),e._uU(41),e.qZA()()()(),e.TgZ(42,"ion-item-group")(43,"ion-item-divider")(44,"ion-label"),e._uU(45,"S\xe9curit\xe9"),e.qZA()(),e.TgZ(46,"ion-item",7)(47,"ion-label")(48,"h3"),e._uU(49,"Utilisateurs"),e.qZA()()(),e.TgZ(50,"ion-item",8)(51,"ion-label")(52,"h3"),e._uU(53,"Groupes"),e.qZA()()()(),e.TgZ(54,"ion-item-group")(55,"ion-item-divider")(56,"ion-label"),e._uU(57,"Console.log"),e.qZA()(),e.TgZ(58,"ion-item",3),e.NdJ("click",function(){return o.consoleLog("Courses")}),e.TgZ(59,"ion-label")(60,"h3"),e._uU(61,"Console.log : Course"),e.qZA()()(),e.TgZ(62,"ion-item",3),e.NdJ("click",function(){return o.consoleLog("CourseDetails")}),e.TgZ(63,"ion-label")(64,"h3"),e._uU(65,"Console.log : CourseDetails"),e.qZA()()(),e.TgZ(66,"ion-item",3),e.NdJ("click",function(){return o.consoleLog("Utilisateurs")}),e.TgZ(67,"ion-label")(68,"h3"),e._uU(69,"Console.log : Utilisateurs"),e.qZA()()(),e.TgZ(70,"ion-item",3),e.NdJ("click",function(){return o.consoleLog("Groupes")}),e.TgZ(71,"ion-label")(72,"h3"),e._uU(73,"Console.log : Groupes"),e.qZA()()(),e.TgZ(74,"ion-item",3),e.NdJ("click",function(){return o.consoleLog("Articles")}),e.TgZ(75,"ion-label")(76,"h3"),e._uU(77,"Console.log : Articles"),e.qZA()()(),e.TgZ(78,"ion-item",3),e.NdJ("click",function(){return o.consoleLog("Magasins")}),e.TgZ(79,"ion-label")(80,"h3"),e._uU(81,"Console.log : Magasins"),e.qZA()()(),e.TgZ(82,"ion-item",3),e.NdJ("click",function(){return o.consoleLog("Plats")}),e.TgZ(83,"ion-label")(84,"h3"),e._uU(85,"Console.log : Plats"),e.qZA()()()()()),2&i&&(e.Q6J("translucent",!0),e.xp6(6),e.Q6J("fullscreen",!0),e.xp6(10),e.Q6J("checked",o.isOnline),e.xp6(10),e.Q6J("ngIf",""!==o.magasinParDefaut),e.xp6(2),e.Q6J("checked",o.isCourseRapide),e.xp6(13),e.hij("Budget du mois : ",o.montantBudget," XPF"))},dependencies:[c.O5,d.Sm,d.W2,d.Gu,d.Ie,d.rH,d.Ub,d.Q$,d.fG,d.wd,d.ho,d.sr,d.w,d.YI,m.rH]}),s})()}];let _=(()=>{var n;class s{}return(n=s).\u0275fac=function(i){return new(i||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[m.Bz.forChild(Z),m.Bz]}),s})(),t=(()=>{var n;class s{}return(n=s).\u0275fac=function(i){return new(i||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[c.ez,g.u5,d.Pc,_]}),s})()},9825:(b,v,a)=>{a.d(v,{f:()=>c});var c=function(g){return g.POST="POST",g.PUT="PUT",g.DELETE="DELETE",g}(c||{})},5423:(b,v,a)=>{a.d(v,{V:()=>P});var c=a(5861),g=a(3009),d=a(9825),m=a(6689),h=a(2014),y=a(2386),e=a(9392),C=a(3182),S=a(553);let x=(()=>{var f;class Z{constructor(t){this.firestore=t}post(t,n,s){return(0,c.Z)(function*(){const l=(0,C.ZF)(S.N.firebaseConfig),i=(0,e.ad)(l);yield(0,y.pl)((0,y.JU)(i,t,s),n)})()}getAll(t){var n=this;return(0,c.Z)(function*(){const s=yield(0,y.hJ)(n.firestore,t);return(0,y.BS)(s)})()}put(t,n,s){var l=this;return(0,c.Z)(function*(){const i=(0,y.JU)(l.firestore,t+"/"+n);return(0,y.r7)(i,s)})()}delete(t,n,s){var l=this;return(0,c.Z)(function*(){const i=(0,y.JU)(l.firestore,t+"/"+n);return(0,y.oe)(i)})()}}return(f=Z).\u0275fac=function(t){return new(t||f)(m.LFG(y.gg))},f.\u0275prov=m.Yz7({token:f,factory:f.\u0275fac,providedIn:"root"}),Z})(),P=(()=>{var f;class Z{constructor(t,n){this.storage=t,this.firestore=n}postAll(t,n){var s=this;return(0,c.Z)(function*(){(yield s.getConnexionInfo()).isOnline&&(yield(yield n.filter(o=>!o.isFirebase)).map(function(){var o=(0,c.Z)(function*(r){r.isFirebase=!0,yield s.firestore.post(t,r,r.id.toString())});return function(r){return o.apply(this,arguments)}}())),yield s.storage.set(t,n)})()}post(t,n){var s=this;return(0,c.Z)(function*(){var l=yield s.getAll(t);n.id=Number(new Date),n.createdOn=new Date,n.modifiedOn=null,n.deletedOn=null,n.isFirebase=!1,l.push(n),yield s.postAll(t,l)})()}get(t){var n=this;return(0,c.Z)(function*(){return yield(yield n.storage.get(t)).filter(l=>""===l.deletedOn||null===l.deletedOn||void 0!==l.deletedOn)})()}getAll(t){var n=this;return(0,c.Z)(function*(){return yield n.storage.get(t)})()}getIndex(t,n){var s=this;return(0,c.Z)(function*(){return yield(yield s.getAll(t)).findIndex(i=>i.id===n)})()}put(t,n){var s=this;return(0,c.Z)(function*(){const l=yield s.getAll(t),i=yield s.getIndex(t,n.id);l[i]=n,l[i].modifiedOn=new Date,(yield s.getConnexionInfo()).isOnline?yield s.firestore.put(t,n.id.toString(),n):l[i].isFirebase&&(l[i].firebaseMethod=d.f.PUT),yield s.postAll(t,l)})()}delete(t,n){var s=this;return(0,c.Z)(function*(){const l=yield s.getAll(t),i=yield s.getIndex(t,n.id);l[i].deletedOn=new Date,l[i].firebaseMethod=d.f.DELETE,yield s.postAll(t,l),(yield s.getConnexionInfo()).isOnline&&(yield s.firestore.put(t,n.id.toString(),n))})()}deleteDefinitivement(t,n){var s=this;return(0,c.Z)(function*(){const l=yield s.getAll(t),i=yield s.getIndex(t,n.id);(yield s.getConnexionInfo()).isOnline?(l.splice(i,1),yield s.firestore.delete(t,n.id.toString(),n)):l[i].isFirebase?(l[i].firebaseMethod=d.f.DELETE,l[i].deletedOn=new Date):l.splice(i,1),yield s.postAll(t,l)})()}synchroniserAvecFirestore(){var t=this;return(0,c.Z)(function*(){(yield t.getConnexionInfo()).isOnline?(yield t.synchroniser(g.K.Utilisateurs),yield t.synchroniser(g.K.Articles),yield t.synchroniser(g.K.Courses),yield t.synchroniser(g.K.Familles),yield t.synchroniser(g.K.CourseDetails),yield t.synchroniser(g.K.Memos),yield t.synchroniser(g.K.HistoriquePrix),yield t.synchroniser(g.K.Depenses),yield t.synchroniser(g.K.Magasins),yield t.synchroniser(g.K.Plats),yield t.synchroniser(g.K.PlatDetails),yield t.synchroniser(g.K.Groupes),yield t.synchroniser(g.K.Menus)):alert("Le mode onLine est d\xe9sactiv\xe9")})()}synchroniser(t){var n=this;return(0,c.Z)(function*(){if((yield n.getConnexionInfo()).isOnline){const l=yield n.storage.get(t),i=yield l.filter(r=>!r.isFirebase);i.length>0&&i.map(function(){var r=(0,c.Z)(function*(u){u.isFirebase=!0,yield n.firestore.post(t,u,u.id.toString())});return function(u){return r.apply(this,arguments)}}());const o=yield l.filter(r=>r.firebaseMethod===d.f.DELETE||r.firebaseMethod===d.f.PUT);o.length>0&&o.map(function(){var r=(0,c.Z)(function*(u){u.firebaseMethod===d.f.PUT&&(yield n.put(t,u)),u.firebaseMethod===d.f.DELETE&&(yield n.deleteDefinitivement(t,u))});return function(u){return r.apply(this,arguments)}}()),(yield n.firestore.getAll(t)).subscribe(r=>{n.storage.set(t,r)})}else alert("Le mode onLine est d\xe9sactiv\xe9")})()}set(t,n){var s=this;return(0,c.Z)(function*(){yield s.storage.set(t,n)})()}getConnexionInfo(){var t=this;return(0,c.Z)(function*(){return yield t.storage.get(g.K.InfoConnexion)})()}}return(f=Z).\u0275fac=function(t){return new(t||f)(m.LFG(h.K),m.LFG(x))},f.\u0275prov=m.Yz7({token:f,factory:f.\u0275fac,providedIn:"root"}),Z})()}}]);