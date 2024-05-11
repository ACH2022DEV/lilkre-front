import { devisArticleDto } from "./devisAricleDto";
import { Personne } from "./personne";

export interface CreateDevis{
    //  personne:Personne;
    idPersonne:number;
    articles:devisArticleDto[];
}