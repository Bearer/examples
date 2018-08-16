import axios from 'axios'

export default function(token: string) {
  const headers = {
    Accept: 'application/json',
    'User-Agent': 'Bearer',
    Authorization: `Bearer ${token}`
  }

  return axios.create({
    baseURL: 'https://slack.com/api/',
    timeout: 2700,
    headers
  })
}
