"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4856],{4856:(E,T,d)=>{d.r(T),d.d(T,{PlatDetailsPageModule:()=>I});var c=d(6814),h=d(95),o=d(7027),C=d(9801),x=d(5861),e=d(6689),D=d(5512),F=d(6199),O=d(6815),y=d(4956);let v=(()=>{var n;class f{transform(t,r){return t.filter(u=>u.libelle.toLowerCase().startsWith(r.toLowerCase()))}}return(n=f).\u0275fac=function(t){return new(t||n)},n.\u0275pipe=e.Yjl({name:"articleFiltrePlat",type:n,pure:!0}),f})();function m(n,f){if(1&n){const p=e.EpF();e.TgZ(0,"ion-item-sliding")(1,"ion-item")(2,"ion-label"),e._uU(3),e.qZA()(),e.TgZ(4,"ion-item-options",4)(5,"ion-item-option",5),e.NdJ("click",function(){const _=e.CHM(p).$implicit,u=e.oxw();return e.KtG(u.selectArticle(_))}),e._uU(6,"Selectionner"),e.qZA()()()}if(2&n){const p=f.$implicit;e.xp6(3),e.AsE("",p.libelle," - ",p.prix[0].prix," xpf")}}let A=(()=>{var n;class f{constructor(t){this.articleService=t,this.searchValue="",this.articles=[],this.articlesOutput=new e.vpe}ngOnInit(){this.onInit()}onInit(){var t=this;return(0,x.Z)(function*(){const r=yield t.getArticles();t.articles=r})()}getArticles(){var t=this;return(0,x.Z)(function*(){return yield t.articleService.get()})()}selectArticle(t){this.articlesOutput.emit(t)}}return(n=f).\u0275fac=function(t){return new(t||n)(e.Y36(D.J))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-search-article-plat"]],outputs:{articlesOutput:"articlesOutput"},decls:10,vars:5,consts:[[2,"width","80%","margin","auto","margin-top","20px"],[3,"ngModel","ngModelChange"],[2,"margin","5%","width","100%","height","460px","overflow","scroll"],[4,"ngFor","ngForOf"],["side","end"],[3,"click"]],template:function(t,r){1&t&&(e.TgZ(0,"ion-card",0)(1,"ion-card-header")(2,"ion-card-subtitle"),e._uU(3,"Rechercher d'article"),e.qZA()(),e.TgZ(4,"ion-card-content")(5,"ion-toolbar")(6,"ion-searchbar",1),e.NdJ("ngModelChange",function(u){return r.searchValue=u}),e.qZA()(),e.TgZ(7,"ion-list",2),e.YNc(8,m,7,2,"ion-item-sliding",3),e.ALo(9,"articleFiltrePlat"),e.qZA()()()),2&t&&(e.xp6(6),e.Q6J("ngModel",r.searchValue),e.xp6(2),e.Q6J("ngForOf",e.xi3(9,2,r.articles,r.searchValue)))},dependencies:[c.sg,h.JJ,h.On,o.PM,o.FN,o.Zi,o.tO,o.Ie,o.u8,o.IK,o.td,o.Q$,o.q_,o.VI,o.sr,o.j9,v]}),f})();function b(n,f){if(1&n){const p=e.EpF();e.TgZ(0,"ion-content")(1,"app-search-article-plat",6),e.NdJ("articlesOutput",function(r){e.CHM(p);const _=e.oxw();return e.KtG(_.selectArticle(r))}),e.qZA(),e.TgZ(2,"ion-fab",7)(3,"ion-fab-button",8),e.NdJ("click",function(){e.CHM(p);const r=e.oxw();return e.KtG(r.setIsRechercheAvance())}),e._UZ(4,"ion-icon",9),e.qZA()()()}}function i(n,f){if(1&n){const p=e.EpF();e.TgZ(0,"ion-item-sliding")(1,"ion-item",12),e.NdJ("click",function(){const _=e.CHM(p).$implicit,u=e.oxw(2);return e.KtG(u.put(_))}),e.TgZ(2,"ion-label")(3,"h3"),e._uU(4),e.qZA()()(),e.TgZ(5,"ion-item-options",13)(6,"ion-item-option",14),e.NdJ("click",function(){const _=e.CHM(p).$implicit,u=e.oxw(2);return e.KtG(u.retirer(_))}),e._uU(7," Retirer "),e.qZA()(),e.TgZ(8,"ion-item-options",15)(9,"ion-item-option",16),e.NdJ("click",function(){const _=e.CHM(p).$implicit,u=e.oxw(2);return e.KtG(u.sendToCourse(_))}),e._uU(10," Ajouter au panier "),e.qZA()()()}if(2&n){const p=f.$implicit;e.xp6(1),e.Q6J("disabled","DELETE"===p.firebaseMethod),e.xp6(3),e.AsE("",p.article.libelle," - ",p.total," XPF")}}function s(n,f){if(1&n){const p=e.EpF();e.TgZ(0,"ion-content",10),e._UZ(1,"br"),e.TgZ(2,"ion-list"),e.YNc(3,i,11,3,"ion-item-sliding",11),e.qZA(),e.TgZ(4,"ion-fab",7)(5,"ion-fab-button",8),e.NdJ("click",function(){e.CHM(p);const r=e.oxw();return e.KtG(r.post())}),e._UZ(6,"ion-icon",9),e.qZA()()()}if(2&n){const p=e.oxw();e.Q6J("fullscreen",!0),e.xp6(3),e.Q6J("ngForOf",p.platdetails)}}const a=[{path:"",component:(()=>{var n;class f{constructor(t,r,_,u,P,Z){this.route=t,this.alertController=r,this.articleservice=_,this.courseservice=u,this.utility=P,this.platservice=Z,this.platid=0,this.plat={id:0,libelle:"",total:0,createdOn:new Date,isFirebase:!1},this.platdetails=[],this.totalPlat=0,this.isRechercheAvancee=!1}ngOnInit(){var t=this;return(0,x.Z)(function*(){yield t.refresh()})()}selectArticle(t){var r=this;return(0,x.Z)(function*(){yield r.postQuantite(t),r.setIsRechercheAvance()})()}refresh(){var t=this;return(0,x.Z)(function*(){const r=yield t.route.snapshot.params.id;t.platid=r;var _=yield t.platservice.getPlatById(+r);t.plat=_;var u=yield t.platservice.getPlatDetails(+r);t.platdetails=u,t.calculeTotal()})()}setIsRechercheAvance(){this.isRechercheAvancee=!this.isRechercheAvancee}post(){var t=this;return(0,x.Z)(function*(){const r=[];var u;(yield t.articleservice.get()).map(u=>{r.push({type:"radio",value:u,label:u.libelle})}),yield(yield t.alertController.create({cssClass:"my-custom-class",header:"Cr\xe9er un plat",inputs:r,buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Recherche avanc\xe9e",cssClass:"secondary",handler:()=>{t.setIsRechercheAvance()}},{text:"Valider",handler:(u=(0,x.Z)(function*(P){yield t.postQuantite(P)}),function(Z){return u.apply(this,arguments)})}]})).present()})()}postQuantite(t){var r=this;return(0,x.Z)(function*(){var u;yield(yield r.alertController.create({cssClass:"my-custom-class",header:"Cr\xe9er un plat",inputs:[{type:"number",name:"quantite",placeholder:"qt\xe9 1"}],buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Valider",handler:(u=(0,x.Z)(function*(P){var Z=""===P.quantite?1:Number(P.quantite),M={id:0,ordre:Number(new Date),platId:Number(r.platid),article:t,quantite:Z,total:t.prix[0].prix*Z,isFirebase:!1};yield r.platservice.postPlatDetail(M),yield r.refresh()}),function(Z){return u.apply(this,arguments)})}]})).present()})()}calculeTotal(){var t=this;return(0,x.Z)(function*(){const r=t.platdetails;var _=0;if(r.length>0)for(let u of r)_+=u.article.prix[0].prix*u.quantite;t.totalPlat=_,t.plat.total=_,yield t.platservice.put(t.plat)})()}put(t){var r=this;return(0,x.Z)(function*(){var u;yield(yield r.alertController.create({cssClass:"my-custom-class",header:"Cr\xe9er un plat",inputs:[{type:"number",name:"quantite",placeholder:"qt\xe9 : "+t.quantite}],buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Valider",handler:(u=(0,x.Z)(function*(P){var Z=Number(""===P.quantite?t.quantite:P.quantite);t.quantite=Z,t.total=t.article.prix[0].prix*Z,yield r.platservice.putPlatDetail(t),yield r.refresh()}),function(Z){return u.apply(this,arguments)})}]})).present()})()}retirer(t){var r=this;return(0,x.Z)(function*(){yield r.platservice.deleteDefinitivementPlatDetail(t),yield r.refresh()})()}sendToCourse(t){var r=this;return(0,x.Z)(function*(){const _=yield r.courseservice.getCourseIsFocus(),u=t.article.prix.find(Z=>Z.magasin===_[0].magasinId),P={id:Number(new Date),ordre:0,courseId:_[0].id.toString(),libelle:t.article.libelle,quantite:t.quantite,articleId:t.article.id,prixArticle:void 0===u?t.article.prix[0].prix:u.prix,prixReel:void 0===u?t.article.prix[0].prix:u.prix,total:Number(t.quantite*(void 0===u?t.article.prix[0].prix:u.prix)),checked:!1,isFirebase:!1};yield r.courseservice.postCourseDetails(P),r.utility.popUp("Article ajout\xe9 au panier"),r.refresh()})()}}return(n=f).\u0275fac=function(t){return new(t||n)(e.Y36(C.gz),e.Y36(o.Br),e.Y36(D.J),e.Y36(F.N),e.Y36(O.t),e.Y36(y.r))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-plat-details"]],decls:8,vars:5,consts:[[3,"translucent"],["slot","start"],["defaultHref","/plats"],[2,"text-align","center"],[4,"ngIf"],[3,"fullscreen",4,"ngIf"],[3,"articlesOutput"],["slot","fixed","horizontal","end","vertical","bottom"],["size","small",3,"click"],["name","add"],[3,"fullscreen"],[4,"ngFor","ngForOf"],["button","","detail","true",3,"disabled","click"],["side","start"],[2,"background","red",3,"click"],["side","end"],[2,"background","rgb(0, 183, 255)",3,"click"]],template:function(t,r){1&t&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e._UZ(3,"ion-back-button",2),e.qZA(),e.TgZ(4,"ion-title",3),e._uU(5),e.qZA()()(),e.YNc(6,b,5,0,"ion-content",4),e.YNc(7,s,7,2,"ion-content",5)),2&t&&(e.Q6J("translucent",!0),e.xp6(5),e.AsE("",r.plat.libelle," - Total : ",r.plat.total," XPF"),e.xp6(1),e.Q6J("ngIf",r.isRechercheAvancee),e.xp6(1),e.Q6J("ngIf",!r.isRechercheAvancee))},dependencies:[c.sg,c.O5,o.oU,o.Sm,o.W2,o.IJ,o.W4,o.Gu,o.gu,o.Ie,o.u8,o.IK,o.td,o.Q$,o.q_,o.wd,o.sr,o.cs,A]}),f})()}];let g=(()=>{var n;class f{}return(n=f).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[C.Bz.forChild(a),C.Bz]}),f})(),I=(()=>{var n;class f{}return(n=f).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[c.ez,h.u5,o.Pc,g]}),f})()},9825:(E,T,d)=>{d.d(T,{f:()=>c});var c=function(h){return h.POST="POST",h.PUT="PUT",h.DELETE="DELETE",h}(c||{})},5512:(E,T,d)=>{d.d(T,{J:()=>e});var c=d(5861),h=d(3009),o=d(6689),C=d(5423),x=d(6815);let e=(()=>{var D;class F{constructor(y,v){this.storage=y,this.utility=v}get(){var y=this;return(0,c.Z)(function*(){return y.orderByFamille(yield y.storage.get(h.K.Articles))})()}post(y){var v=this;return(0,c.Z)(function*(){yield v.storage.post(h.K.Articles,y)})()}put(y){var v=this;return(0,c.Z)(function*(){yield v.storage.put(h.K.Articles,y)})()}delete(y){var v=this;return(0,c.Z)(function*(){yield v.storage.delete(h.K.Articles,y)})()}deleteDefinitivement(y){var v=this;return(0,c.Z)(function*(){yield v.storage.deleteDefinitivement(h.K.Articles,y)})()}getArticleById(y){var v=this;return(0,c.Z)(function*(){return(yield v.get()).filter(A=>A.id==y)})()}getArticleByCodeBarre(y){var v=this;return(0,c.Z)(function*(){return(yield v.get()).filter(A=>A.codeBarre==y)})()}orderByFamille(y){return y.sort((v,m)=>v.familleId<m.familleId?-1:1)}}return(D=F).\u0275fac=function(y){return new(y||D)(o.LFG(C.V),o.LFG(x.t))},D.\u0275prov=o.Yz7({token:D,factory:D.\u0275fac,providedIn:"root"}),F})()},5423:(E,T,d)=>{d.d(T,{V:()=>v});var c=d(5861),h=d(3009),o=d(9825),C=d(6689),x=d(2014),e=d(2386),D=d(9392),F=d(3182),O=d(553);let y=(()=>{var m;class A{constructor(i){this.firestore=i}post(i,s,l){return(0,c.Z)(function*(){const a=(0,F.ZF)(O.N.firebaseConfig),g=(0,D.ad)(a);yield(0,e.pl)((0,e.JU)(g,i,l),s)})()}getAll(i){var s=this;return(0,c.Z)(function*(){const l=yield(0,e.hJ)(s.firestore,i);return(0,e.BS)(l)})()}put(i,s,l){var a=this;return(0,c.Z)(function*(){const g=(0,e.JU)(a.firestore,i+"/"+s);return(0,e.r7)(g,l)})()}delete(i,s,l){var a=this;return(0,c.Z)(function*(){const g=(0,e.JU)(a.firestore,i+"/"+s);return(0,e.oe)(g)})()}}return(m=A).\u0275fac=function(i){return new(i||m)(C.LFG(e.gg))},m.\u0275prov=C.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"}),A})(),v=(()=>{var m;class A{constructor(i,s){this.storage=i,this.firestore=s}postAll(i,s){var l=this;return(0,c.Z)(function*(){(yield l.getConnexionInfo()).isOnline&&(yield(yield s.filter(I=>!I.isFirebase)).map(function(){var I=(0,c.Z)(function*(n){n.isFirebase=!0,yield l.firestore.post(i,n,n.id.toString())});return function(n){return I.apply(this,arguments)}}())),yield l.storage.set(i,s)})()}post(i,s){var l=this;return(0,c.Z)(function*(){var a=yield l.getAll(i);s.id=Number(new Date),s.createdOn=new Date,s.modifiedOn=null,s.deletedOn=null,s.isFirebase=!1,a.push(s),yield l.postAll(i,a)})()}get(i){var s=this;return(0,c.Z)(function*(){return yield(yield s.storage.get(i)).filter(a=>""===a.deletedOn||null===a.deletedOn||void 0!==a.deletedOn)})()}getAll(i){var s=this;return(0,c.Z)(function*(){return yield s.storage.get(i)})()}getIndex(i,s){var l=this;return(0,c.Z)(function*(){return yield(yield l.getAll(i)).findIndex(g=>g.id===s)})()}put(i,s){var l=this;return(0,c.Z)(function*(){const a=yield l.getAll(i),g=yield l.getIndex(i,s.id);a[g]=s,a[g].modifiedOn=new Date,(yield l.getConnexionInfo()).isOnline?yield l.firestore.put(i,s.id.toString(),s):a[g].isFirebase&&(a[g].firebaseMethod=o.f.PUT),yield l.postAll(i,a)})()}delete(i,s){var l=this;return(0,c.Z)(function*(){const a=yield l.getAll(i),g=yield l.getIndex(i,s.id);a[g].deletedOn=new Date,a[g].firebaseMethod=o.f.DELETE,yield l.postAll(i,a),(yield l.getConnexionInfo()).isOnline&&(yield l.firestore.put(i,s.id.toString(),s))})()}deleteDefinitivement(i,s){var l=this;return(0,c.Z)(function*(){const a=yield l.getAll(i),g=yield l.getIndex(i,s.id);(yield l.getConnexionInfo()).isOnline?(a.splice(g,1),yield l.firestore.delete(i,s.id.toString(),s)):a[g].isFirebase?(a[g].firebaseMethod=o.f.DELETE,a[g].deletedOn=new Date):a.splice(g,1),yield l.postAll(i,a)})()}synchroniserAvecFirestore(){var i=this;return(0,c.Z)(function*(){(yield i.getConnexionInfo()).isOnline?(yield i.synchroniser(h.K.Utilisateurs),yield i.synchroniser(h.K.Articles),yield i.synchroniser(h.K.Courses),yield i.synchroniser(h.K.Familles),yield i.synchroniser(h.K.CourseDetails),yield i.synchroniser(h.K.Memos),yield i.synchroniser(h.K.HistoriquePrix),yield i.synchroniser(h.K.Depenses),yield i.synchroniser(h.K.Magasins),yield i.synchroniser(h.K.Plats),yield i.synchroniser(h.K.PlatDetails),yield i.synchroniser(h.K.Groupes),yield i.synchroniser(h.K.Menus)):alert("Le mode onLine est d\xe9sactiv\xe9")})()}synchroniser(i){var s=this;return(0,c.Z)(function*(){if((yield s.getConnexionInfo()).isOnline){const a=yield s.storage.get(i),g=yield a.filter(n=>!n.isFirebase);g.length>0&&g.map(function(){var n=(0,c.Z)(function*(f){f.isFirebase=!0,yield s.firestore.post(i,f,f.id.toString())});return function(f){return n.apply(this,arguments)}}());const I=yield a.filter(n=>n.firebaseMethod===o.f.DELETE||n.firebaseMethod===o.f.PUT);I.length>0&&I.map(function(){var n=(0,c.Z)(function*(f){f.firebaseMethod===o.f.PUT&&(yield s.put(i,f)),f.firebaseMethod===o.f.DELETE&&(yield s.deleteDefinitivement(i,f))});return function(f){return n.apply(this,arguments)}}()),(yield s.firestore.getAll(i)).subscribe(n=>{s.storage.set(i,n)})}else alert("Le mode onLine est d\xe9sactiv\xe9")})()}set(i,s){var l=this;return(0,c.Z)(function*(){yield l.storage.set(i,s)})()}getConnexionInfo(){var i=this;return(0,c.Z)(function*(){return yield i.storage.get(h.K.InfoConnexion)})()}}return(m=A).\u0275fac=function(i){return new(i||m)(C.LFG(x.K),C.LFG(y))},m.\u0275prov=C.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"}),A})()}}]);