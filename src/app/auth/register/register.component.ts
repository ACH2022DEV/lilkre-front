import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/models/register';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { EmailValidatorComponent } from './email-validator/email-validator.component';
import { SecurityService } from '../services/security.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  offerForm: FormGroup;
//TEST FOR NUMBER
  valeurNumerique!: number;
  date: any;
  errorUsename:string="";
  errorEmail:string="";
  validerSaisie(event: any) {
    // Empêcher la saisie de caractères autres que les chiffres
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // Caractère non autorisé, empêcher l'événement
      event.preventDefault();
    }


  }
  limiterLongueur() {
    if (this.valeurNumerique && this.valeurNumerique.toString().length > 4) {
      this.valeurNumerique = parseInt(this.valeurNumerique.toString().substring(0, 4), 10);
    }
  }

//END OF TEST





  powers = [
    {value:'ROLE_USER'},
    {value:'ROLE_ADMIN'},
  {value:'ROLE_EMPLOYE'}
];
  register: any = [];
  constructor(private fb: FormBuilder,private security: SecurityService ,private router:Router,public dialog: MatDialog) {
    this.offerForm = this.fb.group({
      datedebut: ['', Validators.required],
      datefin: ['', Validators.required]
    });

  }

  relation:any={
    datedebut:'',
    datefin:''
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  password: string = '';
  showPassword: boolean = false;
   code:number=0;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
  }
//email:string="";
  openImageModal(data: any) {
    const navbar = document.getElementById('navbar');
    console.log("navbar:", navbar);
    if (navbar) {
     // navbar.style.position = 'fixed';
      navbar.classList.remove('sticky-top');
    }
    const dialogRef = this.dialog.open(EmailValidatorComponent, {
      data: { data:  data}
    });
    dialogRef.afterClosed().subscribe(() => {
      // Cette fonction sera appelée lorsque le modal sera fermé
      // Ajoutez la classe "sticky-top" à votre élément navbar ici
      if (navbar) {
        navbar.classList.add('sticky-top');
      }
    });
  }

  public onRegistre(f: any) {
    console.log('registre', f.value)
    let data = f.value;

    this.security.sendCodeConfirmation(data).subscribe(
      (responce) => {
        this.errorUsename="";
        this.errorEmail=""
        this.openImageModal(data);
        this.register = new Array<Register>();
        this.register = data;
       // this.router.navigate(['/login']);

      },(error) => {
        if (error.error && error.error.message) {
          console.log(error.error.message);
          if(error.error.message==="Error: Username is already taken!"){
            this.errorUsename="Username is already taken!";
            this.errorEmail="";
          }else if(error.error.message==="Error: Email is already in use!"){
            this.errorEmail="Email is already in use!";
            this.errorUsename=""
          }


        } else {
          console.log("User registered successfully!");
        }
      }
    )
  }


}
