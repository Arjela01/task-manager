import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'lib-translate',
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
  styleUrls: ['./translate.component.css'],
  standalone: true,
  imports: [TranslateModule],
})
export class TranslateComponent implements OnInit {
  currentLanguage = 'en';

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    const savedLanguage = localStorage.getItem('user.lang');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
      this.translate.use(this.currentLanguage);
    } else {
      this.translate.setDefaultLang(this.currentLanguage);
    }
  }

  changeLanguage(event: any) {
    const language = event.value;
    this.currentLanguage = language;
    this.translate.use(language);
    localStorage.setItem('user.lang', language);
  }
}
