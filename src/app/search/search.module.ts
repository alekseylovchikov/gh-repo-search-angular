import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';
import { ItemModule } from '../item/item.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ItemModule,
  ],
  exports: [SearchComponent],
})
export class SearchModule {}
