
export const nextAll = element => {
  const nextElements = []
  let nextElement = element

  while(nextElement.nextElementSibling) {
    nextElement = nextElement.nextElementSibling
    nextElements.push(nextElement)
  }

  return nextElements
}
