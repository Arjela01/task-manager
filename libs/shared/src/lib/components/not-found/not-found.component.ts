import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCard,
  MatCardContent,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'lib-ui-not-found',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    TranslateModule,
    MatButton,
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {}
