import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { FileHandle } from 'src/app/models/file';
import { DatabaseService } from 'src/app/services/database.service';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-editer-produits',
  templateUrl: './editer-produits.component.html',
  styleUrls: ['./editer-produits.component.scss']
})
export class EditerProduitsComponent implements OnInit {
  public produit: Article = { codeArticle:0, description:'',remise:0,tva:0, quantite:0,prix:0,paysOrigine:'',
    images:{}as any,avis:{}as any};
    userfile:any;
    public formData2=new FormData();

    images :string[]= [];
    AllImages: any[] = [];
 public produit1:Article[]=[];
 public produit2:FormData | undefined;

  floa_error:boolean=false;
  constructor(private produitService: ProduitService,
    private route: ActivatedRoute,private _snackBar: MatSnackBar,
    private router: Router) { }
    openSnackBar(message: string, action: string, type: 'error' | 'success') {
      this._snackBar.open(message, action, {
        duration: 5000,
        panelClass: type ===   'error' ? ['error'] : ['success'],
      });
    }
    validateQuantite(value: number): void {
      if (value % 1 !== 0) {
        console.log('value', value)
        this.floa_error=true;
      } else {
        this.floa_error=false;
      }
    }

  ngOnInit(): void {
   let codeArticle:number=this.route.snapshot.params['codeArticle'];
    this.produitService.getarticle(codeArticle).subscribe(data => {
      this.produit = data;
for(let index = 0; index < this.produit.images.length; index++){
let image:any=this.produit.images[index];
//console.log('type '+image.type);
const base64 = 'data:' + image + ';base64,' + image.picbyte;
const file = this.base64ToFile(base64,image.name);
const reader = new FileReader();
reader.onload = (e: any) => {
  this.selectedImages[index] = e.target.result;
};
reader.readAsDataURL(file);
this.AllImages[index]=file;
console.log( 'this.AllImages[] first',this.AllImages)
}
    })
  }


  public UpdateProduit(f: any) {
    if(this.AllImages.length>0){
    for (let i = 0; i < this.AllImages.length; i++) {
      this.userfile=this.AllImages[i];
      this.formData2.append('files',this.userfile);
      //console.log( 'this.formData2',this.formData2)
    }
    const productFormdata=this.prepareFormdata(this.produit);
    //console.log('productFormdata'+productFormdata)
    this.produitService.Updatearticle(productFormdata).subscribe(
      data => {
        this.produit2=data;
        this.openSnackBar('Vous avez modifié votre produit avec succès.', 'Fermer','success');
        this.router.navigate(['/adminliste-produit']);

      }
    )
  }else{
    this.openSnackBar('Vous devez ajouter au moins une image !', 'Fermer','error');
  }

  }
  prepareFormdata(article:Article):FormData{
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
   console.log("selectedFile", selectedFile);
   const reader = new FileReader();
   reader.onload = (e: any) => {
     this.selectedImages[index] = e.target.result;
   };
   reader.readAsDataURL(selectedFile);
 }
 }
 //transformer le base 64 en files ,
  base64ToFile(base64:any,name:any) {
   // console.log('base64 '+ base64)
  const binaryData = window.atob(base64.split(',')[1]);
  const len = binaryData.length;
  const uint8Array = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }
  const blob = new Blob([uint8Array], { type: 'image/jpeg' });
  const file = new File([blob], name, { type: 'image/jpeg' });
  return file;
}

}
