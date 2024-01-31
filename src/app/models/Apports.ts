import { Methods } from "../enums/Methods";

export interface Apports{
    id : number;
    userid : number;
    apport : number;
    commentaire? : string;
    check : boolean;
    createdOn : Date;
    modifiedOn? : Date;
    deletedOn? : Date;
    isFirebase : false;
    firebaseMethod? : Methods;
    key : string;
}