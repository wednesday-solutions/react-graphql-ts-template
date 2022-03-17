import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('github');

export const getRepos = (repoName: string) => repoApi.get(`/search/repositories?q=${repoName}`);
