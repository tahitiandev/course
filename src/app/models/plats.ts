export interface Plats {
    libelle : string;
    codeArticle? : CodeArticle [];
    firebase : boolean;
    isModified? : boolean;
    documentId? : string;
}

export interface CodeArticle {
    codeArticle : string;
    quantite? : number;
    }