import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Avis } from 'src/app/models/avis';
import { Picture } from 'src/app/models/mesImages';
import { SearchService } from '../search.service';
import { imageBase64 } from 'src/assets/imageEnBase64';

@Component({
  selector: 'app-search-avis',
  templateUrl: './search-avis.component.html',
  styleUrls: ['./search-avis.component.css']
})
export class SearchAvisComponent implements OnInit {
  public searchAvis:any;
  public results:Avis[]=[];
  public size=8;
  public page=0;
  public total: Array<number> | undefined;
public lenght:any;
  constructor(private sanitizer: DomSanitizer,private route: ActivatedRoute, private router: Router,private searchservice:SearchService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params['searchAvis'])
      this.searchAvis=params['searchAvis']
      this.searchservice.SearchAvis(this.page,this.size,this.searchAvis).subscribe((data:any)=> {
        this.results = data['content'];
        console.log('this.avis',data)
          this.lenght=  this.results.length;
        this.total = new Array(data['totalPages']);




    })
    })
  }
  convertBase64ToImage(images: Picture[]): any {

    let base64 = "data:image/png;base64, " + imageBase64;
        if (images.length > 0) {
      base64 = "data:image/png;base64, " + images[0].picbyte;
    }
    return this.sanitizer.bypassSecurityTrustUrl(base64);

  }
  setPage(i: number, event: any) {
    this.page = i;
    this.searchservice.SearchAvis(this.page,this.size, this.searchAvis).subscribe((data:any)=> {
      this.results = data['content'];


  })

}

}
