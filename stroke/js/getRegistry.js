
//import { USER } from "./main.js"
//import { sqlGetEditedBy, sqlSaveRegistry, sqlCancelAllRegistry } from "../model/sqlRegistry.js"
import { updateBOOK } from "./updateBOOK.js"

let _JsonRegistry,
  _qn

export function getRegistry(pointing)
{return
  let row = pointing.closest('tr'),
    hn = row.dataset.hn,
    qn = row.dataset.qn,
    rowRegistry = row.dataset.registry,
    thisRegistry = {
      oproomRegistry: row.dataset.oproom || "",
      casenumRegistry: row.dataset.casenum || "",
      optimeRegistry: row.dataset.optime,
      opdayRegistry: NAMEOFDAYTHAI[(new Date(row.dataset.opdate)).getDay()],
      opdatethRegistry: ISO_2_th(row.dataset.opdate),
      staffnameRegistry: row.dataset.staffname,
      hnRegistry: row.dataset.hn,
      patientnameRegistry: row.dataset.patient,
      ageRegistry: putAgeOpdate(row.dataset.dob, row.dataset.opdate),
      diagnosisRegistry: string50(row.dataset.diagnosis),
      treatmentRegistry: string50(row.dataset.treatment)
    }

  if (!hn || !qn) { return }

  for (let key in thisRegistry) {
    document.getElementById(key).innerHTML = thisRegistry[key]
  }

  _JsonRegistry = rowRegistry? JSON.parse(rowRegistry) : {}
  _qn = qn

  fillRegistry()

  clearEditcell()
}

function fillRegistry()
{
  if (Object.keys(_JsonRegistry).length) {
    fillMatchValue(_JsonRegistry)
    showNonEditableRegistry()
    getEditedBy()
  } else {
    showEditableRegistry()
    $('#editedby').html("")
  }
}

function fillMatchValue(_JsonRegistry)
{
  Object.entries(_JsonRegistry).forEach(([key, val]) => {
    let title = document.querySelector(`#dialogRegistry div[title='${key}']`),
      textareas = title.querySelectorAll('textarea')

    if (!title) { return }

    // convert string to array
    if (typeof val === 'string') { val = val.split() }
    if (!Array.isArray(val)) { return }

    let remain = fillRadioCheckbox(title, val)
    if (remain.length) {
      remain = fillText(title, remain)
    }
    if (remain.length) {
      textareas.forEach((e, i) => e.value = val[i] || '' )
    }
  })
}

function fillRadioCheckbox(title, val)
{
  let radios = title.querySelectorAll('input[type=radio]'),
    checkboxes = title.querySelectorAll('input[type=checkbox]'),
    radioCheckbox = Array.from(radios).concat(Array.from(checkboxes)),
    mapValue = radioCheckbox.map(e => e.value),
    copyval = [...val]

  val.forEach(v => {
    if (mapValue.includes(v)) {
      radioCheckbox[mapValue.indexOf(v)].checked = true
      copyval.splice(copyval.indexOf(v), 1)
    }
  })

  return copyval
}

function fillText(title, val)
{
  let copyval = [...val]

  title.querySelectorAll('input[type=text]').forEach((e, i) => {
    if (val[i]) {
      e.value = val[i]
      copyval.splice(copyval.indexOf(val[i]), 1)
    }
  })

  return copyval
}

function showNonEditableRegistry()
{
  _$dialogRegistry.dialog("option", "buttons", [
    {
      text: "ยกเลิกทุกรายการ",
      click: function () {
        if (confirm("ลบออกทั้งหมด")) {
          cancelAllRegistry()
          _$dialogRegistry.dialog('close')
        }
      }
    },
    {
      text: "แก้ไข",
      click: function () {
        showEditableRegistry()
      }
    }
  ])

  _$dialogRegistry.find('input').prop('disabled', true)
  _$dialogRegistry.find('textarea').prop('disabled', true)
  _$dialogRegistry.find('label').off('mousedown click')
}

// having any Registry must have copay. if no copay, ->alert
// having no Registry, cancel copay
function showEditableRegistry()
{
  _$dialogRegistry.dialog("option", "buttons", [
    {
      text: "Save",
      click: function () {
        if (checkRegistry()) {
          if (_$dialogRegistry.find(`div[title=copay] input[type=text]`).val()) {
            saveRegistry()
            showNonEditableRegistry()
          } else {
            Alert("saveRegistry", "<br>ต้องระบุจำนวนเงิน<br>จ่ายไม่ได้เลย = 0")
          }
        } else {
          cancelAllRegistry()
          _$dialogRegistry.dialog('close')
        }
      }
    }
  ])

  _$dialogRegistry.find('input').prop('disabled', false)
  _$dialogRegistry.find('textarea').prop('disabled', false)
  radioHack('#dialogRegistry')
}

function getEditedBy()
{
  sqlGetEditedBy(_qn).then(response => {
    if (typeof response === "object") {
      let Editedby = ""
      forEach(response, function(key, val) {
        Editedby += (val.editor + " : " + val.editdatetime + "<br>")
      });
      $('#editedby').html(Editedby)
    } else {
      Alert("getEditedby", response)
    }
	}).catch(error => alert(error.stack))
}

function checkRegistry()
{
  return Array.from(document.querySelectorAll('#dialogRegistry input, #dialogRegistry textarea')).some(e => {
    if (e.type === "text" || e.type === "textarea") {
      return e.value
    } else {
      return e.checked
    }
  })
}

function saveRegistry()
{
  let RegistryJSON = {},
    Registryment = "",
    sql = ""

  RegistryITEMS.forEach(e => {
    let title = document.querySelector(`#dialogRegistry div[title='${e}']`)
    title.querySelectorAll(`input, textarea`).forEach(i => {
      let itext = (i.type === 'text') && i.value
      let iarea = (i.type === 'textarea') && i.value
      if (i.checked || itext || iarea) {
          if (!RegistryJSON[e]) {
            RegistryJSON[e] = ((e === "เครื่องมือบริษัท") && (i.placeholder)) ? [''] : []
          }
          RegistryJSON[e].push(i.value)
      }
    })
  })

  if (deepEqual(RegistryJSON, _JsonRegistry)) { return }

  Registryment = JSON.stringify(RegistryJSON)
  Registryment = apostrophe(Registryment)

  sqlSaveRegistry(Registryment, _qn).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
      _$dialogRegistry.dialog('close')
    } else {
      Alert("saveRegistry", response)

      // failed save, roll back
      fillRegistry()
    }
  }).catch(error => alert(error.stack))
}

function cancelAllRegistry()
{
  sqlCancelAllRegistry(_qn).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
    } else {
      Alert("cancelAllRegistry", response)

      // failed cancel, roll back
      fillRegistry()
    }
  }).catch(error => alert(error.stack))
}
