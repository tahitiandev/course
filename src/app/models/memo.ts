import { Articles } from "./articles";

export interface Memos{
    id : number;
    libelle : string;
    articleId : string;
    date : string;
    commentaire? : string;
    firebase : boolean;
    isModified : boolean;
    isDeleted : boolean;
}