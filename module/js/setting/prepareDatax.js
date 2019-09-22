
import { RESIDENT } from "../setting/doResident.js"

const training = 5,
      endmonth = 4,
      xRange = 200,
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
  let data = {},
    proposal = 1,
    planning = 19,
    ethic = 20,
    data50 = 30,
    data100 = 20,
    assertion = 9,
    complete = 1,
    xRange = 200,
    tick = xRange / (training*2),
    white = "#FFFFFF",
    goldenRod = "#DAA520",
    gold = "gold",
    lightGreen ="#90EE90",
    lightBlue = "#ADD8E6",
    skyBlue = "#6698FF",
    violet = "violet",
    red = "red",
    enrollyears = RESIDENT.map(e => Number(e.enrollyear))

  data.labels = RESIDENT.map(e => e.residentname)
  data.datasets = [
        {
          label: "",
          backgroundColor: enrollyears.map(e => white),
          data: enrollyears.map(e => (training + e - yearth)*tick + tick/2)
        },
        {
          label: "Proposal",
          backgroundColor: RESIDENT.map(e => goldenRod),
          borderWidth: 1,
          data: RESIDENT.map(e => proposal)
        },
        {
          label: "Planning",
          backgroundColor: RESIDENT.map(e => gold),
          borderWidth: 1,
          data: RESIDENT.map(e => planning)
        },
        {
          label: "Ethic",
          backgroundColor: RESIDENT.map(e => lightGreen),
          data: RESIDENT.map(e => ethic)
        },
        {
          label: "50% Data",
          backgroundColor: RESIDENT.map(e => lightBlue),
          data: RESIDENT.map(e => data50)
        },
        {
          label: "100% Data",
          backgroundColor: RESIDENT.map(e => skyBlue),
          data: RESIDENT.map(e => data100)
        },
        {
          label: "Assertion",
          backgroundColor: RESIDENT.map(e => violet),
          data: RESIDENT.map(e => assertion)
        },
        {
          label: "Complete",
          backgroundColor: RESIDENT.map(e => red),
          data: RESIDENT.map(e => complete)
        },
        {
          label: "",
          backgroundColor: enrollyears.map(e => white),
          data: enrollyears.map(e => (yearth - e - 1)*tick + tick/2)
        }
      ]

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
