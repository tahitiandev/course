import { Methods } from "../enums/Methods";

export interface CourseDetails{
    id : number;
    ordre : number;
    courseId : any;
    libelle : string;
    quantite : number;
    articleId : number;
    prixArticle : number;
    prixReel : number;
    total : number;
    checked : boolean;
    isFirebase : false;
    deletedOn? : Date;
    firebaseMethod? : Methods;
}