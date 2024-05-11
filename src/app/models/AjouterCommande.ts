import { commandeDto } from "./commandeDto";

export interface AjouterCommande{
    idPersonne:number;
     tel:String;
    adress:String;
      CodePostal:String;
      dateCommande:Date;
      dateLivraison:String;
      montantTotal:number;
      quantity:number;
      Lepayment:String;
      ville:String;
     commande:commandeDto[];
}