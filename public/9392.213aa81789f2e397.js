"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9392],{3891:(b,p,d)=>{d.r(p),d.d(p,{FamillesPageModule:()=>c});var l=d(6814),a=d(95),f=d(7027),v=d(9801),m=d(5861),i=d(6689),x=d(6419);function F(o,y){if(1&o&&(i.TgZ(0,"ion-list")(1,"ion-item",7)(2,"ion-label")(3,"h3"),i._uU(4),i.qZA()()()()),2&o){const e=y.$implicit;i.xp6(1),i.Q6J("disabled","DELETE"===e.firebaseMethod),i.xp6(3),i.Oqu(e.libelle)}}const Z=[{path:"",component:(()=>{var o;class y{constructor(n,t){this.alertController=n,this.famillesService=t,this.familles=[]}ngOnInit(){this.refresh()}get(){var n=this;return(0,m.Z)(function*(){return yield n.famillesService.get()})()}refresh(){var n=this;return(0,m.Z)(function*(){const t=yield n.get();n.familles=t})()}post(){var n=this;return(0,m.Z)(function*(){var s;yield(yield n.alertController.create({cssClass:"my-custom-class",header:"Nouvelle article",inputs:[{type:"text",name:"libelle",label:"Nom de l'article"}],buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Valider",handler:(s=(0,m.Z)(function*(r){r.id=Date.now(),r.createdOn=new Date,r.isFirebase=!1,yield n.famillesService.post(r),yield n.refresh()}),function(h){return s.apply(this,arguments)})}]})).present()})()}}return(o=y).\u0275fac=function(n){return new(n||o)(i.Y36(f.Br),i.Y36(x.X))},o.\u0275cmp=i.Xpm({type:o,selectors:[["app-familles"]],decls:11,vars:3,consts:[[3,"translucent"],["slot","start"],[3,"fullscreen"],[4,"ngFor","ngForOf"],["slot","fixed","horizontal","end","vertical","bottom",3,"click"],["size","small"],["name","add"],["button","","detail","true",3,"disabled"]],template:function(n,t){1&n&&(i.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),i._UZ(3,"ion-menu-button"),i.qZA(),i.TgZ(4,"ion-title"),i._uU(5,"Configurer vos familles"),i.qZA()()(),i.TgZ(6,"ion-content",2),i.YNc(7,F,5,2,"ion-list",3),i.TgZ(8,"ion-fab",4),i.NdJ("click",function(){return t.post()}),i.TgZ(9,"ion-fab-button",5),i._UZ(10,"ion-icon",6),i.qZA()()()),2&n&&(i.Q6J("translucent",!0),i.xp6(6),i.Q6J("fullscreen",!0),i.xp6(1),i.Q6J("ngForOf",t.familles))},dependencies:[l.sg,f.Sm,f.W2,f.IJ,f.W4,f.Gu,f.gu,f.Ie,f.Q$,f.q_,f.fG,f.wd,f.sr]}),y})()}];let I=(()=>{var o;class y{}return(o=y).\u0275fac=function(n){return new(n||o)},o.\u0275mod=i.oAB({type:o}),o.\u0275inj=i.cJS({imports:[v.Bz.forChild(Z),v.Bz]}),y})(),c=(()=>{var o;class y{}return(o=y).\u0275fac=function(n){return new(n||o)},o.\u0275mod=i.oAB({type:o}),o.\u0275inj=i.cJS({imports:[l.ez,a.u5,f.Pc,I]}),y})()},9825:(b,p,d)=>{d.d(p,{f:()=>l});var l=function(a){return a.POST="POST",a.PUT="PUT",a.DELETE="DELETE",a}(l||{})},5423:(b,p,d)=>{d.d(p,{V:()=>I});var l=d(5861),a=d(3009),f=d(9825),v=d(6689),m=d(2014),i=d(2386),x=d(9392),F=d(3182),P=d(553);let Z=(()=>{var c;class o{constructor(e){this.firestore=e}post(e,n,t){return(0,l.Z)(function*(){const s=(0,F.ZF)(P.N.firebaseConfig),r=(0,x.ad)(s);yield(0,i.pl)((0,i.JU)(r,e,t),n)})()}getAll(e){var n=this;return(0,l.Z)(function*(){const t=yield(0,i.hJ)(n.firestore,e);return(0,i.BS)(t)})()}put(e,n,t){var s=this;return(0,l.Z)(function*(){const r=(0,i.JU)(s.firestore,e+"/"+n);return(0,i.r7)(r,t)})()}delete(e,n,t){var s=this;return(0,l.Z)(function*(){const r=(0,i.JU)(s.firestore,e+"/"+n);return(0,i.oe)(r)})()}}return(c=o).\u0275fac=function(e){return new(e||c)(v.LFG(i.gg))},c.\u0275prov=v.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),o})(),I=(()=>{var c;class o{constructor(e,n){this.storage=e,this.firestore=n}postAll(e,n){var t=this;return(0,l.Z)(function*(){(yield t.getConnexionInfo()).isOnline&&(yield(yield n.filter(h=>!h.isFirebase)).map(function(){var h=(0,l.Z)(function*(u){u.isFirebase=!0,yield t.firestore.post(e,u,u.id.toString())});return function(u){return h.apply(this,arguments)}}())),yield t.storage.set(e,n)})()}post(e,n){var t=this;return(0,l.Z)(function*(){var s=yield t.getAll(e);n.id=Number(new Date),n.createdOn=new Date,n.modifiedOn=null,n.deletedOn=null,n.isFirebase=!1,s.push(n),yield t.postAll(e,s)})()}get(e){var n=this;return(0,l.Z)(function*(){return yield(yield n.storage.get(e)).filter(s=>""===s.deletedOn||null===s.deletedOn||void 0!==s.deletedOn)})()}getAll(e){var n=this;return(0,l.Z)(function*(){return yield n.storage.get(e)})()}getIndex(e,n){var t=this;return(0,l.Z)(function*(){return yield(yield t.getAll(e)).findIndex(r=>r.id===n)})()}put(e,n){var t=this;return(0,l.Z)(function*(){const s=yield t.getAll(e),r=yield t.getIndex(e,n.id);s[r]=n,s[r].modifiedOn=new Date,(yield t.getConnexionInfo()).isOnline?yield t.firestore.put(e,n.id.toString(),n):s[r].isFirebase&&(s[r].firebaseMethod=f.f.PUT),yield t.postAll(e,s)})()}delete(e,n){var t=this;return(0,l.Z)(function*(){const s=yield t.getAll(e),r=yield t.getIndex(e,n.id);s[r].deletedOn=new Date,s[r].firebaseMethod=f.f.DELETE,yield t.postAll(e,s),(yield t.getConnexionInfo()).isOnline&&(yield t.firestore.put(e,n.id.toString(),n))})()}deleteDefinitivement(e,n){var t=this;return(0,l.Z)(function*(){const s=yield t.getAll(e),r=yield t.getIndex(e,n.id);(yield t.getConnexionInfo()).isOnline?(s.splice(r,1),yield t.firestore.delete(e,n.id.toString(),n)):s[r].isFirebase?(s[r].firebaseMethod=f.f.DELETE,s[r].deletedOn=new Date):s.splice(r,1),yield t.postAll(e,s)})()}synchroniserAvecFirestore(){var e=this;return(0,l.Z)(function*(){(yield e.getConnexionInfo()).isOnline?(yield e.synchroniser(a.K.Utilisateurs),yield e.synchroniser(a.K.Articles),yield e.synchroniser(a.K.Courses),yield e.synchroniser(a.K.Familles),yield e.synchroniser(a.K.CourseDetails),yield e.synchroniser(a.K.Memos),yield e.synchroniser(a.K.HistoriquePrix),yield e.synchroniser(a.K.Depenses),yield e.synchroniser(a.K.Apports),yield e.synchroniser(a.K.Epargnes),yield e.synchroniser(a.K.Magasins),yield e.synchroniser(a.K.Plats),yield e.synchroniser(a.K.PlatDetails),yield e.synchroniser(a.K.Groupes),yield e.synchroniser(a.K.Menus)):alert("Le mode onLine est d\xe9sactiv\xe9")})()}synchroniser(e){var n=this;return(0,l.Z)(function*(){if((yield n.getConnexionInfo()).isOnline){const s=yield n.storage.get(e),r=yield s.filter(u=>!u.isFirebase);r.length>0&&r.map(function(){var u=(0,l.Z)(function*(g){g.isFirebase=!0,yield n.firestore.post(e,g,g.id.toString())});return function(g){return u.apply(this,arguments)}}());const h=yield s.filter(u=>u.firebaseMethod===f.f.DELETE||u.firebaseMethod===f.f.PUT);h.length>0&&h.map(function(){var u=(0,l.Z)(function*(g){g.firebaseMethod===f.f.PUT&&(yield n.put(e,g)),g.firebaseMethod===f.f.DELETE&&(yield n.deleteDefinitivement(e,g))});return function(g){return u.apply(this,arguments)}}()),(yield n.firestore.getAll(e)).subscribe(u=>{n.storage.set(e,u)})}else alert("Le mode onLine est d\xe9sactiv\xe9")})()}set(e,n){var t=this;return(0,l.Z)(function*(){yield t.storage.set(e,n)})()}getConnexionInfo(){var e=this;return(0,l.Z)(function*(){return yield e.storage.get(a.K.InfoConnexion)})()}}return(c=o).\u0275fac=function(e){return new(e||c)(v.LFG(m.K),v.LFG(Z))},c.\u0275prov=v.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),o})()}}]);