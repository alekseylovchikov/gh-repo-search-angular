import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable, catchError, of } from 'rxjs';

import { GetReposGQL } from 'src/app/search/search.query';
import { Repo } from 'src/app/types/repo.type';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  error: string = '';
  repos!: Observable<Repo[]>;
  personalAccessToken: string = localStorage.getItem('token') || '';

  constructor(private getReposGql: GetReposGQL, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.personalAccessToken = localStorage.getItem('token') || '';
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      repoName: '',
      accessToken: '',
    });
  }

  setPersonalAccessToken(): void {
    this.personalAccessToken = this.form.value.accessToken;
    localStorage.setItem('token', this.form.value.accessToken);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      this.error = '';

      this.repos = this.getReposGql
        .fetch(
          { repoName: this.form.value.repoName },
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
  }

  handleChange(): void {}
}
