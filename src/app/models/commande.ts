import { Article } from "./article";
import { Personne } from "./personne";

export interface Commandes{
      id:number;
      tel:String;
      adress:String;
      personne:Personne;
      CodePostal:String;
      dateCommande:Date;
      dateLivraison:String;
       article:Article;
      Lepayment:String;
      ville:String;
      quantity:number;
}