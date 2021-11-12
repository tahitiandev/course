export interface Plats {
    libelle : string;
    codeArticle? : CodeArticle [];
    prix? : number;
    firebase : boolean;
    isModified? : boolean;
    documentId? : string;
}

export interface CodeArticle {
    codeArticle : string;
    quantite? : number;
    }