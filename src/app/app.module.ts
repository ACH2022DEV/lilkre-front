import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import {MatChipsModule} from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
//import { NgForm } from '@angular/forms';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { ShareModule } from 'ngx-sharebuttons';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
// pour l'etoile
import { ReactiveFormsModule } from '@angular/forms';
// search module
//import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { MatDialogModule } from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';

import { MatIconModule } from '@angular/material/icon';


import { AppRoutingModule } from './app-routing.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import {MatListModule} from '@angular/material/list';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import { HomeComponent } from './home/home.component';
//import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';


import { ContactComponent } from './contact/contact.component';

import { ListeProduitsComponent } from './produits/liste-produits/liste-produits.component';
import { EditerProduitsComponent } from './produits/editer-produits/editer-produits.component';
import { CrerProduitsComponent } from './produits/crer-produits/crer-produits.component';
import { VisualiserProduitsComponent } from './produits/visualiser-produits/visualiser-produits.component';

import { PageAdminComponent } from './page-admin/page-admin.component';

import { ListeproduitComponent } from './listeproduit/listeproduit.component';
import { ProduitsDetailsComponent } from './produits/produits-details/produits-details.component';

import { SearchResultsComponent } from './produits/search-results/search-results.component';
import { SearchAvisComponent } from './produits/search-avis/search-avis.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { NotificationsComponent } from './notifications/notifications.component';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//for social login
import { SocialLoginModule, SocialAuthServiceConfig, MicrosoftLoginProvider } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { ImageModalComponent } from './produits/liste-produits/image-modal/image-modal.component';
import { ListeEnviesComponent } from './liste-envies/liste-envies.component';
import { ParametresCompteComponent } from './parametres-compte/parametres-compte.component';
import { VotreCompteComponent } from './votre-compte/votre-compte.component';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecurityInterceptorService } from './auth/services/security-interceptor.service';
import { ResetAccountComponent } from './auth/login/reset-account/reset-account.component';
import { EmailValidatorComponent } from './auth/register/email-validator/email-validator.component';
import { FailedPaymentComponent } from './payment/failed-payment/failed-payment.component';
import { SuccessPaymentComponent } from './payment/success-payment/success-payment.component';
import { PaymentComponent } from './payment/payment.component';
import { SearchAdminArtComponent } from './search-admin-art/search-admin-art.component';
import { SearchPersonneComponent } from './personne/search-personne/search-personne.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { callbackPageComponent } from './article/Callback-page/callback-page.component';
import { VisualiserArticleComponent } from './article/visualiser-article/visualiser-article.component';
import { VisualiserPersonneComponent } from './personne/visualiser-personne/visualiser-personne.component';
import { ListePersonneComponent } from './personne/liste-personne/liste-personne.component';
import { EditerPersonneComponent } from './personne/editer-personne/editer-personne.component';
import { CrerPersonneComponent } from './personne/crer-personne/crer-personne.component';
import { CrerCategorieComponent } from './categorie/crer-categorie/crer-categorie.component';
import { EditCategorieComponent } from './categorie/edit-categorie/edit-categorie.component';
import { ListeCategorieComponent } from './categorie/liste-categorie/liste-categorie.component';
import { EditGouvernoratComponent } from './gouvernorat/edit-gouvernorat/edit-gouvernorat.component';
import { ListGouvernoratComponent } from './gouvernorat/list-gouvernorat/list-gouvernorat.component';
import { ListCommuneComponent } from './commune/list-commune/list-commune.component';
import { CrerCommuneComponent } from './commune/crer-commune/crer-commune.component';
import { EditCommuneComponent } from './commune/edit-commune/edit-commune.component';
import { CrerGouvernoratComponent } from './gouvernorat/crer-gouvernorat/crer-gouvernorat.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    CrerPersonneComponent,
    EditerPersonneComponent,
    ListePersonneComponent,
    VisualiserPersonneComponent,
    VisualiserArticleComponent,
    callbackPageComponent,
    HeaderComponent,
    NavbarComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ListeProduitsComponent,
    EditerProduitsComponent,
    CrerProduitsComponent,
    VisualiserProduitsComponent,
    PageAdminComponent,
    ListeproduitComponent,
    ProduitsDetailsComponent,
    SearchResultsComponent,
    SearchPersonneComponent,
    SearchAdminArtComponent,
    SearchAvisComponent,
    EntrepriseComponent,
    NotificationsComponent,
    ImageModalComponent,
    PaymentComponent,
    SuccessPaymentComponent,
    FailedPaymentComponent,
    EmailValidatorComponent,
    ResetAccountComponent,
    ListeEnviesComponent,
    ParametresCompteComponent,
    VotreCompteComponent,
    CrerCategorieComponent,
    EditCategorieComponent,
    ListeCategorieComponent,
    EditGouvernoratComponent,
    ListGouvernoratComponent,
    ListCommuneComponent,
    CrerCommuneComponent,
    EditCommuneComponent,
    CrerGouvernoratComponent,
    SidebarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatCheckboxModule,
    MatGridListModule,
    MatTableModule,
    MatSliderModule,
    MatChipsModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxStarRatingModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule,
    TooltipModule,
    MatSelectModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    SocialLoginModule,
    ShareModule,
   ShareButtonModule,
   MatListModule,
   MatSnackBarModule,
   MatSidenavModule,
    ShareButtonsModule.withConfig({
      debug: true,
    }),
    ShareIconsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
    /* TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }), */
    FontAwesomeModule



   /* RouterModule.forRoot([
      {path:'',component:''}])*/

  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: SecurityInterceptorService, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
           {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleLoginProvider
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebookLoginProvider)
          }, {
            id: MicrosoftLoginProvider.PROVIDER_ID,
            provider: new MicrosoftLoginProvider(
              environment.microsoftLoginProvider
            ),
          },

        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
