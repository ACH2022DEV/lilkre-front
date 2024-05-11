import { Article } from "./article";
import { Personne } from "./personne";

export interface Avis{
    id:number;
     message:String;
    etoile:number;
     personne:Personne;
     article:Article;
     dateAvis:Date;
}