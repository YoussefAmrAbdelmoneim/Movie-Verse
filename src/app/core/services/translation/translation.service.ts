import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID, RendererFactory2, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  public currentLang = signal<string>('en-US');
 public readonly onLangChange:any;
 private readonly renderer2=inject(RendererFactory2).createRenderer(null,null)
  constructor(private translateService:TranslateService , @Inject(PLATFORM_ID) private id:object ) {
      this.onLangChange = this.translateService.onLangChange;
    if (isPlatformBrowser(this.id)) {
    translateService.setDefaultLang('en-US');
    const savedLang=localStorage.getItem('lang');
    if (savedLang) {  
      translateService.use(savedLang !);
      this.changeLang(savedLang); 
      this.currentLang.set(savedLang);
    }
    this.changeDirection();
   }
  }
  changeDirection(): void {
    const direction = this.currentLang() === 'ar-EG' ? 'rtl' : 'ltr';
    const lang = this.currentLang() === 'ar-EG' ? 'ar-EG' : 'en-US';
    this.renderer2.setAttribute(document.documentElement, 'dir', direction);
    this.renderer2.setAttribute(document.documentElement, 'lang', lang);
  }
  changeLang(lang:string){
    this.currentLang.set(lang);
    localStorage.setItem('lang',lang);
    this.translateService.use(lang);
    this.changeDirection();
  }
  
  getCurrentApiLang(): string {
    return this.currentLang() === 'ar-EG' ? 'ar-EG' : 'en-US';
  }
}
 