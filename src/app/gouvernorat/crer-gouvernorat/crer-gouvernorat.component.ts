import { Component, Inject } from '@angular/core';
import { GouvernoratService } from '../gouvernorat.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityService } from 'src/app/auth/services/security.service';
import { ResetAccountComponent } from 'src/app/auth/login/reset-account/reset-account.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crer-gouvernorat',
  templateUrl: './crer-gouvernorat.component.html',
  styleUrls: ['./crer-gouvernorat.component.scss']
})
export class CrerGouvernoratComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private security: SecurityService ,private gouvernoratService: GouvernoratService,private router:Router
  ,public dialogRef: MatDialogRef<ResetAccountComponent>) { }

nom:string="";
closeDialog(result: boolean): void {
  this.dialogRef.close(result);
}


  ajouterGouvernorat(f:any){
console.log('f '+f.value.nom)
  const data =f.value.nom;
    console.log('Nom:', data);
    this.gouvernoratService.addGouvernorat(data).subscribe((data: any) => {
      console.log('Response data:', data);
      this.closeDialog(true);
      this.nom=""
    });
  }



}
