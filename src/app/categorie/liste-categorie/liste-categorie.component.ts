import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategorieService } from '../categorie.service';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { EditCategorieComponent } from '../edit-categorie/edit-categorie.component';
import { CrerCategorieComponent } from '../crer-categorie/crer-categorie.component';

@Component({
  selector: 'app-liste-categorie',
  templateUrl: './liste-categorie.component.html',
  styleUrls: ['./liste-categorie.component.scss']
})
export class ListeCategorieComponent {
  public Categories:any[]= [];
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
  constructor(private _snackBar: MatSnackBar,private categorieService: CategorieService,
     private sanitizer: DomSanitizer,public dialog: MatDialog) { }

  openSnackBar(message: string, action: string, type: 'error' | 'success') {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: type ===   'error' ? ['error'] : ['success'],
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
  }
   nom:string=""
  viderData(){
this.nom=""
  }

  ajouterCategorie() {
    const navbar = document.getElementById('navbar');
    console.log("navbar:", navbar);
    if (navbar) {
     // navbar.style.position = 'fixed';
      navbar.classList.remove('sticky-top');
    }
  const dialogRef = this.dialog.open(CrerCategorieComponent, {
    data: { data:  "",
    border:0},
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result === true) {
    this.getAllCategories();
    this.openSnackBar('Vous avez ajouté le catégorie avec succès.', 'Fermer','success');
  }
    if (navbar) {
      navbar.classList.add('sticky-top');
    }
  });

  }
  ModifierCategorie(id:any){
    console.log("id:", id);
    const navbar = document.getElementById('navbar');
    //console.log("navbar:", navbar);
    if (navbar) {
     // navbar.style.position = 'fixed';
      navbar.classList.remove('sticky-top');
    }
  const dialogRef = this.dialog.open(EditCategorieComponent, {
    data: { data:  id,
    border:0},
  });
  dialogRef.afterClosed().subscribe((result) => {
    //console.log('result'+result);
    if (result === true) {
    this.getAllCategories();
    this.openSnackBar('Vous avez modifié le catégorie avec succès.', 'Fermer','success');
  }
    if (navbar) {
      navbar.classList.add('sticky-top');
    }
  });

  }


  public getAllCategories(): void {
    this.categorieService.getAllCategorie(this.page,this.size).subscribe((data:any) => {
      this.Categories = data['content'];
      this.total =new Array(data['totalPages']);
      this.updateDisplayedPages();
    },

    );
  }
  public deleteCategorie(id:number):void{
    this.categorieService.deleteCategorie(id).subscribe((data:any)=>{
      this.getAllCategories();
      this.openSnackBar('Vous avez supprimé le catégorie avec succès.', 'Fermer','error');
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
  this.getAllCategories();
}

public nextPage(): void {
  if (this.page < this.total.length - 1) {
    this.page++;
    this.getAllCategories();
   }
}

public previousPage(): void {
  if (this.page > 0) {
    this.page--;
    this.getAllCategories();
  }
}
}
