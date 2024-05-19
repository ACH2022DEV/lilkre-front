import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { FileHandle } from 'src/app/models/file';
import { Picture } from 'src/app/models/mesImages';
import { DatabaseService } from 'src/app/services/database.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButton } from '@angular/material/button';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import { MatIcon } from '@angular/material/icon';
import { CategorieService } from 'src/app/categorie/categorie.service';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-crer-produits',
  templateUrl: './crer-produits.component.html',
  styleUrls: ['./crer-produits.component.scss'],
})
export class CrerProduitsComponent implements OnInit {
  produit: any = [];
  userfile:any;
  userfile2:any;
  public imagePath:any;
  imgURL:any;
  images :string[]= [];
  public elements : Array<any> = [] ;

   public fileList : FileList[] | undefined
   public formData2=new FormData();
   selected = 'option2';
   quantite:any;
   floa_error:boolean=false;
  constructor(private produitService: ProduitService,private router: Router,private sanitiser:DomSanitizer,
    private _snackBar: MatSnackBar,private categorieService:CategorieService) { }
    openSnackBar(message: string, action: string, type: 'error' | 'success') {
      this._snackBar.open(message, action, {
        duration: 5000,
        panelClass: type ===   'error' ? ['error'] : ['success'],
      });
    }
  AllImages: any[] = [];
  ngOnInit(): void {
    this.getAllCategories();
  }

  validateQuantite(value: number): void {
    if (value % 1 !== 0) {
      console.log('value', value)
      this.floa_error=true;
    } else {
      this.floa_error=false;
    }
  }

  addimage(){
    this.elements.push('test');
  }

  selectedCategory:any;
  public addProduit(f: any) {
    let data = f.value;
let Article_Data: any={
  categorie:{
    id: data.categorie,
  },
  description:data.description,
  paysOrigine:data.paysOrigine,
  prix:data.prix,
  quantite:data.quantite,
  remise:data.remise,
  tva:data.tva
};
    console.log('Article_Data', Article_Data)
    console.log('this is AllImages', this.AllImages.length)
    if(this.AllImages.length>0){
 for (let i = 0; i < this.AllImages.length; i++) {
      this.userfile=this.AllImages[i];
      this.formData2.append('files',this.userfile);
      console.log( 'this.formData2',this.formData2)
    }
    const productFormdata=this.prepareFormdata(Article_Data);
    console.log('this is productFormdata', productFormdata)
    this.produitService.addarticle(productFormdata).subscribe(
      data => {
        this.produit = new Array<Article>();
        this.produit = data;
        this.openSnackBar('Vous avez ajouté votre produit avec succès.', 'Fermer','success');
        this.router.navigate(['/adminliste-produit']);
        // redirection
      }
    )
    }else{
      this.openSnackBar('Vous devez ajouter au moins une image !', 'Fermer','error');
    }

  }
  prepareFormdata(article:any):FormData{
   this.formData2.append('article',new Blob([JSON.stringify(article)],{type:'application/json'}));
    return this.formData2;
  }




    onDeleteImage(index:any){
// Supprimer l'élément de AllImages
this.AllImages.splice(index, 1);
// Supprimer l'élément de selectedImages
this.selectedImages.splice(index, 1);
// Filtrer les images non définies ou vides
const filteredImages = this.AllImages.filter(image => image !== undefined && image !== 'empty');
console.log('Longueur du tableau filtré', filteredImages.length);
console.log('Longueur du tableau filtré', filteredImages);
this.AllImages=[];
this.AllImages=filteredImages;
console.log('Longueur du tableau filtré_AllImages', this.AllImages);
    }




  selectedImages: any[] = []; // Pour stocker l'image sélectionnée


  onImageSelected(event: any, index: number) {
    const selectedFile = event.target.files[0];
    const fileName = selectedFile.name;
    const fileNameExists = this.AllImages.some((file) => file && file.name === fileName);
if(fileNameExists){
  this.openSnackBar('Vous avez déjà ajouté cette image !', 'Fermer','error');
}else{
   this.AllImages[index]=selectedFile
    console.log("this.AllImages", this.AllImages);
    console.log("selectedFile", selectedFile.name);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImages[index] = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
}

  }
  //ajouter la méthode get catégorie
  Allcategorie:any=[];
  getAllCategories(){
    this.categorieService.getAllCategorie(0,100).subscribe((data:any)=>{
      console.log('data'+JSON.stringify(data) );
      this.Allcategorie=data['content'];
    })
  }

      }
