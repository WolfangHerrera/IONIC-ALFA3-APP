import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/services/header/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent  implements OnInit {
  @Output() leftButtonOutput: EventEmitter<string> = new EventEmitter();
  @Output() rightButtonOutput: EventEmitter<string> = new EventEmitter();
  activatedLeftButton: boolean = false;
  activatedRightButton: boolean = false;
  leftButton: string = '';
  rightButton: string = '';

  private subscriptions: Subscription = new Subscription();

  constructor(private readonly headerService: HeaderService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.headerService.getActivatedLeftButton$().subscribe(value => {
        this.activatedLeftButton = value;
      })
    );

    this.subscriptions.add(
      this.headerService.getActivatedRightButton$().subscribe(value => {
        this.activatedRightButton = value;
      })
    );

    this.subscriptions.add(
      this.headerService.getLeftButton$().subscribe(value => {
        this.leftButton = value;
      })
    );

    this.subscriptions.add(
      this.headerService.getRightButton$().subscribe(value => {
        this.rightButton = value;
      })
    );
  }

  rightButtonClick() {
    this.rightButtonOutput.emit(this.rightButton);
  }

  leftButtonClick() {
    this.leftButtonOutput.emit(this.leftButton);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
