import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommandesService } from '../commandes.service';
import { ContactService } from '../contact.service';
import { Commandes } from '../models/commande';
import { Contact } from '../models/contact';
import { Picture } from '../models/mesImages';
import { Personne } from '../models/personne';
import { DatabaseService } from '../services/database.service';
import { imageBase64 } from 'src/assets/imageEnBase64';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notification.scss']
})
export class NotificationsComponent implements OnInit {
public contacts:Contact[]=[];
public commandes:Commandes[]=[];
public nombreContact:any;
public personnes: Personne[] = [];
public total: Array<number> | undefined;
public page:number=0;
public size:number=100;
private id:any;
  constructor(private pesonneService: DatabaseService,private contactService:ContactService, private sanitizer: DomSanitizer,
    private commandeService:CommandesService) { }

  ngOnInit(): void {
    this.getAllContact();
    this.getAllPersonne();
  }
  public getAllContact(): void {
    this.contactService.getAllContact().subscribe(data => {
      this.contacts = data;
      this.nombreContact= this.contacts.length;
      this.getAllContact();


      // console.log(this.monpanier.length)
    },
      (error: HttpErrorResponse) => alert(error.message)
    );
  }
  //getCommandes
  public getCommandes(): void {
    this.commandeService.getCommande(this.id).subscribe(data => {
      this.commandes.push(data);
    },
      (error: HttpErrorResponse) => alert(error.message)
    );
  }

  //finGetCommandes
  convertBase64ToImage(images: Picture[]): any {

    let base64 = "data:image/png;base64, " + imageBase64;
        if (images.length > 0) {
      base64 = "data:image/png;base64, " + images[0].picbyte;
    }
    return this.sanitizer.bypassSecurityTrustUrl(base64);

  }
  public getAllPersonne(): void {
    this.pesonneService.getAllPersonne(this.page,this.size).subscribe((response:any) => {
      this.personnes =response['content'];
      console.log(response);
       this.total =new Array(response['totalPages']);//il faut utiliser le totalPages
      //  this.totalitems =new Array(response['totalElements']);

    },
      (error: HttpErrorResponse) => alert(error.message)
    );
  }
}
