import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, catchError, of } from 'rxjs';

import { GetReposGQL } from 'src/app/search/search.query';
import { Repo } from 'src/app/types/repo.type';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {
  repoName = new FormControl('');
  accessToken = new FormControl('');
  loading: boolean = false;
  error: string = '';
  repos!: Observable<Repo[]>;
  personalAccessToken: string = localStorage.getItem('token') || '';

  constructor(private getReposGql: GetReposGQL) {}

  ngOnInit(): void {
    this.personalAccessToken = localStorage.getItem('token') || '';
  }

  setPersonalAccessToken() {
    this.personalAccessToken = this.accessToken.value;
    localStorage.setItem('token', this.accessToken.value);
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    this.repos = this.getReposGql
      .fetch(
        { repoName: this.repoName.value },
        {
          context: {
            headers: {
              Authorization: `Bearer ${this.personalAccessToken}`,
            },
          },
        }
      )
      .pipe(
        map(({ data }) => {
          this.loading = false;
          return data.search.repos.map((obj: any) => obj.repo);
        }),
        catchError((err) => {
          this.loading = false;
          this.error = err.message;
          return of([]);
        })
      );
  }

  handleChange(): void {}
}
