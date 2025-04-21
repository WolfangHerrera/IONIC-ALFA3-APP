import { Injectable } from '@angular/core';
import { EN_tabHomeText, EN_tabOrderText, ES_tabHomeText, ES_tabOrderText } from 'src/app/utils/language/tab/text';
import { EN_AccountText, ES_AccountText } from 'src/app/utils/language/home/account/text';
import { EN_homeText, EN_toastText, EN_toastTextWholesale, ES_homeText, ES_toastText, ES_toastTextWholesale } from 'src/app/utils/language/home/home/text';
import { EN_orderText, ES_orderText, orderStatusTranslations } from 'src/app/utils/language/order/text';
import { EN_cartText, ES_cartText } from 'src/app/utils/language/home/cart/text';

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

  getTextToast(){
    return this.isSpanishLanguage() ? ES_toastText : EN_toastText;
  }

  getTextToastWholesale(){
    return this.isSpanishLanguage() ? ES_toastTextWholesale : EN_toastTextWholesale;
  }

  getTextHomeTab(){
    return this.isSpanishLanguage() ? ES_tabHomeText : EN_tabHomeText;
  }

  getTextHomeCart(){
    return this.isSpanishLanguage() ? ES_cartText : ES_cartText;
  }

  getTextOrderTab(){
    return this.isSpanishLanguage() ? ES_tabOrderText : EN_tabOrderText;
  }

  getTextHomeAccount(){
    return this.isSpanishLanguage() ? ES_AccountText : EN_AccountText;
  }

  getTextHomeHome(){
    return this.isSpanishLanguage() ? ES_homeText : EN_homeText;
  }

  getTextOrderOrder(){
    return this.isSpanishLanguage() ? ES_orderText : EN_orderText;
  }

  returnOrderStatus(status: string){
    return this.isSpanishLanguage() ? orderStatusTranslations[status] : status.replace(/_/g, " ");;
  }
}
