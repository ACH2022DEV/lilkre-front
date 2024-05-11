import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AvisService } from 'src/app/avis.service';
import { Avis } from 'src/app/models/avis';
import { AvisDto } from 'src/app/models/avisDto';
import { CreateAvis } from 'src/app/models/createAvis';
import { CreatePanier } from 'src/app/models/createPanier';
import { Picture } from 'src/app/models/mesImages';
import { DatabaseService } from 'src/app/services/database.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../liste-produits/image-modal/image-modal.component';
import { imageBase64 } from 'src/assets/imageEnBase64';
import { Observable } from 'rxjs';
import { PanierService } from 'src/app/panier.service';

@Component({
  selector: 'app-produits-details',
  templateUrl: './produits-details.component.html',
  styleUrls: ['./produits-details.scss']
})
export class ProduitsDetailsComponent implements OnInit {
  public panier:any={
    id: 0,
    article: {},
    quantity: 0,
    date: undefined
  }
  public article_disponible:boolean=false;
  public quantity_article:any=0;
  public isPresente_Article:boolean=false;
  public produit: any = { codeArticle: '' };
  public lesAvis: Avis[] = [];
  public nouveauAvis: CreateAvis[] = [];
  jsonStringObj: any = {};
  public form: FormGroup;
  obj: any = { email: '', username: '', id: '', roles: '' };
  public key: any;
  public nombreCommentaire: any;
public width:number=100;
public nombreDavis:any;
public lepanier: CreatePanier[] = [];
public code:any;
public quantity:number=1;
public Commentaire:boolean=true;
urlPartage:string=""
constructor( private elementRef: ElementRef,private panierService: PanierService,private produitService: DatabaseService, private route: ActivatedRoute, private sanitizer: DomSanitizer,
    private router: Router, private avisService: AvisService, private fb: FormBuilder,public dialog: MatDialog) {
    this.getAllAvis();
    this.nombreCommentaire;
    //L'étoile
    this.form = this.fb.group({
      rating: ['', Validators.required],
      rating1: [1],
      rating2: [2],
      rating3: [3],
      rating4: [4],
      rating5: [5],




    })

    ///get idpersonne
    this.jsonStringObj = sessionStorage.getItem('session');
if(this.jsonStringObj){
      this.obj = JSON.parse(this.jsonStringObj);
    this.key = this.obj.id;
    //console.log("this.key"+this.key)
}





  }
  isFavorite: boolean = false;
  ngOnInit(): void {
    this.CheckPresenceOfArticle();
this.getArticleDetails();
this.isProductAvailable();
    if(this.nombreCommentaire==0){
      this.Commentaire=false;
    }else{
      this.Commentaire = true;
    }


  }
//get article details
public getArticleDetails(){
  this.urlPartage='https://localhost:4200'+this.router.url;
  this.produitService.getarticle(this.route.snapshot.params['codeArticle']).subscribe(data => {
    this.produit = data;
      //check if this article existe in favorites
  this.isFavorite = this.checkIsFavorite(this.produit.codeArticle);
    //console.log('this.isFavorite '+ this.isFavorite);
    //this.nombreDavis=this.produit.article.avis.lenght;
    //console.log('this.produit',this.produit.images)
    this.activeImageUrl=this.produit.images[0];
  })
}

  //Afficher les Avis de client
  public getAllAvis(): void {
    this.avisService.getAllAvis().subscribe(data => {
      this.lesAvis = data;
      this.nombreCommentaire = this.lesAvis.length;
      this.nombreCommentaire;


    },
      (error: HttpErrorResponse) => alert(error.message)
    );
  }

  ////////////////////////////////
  activeImageUrl: string = ''; // Variable pour stocker l'URL de l'image active
  // Méthode pour définir l'image active lorsqu'un utilisateur clique sur une image
  setActiveImage(imageUrl: string) {
      this.activeImageUrl = imageUrl;
  }
  openImageModal(imageUrl: string) {
    const navbar = document.getElementById('navbar');
    //console.log("navbar:", navbar);
    if (navbar) {
     // navbar.style.position = 'fixed';
      navbar.classList.remove('sticky-top');
    }
    const dialogRef = this.dialog.open(ImageModalComponent, {
      data: { imageUrl: imageUrl }
    });
    dialogRef.afterClosed().subscribe(() => {
      // Cette fonction sera appelée lorsque le modal sera fermé
      // Ajoutez la classe "sticky-top" à votre élément navbar ici
      if (navbar) {
        navbar.classList.add('sticky-top');
      }
    });
  }

  //ajouter un avis d'un client
  public ajouterVotreAvis(f: any) {
    //console.log('creer avis', f)
    let data: CreateAvis = { idPersonne: 0, avis: [] };
    data.idPersonne = f.controls['idPersonne'].value;
        let avisDto: AvisDto = {} as any;
        avisDto.codeArticle = f.controls['codeArticle'].value;
        avisDto.message = f.controls['message'].value;
        avisDto.etoile = f.controls['etoile'].value
        data.avis.push(avisDto);
    this.avisService.addAvis(data).subscribe(data => {
      this.nouveauAvis = new Array<CreateAvis>();
      //console.log(data)
      this.nouveauAvis.push(data);
      window.location.reload()

    })

  }


  public ajouterAuPanier(f: any) {
    //console.log('le nouveau panier',f.value)
    let data: CreatePanier = {}as any;
      console.log(data)
      data.idPersonne=f.value.idPersonne;
      data.paniers={}as any;
      data.paniers.codeArticle=f.value.codeArticle;
      data.paniers.quantity=f.value.quantity;
      this.code=data.paniers.codeArticle;

      this.panierService.addPanier(data).subscribe(data => {
          this.lepanier = new Array<CreatePanier>();
             this.lepanier.push(data);
             this.CheckPresenceOfArticle();


        })
      }



  lecodeArticle: number = this.produit.codeArticle;


  convertBase64ToImage(images: Picture[]): any {

    let base64 = "data:image/png;base64, " + imageBase64;
        if (images.length > 0) {
      base64 = "data:image/png;base64, " + images[0].picbyte;
    }
    return this.sanitizer.bypassSecurityTrustUrl(base64);

  }
  /* convertBase64ToImages(images: Picture[]): any {
    let base64 = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
     for(let i=this.lecodeArticle;i <this.produit.length;i++){
      for(let j=this.produit.images.length;j <this.produit[i].images.id;j++){
        base64 =  "data:image/png;base64, "+ this.produit[i].images[j].picbyte;
     }}
    return this.sanitizer.bypassSecurityTrustUrl(base64);
  } */
  convertBase64ToImages(image: any): SafeUrl {
    if (image && image.picbyte) {
      const imageUrl = 'data:' + image.type + ';base64,' + image.picbyte;
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    } else {
      return '';
    }
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // Call a function to save the article to localStorage
    if (this.isFavorite) {
      this.saveToFavorites(this.produit);
    } else {
      this.removeFromFavorites(this.produit.codeArticle);
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
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some((fav: any) => fav === article);
  }
//check the present of article
  public CheckPresenceOfArticle(){
    this.panierService.getPanierByClientId(this.key).subscribe(
      response=>{
        this.panier=response;
        const codeArticle:number = this.route.snapshot.params['codeArticle'];
        const articlePresent = this.panier.find((item: any) => item.article.codeArticle == codeArticle);
        if(articlePresent) {
          this.isPresente_Article=true;
          this.quantity_article=articlePresent.quantity;
          console.log("Informations de l'article :", articlePresent.quantity);
          console.log("L'article est présent dans le panier.");
        } else {
          this.isPresente_Article=false;
          console.log("L'article n'est pas présent dans le panier.");
        }

    })
  }
  public incremente(codeArticle:any){
    console.log('codeArticle ' +codeArticle)
     let data: CreatePanier = {}as any;
       data.idPersonne=this.key;
       data.paniers={}as any;
       data.paniers.codeArticle=codeArticle;
       data.paniers.quantity=1;
       this.panierService.addPanier(data).subscribe((data:any )=> {
        this.CheckPresenceOfArticle();
        this.isProductAvailable();
         })
     }

     public decremente(codeArticle:any){
     let data: CreatePanier = {}as any;
       console.log(data)
       data.idPersonne=this.key;
       data.paniers={}as any;
       data.paniers.codeArticle=codeArticle;
       data.paniers.quantity=1;
       this.panierService.decrementeQuantity_Article(data).subscribe(data => {
        this.CheckPresenceOfArticle();
        this.isProductAvailable();
         })
    }
//vérifier la disponibilité d'un produit
public isProductAvailable() {
  const codeArticle:number = this.route.snapshot.params['codeArticle'];
  const panierDto: any = {
    idPersonne: this.key,
    paniers: {
      codeArticle: codeArticle,
      quantity: 1
    }
  };
  this.panierService.VerifierDisponibility_article(panierDto).subscribe(response => {
    //console.log("response"+response.message)
    if ( response && response.message === "Disponible") {
      console.log("response"+response.message)
      this.article_disponible=true;
    } else {
      this.article_disponible=false;
    }

  });
}


}
