import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private activatedLeftButton = new BehaviorSubject<boolean>(false);
  private activatedRightButton = new BehaviorSubject<boolean>(false);
  private leftButton = new BehaviorSubject<string>('');
  private rightButton = new BehaviorSubject<string>('');

  setActivatedLeftButton(value: boolean) {
    this.activatedLeftButton.next(value);
  }

  setActivatedRightButton(value: boolean) {
    this.activatedRightButton.next(value);
  }

  setLeftButton(value: string) {
    this.leftButton.next(value);
  }

  setRightButton(value: string) {
    this.rightButton.next(value);
  }

  getActivatedLeftButton$(): Observable<boolean> {
    return this.activatedLeftButton.asObservable();
  }

  getActivatedRightButton$(): Observable<boolean> {
    return this.activatedRightButton.asObservable();
  }

  getLeftButton$(): Observable<string> {
    return this.leftButton.asObservable();
  }

  getRightButton$(): Observable<string> {
    return this.rightButton.asObservable();
  }
  clearHeader() {
    this.leftButton.next('');
    this.activatedLeftButton.next(false);
    this.rightButton.next('');
    this.activatedRightButton.next(false);

  };
  
}
