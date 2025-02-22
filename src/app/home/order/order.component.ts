import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-home',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: false,
})
export class OrderComponent  implements OnInit {
  @Input() tabChanged: boolean = false;
  constructor() { }

  ngOnInit() {}

}
