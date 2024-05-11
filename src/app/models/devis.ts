import { DevisArticle } from "./devisArticle";
import { Personne } from "./personne";

export interface Devis {

  codedevis: number;
  personne: Personne;
  articles: DevisArticle[];
}