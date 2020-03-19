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
  const data = await request.json()

  if (data.newToken) {
    cookies.set('token', `Bearer ${data.newToken}`)
  }

  return { ok, data }
}
