import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/auth/services/security.service';
import { CommuneService } from '../commune.service';
import { GouvernoratService } from 'src/app/gouvernorat/gouvernorat.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crer-commune',
  templateUrl: './crer-commune.component.html',
  styleUrls: ['./crer-commune.component.scss']
})
export class CrerCommuneComponent {
  constructor(private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any,private security: SecurityService ,
  private communeService:CommuneService, private gouvernoratService:GouvernoratService,private router:Router
  ,public dialogRef: MatDialogRef<CrerCommuneComponent>) { }


  public gouvernorats:any[]= [];
  public total!: Array<number> | [];
  public page:number=0;
  public size:number=24;
nom:string="";
gouvernoratId:any;
ngOnInit(): void {
  this.getAllGouvernorat();
}
closeDialog(result: boolean): void {
  this.dialogRef.close(result);
}
  ajouterCommune(f:any){
console.log('f '+f.value.nom)
  const data =f.value.nom;
  console.log('gouvernoratId:', this.gouvernoratId);
  this.gouvernoratService.getGouvernorat(this.gouvernoratId).subscribe((data:any)=>{
this.gouvernoratId=data;
console.log('gouvernoratId:', this.gouvernoratId);
  })
    console.log('Nom:', data);
    this.communeService.addCommune(data,this.gouvernoratId).subscribe((data: any) => {
      console.log('Response data:', data);
      this.closeDialog(true);
      this.nom=""
    });
  }

  public getAllGouvernorat(): void {
    this.gouvernoratService.getAllGouvernorat(this.page,this.size).subscribe((data:any) => {
      this.gouvernorats = data['content'];
      this.total =new Array(data['totalPages']);
    },

    );
  }
}
