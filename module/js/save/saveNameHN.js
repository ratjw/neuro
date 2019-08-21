
import { sqlGetNameHN } from "../model/sqlGetNameHN.js"
import { updateBOOK } from "../util/updateBOOK.js"
import { Alert, winHeight } from "../util/util.js"
import { reCreateEditcell } from "../control/edit.js"
import { saveHN } from '../save/saveHN.js'

export function saveNameHN(pointed, content)
{
  pointed.innerHTML = content
  sqlGetNameHN(pointed, content).then(response => {
    if (typeof response === "object") {
      if ("BOOK" in response) {
        updateBOOK(response)
        reCreateEditcell()
      } else {
        showPatientNames(response, pointed, content)
      }
    } else {
      Alert("saveNameHN", response + "<br>ไม่พบ<br>" + content)
      pointed.innerHTML = ""
      // unsuccessful entry
    }
  }).catch(error => { })
}

function showPatientNames(response, pointed, content)
{
  const $dialogPatient = $("#dialogPatient"),
    maxHeight = winHeight(90),
    $patienttbl = $("#patienttbl"),
    $tbody = $patienttbl.find('tbody')

  $patienttbl.find('tr').slice(1).remove()

  Object.values(response).forEach(item => {
    $('#patientcells tr').clone()
      .appendTo($tbody)
        .filldataPatient(item)
  });

  $patienttbl.find('tr').click(function() {
    saveHN(pointed, this.cells[0].innerHTML)
    $dialogPatient.dialog('close')
  })

  $dialogPatient.dialog({ height: 'auto' })
  $dialogPatient.dialog({
    title: content,
    closeOnEscape: true,
    modal: true,
    show: 200,
    hide: 200,
    width: 'auto',
    height: ($dialogPatient.height() > maxHeight) ? maxHeight : 'auto'
  })
}

jQuery.fn.extend({
  filldataPatient : function (q) {
    let row = this[0]
    let cells = row.cells

    cells[0].innerHTML = q.hn
    cells[1].innerHTML = q.initial_name + q.first_name + " " + q.last_name
  }
})

let responses = {
  "0": {
    dob: "",
    effectiveenddate: "13/05/2004 00:00:00",
    effectivestartdate: "29/04/1997 00:00:00",
    first_name: "สมหมาย",
    gender: "",
    hn: "2924088",
    initial_name: "",
    last_name: "หลงมาดี",
    nonresidence: "",
    suffixname: ""
  },
  "1": {
    dob: "",
    effectiveenddate: "17/02/1997 00:00:00",
    effectivestartdate: "01/01/1989 00:00:00",
    first_name: "สมหมาย",
    gender: "",
    hn: "2255039",
    initial_name: "",
    last_name: "หลงเชิง",
    nonresidence: "",
    suffixname: ""
  },
  "2": {
    dob: "1946-01-01",
    effectiveenddate: "01/01/9999 00:00:00",
    effectivestartdate: "24/03/2008 07:21:10",
    first_name: "สมหมาย",
    gender: "M",
    hn: "4197384",
    initial_name: "นาย",
    last_name: "หลวงกลาง",
    nonresidence: "",
    suffixname: ""
  },
  "3": {
    dob: "1967-08-27",
    effectiveenddate: "13/09/2018 10:22:50",
    effectivestartdate: "10/09/2014 07:09:13",
    first_name: "สมหมาย",
    gender: "F",
    hn: "4918017",
    initial_name: "นาง",
    last_name: "หลวงทน",
    nonresidence: "",
    suffixname: ""
  },
  "4": {
    dob: "",
    effectiveenddate: "31/01/2006 00:00:00",
    effectivestartdate: "20/04/2000 00:00:00",
    first_name: "สมหมาย",
    gender: "",
    hn: "3314211",
    initial_name: "",
    last_name: "หลวงนัน",
    nonresidence: "",
    suffixname: ""
  },
  "5": {
    dob: "1964-01-30",
    effectiveenddate: "27/04/2013 14:01:22",
    effectivestartdate: "06/06/2007 07:25:34",
    first_name: "สมหมาย",
    gender: "M",
    hn: "4109062",
    initial_name: "นาย",
    last_name: "หลวงริด",
    nonresidence: "",
    suffixname: ""
  },
  "6": {
    dob: "1956-01-01",
    effectiveenddate: "01/01/9999 00:00:00",
    effectivestartdate: "20/06/2015 12:53:18",
    first_name: "สมหมาย",
    gender: "M",
    hn: "5015801",
    initial_name: "นาย",
    last_name: "หลวงแก้ว",
    nonresidence: "",
    suffixname: ""
  },
  "7": {
    dob: "1984-10-01",
    effectiveenddate: "30/05/2017 16:30:21",
    effectivestartdate: "02/10/2013 23:56:37",
    first_name: "สมหมาย",
    gender: "M",
    hn: "4801404",
    initial_name: "นาย",
    last_name: "หลอดแก้ว",
    nonresidence: "",
    suffixname: ""
  }
}
