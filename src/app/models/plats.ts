export interface Plats {
    libelle : string;
    codeArticle? : CodeArticle [];
    firebase : boolean;
}

export interface CodeArticle {
    codeArticle : string;
    quantite? : number;
    }