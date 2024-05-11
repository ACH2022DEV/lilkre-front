import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileHandle } from 'src/app/models/file';
import { Personne } from 'src/app/models/personne';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-crer-personne',
  templateUrl: './crer-personne.component.html',
  styleUrls: ['./crer-personne.component.scss']
})
export class CrerPersonneComponent implements OnInit {

  personne: any = [];
  //les modifications des images pour l'utilisateur
  userfile:any;
  public imagePath:any;
  imgURL:any;


  //

  constructor(private pesonneService: DatabaseService, private router: Router,private sanitiser:DomSanitizer) { }

  ngOnInit(): void {
  }

  public addPersonne(f: any) {
    console.log('creer personne', f.value)
    let data =f.value;
    const personneFormdata=this.prepareFormdata(data);
    this.pesonneService.addPersonne(personneFormdata).subscribe(
      data => {
        this.personne = new Array<Personne>();
        this.personne = data;
        this.router.navigate(['/list-personne']);
        // redirection 
      }
    )
  }
  prepareFormdata(personne:Personne):FormData{
    const formData=new FormData();
    formData.append('personne',new Blob([JSON.stringify(personne)],{type:'application/json'}));
   
      formData.append('files',this.userfile );
      
    return formData;
  }
  public onSelectedFile(event:any){
    if(event.target.files){
       const file=event.target.files[0];
       this.userfile=file;
        //la nouvelle ligne:
      var reader=new FileReader();
      this.imagePath=file;
      reader.readAsDataURL(file);
      reader.onload=(event)=>{
        this.imgURL=reader.result;
      }
       const fileHan:FileHandle={
        file:file,
        url:this.sanitiser.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)),

        
      }
      this.personne.imagePersonne=fileHan;
     
     
    }
  }


}
