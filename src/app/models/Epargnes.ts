import { Methods } from "../enums/Methods";

export interface Epargnes{
    id : number;
    userid : number;
    epargne : number;
    commentaire? : string;
    check : boolean;
    createdOn : Date;
    modifiedOn? : Date;
    deletedOn? : Date;
    isFirebase : false;
    firebaseMethod? : Methods;
}