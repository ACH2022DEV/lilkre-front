import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { Picture } from '../models/mesImages';
import { DomSanitizer } from '@angular/platform-browser';
import { DatabaseService } from '../services/database.service';
import { CreatePanier } from '../models/createPanier';
import { FavorisService } from '../favoris.service';
import { PanierService } from '../panier.service';
import { ProduitService } from '../produits/produit.service';

@Component({
  selector: 'app-liste-envies',
  templateUrl: './liste-envies.component.html',
  styleUrls: ['./liste-envies.component.css']
})
export class ListeEnviesComponent implements OnInit {

  constructor( private sanitizer: DomSanitizer,private service:ProduitService,private panierService:PanierService,
    private favorisService:FavorisService
  ) { }

  favorites: number[] = []; // IDs des articles favoris

  favoriteArticles: any[] = []; // Articles favoris à afficher
  public nombredeprod: any;
  articles: Article[] | any;
  public page:number=0;
  public size:number=8;
  public total: Array<number> | undefined;
  convertBase64ToImage(images: Picture[]): any {

    let base64 = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
    if (images.length > 0) {
      base64 = "data:image/png;base64, " + images[0].picbyte;
    }
    return this.sanitizer.bypassSecurityTrustUrl(base64);

  }
  public deleteArticle(e: any) {


  }
  jsonStringObj: any = {};
  obj: any = { email: '', username: '', id: '', roles: '' };
  public ID:any;
  ngOnInit(): void {
    this.getFavorites();
    this.getFavoriteArticles();
    if(sessionStorage.getItem('session')){
      this.jsonStringObj = sessionStorage.getItem('session');
      this.obj = JSON.parse(this.jsonStringObj);
    this.ID=this.obj.id;
    }
  }

  getFavorites(): void {
    if(sessionStorage.getItem('session')){

    }else{
       const favoritesData = localStorage.getItem('favorites');
    //console.log('favoritesData'+ favoritesData);
    if (favoritesData) {
      this.favorites = JSON.parse(favoritesData);
      //console.log('favoritesData aprés parse' + favoritesData);
    }
    }

  }

  getFavoriteArticles(): void {
    if(sessionStorage.getItem('session')){
this.favorisService.getAllEnvies(this.page,this.size).subscribe((data:any)=>{
  console.log('data ' + JSON.stringify(data) );
  this.favoriteArticles = data['content'];
  console.log('favoriteArticles ' + this.favoriteArticles );
  this.total =new Array(data['totalPages']);
})
    }else{
    for (let i = 0; i < this.favorites.length; i++) {
      const favoriteId = this.favorites[i];
      console.log('favoriteId ' + favoriteId);
       this.service.getarticle(favoriteId).subscribe((data:any)=>{
        const article =data;
       // this.favoriteArticles.push(article);

      });

    }
  }
  }
  public ajouterAuPanier(codeArticle: any) {
   console.log('le nouveau panier',codeArticle)
    let data: CreatePanier = {}as any;
      console.log(data)
      data.idPersonne=this.ID;
      data.paniers={}as any;
      data.paniers.codeArticle=codeArticle;
      data.paniers.quantity=1;
      this.panierService.addPanier(data).subscribe(data => {
        })
      }



      setPage(i: number,event:any){
        this.page = i;
        this.getFavoriteArticles()
    }
    }
