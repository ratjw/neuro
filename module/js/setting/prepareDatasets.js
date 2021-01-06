
import {
  MAXYEAR, XRANGE, EDUMONTH, EDUDATE, EDUYEAR, DATEBEGINX, DATEENDX, RESEARCHBAR
} from "../setting/constResident.js"
import { presentRESIDENT } from "../setting/getResident.js"
import { DIVISION } from "../main.js"

export function prepareDatasets()
{
  const residents = presentRESIDENT(DIVISION)

  return {
    data: prepareData(residents),
    years: prepareYears()
  }
}

function prepareData(residents)
{
  return {
    labels: residents.map(e => e.name),
    datasets: calcDatasets(residents)
  }
}

function calcDatasets(residents)
{
  return RESEARCHBAR.map((r, i) => {
    if (i === 0) {
      return {
        label: r.label,
        backgroundColor: residents.map(e => r.color),
        data: residents.map(e => calcBeginEdu(e.yearOne)),
        caption: residents.map(e => '')
      }
    } else {
      residents.forEach(e => e.addRatio = 1 + (e.addLevel / MAXYEAR))
      return {
        label: r.label,
        backgroundColor: residents.map(e => r.color),
        data: residents.map(e => e.research[r.progress] && e.research[r.progress][0] * e.addRatio),
        caption: residents.map(e => e.research[r.progress] && e.research[r.progress][1])
      }
    }
  })
}

function calcBeginEdu(year)
{
  const beginEdu = new Date(year, EDUMONTH, EDUDATE),
    timelag = (beginEdu - DATEBEGINX) / (DATEENDX - DATEBEGINX)

  return timelag * XRANGE
}

function prepareYears()
{
  return {
    range: prepareRange(),
    today: prepareToday()
  }
}

function prepareRange()
{
  return [...Array(MAXYEAR*2)].map((e,i) => EDUYEAR + 543 - MAXYEAR + i)
}

function prepareToday()
{
  const today = new Date(),
    thisY = EDUYEAR,
    firstDate = new Date(`${thisY - MAXYEAR}`),
    lastDate = new Date(`${thisY + MAXYEAR}`),
    interval = lastDate - firstDate

  return (today - firstDate) / interval * XRANGE
}
