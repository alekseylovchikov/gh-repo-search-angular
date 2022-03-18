import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Apollo, Subscription } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/build/types';
import { map, Observable } from 'rxjs';
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
        map(({ data, loading }) => {
          this.loading = false;
          return data.search.repos.map((obj: any) => obj.repo);
        })
      );
  }

  handleChange(): void {}
}
