import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-failed-payment',
  templateUrl: './failed-payment.component.html',
  styleUrls: ['./failed-payment.component.css']
})
export class FailedPaymentComponent implements OnInit {

  constructor(private paymentService:PaymentService,private router:Router, private route: ActivatedRoute,
    private location: Location) { }
  paymentId:any;
  failedPayment:boolean=false;
  ngOnInit(): void {
 this.paymentId = this.route.snapshot.queryParamMap.get('payment_id');
//console.log(this.paymentId);
this.verifyPayment(this.paymentId);
  }
  goBack() {
    this.router.navigate(['/Panier']);
  }

  verifyPayment(paymentId: string) {
    this.paymentService.verifierPayment(paymentId)
      .subscribe(
        (response) => {
          console.log(response.result.status);
          if(response.result.status==="FAILURE"){
            this.failedPayment=true;
          }else{
            this.router.navigate(['/success'])
          }
        },
        (error) => {
          console.error(error);
          // Gérez les erreurs ici
        }
      );
  }

}
