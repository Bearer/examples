export type TChannel = {
  id: string
  name: string
  is_private: boolean
}

export type TSavedChannelPayload = { channelId: string; channel: TChannel }

export type TAuthSavedPayload = {
  authId: string
}

export type TAuthorizedPayload = {
  authId: string
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
