function fillEquipTable(book, $row, qn, blankcase)
{
  var NAMEOFDAYTHAI  = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"],
    bookq = qn ? getBOOKrowByQN(book, qn) : blankcase,
    bookqEquip = bookq.equipment,
    JsonEquip = bookqEquip? JSON.parse(bookqEquip) : {},
    $dialogEquip = $("#dialogEquip"),
    height = window.innerHeight,
    profile = {
      "oproomequip": bookq.oproom || "",
      "casenumequip": bookq.casenum || "",
      "optimeequip": bookq.optime,
      "opdayequip": NAMEOFDAYTHAI[(new Date(bookq.opdate)).getDay()],
      "opdatethequip": putThdate(bookq.opdate),
      "staffnameequip": bookq.staffname,
      "hnequip": bookq.hn,
      "patientnameequip": bookq.patient,
      "ageequip": putAgeOpdate(bookq.dob, bookq.opdate),
      "diagnosisequip": bookq.diagnosis.split(' ').slice(0,6).join(' '),
      "treatmentequip": bookq.treatment.split(' ').slice(0,6).join(' ')
    }

  $.each(profile, function(key, val) {
    document.getElementById(key).innerHTML = val
  })

  // mark table row
  // clear all previous dialog values
  $row.addClass("marker")
  $dialogEquip.find('input[type=text]').val('')
  $dialogEquip.find('textarea').val('')
  $dialogEquip.find('input').prop('checked', false)
  $dialogEquip.dialog({
    title: "เครื่องมือผ่าตัด",
    closeOnEscape: true,
    modal: true,
    width: 700,
    height: height > 1000 ? 1000 : height,
    open: function(event, ui) {
      //disable default autofocus on text input
      $("input").blur()
    }
  })

  if ( Object.keys(JsonEquip).length ) {
    Object.entries(JsonEquip).forEach(([key, val]) => {
      if (val.constructor === Array) {
        val.forEach(e => {
          checkMatchValue(key, e)
        })
      } else {
        checkMatchValue(key, val)
      }
    })
  }
  showNonEditableEquip()

  $dialogEquip.find("div").each(function() {
    this.style.display = "none"
  })

  $dialogEquip.find("input").each(function() {
    if (this.checked || (this.type === 'text' && this.value)) {
      this.closest("div").style.display = "block"
    }
  })

  if ($dialogEquip.find("textarea").val()) {
    $dialogEquip.find("textarea").closest("div").show()
  }
}

function checkMatchValue(key, val)
{
  let dd = document.querySelector(`#dialogEquip div[title='${key}']`)

  if (!dd) { return }
  if (dd.querySelector('textarea')) {
    dd.querySelector('textarea').value = val
    return
  }

  for ( let e of dd.querySelectorAll('input')) {
    if (e.type === 'text') {
      if (e.value) { continue }
      e.value = val
      break
    } else if (val === e.value) {
      e.checked = true
      break
    }
  }
}

function showNonEditableEquip()
{
  $('#dialogEquip input').on("click", function() { return false })
  $('#dialogEquip input[type=text]').prop('disabled', true)
  $('#dialogEquip textarea').prop('disabled', true)
}
