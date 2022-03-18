import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { ItemComponent } from './item.component';

@NgModule({
  declarations: [ItemComponent],
  imports: [CommonModule, MatCardModule],
  exports: [ItemComponent],
})
export class ItemModule {}
