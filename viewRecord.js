
// Add all profiles in one string to show in 1 cell
export function viewRecord(profile)
{
  let profileJSON = JSON.parse(profile),
    profiles = [],
    str = ''

  if (!profileJSON) { return "" }

  Object.entries(profileJSON).forEach(([key, val]) => {
    if (key === "admitted") {
      if (val > 1) {
        profiles.push(`${key}:${val}`)
      }
    } else if (key === "operated") {
      profileJSON[key].forEach(e => {
        profiles.push(`Op(${procString(e)})`)
      })
    } else if (key === "radiosurg") {
      profileJSON[key].forEach(e => {
        profiles.push(`RS(${procString(e)})`)
      })
    } else if (key === "endovasc") {
      profileJSON[key].forEach(e => {
        profiles.push(`Endo(${procString(e)})`)
      })
    } else {
      profiles.push(val)
    }
  })

  return profiles.length ? profiles.join('; ') : ''
}

function procString(procedure)
{
  let str = '',
    op = Object.values(procedure).map(e => e).filter(e => e)

  if (op.length) { str = op.join(', ') }

  return str
}