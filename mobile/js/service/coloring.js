
import { COMPLICATION } from "../model/const.js"

// used when freshly loaded SERVICE from DB only
// changes after this, must use showInputColor(target)
export function coloring(row) {
  let profile = JSON.parse(row.dataset.profile)

  if (!profile) { return }

  Object.values(COMPLICATION).forEach(e => {
    row.classList.remove(e)
  })

  Object.keys(COMPLICATION).forEach(e => {
    if (profile[e]) {
      if (e === 'admitted') {
        if (profile[e] < 2) { return }
      } else if (e === 'operated') {
        if (profile[e].length < 2) { return }
      }
      row.classList.add(COMPLICATION[e])
    }
  })
}
