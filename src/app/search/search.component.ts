import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { map, Observable, catchError, of } from 'rxjs';

import { searchRepositories } from '../queries/search-repositories';

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
  repos!: Observable<any[]>;
  publicAccessToken: string = localStorage.getItem('token') || '';

  constructor(private apollo: Apollo) {}

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

    this.repos = this.apollo
      .query<any>({
        context: {
          headers: {
            Authorization: `Bearer ${this.publicAccessToken}`,
          },
        },
        variables: {
          repoName: this.repoName.value,
        },
        query: searchRepositories,
      })
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
