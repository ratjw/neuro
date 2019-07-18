
import { URIcomponent, winHeight, deepEqual } from "../util/util.js"
import { saveContentService, saveService } from './savePreviousCellService.js'
import { getHtmlText } from '../control/edit.js'

export function saveProfile(pointing, profileJSON)
{
  let recordJSON = {
      operated: [],
      radiosurg: [],
      endovasc: []
    },
    treatdiv = document.querySelector('#dialogProfile div.treatdiv'),
    treathtml = getHtmlText(treatdiv.innerHTML)

  if (treathtml) {
    saveContentService(pointing, 'treatment', treathtml)
  }

  document.querySelectorAll('#dialogProfile > label > input').forEach(e => {
    if (e.name === "admitted") {
      if (e.value) {
        recordJSON[e.name] = e.value
      }
    } else {
      if (e.checked) {
        recordJSON[e.name] = e.value
      }
    }
  })

  saveProcedure('#operated', recordJSON.operated, 'Op')
  saveProcedure('#radiosurg', recordJSON.radiosurg, 'RS')
  saveProcedure('#endovasc', recordJSON.endovasc, 'ET')

  if (!recordJSON.radiosurg.length) { delete recordJSON.radiosurg }
  if (!recordJSON.endovasc.length) { delete recordJSON.endovasc }

  if (deepEqual(recordJSON, profileJSON)) { return }

  let content = JSON.stringify(recordJSON)
    content = URIcomponent(content)

  saveService(pointing, "profile", content)
}

function saveProcedure(id, procedure, suffix)
{
  $(id + ' > div:not(.textdiv)').each((i, div) => {
    if (!procedure[i]) { procedure[i] = {} }
    div.querySelectorAll('input').forEach(e => {
      if ((e.type === 'text') || e.checked) {
        procedure[i][e.name.replace(suffix + i, '')] = e.value
      }
    })
    let txtarea = div.querySelector('.textdiv')
    if (txtarea) {
      procedure[i].procedure = txtarea.innerHTML
    }
  })
}
