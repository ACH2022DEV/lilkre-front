import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SecurityService } from '../../services/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-validator',
  templateUrl: './email-validator.component.html',
  styleUrls: ['./email-validator.component.css']
})
export class EmailValidatorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private security: SecurityService ,private router:Router
  ,public dialogRef: MatDialogRef<EmailValidatorComponent>) { }
  email:string="";
  errorUsename:string="";
  ngOnInit(): void {
    console.log('data',this.data)
    console.log('email',this.data.data.email)
    this.email=this.data.data.email;
  }
  errorOccurred: boolean = false;
errorCode:string="";
  submitConfirmation(f:any){
console.log('code',f.value.code)
let code:String=f.value.code;
console.log('data envoyer',this.data)
this.security.register(this.data.data,code.toString()).subscribe(
  (responce) => {
    this.errorCode=""
    this.errorOccurred=false;
    this.dialogRef.close();
    this.router.navigate(['/login']);
  },(error) => {
    if (error.error && error.error.message) {
      this.errorOccurred=true;
     this.errorCode="Le code est incorrect !"
      console.log(error.error.message);
    } else {
      console.log("User registered successfully!");
    }
  }
)
  }

}
