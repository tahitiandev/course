import { Methods } from "../enums/Methods";

export interface UtilisateurGroupeActivation{
    userId : number;
    groupeId : number;
    code: string;
    isActif : boolean;
    dateExpiration : Date;
    isFirebase : false;
    firebaseMethod? : Methods;
}