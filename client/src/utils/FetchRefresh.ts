import Cookies from 'universal-cookie'

export const fetchRefresh = async (
  input: RequestInfo,
  init?: RequestInit,
): Promise<{ ok: boolean; data: any }> => {
  const cookies = new Cookies()
  const token = cookies.get('token')

  const headers = Object.assign(
    {},
    init ? init.headers : {},
    token
      ? {
          Authorization: token,
        }
      : {},
  )

  init = Object.assign({}, init, {
    headers,
  })

  const request = await fetch(input, init)
  const ok = request.ok
  const json = await request.json()

  if (!ok) {
    console.error('[FetchRefresh] - got error', json)
  } else {
    console.log('[FetchRefresh] - fetched data', json)
  }

  if (json.newToken) {
    cookies.set('token', `Bearer ${json.newToken}`, { maxAge: 3600, path: '/' })
    return { ok, data: json.data }
  }

  return { ok, data: json }
}
