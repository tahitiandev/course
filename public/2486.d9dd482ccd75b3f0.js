"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2486],{9825:(T,m,a)=>{a.d(m,{f:()=>u});var u=function(c){return c.POST="POST",c.PUT="PUT",c.DELETE="DELETE",c}(u||{})},2704:(T,m,a)=>{a.r(m),a.d(m,{UtilisateurGroupesPageModule:()=>f});var u=a(6814),c=a(95),l=a(7027),h=a(9801),v=a(5861),i=a(6689),x=a(4265);function Z(o,g){if(1&o){const e=i.EpF();i.TgZ(0,"ion-item-sliding")(1,"ion-item",8),i.NdJ("click",function(){const r=i.CHM(e).$implicit,s=i.oxw();return i.KtG(s.put(r))}),i.TgZ(2,"ion-label")(3,"h3"),i._uU(4),i.qZA()()(),i.TgZ(5,"ion-item-options",9)(6,"ion-item-option",10),i.NdJ("click",function(){const r=i.CHM(e).$implicit,s=i.oxw();return i.KtG(s.deleteDefinitivement(r))}),i._uU(7," Supprimer "),i.qZA()()()}if(2&o){const e=g.$implicit;i.xp6(1),i.Q6J("disabled","DELETE"===e.firebaseMethod),i.xp6(3),i.Oqu(e.libelle)}}const b=[{path:"",component:(()=>{var o;class g{constructor(t,n){this.alertController=t,this.groupeService=n,this.groupes=[]}ngOnInit(){this.refresh()}post(){var t=this;return(0,v.Z)(function*(){var r;yield(yield t.alertController.create({cssClass:"my-custom-class",header:"Nouveau Magasin",inputs:[{type:"text",name:"libelle",placeholder:"Libell\xe9"}],buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Valider",handler:(r=(0,v.Z)(function*(s){yield t.groupeService.post({id:0,libelle:s.libelle}),yield t.refresh()}),function(p){return r.apply(this,arguments)})}]})).present()})()}put(t){var n=this;return(0,v.Z)(function*(){var s;yield(yield n.alertController.create({cssClass:"my-custom-class",header:"Nouveau Magasin",inputs:[{type:"text",name:"libelle",placeholder:t.libelle}],buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Valider",handler:(s=(0,v.Z)(function*(p){t.libelle=""===p.libelle?t.libelle:p.libelle,yield n.groupeService.put(t),yield n.refresh()}),function(d){return s.apply(this,arguments)})}]})).present()})()}refresh(){var t=this;return(0,v.Z)(function*(){const n=yield t.groupeService.get();t.groupes=n})()}deleteDefinitivement(t){var n=this;return(0,v.Z)(function*(){yield n.groupeService.deleteDefinitivement(t),yield n.refresh()})()}}return(o=g).\u0275fac=function(t){return new(t||o)(i.Y36(l.Br),i.Y36(x.j))},o.\u0275cmp=i.Xpm({type:o,selectors:[["app-utilisateur-groupes"]],decls:12,vars:3,consts:[[3,"translucent"],["slot","start"],["defaultHref","/settings"],[3,"fullscreen"],[4,"ngFor","ngForOf"],["slot","fixed","horizontal","end","vertical","bottom",3,"click"],["size","small"],["name","add"],["button","","detail","true",3,"disabled","click"],["side","start"],[2,"background","red",3,"click"]],template:function(t,n){1&t&&(i.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),i._UZ(3,"ion-back-button",2),i.qZA(),i.TgZ(4,"ion-title"),i._uU(5,"Gestion des groupes utilisateurs"),i.qZA()()(),i.TgZ(6,"ion-content",3)(7,"ion-list"),i.YNc(8,Z,8,2,"ion-item-sliding",4),i.qZA(),i.TgZ(9,"ion-fab",5),i.NdJ("click",function(){return n.post()}),i.TgZ(10,"ion-fab-button",6),i._UZ(11,"ion-icon",7),i.qZA()()()),2&t&&(i.Q6J("translucent",!0),i.xp6(6),i.Q6J("fullscreen",!0),i.xp6(2),i.Q6J("ngForOf",n.groupes))},dependencies:[u.sg,l.oU,l.Sm,l.W2,l.IJ,l.W4,l.Gu,l.gu,l.Ie,l.u8,l.IK,l.td,l.Q$,l.q_,l.wd,l.sr,l.cs]}),g})()}];let I=(()=>{var o;class g{}return(o=g).\u0275fac=function(t){return new(t||o)},o.\u0275mod=i.oAB({type:o}),o.\u0275inj=i.cJS({imports:[h.Bz.forChild(b),h.Bz]}),g})(),f=(()=>{var o;class g{}return(o=g).\u0275fac=function(t){return new(t||o)},o.\u0275mod=i.oAB({type:o}),o.\u0275inj=i.cJS({imports:[u.ez,c.u5,l.Pc,I]}),g})()},5423:(T,m,a)=>{a.d(m,{V:()=>I});var u=a(5861),c=a(3009),l=a(9825),h=a(6689),v=a(2014),i=a(2386),x=a(9392),Z=a(3182),U=a(553);let b=(()=>{var f;class o{constructor(e){this.firestore=e}post(e,t,n){return(0,u.Z)(function*(){const r=(0,Z.ZF)(U.N.firebaseConfig),s=(0,x.ad)(r);yield(0,i.pl)((0,i.JU)(s,e,n),t)})()}getAll(e){var t=this;return(0,u.Z)(function*(){const n=yield(0,i.hJ)(t.firestore,e);return(0,i.BS)(n)})()}put(e,t,n){var r=this;return(0,u.Z)(function*(){const s=(0,i.JU)(r.firestore,e+"/"+t);return(0,i.r7)(s,n)})()}delete(e,t,n){var r=this;return(0,u.Z)(function*(){const s=(0,i.JU)(r.firestore,e+"/"+t);return(0,i.oe)(s)})()}}return(f=o).\u0275fac=function(e){return new(e||f)(h.LFG(i.gg))},f.\u0275prov=h.Yz7({token:f,factory:f.\u0275fac,providedIn:"root"}),o})(),I=(()=>{var f;class o{constructor(e,t){this.storage=e,this.firestore=t}postAll(e,t){var n=this;return(0,u.Z)(function*(){(yield n.getConnexionInfo()).isOnline&&(yield(yield t.filter(p=>!p.isFirebase)).map(function(){var p=(0,u.Z)(function*(d){d.isFirebase=!0,yield n.firestore.post(e,d,d.id.toString())});return function(d){return p.apply(this,arguments)}}())),yield n.storage.set(e,t)})()}parseDate(e){const n=new Date(e).getTime();return{nanoseconds:n%1e3*1e6,seconds:Math.floor(n/1e3)}}post(e,t){var n=this;return(0,u.Z)(function*(){var r=yield n.getAll(e);t.id=Number(new Date),t.createdOn=n.parseDate(new Date),t.modifiedOn=null,t.deletedOn=null,t.isFirebase=!1,r.push(t),yield n.postAll(e,r)})()}get(e){var t=this;return(0,u.Z)(function*(){return yield(yield t.storage.get(e)).filter(r=>""===r.deletedOn||null===r.deletedOn||void 0!==r.deletedOn)})()}getAll(e){var t=this;return(0,u.Z)(function*(){return yield t.storage.get(e)})()}getIndex(e,t){var n=this;return(0,u.Z)(function*(){return yield(yield n.getAll(e)).findIndex(s=>s.id===t)})()}put(e,t){var n=this;return(0,u.Z)(function*(){const r=yield n.getAll(e),s=yield n.getIndex(e,t.id);r[s]=t,r[s].modifiedOn=new Date,(yield n.getConnexionInfo()).isOnline?yield n.firestore.put(e,t.id.toString(),t):r[s].isFirebase&&(r[s].firebaseMethod=l.f.PUT),yield n.postAll(e,r)})()}delete(e,t){var n=this;return(0,u.Z)(function*(){const r=yield n.getAll(e),s=yield n.getIndex(e,t.id);r[s].deletedOn=new Date,r[s].firebaseMethod=l.f.DELETE,yield n.postAll(e,r),(yield n.getConnexionInfo()).isOnline&&(yield n.firestore.put(e,t.id.toString(),t))})()}deleteDefinitivement(e,t){var n=this;return(0,u.Z)(function*(){const r=yield n.getAll(e),s=yield n.getIndex(e,t.id);(yield n.getConnexionInfo()).isOnline?(r.splice(s,1),yield n.firestore.delete(e,t.id.toString(),t)):r[s].isFirebase?(r[s].firebaseMethod=l.f.DELETE,r[s].deletedOn=new Date):r.splice(s,1),yield n.postAll(e,r)})()}synchroniserAvecFirestore(){var e=this;return(0,u.Z)(function*(){(yield e.getConnexionInfo()).isOnline?(yield e.synchroniser(c.K.Utilisateurs),yield e.synchroniser(c.K.Articles),yield e.synchroniser(c.K.Courses),yield e.synchroniser(c.K.Familles),yield e.synchroniser(c.K.CourseDetails),yield e.synchroniser(c.K.Memos),yield e.synchroniser(c.K.HistoriquePrix),yield e.synchroniser(c.K.Depenses),yield e.synchroniser(c.K.Apports),yield e.synchroniser(c.K.Epargnes),yield e.synchroniser(c.K.Magasins),yield e.synchroniser(c.K.Plats),yield e.synchroniser(c.K.PlatDetails),yield e.synchroniser(c.K.Groupes),yield e.synchroniser(c.K.Menus),yield e.synchroniser(c.K.Budget)):alert("Le mode onLine est d\xe9sactiv\xe9")})()}synchroniser(e){var t=this;return(0,u.Z)(function*(){if((yield t.getConnexionInfo()).isOnline){const r=yield t.storage.get(e),s=yield r.filter(d=>!d.isFirebase);s.length>0&&s.map(function(){var d=(0,u.Z)(function*(y){y.isFirebase=!0,yield t.firestore.post(e,y,y.id.toString())});return function(y){return d.apply(this,arguments)}}());const p=yield r.filter(d=>d.firebaseMethod===l.f.DELETE||d.firebaseMethod===l.f.PUT);p.length>0&&p.map(function(){var d=(0,u.Z)(function*(y){y.firebaseMethod===l.f.PUT&&(yield t.put(e,y)),y.firebaseMethod===l.f.DELETE&&(yield t.deleteDefinitivement(e,y))});return function(y){return d.apply(this,arguments)}}()),(yield t.firestore.getAll(e)).subscribe(d=>{t.storage.set(e,d)})}else alert("Le mode onLine est d\xe9sactiv\xe9")})()}set(e,t){var n=this;return(0,u.Z)(function*(){yield n.storage.set(e,t)})()}getConnexionInfo(){var e=this;return(0,u.Z)(function*(){return yield e.storage.get(c.K.InfoConnexion)})()}}return(f=o).\u0275fac=function(e){return new(e||f)(h.LFG(v.K),h.LFG(b))},f.\u0275prov=h.Yz7({token:f,factory:f.\u0275fac,providedIn:"root"}),o})()}}]);