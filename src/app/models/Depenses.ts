import { Methods } from "../enums/Methods";

export interface Depenses{
    id : number;
    userid : number;
    depense : number;
    commentaire? : string;
    check : boolean;
    createdOn : Date;
    modifiedOn? : Date;
    deletedOn? : Date;
    isFirebase : false;
    firebaseMethod? : Methods;
}