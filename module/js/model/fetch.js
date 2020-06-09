
export const MYSQLIPHP = "php/mysqli.php"

export async function postData(url = ``, data, signal) {
  const response = await fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    signal: signal,
    body: data
  })
  const result = response.clone()
  try {
    return await response.json()
  } catch(e) {
    return await result.text()
  }
}

export async function postDataJ(url = ``, data, signal) {
  const response = await fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    signal: signal,
    body: JSON.stringify(data)
  })
  const error = response.clone()
  try {
    return await response.json()
  } catch(e) {
    return await error.text()
  }
}
