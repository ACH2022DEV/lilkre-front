import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
//for social login
import { MicrosoftLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { SocialService } from '../social.service';
import { environment } from 'src/environments/environment';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ResetAccountComponent } from './reset-account/reset-account.component';
import { SecurityService } from '../services/security.service';

declare const google: any;
/* export const slideAnimation = trigger('slideAnimation', [
  transition(':enter', [
    // Style initial du div lorsqu'il entre
    style({ opacity: 0, transform: 'translateY(-40%)' }), // Opacité à 0 et translation vers le haut

    // Animation vers le style final
    animate('10s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
    // Opacité à 1 et retour à la position originale
  ])
]); */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],


 /*  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ left: '-100%', opacity: 5, transform: 'translateY(-100%)' }),
        animate('300ms ease-in-out', style({ opacity: 0, transform: 'translateY(100)' }))
      ])
    ])
  ] */
})

export class LoginComponent implements OnInit {

  GoogleLoginProvider = GoogleLoginProvider;
  user: SocialUser | any;
  isLogin: boolean | any; // false
  public a: any;
  public login: any = [];
  public loginError = false;
  offer: any[] = [];
  public idClient:any ;




  constructor(private devisService: DatabaseService,private security: SecurityService,
    private router: Router,private fb: FormBuilder,private http: HttpClient,private authService: SocialAuthService,
    private social: SocialService,public dialog: MatDialog
    ) {

     }
     password: string = '';
     showPassword: boolean = false;

     togglePassword() {
       this.showPassword = !this.showPassword;
     }

  ngOnInit(): void {

    //get Id Client google
    this.idClient=environment.googleLoginProvider;
    this.authService.authState.subscribe(
      data => {
        this.isLogin = (data != null);
      }
    );
    if (typeof google !== 'undefined' && google.accounts) {
    google.accounts.id.initialize({
      client_id:environment.googleLoginProvider,
      callback: (respo:any)=>{
      //  this.security.loginInWithGoogle();
        this.social.loginWithGoogle(respo.credential).subscribe(
          res => {
            console.log(res);
            //encoder cette data !!!!!!!!!!!!!!!!!!!!!!!!!!
            sessionStorage.setItem('session',JSON.stringify(res));
           this.router.navigate(['/home']).then(() => {
              window.location.reload();
          });
          }
        );
      }
    });

   // Générer le bouton de connexion Google
   google!.accounts.id.renderButton(
    document.getElementById('google-button'), // ID de l'élément où le bouton sera rendu
    {
      theme: 'filled_black', // Thème du bouton (par exemple : 'outline' ou 'filled')
      size: 'large'
      ,width:400,
      shape:'pill',//ou rectangular
      // Taille du bouton (par exemple : 'small', 'standard' ou 'large')
    }
  );

} else {
  // Si google n'est pas encore défini, attendre et réessayer
  setTimeout(() => {
      this.ngOnInit();
  }, 100);
}
  }


resetPassword(){
  const navbar = document.getElementById('navbar');
    console.log("navbar:", navbar);
    if (navbar) {
     // navbar.style.position = 'fixed';
      navbar.classList.remove('sticky-top');
    }
  const dialogRef = this.dialog.open(ResetAccountComponent, {
    data: { data:  "",
    border:0},
  });
  dialogRef.afterClosed().subscribe(() => {
    // Cette fonction sera appelée lorsque le modal sera fermé
    // Ajoutez la classe "sticky-top" à votre élément navbar ici
    if (navbar) {
      navbar.classList.add('sticky-top');
    }
  });
}


  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data=>{
console.log(data)
    })
  }

  signInWithMicrosoft(): void {

    this.authService.signIn(MicrosoftLoginProvider.PROVIDER_ID).then(
      data => {
        console.log(data);
        let userInfos :any={
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName
        };
        this.social.loginWithMicrosoft(userInfos).subscribe(
          res => {
            console.log(res);
            //encoder cette data !!!!!!!!!!!!!!!!!!!!!!!!!!
          sessionStorage.setItem('session',JSON.stringify(res));
           this.router.navigate(['/home']).then(() => {
              window.location.reload();
          });
          }
        );
      }
    );
  }
  signOut(): void {
    this.authService.signOut();
  }

  public entrerlogin(f: any) {
    this.loginError = false;
    let data = f.value;
    this.security.login(data).subscribe({
      next: (data) => {
        this.login = data;
        console.log(data);
        let accessToken=this.login["accessToken"];
        let IdUSER=this.login["id"];
        let roles=this.login["roles"];
        const sessionkey = 'session';
        const Roleskey = 'Roles';
        const IDkey = 'ID_USER';
        const AllData = 'AllData';
// Génération d'une clé de chiffrement aléatoire
       const key = "0n3v1ew";
        const rolesJson = JSON.stringify(roles);
        const encryptedRoles =CryptoJS.AES.encrypt(rolesJson, key.trim()).toString();
        //console.log(encryptedRoles);
        sessionStorage.setItem(Roleskey, encryptedRoles);
        const encryptedsession =CryptoJS.AES.encrypt(accessToken, key.trim()).toString();
        console.log("IdUSER"+IdUSER);
        const encryptedID = CryptoJS.AES.encrypt(IdUSER.toString(), key.trim()).toString();
        sessionStorage.setItem(IDkey, encryptedID);
        const ALLdATA = JSON.stringify(this.login);
        const encryptedData = CryptoJS.AES.encrypt(ALLdATA, key.trim()).toString();
        sessionStorage.setItem(AllData, encryptedData);
        sessionStorage.setItem(sessionkey, encryptedsession);
        //get data from session storage
         // Récupérer les données chiffrées depuis le session storage
         const encryptedRolesData = sessionStorage.getItem(Roleskey);
        console.log(encryptedRolesData);
        const encryptedSession = sessionStorage.getItem(sessionkey);
        // Déchiffrer les données sensibles

        if (encryptedRolesData) {

          const rolesData = CryptoJS.AES.decrypt(encryptedRolesData, key.trim());
          const decryptedData = rolesData.toString(CryptoJS.enc.Utf8);
          console.log('decryptedData :', decryptedData);
          try {
            let decryptedDatas = JSON.parse(decryptedData);
            console.log('Roles déchiffrés :', decryptedDatas);
        } catch (error) {
            console.error("Erreur lors de l'analyse JSON des données déchiffrées :", error);
        }
      } else {
          console.log("Aucune donnée chiffrée n'a été trouvée pour les rôles.");
      }

 if (encryptedSession) {
          const sessionData = CryptoJS.AES.decrypt(encryptedSession, key.trim()).toString(CryptoJS.enc.Utf8);
          console.log('decryptedData :', sessionData);

        } else {
          console.log("Aucune donnée chiffrée n'a été trouvée pour la session.");
        }
        if (encryptedID) {
          const IDData = CryptoJS.AES.decrypt(encryptedID, key.trim()).toString(CryptoJS.enc.Utf8);
          console.log('IDData :', IDData);

        } else {
          console.log("Aucune donnée chiffrée n'a été trouvée pour l'ID.");
        }
        if (encryptedData) {
          const ALLData = CryptoJS.AES.decrypt(encryptedData, key.trim()).toString(CryptoJS.enc.Utf8);
          console.log('ALLData :', ALLData);

        } else {
          console.log("Aucune donnée chiffrée n'a été trouvée pour all data.");
        }

        //end of getting data
        sessionStorage.setItem('session', JSON.stringify(data));
        this.router.navigate(['/list-personne']);
      },
      error: () => {
        this.loginError = true;
      }
    }
    )
  }

//for test





}


