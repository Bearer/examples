import axios from 'axios'

export default function(token: string) {
  const headers = {
    'Accept': 'application/json',
    'User-Agent': 'Bearer',
    'Authorization': `Bearer ${token}`
  }

  return axios.create({
    // Adding LinkedIn BaseURL
    baseURL: 'https://api.linkedin.com',
    timeout: 5000,
    headers
  })
}
