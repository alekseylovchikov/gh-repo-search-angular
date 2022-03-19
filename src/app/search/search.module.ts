import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContainerComponent } from 'src/app/search/components/container/container.component';
import { ItemComponent } from './components/item/item.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [ContainerComponent, ItemComponent, SpinnerComponent],
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
  ],
  exports: [ContainerComponent, ItemComponent, SpinnerComponent],
})
export class SearchModule {}
