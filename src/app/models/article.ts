import { AvisDto } from "./avisDto";
import { Picture } from "./mesImages";

export interface Article{

   // imageDarticle: import("c:/work/pfa/git/lilkre-front/src/app/models/file").FileHandle;
    codeArticle:number;
    description:string;
    remise:number;
    tva:number;
    quantite:number;
    prix:number;
    paysOrigine:string;
    images:Picture[];
    avis:AvisDto;
}
