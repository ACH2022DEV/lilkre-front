import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ParametresCompteComponent } from './parametres-compte/parametres-compte.component';
import { callbackPageComponent } from './article/Callback-page/callback-page.component';
import { SuccessPaymentComponent } from './payment/success-payment/success-payment.component';
import { FailedPaymentComponent } from './payment/failed-payment/failed-payment.component';
import { SearchResultsComponent } from './produits/search-results/search-results.component';
import { SearchAvisComponent } from './produits/search-avis/search-avis.component';
import { ProduitsDetailsComponent } from './produits/produits-details/produits-details.component';
import { GuardService } from './auth/services/guard.service';
import { SearchAdminArtComponent } from './search-admin-art/search-admin-art.component';
import { ListeproduitComponent } from './listeproduit/listeproduit.component';
import { PageAdminComponent } from './page-admin/page-admin.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { EditerProduitsComponent } from './produits/editer-produits/editer-produits.component';
import { CrerProduitsComponent } from './produits/crer-produits/crer-produits.component';
import { VisualiserProduitsComponent } from './produits/visualiser-produits/visualiser-produits.component';
import { ListeProduitsComponent } from './produits/liste-produits/liste-produits.component';
import { ContactComponent } from './contact/contact.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { CrerPersonneComponent } from './personne/crer-personne/crer-personne.component';
import { EditerPersonneComponent } from './personne/editer-personne/editer-personne.component';
import { VisualiserPersonneComponent } from './personne/visualiser-personne/visualiser-personne.component';
import { SearchPersonneComponent } from './personne/search-personne/search-personne.component';
import { ListePersonneComponent } from './personne/liste-personne/liste-personne.component';

const routes: Routes = [{ path: 'list-personne', component: ListePersonneComponent, canActivate: [GuardService] },
{ path: 'searchPersonne/:searchPersonne', component: SearchPersonneComponent, canActivate: [GuardService] },
{ path: 'visualiser-personne/:id', component: VisualiserPersonneComponent, canActivate: [GuardService] },
{ path: 'edite-personne/:id', component: EditerPersonneComponent, canActivate: [GuardService] },
{ path: 'creer-personne', component: CrerPersonneComponent, canActivate: [GuardService] },
{ path: 'home', component: HomeComponent },
{ path: 'entreprise', component: EntrepriseComponent },
{ path: 'contact', component: ContactComponent, canActivate: [GuardService] },
{ path: 'liste-produits', component: ListeProduitsComponent },
// { path: 'search/:searchText', component: ListeProduitsComponent },
{ path: 'visualiser-produits/:codeArticle', component: VisualiserProduitsComponent, canActivate: [GuardService] },
{ path: 'crer-produits', component:  CrerProduitsComponent, canActivate: [GuardService] },
{ path: 'editer-produits/:codeArticle', component:  EditerProduitsComponent, canActivate: [GuardService] },
{ path: 'notifications', component: NotificationsComponent, canActivate: [GuardService] },
{ path: 'admin', component: PageAdminComponent, canActivate: [GuardService] },
// { path: 'ListedesCommandes/:id', component: ListeCommandesComponent, canActivate: [GuardService] },
{ path: 'adminliste-produit', component: ListeproduitComponent, canActivate: [GuardService] },
{ path: 'searchAdminPro/:searchText', component: SearchAdminArtComponent, canActivate: [GuardService] },
{ path: 'details/:codeArticle', component: ProduitsDetailsComponent },
{ path: 'avisSearch/:searchAvis', component: SearchAvisComponent },
{ path: 'searchProduct/:searchText', component: SearchResultsComponent },
{ path: 'failed', component: FailedPaymentComponent },
{ path: 'success', component: SuccessPaymentComponent },
//just pour le test
{ path: 'callback', component: callbackPageComponent},
 { path: 'CustomerAccount', component: ParametresCompteComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: '**', component: HomeComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
