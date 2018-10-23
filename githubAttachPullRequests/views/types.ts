export type TPullRequest = {
  id: string
  title: string
  number: number
}

export type TOutput = {
  (): (target: any, key: string) => void
}

export declare const Output: TOutput

export type TInput = {
  (): (target: any, key: string) => void
}

export declare const Input: TInput

export type BearerRef<T> = T
