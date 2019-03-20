import axios from 'axios'
import clientRefresh from './clientRefresh'

export default async function(context: any) {
  let token = undefined

  if (context.authAccess && context.authAccess.accessToken) {
    token = context.authAccess.accessToken
  } else {
    token = await clientRefresh(
      context.refreshToken.tokenUrl,
      context.refreshToken.clientId,
      context.refreshToken.clientSecret,
      context.refreshToken.refreshToken
    )
  }
  const headers = {
    accept: 'application/json',
    'User-Agent': 'Bearer',
    authorization: `Bearer ${token}`
  }

  return axios.create({
    baseURL: 'https://sandbox-quickbooks.api.intuit.com',
    // baseURL: 'https://quickbooks.api.intuit.com',
    timeout: 5000,
    headers
  })
}
