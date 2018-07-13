import axios from 'axios'

export const CLIENT = axios.create({
  baseURL: 'https://us18.api.mailchimp.com/3.0',
  timeout: 5000
})

export function headersFor(token) {
  const encodedAuth = Buffer.from(`anything:${token}`).toString('base64')

  return {
    Authorization: `Basic ${encodedAuth}`
  }
}
