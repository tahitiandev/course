export interface  Courses{
    id : number;
    date : string;
    actif : boolean;
    total : number;
    liste? : Liste[];
}

export interface Liste{
    articleId : number;
    libelle :  string;
    quantite? : number;
    prixUnitaire? : number;
    prixTotal? : number;
}