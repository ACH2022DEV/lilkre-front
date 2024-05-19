import { Component } from '@angular/core';
import { CommuneService } from '../commune.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { EditCommuneComponent } from '../edit-commune/edit-commune.component';
import { CrerCommuneComponent } from '../crer-commune/crer-commune.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-commune',
  templateUrl: './list-commune.component.html',
  styleUrls: ['./list-commune.component.scss']
})
export class ListCommuneComponent {
  public Communes:any[]= [];
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
  constructor(private _snackBar: MatSnackBar,private communeService: CommuneService, private sanitizer: DomSanitizer,public dialog: MatDialog) { }

  openSnackBar(message: string, action: string, type: 'error' | 'success') {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: type ===   'error' ? ['error'] : ['success'],
    });
  }

  ngOnInit(): void {
    this.getAllCommunes();
  }
   nom:string=""
  viderData(){
this.nom=""
  }

  ajouterCommune() {
    const navbar = document.getElementById('navbar');
    console.log("navbar:", navbar);
    if (navbar) {
     // navbar.style.position = 'fixed';
      navbar.classList.remove('sticky-top');
    }
  const dialogRef = this.dialog.open(CrerCommuneComponent, {
    data: { data:  "",
    border:0},
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result === true) {
    this.getAllCommunes();
    this.openSnackBar('Vous avez ajouté la commune avec succès.', 'Fermer','success');
  }
    if (navbar) {
      navbar.classList.add('sticky-top');
    }
  });

  }
  ModifierCommune(id:any){
    console.log("id:", id);
    const navbar = document.getElementById('navbar');
    //console.log("navbar:", navbar);
    if (navbar) {
     // navbar.style.position = 'fixed';
      navbar.classList.remove('sticky-top');
    }
  const dialogRef = this.dialog.open(EditCommuneComponent, {
    data: { data:  id,
    border:0},
  });
  dialogRef.afterClosed().subscribe((result) => {
    //console.log('result'+result);
    if (result === true) {
    this.getAllCommunes();
    this.openSnackBar('Vous avez modifié la commune avec succès.', 'Fermer','success');
  }
    if (navbar) {
      navbar.classList.add('sticky-top');
    }
  });

  }


  public getAllCommunes(): void {
    this.communeService.getAllCommune(this.page,this.size).subscribe((data:any) => {
      this.Communes = data['content'];
      this.total =new Array(data['totalPages']);
      this.updateDisplayedPages();
    },

    );
  }
  public deleteCommune(id:number):void{
    this.communeService.deleteCommune(id).subscribe((data:any)=>{
      this.getAllCommunes();
      this.openSnackBar('Vous avez supprimé la commune avec succès.', 'Fermer','error');
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
  this.getAllCommunes();
}

public nextPage(): void {
  if (this.page < this.total.length - 1) {
    this.page++;
    this.getAllCommunes();
   }
}

public previousPage(): void {
  if (this.page > 0) {
    this.page--;
    this.getAllCommunes();
  }
}

}
