import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Picture } from 'src/app/models/mesImages';
import { Personne } from 'src/app/models/personne';
import { DatabaseService } from 'src/app/services/database.service';
import { imageBase64 } from 'src/assets/imageEnBase64';

@Component({
  selector: 'app-visualiser-personne',
  templateUrl: './visualiser-personne.component.html',
  styleUrls: ['./visualiser-personne.component.scss']
})
export class VisualiserPersonneComponent implements OnInit {

  public personne: any = { id: '' };
 avislenght:any;
  constructor(private pesonneService: DatabaseService, private route: ActivatedRoute,
    private router: Router, private sanitizer: DomSanitizer) {

    }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    // récupérer la personne avec l'id à partir de la base de données
    // get by id
    this.pesonneService.getPersonne(this.route.snapshot.params['id']).subscribe(data => {
      this.personne = data;
      this.avislenght=this.personne.avis.length;
      console.log(' this.avilenght',this.avislenght)
  })
}
convertBase64ToImage(images: Picture[]): any {

  let base64 = "data:image/png;base64, " + imageBase64;
    if (images.length > 0) {
    base64 = "data:image/png;base64, " + images[0].picbyte;
  }
  return this.sanitizer.bypassSecurityTrustUrl(base64);

}




}
