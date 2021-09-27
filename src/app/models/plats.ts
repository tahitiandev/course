export interface Plats {
    libelle : string;
    codeArticle? : CodeArticle [];
}

export interface CodeArticle {
    codeArticle : string;
    quantite? : number;
    }