
import { getResident } from "../model/sqlDoResident.js"
import { RESIDENT } from "../model/sqlDoResident.js"

// xRange (xAxis length) is the span of 10 years
// Neurosurgery residency training is 5 years
export const xRange = 200
export const training = 5

export const RESEARCHBAR = [
  {label: "", progress: "", color: "#FFFFFF"},
  {label: "Proposal", progress: "proposal", color: "#DAA520"},
  {label: "Planning", progress: "planning", color: "gold"},
  {label: "Ethic", progress: "ethic", color: "#70EE70"},
  {label: "50% Data", progress: "data50", color: "#ADD8E6"},
  {label: "100% Data", progress: "data100", color: "#6698FF"},
  {label: "Analysis", progress: "analysis", color: "violet"},
  {label: "Complete", progress: "complete", color: "red"}
]

const eduMonth = 5
const eduDate = 1
const eduYear = calcYearOne()

export async function prepareDatasets()
{
  await getResident()

  return {
    data: prepareData(),
    years: prepareYears()
  }
}

function prepareData()
{
  return {
    labels: RESIDENT.map(e => e.residentname),
    datasets: calcDatasets()
  }
}

function calcDatasets()
{
  // X axis is double the research time range, because half of it is the white bars
  let year = xRange / 2 / training,
    enrollyears = RESIDENT.map(e => Number(e.enrollyear)),
    research = RESIDENT.map(e => JSON.parse(e.research))

  return RESEARCHBAR.map((r, i) => {
    if (i === 0) {
      return {
        label: r.label,
        backgroundColor: enrollyears.map(e => r.color),
        caption: '',
        data: enrollyears.map(e => calcBeginEdu(e - 543))
      }
    } else {
      return {
        label: r.label,
        backgroundColor: research.map(e => r.color),
        caption: research.map(e => e[r.progress][1]),
        data: research.map(e => e[r.progress][0])
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
    beginX = new Date(eduYear - training, 0, 1),
    endX = new Date(eduYear + training, 0, 0),
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
  return [...Array(training*2)].map((e,i) => eduYear + 543 - training + i)
}

function prepareToday()
{
  const today = new Date(),
    thisY = eduYear,
    firstDate = new Date(`${thisY - training}`),
    lastDate = new Date(`${thisY + training}`),
    interval = lastDate - firstDate

  return (today - firstDate) / interval * xRange
}
