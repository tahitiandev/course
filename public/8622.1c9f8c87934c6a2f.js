"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8622],{8622:(P,I,f)=>{f.r(I),f.d(I,{MemoPageModule:()=>p});var d=f(6814),h=f(95),o=f(7027),A=f(9801),x=f(5861),e=f(6689),Z=f(3629),b=f(6199),F=f(5512);let _=(()=>{var n;class u{transform(i,s){return i.filter(m=>m.libelle.toLowerCase().startsWith(s.toLowerCase()))}}return(n=u).\u0275fac=function(i){return new(i||n)},n.\u0275pipe=e.Yjl({name:"articleFiltreMemo",type:n,pure:!0}),u})();function y(n,u){if(1&n){const l=e.EpF();e.TgZ(0,"ion-item-sliding")(1,"ion-item")(2,"ion-label"),e._uU(3),e.qZA()(),e.TgZ(4,"ion-item-options",4)(5,"ion-item-option",5),e.NdJ("click",function(){const g=e.CHM(l).$implicit,m=e.oxw();return e.KtG(m.selectArticle(g))}),e._uU(6,"Selectionner"),e.qZA()()()}if(2&n){const l=u.$implicit;e.xp6(3),e.AsE("",l.libelle," - ",l.prix[0].prix," xpf")}}let v=(()=>{var n;class u{constructor(i){this.articleService=i,this.searchValue="",this.articles=[],this.articlesOutput=new e.vpe}ngOnInit(){this.onInit()}onInit(){var i=this;return(0,x.Z)(function*(){const s=yield i.getArticles();i.articles=s})()}getArticles(){var i=this;return(0,x.Z)(function*(){return yield i.articleService.get()})()}selectArticle(i){this.articlesOutput.emit(i)}}return(n=u).\u0275fac=function(i){return new(i||n)(e.Y36(F.J))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-search-article-memo"]],outputs:{articlesOutput:"articlesOutput"},decls:10,vars:5,consts:[[2,"width","80%","margin","auto","margin-top","20px"],[3,"ngModel","ngModelChange"],[2,"margin","5%","width","100%","height","460px","overflow","scroll"],[4,"ngFor","ngForOf"],["side","end"],[3,"click"]],template:function(i,s){1&i&&(e.TgZ(0,"ion-card",0)(1,"ion-card-header")(2,"ion-card-subtitle"),e._uU(3,"Rechercher d'article"),e.qZA()(),e.TgZ(4,"ion-card-content")(5,"ion-toolbar")(6,"ion-searchbar",1),e.NdJ("ngModelChange",function(m){return s.searchValue=m}),e.qZA()(),e.TgZ(7,"ion-list",2),e.YNc(8,y,7,2,"ion-item-sliding",3),e.ALo(9,"articleFiltreMemo"),e.qZA()()()),2&i&&(e.xp6(6),e.Q6J("ngModel",s.searchValue),e.xp6(2),e.Q6J("ngForOf",e.xi3(9,2,s.articles,s.searchValue)))},dependencies:[d.sg,h.JJ,h.On,o.PM,o.FN,o.Zi,o.tO,o.Ie,o.u8,o.IK,o.td,o.Q$,o.q_,o.VI,o.sr,o.j9,_]}),u})();function M(n,u){if(1&n){const l=e.EpF();e.TgZ(0,"ion-content")(1,"app-search-article-memo",4),e.NdJ("articlesOutput",function(s){e.CHM(l);const g=e.oxw();return e.KtG(g.selectArticle(s))}),e.qZA()()}}function T(n,u){if(1&n){const l=e.EpF();e.TgZ(0,"ion-item-sliding")(1,"ion-item",11),e.NdJ("click",function(){const g=e.CHM(l).$implicit,m=e.oxw(2);return e.KtG(m.put(g))}),e.TgZ(2,"ion-label"),e._uU(3),e.qZA(),e.TgZ(4,"ion-label",12),e._uU(5),e.qZA()(),e.TgZ(6,"ion-item-options",13)(7,"ion-item-option",14),e.NdJ("click",function(){const g=e.CHM(l).$implicit,m=e.oxw(2);return e.KtG(m.sendToCourse(g))}),e._uU(8," Envoyer "),e.qZA(),e.TgZ(9,"ion-item-option",14),e.NdJ("click",function(){const g=e.CHM(l).$implicit,m=e.oxw(2);return e.KtG(m.retirer(g))}),e._uU(10," Retirer "),e.qZA()()()}if(2&n){const l=u.$implicit;e.xp6(3),e.Oqu(l.article.libelle),e.xp6(2),e.hij("Qte : ",l.quantite,"")}}function t(n,u){if(1&n){const l=e.EpF();e.TgZ(0,"ion-content")(1,"ion-list",5),e.YNc(2,T,11,2,"ion-item-sliding",6),e.qZA(),e.TgZ(3,"ion-fab",7)(4,"ion-fab-button",8),e.NdJ("click",function(){e.CHM(l);const s=e.oxw();return e.KtG(s.postManuel())}),e._UZ(5,"ion-icon",9),e.qZA(),e.TgZ(6,"ion-fab-button",8),e.NdJ("click",function(){e.CHM(l);const s=e.oxw();return e.KtG(s.postMemo())}),e._UZ(7,"ion-icon",10),e.qZA()()()}if(2&n){const l=e.oxw();e.xp6(1),e.Q6J("inset",!0),e.xp6(1),e.Q6J("ngForOf",l.memos)}}const c=[{path:"",component:(()=>{var n;class u{constructor(i,s,g,m){this.memoService=i,this.courseservice=s,this.alertController=g,this.articleService=m,this.memos=[],this.isRechercheAvance=!1}ngOnInit(){var i=this;return(0,x.Z)(function*(){yield i.refresh()})()}refresh(){var i=this;return(0,x.Z)(function*(){const s=yield(yield i.memoService.get()).filter(g=>null==g.deletedOn);i.memos=s})()}put(i){var s=this;return(0,x.Z)(function*(){var m;yield(yield s.alertController.create({cssClass:"my-custom-class",header:"Nouvelle article",inputs:[{type:"text",placeholder:i.article.libelle,disabled:!0},{type:"number",name:"quantite",placeholder:i.quantite.toString(),value:i.quantite}],buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Valider",handler:(m=(0,x.Z)(function*(C){i.quantite=null==C.quantite||""===C.quantite?1:Number(C.quantite),yield s.memoService.put(i),yield s.refresh()}),function(O){return m.apply(this,arguments)})}]})).present()})()}selectArticle(i){var s=this;return(0,x.Z)(function*(){var g={id:Number(new Date),article:i,quantite:1,isFirebase:!1};yield s.memoService.post(g),yield s.refresh(),s.postMemo()})()}postMemo(){this.isRechercheAvance=!this.isRechercheAvance}retirer(i){var s=this;return(0,x.Z)(function*(){yield s.memoService.delete(i),yield s.refresh()})()}postManuel(){var i=this;return(0,x.Z)(function*(){var g;yield(yield i.alertController.create({cssClass:"my-custom-class",header:"Nouvelle article",inputs:[{type:"text",placeholder:"Nom de l'article",name:"libelle"},{type:"number",name:"quantite",placeholder:"Quantit\xe9"}],buttons:[{text:"Annuler",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Valider",handler:(g=(0,x.Z)(function*(m){var C=null==m.quantite||""===m.quantite?1:Number(m.quantite),O={id:Number(new Date),libelle:m.libelle,prix:[{magasin:1,prix:100}],createdOn:new Date,groupeId:[0],familleId:0,codeBarre:"",isFirebase:!1},S={id:Number(new Date),article:O,quantite:C,isFirebase:!1};yield i.articleService.post(O),yield i.memoService.post(S),yield i.refresh()}),function(C){return g.apply(this,arguments)})}]})).present()})()}sendToCourse(i){var s=this;return(0,x.Z)(function*(){const g=yield s.courseservice.getCourseIsFocus(),m=i.article.prix.find(O=>O.magasin===g[0].magasinId),C={id:Number(new Date),ordre:0,courseId:g[0].id.toString(),libelle:i.article.libelle,quantite:i.quantite,articleId:i.article.id,prixArticle:void 0===m?i.article.prix[0].prix:m.prix,prixReel:void 0===m?i.article.prix[0].prix:m.prix,total:Number(i.quantite*(void 0===m?i.article.prix[0].prix:m.prix)),checked:!1,isFirebase:!1};yield s.courseservice.postCourseDetails(C),yield s.memoService.delete(i),s.refresh()})()}}return(n=u).\u0275fac=function(i){return new(i||n)(e.Y36(Z.T),e.Y36(b.N),e.Y36(o.Br),e.Y36(F.J))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-memo"]],decls:8,vars:3,consts:[[3,"translucent"],["slot","start"],["defaultHref","/courses"],[4,"ngIf"],[3,"articlesOutput"],[3,"inset"],[4,"ngFor","ngForOf"],["slot","fixed","horizontal","end","vertical","bottom"],["size","small",3,"click"],["name","calculator-outline"],["name","add"],["button","",3,"click"],["slot","end"],["side","end"],[3,"click"]],template:function(i,s){1&i&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e._UZ(3,"ion-back-button",2),e.qZA(),e.TgZ(4,"ion-title"),e._uU(5,"Notes"),e.qZA()()(),e.YNc(6,M,2,0,"ion-content",3),e.YNc(7,t,8,2,"ion-content",3)),2&i&&(e.Q6J("translucent",!0),e.xp6(6),e.Q6J("ngIf",s.isRechercheAvance),e.xp6(1),e.Q6J("ngIf",!s.isRechercheAvance))},dependencies:[d.sg,d.O5,o.oU,o.Sm,o.W2,o.IJ,o.W4,o.Gu,o.gu,o.Ie,o.u8,o.IK,o.td,o.Q$,o.q_,o.wd,o.sr,o.cs,v]}),u})()}];let a=(()=>{var n;class u{}return(n=u).\u0275fac=function(i){return new(i||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[A.Bz.forChild(c),A.Bz]}),u})(),p=(()=>{var n;class u{}return(n=u).\u0275fac=function(i){return new(i||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[d.ez,h.u5,o.Pc,a]}),u})()},9825:(P,I,f)=>{f.d(I,{f:()=>d});var d=function(h){return h.POST="POST",h.PUT="PUT",h.DELETE="DELETE",h}(d||{})},5512:(P,I,f)=>{f.d(I,{J:()=>e});var d=f(5861),h=f(3009),o=f(6689),A=f(5423),x=f(6815);let e=(()=>{var Z;class b{constructor(_,y){this.storage=_,this.utility=y}get(){var _=this;return(0,d.Z)(function*(){return _.orderByFamille(yield _.storage.get(h.K.Articles))})()}post(_){var y=this;return(0,d.Z)(function*(){yield y.storage.post(h.K.Articles,_)})()}put(_){var y=this;return(0,d.Z)(function*(){yield y.storage.put(h.K.Articles,_)})()}delete(_){var y=this;return(0,d.Z)(function*(){yield y.storage.delete(h.K.Articles,_)})()}deleteDefinitivement(_){var y=this;return(0,d.Z)(function*(){yield y.storage.deleteDefinitivement(h.K.Articles,_)})()}getArticleById(_){var y=this;return(0,d.Z)(function*(){return(yield y.get()).filter(M=>M.id==_)})()}getArticleByCodeBarre(_){var y=this;return(0,d.Z)(function*(){return(yield y.get()).filter(M=>M.codeBarre==_)})()}orderByFamille(_){return _.sort((y,v)=>y.familleId<v.familleId?-1:1)}}return(Z=b).\u0275fac=function(_){return new(_||Z)(o.LFG(A.V),o.LFG(x.t))},Z.\u0275prov=o.Yz7({token:Z,factory:Z.\u0275fac,providedIn:"root"}),b})()},5423:(P,I,f)=>{f.d(I,{V:()=>y});var d=f(5861),h=f(3009),o=f(9825),A=f(6689),x=f(2014),e=f(2386),Z=f(9392),b=f(3182),F=f(553);let _=(()=>{var v;class M{constructor(t){this.firestore=t}post(t,r,c){return(0,d.Z)(function*(){const a=(0,b.ZF)(F.N.firebaseConfig),p=(0,Z.ad)(a);yield(0,e.pl)((0,e.JU)(p,t,c),r)})()}getAll(t){var r=this;return(0,d.Z)(function*(){const c=yield(0,e.hJ)(r.firestore,t);return(0,e.BS)(c)})()}put(t,r,c){var a=this;return(0,d.Z)(function*(){const p=(0,e.JU)(a.firestore,t+"/"+r);return(0,e.r7)(p,c)})()}delete(t,r,c){var a=this;return(0,d.Z)(function*(){const p=(0,e.JU)(a.firestore,t+"/"+r);return(0,e.oe)(p)})()}}return(v=M).\u0275fac=function(t){return new(t||v)(A.LFG(e.gg))},v.\u0275prov=A.Yz7({token:v,factory:v.\u0275fac,providedIn:"root"}),M})(),y=(()=>{var v;class M{constructor(t,r){this.storage=t,this.firestore=r}postAll(t,r){var c=this;return(0,d.Z)(function*(){(yield c.getConnexionInfo()).isOnline&&(yield(yield r.filter(n=>!n.isFirebase)).map(function(){var n=(0,d.Z)(function*(u){u.isFirebase=!0,yield c.firestore.post(t,u,u.id.toString())});return function(u){return n.apply(this,arguments)}}())),yield c.storage.set(t,r)})()}post(t,r){var c=this;return(0,d.Z)(function*(){var a=yield c.getAll(t);r.id=Number(new Date),r.createdOn=new Date,r.modifiedOn=null,r.deletedOn=null,r.isFirebase=!1,a.push(r),yield c.postAll(t,a)})()}get(t){var r=this;return(0,d.Z)(function*(){return yield(yield r.storage.get(t)).filter(a=>""===a.deletedOn||null===a.deletedOn||void 0!==a.deletedOn)})()}getAll(t){var r=this;return(0,d.Z)(function*(){return yield r.storage.get(t)})()}getIndex(t,r){var c=this;return(0,d.Z)(function*(){return yield(yield c.getAll(t)).findIndex(p=>p.id===r)})()}put(t,r){var c=this;return(0,d.Z)(function*(){const a=yield c.getAll(t),p=yield c.getIndex(t,r.id);a[p]=r,a[p].modifiedOn=new Date,(yield c.getConnexionInfo()).isOnline?yield c.firestore.put(t,r.id.toString(),r):a[p].isFirebase&&(a[p].firebaseMethod=o.f.PUT),yield c.postAll(t,a)})()}delete(t,r){var c=this;return(0,d.Z)(function*(){const a=yield c.getAll(t),p=yield c.getIndex(t,r.id);a[p].deletedOn=new Date,a[p].firebaseMethod=o.f.DELETE,yield c.postAll(t,a),(yield c.getConnexionInfo()).isOnline&&(yield c.firestore.put(t,r.id.toString(),r))})()}deleteDefinitivement(t,r){var c=this;return(0,d.Z)(function*(){const a=yield c.getAll(t),p=yield c.getIndex(t,r.id);(yield c.getConnexionInfo()).isOnline?(a.splice(p,1),yield c.firestore.delete(t,r.id.toString(),r)):a[p].isFirebase?(a[p].firebaseMethod=o.f.DELETE,a[p].deletedOn=new Date):a.splice(p,1),yield c.postAll(t,a)})()}synchroniserAvecFirestore(){var t=this;return(0,d.Z)(function*(){(yield t.getConnexionInfo()).isOnline?(yield t.synchroniser(h.K.Utilisateurs),yield t.synchroniser(h.K.Articles),yield t.synchroniser(h.K.Courses),yield t.synchroniser(h.K.Familles),yield t.synchroniser(h.K.CourseDetails),yield t.synchroniser(h.K.Memos),yield t.synchroniser(h.K.HistoriquePrix),yield t.synchroniser(h.K.Depenses),yield t.synchroniser(h.K.Magasins),yield t.synchroniser(h.K.Plats),yield t.synchroniser(h.K.PlatDetails),yield t.synchroniser(h.K.Groupes),yield t.synchroniser(h.K.Menus)):alert("Le mode onLine est d\xe9sactiv\xe9")})()}synchroniser(t){var r=this;return(0,d.Z)(function*(){if((yield r.getConnexionInfo()).isOnline){const a=yield r.storage.get(t),p=yield a.filter(u=>!u.isFirebase);p.length>0&&p.map(function(){var u=(0,d.Z)(function*(l){l.isFirebase=!0,yield r.firestore.post(t,l,l.id.toString())});return function(l){return u.apply(this,arguments)}}());const n=yield a.filter(u=>u.firebaseMethod===o.f.DELETE||u.firebaseMethod===o.f.PUT);n.length>0&&n.map(function(){var u=(0,d.Z)(function*(l){l.firebaseMethod===o.f.PUT&&(yield r.put(t,l)),l.firebaseMethod===o.f.DELETE&&(yield r.deleteDefinitivement(t,l))});return function(l){return u.apply(this,arguments)}}()),(yield r.firestore.getAll(t)).subscribe(u=>{r.storage.set(t,u)})}else alert("Le mode onLine est d\xe9sactiv\xe9")})()}set(t,r){var c=this;return(0,d.Z)(function*(){yield c.storage.set(t,r)})()}getConnexionInfo(){var t=this;return(0,d.Z)(function*(){return yield t.storage.get(h.K.InfoConnexion)})()}}return(v=M).\u0275fac=function(t){return new(t||v)(A.LFG(x.K),A.LFG(_))},v.\u0275prov=A.Yz7({token:v,factory:v.\u0275fac,providedIn:"root"}),M})()}}]);