export type TContextRefresh = {
  refreshToken: {
    tokenUrl: string
    clientId: string
    clientSecret: string
    refreshToken: string
  }
}

export type TOAUTH2AuthContext = {
  authAccess: {
    idToken?: string | any
    accessToken: string
  }
}
