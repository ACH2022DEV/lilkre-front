import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { Picture } from 'src/app/models/mesImages';
import { DatabaseService } from 'src/app/services/database.service';
import { imageBase64 } from 'src/assets/imageEnBase64';

@Component({
  selector: 'app-visualiser-produits',
  templateUrl: './visualiser-produits.component.html',
  styleUrls: ['./visualiser-produits.component.scss']
})
export class VisualiserProduitsComponent implements OnInit {
  public produit: any = { codeArticle: '' };
  //


  //
  constructor(private produitService: DatabaseService, private route: ActivatedRoute, private sanitizer: DomSanitizer,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['codeArticle']);

    this.produitService.getarticle(this.route.snapshot.params['codeArticle']).subscribe(data => {
      this.produit = data;
  })
}
convertBase64ToImage(images: Picture[]): any {

  let base64 = "data:image/png;base64, " + imageBase64;
    if(images.length > 0){
    base64 =  "data:image/png;base64, "+ images[0].picbyte;
  }
  return this.sanitizer.bypassSecurityTrustUrl(base64);

}


}
