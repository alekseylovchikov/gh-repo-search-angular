import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Repo } from '../types/repo.type';

export interface Response {
  search: {
    repos: Repo[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class GetReposGQL extends Query<Response> {
  override document = gql`
    query searchRepos($repoName: String!) {
      search(type: REPOSITORY, last: 10, query: $repoName) {
        repos: edges {
          repo: node {
            ... on Repository {
              url
              name
              description
              stargazers {
                totalCount
              }
              latestRelease {
                updatedAt
              }
              owner {
                avatarUrl
                login
              }
            }
          }
        }
      }
    }
  `;
}
