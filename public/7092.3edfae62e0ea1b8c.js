"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7092],{9825:(F,v,l)=>{l.d(v,{f:()=>u});var u=function(s){return s.POST="POST",s.PUT="PUT",s.DELETE="DELETE",s}(u||{})},7092:(F,v,l)=>{l.r(v),l.d(v,{AuthentificationPageModule:()=>m});var u=l(6814),s=l(95),c=l(7027),y=l(9801),A=l(5861),g=l(3009),i=l(6689),Z=l(6815),x=l(5423),I=l(4073);const f=[{path:"",component:(()=>{var e;class t{constructor(n,o,d,a){this.formbuilder=n,this.utility=o,this.storage=d,this.utilisateursService=a,this.authentificationForm=new s.cw([])}ngOnInit(){this.authentificationFormInit()}authentificationFormInit(){this.authentificationForm=this.formbuilder.group({username:"",password:""})}handleRefresh(n){var o=this;return(0,A.Z)(function*(){yield o.storage.synchroniser(g.K.Utilisateurs),n.target.complete(),yield o.utility.popUp("Synchronisation des utilisateurs termin\xe9e")})()}onValide(){var n=this;return(0,A.Z)(function*(){const o=n.authentificationForm.value,a=yield(yield n.utilisateursService.get()).filter(h=>h.username===o.username);if(a.length>0)if(a[0].password===o.password){const h={isConnected:!0,utilisateurId:a[0].id,groupeId:a[0].groupeId,isOnline:!0,isCourseAfficher:!0,isCourseRapide:!0,budget:1e4,epargne:0};console.log(h),yield n.storage.set(g.K.InfoConnexion,h),yield n.storage.synchroniserAvecFirestore(),n.utility.navigateTo("home")}else console.log("Le mot de passe est incorrecte");else console.log("Le login renseign\xe9 n'existe pas");n.authentificationForm.patchValue({username:"",password:""})})()}navigateToCreerUtilisateur(){this.utility.navigateTo("creation-utilisateur")}}return(e=t).\u0275fac=function(n){return new(n||e)(i.Y36(s.qu),i.Y36(Z.t),i.Y36(x.V),i.Y36(I.X))},e.\u0275cmp=i.Xpm({type:e,selectors:[["app-authentification"]],decls:20,vars:6,consts:[[3,"translucent"],["slot","start"],[3,"fullscreen"],["slot","fixed",3,"pullFactor","pullMin","pullMax","ionRefresh"],[3,"formGroup","ngSubmit"],["formControlName","username","label","Votre login","label-placement","floating","fill","outline","placeholder","Votre login"],["formControlName","password","label","Votre mot de passe","type","password","label-placement","floating","fill","outline","placeholder","Votre mot de passe"],["type","submit","expand","full"],[2,"cursor","pointer",3,"click"]],template:function(n,o){1&n&&(i.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),i._UZ(3,"ion-menu-button"),i.qZA(),i.TgZ(4,"ion-title"),i._uU(5,"Se connecter"),i.qZA()()(),i.TgZ(6,"ion-content",2)(7,"ion-refresher",3),i.NdJ("ionRefresh",function(a){return o.handleRefresh(a)}),i._UZ(8,"ion-refresher-content"),i.qZA(),i.TgZ(9,"form",4),i.NdJ("ngSubmit",function(){return o.onValide()}),i.TgZ(10,"ion-item"),i._UZ(11,"ion-input",5),i.qZA(),i._UZ(12,"br"),i.TgZ(13,"ion-item"),i._UZ(14,"ion-input",6),i.qZA(),i._UZ(15,"br"),i.TgZ(16,"ion-button",7),i._uU(17,"VALIDER"),i.qZA(),i.TgZ(18,"p",8),i.NdJ("click",function(){return o.navigateToCreerUtilisateur()}),i._uU(19,"Se cr\xe9er un compte"),i.qZA()()()),2&n&&(i.Q6J("translucent",!0),i.xp6(6),i.Q6J("fullscreen",!0),i.xp6(1),i.Q6J("pullFactor",.5)("pullMin",100)("pullMax",200),i.xp6(2),i.Q6J("formGroup",o.authentificationForm))},dependencies:[s._Y,s.JJ,s.JL,c.YG,c.Sm,c.W2,c.Gu,c.pK,c.Ie,c.fG,c.nJ,c.Wo,c.wd,c.sr,c.j9,s.sg,s.u]}),t})()}];let p=(()=>{var e;class t{}return(e=t).\u0275fac=function(n){return new(n||e)},e.\u0275mod=i.oAB({type:e}),e.\u0275inj=i.cJS({imports:[y.Bz.forChild(f),y.Bz]}),t})(),m=(()=>{var e;class t{}return(e=t).\u0275fac=function(n){return new(n||e)},e.\u0275mod=i.oAB({type:e}),e.\u0275inj=i.cJS({imports:[u.ez,s.u5,c.Pc,p,s.UX,s.u5]}),t})()},5423:(F,v,l)=>{l.d(v,{V:()=>T});var u=l(5861),s=l(3009),c=l(9825),y=l(6689),A=l(2014),g=l(2386),i=l(9392),Z=l(3182),x=l(553);let I=(()=>{var f;class p{constructor(e){this.firestore=e}post(e,t,r){return(0,u.Z)(function*(){const n=(0,Z.ZF)(x.N.firebaseConfig),o=(0,i.ad)(n);yield(0,g.pl)((0,g.JU)(o,e,r),t)})()}getAll(e){var t=this;return(0,u.Z)(function*(){const r=yield(0,g.hJ)(t.firestore,e);return(0,g.BS)(r)})()}put(e,t,r){var n=this;return(0,u.Z)(function*(){const o=(0,g.JU)(n.firestore,e+"/"+t);return(0,g.r7)(o,r)})()}delete(e,t,r){var n=this;return(0,u.Z)(function*(){const o=(0,g.JU)(n.firestore,e+"/"+t);return(0,g.oe)(o)})()}}return(f=p).\u0275fac=function(e){return new(e||f)(y.LFG(g.gg))},f.\u0275prov=y.Yz7({token:f,factory:f.\u0275fac,providedIn:"root"}),p})(),T=(()=>{var f;class p{constructor(e,t){this.storage=e,this.firestore=t}postAll(e,t){var r=this;return(0,u.Z)(function*(){(yield r.getConnexionInfo()).isOnline&&(yield(yield t.filter(d=>!d.isFirebase)).map(function(){var d=(0,u.Z)(function*(a){a.isFirebase=!0,yield r.firestore.post(e,a,a.id.toString())});return function(a){return d.apply(this,arguments)}}())),yield r.storage.set(e,t)})()}post(e,t){var r=this;return(0,u.Z)(function*(){var n=yield r.getAll(e);t.id=Number(new Date),t.createdOn=new Date,t.modifiedOn=null,t.deletedOn=null,t.isFirebase=!1,n.push(t),yield r.postAll(e,n)})()}get(e){var t=this;return(0,u.Z)(function*(){return yield(yield t.storage.get(e)).filter(n=>""===n.deletedOn||null===n.deletedOn||void 0!==n.deletedOn)})()}getAll(e){var t=this;return(0,u.Z)(function*(){return yield t.storage.get(e)})()}getIndex(e,t){var r=this;return(0,u.Z)(function*(){return yield(yield r.getAll(e)).findIndex(o=>o.id===t)})()}put(e,t){var r=this;return(0,u.Z)(function*(){const n=yield r.getAll(e),o=yield r.getIndex(e,t.id);n[o]=t,n[o].modifiedOn=new Date,(yield r.getConnexionInfo()).isOnline?yield r.firestore.put(e,t.id.toString(),t):n[o].isFirebase&&(n[o].firebaseMethod=c.f.PUT),yield r.postAll(e,n)})()}delete(e,t){var r=this;return(0,u.Z)(function*(){const n=yield r.getAll(e),o=yield r.getIndex(e,t.id);n[o].deletedOn=new Date,n[o].firebaseMethod=c.f.DELETE,yield r.postAll(e,n),(yield r.getConnexionInfo()).isOnline&&(yield r.firestore.put(e,t.id.toString(),t))})()}deleteDefinitivement(e,t){var r=this;return(0,u.Z)(function*(){const n=yield r.getAll(e),o=yield r.getIndex(e,t.id);(yield r.getConnexionInfo()).isOnline?(n.splice(o,1),yield r.firestore.delete(e,t.id.toString(),t)):n[o].isFirebase?(n[o].firebaseMethod=c.f.DELETE,n[o].deletedOn=new Date):n.splice(o,1),yield r.postAll(e,n)})()}synchroniserAvecFirestore(){var e=this;return(0,u.Z)(function*(){(yield e.getConnexionInfo()).isOnline?(yield e.synchroniser(s.K.Utilisateurs),yield e.synchroniser(s.K.Articles),yield e.synchroniser(s.K.Courses),yield e.synchroniser(s.K.Familles),yield e.synchroniser(s.K.CourseDetails),yield e.synchroniser(s.K.Memos),yield e.synchroniser(s.K.HistoriquePrix),yield e.synchroniser(s.K.Depenses),yield e.synchroniser(s.K.Apports),yield e.synchroniser(s.K.Epargnes),yield e.synchroniser(s.K.Magasins),yield e.synchroniser(s.K.Plats),yield e.synchroniser(s.K.PlatDetails),yield e.synchroniser(s.K.Groupes),yield e.synchroniser(s.K.Menus)):alert("Le mode onLine est d\xe9sactiv\xe9")})()}synchroniser(e){var t=this;return(0,u.Z)(function*(){if((yield t.getConnexionInfo()).isOnline){const n=yield t.storage.get(e),o=yield n.filter(a=>!a.isFirebase);o.length>0&&o.map(function(){var a=(0,u.Z)(function*(h){h.isFirebase=!0,yield t.firestore.post(e,h,h.id.toString())});return function(h){return a.apply(this,arguments)}}());const d=yield n.filter(a=>a.firebaseMethod===c.f.DELETE||a.firebaseMethod===c.f.PUT);d.length>0&&d.map(function(){var a=(0,u.Z)(function*(h){h.firebaseMethod===c.f.PUT&&(yield t.put(e,h)),h.firebaseMethod===c.f.DELETE&&(yield t.deleteDefinitivement(e,h))});return function(h){return a.apply(this,arguments)}}()),(yield t.firestore.getAll(e)).subscribe(a=>{t.storage.set(e,a)})}else alert("Le mode onLine est d\xe9sactiv\xe9")})()}set(e,t){var r=this;return(0,u.Z)(function*(){yield r.storage.set(e,t)})()}getConnexionInfo(){var e=this;return(0,u.Z)(function*(){return yield e.storage.get(s.K.InfoConnexion)})()}}return(f=p).\u0275fac=function(e){return new(e||f)(y.LFG(A.K),y.LFG(I))},f.\u0275prov=y.Yz7({token:f,factory:f.\u0275fac,providedIn:"root"}),p})()}}]);