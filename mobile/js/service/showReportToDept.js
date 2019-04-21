
import { exportReportToExcel } from "../util/excel.js"
import { SERVICE } from "./setSERVICE.js"

const ROWREPORT = {
  "Brain Tumor": 3,
  "Brain Vascular": 4,
  "CSF related": 5,
  "Trauma": 6,
  "Spine": 7,
  "etc": 8,
  "Radiosurgery": 10,
  "Endovascular": 11,
  "NotDone": 12
}
const COLUMNREPORT = {
  "Staff": 1,
  "Resident": 5,
  "Major": 0,
  "Minor": 2,
  "Elective": 0,
  "Emergency": 1
}

export function showReportToDept(title)
{
  let sumColumn = [0, 0, 0, 0, 0, 0, 0, 0]

  $("#dialogReview").dialog({
    title: title,
    closeOnEscape: true,
    modal: true,
    width: 550,
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
    let profile = JSON.parse(e.profile) || {}

    if (profile.admitted) { countAdmitCase(profile.admitted) }
    if (profile.operated) { countOpCase(profile.operated) }

    if (e.discharge) { document.querySelector('#Discharge').innerHTML++ }
    if (profile.infection) { document.querySelector('#Infection').innerHTML++ }
    if (profile.morbid) { document.querySelector('#Morbidity').innerHTML++ }
    if (profile.dead) { document.querySelector('#Dead').innerHTML++ }

    if (profile.radiosurgery) { countNonOpCase("Radiosurgery") }
    if (profile.endovascular) { countNonOpCase("Endovascular") }
    if (!profile.operated && !profile.radiosurgery && !profile.endovascular) { countNonOpCase("NotDone") }
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

function countAdmitCase(thisval)
{
  document.querySelector('#Admission').innerHTM++
  while (thisval > 1) {
    document.querySelector('#Admission').innerHTML++
    document.querySelector('#Readmission').innerHTML++
    thisval--
  }
}

function countOpCase(operated)
{
  let op = operated.length

  document.querySelector('#Operation').innerHTML++
  while(op > 1) {
    document.querySelector('#Operation').innerHTML++
    document.querySelector('#Reoperation').innerHTML++
    op--
  }

  operated.forEach(e => {
    let doneby = e.doneby ? e.doneby : "Staff",
      scale = e.scale ? e.scale : "Major",
      manner = e.manner ? e.manner : "Elective",
      row = ROWREPORT[e.disease],
      column = COLUMNREPORT[doneby]
             + COLUMNREPORT[scale]
             + COLUMNREPORT[manner]

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
