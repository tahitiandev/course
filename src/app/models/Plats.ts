import { PlatDetails } from "./Plat-details";

export interface Plats{
    id : number;
    libelle : string;
    article : Array<PlatDetails>;
    prix : number;
    createdOn : Date;
    modifiedOn : Date;
    deletedOn : Date;
    isFirebase : false;
}