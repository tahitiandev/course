import { Articles } from "./Articles";

export interface PlatDetails{
    id : number;
    ordre : number;
    courseId : number;
    libelle : string;
    quantite : number;
    article : Articles;
    total : number;
    isFirebase : false;
}