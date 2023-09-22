export interface HistoriquePrix{
    id : number;
    articleId : number;
    libelle : string;
    prixAncien : number;
    prixNouveau : number;
    magasinid : number;
    date : Date;
    isFirebase : boolean;
}