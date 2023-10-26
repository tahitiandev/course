import { Methods } from "../enums/Methods";

export interface Familles{
    id : number;
    libelle : string;
    createdOn : Date;
    modifiedOn? : Date;
    deletedOn? : Date;
    isFirebase : false;
    firebaseMethod? : Methods;
}