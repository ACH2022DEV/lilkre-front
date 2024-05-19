import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SecurityService } from 'src/app/auth/services/security.service';
import { CategorieService } from '../categorie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.scss']
})
export class EditCategorieComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private security: SecurityService ,
  private categorieService: CategorieService,private router:Router
  ,public dialogRef: MatDialogRef<EditCategorieComponent>) { }

nom:any;
  ngOnInit(): void {
   console.log("data" + JSON.stringify(this.data) )
this.getCategorie(this.data.data);

  }

  getCategorie(codeCategorie:any){
    console.log('codeCategorie:', codeCategorie);
    this.categorieService.getCategorie(codeCategorie).subscribe((data: any) => {
      console.log('Response Gouvernorat_data:', data);
      this.nom=data.nom;
    });
  }
  closeDialog(result: boolean): void {
    this.dialogRef.close(result);
  }

  ModifierCategorie(f:any){
    console.log('f '+f.value.nom)
    const data =f.value.nom;
    console.log('Nom:', data);
    this.categorieService.UpdateCategorie(data,this.data.data).subscribe((data: any) => {
      console.log('Response data:', data);
      this.nom=""
      this.closeDialog(true);
    });
  }

}
