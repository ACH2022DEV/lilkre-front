import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Picture } from 'src/app/models/mesImages';
import { Personne } from 'src/app/models/personne';
import { DatabaseService } from 'src/app/services/database.service';
import { imageBase64 } from 'src/assets/imageEnBase64';

@Component({
  selector: 'app-liste-personne',
  templateUrl: './liste-personne.component.html',
  styleUrls: ['./liste-personne.component.scss']
})
export class ListePersonneComponent implements OnInit {
  public personnes: Personne[] = [];
  //public personnes:any;
 //public pageNo:number=0;

 public total: Array<number> | undefined;
 public page:number=0;
 public size:number=8;

  public searchPersonne:string='';
public currentPage:any;
 //tooltip initialisation



 //

//public searchText2:any;

  constructor(private pesonneService: DatabaseService, private sanitizer: DomSanitizer) {


   }

  ngOnInit(): void {

    this.getAllPersonne();


  }



  public getAllPersonne(): void {
    this.pesonneService.getAllPersonne(this.page,this.size).subscribe((response:any) => {
      this.personnes =response['content'];
      console.log(response);
       this.total =new Array(response['totalPages']);//il faut utiliser le totalPages
      //  this.totalitems =new Array(response['totalElements']);

    },
      (error: HttpErrorResponse) => alert(error.message)
    );
  }
  setPage(i: number,event:any){
    this.page = i;
    //this.currentPage=i;


    this.getAllPersonne();
}

public Next(): void {
  }
    // some checks
public previous(): void {
  // some checks
   --this.page ;
}


convertBase64ToImage(images: Picture[]): any {

  let base64 = "data:image/png;base64, " + imageBase64;
    if (images.length > 0) {
    base64 = "data:image/png;base64, " + images[0].picbyte;
  }
  return this.sanitizer.bypassSecurityTrustUrl(base64);

}








}
