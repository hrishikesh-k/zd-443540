import type { HandlerEvent } from '@netlify/functions'

export default async function handler(event: HandlerEvent) {
  const res = await fetch('https://zd-443540.netlify.app/response', {
    headers: {
      'x-nf-waf-bypass-token': event.headers['x-nf-waf-bypass-token'] || '',
    }
  })
  const json = await res.json()
  return Response.json(json)
}