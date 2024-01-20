import { Methods } from "../enums/Methods";

export interface BudgetParMois{
    id : number;
    mois : string;
    budget : number;
    isFirebase : false;
    deletedOn? : Date;
    firebaseMethod? : Methods;
}