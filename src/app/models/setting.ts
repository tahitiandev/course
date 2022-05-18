export interface Setting{
    theme : boolean;
    budget : number;
    masquerLesCoursesCloture : boolean;
    payeurs : any [];
    tags : any [];
    magasins : any [];
    magasinParDefaut? : string;
    firebase : boolean;
    documentId? : string;
    isModified? : string;
}