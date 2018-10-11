export type TChannel = {
  id: string
  name: string
  is_private: boolean
}

export type TSavedChannelPayload = { channelId: string; channel: TChannel }

export type TAuthSavedPayload = {
  authId: string
}
