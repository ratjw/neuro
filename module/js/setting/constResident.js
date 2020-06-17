
let RESIDENT = []

// Neurosurgery residency training is 5 years
export const MAXYEAR = 5,

// XRANGE (xAxis length) is the span of 10 years
// because half of it is the white bars
XRANGE = 200,

// Education year at this moment now (changes at 1 June of the year)
EDUDATE = 1,
EDUMONTH = 5,
EDUYEAR = calcEduYear(),

// X-axis of research bar chart
DATEBEGINX = new Date(EDUYEAR - MAXYEAR, 0, 1),
DATEENDX = new Date(EDUYEAR + MAXYEAR, 0, 0),

// columns in residentTbl
RAMAID = 0,
RNAME = 1,
LEVEL = 2,
ICONS = 3,

// columns in horizontal bar chart
RESEARCHBAR = [
  {label: "", progress: "", color: "#FFFFFF"},
  {label: "Proposal", progress: "proposal", color: "#DAA520"},
  {label: "Planning", progress: "planning", color: "gold"},
  {label: "Ethic", progress: "ethic", color: "#70EE70"},
  {label: "Data", progress: "data", color: "#ADD8E6"},
  {label: "Analysis", progress: "analysis", color: "violet"},
  {label: "Complete", progress: "complete", color: "red"}
]

function calcEduYear()
{
  const today = new Date(),
    thisyear = today.getFullYear(),
    changeEdu = new Date(today.getFullYear(), EDUMONTH, EDUDATE)

  return today < changeEdu ? thisyear - 1 : thisyear
}

export function setRESIDENT(residents) { RESIDENT = residents }

export function getRESIDENT()
{
  const residents = JSON.parse(JSON.stringify(RESIDENT))

  return residents.map(resident => JSON.parse(resident.profile))
}

export function presentRESIDENT()
{
  return getRESIDENT().filter(e => EDUYEAR - e.yearOne + 1 - e.addLevel <= MAXYEAR)
}
