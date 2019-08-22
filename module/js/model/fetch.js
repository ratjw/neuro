
export const MYSQLIPHP = "php/mysqli.php"

export async function postData(url = ``, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: data
  })
  const text = await response.text()
  try {
    return JSON.parse(text)
  } catch(e) {
    return text
  }
}
