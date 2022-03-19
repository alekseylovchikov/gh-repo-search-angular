import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, catchError, of } from 'rxjs';

import { GetReposGQL } from 'src/app/search/search.query';
import { Repo } from 'src/app/types/repo.type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  repoName = new FormControl('');
  accessToken = new FormControl('');
  loading: boolean = false;
  error: string = '';
  repos!: Observable<Repo[]>;
  publicAccessToken: string = localStorage.getItem('token') || '';

  constructor(private getReposGql: GetReposGQL) {}

  ngOnInit(): void {
    this.publicAccessToken = localStorage.getItem('token') || '';
  }

  setPublicAccessToken() {
    this.publicAccessToken = this.accessToken.value;
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
              Authorization: `Bearer ${this.publicAccessToken}`,
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
