
// Add all profiles in one string to show in 1 cell
export function viewProfile(profile, thopdate, treatment)
{
  const OPERATE = ["doneby", "manner", "scale", "disease"],
        RADIO = ["doneby"],
        ENDO = ["doneby", "manner"]

  let profileJSON = JSON.parse(profile),
    treatmentstr = [],
    complete = true

  if (!profileJSON) { return treatment }

  Object.keys(profileJSON).forEach(key => {
    if (key === "operated") {
      profileJSON[key].forEach((e, i) => {
        let opdateth = e.opdateth ? ('<b>' + e.opdateth + '</b>') : '',
          proc = e.procedure || '',
          space = (opdateth && proc) ? ' ' : '',
          rx = opdateth + space + proc

        rx && treatmentstr.push(rx)
        if (complete) {
          complete = OPERATE.every(i => i in e)
        }
      })
    } else if (key === "radiosurg") {
      profileJSON[key].forEach((e, i) => {
        e.procedure && treatmentstr.push(e.procedure)
        if (complete) {
          complete = RADIO.every(i => i in e)
        }
      })
    } else if (key === "endovasc") {
      profileJSON[key].forEach((e, i) => {
        e.procedure && treatmentstr.push(e.procedure)
        if (complete) {
          complete = ENDO.every(i => i in e)
        }
      })
    }
  })

  treatmentstr = treatmentstr.length
             ? treatmentstr.join('<br>')
             : profileJSON.operated && profileJSON.operated.length
               ? thopdate + ' ' + treatment
               : treatment

  if (treatmentstr) {
    if (complete) {
      return treatmentstr
    } else {
      let style = 'style = "font-size:10px; color:red;"'
      return `${treatmentstr}<br><br><div ${style}>Incomplete profile</div>`
    }
  } else {
    return treatment
  }
}
