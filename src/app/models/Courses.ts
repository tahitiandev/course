import { Methods } from "../enums/Methods";

export interface Courses{
    id : number;
    ordre : number;
    magasinId : number;
    montantTheorique : number;
    montantReel : number;
    ecart : number;
    date : Date;
    actif : boolean;
    isFirebase : false;
    payeurId? : number;
    deletedOn? : Date;
    isFocus? : boolean;
    firebaseMethod? : Methods;
}