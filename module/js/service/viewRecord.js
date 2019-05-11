
// Add all profiles in one string to show in 1 cell
export function viewRecord(profile)
{
  let profileJSON = JSON.parse(profile),
    treatments = [],
    profiles = []

  if (!profileJSON) { return "" }

  Object.entries(profileJSON).forEach(([key, val]) => {
    if (key === "admitted") {
      if (val > 1) {
        profiles.push(`${key}:${val}`)
      }
    } else if (key === "operated") {
      profileJSON[key].forEach((e, i) => {
        treatments.push(e.procedure || '')
        profiles.push(`Op${i+1}(${procString(e)})`)
      })
    } else if (key === "radiosurg") {
      profileJSON[key].forEach((e, i) => {
        treatments.push(e.procedure || '')
        profiles.push(`RS${i+1}(${procString(e)})`)
      })
    } else if (key === "endovasc") {
      profileJSON[key].forEach((e, i) => {
        treatments.push(e.procedure || '')
        profiles.push(`ET${i+1}(${procString(e)})`)
      })
    } else {
      profiles.push(val)
    }
  })

  treatments = treatments.length ? treatments.join('<br>') : ''
  profiles = profiles.length ? profiles.join('<br>') : ''

  return treatments ? (treatments + '<br><br>' + profiles) : profiles
}

function procString(proc)
{
  let str = '',
    arr = []

  delete proc.procedure

  arr = Object.values(proc).map(e => e).filter(e => e)

  if (arr.length) { str = arr.join(', ') }

  return str
}