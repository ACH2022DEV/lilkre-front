import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { Picture } from 'src/app/models/mesImages';
import { SearchService } from 'src/app/produits/search.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ProduitService } from '../produits/produit.service';

@Component({
  selector: 'app-search-admin-art',
  templateUrl: './search-admin-art.component.html',
  styleUrls: ['./search-admin-art.component.css']
})
export class SearchAdminArtComponent implements OnInit {
  public searchText:any='';
  public results:Article[]=[];
  public size=8;
  public page=0;
  public total: Array<number> | undefined;
   //pop up
 public popoverTitle :string= 'Confirmation';
 public popoverMessage :string= 'Are you sure?';
 confirmClicked = false;
 cancelClicked = false;
 //

  constructor(private route: ActivatedRoute, private router: Router,
    private sanitizer: DomSanitizer,private searchservice:SearchService,private produitService: ProduitService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params['searchText'])
      this.searchText=params['searchText']
      this.searchservice.Search(this.page,this.size, this.searchText).subscribe((data:any)=> {
        this.results = data['content'];
        console.log('this.results',data)
        this.total = new Array(data['totalPages']);
  })
})

    }
    public deletePRODUIT(id:number):void{
      this.produitService.deletearticle(id).subscribe((data:any)=>{
        this.searchservice.Search(this.page,this.size, this.searchText).subscribe((data:any)=> {
          this.results = data['content'];

      }) })

    }
    convertBase64ToImage(images: Picture[]): any {

      let base64 = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
      if (images.length > 0) {
        base64 = "data:image/png;base64, " + images[0].picbyte;
      }
      return this.sanitizer.bypassSecurityTrustUrl(base64);

    }

    setPage(i: number,event:any){
      this.page = i;
      this.searchservice.Search(this.page,this.size, this.searchText).subscribe((data:any)=> {
        this.results = data['content'];

  })
  }}
