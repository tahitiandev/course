"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3643],{3643:(O,D,u)=>{u.r(D),u.d(D,{HomePageModule:()=>d});var f=u(6814),g=u(95),h=u(7027),Z=u(9801),x=u(5861),e=u(6689),C=u(6815),M=u(4073),U=u(5423),F=u(202),P=u(9972),p=u(6199);function T(r,l){if(1&r){const c=e.EpF();e.TgZ(0,"div",7)(1,"ion-datetime",8),e.NdJ("ionChange",function(a){e.CHM(c);const y=e.oxw();return e.KtG(y.selectDateTime(a))}),e.qZA()()}}function I(r,l){if(1&r&&(e.TgZ(0,"tr",12)(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA()()),2&r){const c=l.$implicit;e.xp6(2),e.Oqu(c.utilisateur),e.xp6(2),e.Oqu(c.montantCourse),e.xp6(2),e.Oqu(c.montantdepense)}}function t(r,l){if(1&r&&(e.TgZ(0,"table")(1,"h5",9),e._uU(2,"D\xe9pense de "),e.TgZ(3,"u"),e._uU(4),e.qZA()(),e.TgZ(5,"tr",10)(6,"th"),e._uU(7,"Utilisateurs"),e.qZA(),e.TgZ(8,"th"),e._uU(9,"Montant course"),e.qZA(),e.TgZ(10,"th"),e._uU(11,"Montant d\xe9pense"),e.qZA()(),e.YNc(12,I,7,3,"tr",11),e.qZA()),2&r){const c=e.oxw();e.xp6(4),e.Oqu(c.getLibelleMois(c.month-1)),e.xp6(8),e.Q6J("ngForOf",c.utilisateurByDepense)}}const s=[{path:"",component:(()=>{var r;class l{constructor(n,a,y,m,v,b,A){this.utility=n,this.utilisateursService=a,this.storageService=y,this.magasinservice=m,this.navigate=v,this.depensesservice=b,this.coursesService=A,this.utilisateurs=[],this.courses=[],this.depenses=[],this.utilisateurByDepense=[],this.isInputDateActif=!1}ngOnInit(){var n=this;return(0,x.Z)(function*(){yield n.refresh(),yield n.redirection();var a=n.getToday();n.year=a.year,n.day=a.day,n.month=a.month,yield n.statsUtilisateursByDepense()})()}handleRefresh(n){this.storageService.synchroniserAvecFirestore().then(()=>{n.target.complete(),location.reload()})}changeDate(){this.isInputDateActif=!this.isInputDateActif}getLibelleMois(n){return["January","February","March","April","May","June","July","August","September","October","November","December"][n]}redirection(){var n=this;return(0,x.Z)(function*(){(yield n.utility.getConnexionInfo()).isConnected||n.navigate.navigateRoot("authentification")})()}getToday(){const n=new Date;return{day:n.getUTCDate(),month:n.getUTCMonth()+1,year:n.getUTCFullYear(),full:n.toLocaleDateString("en-GB")}}refresh(){var n=this;return(0,x.Z)(function*(){n.courses=yield n.getCourses(),n.utilisateurs=yield n.getUtilisateurs(),n.depenses=yield n.getDepenses()})()}getUtilisateurs(){var n=this;return(0,x.Z)(function*(){return(yield n.utilisateursService.get()).filter(a=>0!==a.id)})()}getCourses(){var n=this;return(0,x.Z)(function*(){return yield n.coursesService.getCourse()})()}getDepenses(){var n=this;return(0,x.Z)(function*(){return yield n.depensesservice.get()})()}statsUtilisateursByDepense(){var n=[],a=0,y=0;this.utilisateurs.map(m=>{this.courses.map(v=>{new Date(v.date).getUTCFullYear()==this.year&&new Date(v.date).getUTCMonth()+1==this.month&&v.payeurId===m.id&&(a+=v.montantReel)}),this.depenses.map(v=>{new Date(v.createdOn).getUTCFullYear()==this.year&&new Date(v.createdOn).getUTCMonth()+1==this.month&&v.userid===m.id&&(y+=Number(v.depense))}),n.push({utilisateur:m.libelle,montantCourse:a,montantdepense:y}),a=0,y=0}),this.utilisateurByDepense=n}selectDateTime(n){var a=this;return(0,x.Z)(function*(){a.utilisateurByDepense=[];var y=n.detail.value;a.month=(yield new Date(y).getUTCMonth())+1,a.year=yield new Date(y).getUTCFullYear(),yield a.statsUtilisateursByDepense()})()}statistiquePayeurByMagasin(){var n=this;return(0,x.Z)(function*(){const a=n.utilisateurs,y=yield n.magasinservice.get();n.courses.map(A=>{a.map(S=>{A.payeurId===S.id&&y.map(E=>{})})})})()}}return(r=l).\u0275fac=function(n){return new(n||r)(e.Y36(C.t),e.Y36(M.X),e.Y36(U.V),e.Y36(F.t),e.Y36(h.SH),e.Y36(P.e),e.Y36(p.N))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-home"]],decls:13,vars:7,consts:[[3,"translucent"],["slot","start"],[3,"fullscreen"],["slot","fixed",3,"pullFactor","pullMin","pullMax","ionRefresh"],["shape","round",2,"display","block","margin","auto","width","60%","margin-top","10px",3,"click"],["style","margin: 50px;",4,"ngIf"],[4,"ngIf"],[2,"margin","50px"],["presentation","month-year",3,"ionChange"],[2,"margin-right","10px"],[2,"background","rgb(135, 71, 207)"],["style","text-align: center;",4,"ngFor","ngForOf"],[2,"text-align","center"]],template:function(n,a){1&n&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e._UZ(3,"ion-menu-button"),e.qZA(),e.TgZ(4,"ion-title"),e._uU(5,"Tableau de bord"),e.qZA()()(),e.TgZ(6,"ion-content",2)(7,"ion-refresher",3),e.NdJ("ionRefresh",function(m){return a.handleRefresh(m)}),e._UZ(8,"ion-refresher-content"),e.qZA(),e.TgZ(9,"ion-button",4),e.NdJ("click",function(){return a.changeDate()}),e._uU(10,"Modifier la date"),e.qZA(),e.YNc(11,T,2,0,"div",5),e.YNc(12,t,13,2,"table",6),e.qZA()),2&n&&(e.Q6J("translucent",!0),e.xp6(6),e.Q6J("fullscreen",!0),e.xp6(1),e.Q6J("pullFactor",.5)("pullMin",100)("pullMax",200),e.xp6(4),e.Q6J("ngIf",a.isInputDateActif),e.xp6(1),e.Q6J("ngIf",!a.isInputDateActif))},dependencies:[f.sg,f.O5,h.YG,h.Sm,h.W2,h.x4,h.Gu,h.fG,h.nJ,h.Wo,h.wd,h.sr,h.QI],styles:["table[_ngcontent-%COMP%]{border-collapse:collapse;margin:40px auto auto}th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{border:1px solid black;padding:10px}"]}),l})()}];let o=(()=>{var r;class l{}return(r=l).\u0275fac=function(n){return new(n||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[Z.Bz.forChild(s),Z.Bz]}),l})(),d=(()=>{var r;class l{}return(r=l).\u0275fac=function(n){return new(n||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[f.ez,g.u5,h.Pc,o]}),l})()},9825:(O,D,u)=>{u.d(D,{f:()=>f});var f=function(g){return g.POST="POST",g.PUT="PUT",g.DELETE="DELETE",g}(f||{})},5423:(O,D,u)=>{u.d(D,{V:()=>P});var f=u(5861),g=u(3009),h=u(9825),Z=u(6689),x=u(2014),e=u(2386),C=u(9392),M=u(3182),U=u(553);let F=(()=>{var p;class T{constructor(t){this.firestore=t}post(t,i,s){return(0,f.Z)(function*(){const o=(0,M.ZF)(U.N.firebaseConfig),d=(0,C.ad)(o);yield(0,e.pl)((0,e.JU)(d,t,s),i)})()}getAll(t){var i=this;return(0,f.Z)(function*(){const s=yield(0,e.hJ)(i.firestore,t);return(0,e.BS)(s)})()}put(t,i,s){var o=this;return(0,f.Z)(function*(){const d=(0,e.JU)(o.firestore,t+"/"+i);return(0,e.r7)(d,s)})()}delete(t,i,s){var o=this;return(0,f.Z)(function*(){const d=(0,e.JU)(o.firestore,t+"/"+i);return(0,e.oe)(d)})()}}return(p=T).\u0275fac=function(t){return new(t||p)(Z.LFG(e.gg))},p.\u0275prov=Z.Yz7({token:p,factory:p.\u0275fac,providedIn:"root"}),T})(),P=(()=>{var p;class T{constructor(t,i){this.storage=t,this.firestore=i}postAll(t,i){var s=this;return(0,f.Z)(function*(){(yield s.getConnexionInfo()).isOnline&&(yield(yield i.filter(r=>!r.isFirebase)).map(function(){var r=(0,f.Z)(function*(l){l.isFirebase=!0,yield s.firestore.post(t,l,l.id.toString())});return function(l){return r.apply(this,arguments)}}())),yield s.storage.set(t,i)})()}post(t,i){var s=this;return(0,f.Z)(function*(){var o=yield s.getAll(t);i.id=Number(new Date),i.createdOn=new Date,i.modifiedOn=null,i.deletedOn=null,i.isFirebase=!1,o.push(i),yield s.postAll(t,o)})()}get(t){var i=this;return(0,f.Z)(function*(){return yield(yield i.storage.get(t)).filter(o=>""===o.deletedOn||null===o.deletedOn||void 0!==o.deletedOn)})()}getAll(t){var i=this;return(0,f.Z)(function*(){return yield i.storage.get(t)})()}getIndex(t,i){var s=this;return(0,f.Z)(function*(){return yield(yield s.getAll(t)).findIndex(d=>d.id===i)})()}put(t,i){var s=this;return(0,f.Z)(function*(){const o=yield s.getAll(t),d=yield s.getIndex(t,i.id);o[d]=i,o[d].modifiedOn=new Date,(yield s.getConnexionInfo()).isOnline?yield s.firestore.put(t,i.id.toString(),i):o[d].isFirebase&&(o[d].firebaseMethod=h.f.PUT),yield s.postAll(t,o)})()}delete(t,i){var s=this;return(0,f.Z)(function*(){const o=yield s.getAll(t),d=yield s.getIndex(t,i.id);o[d].deletedOn=new Date,o[d].firebaseMethod=h.f.DELETE,yield s.postAll(t,o),(yield s.getConnexionInfo()).isOnline&&(yield s.firestore.put(t,i.id.toString(),i))})()}deleteDefinitivement(t,i){var s=this;return(0,f.Z)(function*(){const o=yield s.getAll(t),d=yield s.getIndex(t,i.id);(yield s.getConnexionInfo()).isOnline?(o.splice(d,1),yield s.firestore.delete(t,i.id.toString(),i)):o[d].isFirebase?(o[d].firebaseMethod=h.f.DELETE,o[d].deletedOn=new Date):o.splice(d,1),yield s.postAll(t,o)})()}synchroniserAvecFirestore(){var t=this;return(0,f.Z)(function*(){(yield t.getConnexionInfo()).isOnline?(yield t.synchroniser(g.K.Utilisateurs),yield t.synchroniser(g.K.Articles),yield t.synchroniser(g.K.Courses),yield t.synchroniser(g.K.Familles),yield t.synchroniser(g.K.CourseDetails),yield t.synchroniser(g.K.Memos),yield t.synchroniser(g.K.HistoriquePrix),yield t.synchroniser(g.K.Depenses),yield t.synchroniser(g.K.Magasins),yield t.synchroniser(g.K.Plats),yield t.synchroniser(g.K.PlatDetails),yield t.synchroniser(g.K.Groupes),yield t.synchroniser(g.K.Menus)):alert("Le mode onLine est d\xe9sactiv\xe9")})()}synchroniser(t){var i=this;return(0,f.Z)(function*(){if((yield i.getConnexionInfo()).isOnline){const o=yield i.storage.get(t),d=yield o.filter(l=>!l.isFirebase);d.length>0&&d.map(function(){var l=(0,f.Z)(function*(c){c.isFirebase=!0,yield i.firestore.post(t,c,c.id.toString())});return function(c){return l.apply(this,arguments)}}());const r=yield o.filter(l=>l.firebaseMethod===h.f.DELETE||l.firebaseMethod===h.f.PUT);r.length>0&&r.map(function(){var l=(0,f.Z)(function*(c){c.firebaseMethod===h.f.PUT&&(yield i.put(t,c)),c.firebaseMethod===h.f.DELETE&&(yield i.deleteDefinitivement(t,c))});return function(c){return l.apply(this,arguments)}}()),(yield i.firestore.getAll(t)).subscribe(l=>{i.storage.set(t,l)})}else alert("Le mode onLine est d\xe9sactiv\xe9")})()}set(t,i){var s=this;return(0,f.Z)(function*(){yield s.storage.set(t,i)})()}getConnexionInfo(){var t=this;return(0,f.Z)(function*(){return yield t.storage.get(g.K.InfoConnexion)})()}}return(p=T).\u0275fac=function(t){return new(t||p)(Z.LFG(x.K),Z.LFG(F))},p.\u0275prov=Z.Yz7({token:p,factory:p.\u0275fac,providedIn:"root"}),T})()}}]);