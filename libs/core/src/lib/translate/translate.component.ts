import { Component } from '@angular/core';
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
export class TranslateComponent {
  currentLanguage = 'en'; // Default language

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.currentLanguage);
  }

  changeLanguage(language: any) {
    this.currentLanguage = language.value;
    this.translate.use(language.value);
  }
}
