
import { exportReportToExcel } from "../util/excel.js"
import { SERVICE } from "./setSERVICE.js"
import { winHeight } from "../util/util.js"

const ROWREPORT = {
  "Brain Tumor": 3,
  "Brain Vascular": 4,
  "CSF related": 5,
  "Trauma": 6,
  "Spine": 7,
  "etc": 8,
  "Radiosurgery": 14,
  "Endovascular": 15,
  "NotDone": 16
}
const COLUMNREPORT = {
  "Staff": 1,
  "Fellow": 5,
  "Resident": 9,
  "Major": 0,
  "Minor": 2,
  "Staff Neuro": 1,
  "Staff Radio": 3,
  "Fellow Neuro": 5,
  "Fellow Radio": 7,
  "Elective": 0,
  "Emergency": 1
}

export function showReportToDept(title)
{
  let sumColumn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  $("#dialogReview").dialog({
    title: title,
    closeOnEscape: true,
    modal: true,
    width: 700,
    height: winHeight(95),
    buttons: [{
      text: "Export to Excel",
      click: function() {
        exportReportToExcel(title)
        $( this ).dialog( "close" );
      }
    }]
  })

  $("#servicehead span[id]").each(function() {
    this.innerHTML = 0
  })

  $("#reviewtbl tr:not('th')").each(function() {
    $.each($(this).find("td:not(:first-child)"), function() {
      this.innerHTML = 0
    })
  })

  SERVICE.forEach(e => {
    let profile = JSON.parse(e.profile) || {},
      profileOperated = profile.operated,
      profileRadiosurg = profile.radiosurg,
      profileEndovasc = profile.endovasc

    countAdmitCase(e, profile.admitted)
    if (profileOperated) { countOpCase(profileOperated) }
    if (profileRadiosurg) { countRadioCase(profileRadiosurg) }
    if (profileEndovasc) { countEndoCase(profileEndovasc) }

    if (e.discharge) { document.querySelector('#Discharge').innerHTML++ }
    if (profile.infection) { document.querySelector('#Infection').innerHTML++ }
    if (profile.morbid) { document.querySelector('#Morbidity').innerHTML++ }
    if (profile.dead) { document.querySelector('#Dead').innerHTML++ }

    if (profileRadiosurg) { countNonOpCase("Radiosurgery") }
    if (profileEndovasc) { countNonOpCase("Endovascular") }
    if ((!profileOperated || !profileOperated.length)
     && (!profileRadiosurg || !profileRadiosurg.length)
     && (!profileEndovasc || !profileEndovasc.length)) {
       countNonOpCase("NotDone")
    }
  })

  $("#reviewtbl tr:not('th, .notcount')").each(function(i) {
    $.each($(this).find("td:not(:first-child)"), function(j) {
      sumColumn[j] += Number(this.innerHTML)
    })
  })
  $("#Total").find("td:not(:first-child)").each(function(i) {
    this.innerHTML = sumColumn[i]
  })
  $("#Grand").find("td:not(:first-child)").each(function(i) {
    i = i * 2
    this.innerHTML = sumColumn[i] + sumColumn[i+1]
  })
}

function countAdmitCase(e, admits)
{
  let admit = document.querySelector('#Admission'),
    readmit = document.querySelector('#Readmission')

  admit.innerHTML = Number(admit.innerHTML) + (admits ? Number(admits) : 0)

  while (admits > 1) {
    readmit.innerHTML++
    admits--
  }
}

function countOpCase(operated)
{
  let op = document.querySelector('#Operation')

  op.innerHTML = Number(op.innerHTML) + operated.length

  operated.forEach(e => {
    let row = ROWREPORT[e.disease],
      column = COLUMNREPORT[e.doneby]
             + COLUMNREPORT[e.scale]
             + COLUMNREPORT[e.manner]

    if (row && column) {
      $("#reviewtbl tr")[row].cells[column].innerHTML++
    }
  })
}

function countRadioCase(radiosurg)
{
  radiosurg.forEach(e => {
    let row = ROWREPORT["Radiosurgery"],
      column = COLUMNREPORT[e.doneby]

    if (row && column) {
      $("#reviewtbl tr")[row].cells[column].innerHTML++
    }
  })
}

function countEndoCase(endovasc)
{
  endovasc.forEach(e => {
    let row = ROWREPORT["Endovascular"],
      column = COLUMNREPORT[e.doneby]
             + COLUMNREPORT[e.manner]

    if (row && column) {
      $("#reviewtbl tr")[row].cells[column].innerHTML++
    }
  })
}

function countNonOpCase(thisval)
{
  let row = ROWREPORT[thisval],
    column = 1

  $("#reviewtbl tr")[row].cells[column].innerHTML++
}
