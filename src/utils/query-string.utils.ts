export const getQueryStringFromObject = (payload: { [key: string]: any }) => {
  const urlSearchParams = new URLSearchParams()

  for (const key in payload) {
    const value = String(payload[key])
    urlSearchParams.append(key, value)
  }

  return urlSearchParams.toString()
} // End of getQueryStringFromObject
