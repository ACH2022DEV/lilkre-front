
import { ArticleFacture } from "./articleFacture";
import { Personne } from "./personne";

export interface Facture{
     
     id:number;
     montantTotal:number;
     personne:Personne;
     articles: ArticleFacture[];
}