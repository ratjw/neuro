
import { RESIDENT } from "../model/sqlDoResident.js"

// xRange (xAxis length) is the span of 10 years
// Neurosurgery residency training is 5 years
export const xRange = 2000
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

// training year end at 4 (end of May)
const endmonth = 4
let today,
  thisY,
  thisyear,
  add,
  yearadd,
  firstDate,
  lastDate,
  interval

function calcTime()
{
  today = new Date()
  thisY = today.getFullYear()
  thisyear = thisY + 543
  add = (today.getMonth() > endmonth) ? 1 : 0
  yearadd = thisyear + add
  firstDate = new Date(`${thisY + add - training}`)
  lastDate = new Date(`${thisY + add + training}`)
  interval = lastDate - firstDate
}

export function prepareData()
{
  calcTime()

  return {
    labels: RESIDENT.map(e => e.residentname),
    datasets: calcDatasets()
  }
}

function calcDatasets()
{
  // X axis is double the research time range, because half of it is the white bars
  let tick = xRange / 2 / training,
    month = tick / 12,
    enrollyears = RESIDENT.map(e => Number(e.enrollyear)),
    research = RESIDENT.map(e => JSON.parse(e.research)),
    resbar = RESEARCHBAR.map(e => e.progress).filter(e => e),
    month60 = month*60

  research.forEach(e => {
    let sumMonths = 0
    resbar.forEach(key => {
      let time = e[key]
      if (sumMonths + time <= month60) {
        sumMonths += time
      } else {
        e[key] = month60 - sumMonths
        sumMonths = month60
      }
    })
  })

  return RESEARCHBAR.map((r, i) => {
    if (i === 0) {
      return {
        label: r.label,
        backgroundColor: enrollyears.map(e => r.color),
        data: enrollyears.map(e => (training + e - yearadd)*tick + tick/2)
      }
    } else {
      return {
        label: r.label,
        backgroundColor: research.map(e => r.color),
        data: research.map(e => e[r.progress])
      }
    }
  })
}

export function prepareYears()
{
  return {
    range: [...Array(training*2)].map((e,i) => yearadd - training + i),
    today: (today - firstDate) / interval * xRange
  }
}
