
import { RESIDENT } from "../setting/doResident.js"

const xRange = 100,
      training = 5,
      endmonth = 4,
      today = new Date(),
      thisY = today.getFullYear(),
      thisyear = thisY + 543,
      add = (today.getMonth() > endmonth) ? 1 : 0,
      yearth = thisyear + add,
      firstDate = new Date(`${thisY + add - training}`),
      lastDate = new Date(`${thisY + add + training}`),
      interval = lastDate - firstDate
     
export function prepareData()
{
  let white = "#FFFFFF",
    goldenRod = "#DAA520",
    gold = "gold",
    lightGreen ="#90EE90",
    lightBlue = "#ADD8E6",
    skyBlue = "#6698FF",
    violet = "violet",
    red = "red",

    // X axis is double the research time range, 'cos half of it is the white bars
    // In DB, total rtime of each resident is 100 for the range of 5 years
    rtime = xRange / 2,
    tick = rtime / training,
    scale = rtime / 100,
    enrollyears = RESIDENT.map(e => Number(e.enrollyear)),
    research = RESIDENT.map(e => JSON.parse(e.research)),

    data = {
      labels: RESIDENT.map(e => e.residentname),
      datasets: [
        {
          label: "",
          backgroundColor: enrollyears.map(e => white),
          data: enrollyears.map(e => (training + e - yearth)*tick + tick/2)
        },
        {
          label: "Proposal",
          backgroundColor: research.map(e => goldenRod),
          borderWidth: 1,
          data: research.map(e => e.proposal*scale)
        },
        {
          label: "Planning",
          backgroundColor: research.map(e => gold),
          borderWidth: 1,
          data: research.map(e => e.planning*scale)
        },
        {
          label: "Ethic",
          backgroundColor: research.map(e => lightGreen),
          data: research.map(e => e.ethic*scale)
        },
        {
          label: "50% Data",
          backgroundColor: research.map(e => lightBlue),
          data: research.map(e => e.data50*scale)
        },
        {
          label: "100% Data",
          backgroundColor: research.map(e => skyBlue),
          data: research.map(e => e.data100*scale)
        },
        {
          label: "Assertion",
          backgroundColor: research.map(e => violet),
          data: research.map(e => e.assertion*scale)
        },
        {
          label: "Complete",
          backgroundColor: research.map(e => red),
          data: research.map(e => e.complete*scale)
        }
      ]
    }

  return data
}

export function prepareYears()
{
  let years = {
    range: [],
    today: 0
  },
  year = yearth - training

  while (year < yearth + training) {
    years.range.push(year)
    year++
  }
  years.today = (today - firstDate) / interval * xRange

  return years
}
