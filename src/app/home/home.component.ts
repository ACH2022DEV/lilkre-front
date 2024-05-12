import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Article } from '../models/article';
import { Details } from '../models/detail';
import { Devis } from '../models/devis';
import { Facture } from '../models/facture';
import { Picture } from '../models/mesImages';
import { Personne } from '../models/personne';
import { SearchService } from '../produits/search.service';
import { DatabaseService } from '../services/database.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { imageBase64 } from 'src/assets/imageEnBase64';
import { SecurityService } from '../auth/services/security.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public results:Article[]=[];
  public promotions:Article[]=[];
  public TotalProducts:Article[]=[];
  public AcemProducts:Article[]=[];
  public Postes:Article[]=[];


public size=12;
public page=0;
public searchText:any='outils';
public Total:any='TOTAL';
public Acem:any='Acem';
public Poste:any='Poste';

powers = [
  {value:'Appartements/studios'},
  {value:'Etage de villa'},
{value:'Villas/maisons'},
{value:'Location étudiant'},
{value:'Location meublée long durée'},
{value:'Location De Vacances'},
{value:'Bureaux'},
{value:'Autre immobilier'},
];

public remise:any=30;
public lenght:any;
public total: Array<number> | undefined;

  constructor(private sanitizer: DomSanitizer,private searchservice:SearchService
    ,private http: HttpClient, private securityService: SecurityService,private router: Router){

  }
  name:any;
  ngOnInit(): void {
    this.searchservice.Search(this.page,this.size, this.searchText).subscribe((data:any)=> {
      this.results = data['content'];
      this.lenght=this.results.length;
      console.log('this.results',data)
      this.total = new Array(data['totalPages']);
  })
  this.searchservice.Search(this.page,this.size, this.Total).subscribe((data:any)=> {
    this.TotalProducts = data['content'];
    this.lenght=this.results.length;
    console.log('this.results',data)
    this.total = new Array(data['totalPages']);
})
this.searchservice.Search(this.page,this.size, this.Poste).subscribe((data:any)=> {
  this.Postes = data['content'];
  this.lenght=this.results.length;
  console.log('this.results',data)
  this.total = new Array(data['totalPages']);
})
this.searchservice.Search(this.page,this.size, this.Acem).subscribe((data:any)=> {
  this.AcemProducts = data['content'];
  this.lenght=this.results.length;
  console.log('this.results',data)
  this.total = new Array(data['totalPages']);
})
  this.searchservice.SearchbyRemise(this.page,this.size, this.remise).subscribe((data:any)=> {
    this.promotions = data['content'];
    this.lenght=this.promotions.length;
    console.log('this.results',data)
    this.total = new Array(data['totalPages']);
})
  }
  convertBase64ToImage(images: Picture[]): any {

    let base64 = "data:image/png;base64, " + imageBase64;
        if (images.length > 0) {
      base64 = "data:image/png;base64, " + images[0].picbyte;
    }
    return this.sanitizer.bypassSecurityTrustUrl(base64);

  }



}



