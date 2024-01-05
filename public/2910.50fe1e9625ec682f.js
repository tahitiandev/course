"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2910],{8297:(S,m,c)=>{c.r(m),c.d(m,{PlatsPageModule:()=>v});var a=c(6814),p=c(95),o=c(7027),g=c(9801),h=c(5861),i=c(6689),P=c(4956),Z=c(6199);function b(l,e){if(1&l){const t=i.EpF();i.TgZ(0,"ion-item-sliding")(1,"ion-item",7)(2,"ion-label")(3,"h3"),i._uU(4),i.qZA()()(),i.TgZ(5,"ion-item-options",8)(6,"ion-item-option",9),i.NdJ("click",function(){const s=i.CHM(t).$implicit,f=i.oxw();return i.KtG(f.delete(s))}),i._uU(7," Supprimer "),i.qZA()(),i.TgZ(8,"ion-item-options",10)(9,"ion-item-option",11),i.NdJ("click",function(){const s=i.CHM(t).$implicit,f=i.oxw();return i.KtG(f.postToPanier(s))}),i._uU(10," Envoyer au panier "),i.qZA()()()}if(2&l){const t=e.$implicit;i.xp6(1),i.MGl("routerLink","../plat-details/",t.id,""),i.Q6J("disabled","DELETE"===t.firebaseMethod),i.xp6(3),i.AsE("",t.libelle," - ",t.total," XPF")}}const I=[{path:"",component:(()=>{var l;class e{constructor(n,r,s){this.platservice=n,this.courseservice=r,this.alertController=s,this.plats=[]}ngOnInit(){var n=this;return(0,h.Z)(function*(){yield n.refresh()})()}refresh(){var n=this;return(0,h.Z)(function*(){n.plats=yield n.platservice.get()})()}post(){var n=this;return(0,h.Z)(function*(){var s;yield(yield n.alertController.create({cssClass:"my-custom-class",header:"Cr\xe9er un plat",inputs:[{type:"text",name:"libelle"}],buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Valider",handler:(s=(0,h.Z)(function*(f){const u={id:0,libelle:""==f.libelle?"A d\xe9finir":f.libelle,total:0,createdOn:new Date,isFirebase:!1};yield n.platservice.post(u),yield n.refresh()}),function(u){return s.apply(this,arguments)})}]})).present()})()}delete(n){var r=this;return(0,h.Z)(function*(){yield r.platservice.deleteDefinitivement(n),yield r.refresh()})()}postToPanier(n){var r=this;return(0,h.Z)(function*(){const s=[];var y;(yield r.platservice.getPlatDetails(n.id)).map(y=>{s.push({type:"checkbox",label:y.article.libelle,value:y,checked:!0})}),yield(yield r.alertController.create({cssClass:"my-custom-class",header:"Cr\xe9er un plat",inputs:s,buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Valider",handler:(y=(0,h.Z)(function*(T){if(T.length>0){const C=yield r.courseservice.getCourseIsFocus();yield T.map(function(){var O=(0,h.Z)(function*(x){var E=yield x.article.prix.find(M=>M.magasin===C[0].magasinId),A=void 0===E?x.article.prix[0].prix:E,D={id:0,ordre:0,courseId:C[0].id.toString(),libelle:x.article.libelle,quantite:x.quantite,articleId:x.article.id,prixArticle:Number(A),prixReel:Number(A),total:Number(A)*x.quantite,isFirebase:!1,checked:!1};yield r.courseservice.postCourseDetails(D)});return function(x){return O.apply(this,arguments)}}()),yield r.refresh()}}),function(C){return y.apply(this,arguments)})}]})).present()})()}}return(l=e).\u0275fac=function(n){return new(n||l)(i.Y36(P.r),i.Y36(Z.N),i.Y36(o.Br))},l.\u0275cmp=i.Xpm({type:l,selectors:[["app-plats"]],decls:13,vars:3,consts:[[3,"translucent"],["slot","start"],[3,"fullscreen"],[4,"ngFor","ngForOf"],["slot","fixed","horizontal","end","vertical","bottom"],["size","small",3,"click"],["name","add"],["button","","detail","true",3,"routerLink","disabled"],["side","start"],[2,"background","red",3,"click"],["side","end"],[3,"click"]],template:function(n,r){1&n&&(i.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),i._UZ(3,"ion-menu-button"),i.qZA(),i.TgZ(4,"ion-title"),i._uU(5,"Nos plats"),i.qZA()()(),i.TgZ(6,"ion-content",2),i._UZ(7,"br"),i.TgZ(8,"ion-list"),i.YNc(9,b,11,4,"ion-item-sliding",3),i.qZA(),i.TgZ(10,"ion-fab",4)(11,"ion-fab-button",5),i.NdJ("click",function(){return r.post()}),i._UZ(12,"ion-icon",6),i.qZA()()()),2&n&&(i.Q6J("translucent",!0),i.xp6(6),i.Q6J("fullscreen",!0),i.xp6(3),i.Q6J("ngForOf",r.plats))},dependencies:[a.sg,o.Sm,o.W2,o.IJ,o.W4,o.Gu,o.gu,o.Ie,o.u8,o.IK,o.td,o.Q$,o.q_,o.fG,o.wd,o.sr,o.YI,g.rH]}),e})()}];let d=(()=>{var l;class e{}return(l=e).\u0275fac=function(n){return new(n||l)},l.\u0275mod=i.oAB({type:l}),l.\u0275inj=i.cJS({imports:[g.Bz.forChild(I),g.Bz]}),e})(),v=(()=>{var l;class e{}return(l=e).\u0275fac=function(n){return new(n||l)},l.\u0275mod=i.oAB({type:l}),l.\u0275inj=i.cJS({imports:[a.ez,p.u5,o.Pc,d]}),e})()},849:(S,m,c)=>{c.d(m,{V:()=>I});var a=c(5861),p=c(3009),o=function(d){return d.POST="POST",d.PUT="PUT",d.DELETE="DELETE",d}(o||{}),g=c(6689),h=c(2014),i=c(2386),P=c(9392),Z=c(3182),b=c(553);let F=(()=>{var d;class v{constructor(e){this.firestore=e}post(e,t,n){return(0,a.Z)(function*(){const r=(0,Z.ZF)(b.N.firebaseConfig),s=(0,P.ad)(r);yield(0,i.pl)((0,i.JU)(s,e,n),t)})()}getAll(e){var t=this;return(0,a.Z)(function*(){const n=yield(0,i.hJ)(t.firestore,e);return(0,i.BS)(n)})()}put(e,t,n){var r=this;return(0,a.Z)(function*(){const s=(0,i.JU)(r.firestore,e+"/"+t);return(0,i.r7)(s,n)})()}delete(e,t,n){var r=this;return(0,a.Z)(function*(){const s=(0,i.JU)(r.firestore,e+"/"+t);return(0,i.oe)(s)})()}}return(d=v).\u0275fac=function(e){return new(e||d)(g.LFG(i.gg))},d.\u0275prov=g.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"}),v})(),I=(()=>{var d;class v{constructor(e,t){this.storage=e,this.firestore=t}postAll(e,t){var n=this;return(0,a.Z)(function*(){(yield n.getConnexionInfo()).isOnline&&(yield(yield t.filter(f=>!f.isFirebase)).map(function(){var f=(0,a.Z)(function*(u){u.isFirebase=!0,yield n.firestore.post(e,u,u.id.toString())});return function(u){return f.apply(this,arguments)}}())),yield n.storage.set(e,t)})()}post(e,t){var n=this;return(0,a.Z)(function*(){var r=yield n.getAll(e);t.id=Number(new Date),t.createdOn=new Date,t.modifiedOn=null,t.deletedOn=null,t.isFirebase=!1,r.push(t),yield n.postAll(e,r)})()}get(e){var t=this;return(0,a.Z)(function*(){return yield(yield t.storage.get(e)).filter(r=>""===r.deletedOn||null===r.deletedOn||void 0!==r.deletedOn)})()}getAll(e){var t=this;return(0,a.Z)(function*(){return yield t.storage.get(e)})()}getIndex(e,t){var n=this;return(0,a.Z)(function*(){return yield(yield n.getAll(e)).findIndex(s=>s.id===t)})()}put(e,t){var n=this;return(0,a.Z)(function*(){const r=yield n.getAll(e),s=yield n.getIndex(e,t.id);r[s]=t,r[s].modifiedOn=new Date,(yield n.getConnexionInfo()).isOnline?yield n.firestore.put(e,t.id.toString(),t):r[s].isFirebase&&(r[s].firebaseMethod=o.PUT),yield n.postAll(e,r)})()}delete(e,t){var n=this;return(0,a.Z)(function*(){const r=yield n.getAll(e),s=yield n.getIndex(e,t.id);r[s].deletedOn=new Date,r[s].firebaseMethod=o.DELETE,yield n.postAll(e,r),(yield n.getConnexionInfo()).isOnline&&(yield n.firestore.put(e,t.id.toString(),t))})()}deleteDefinitivement(e,t){var n=this;return(0,a.Z)(function*(){const r=yield n.getAll(e),s=yield n.getIndex(e,t.id);(yield n.getConnexionInfo()).isOnline?(r.splice(s,1),yield n.firestore.delete(e,t.id.toString(),t)):r[s].isFirebase?(r[s].firebaseMethod=o.DELETE,r[s].deletedOn=new Date):r.splice(s,1),yield n.postAll(e,r)})()}synchroniserAvecFirestore(){var e=this;return(0,a.Z)(function*(){(yield e.getConnexionInfo()).isOnline?(yield e.synchroniser(p.K.Utilisateurs),yield e.synchroniser(p.K.Articles),yield e.synchroniser(p.K.Courses),yield e.synchroniser(p.K.Familles),yield e.synchroniser(p.K.CourseDetails),yield e.synchroniser(p.K.Memos),yield e.synchroniser(p.K.HistoriquePrix),yield e.synchroniser(p.K.Magasins),yield e.synchroniser(p.K.Plats),yield e.synchroniser(p.K.PlatDetails),yield e.synchroniser(p.K.Groupes),yield e.synchroniser(p.K.Menus)):alert("Le mode onLine est d\xe9sactiv\xe9")})()}synchroniser(e){var t=this;return(0,a.Z)(function*(){if((yield t.getConnexionInfo()).isOnline){const r=yield t.storage.get(e),s=yield r.filter(u=>!u.isFirebase);s.length>0&&s.map(function(){var u=(0,a.Z)(function*(y){y.isFirebase=!0,yield t.firestore.post(e,y,y.id.toString())});return function(y){return u.apply(this,arguments)}}());const f=yield r.filter(u=>u.firebaseMethod===o.DELETE||u.firebaseMethod===o.PUT);f.length>0&&f.map(function(){var u=(0,a.Z)(function*(y){y.firebaseMethod===o.PUT&&(yield t.put(e,y)),y.firebaseMethod===o.DELETE&&(yield t.deleteDefinitivement(e,y))});return function(y){return u.apply(this,arguments)}}()),(yield t.firestore.getAll(e)).subscribe(u=>{t.storage.set(e,u)})}else alert("Le mode onLine est d\xe9sactiv\xe9")})()}set(e,t){var n=this;return(0,a.Z)(function*(){yield n.storage.set(e,t)})()}getConnexionInfo(){var e=this;return(0,a.Z)(function*(){return yield e.storage.get(p.K.InfoConnexion)})()}}return(d=v).\u0275fac=function(e){return new(e||d)(g.LFG(h.K),g.LFG(F))},d.\u0275prov=g.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"}),v})()}}]);