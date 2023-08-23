import { Familles } from "./Familles";
import { Magasins } from "./Magasins";
import { UtilisateurGroupes } from "./UtilisateurGroupes";

export interface Articles{
    id : number;
    libelle : string;
    prix : [
        {
            magasin : number,
            prix : number
        }
    ]
    createdOn : Date;
    modifiedOn? :  Date;
    deletedOn? : Date;
    groupeId : Array<number>
    familleId : number;
    codeBarre? : string;
}