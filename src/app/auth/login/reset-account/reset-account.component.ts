import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SecurityService } from '../../services/security.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-account',
  templateUrl: './reset-account.component.html',
  styleUrls: ['./reset-account.component.css']
})
export class ResetAccountComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private security: SecurityService ,private router:Router
  ,public dialogRef: MatDialogRef<ResetAccountComponent>) { }



  @ViewChild('imageModal') imageModal: ElementRef | any;
  errorOccurred: boolean = false;
  errorCode:string="";
  codeEnvoyer: boolean = false;
  codeVerifier: boolean = false;
   key:String = "0n3v1ew";
  password: string = '';
  showPassword: boolean = false;
  showSecondPassword: boolean = false;
  identifiant:any;

  ngOnInit(): void {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  toggleSecondPassword(){
    this.showSecondPassword = !this.showSecondPassword;
  }
  fermerDialog(){
    this.dialogRef.close();
  }
  envoyerCode(){
    const Data_identifiant = localStorage.getItem("identifiant");
    console.log('Data_identifiant  ',  Data_identifiant)
    if(Data_identifiant){
       this.identifiant = CryptoJS.AES.decrypt(Data_identifiant, this.key.trim()).toString(CryptoJS.enc.Utf8);
    }
    console.log('data  ',  this.identifiant)
this.security.sendCodeForReciveCompte(this.identifiant).subscribe(
  (response:any)=>{
    if(response.message==="Email envoyé avec succès!"){
      this.codeEnvoyer=true;
      console.log(response.message);
    }else{
      console.log(response.message);
    }
})
  }

errorCodeConfirmation_Password:boolean=false;
  verifierCode(verifierCode:any){
    const Data_identifiant = localStorage.getItem("identifiant");
    console.log('Data_identifiant  ',  Data_identifiant)
    if(Data_identifiant){
       this.identifiant = CryptoJS.AES.decrypt(Data_identifiant, this.key.trim()).toString(CryptoJS.enc.Utf8);
    }
    console.log('data  ',  this.identifiant)
    let data=verifierCode.value;
    console.log('code'+data.code);
     let code:string=data.code;
    this.security.VerifierCodeConfirmationOfPassword(this.identifiant,code).subscribe(
      (response:any)=>{
        if(response.message==="Le code est correct"){
          console.log(response.message);
          this.codeVerifier=true;
          const encryptedData = CryptoJS.AES.encrypt(code, this.key.trim()).toString();
        localStorage.setItem('code', encryptedData);
        }else{
          console.log(response.message);
          this.errorCodeConfirmation_Password=true;
        }
    })

      }

  valid: boolean = true;
  resetpage: boolean = false;
  compteExiste: boolean = true;
  VerifierCompte(verifierCompte:any){
    let identifiant =verifierCompte.value;
    console.log('data'+identifiant.identifiant);
    this.security.verifierCompte(identifiant.identifiant).subscribe(
     (response :any)=> {
        console.log(response.message);
      if(response.message==="Le compte existe"){
        this.resetpage=true;
        const encryptedData = CryptoJS.AES.encrypt(identifiant.identifiant, this.key.trim()).toString();
        localStorage.setItem('identifiant', encryptedData);
      }else{
        console.log(response.message);
        this.compteExiste=false;
      }
      },

    );
  }
NoCorrespondance:boolean=false;
codeVerification:string="";
  modifierMotDePasse(modifierMotDePasse:any){
let data=modifierMotDePasse.value
   let firstPassword:string=data.password;
   let SecondPassword:string=data.SecondPassword;
  // console.log('firstPassword  ',  firstPassword)
  // console.log('SecondPassword  ',  SecondPassword)
   if(firstPassword==SecondPassword){
    const Data_identifiant = localStorage.getItem("identifiant");
    //console.log('Data_identifiant  ',  Data_identifiant)
    if(Data_identifiant){
       this.identifiant = CryptoJS.AES.decrypt(Data_identifiant, this.key.trim()).toString(CryptoJS.enc.Utf8);
    }
    //console.log('data  ',  this.identifiant)
    const Data_Code = localStorage.getItem("code");
   // console.log('Data_Code  ',  Data_Code)
    if(Data_Code){
       this.codeVerification = CryptoJS.AES.decrypt(Data_Code, this.key.trim()).toString(CryptoJS.enc.Utf8);
    }
   // console.log('data  ',  this.codeVerification)
//console.log("correspondant")
this.security.ModifierPassword(this.identifiant,this.codeVerification,firstPassword).subscribe(
  (response:any)=>{
  //  console.log(response.message)
    if(response.message==="mot de passe modifiée"){
      this.dialogRef.close();
      localStorage.clear();
    }else{
     // console.log(response.message)
    }
})
   }else{
    this.NoCorrespondance=true;
   // console.log("ne correspond pas")

   }

  }
}
