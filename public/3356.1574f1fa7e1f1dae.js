"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3356],{2704:(T,x,a)=>{a.r(x),a.d(x,{UtilisateurGroupesPageModule:()=>c});var u=a(6814),f=a(95),l=a(7027),h=a(9801),v=a(5861),n=a(6689),m=a(4265);function Z(o,g){if(1&o){const e=n.EpF();n.TgZ(0,"ion-item-sliding")(1,"ion-item",8),n.NdJ("click",function(){const r=n.CHM(e).$implicit,s=n.oxw();return n.KtG(s.put(r))}),n.TgZ(2,"ion-label")(3,"h3"),n._uU(4),n.qZA()()(),n.TgZ(5,"ion-item-options",9)(6,"ion-item-option",10),n.NdJ("click",function(){const r=n.CHM(e).$implicit,s=n.oxw();return n.KtG(s.deleteDefinitivement(r))}),n._uU(7," Supprimer "),n.qZA()()()}if(2&o){const e=g.$implicit;n.xp6(1),n.Q6J("disabled","DELETE"===e.firebaseMethod),n.xp6(3),n.Oqu(e.libelle)}}const b=[{path:"",component:(()=>{var o;class g{constructor(t,i){this.alertController=t,this.groupeService=i,this.groupes=[]}ngOnInit(){this.refresh()}post(){var t=this;return(0,v.Z)(function*(){var r;yield(yield t.alertController.create({cssClass:"my-custom-class",header:"Nouveau Magasin",inputs:[{type:"text",name:"libelle",placeholder:"Libell\xe9"}],buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Valider",handler:(r=(0,v.Z)(function*(s){yield t.groupeService.post({id:0,libelle:s.libelle}),yield t.refresh()}),function(p){return r.apply(this,arguments)})}]})).present()})()}put(t){var i=this;return(0,v.Z)(function*(){var s;yield(yield i.alertController.create({cssClass:"my-custom-class",header:"Nouveau Magasin",inputs:[{type:"text",name:"libelle",placeholder:t.libelle}],buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Valider",handler:(s=(0,v.Z)(function*(p){t.libelle=""===p.libelle?t.libelle:p.libelle,yield i.groupeService.put(t),yield i.refresh()}),function(d){return s.apply(this,arguments)})}]})).present()})()}refresh(){var t=this;return(0,v.Z)(function*(){const i=yield t.groupeService.get();t.groupes=i})()}deleteDefinitivement(t){var i=this;return(0,v.Z)(function*(){yield i.groupeService.deleteDefinitivement(t),yield i.refresh()})()}}return(o=g).\u0275fac=function(t){return new(t||o)(n.Y36(l.Br),n.Y36(m.j))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-utilisateur-groupes"]],decls:12,vars:3,consts:[[3,"translucent"],["slot","start"],["defaultHref","/settings"],[3,"fullscreen"],[4,"ngFor","ngForOf"],["slot","fixed","horizontal","end","vertical","bottom",3,"click"],["size","small"],["name","add"],["button","","detail","true",3,"disabled","click"],["side","start"],[2,"background","red",3,"click"]],template:function(t,i){1&t&&(n.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),n._UZ(3,"ion-back-button",2),n.qZA(),n.TgZ(4,"ion-title"),n._uU(5,"Gestion des groupes utilisateurs"),n.qZA()()(),n.TgZ(6,"ion-content",3)(7,"ion-list"),n.YNc(8,Z,8,2,"ion-item-sliding",4),n.qZA(),n.TgZ(9,"ion-fab",5),n.NdJ("click",function(){return i.post()}),n.TgZ(10,"ion-fab-button",6),n._UZ(11,"ion-icon",7),n.qZA()()()),2&t&&(n.Q6J("translucent",!0),n.xp6(6),n.Q6J("fullscreen",!0),n.xp6(2),n.Q6J("ngForOf",i.groupes))},dependencies:[u.sg,l.oU,l.Sm,l.W2,l.IJ,l.W4,l.Gu,l.gu,l.Ie,l.u8,l.IK,l.td,l.Q$,l.q_,l.wd,l.sr,l.cs]}),g})()}];let I=(()=>{var o;class g{}return(o=g).\u0275fac=function(t){return new(t||o)},o.\u0275mod=n.oAB({type:o}),o.\u0275inj=n.cJS({imports:[h.Bz.forChild(b),h.Bz]}),g})(),c=(()=>{var o;class g{}return(o=g).\u0275fac=function(t){return new(t||o)},o.\u0275mod=n.oAB({type:o}),o.\u0275inj=n.cJS({imports:[u.ez,f.u5,l.Pc,I]}),g})()},849:(T,x,a)=>{a.d(x,{V:()=>I});var u=a(5861),f=a(3009),l=function(c){return c.POST="POST",c.PUT="PUT",c.DELETE="DELETE",c}(l||{}),h=a(6689),v=a(2014),n=a(2386),m=a(9392),Z=a(3182),U=a(553);let b=(()=>{var c;class o{constructor(e){this.firestore=e}post(e,t,i){return(0,u.Z)(function*(){const r=(0,Z.ZF)(U.N.firebaseConfig),s=(0,m.ad)(r);yield(0,n.pl)((0,n.JU)(s,e,i),t)})()}getAll(e){var t=this;return(0,u.Z)(function*(){const i=yield(0,n.hJ)(t.firestore,e);return(0,n.BS)(i)})()}put(e,t,i){var r=this;return(0,u.Z)(function*(){const s=(0,n.JU)(r.firestore,e+"/"+t);return(0,n.r7)(s,i)})()}delete(e,t,i){var r=this;return(0,u.Z)(function*(){const s=(0,n.JU)(r.firestore,e+"/"+t);return(0,n.oe)(s)})()}}return(c=o).\u0275fac=function(e){return new(e||c)(h.LFG(n.gg))},c.\u0275prov=h.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),o})(),I=(()=>{var c;class o{constructor(e,t){this.storage=e,this.firestore=t}postAll(e,t){var i=this;return(0,u.Z)(function*(){(yield i.getConnexionInfo()).isOnline&&(yield(yield t.filter(p=>!p.isFirebase)).map(function(){var p=(0,u.Z)(function*(d){d.isFirebase=!0,yield i.firestore.post(e,d,d.id.toString())});return function(d){return p.apply(this,arguments)}}())),yield i.storage.set(e,t)})()}post(e,t){var i=this;return(0,u.Z)(function*(){var r=yield i.getAll(e);t.id=Number(new Date),t.createdOn=new Date,t.modifiedOn=null,t.deletedOn=null,t.isFirebase=!1,r.push(t),yield i.postAll(e,r)})()}get(e){var t=this;return(0,u.Z)(function*(){return yield(yield t.storage.get(e)).filter(r=>""===r.deletedOn||null===r.deletedOn||void 0!==r.deletedOn)})()}getAll(e){var t=this;return(0,u.Z)(function*(){return yield t.storage.get(e)})()}getIndex(e,t){var i=this;return(0,u.Z)(function*(){return yield(yield i.getAll(e)).findIndex(s=>s.id===t)})()}put(e,t){var i=this;return(0,u.Z)(function*(){const r=yield i.getAll(e),s=yield i.getIndex(e,t.id);r[s]=t,r[s].modifiedOn=new Date,(yield i.getConnexionInfo()).isOnline?yield i.firestore.put(e,t.id.toString(),t):r[s].isFirebase&&(r[s].firebaseMethod=l.PUT),yield i.postAll(e,r)})()}delete(e,t){var i=this;return(0,u.Z)(function*(){const r=yield i.getAll(e),s=yield i.getIndex(e,t.id);r[s].deletedOn=new Date,r[s].firebaseMethod=l.DELETE,yield i.postAll(e,r),(yield i.getConnexionInfo()).isOnline&&(yield i.firestore.put(e,t.id.toString(),t))})()}deleteDefinitivement(e,t){var i=this;return(0,u.Z)(function*(){const r=yield i.getAll(e),s=yield i.getIndex(e,t.id);(yield i.getConnexionInfo()).isOnline?(r.splice(s,1),yield i.firestore.delete(e,t.id.toString(),t)):r[s].isFirebase?(r[s].firebaseMethod=l.DELETE,r[s].deletedOn=new Date):r.splice(s,1),yield i.postAll(e,r)})()}synchroniserAvecFirestore(){var e=this;return(0,u.Z)(function*(){(yield e.getConnexionInfo()).isOnline?(yield e.synchroniser(f.K.Utilisateurs),yield e.synchroniser(f.K.Articles),yield e.synchroniser(f.K.Courses),yield e.synchroniser(f.K.Familles),yield e.synchroniser(f.K.CourseDetails),yield e.synchroniser(f.K.Memos),yield e.synchroniser(f.K.HistoriquePrix),yield e.synchroniser(f.K.Magasins),yield e.synchroniser(f.K.Plats),yield e.synchroniser(f.K.PlatDetails),yield e.synchroniser(f.K.Groupes),yield e.synchroniser(f.K.Menus)):alert("Le mode onLine est d\xe9sactiv\xe9")})()}synchroniser(e){var t=this;return(0,u.Z)(function*(){if((yield t.getConnexionInfo()).isOnline){const r=yield t.storage.get(e),s=yield r.filter(d=>!d.isFirebase);s.length>0&&s.map(function(){var d=(0,u.Z)(function*(y){y.isFirebase=!0,yield t.firestore.post(e,y,y.id.toString())});return function(y){return d.apply(this,arguments)}}());const p=yield r.filter(d=>d.firebaseMethod===l.DELETE||d.firebaseMethod===l.PUT);p.length>0&&p.map(function(){var d=(0,u.Z)(function*(y){y.firebaseMethod===l.PUT&&(yield t.put(e,y)),y.firebaseMethod===l.DELETE&&(yield t.deleteDefinitivement(e,y))});return function(y){return d.apply(this,arguments)}}()),(yield t.firestore.getAll(e)).subscribe(d=>{t.storage.set(e,d)})}else alert("Le mode onLine est d\xe9sactiv\xe9")})()}set(e,t){var i=this;return(0,u.Z)(function*(){yield i.storage.set(e,t)})()}getConnexionInfo(){var e=this;return(0,u.Z)(function*(){return yield e.storage.get(f.K.InfoConnexion)})()}}return(c=o).\u0275fac=function(e){return new(e||c)(h.LFG(v.K),h.LFG(b))},c.\u0275prov=h.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),o})()}}]);