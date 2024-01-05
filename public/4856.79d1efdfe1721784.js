"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4856],{4856:(E,b,p)=>{p.r(b),p.d(b,{PlatDetailsPageModule:()=>D});var u=p(6814),v=p(95),o=p(7027),C=p(9801),x=p(5861),e=p(6689),I=p(5512),F=p(6199),O=p(6815),_=p(4956);let m=(()=>{var n;class d{transform(t,r){return t.filter(c=>c.libelle.toLowerCase().startsWith(r.toLowerCase()))}}return(n=d).\u0275fac=function(t){return new(t||n)},n.\u0275pipe=e.Yjl({name:"articleFiltrePlat",type:n,pure:!0}),d})();function y(n,d){if(1&n){const f=e.EpF();e.TgZ(0,"ion-item-sliding")(1,"ion-item")(2,"ion-label"),e._uU(3),e.qZA()(),e.TgZ(4,"ion-item-options",4)(5,"ion-item-option",5),e.NdJ("click",function(){const g=e.CHM(f).$implicit,c=e.oxw();return e.KtG(c.selectArticle(g))}),e._uU(6,"Selectionner"),e.qZA()()()}if(2&n){const f=d.$implicit;e.xp6(3),e.AsE("",f.libelle," - ",f.prix[0].prix," xpf")}}let A=(()=>{var n;class d{constructor(t){this.articleService=t,this.searchValue="",this.articles=[],this.articlesOutput=new e.vpe}ngOnInit(){this.onInit()}onInit(){var t=this;return(0,x.Z)(function*(){const r=yield t.getArticles();t.articles=r})()}getArticles(){var t=this;return(0,x.Z)(function*(){return yield t.articleService.get()})()}selectArticle(t){this.articlesOutput.emit(t)}}return(n=d).\u0275fac=function(t){return new(t||n)(e.Y36(I.J))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-search-article-plat"]],outputs:{articlesOutput:"articlesOutput"},decls:10,vars:5,consts:[[2,"width","80%","margin","auto","margin-top","20px"],[3,"ngModel","ngModelChange"],[2,"margin","5%","width","100%","height","460px","overflow","scroll"],[4,"ngFor","ngForOf"],["side","end"],[3,"click"]],template:function(t,r){1&t&&(e.TgZ(0,"ion-card",0)(1,"ion-card-header")(2,"ion-card-subtitle"),e._uU(3,"Rechercher d'article"),e.qZA()(),e.TgZ(4,"ion-card-content")(5,"ion-toolbar")(6,"ion-searchbar",1),e.NdJ("ngModelChange",function(c){return r.searchValue=c}),e.qZA()(),e.TgZ(7,"ion-list",2),e.YNc(8,y,7,2,"ion-item-sliding",3),e.ALo(9,"articleFiltrePlat"),e.qZA()()()),2&t&&(e.xp6(6),e.Q6J("ngModel",r.searchValue),e.xp6(2),e.Q6J("ngForOf",e.xi3(9,2,r.articles,r.searchValue)))},dependencies:[u.sg,v.JJ,v.On,o.PM,o.FN,o.Zi,o.tO,o.Ie,o.u8,o.IK,o.td,o.Q$,o.q_,o.VI,o.sr,o.j9,m]}),d})();function T(n,d){if(1&n){const f=e.EpF();e.TgZ(0,"ion-content")(1,"app-search-article-plat",6),e.NdJ("articlesOutput",function(r){e.CHM(f);const g=e.oxw();return e.KtG(g.selectArticle(r))}),e.qZA(),e.TgZ(2,"ion-fab",7)(3,"ion-fab-button",8),e.NdJ("click",function(){e.CHM(f);const r=e.oxw();return e.KtG(r.setIsRechercheAvance())}),e._UZ(4,"ion-icon",9),e.qZA()()()}}function i(n,d){if(1&n){const f=e.EpF();e.TgZ(0,"ion-item-sliding")(1,"ion-item",12),e.NdJ("click",function(){const g=e.CHM(f).$implicit,c=e.oxw(2);return e.KtG(c.put(g))}),e.TgZ(2,"ion-label")(3,"h3"),e._uU(4),e.qZA()()(),e.TgZ(5,"ion-item-options",13)(6,"ion-item-option",14),e.NdJ("click",function(){const g=e.CHM(f).$implicit,c=e.oxw(2);return e.KtG(c.retirer(g))}),e._uU(7," Retirer "),e.qZA()(),e.TgZ(8,"ion-item-options",15)(9,"ion-item-option",16),e.NdJ("click",function(){const g=e.CHM(f).$implicit,c=e.oxw(2);return e.KtG(c.sendToCourse(g))}),e._uU(10," Ajouter au panier "),e.qZA()()()}if(2&n){const f=d.$implicit;e.xp6(1),e.Q6J("disabled","DELETE"===f.firebaseMethod),e.xp6(3),e.AsE("",f.article.libelle," - ",f.total," XPF")}}function s(n,d){if(1&n){const f=e.EpF();e.TgZ(0,"ion-content",10),e._UZ(1,"br"),e.TgZ(2,"ion-list"),e.YNc(3,i,11,3,"ion-item-sliding",11),e.qZA(),e.TgZ(4,"ion-fab",7)(5,"ion-fab-button",8),e.NdJ("click",function(){e.CHM(f);const r=e.oxw();return e.KtG(r.post())}),e._UZ(6,"ion-icon",9),e.qZA()()()}if(2&n){const f=e.oxw();e.Q6J("fullscreen",!0),e.xp6(3),e.Q6J("ngForOf",f.platdetails)}}const a=[{path:"",component:(()=>{var n;class d{constructor(t,r,g,c,P,Z){this.route=t,this.alertController=r,this.articleservice=g,this.courseservice=c,this.utility=P,this.platservice=Z,this.platid=0,this.plat={id:0,libelle:"",total:0,createdOn:new Date,isFirebase:!1},this.platdetails=[],this.totalPlat=0,this.isRechercheAvancee=!1}ngOnInit(){var t=this;return(0,x.Z)(function*(){yield t.refresh()})()}selectArticle(t){var r=this;return(0,x.Z)(function*(){yield r.postQuantite(t),r.setIsRechercheAvance()})()}refresh(){var t=this;return(0,x.Z)(function*(){const r=yield t.route.snapshot.params.id;t.platid=r;var g=yield t.platservice.getPlatById(+r);t.plat=g;var c=yield t.platservice.getPlatDetails(+r);t.platdetails=c,t.calculeTotal()})()}setIsRechercheAvance(){this.isRechercheAvancee=!this.isRechercheAvancee}post(){var t=this;return(0,x.Z)(function*(){const r=[];var c;(yield t.articleservice.get()).map(c=>{r.push({type:"radio",value:c,label:c.libelle})}),yield(yield t.alertController.create({cssClass:"my-custom-class",header:"Cr\xe9er un plat",inputs:r,buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Recherche avanc\xe9e",cssClass:"secondary",handler:()=>{t.setIsRechercheAvance()}},{text:"Valider",handler:(c=(0,x.Z)(function*(P){yield t.postQuantite(P)}),function(Z){return c.apply(this,arguments)})}]})).present()})()}postQuantite(t){var r=this;return(0,x.Z)(function*(){var c;yield(yield r.alertController.create({cssClass:"my-custom-class",header:"Cr\xe9er un plat",inputs:[{type:"number",name:"quantite",placeholder:"qt\xe9 1"}],buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Valider",handler:(c=(0,x.Z)(function*(P){var Z=""===P.quantite?1:Number(P.quantite),M={id:0,ordre:Number(new Date),platId:Number(r.platid),article:t,quantite:Z,total:t.prix[0].prix*Z,isFirebase:!1};yield r.platservice.postPlatDetail(M),yield r.refresh()}),function(Z){return c.apply(this,arguments)})}]})).present()})()}calculeTotal(){var t=this;return(0,x.Z)(function*(){const r=t.platdetails;var g=0;if(r.length>0)for(let c of r)g+=c.article.prix[0].prix*c.quantite;t.totalPlat=g,t.plat.total=g,yield t.platservice.put(t.plat)})()}put(t){var r=this;return(0,x.Z)(function*(){var c;yield(yield r.alertController.create({cssClass:"my-custom-class",header:"Cr\xe9er un plat",inputs:[{type:"number",name:"quantite",placeholder:"qt\xe9 : "+t.quantite}],buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Valider",handler:(c=(0,x.Z)(function*(P){var Z=Number(""===P.quantite?t.quantite:P.quantite);t.quantite=Z,t.total=t.article.prix[0].prix*Z,yield r.platservice.putPlatDetail(t),yield r.refresh()}),function(Z){return c.apply(this,arguments)})}]})).present()})()}retirer(t){var r=this;return(0,x.Z)(function*(){yield r.platservice.deleteDefinitivementPlatDetail(t),yield r.refresh()})()}sendToCourse(t){var r=this;return(0,x.Z)(function*(){const g=yield r.courseservice.getCourseIsFocus(),c=t.article.prix.find(Z=>Z.magasin===g[0].magasinId),P={id:Number(new Date),ordre:0,courseId:g[0].id.toString(),libelle:t.article.libelle,quantite:t.quantite,articleId:t.article.id,prixArticle:void 0===c?t.article.prix[0].prix:c.prix,prixReel:void 0===c?t.article.prix[0].prix:c.prix,total:Number(t.quantite*(void 0===c?t.article.prix[0].prix:c.prix)),checked:!1,isFirebase:!1};yield r.courseservice.postCourseDetails(P),r.utility.popUp("Article ajout\xe9 au panier"),r.refresh()})()}}return(n=d).\u0275fac=function(t){return new(t||n)(e.Y36(C.gz),e.Y36(o.Br),e.Y36(I.J),e.Y36(F.N),e.Y36(O.t),e.Y36(_.r))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-plat-details"]],decls:8,vars:5,consts:[[3,"translucent"],["slot","start"],["defaultHref","/plats"],[2,"text-align","center"],[4,"ngIf"],[3,"fullscreen",4,"ngIf"],[3,"articlesOutput"],["slot","fixed","horizontal","end","vertical","bottom"],["size","small",3,"click"],["name","add"],[3,"fullscreen"],[4,"ngFor","ngForOf"],["button","","detail","true",3,"disabled","click"],["side","start"],[2,"background","red",3,"click"],["side","end"],[2,"background","rgb(0, 183, 255)",3,"click"]],template:function(t,r){1&t&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e._UZ(3,"ion-back-button",2),e.qZA(),e.TgZ(4,"ion-title",3),e._uU(5),e.qZA()()(),e.YNc(6,T,5,0,"ion-content",4),e.YNc(7,s,7,2,"ion-content",5)),2&t&&(e.Q6J("translucent",!0),e.xp6(5),e.AsE("",r.plat.libelle," - Total : ",r.plat.total," XPF"),e.xp6(1),e.Q6J("ngIf",r.isRechercheAvancee),e.xp6(1),e.Q6J("ngIf",!r.isRechercheAvancee))},dependencies:[u.sg,u.O5,o.oU,o.Sm,o.W2,o.IJ,o.W4,o.Gu,o.gu,o.Ie,o.u8,o.IK,o.td,o.Q$,o.q_,o.wd,o.sr,o.cs,A]}),d})()}];let h=(()=>{var n;class d{}return(n=d).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[C.Bz.forChild(a),C.Bz]}),d})(),D=(()=>{var n;class d{}return(n=d).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[u.ez,v.u5,o.Pc,h]}),d})()},5512:(E,b,p)=>{p.d(b,{J:()=>e});var u=p(5861),v=p(3009),o=p(6689),C=p(849),x=p(6815);let e=(()=>{var I;class F{constructor(_,m){this.storage=_,this.utility=m}get(){var _=this;return(0,u.Z)(function*(){return _.orderByFamille(yield _.storage.get(v.K.Articles))})()}post(_){var m=this;return(0,u.Z)(function*(){yield m.storage.post(v.K.Articles,_)})()}put(_){var m=this;return(0,u.Z)(function*(){yield m.storage.put(v.K.Articles,_)})()}delete(_){var m=this;return(0,u.Z)(function*(){yield m.storage.delete(v.K.Articles,_)})()}deleteDefinitivement(_){var m=this;return(0,u.Z)(function*(){yield m.storage.deleteDefinitivement(v.K.Articles,_)})()}getArticleById(_){var m=this;return(0,u.Z)(function*(){return(yield m.get()).filter(A=>A.id==_)})()}getArticleByCodeBarre(_){var m=this;return(0,u.Z)(function*(){return(yield m.get()).filter(A=>A.codeBarre==_)})()}orderByFamille(_){return _.sort((m,y)=>m.familleId<y.familleId?-1:1)}}return(I=F).\u0275fac=function(_){return new(_||I)(o.LFG(C.V),o.LFG(x.t))},I.\u0275prov=o.Yz7({token:I,factory:I.\u0275fac,providedIn:"root"}),F})()},849:(E,b,p)=>{p.d(b,{V:()=>m});var u=p(5861),v=p(3009),o=function(y){return y.POST="POST",y.PUT="PUT",y.DELETE="DELETE",y}(o||{}),C=p(6689),x=p(2014),e=p(2386),I=p(9392),F=p(3182),O=p(553);let _=(()=>{var y;class A{constructor(i){this.firestore=i}post(i,s,l){return(0,u.Z)(function*(){const a=(0,F.ZF)(O.N.firebaseConfig),h=(0,I.ad)(a);yield(0,e.pl)((0,e.JU)(h,i,l),s)})()}getAll(i){var s=this;return(0,u.Z)(function*(){const l=yield(0,e.hJ)(s.firestore,i);return(0,e.BS)(l)})()}put(i,s,l){var a=this;return(0,u.Z)(function*(){const h=(0,e.JU)(a.firestore,i+"/"+s);return(0,e.r7)(h,l)})()}delete(i,s,l){var a=this;return(0,u.Z)(function*(){const h=(0,e.JU)(a.firestore,i+"/"+s);return(0,e.oe)(h)})()}}return(y=A).\u0275fac=function(i){return new(i||y)(C.LFG(e.gg))},y.\u0275prov=C.Yz7({token:y,factory:y.\u0275fac,providedIn:"root"}),A})(),m=(()=>{var y;class A{constructor(i,s){this.storage=i,this.firestore=s}postAll(i,s){var l=this;return(0,u.Z)(function*(){(yield l.getConnexionInfo()).isOnline&&(yield(yield s.filter(D=>!D.isFirebase)).map(function(){var D=(0,u.Z)(function*(n){n.isFirebase=!0,yield l.firestore.post(i,n,n.id.toString())});return function(n){return D.apply(this,arguments)}}())),yield l.storage.set(i,s)})()}post(i,s){var l=this;return(0,u.Z)(function*(){var a=yield l.getAll(i);s.id=Number(new Date),s.createdOn=new Date,s.modifiedOn=null,s.deletedOn=null,s.isFirebase=!1,a.push(s),yield l.postAll(i,a)})()}get(i){var s=this;return(0,u.Z)(function*(){return yield(yield s.storage.get(i)).filter(a=>""===a.deletedOn||null===a.deletedOn||void 0!==a.deletedOn)})()}getAll(i){var s=this;return(0,u.Z)(function*(){return yield s.storage.get(i)})()}getIndex(i,s){var l=this;return(0,u.Z)(function*(){return yield(yield l.getAll(i)).findIndex(h=>h.id===s)})()}put(i,s){var l=this;return(0,u.Z)(function*(){const a=yield l.getAll(i),h=yield l.getIndex(i,s.id);a[h]=s,a[h].modifiedOn=new Date,(yield l.getConnexionInfo()).isOnline?yield l.firestore.put(i,s.id.toString(),s):a[h].isFirebase&&(a[h].firebaseMethod=o.PUT),yield l.postAll(i,a)})()}delete(i,s){var l=this;return(0,u.Z)(function*(){const a=yield l.getAll(i),h=yield l.getIndex(i,s.id);a[h].deletedOn=new Date,a[h].firebaseMethod=o.DELETE,yield l.postAll(i,a),(yield l.getConnexionInfo()).isOnline&&(yield l.firestore.put(i,s.id.toString(),s))})()}deleteDefinitivement(i,s){var l=this;return(0,u.Z)(function*(){const a=yield l.getAll(i),h=yield l.getIndex(i,s.id);(yield l.getConnexionInfo()).isOnline?(a.splice(h,1),yield l.firestore.delete(i,s.id.toString(),s)):a[h].isFirebase?(a[h].firebaseMethod=o.DELETE,a[h].deletedOn=new Date):a.splice(h,1),yield l.postAll(i,a)})()}synchroniserAvecFirestore(){var i=this;return(0,u.Z)(function*(){(yield i.getConnexionInfo()).isOnline?(yield i.synchroniser(v.K.Utilisateurs),yield i.synchroniser(v.K.Articles),yield i.synchroniser(v.K.Courses),yield i.synchroniser(v.K.Familles),yield i.synchroniser(v.K.CourseDetails),yield i.synchroniser(v.K.Memos),yield i.synchroniser(v.K.HistoriquePrix),yield i.synchroniser(v.K.Magasins),yield i.synchroniser(v.K.Plats),yield i.synchroniser(v.K.PlatDetails),yield i.synchroniser(v.K.Groupes),yield i.synchroniser(v.K.Menus)):alert("Le mode onLine est d\xe9sactiv\xe9")})()}synchroniser(i){var s=this;return(0,u.Z)(function*(){if((yield s.getConnexionInfo()).isOnline){const a=yield s.storage.get(i),h=yield a.filter(n=>!n.isFirebase);h.length>0&&h.map(function(){var n=(0,u.Z)(function*(d){d.isFirebase=!0,yield s.firestore.post(i,d,d.id.toString())});return function(d){return n.apply(this,arguments)}}());const D=yield a.filter(n=>n.firebaseMethod===o.DELETE||n.firebaseMethod===o.PUT);D.length>0&&D.map(function(){var n=(0,u.Z)(function*(d){d.firebaseMethod===o.PUT&&(yield s.put(i,d)),d.firebaseMethod===o.DELETE&&(yield s.deleteDefinitivement(i,d))});return function(d){return n.apply(this,arguments)}}()),(yield s.firestore.getAll(i)).subscribe(n=>{s.storage.set(i,n)})}else alert("Le mode onLine est d\xe9sactiv\xe9")})()}set(i,s){var l=this;return(0,u.Z)(function*(){yield l.storage.set(i,s)})()}getConnexionInfo(){var i=this;return(0,u.Z)(function*(){return yield i.storage.get(v.K.InfoConnexion)})()}}return(y=A).\u0275fac=function(i){return new(i||y)(C.LFG(x.K),C.LFG(_))},y.\u0275prov=C.Yz7({token:y,factory:y.\u0275fac,providedIn:"root"}),A})()}}]);