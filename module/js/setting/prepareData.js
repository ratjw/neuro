
import { xRange } from "../setting/resResearch.js"
import { MAXYEAR, getRESIDENT } from "../model/sqlDoResident.js"

export const RESEARCHBAR = [
  {label: "", progress: "", color: "#FFFFFF"},
  {label: "Proposal", progress: "proposal", color: "#DAA520"},
  {label: "Planning", progress: "planning", color: "gold"},
  {label: "Ethic", progress: "ethic", color: "#70EE70"},
  {label: "Data", progress: "data", color: "#ADD8E6"},
  {label: "Analysis", progress: "analysis", color: "violet"},
  {label: "Complete", progress: "complete", color: "red"}
]

const eduMonth = 5
const eduDate = 1
const eduYear = calcYearOne()

export async function prepareDatasets()
{
  const residents = await getRESIDENT()

  return {
    data: prepareData(residents),
    years: prepareYears()
  }
}

function prepareData(residents)
{
  return {
    labels: residents.map(e => e.residentname),
    datasets: calcDatasets(residents)
  }
}

// X axis is double the research time range, because half of it is the white bars
function calcDatasets(residents)
{
  let year = xRange / 2 / MAXYEAR,
    whiteBar = residents.map(e => new Date(e.entryDate).getFullYear()),
    research = residents.map(e => JSON.parse(e.research))

  return RESEARCHBAR.map((r, i) => {
    if (i === 0) {
      return {
        label: r.label,
        backgroundColor: whiteBar.map(e => r.color),
        data: whiteBar.map(e => calcBeginEdu(e)),
        caption: research.map(e => '')
      }
    } else {
      return {
        label: r.label,
        backgroundColor: research.map(e => r.color),
        data: research.map(e => e[r.progress] && e[r.progress][0]),
        caption: research.map(e => e[r.progress] && e[r.progress][1])
      }
    }
  })
}

function calcYearOne()
{
  const today = new Date(),
    beginEdu = new Date(today.getFullYear(), eduMonth, eduDate),
    thisyear = today.getFullYear()

  return ((today - beginEdu) > 0) ? thisyear + 1 : thisyear
}

function calcBeginEdu(year)
{
  const beginEdu = new Date(year, eduMonth, eduDate),
    beginX = new Date(eduYear - MAXYEAR, 0, 1),
    endX = new Date(eduYear + MAXYEAR, 0, 0),
    timelag = (beginEdu - beginX) / (endX - beginX)

  return timelag * xRange
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
  return [...Array(MAXYEAR*2)].map((e,i) => eduYear + 543 - MAXYEAR + i)
}

function prepareToday()
{
  const today = new Date(),
    thisY = eduYear,
    firstDate = new Date(`${thisY - MAXYEAR}`),
    lastDate = new Date(`${thisY + MAXYEAR}`),
    interval = lastDate - firstDate

  return (today - firstDate) / interval * xRange
}
