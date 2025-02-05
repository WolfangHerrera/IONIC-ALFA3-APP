import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private isOfflineBehavior = new BehaviorSubject<boolean>(false);
  isOfflineFlag$ = this.isOfflineBehavior.asObservable();

  constructor() {
    this.setOfflineStatus()
  }

  setOfflineStatus() {
    window.addEventListener('online', () => this.isOfflineBehavior.next(false));
    window.addEventListener('offline', () => this.isOfflineBehavior.next(true));
  }

  getOfflineStatus() {
    return this.isOfflineBehavior.asObservable();
  }
}
