export interface Depenses{
    date : Date;
    payeur : string;
    montant : number;
    enseigne : string;
    description : string;
    firebase : boolean;
    isModified? : boolean;
    isDeleted? : boolean;
    documentId? : string;
}