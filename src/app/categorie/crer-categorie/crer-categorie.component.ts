import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SecurityService } from 'src/app/auth/services/security.service';
import { CategorieService } from '../categorie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crer-categorie',
  templateUrl: './crer-categorie.component.html',
  styleUrls: ['./crer-categorie.component.scss']
})
export class CrerCategorieComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private security: SecurityService ,
  private categorieService: CategorieService,private router:Router
  ,public dialogRef: MatDialogRef<CrerCategorieComponent>) { }

nom:string="";
closeDialog(result: boolean): void {
  this.dialogRef.close(result);
}


  ajouterCategorie(f:any){
console.log('f '+f.value.nom)
  const data =f.value.nom;
    console.log('Nom:', data);
    this.categorieService.addCategorie(data).subscribe((data: any) => {
      console.log('Response data:', data);
      this.closeDialog(true);
      this.nom=""
    });
  }

}
