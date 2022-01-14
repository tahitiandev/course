export interface  Courses{
    id : number;
    date : string;
    actif : boolean;
    total : number;
    liste? : Liste[];
    firebase : boolean;
    isModified? : boolean;
    documentId? : string;
    plafond? : number;
    tag? : string;
    payeur? : string;
    magasin? : string;
}

export interface Liste{
    articleId : string;
    libelle :  string;
    quantite? : number;
    prixUnitaire? : number;
    prixTotal? : number;
    actif : boolean;
}