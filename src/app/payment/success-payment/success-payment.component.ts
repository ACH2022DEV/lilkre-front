import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.css']
})
export class SuccessPaymentComponent implements OnInit {

  constructor(private paymentService:PaymentService,private router:Router, private route: ActivatedRoute,) { }
  paymentId:any;
  successPayment:boolean=false;
  ngOnInit(): void {
 this.paymentId = this.route.snapshot.queryParamMap.get('payment_id');
console.log(this.paymentId);
this.verifyPayment(this.paymentId);
  }
  goBack() {
    this.router.navigate(['/home']);
  }
  verifyPayment(paymentId: string) {
    this.paymentService.verifierPayment(paymentId)
      .subscribe(
        (response) => {
          console.log(response.result.status);
          if(response.result.status==="SUCCESS"){
            this.successPayment=true;
          }else{
            this.router.navigate(['/failed'])
          }
        },
        (error) => {
          console.error(error);
          // Gérez les erreurs ici
        }
      );
  }

}
