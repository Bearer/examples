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
