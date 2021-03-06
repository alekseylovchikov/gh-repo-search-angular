import { Component, Input, OnInit } from '@angular/core';

import { Repo } from 'src/app/types/repo.type';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() repo!: Repo;

  constructor() {}

  ngOnInit(): void {}
}
