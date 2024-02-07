export interface UtilisateurGroupeActivation{
    userId : number;
    groupeId : number;
    code: string;
    isActif : boolean;
    dateExpiration : Date;
}