import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Picture } from '../models/mesImages';
import { Personne } from '../models/personne';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
     jsonStringObj:any={};
     public client:Personne={id:0,nom:'string',prenom:'string',avis:{}as any,  adress:'string', tel:'', username:'string', email:'string', password:'', paniers:{}as any, images:{}as any, cammandes:{}as any};
  obj: any={email:'',username:'',id:'',roles:''};
  public ID:any;
  constructor(private personne: DatabaseService, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    if(sessionStorage.getItem('session')){
      this.jsonStringObj = sessionStorage.getItem('session');
      console.log('jsonStringObj',this.jsonStringObj)
      this.obj = JSON.parse(this.jsonStringObj);
      console.log('obj',this.obj)
    this.ID=this.obj.id;
    console.log('id',this.ID)
    }
    this.personne.getPersonne(this.ID).subscribe(data=>{
      this.client=data;
     // this.client2=data;
      console.log('client header',data)})


  }

   public  getData():boolean{
    if(sessionStorage.getItem('session')){
    return true
    }else{
      return false
    }
   }
  convertBase64ToImage(images: Picture[]): any {

    let base64 = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
    if (images.length > 0) {
      base64 = "data:image/png;base64, " + images[0].picbyte;
    }
    return this.sanitizer.bypassSecurityTrustUrl(base64);

  }








}


