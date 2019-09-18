
import { htmlStafflist } from "./html.js"
import { sqlDoAddStaff, sqlDoUpdateStaff, sqlDoDeleteStaff } from "../model/sqlDoAddStaff.js"
import { updateBOOK, setSTAFF } from "../util/updateBOOK.js"
import { Alert } from "../util/util.js"
import { viewAddStaff } from "../view/viewAddStaff.js"
import { fillConsults } from "../view/fillConsults.js"

export function addStaff()
{
  $("#dialogStaff").dialog({
    title: "Neurosurgery Staff",
    closeOnEscape: true,
    modal: true,
    show: 200,
    hide: 200,
    width: 600,
    height: 400
  })
  viewAddStaff()
}

export async function doAddStaff()
{
  let response = await sqlDoAddStaff()
  if (typeof response === "object") {
    updateBOOK(response)
    showAddStaff(response)
  } else {
    Alert ("doAddStaff", response)
  }
}

export async function doUpdateStaff()
{
  let response = await sqlDoUpdateStaff()
  if (typeof response === "object") {
    updateBOOK(response)
    showAddStaff(response)
  } else {
    Alert ("doUpdateStaff", response)
  }
}

export async function doDeleteStaff()
{
  let response = await sqlDoDeleteStaff()
  if (typeof response === "object") {
    updateBOOK(response)
    showAddStaff(response)
  } else {
    Alert ("doDeleteStaff", response)
  }
}

function showAddStaff(response)
{
  setSTAFF(response.STAFF)
  htmlStafflist()
  fillConsults()
  addStaff()
}
