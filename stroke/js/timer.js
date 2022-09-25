
// timer is just an id number of setTimeout, not the clock object
// idleCounter is number of cycles of idle setTimeout
export let timer = 0

// poke server every 10 sec.
export function resetTimer() {
  clearTimeout(timer)
  timer = setTimeout( updating, 3000)
}

export function resetTimerCounter()
{
  resetTimer();
  idleCounter = 0
}

// if not being editing on screen (idling) 1 minute, clear editing setup
// if idling 10 minutes, logout
function onIdling()
{
    if (idleCounter && !(idleCounter % 6)) {
      clearAllEditing()
      renewEditcell()
    } else if (idleCounter > 59) {
      history.back()
    }

    idleCounter += 1
}

function saveOnChange(content)
{
  let index = POINTER.cellIndex,
      qn = POINTER.closest("tr").dataset.qn,
      column = index === DIAGNOSIS
                ? "diagnosis"
                : index === TREATMENT
                ? "treatment"
                : index === CONTACT
                ? "contact"
                : ""

  if (!column) { return false }

  sqlSaveOnChange(column, content, qn).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
      refillHoliday()
    } else {
      Alert ("saveOnChange", response)
    }
  })

  POINTER.innerHTML = content
  return true
}

function saveOnChangeService(content)
{
  let index = POINTER.cellIndex,
      qn = POINTER.closest("tr").dataset.qn,
      column = index === DIAGNOSISSV
                ? "diagnosis"
                : index === TREATMENTSV
                ? "treatment"
                : index === ADMISSIONSV
                ? "admission"
                : index === FINALSV
                ? "final"
                : ""

  if (!column) { return false }

  sqlSaveService(column, apostrophe(content), qn).then(response => {
    if (typeof response === "object") {
      updateBOOK(response)
    } else {
      Alert ("saveOnChangeService", response)
    }
  })

  POINTER.innerHTML = content
  return true
}
