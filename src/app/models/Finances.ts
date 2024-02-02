import { Flux } from "../enums/Flux";
import { Methods } from "../enums/Methods";
import { TypeOperation } from "../enums/TypeOperation";

export interface Finances{
    id : number;
    userid : number;
    montant : number;
    flux : Flux;
    commentaire? : string;
    check : boolean;
    createdOn : Date;
    modifiedOn? : Date;
    deletedOn? : Date;
    isFirebase : false;
    firebaseMethod? : Methods;
    isEpargne : boolean;
    key : string;
    type : TypeOperation
}