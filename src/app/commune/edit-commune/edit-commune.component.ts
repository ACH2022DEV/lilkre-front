import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/auth/services/security.service';
import { GouvernoratService } from 'src/app/gouvernorat/gouvernorat.service';
import { CommuneService } from '../commune.service';

@Component({
  selector: 'app-edit-commune',
  templateUrl: './edit-commune.component.html',
  styleUrls: ['./edit-commune.component.scss']
})
export class EditCommuneComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private security: SecurityService ,
  private communeService:CommuneService, private gouvernoratService:GouvernoratService,private router:Router
  ,public dialogRef: MatDialogRef<EditCommuneComponent>) { }
  public gouvernorats:any[]= [];
  public total!: Array<number> | [];
  public page:number=0;
  public size:number=24;
nom:string="";
gouvernoratId:any;
commune:any={
  communeId:0,
  communeNom:"",
  gouvernoratId:0,
  gouvernoratNom:""
}
gouvernorat:any={
  id:0,
  nom:""
}
ngOnInit(): void {
  this.getAllGouvernorat();
  this.getCommune();
   //console.log('id '+this.data.data)
}
closeDialog(result: boolean): void {
  this.dialogRef.close(result);
}

  modifierCommune(f:any){
 //console.log('f '+f.value.nom)
  const data =f.value.nom;
   console.log('commune.gouvernoratId:', this.commune.gouvernoratId);
  /* this.gouvernoratService.getGouvernorat(this.commune.gouvernoratId).subscribe((data:any)=>{
  }) */
   //  console.log('this.gouvernorat:', this.gouvernorat);
    this.communeService.UpdateCommune(this.commune.communeId,data,this.commune.gouvernoratId).subscribe((data: any) => {
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
  getCommune(){
    this.communeService.getCommune(this.data.data).subscribe((data:any)=>{
      this.commune=data;
      console.log('commune:', this.commune);
        })
  }
}
