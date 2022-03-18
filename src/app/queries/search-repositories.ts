import { gql } from 'apollo-angular';

export const searchRepositories = gql`
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
