import { ContactDto } from "./contactDto";

export interface CreateContactDto{
    idPersonne:number;
    contact:ContactDto[];
}