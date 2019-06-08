
// Add all profiles in one string to show in 1 cell
export function viewRecord(profile, thopdate, treatment)
{
  let profileJSON = JSON.parse(profile),
    treatments = [],
    profiles = [],
    procstr

  if (!profileJSON) { return "" }

  Object.entries(profileJSON).forEach(([key, val]) => {
    if (key === "admitted") {
      if (val > 1) {
        profiles.push(`${key}:${val}`)
      }
    } else if (key === "operated") {
      profileJSON[key].forEach((e, i) => {
        let op = e.opdate || '',
          pro = e.procedure || '',
          sp = (op && pro) ? ' ' : '',
          rx = op + sp + pro

        rx && treatments.push(rx)
        delete e.opdate
        delete e.procedure
        procstr = procString(e)
        if (procstr) {
          profiles.push(`Op${i+1} (${procstr})`)
        }
      })
    } else if (key === "radiosurg") {
      profileJSON[key].forEach((e, i) => {
        e.procedure && treatments.push(e.procedure)
        delete e.procedure
        procstr = procString(e)
        if (procstr) {
          profiles.push(`RS${i+1} (${procstr})`)
        }
      })
    } else if (key === "endovasc") {
      profileJSON[key].forEach((e, i) => {
        e.procedure && treatments.push(e.procedure)
        delete e.procedure
        procstr = procString(e)
        if (procstr) {
          profiles.push(`ET${i+1} (${procstr})`)
        }
      })
    } else {
      profiles.push(val)
    }
  })

  treatments = treatments.length
             ? treatments.join('<br>')
             : profileJSON.operated && profileJSON.operated.length
               ? thopdate + ' ' + treatment
               : treatment
  profiles = profiles.length ? profiles.join('<br>') : ''

  return treatments
          ? treatments + '<br><br>' + profiles
          : profiles
}

function procString(proc)
{
  let str = '',
    arr = []

  arr = Object.values(proc).map(e => e).filter(e => e)
  if (arr.length) { str = arr.join(', ') }

  return str
}