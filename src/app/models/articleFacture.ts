import { Article } from "./article";
import { Facture } from "./facture";

export interface ArticleFacture{
        codeArticle: any;
        id:number;
        dateEdition:Date;
        facture:Facture;
        article:Article;
        quatite:number;
        remise:number;
}