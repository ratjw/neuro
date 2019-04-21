
// Add all profiles in one string to show in 1 cell
export function viewRecord(profile)
{
  let profileJSON = JSON.parse(profile),
    profiles = []

  if (!profileJSON) { return "" }

  Object.entries(profileJSON).forEach(([key, val]) => {
    if (key === "admitted") {
      if (val) {
        profiles.push(`${key}:${val}`)
      }
    } else if (key === "operated") {
      profileJSON[key].forEach(e => {
        let op = Object.values(e).map(e => e)
        profiles.push(`op(${op.join(', ')})`)
      })
    } else {
      profiles.push(val)
    }
  })

  return profiles.length ? profiles.join('; ') : ''
}
