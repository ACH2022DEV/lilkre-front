import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Picture } from 'src/app/models/mesImages';
import { Personne } from 'src/app/models/personne';
import { SearchService } from 'src/app/produits/search.service';
import { imageBase64 } from 'src/assets/imageEnBase64';

@Component({
  selector: 'app-search-personne',
  templateUrl: './search-personne.component.html',
  styleUrls: ['./search-personne.component.css']
})
export class SearchPersonneComponent implements OnInit {
  public searchPersonne:string='';
  public  results: Personne[] = [];
  public size=8;
  public page=0;
  public total: Array<number> | undefined;

  constructor(private route: ActivatedRoute,private router: Router,private searchservice:SearchService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params['searchPersonne'])
      this.searchPersonne=params['searchPersonne']
      this.searchservice.SearchPersonne(this.page,this.size,this.searchPersonne).subscribe((data:any)=> {
        this.results = data['content'];
        console.log('this.personne',data)
       this.total = new Array(data['totalPages']);




    })
    })
  }
  setPage(i: number, event: any) {
    this.page = i;
    this.searchservice.SearchPersonne(this.page,this.size,this.searchPersonne).subscribe((data:any)=> {
      this.results = data['content'];


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
