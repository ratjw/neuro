
import { RESIDENT } from "../model/sqlDoResident.js"

export const RESEARCHBAR = [
  {label: "", progress: "", color: "#FFFFFF"},
  {label: "Proposal", progress: "proposal", color: "#DAA520"},
  {label: "Ethic", progress: "ethic", color: "gold"},
  {label: "Planning", progress: "planning", color: "#70EE70"},
  {label: "50% Data", progress: "data50", color: "#ADD8E6"},
  {label: "100% Data", progress: "data100", color: "#6698FF"},
  {label: "Analysis", progress: "analysis", color: "violet"},
  {label: "Complete", progress: "complete", color: "red"}
]

// Neurosurgery residency training is for the 5 years
export const xRange = 2000,
              training = 5

// xRange (xAxis length) is the span of 10 years
const endmonth = 4,
  today = new Date(),
  thisY = today.getFullYear(),
  thisyear = thisY + 543,
  add = (today.getMonth() > endmonth) ? 1 : 0,
  yearadd = thisyear + add,
  firstDate = new Date(`${thisY + add - training}`),
  lastDate = new Date(`${thisY + add + training}`),
  interval = lastDate - firstDate

export function prepareData()
{
  return {
    labels: RESIDENT.map(e => e.residentname),
    datasets: calcDatasets()
  }
}

export function prepareYears()
{
  return {
    range: [...Array(training*2)].map((e,i) => yearadd - training + i),
    today: (today - firstDate) / interval * xRange
  }
}

function calcDatasets()
{
  // X axis is double the research time range, because half of it is the white bars
  const tick = xRange / 2 / training,
    month = tick / 12,
    enrollyears = RESIDENT.map(e => Number(e.enrollyear)),
    research = RESIDENT.map(e => {
      return e.research
              ? JSON.parse(e.research)
              : {
                  proposal: month*3,
                  ethic: month*9,
                  planning: month*12,
                  "data50": month*18,
                  "data100": month*12,
                  analysis: month*5,
                  complete: month*1
                }
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
