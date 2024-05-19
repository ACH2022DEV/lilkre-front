import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DatabaseService } from 'src/app/services/database.service';
import { GouvernoratService } from '../gouvernorat.service';
import { MatDialog } from '@angular/material/dialog';
import { EditGouvernoratComponent } from '../edit-gouvernorat/edit-gouvernorat.component';
import { CrerGouvernoratComponent } from '../crer-gouvernorat/crer-gouvernorat.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-gouvernorat',
  templateUrl: './list-gouvernorat.component.html',
  styleUrls: ['./list-gouvernorat.component.scss']
})
export class ListGouvernoratComponent {
  public gouvernorat:any[]= [];
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
  constructor(private _snackBar: MatSnackBar,private gouvernoratService: GouvernoratService, private sanitizer: DomSanitizer,public dialog: MatDialog) { }

  openSnackBar(message: string, action: string, type: 'error' | 'success') {
        this._snackBar.open(message, action, {
          duration: 5000,
          panelClass: type ===   'error' ? ['error'] : ['success'],
        });
      }


  ngOnInit(): void {
    this.getAllGouvernorat();
  }
   nom:string=""
  viderData(){
this.nom=""
  }

  ajouterGouvernorat() {
    const navbar = document.getElementById('navbar');
   // console.log("navbar:", navbar);
    if (navbar) {
     // navbar.style.position = 'fixed';
      navbar.classList.remove('sticky-top');
    }
  const dialogRef = this.dialog.open(CrerGouvernoratComponent, {
    data: { data:  "",
    border:0},
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result === true) {
    this.getAllGouvernorat();
    this.openSnackBar('Vous avez ajouté le gouvernorat avec succès.', 'Fermer','success');
   }
   if (navbar) {
      navbar.classList.add('sticky-top');
    }
  });

  }
  ModifierGouvernorat(id:any){
    console.log("id:", id);
    const navbar = document.getElementById('navbar');
    console.log("navbar:", navbar);
    if (navbar) {
     // navbar.style.position = 'fixed';
      navbar.classList.remove('sticky-top');
    }
  const dialogRef = this.dialog.open(EditGouvernoratComponent, {
    data: { data:  id,
    border:0},
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result === true) {
    this.getAllGouvernorat();
    this.openSnackBar('Vous avez modifié le gouvernorat avec succès.', 'Fermer','success');
    }
    if (navbar) {
      navbar.classList.add('sticky-top');
    }
  });

  }


  public getAllGouvernorat(): void {
    this.gouvernoratService.getAllGouvernorat(this.page,this.size).subscribe((data:any) => {
      this.gouvernorat = data['content'];
      this.total =new Array(data['totalPages']);
      this.updateDisplayedPages();
    },

    );
  }
  public deletegouvernorat(id:number):void{
    this.gouvernoratService.deleteGouvernorat(id).subscribe((data:any)=>{
      this.getAllGouvernorat();
    //  console.log("message"+data.message);
      if(data.message==="No"){
        this.openSnackBar('Vous ne pouvez pas supprimer le gouvernorat car il est associé à d\'autres communes.', 'Fermer','error');
      }else{
        this.openSnackBar('Vous avez supprimé le gouvernorat avec succès.', 'Fermer','error');
      }

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
  this.getAllGouvernorat();
}

public nextPage(): void {
  if (this.page < this.total.length - 1) {
    this.page++;
    this.getAllGouvernorat();
   }
}

public previousPage(): void {
  if (this.page > 0) {
    this.page--;
    this.getAllGouvernorat();
  }
}

}
