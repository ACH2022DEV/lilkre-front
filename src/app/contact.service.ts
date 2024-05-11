import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from './models/contact';
import { CreateContactDto } from './models/createContactDto';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private url = "http://localhost:8080/lilkre-back/api/v1/contact";
  constructor(private http: HttpClient) { }
  public getAllContact(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.url}`);

  }
  public getContact(id:number): Observable<Contact> {

    return this.http.get<Contact>(`${this.url}/${id}`);

  }
  public addContact(createContactDto:CreateContactDto): Observable<CreateContactDto> {
    return this.http.post<CreateContactDto>(`${this.url}`, createContactDto);

  }
  public deleteContact(id:number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);

  }

}
