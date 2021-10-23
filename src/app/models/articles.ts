export interface Articles{
    code : string;
    libelle : string;
    prix : number;
    prixModifier? : number;
    quantite?:number;
    famille? : string;
    firebase : boolean;
}

export interface FamilleArticle{
    code : string;
    libelle : string;
    firebase : boolean
}