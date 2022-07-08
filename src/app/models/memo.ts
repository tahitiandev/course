export interface Memos{
    id : number;
    libelle : string;
    date : string;
    commentaire? : string;
    firebase : boolean;
    isModified : boolean;
    isDeleted : boolean;
}