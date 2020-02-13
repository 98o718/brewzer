import Cookies from 'universal-cookie'

export const fetchRefresh = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<{ ok: boolean; data: any }> => {
  const cookies = new Cookies()
  const token = cookies.get('token')

  if (init && token) {
    init = Object.assign({}, init, {
      headers: {
        Authorization: token,
      },
    })
  }

  const request = await fetch(input, init)
  const ok = request.ok
  const data = await request.json()

  if (data.newToken) {
    cookies.set('token', data.newToken)
  }

  return { ok, data }
}
