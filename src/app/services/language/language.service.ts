import { Injectable } from '@angular/core';
import { EN_tabHomeText, EN_tabOrderText, ES_tabHomeText, ES_tabOrderText } from 'src/app/utils/language/tab/text';
import { EN_AccountText, ES_AccountText } from 'src/app/utils/language/home/account/text';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  getLanguage() {
    const language = navigator.language;
    return language.startsWith('es') ? 'es' : 'en';
  }

  isSpanishLanguage(){
    return this.getLanguage() === 'es';
  }

  getTextHomeTab(){
    return this.isSpanishLanguage() ? ES_tabHomeText : EN_tabHomeText;
  }

  getTextOrderTab(){
    return this.isSpanishLanguage() ? ES_tabOrderText : EN_tabOrderText;
  }

  getTextHomeAccount(){
    return this.isSpanishLanguage() ? ES_AccountText : EN_AccountText;
  }
}
