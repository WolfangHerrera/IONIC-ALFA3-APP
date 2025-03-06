import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private platform: Platform) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      document.body.setAttribute('color-theme', 'dark');
    });
  }
}
