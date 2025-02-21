import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-core-order',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  standalone: false,
})
export class CoreComponent {
  @Input() tabChanged: boolean = false;
  @Input() dataOrder!: string;
  dataCart: any = [];
  isLoading: boolean = false;
  
  constructor(private route: ActivatedRoute, private router: Router, private requestService: RequestService) {
    this.dataCart = this.dataCart['products_cart']
  }


  setDotOnPrice(price: string) {
    return parseFloat(price).toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });
  }

}
