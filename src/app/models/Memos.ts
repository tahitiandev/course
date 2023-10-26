import { Methods } from "../enums/Methods";
import { Articles } from "./Articles";

export interface Memos{
    id : number;
    article : Articles;
    quantite : number;
    createdOn? : Date;
    modifiedOn? :  Date;
    deletedOn? : Date;
    isFirebase : false;
    firebaseMethod? : Methods;
}