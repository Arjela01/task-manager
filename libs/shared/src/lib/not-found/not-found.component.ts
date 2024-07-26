import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'lib-ui-not-found',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {}
