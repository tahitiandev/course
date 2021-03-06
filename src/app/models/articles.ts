export interface Articles{
    code : string;
    libelle : string;
    prix : number;
    prixModifier? : number;
    PrixMagasin? : Array<PrixMagasin>;
    quantite?:number;
    firebase? : boolean;
    isModified? : boolean;
    isDeleted? : boolean;
    documentId? : string;
    familleCode? : string;
    familleLibelle? : string;
    barreCode? :string;
    magasin : string;
    articleSpecial? : boolean;
    isPrixMagasin?: boolean;
}

export interface Familles{
    code : string;
    libelle : string;
    firebase : boolean;
    isModified? : boolean;
    isDeleted? : boolean;
    documentId? : string;
}

export interface PrixMagasin{
    magasin : string;
    prix : number;
}