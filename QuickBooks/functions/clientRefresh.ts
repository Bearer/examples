import axios from 'axios'
import qs from 'qs'

export default async function(tokenUrl: string, clientId: string, clientSecret: string, refreshToken: string) {
  const refreshBody = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  }
  const refreshOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: clientId,
      password: clientSecret
    }
  }

  const data = (await axios.post<{ access_token: string }>(tokenUrl, qs.stringify(refreshBody), refreshOptions)).data
  console.log(data)
  const { access_token } = data

  return access_token
}
