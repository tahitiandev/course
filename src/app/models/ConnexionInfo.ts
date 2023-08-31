import { Magasins } from "./Magasins";

export interface ConnexionInfo{
    isConnected : boolean;
    utilisateurId : number;
    groupeId : number;
    magasinParDefaut? : Magasins;
  }