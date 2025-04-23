import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation/translation.service';
import { SearchComponent } from '../../shared/ui/search/search.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, SearchComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly renderer = inject(Renderer2);
  constructor(private translate: TranslationService) {
    this.currentLanguage =
      this.translate.currentLang() || localStorage.getItem('lang') || 'en-US';
  }
  isMenuOpen: boolean = false;
  currentLanguage!: string;
  isDarkMode: boolean = false;
  showSearchModal = false;
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = localStorage.getItem('theme') === 'dark';
      if (this.isDarkMode) {
        this.renderer.addClass(document.documentElement, 'dark');
      }
    }
  }
  toggleDarkMode() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
      const htmlElement = document.documentElement;
      if (this.isDarkMode) {
        this.renderer.addClass(htmlElement, 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        this.renderer.removeClass(htmlElement, 'dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }
  onLanguageChange(lang: string) {
    this.translate.changeLang(lang);
    this.currentLanguage = lang;
  }
  currentLang(lang: string) {
    return localStorage.getItem('lang') === lang;
  }
  openSearchModal() {
    this.showSearchModal = true;
  }
  closeSearchModal() {
    this.showSearchModal = false;
  }
}
