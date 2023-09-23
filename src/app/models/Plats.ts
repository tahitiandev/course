export interface Plats{
    id : number;
    libelle : string;
    total : number;
    createdOn : Date;
    modifiedOn? : Date;
    deletedOn? : Date;
    isFirebase : false;
}