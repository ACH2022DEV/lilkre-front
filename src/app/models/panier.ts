import { Article } from "./article";
import { Personne } from "./personne";

export interface Panier{
        id:number;
  
      personne:Personne;
   
      article:Article;

      quantity: number;
      date:Date;
}