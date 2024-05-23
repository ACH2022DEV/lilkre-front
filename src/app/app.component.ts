import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DatabaseService } from './services/database.service';
import { Router } from '@angular/router';
import {  NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ProduitService } from './produits/produit.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('sidebarToggle', [
      state('closed', style({ left: '-250px' })),
      state('open', style({ left: '0' })),
      transition('closed => open', [animate('0.3s ease')]),
      transition('open => closed', [animate('0.3s ease')])
    ])
  ]
})
export class AppComponent {
  //showFiller = false;
  title = 'lilkre';
  public produit: any = { codeArticle: '' };
  constructor( private titleService: Title,private produitService: ProduitService,
    private metaService: Meta,
    private router: Router) {
    //translate.setDefaultLang('fr');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
  //  translate.use('fr');
    //code pour les titres de page et les description (SEO)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setPageTitleAndMeta();
    });
  }
  isRegisterPage(): boolean {
    return this.router.url === '/register';
  }
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
  setPageTitleAndMeta() {

    //console.log('produit --',this.produit.description);
    let pageTitle = this.getTitleForCurrentRoute(); // Fonction pour obtenir le titre de la page actuelle
    const metaDescription = this.getMetaDescriptionForCurrentRoute(); // Fonction pour obtenir la description meta de la page actuelle

    this.titleService.setTitle(pageTitle);
    this.metaService.updateTag({ name: 'description', content: metaDescription });
    // Vous pouvez également mettre à jour d'autres balises meta selon vos besoins
  }
    getTitleForCurrentRoute():string {
    let title = 'Maison Modern | Achat en ligne ,Outillage ,Sanitaire,Matérielles de Plomberie';
    // Récupérer l'URL courante
    const currentUrl = this.router.url;
    // Logique pour déterminer le titre en fonction de l'URL courante
    if (currentUrl === '/entreprise') {
        title = 'About Us';
    }  else if (currentUrl === '/contact') {
        title = 'Contact Us';
    } else if (currentUrl === '/Panier') {
      title = 'Panier';
  }else if (currentUrl === '/notifications') {
    title = 'Notifications';
}else if (currentUrl.includes("details")) {
  //console.log('details', title)
  const match = currentUrl.match(/^\/details\/([^\/]+)$/);
  if (match && match[1]) {
 //   console.log(match[1]);
 const productId: number = parseInt(match[1]);
 this.produitService.getarticle(productId).subscribe(data => {
  this.produit = data;
  title = this.produit.description;
  this.titleService.setTitle(title);
 // console.log('title', title)
})

}

}

    return title;
}




getMetaDescriptionForCurrentRoute(): string {
    let description = 'Explorez une vaste sélection de produits de qualité sur notre boutique en ligne. Découvrez les dernières tendances de la mode, des produits électroniques innovants, des articles pour la maison et bien plus encore. Trouvez tout ce dont vous avez besoin pour améliorer votre vie quotidienne et faire des achats en toute confiance. Livraison rapide et service clientèle exceptionnel.'; // Description par défaut

    // Récupérer l'URL courante
    const currentUrl = this.router.url;
    // Logique pour déterminer la description en fonction de l'URL courante
    if (currentUrl === '/home') {
        description = 'Welcome to our home page';
    } else if (currentUrl === '/about') {
        description = 'Learn more about our company';
    } else if (currentUrl === '/contact') {
        description = 'Get in touch with us';
    }

    return description;
}
//ajouter la méthode de sidebar
 isSidebarOpen = false;
 handleSidebarToggle(event: boolean) {
  this.isSidebarOpen = event;
}
}
