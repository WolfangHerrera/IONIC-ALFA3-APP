import { Injectable } from '@angular/core';
import { EN_tabHomeText, EN_tabOrderText, ES_tabHomeText, ES_tabOrderText } from 'src/app/utils/language/tab/text';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  getLanguage() {
    const language = navigator.language;
    return language.startsWith('es') ? 'es' : 'en';
  }

  getTextHomeTab(){
    return this.getLanguage() === 'es' ? ES_tabHomeText : EN_tabHomeText;
  }

  getTextOrderTab(){
    return this.getLanguage() === 'es' ? ES_tabOrderText : EN_tabOrderText;
  }
}
