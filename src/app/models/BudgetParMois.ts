import { Methods } from "../enums/Methods";

export interface BudgetParMois{
    id : number;
    mois : number;
    budget : number;
    isFirebase : false;
    deletedOn? : Date;
    firebaseMethod? : Methods;
}