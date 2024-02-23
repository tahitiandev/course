import { Methods } from "../enums/Methods";
import { Plats } from "./Plats";

export interface Menu{
    id : number;
    jour : string;
    libelle? : string;
    plat? : Plats;
    createdOn? : Date;
    modifiedOn? :  Date;
    deletedOn? : Date;
    isFirebase : false;
    firebaseMethod? : Methods;
    groupeId : number;
    annee : number;
    numeroSemaine : number;
}