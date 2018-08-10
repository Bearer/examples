import axios from 'axios'

export default function(username: string, password: string) {
  const headers = {
    'Accept': 'application/json',
    'User-Agent': 'Bearer'
  }

  return axios.create({
    baseURL: 'https://us18.api.mailchimp.com/3.0/',
    timeout: 5000,
    auth: { username, password },
    headers
  })
}
