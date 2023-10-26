import { Methods } from "../enums/Methods";

export interface Magasins{
    id : number;
    libelle : string;
    createdOn : Date;
    modifiedOn : Date;
    deletedOn : Date;
    isFirebase : false;
    firebaseMethod? : Methods;
}