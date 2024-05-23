import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AvisService } from 'src/app/avis.service';
import { Article } from 'src/app/models/article';
import { CreatePanier } from 'src/app/models/createPanier';
import { Picture } from 'src/app/models/mesImages';
import { Panier } from 'src/app/models/panier';
import { Personne } from 'src/app/models/personne';
import { DatabaseService } from 'src/app/services/database.service';
import { SearchService } from '../search.service';
import { imageBase64 } from 'src/assets/imageEnBase64';
import { FavorisService } from 'src/app/favoris.service';
import { PanierService } from 'src/app/panier.service';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.scss']
})
export class ListeProduitsComponent implements OnInit {
  public produits: Article[] = [];
  public lepanier: CreatePanier[] = [];
  public total: Array<number> | undefined;
  public page: number = 0;
  public size: number = 12;
  public monpanier:Panier[]=[];
 public quantity1:any=1


  //fin search

  public poductExist:boolean=false;
  jsonStringObj: any = {};

  obj: any = { email: '', username: '', id: '', roles: '' };

  public key: any;
  //public keyword:any;
  public quantity:number=1;
  public produitItem:any;
  public code:any;
  public prodi:boolean=false;
  public ID:any;
  public nombredeprod: any;
  public lenght:any;
 // public nombre1:any=1;
//  public nombre:any;
  constructor(private produitService: ProduitService, private sanitizer: DomSanitizer, private panierService: PanierService,
    private fb: FormBuilder, private avisClient: AvisService,private search:SearchService,private route: ActivatedRoute
    ,private router: Router,private favorisService:FavorisService) {



  }
  isFavorite: boolean = false;

  ngOnInit(): void {
       this.jsonStringObj = sessionStorage.getItem('session');
if(this.jsonStringObj){
  this.obj = JSON.parse(this.jsonStringObj);
    this.key = this.obj.id;
    console.log(this.key)
}

    this.getAllProduits();
   // this.nombre=this.nombre1.toFixed(2);

  }



  /////

  //ajouter au panier
  public ajouterPanier(AjouterAuPanier: any) {
    console.log('le nouveau panier',AjouterAuPanier.value)
    let data: CreatePanier = {}as any;
      console.log(data)
      data.idPersonne=AjouterAuPanier.value.idPersonne;
      data.paniers={}as any;
      data.paniers.codeArticle=AjouterAuPanier.value.codeArticle;
      data.paniers.quantity=AjouterAuPanier.value.quantity;
      this.code=data.paniers.codeArticle;
   //   console.log('data ',data)
      this.panierService.addPanier(data).subscribe(data => {
        console.log('data ',data)
          this.lepanier = new Array<CreatePanier>();
             this.lepanier.push(data);
        })
      }










  //afficher les produits
  public getAllProduits(): void {
    this.produitService.getAllArticles(this.page, this.size).subscribe((data: any) => {
      this.produits = data['content'];
      this.lenght=data['totalElements'];
      console.log( data['totalElements']);
      this.total = new Array(data['totalPages']);
    },
      (error: HttpErrorResponse) => alert(error.message)
    );
  }

  convertBase64ToImage(images: Picture[]): any {

    let base64 = "data:image/png;base64, " + imageBase64;
        if (images.length > 0) {
      base64 = "data:image/png;base64, " + images[0].picbyte;
    }
    return this.sanitizer.bypassSecurityTrustUrl(base64);

  }
  setPage(i: number, event: any) {
    this.page = i;
    this.getAllProduits();
  }

  public incremente(){



   this.quantity1++

  }
  public decremente(){
    this.quantity1--

 }
 toggleFavorite(produit:any) {
  if(sessionStorage.getItem('session')){
    let Envies:any={
      idPersonne:this.key,
      codeArticle:produit.codeArticle,
    }
    console.log('data'+JSON.stringify(Envies))
this.favorisService.addEnvies(Envies).subscribe((data:any)=>{
console.log('data'+data)
})
  }else{
     this.isFavorite = !this.isFavorite;
  // Call a function to save the article to localStorage
  if (this.isFavorite) {
    this.saveToFavorites(produit);
  } else {
    this.removeFromFavorites(produit.codeArticle);
  }
  }

}
saveToFavorites(article: any) {
  let favorites = JSON.parse(localStorage.getItem("favorites") || '[]');
  favorites.push(article.codeArticle);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

removeFromFavorites(article: any) {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  favorites = favorites.filter((fav: any) => fav !== article);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
checkIsFavorite(article: any): boolean {
  if(sessionStorage.getItem('session')){
    //ajouter la logique
    return false;
  }else{
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  return favorites.some((fav: any) => fav === article);
  }

}

}
