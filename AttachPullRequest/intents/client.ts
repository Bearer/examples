import axios from 'axios'

export const CLIENT = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 5000,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Bearer'
  }
})

export function headersFor(token) {
  return {
    Authorization: `token ${token}`
  }
}
