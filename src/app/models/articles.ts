export interface Articles{
    code : string;
    libelle : string;
    prix : number;
    prixModifier? : number;
    quantite?:number;
    firebase? : boolean;
    isModified? : boolean;
    documentId? : string;
    familleCode? : string;
    familleLibelle? : string;
    barreCode? :string;
    magasin : string;
}

export interface FamilleArticle{
    code : string;
    libelle : string;
    firebase : boolean;
    isModified? : boolean;
    documentId? : string;
}