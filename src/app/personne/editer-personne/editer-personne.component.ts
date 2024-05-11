import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FileHandle } from 'src/app/models/file';
import { Personne } from 'src/app/models/personne';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-editer-personne',
  templateUrl: './editer-personne.component.html',
  styleUrls: ['./editer-personne.component.scss']
})
export class EditerPersonneComponent implements OnInit {

  public personne: Personne = { id:0,nom:'',prenom:'',
  adress:'',tel:'',username:'',email:'',password:'',avis:{}as any,paniers:{}as any, images:{}as any, cammandes:{}as any};
     
    
  //nouveau Modification pour l'image de personne
  userfile: any;
  imagePath: any;
  imgURL: any;
  sanitiser: any; 
  public personne2:FormData | undefined;

  constructor(private pesonneService: DatabaseService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    // récupérer la personne avec l'id à partir de la base de données 
    // get by id 
    this.pesonneService.getPersonne(this.route.snapshot.params['id']).subscribe(data => {
      this.personne = data;
    })
  }

  public UpdatePersonne(f: any) {
    const personneFormdata=this.prepareFormdata(this.personne);
    this.pesonneService.UpdatePersonne(personneFormdata).subscribe(
      data => {
        this.personne2=data;
        this.router.navigate(['/list-personne']);
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


      
      
      const  fileHan:FileHandle={
        file:file,
        url:this.sanitiser.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)),

        
      }
    //  this.personne.imagepersonne=fileHan;
     
     
    }
  }

 



}
