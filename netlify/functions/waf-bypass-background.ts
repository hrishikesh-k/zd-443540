import type { Config } from '@netlify/functions'

export default async function (req: Request) {
  const bypassToken = req.headers.get('x-nf-waf-bypass-token')
  console.log('Bypass Token:', bypassToken)
  const res = await fetch('https://zd-443540.netlify.app/response', {
    headers: {
      'x-nf-waf-bypass-token': bypassToken || '',
    }
  })
  const json = await res.json()
  console.log('Response JSON:', json)
}

export const config: Config = {
  path: '/waf-bypass-background'
}