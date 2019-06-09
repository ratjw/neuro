
import { URIcomponent, winHeight, deepEqual } from "../util/util.js"
import { saveContentService, saveService } from './savePreviousCellService.js'

export function saveProfile(pointing, profileJSON)
{
  let recordJSON = {
      operated: [],
      radiosurg: [],
      endovasc: []
    }

  let treatdiv = $('#dialogProfile div.treatdiv').html()
  if (treatdiv) {
    saveContentService(pointing, 'treatment', treatdiv)
  }

  $('#dialogProfile input:not(#dialogProfile div input)').each(function() {
    if (this.name === "admitted") {
      if (this.value) {
        recordJSON[this.name] = this.value
      }
    } else {
      if (this.checked) {
        recordJSON[this.name] = this.value
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
