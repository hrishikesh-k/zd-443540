import type { Config } from '@netlify/functions'

export default async function handler() {
  return Response.json({
    message: 'WAF bypass successful'
  })
}

export const config: Config = {
  path: '/response'
}