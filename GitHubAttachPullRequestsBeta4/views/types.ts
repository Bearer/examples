// The structure is defined by the GitHub API when we get the list of PullRequests
export type PullRequest = {
  id: string
  title: string
  number: string
  base: {
    repo: {
      full_name: string
    }
  }
}
