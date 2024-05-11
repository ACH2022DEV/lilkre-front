import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '../../auth/services/security.service';

@Component({
  selector: 'app-liste-article',
  templateUrl: './callback-page.component.html',
  styleUrls: ['./callback-page.component.scss']
})
export class callbackPageComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private securityService: SecurityService) {
}

ngOnInit(): void {

  

}


}


