import { Flux } from "../enums/Flux";
import { Methods } from "../enums/Methods";

export interface Finances{
    id : number;
    userid : number;
    montant : number;
    type : Flux;
    commentaire? : string;
    check : boolean;
    createdOn : Date;
    modifiedOn? : Date;
    deletedOn? : Date;
    isFirebase : false;
    firebaseMethod? : Methods;
    isEpargne : boolean;
    key : string;
}