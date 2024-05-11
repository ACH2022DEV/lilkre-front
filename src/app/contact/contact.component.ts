import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { ContactDto } from '../models/contactDto';
import { CreateContactDto } from '../models/createContactDto';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  jsonStringObj: any = {};
  obj: any = { email: '', username: '', id: '', roles: '' };
  public key: any;
  public contact:CreateContactDto[]=[];
  constructor(private contactService:ContactService, private router: Router) {
    
    ///get idpersonne
    this.jsonStringObj = sessionStorage.getItem('session');

    this.obj = JSON.parse(this.jsonStringObj);
    this.key = this.obj.id;
    console.log(this.key)
   }

  ngOnInit(): void {
  }
 public Createcontact(f:any){
 
  console.log('value',f)
  let data: CreateContactDto = { idPersonne: 0, contact: [] };
    data.idPersonne = f.controls['idPersonne'].value;
        let contact: ContactDto = {} as any;
        contact.sujet = f.controls['sujet'].value;
        contact.message = f.controls['message'].value;
        contact.destinateur = f.controls['destinateur'].value
        data.contact.push(contact);
    this.contactService.addContact(data).subscribe(data => {
      this.contact = new Array<CreateContactDto>();
      //console.log(data)
      this.contact.push(data);
      this.router.navigate(['/liste-produits']);

    })


  }
}
