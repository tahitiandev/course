"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3643],{3643:(L,U,l)=>{l.r(U),l.d(U,{HomePageModule:()=>x});var d=l(6814),g=l(95),c=l(7027),T=l(9801),v=l(5861),e=l(6689),F=l(6815),P=l(4073),M=l(5423),S=l(202),O=l(7039),m=l(9972),D=l(6199);function A(s,f){if(1&s){const y=e.EpF();e.TgZ(0,"div",12)(1,"ion-datetime",13),e.NdJ("ionChange",function(r){e.CHM(y);const h=e.oxw();return e.KtG(h.selectDateTime(r))}),e.qZA()()}}function n(s,f){if(1&s&&(e.TgZ(0,"tr",17)(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA()()),2&s){const y=f.$implicit;e.xp6(2),e.Oqu(y.utilisateur),e.xp6(2),e.Oqu(y.montantCourse),e.xp6(2),e.Oqu(y.montantdepense)}}function i(s,f){if(1&s&&(e.TgZ(0,"table",7)(1,"h5",14),e._uU(2,"D\xe9pense de "),e.TgZ(3,"u"),e._uU(4),e.qZA()(),e.TgZ(5,"tr",15)(6,"th"),e._uU(7,"Utilisateurs"),e.qZA(),e.TgZ(8,"th"),e._uU(9,"Montant course"),e.qZA(),e.TgZ(10,"th"),e._uU(11,"Montant d\xe9pense"),e.qZA()(),e.YNc(12,n,7,3,"tr",16),e.qZA()),2&s){const y=e.oxw();e.xp6(4),e.Oqu(y.getLibelleMois(y.month-1)),e.xp6(8),e.Q6J("ngForOf",y.utilisateurByDepense)}}const a=[{path:"",component:(()=>{var s;class f{constructor(t,r,h,p,Z,b,C,I){this.utility=t,this.utilisateursService=r,this.storageService=h,this.magasinservice=p,this.navigate=Z,this.apportsservice=b,this.depensesservice=C,this.coursesService=I,this.utilisateurs=[],this.courses=[],this.depenses=[],this.apports=[],this.utilisateurByDepense=[],this.isInputDateActif=!1,this.budgetRestant=0,this.budget=0,this.totalDepense=0,this.utilisateurConnecteLibelle="",this.montantApportUtilisateurConnecte=0}ngOnInit(){var t=this;return(0,v.Z)(function*(){yield t.redirection();var r=t.getToday();t.year=r.year,t.day=r.day,t.month=r.month,yield t.refresh(),yield t.statsUtilisateursByDepense()})()}handleRefresh(t){var r=this;this.storageService.synchroniserAvecFirestore().then((0,v.Z)(function*(){t.target.complete(),location.reload(),yield r.utility.popUp("Synchronisation compl\xe8te termin\xe9e")}))}changeDate(){this.isInputDateActif=!this.isInputDateActif}getLibelleMois(t){return["January","February","March","April","May","June","July","August","September","October","November","December"][t]}redirection(){var t=this;return(0,v.Z)(function*(){(yield t.utility.getConnexionInfo()).isConnected||t.navigate.navigateRoot("authentification")})()}getToday(){const t=new Date;return{day:t.getUTCDate(),month:t.getUTCMonth()+1,year:t.getUTCFullYear(),full:t.toLocaleDateString("en-GB")}}refresh(){var t=this;return(0,v.Z)(function*(){t.courses=yield t.getCourses(),t.utilisateurs=yield t.getUtilisateurs(),t.depenses=yield t.getDepenses(),t.apports=yield t.getApports(),t.getApportUtilisateurConnecte(),t.setBudget()})()}getUtilisateurs(){var t=this;return(0,v.Z)(function*(){return(yield t.utilisateursService.get()).filter(r=>0!==r.id)})()}getCourses(){var t=this;return(0,v.Z)(function*(){return yield t.coursesService.getCourse()})()}getDepenses(){var t=this;return(0,v.Z)(function*(){return yield t.depensesservice.get()})()}statsUtilisateursByDepense(){var t=[],r=0,h=0;this.utilisateurs.map(p=>{this.courses.map(Z=>{new Date(Z.date).getUTCFullYear()==this.year&&new Date(Z.date).getUTCMonth()+1==this.month&&Z.payeurId===p.id&&(r+=Z.montantReel)}),this.depenses.map(Z=>{new Date(Z.createdOn).getUTCFullYear()==this.year&&new Date(Z.createdOn).getUTCMonth()+1==this.month&&Z.userid===p.id&&(h+=Number(Z.depense))}),t.push({utilisateur:p.libelle,montantCourse:r,montantdepense:h}),r=0,h=0}),this.utilisateurByDepense=t}selectDateTime(t){var r=this;return(0,v.Z)(function*(){r.utilisateurByDepense=[];var h=t.detail.value;r.month=(yield new Date(h).getUTCMonth())+1,r.year=yield new Date(h).getUTCFullYear(),yield r.statsUtilisateursByDepense()})()}statistiquePayeurByMagasin(){var t=this;return(0,v.Z)(function*(){const r=t.utilisateurs,h=yield t.magasinservice.get();t.courses.map(C=>{r.map(I=>{C.payeurId===I.id&&h.map(E=>{})})})})()}getApports(){var t=this;return(0,v.Z)(function*(){return yield t.apportsservice.get()})()}getApportUtilisateurConnecte(){var t=this;return(0,v.Z)(function*(){const r=yield t.utility.getConnexionInfo();var h=0;t.apports.map(p=>{p.createdOn.getUTCFullYear()==t.year&&new Date(p.createdOn).getUTCMonth()+1==t.month&&p.userid==r.utilisateurId&&(h+=Number(p.apport))}),t.montantApportUtilisateurConnecte=h})()}setBudget(){var t=this;return(0,v.Z)(function*(){const r=yield t.utility.getConnexionInfo(),h=r.budget,p=yield t.utilisateursService.getLibelleUtilisateurById(r.utilisateurId),b=yield t.utilisateurByDepense.find(E=>E.utilisateur===p),C=b.montantCourse+b.montantdepense;t.budgetRestant=r.budget-C+t.montantApportUtilisateurConnecte,t.budget=h,t.totalDepense=C,t.utilisateurConnecteLibelle=p})()}}return(s=f).\u0275fac=function(t){return new(t||s)(e.Y36(F.t),e.Y36(P.X),e.Y36(M.V),e.Y36(S.t),e.Y36(c.SH),e.Y36(O.P),e.Y36(m.e),e.Y36(D.N))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-home"]],decls:32,vars:12,consts:[[3,"translucent"],["slot","start"],[3,"fullscreen"],["slot","fixed",3,"pullFactor","pullMin","pullMax","ionRefresh"],["shape","round",2,"display","block","margin","auto","width","60%","margin-top","10px",3,"click"],["style","margin: 50px;",4,"ngIf"],["style","margin: 15px;",4,"ngIf"],[2,"margin","15px"],["aria-hidden","true","name","bluetooth","slot","start"],["aria-hidden","true","name","call","slot","start"],["aria-hidden","true","name","wifi","slot","start"],["aria-hidden","true","name","airplane","slot","start"],[2,"margin","50px"],["presentation","month-year",3,"ionChange"],[2,"margin-right","10px"],[2,"background","rgb(135, 71, 207)"],["style","text-align: center;",4,"ngFor","ngForOf"],[2,"text-align","center"]],template:function(t,r){1&t&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e._UZ(3,"ion-menu-button"),e.qZA(),e.TgZ(4,"ion-title"),e._uU(5,"Tableau de bord"),e.qZA()()(),e.TgZ(6,"ion-content",2)(7,"ion-refresher",3),e.NdJ("ionRefresh",function(p){return r.handleRefresh(p)}),e._UZ(8,"ion-refresher-content"),e.qZA(),e.TgZ(9,"ion-button",4),e.NdJ("click",function(){return r.changeDate()}),e._uU(10,"Modifier la date"),e.qZA(),e.YNc(11,A,2,0,"div",5),e.YNc(12,i,13,2,"table",6),e.TgZ(13,"h4"),e._uU(14),e.qZA(),e.TgZ(15,"ion-list",7)(16,"ion-item"),e._UZ(17,"ion-icon",8),e.TgZ(18,"ion-label"),e._uU(19),e.qZA()(),e.TgZ(20,"ion-item"),e._UZ(21,"ion-icon",9),e.TgZ(22,"ion-label"),e._uU(23),e.qZA()(),e.TgZ(24,"ion-item"),e._UZ(25,"ion-icon",10),e.TgZ(26,"ion-label"),e._uU(27),e.qZA()(),e.TgZ(28,"ion-item"),e._UZ(29,"ion-icon",11),e.TgZ(30,"ion-label"),e._uU(31),e.qZA()()()()),2&t&&(e.Q6J("translucent",!0),e.xp6(6),e.Q6J("fullscreen",!0),e.xp6(1),e.Q6J("pullFactor",.5)("pullMin",100)("pullMax",200),e.xp6(4),e.Q6J("ngIf",r.isInputDateActif),e.xp6(1),e.Q6J("ngIf",!r.isInputDateActif),e.xp6(2),e.hij("R\xe9capitulatif de : ",r.utilisateurConnecteLibelle,""),e.xp6(5),e.hij("D\xe9pense du mois : ",r.totalDepense.toLocaleString()," XPF"),e.xp6(4),e.hij("Apport du mois : ",r.montantApportUtilisateurConnecte.toLocaleString()," XPF"),e.xp6(4),e.hij("Budget du mois fix\xe9 \xe0 : ",r.budget.toLocaleString()," XPF"),e.xp6(4),e.hij("Budget restant : ",r.budgetRestant.toLocaleString()," XPF"))},dependencies:[d.sg,d.O5,c.YG,c.Sm,c.W2,c.x4,c.Gu,c.gu,c.Ie,c.Q$,c.q_,c.fG,c.nJ,c.Wo,c.wd,c.sr,c.QI],styles:["table[_ngcontent-%COMP%]{border-collapse:collapse;margin:40px auto auto}th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{border:1px solid black;padding:10px}"]}),f})()}];let u=(()=>{var s;class f{}return(s=f).\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[T.Bz.forChild(a),T.Bz]}),f})(),x=(()=>{var s;class f{}return(s=f).\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[d.ez,g.u5,c.Pc,u]}),f})()},9825:(L,U,l)=>{l.d(U,{f:()=>d});var d=function(g){return g.POST="POST",g.PUT="PUT",g.DELETE="DELETE",g}(d||{})},5423:(L,U,l)=>{l.d(U,{V:()=>O});var d=l(5861),g=l(3009),c=l(9825),T=l(6689),v=l(2014),e=l(2386),F=l(9392),P=l(3182),M=l(553);let S=(()=>{var m;class D{constructor(n){this.firestore=n}post(n,i,o){return(0,d.Z)(function*(){const a=(0,P.ZF)(M.N.firebaseConfig),u=(0,F.ad)(a);yield(0,e.pl)((0,e.JU)(u,n,o),i)})()}getAll(n){var i=this;return(0,d.Z)(function*(){const o=yield(0,e.hJ)(i.firestore,n);return(0,e.BS)(o)})()}put(n,i,o){var a=this;return(0,d.Z)(function*(){const u=(0,e.JU)(a.firestore,n+"/"+i);return(0,e.r7)(u,o)})()}delete(n,i,o){var a=this;return(0,d.Z)(function*(){const u=(0,e.JU)(a.firestore,n+"/"+i);return(0,e.oe)(u)})()}}return(m=D).\u0275fac=function(n){return new(n||m)(T.LFG(e.gg))},m.\u0275prov=T.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"}),D})(),O=(()=>{var m;class D{constructor(n,i){this.storage=n,this.firestore=i}postAll(n,i){var o=this;return(0,d.Z)(function*(){(yield o.getConnexionInfo()).isOnline&&(yield(yield i.filter(x=>!x.isFirebase)).map(function(){var x=(0,d.Z)(function*(s){s.isFirebase=!0,yield o.firestore.post(n,s,s.id.toString())});return function(s){return x.apply(this,arguments)}}())),yield o.storage.set(n,i)})()}post(n,i){var o=this;return(0,d.Z)(function*(){var a=yield o.getAll(n);i.id=Number(new Date),i.createdOn=new Date,i.modifiedOn=null,i.deletedOn=null,i.isFirebase=!1,a.push(i),yield o.postAll(n,a)})()}get(n){var i=this;return(0,d.Z)(function*(){return yield(yield i.storage.get(n)).filter(a=>""===a.deletedOn||null===a.deletedOn||void 0!==a.deletedOn)})()}getAll(n){var i=this;return(0,d.Z)(function*(){return yield i.storage.get(n)})()}getIndex(n,i){var o=this;return(0,d.Z)(function*(){return yield(yield o.getAll(n)).findIndex(u=>u.id===i)})()}put(n,i){var o=this;return(0,d.Z)(function*(){const a=yield o.getAll(n),u=yield o.getIndex(n,i.id);a[u]=i,a[u].modifiedOn=new Date,(yield o.getConnexionInfo()).isOnline?yield o.firestore.put(n,i.id.toString(),i):a[u].isFirebase&&(a[u].firebaseMethod=c.f.PUT),yield o.postAll(n,a)})()}delete(n,i){var o=this;return(0,d.Z)(function*(){const a=yield o.getAll(n),u=yield o.getIndex(n,i.id);a[u].deletedOn=new Date,a[u].firebaseMethod=c.f.DELETE,yield o.postAll(n,a),(yield o.getConnexionInfo()).isOnline&&(yield o.firestore.put(n,i.id.toString(),i))})()}deleteDefinitivement(n,i){var o=this;return(0,d.Z)(function*(){const a=yield o.getAll(n),u=yield o.getIndex(n,i.id);(yield o.getConnexionInfo()).isOnline?(a.splice(u,1),yield o.firestore.delete(n,i.id.toString(),i)):a[u].isFirebase?(a[u].firebaseMethod=c.f.DELETE,a[u].deletedOn=new Date):a.splice(u,1),yield o.postAll(n,a)})()}synchroniserAvecFirestore(){var n=this;return(0,d.Z)(function*(){(yield n.getConnexionInfo()).isOnline?(yield n.synchroniser(g.K.Utilisateurs),yield n.synchroniser(g.K.Articles),yield n.synchroniser(g.K.Courses),yield n.synchroniser(g.K.Familles),yield n.synchroniser(g.K.CourseDetails),yield n.synchroniser(g.K.Memos),yield n.synchroniser(g.K.HistoriquePrix),yield n.synchroniser(g.K.Depenses),yield n.synchroniser(g.K.Apports),yield n.synchroniser(g.K.Magasins),yield n.synchroniser(g.K.Plats),yield n.synchroniser(g.K.PlatDetails),yield n.synchroniser(g.K.Groupes),yield n.synchroniser(g.K.Menus)):alert("Le mode onLine est d\xe9sactiv\xe9")})()}synchroniser(n){var i=this;return(0,d.Z)(function*(){if((yield i.getConnexionInfo()).isOnline){const a=yield i.storage.get(n),u=yield a.filter(s=>!s.isFirebase);u.length>0&&u.map(function(){var s=(0,d.Z)(function*(f){f.isFirebase=!0,yield i.firestore.post(n,f,f.id.toString())});return function(f){return s.apply(this,arguments)}}());const x=yield a.filter(s=>s.firebaseMethod===c.f.DELETE||s.firebaseMethod===c.f.PUT);x.length>0&&x.map(function(){var s=(0,d.Z)(function*(f){f.firebaseMethod===c.f.PUT&&(yield i.put(n,f)),f.firebaseMethod===c.f.DELETE&&(yield i.deleteDefinitivement(n,f))});return function(f){return s.apply(this,arguments)}}()),(yield i.firestore.getAll(n)).subscribe(s=>{i.storage.set(n,s)})}else alert("Le mode onLine est d\xe9sactiv\xe9")})()}set(n,i){var o=this;return(0,d.Z)(function*(){yield o.storage.set(n,i)})()}getConnexionInfo(){var n=this;return(0,d.Z)(function*(){return yield n.storage.get(g.K.InfoConnexion)})()}}return(m=D).\u0275fac=function(n){return new(n||m)(T.LFG(v.K),T.LFG(S))},m.\u0275prov=T.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"}),D})()}}]);