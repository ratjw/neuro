
// Add all profiles in one string to show in 1 cell
export function viewProfile(profile, opdateth, treatment)
{
  let profileJSON = JSON.parse(profile),
    treatmentstr = [],
    profilestr = [],
    procstr

  if (!profileJSON) { return treatment }

  Object.entries(profileJSON).forEach(([key, val]) => {
    if (key === "admitted") {
      if (val > 1) {
        profilestr.push(`${key}:${val}`)
      }
    } else if (key === "operated") {
      profileJSON[key].forEach((e, i) => {
        let opdate = e.opdate || '',
          proc = e.procedure || '',
          space = (opdate && proc) ? ' ' : '',
          rx = opdate + space + proc

        rx && treatmentstr.push(rx)
        delete e.opdate
        delete e.procedure
        procstr = procString(e)
        if (procstr) {
          profilestr.push(`Op${i+1} (${procstr})`)
        }
      })
    } else if (key === "radiosurg") {
      profileJSON[key].forEach((e, i) => {
        e.procedure && treatmentstr.push(e.procedure)
        delete e.procedure
        procstr = procString(e)
        if (procstr) {
          profilestr.push(`RS${i+1} (${procstr})`)
        }
      })
    } else if (key === "endovasc") {
      profileJSON[key].forEach((e, i) => {
        e.procedure && treatmentstr.push(e.procedure)
        delete e.procedure
        procstr = procString(e)
        if (procstr) {
          profilestr.push(`ET${i+1} (${procstr})`)
        }
      })
    } else {
      profilestr.push(val)
    }
  })

  treatmentstr = treatmentstr.length
             ? treatmentstr.join('<br>')
             : profileJSON.operated && profileJSON.operated.length
               ? opdateth + ' ' + treatment
               : treatment
  profilestr = profilestr.length ? profilestr.join('<br>') : ''

  return treatmentstr
          ? profilestr
            ? treatmentstr + '<br><br>' + profilestr
            : treatmentstr
          : profilestr || treatment
}

function procString(proc)
{
  let str = '',
    arr = []

  arr = Object.values(proc).map(e => e).filter(e => e)
  if (arr.length) { str = arr.join(', ') }

  return str
}