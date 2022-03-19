export type Stargazers = {
  totalCount: number;
};

export type LatestRelease = {
  updatedAt: string;
};

export type Owner = {
  avatarUrl: string;
  login: string;
};

export type Repo = {
  url: string;
  name: string;
  description: string;
  stargazers: Stargazers;
  latestRelease: LatestRelease;
  owner: Owner;
};
