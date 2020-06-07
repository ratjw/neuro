
export const RESIDENT = [],

// Neurosurgery residency training is 5 years
// xRange (xAxis length) is the span of 10 years
xRange = 200,
MAXYEAR = 5,
eduDate = 1,
eduMonth = 5,
eduYear = calcYearOne(),
eduYear = calcYearOne(),

RAMAID = 0,
RNAME = 1,
LEVEL = 2,
ICONS = 3,

RESEARCHBAR = [
  {label: "", progress: "", color: "#FFFFFF"},
  {label: "Proposal", progress: "proposal", color: "#DAA520"},
  {label: "Planning", progress: "planning", color: "gold"},
  {label: "Ethic", progress: "ethic", color: "#70EE70"},
  {label: "Data", progress: "data", color: "#ADD8E6"},
  {label: "Analysis", progress: "analysis", color: "violet"},
  {label: "Complete", progress: "complete", color: "red"}
]

function calcYearOne()
{
  const today = new Date(),
    beginEdu = new Date(today.getFullYear(), eduMonth, eduDate),
    thisyear = today.getFullYear()

  return ((today - beginEdu) > 0) ? thisyear + 1 : thisyear
}
