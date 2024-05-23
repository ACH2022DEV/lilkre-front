import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Article } from '../models/article';
import { Picture } from '../models/mesImages';
import { DatabaseService } from '../services/database.service';
import { imageBase64 } from 'src/assets/imageEnBase64';
import { ProduitService } from '../produits/produit.service';

@Component({
  selector: 'app-listeproduit',
  templateUrl: './listeproduit.component.html',
  styleUrls: ['./listeproduit.component.scss']
})
export class ListeproduitComponent implements OnInit {
  public produits:Article[]= [];
  public total!: Array<number> | [];
  public page:number=0;
  public size:number=8;
  public searchText:string='';
  //pop up
 public popoverTitle :string= 'Confirmation';
 public popoverMessage :string= 'Are you sure?';
 confirmClicked = false;
 cancelClicked = false;
 displayedPages: number[] = []; // Pages à afficher dans la pagination
 //
  constructor(private produitService: ProduitService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getAllProduits();
  }
  public getAllProduits(): void {
    this.produitService.getAllArticles(this.page,this.size).subscribe((data:any) => {
      this.produits = data['content'];
      this.total =new Array(data['totalPages']);
      this.updateDisplayedPages();
    },
      (error: HttpErrorResponse) => alert(error.message)
    );
  }
  public deletePRODUIT(id:number):void{
    this.produitService.deletearticle(id).subscribe(data=>{
      this.getAllProduits();
    }
      )
  }
//faire la logique de pagination

public updateDisplayedPages(): void {
  const startIndex = Math.max(0, this.page - 5); // Index de début
  const endIndex = Math.min(this.total.length - 1, startIndex + this.size - 1); // Index de fin
  this.displayedPages = Array.from({ length: endIndex - startIndex + 1 }, (_, i) => startIndex + i);
}

public setPage(pageNumber: number, event: MouseEvent): void {
  event.preventDefault();
  this.page = pageNumber;
  this.getAllProduits();
}

public nextPage(): void {
  if (this.page < this.total.length - 1) {
    this.page++;
    this.getAllProduits();
  }
}

public previousPage(): void {
  if (this.page > 0) {
    this.page--;
    this.getAllProduits();
  }
}
//fin de la logique de pagination
convertBase64ToImage(images: Picture[]): any {

  let base64 = "data:image/png;base64, " + imageBase64;
    if (images.length > 0) {
    base64 = "data:image/png;base64, " + images[0].picbyte;
  }
  return this.sanitizer.bypassSecurityTrustUrl(base64);

}
}
