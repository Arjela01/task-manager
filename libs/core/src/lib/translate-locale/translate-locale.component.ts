import { Component, OnInit, Inject } from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeDe from '@angular/common/locales/de';
import localeSq from '@angular/common/locales/sq';

@Component({
  selector: 'lib-translate-locale',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <div class="custom-dropdown">
      <select
          id="language-select"
          (change)="changeLanguage($event.target)"
          [value]="currentLanguage"
          class="custom-select"
      >
        <option value="en">{{ 'english' | translate }}</option>
        <option value="sq">{{ 'albanian' | translate }}</option>
        <option value="de">{{ 'german' | translate }}</option>
      </select>
    </div>
  `,
  styleUrls: ['./translate-locale.component.css'],
})
export class TranslateLocaleComponent implements OnInit {
  currentLanguage = 'en';
  private localeId: string;

  constructor(
      private translate: TranslateService,
      @Inject(LOCALE_ID) private injectedLocaleId: string
  ) {
    this.localeId = this.injectedLocaleId;
    registerLocaleData(localeEn);
    registerLocaleData(localeDe);
    registerLocaleData(localeSq);
  }

  ngOnInit() {
    const savedLanguage = localStorage.getItem('user.lang');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
      this.translate.use(this.currentLanguage);
      this.setLocale(this.currentLanguage);
    } else {
      this.translate.setDefaultLang(this.currentLanguage);
      this.setLocale(this.currentLanguage);
    }
  }

  changeLanguage(event: any) {
    const language = event.value;
    this.currentLanguage = language;
    this.translate.use(language);
    this.setLocale(language);
    localStorage.setItem('user.lang', language);
  }

  private setLocale(language: string) {
    const locales: { [key: string]: string } = {
      en: 'en-US',
      sq: 'sq-AL',
      de: 'de-DE',
    };
    this.localeId = locales[language] || 'en-US';
    registerLocaleData(this.getLocaleData(this.localeId));
  }

  private getLocaleData(localeId: string) {
    switch (localeId) {
      case 'en-US':
        return localeEn;
      case 'de-DE':
        return localeDe;
      case 'sq-AL':
        return localeSq;
      default:
        return localeEn;
    }
  }
}
