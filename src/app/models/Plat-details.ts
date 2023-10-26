import { Methods } from "../enums/Methods";
import { Articles } from "./Articles";

export interface PlatDetails{
    id : number;
    ordre : number;
    platId : number;
    quantite : number;
    article : Articles;
    total : number;
    isFirebase : false;
    firebaseMethod? : Methods;
}