import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResetAccountComponent } from 'src/app/auth/login/reset-account/reset-account.component';
import { SecurityService } from 'src/app/auth/services/security.service';
import { GouvernoratService } from '../gouvernorat.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-gouvernorat',
  templateUrl: './edit-gouvernorat.component.html',
  styleUrls: ['./edit-gouvernorat.component.scss']
})
export class EditGouvernoratComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private security: SecurityService ,private gouvernoratService: GouvernoratService,private router:Router
  ,public dialogRef: MatDialogRef<ResetAccountComponent>) { }

nom:any;
  ngOnInit(): void {
   console.log("data" + JSON.stringify(this.data) )
this.getGouvernorat(this.data.data);

  }

  getGouvernorat(codeGouvernorat:any){
    console.log('codeGouvernorat:', codeGouvernorat);
    this.gouvernoratService.getGouvernorat(codeGouvernorat).subscribe((data: any) => {
      console.log('Response Gouvernorat_data:', data);
      this.nom=data.nom;
    });
  }
  closeDialog(result: boolean): void {
    this.dialogRef.close(result);
  }
  
  ModifierGouvernorat(f:any){
    console.log('f '+f.value.nom)
    const data =f.value.nom;
    console.log('Nom:', data);
    this.gouvernoratService.UpdateGouvernorat(data,this.data.data).subscribe((data: any) => {
      console.log('Response data:', data);
      this.nom=""
      this.closeDialog(true);
    });
  }

}
