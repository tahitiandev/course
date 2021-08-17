export interface Articles{
    code : string;
    libelle : string;
    prix : number;
    prixModifier? : number;
    quantite?:number;
}

export interface FamilleArticle{
    code : string;
    libelle : string;
}