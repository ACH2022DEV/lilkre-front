import { Personne } from "./personne";

export interface Contact{
    id:number;
    message:string;
    destinateur:string;
    sujet:string;
    personne:Personne;
    dateContact:Date;
}