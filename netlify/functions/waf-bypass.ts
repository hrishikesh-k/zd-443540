import type { Config } from '@netlify/functions'

export default async function (req: Request) {
  const res = await fetch('https://zd-443540.netlify.app/response', {
    headers: {
      'x-nf-waf-bypass': req.headers.get('x-nf-waf-bypass') || '',
    }
  })
  const json = await res.json()
  return Response.json(json)
}

export const config: Config = {
  path: '/waf-bypass'
}