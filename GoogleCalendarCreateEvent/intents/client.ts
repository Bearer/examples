import axios from 'axios'

export default function(token: string) {
  const headers = {
    'Accept': 'application/json',
    'User-Agent': 'Bearer',
    'Authorization': `Bearer ${token}`
  }

  return axios.create({
    baseURL: 'https://www.googleapis.com/calendar/v3/',
    timeout: 5000,
    headers
  })
}
