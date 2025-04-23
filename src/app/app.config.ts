import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations'
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; 
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './core/utils/httpLoaderFiles';
import { NgxSpinnerModule } from "ngx-spinner";
import { loaderInterceptor } from './core/interceptors/loader/loader.interceptor';

export const appConfig: ApplicationConfig = { 
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),importProvidersFrom( NgxSpinnerModule,TranslateModule.forRoot({
    loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    },
    defaultLanguage: 'en-US'
})) ,provideAnimations(),provideRouter(routes,withInMemoryScrolling({scrollPositionRestoration:'top'}),withHashLocation()),provideHttpClient(withFetch(),withInterceptors([loaderInterceptor])) ,provideClientHydration(withEventReplay())]
};
 